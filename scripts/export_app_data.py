import json
import pandas as pd
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / "data" / "processed" / "hospital_final_dataset.csv"
JSON_PATH = ROOT / "data" / "app_data.json"

def export_data():
    df = pd.read_csv(CSV_PATH)
    
    # Overall metrics
    total_admissions = int(len(df))
    avg_los = round(float(df["length_of_stay_days"].mean()), 2)
    readmission_rate = round(float(df["is_readmission"].mean() * 100), 2)
    
    total_occ_beds = float(df["occupied_beds"].sum())
    total_cap_beds = float(df["department_bed_capacity"].sum())
    occupancy_rate = round((total_occ_beds / total_cap_beds * 100), 2) if total_cap_beds > 0 else 0
    
    avg_efficiency = round(float(df["department_efficiency_score"].mean()), 2)
    total_discharges = int(df["discharge_date"].notna().sum())
    
    # Monthly trends
    monthly = df.groupby("admission_month").agg(
        admissions=("admission_id", "count"),
        readmissions=("is_readmission", "sum"),
        avg_los=("length_of_stay_days", "mean"),
        occupied_beds=("occupied_beds", "sum"),
        capacity_beds=("department_bed_capacity", "sum")
    ).reset_index()
    monthly["occ_rate"] = (monthly["occupied_beds"] / monthly["capacity_beds"] * 100).round(2)
    monthly["readmission_rate"] = (monthly["readmissions"] / monthly["admissions"] * 100).round(2)
    monthly["avg_los"] = monthly["avg_los"].round(2)
    
    # Department breakdown
    dept = df.groupby("department").agg(
        admissions=("admission_id", "count"),
        readmissions=("is_readmission", "sum"),
        avg_los=("length_of_stay_days", "mean"),
        efficiency=("department_efficiency_score", "mean"),
        occupied_beds=("occupied_beds", "sum"),
        capacity_beds=("department_bed_capacity", "sum"),
        staff_avail=("staff_available", "mean"),
        staff_req=("staff_required", "mean"),
        equip_in_use=("equipment_in_use", "mean"),
        equip_avail=("equipment_available", "mean")
    ).reset_index()
    dept["readmission_rate"] = (dept["readmissions"] / dept["admissions"] * 100).round(2)
    dept["occupancy_rate"] = (dept["occupied_beds"] / dept["capacity_beds"] * 100).round(2)
    dept["avg_los"] = dept["avg_los"].round(2)
    dept["efficiency"] = dept["efficiency"].round(2)
    dept["staff_coverage"] = (dept["staff_avail"] / dept["staff_req"] * 100).round(2)
    dept["equip_util"] = (dept["equip_in_use"] / dept["equip_avail"] * 100).round(2)
    
    # Region breakdown
    region = df.groupby("region").agg(
        admissions=("admission_id", "count"),
        readmissions=("is_readmission", "sum"),
        occupied_beds=("occupied_beds", "sum"),
        capacity_beds=("department_bed_capacity", "sum")
    ).reset_index()
    region["occupancy_rate"] = (region["occupied_beds"] / region["capacity_beds"] * 100).round(2)
    region["readmission_rate"] = (region["readmissions"] / region["admissions"] * 100).round(2)
    
    # Hospital breakdown
    hospital = df.groupby(["hospital_id", "hospital_name", "region", "city"]).agg(
        admissions=("admission_id", "count"),
        readmissions=("is_readmission", "sum"),
        avg_los=("length_of_stay_days", "mean"),
        occupied_beds=("occupied_beds", "sum"),
        capacity_beds=("department_bed_capacity", "sum")
    ).reset_index()
    hospital["occupancy_rate"] = (hospital["occupied_beds"] / hospital["capacity_beds"] * 100).round(2)
    hospital["readmission_rate"] = (hospital["readmissions"] / hospital["admissions"] * 100).round(2)
    hospital["avg_los"] = hospital["avg_los"].round(2)

    # Admission Type & Discharge Status Mix
    admission_types = df["admission_type"].value_counts().to_dict()
    discharge_statuses = df["discharge_status"].value_counts().to_dict()
    
    # Length of Stay distribution
    los_counts = df["length_of_stay_days"].value_counts().sort_index().to_dict()

    payload = {
        "summary": {
            "total_admissions": total_admissions,
            "occupancy_rate": occupancy_rate,
            "avg_los": avg_los,
            "readmission_rate": readmission_rate,
            "bed_utilization_rate": occupancy_rate,
            "avg_efficiency": avg_efficiency,
            "total_discharges": total_discharges
        },
        "monthly": monthly.to_dict(orient="records"),
        "department": dept.to_dict(orient="records"),
        "region": region.to_dict(orient="records"),
        "hospital": hospital.to_dict(orient="records"),
        "admission_types": admission_types,
        "discharge_statuses": discharge_statuses,
        "los_distribution": los_counts,
        "hospitals_list": sorted(df["hospital_name"].dropna().unique().tolist()),
        "departments_list": sorted(df["department"].dropna().unique().tolist()),
        "regions_list": sorted(df["region"].dropna().unique().tolist())
    }
    
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    print(f"Exported app data to {JSON_PATH}")

if __name__ == "__main__":
    export_data()
