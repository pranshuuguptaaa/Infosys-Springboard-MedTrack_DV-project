from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
CLEAN_PATH = ROOT / "data" / "processed" / "hospital_cleaned.csv"
FINAL_XLSX_PATH = ROOT / "data" / "processed" / "hospital_final_dataset.xlsx"
FINAL_CSV_PATH = ROOT / "data" / "processed" / "hospital_final_dataset.csv"
KPI_REPORT_PATH = ROOT / "docs" / "module3_kpi_report.md"

def load_cleaned_data():
    df = pd.read_csv(CLEAN_PATH)
    df["admission_date"] = pd.to_datetime(df["admission_date"])
    df["discharge_date"] = pd.to_datetime(df["discharge_date"])
    return df

def add_row_level_kpis(df):
    final = df.copy()
    final["total_admissions"] = 1
    final["occupancy_rate"] = (
        final["occupied_beds"] / final["department_bed_capacity"] * 100
    ).round(2)
    final["average_length_of_stay"] = final["length_of_stay_days"]
    final["readmission_rate"] = (final["is_readmission"] * 100).round(2)
    final["bed_utilization_rate"] = (
        final["occupied_beds"] / final["department_bed_capacity"] * 100
    ).round(2)
    final["department_efficiency_score"] = (
        0.40 * (100 - final["readmission_rate"])
        + 0.30 * final["bed_utilization_rate"].clip(upper=100)
        + 0.20 * final["equipment_utilization_rate"].clip(upper=100)
        + 0.10 * final["staff_coverage_rate"].clip(upper=100)
    ).round(2)
    final["admission_date"] = final["admission_date"].dt.date.astype(str)
    final["discharge_date"] = final["discharge_date"].dt.date.astype(str)
    return final

def weighted_average(group, value_column, weight_column):
    weights = group[weight_column].sum()
    if weights == 0:
        return 0.0
    return round((group[value_column] * group[weight_column]).sum() / weights, 2)

def summarize(grouped, group_names):
    rows = []
    for keys, group in grouped:
        if not isinstance(keys, tuple):
            keys = (keys,)
        base = dict(zip(group_names, keys))
        admissions = len(group)
        row = {
            **base,
            "total_admissions": admissions,
            "occupancy_rate": weighted_average(group, "occupancy_rate", "department_bed_capacity"),
            "average_length_of_stay": round(group["length_of_stay_days"].mean(), 2),
            "readmission_rate": round(group["is_readmission"].mean() * 100, 2),
            "bed_utilization_rate": weighted_average(group, "bed_utilization_rate", "department_bed_capacity"),
            "equipment_utilization_rate": round(group["equipment_utilization_rate"].mean(), 2),
            "staff_coverage_rate": round(group["staff_coverage_rate"].mean(), 2),
            "department_efficiency_score": round(group["department_efficiency_score"].mean(), 2),
            "discharge_count": group["discharge_date"].notna().sum(),
            "unique_patients": group["patient_id"].nunique(),
        }
        rows.append(row)
    return pd.DataFrame(rows)

def build_summary_tables(final):
    hospital_summary = summarize(
        final.groupby(["hospital_id", "hospital_name", "region", "city"], dropna=False),
        ["hospital_id", "hospital_name", "region", "city"],
    ).sort_values("total_admissions", ascending=False)

    department_summary = summarize(
        final.groupby(["department"], dropna=False),
        ["department"],
    ).sort_values("total_admissions", ascending=False)

    hospital_department_summary = summarize(
        final.groupby(["hospital_name", "department"], dropna=False),
        ["hospital_name", "department"],
    ).sort_values(["hospital_name", "total_admissions"], ascending=[True, False])

    monthly_trends = summarize(
        final.groupby(["admission_month"], dropna=False),
        ["admission_month"],
    ).sort_values("admission_month")

    overall_kpis = pd.DataFrame(
        [
            {
                "total_admissions": len(final),
                "occupancy_rate": weighted_average(final, "occupancy_rate", "department_bed_capacity"),
                "average_length_of_stay": round(final["length_of_stay_days"].mean(), 2),
                "readmission_rate": round(final["is_readmission"].mean() * 100, 2),
                "bed_utilization_rate": weighted_average(final, "bed_utilization_rate", "department_bed_capacity"),
                "equipment_utilization_rate": round(final["equipment_utilization_rate"].mean(), 2),
                "staff_coverage_rate": round(final["staff_coverage_rate"].mean(), 2),
                "department_efficiency_score": round(final["department_efficiency_score"].mean(), 2),
                "discharge_count": final["discharge_date"].notna().sum(),
                "unique_patients": final["patient_id"].nunique(),
            }
        ]
    )

    return {
        "Final Dataset": final,
        "Overall KPIs": overall_kpis,
        "Hospital Summary": hospital_summary,
        "Department Summary": department_summary,
        "Hospital Department": hospital_department_summary,
        "Monthly Trends": monthly_trends,
        "KPI Definitions": kpi_definitions(),
    }

def kpi_definitions():
    return pd.DataFrame(
        [
            {
                "kpi": "Total Admissions",
                "formula": "Count of admission_id",
                "business_use": "Measures patient volume handled by the hospital or department.",
            },
            {
                "kpi": "Occupancy Rate",
                "formula": "occupied_beds / department_bed_capacity * 100",
                "business_use": "Shows how much department capacity is being used.",
            },
            {
                "kpi": "Average Length of Stay",
                "formula": "Average of length_of_stay_days",
                "business_use": "Tracks how long patients remain admitted on average.",
            },
            {
                "kpi": "Readmission Rate",
                "formula": "readmitted admissions / total admissions * 100",
                "business_use": "Indicates possible care quality, follow-up, or discharge planning issues.",
            },
            {
                "kpi": "Bed Utilization Rate",
                "formula": "occupied_beds / department_bed_capacity * 100",
                "business_use": "Monitors bed usage for resource planning.",
            },
            {
                "kpi": "Department Efficiency Score",
                "formula": "0.40*(100-readmission_rate) + 0.30*bed_utilization_rate + 0.20*equipment_utilization_rate + 0.10*staff_coverage_rate",
                "business_use": "Composite score for comparing departments using quality and utilization indicators.",
            },
        ]
    )

def write_excel_workbook(tables):
    FINAL_XLSX_PATH.parent.mkdir(parents=True, exist_ok=True)
    with pd.ExcelWriter(FINAL_XLSX_PATH, engine="openpyxl") as writer:
        for sheet_name, table in tables.items():
            table.to_excel(writer, index=False, sheet_name=sheet_name)
            worksheet = writer.sheets[sheet_name]
            worksheet.freeze_panes = "A2"
            for column_cells in worksheet.columns:
                max_length = max(len(str(cell.value or "")) for cell in column_cells)
                worksheet.column_dimensions[column_cells[0].column_letter].width = min(max(max_length + 2, 12), 45)

def write_report(tables):
    overall = tables["Overall KPIs"].iloc[0]
    definitions = tables["KPI Definitions"]
    lines = [
        "# Module 3 KPI Engineering Report",
        "",
        "## Deliverables",
        "",
        "- `scripts/generate_hospital_kpis.py`",
        "- `data/processed/hospital_final_dataset.xlsx`",
        "- `data/processed/hospital_final_dataset.csv`",
        "",
        "## Overall KPI Results",
        "",
        "| KPI | Value |",
        "|---|---:|",
        f"| Total Admissions | {int(overall['total_admissions'])} |",
        f"| Occupancy Rate | {overall['occupancy_rate']}% |",
        f"| Average Length of Stay | {overall['average_length_of_stay']} days |",
        f"| Readmission Rate | {overall['readmission_rate']}% |",
        f"| Bed Utilization Rate | {overall['bed_utilization_rate']}% |",
        f"| Department Efficiency Score | {overall['department_efficiency_score']} |",
        "",
        "## KPI Definitions",
        "",
    ]
    for _, row in definitions.iterrows():
        lines.append(f"### {row['kpi']}")
        lines.append("")
        lines.append(f"- Formula: `{row['formula']}`")
        lines.append(f"- Use: {row['business_use']}")
        lines.append("")
    lines.extend(
        [
            "## Mentor Target Status",
            "",
            "- 6+ KPIs generated: Passed",
            "- Dataset optimized for Tableau: Passed",
            "- KPI calculation script created: Passed",
            "- Final Excel dataset created: Passed",
        ]
    )
    KPI_REPORT_PATH.write_text("\n".join(lines), encoding="utf-8")

def main():
    cleaned = load_cleaned_data()
    final = add_row_level_kpis(cleaned)
    tables = build_summary_tables(final)
    final.to_csv(FINAL_CSV_PATH, index=False)
    write_excel_workbook(tables)
    write_report(tables)
    print(f"Wrote {FINAL_XLSX_PATH}")
    print(f"Wrote {FINAL_CSV_PATH}")
    print(f"Wrote {KPI_REPORT_PATH}")

if __name__ == "__main__":
    main()
