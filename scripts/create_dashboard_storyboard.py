"""Create the Module 4 dashboard storyboard PDF."""

from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "docs" / "dashboard_storyboard.pdf"

PAGE_SIZE = landscape(letter)
DARK = colors.HexColor("#07131F")
PANEL = colors.HexColor("#0D2233")
TEAL = colors.HexColor("#18C4C7")
GREEN = colors.HexColor("#6BD36B")
MAGENTA = colors.HexColor("#E85285")
BLUE = colors.HexColor("#5E9CFF")
TEXT = colors.HexColor("#E9F2F7")
MUTED = colors.HexColor("#A8B7C2")
GRID = colors.HexColor("#244155")


def styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=30,
            textColor=DARK,
            spaceAfter=12,
        ),
        "h1": ParagraphStyle(
            "Heading",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            textColor=DARK,
            spaceAfter=8,
        ),
        "h2": ParagraphStyle(
            "Subheading",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=16,
            textColor=colors.HexColor("#0E4A5A"),
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=colors.HexColor("#1C2A33"),
            spaceAfter=6,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=colors.HexColor("#1C2A33"),
        ),
    }


def p(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def bullet_list(items: list[str], style: ParagraphStyle) -> list[Paragraph]:
    return [p(f"- {item}", style) for item in items]


def cover_story(st: dict[str, ParagraphStyle]) -> list:
    story = [
        p("MedTrack_DV Dashboard Storyboard", st["title"]),
        p("Module 4: Dashboard Planning and Prototyping", st["h1"]),
        p(
            "This storyboard defines the planned Tableau workbook structure, dashboard layouts, "
            "filters, navigation, and actions for the Hospital Operations & Patient Analytics Dashboard.",
            st["body"],
        ),
        Spacer(1, 0.15 * inch),
        p("Dashboards Planned", st["h2"]),
    ]
    story.extend(
        bullet_list(
            [
                "Hospital Overview",
                "Patient Flow",
                "Department Analytics",
                "Resource Utilization",
            ],
            st["body"],
        )
    )
    story.extend(
        [
            Spacer(1, 0.12 * inch),
            p("Global Controls", st["h2"]),
            p(
                "Date Range, Hospital, Department, Region, Admission Type, Discharge Status, and Reset Filters.",
                st["body"],
            ),
            Spacer(1, 0.12 * inch),
            p("Primary Data Source", st["h2"]),
            p("data/processed/hospital_final_dataset.xlsx - Final Dataset sheet", st["body"]),
            PageBreak(),
        ]
    )
    return story


def layout_table(title: str, panels: list[list[str]], accent=TEAL) -> Table:
    data = [
        [
            Paragraph("<font color='white'><b>MedTrack DV</b></font>", ParagraphStyle("dash-title", fontSize=11, leading=13)),
            Paragraph("<font color='white'>Date Range | Hospital | Department | Region</font>", ParagraphStyle("filters", fontSize=8, leading=10)),
        ],
        [
            Paragraph("<font color='white'><b>Navigation</b><br/>Overview<br/>Patient Flow<br/>Department<br/>Resources</font>", ParagraphStyle("nav", fontSize=7.6, leading=11)),
            "",
        ],
    ]
    table = Table(data, colWidths=[1.55 * inch, 8.8 * inch], rowHeights=[0.42 * inch, 4.7 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), DARK),
                ("BACKGROUND", (0, 0), (0, 1), colors.HexColor("#06101A")),
                ("BOX", (0, 0), (-1, -1), 1, DARK),
                ("LINEBELOW", (0, 0), (-1, 0), 0.7, GRID),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TEXTCOLOR", (0, 0), (-1, -1), TEXT),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )

    inner = []
    for row in panels:
        inner.append(
            [
                Paragraph(
                    f"<font color='white'><b>{cell.split('|')[0]}</b></font><br/><font color='#A8B7C2'>{cell.split('|')[1]}</font>",
                    ParagraphStyle("panel", fontSize=7.8, leading=10),
                )
                for cell in row
            ]
        )
    inner_table = Table(inner, colWidths=[2.12 * inch] * 4, rowHeights=[0.72 * inch, 1.14 * inch, 1.14 * inch])
    inner_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PANEL),
                ("BOX", (0, 0), (-1, -1), 0.6, GRID),
                ("INNERGRID", (0, 0), (-1, -1), 0.45, GRID),
                ("LINEABOVE", (0, 0), (-1, 0), 2, accent),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    table._cellvalues[1][1] = inner_table
    return table


def dashboard_page(st: dict[str, ParagraphStyle], title: str, purpose: str, panels: list[list[str]], notes: list[str], accent=TEAL) -> list:
    story = [p(title, st["h1"]), p(purpose, st["body"]), layout_table(title, panels, accent), Spacer(1, 0.14 * inch)]
    story.append(p("Planning Notes", st["h2"]))
    story.extend(bullet_list(notes, st["small"]))
    story.append(PageBreak())
    return story


def spec_tables(st: dict[str, ParagraphStyle]) -> list:
    action_data = [
        ["Interaction", "Source", "Target", "Purpose"],
        ["Dashboard navigation", "Sidebar buttons", "All dashboards", "Move between four views"],
        ["Global filters", "Date, hospital, department, region", "All dashboards", "Consistent slicing"],
        ["Department selection", "Department charts", "Overview and resources", "Compare selected department"],
        ["Month selection", "Trend charts", "Patient flow", "Investigate peak patient load"],
        ["Hospital selection", "Hospital charts", "Department and resource views", "Hospital-level drilldown"],
    ]
    table = Table(action_data, colWidths=[1.8 * inch, 2.2 * inch, 2.1 * inch, 4.1 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), DARK),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#CBD5DC")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("FONTSIZE", (0, 0), (-1, -1), 8.2),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F3F7FA")]),
            ]
        )
    )
    return [
        p("Filters, Navigation, and Dashboard Actions", st["h1"]),
        table,
        Spacer(1, 0.18 * inch),
        p("Prototype Acceptance Checklist", st["h2"]),
        *bullet_list(
            [
                "Each dashboard uses the Final Dataset sheet from hospital_final_dataset.xlsx.",
                "Global filters are visible and apply across all four dashboards.",
                "Navigation buttons move between Hospital Overview, Patient Flow, Department Analytics, and Resource Utilization.",
                "KPI tiles match values from the Overall KPIs sheet.",
                "Department and hospital drilldowns respond to selected marks.",
                "Workbook is saved from Tableau as dashboard/medtrack_prototype.twbx.",
            ],
            st["body"],
        ),
    ]


def build_story() -> list:
    st = styles()
    story = cover_story(st)
    story.extend(
        dashboard_page(
            st,
            "Dashboard 1 - Hospital Overview",
            "Executive view for admissions, occupancy, readmissions, and overall hospital performance.",
            [
                ["Total Admissions|KPI tile", "Occupancy Rate|KPI tile", "Avg Length of Stay|KPI tile", "Readmission Rate|KPI tile"],
                ["Admissions Trend|Monthly line chart", "Occupancy Trend|Monthly line chart", "Readmission Trend|Monthly line chart", "Admissions by Type|Donut chart"],
                ["Admissions by Department|Bar chart", "Admissions by Region|Map or filled region", "Admissions vs Discharges|Combo bar chart", "Top Hospitals|Ranked bar chart"],
            ],
            [
                "Primary users: hospital administrators and healthcare managers.",
                "Default view should show full year 2024 and all hospitals.",
                "KPI tiles should use teal, green, blue, and magenta accents for quick scanning.",
            ],
            TEAL,
        )
    )
    story.extend(
        dashboard_page(
            st,
            "Dashboard 2 - Patient Flow",
            "Operational view for admission trends, discharge tracking, movement, average stay, and peak patient load.",
            [
                ["Admissions|KPI tile", "Discharges|KPI tile", "Avg Stay|KPI tile", "Peak Month|KPI tile"],
                ["Daily/Monthly Admissions|Line chart", "Discharges by Status|Stacked bar", "Admission Type Mix|Donut chart", "Length of Stay Distribution|Histogram"],
                ["Patient Movement|Admission to discharge timeline", "Peak Load by Month|Heatmap", "Flow by Department|Sankey-style bar", "Age Group Flow|Stacked bar"],
            ],
            [
                "Use admission_date and discharge_date for flow timing.",
                "Clicking a month should filter length-of-stay and department movement visuals.",
                "Highlight emergency admissions separately because they affect capacity planning.",
            ],
            BLUE,
        )
    )
    story.extend(
        dashboard_page(
            st,
            "Dashboard 3 - Department Analytics",
            "Department comparison view for volume, readmissions, efficiency, and treatment capacity.",
            [
                ["Departments|Count tile", "Best Efficiency|KPI tile", "Highest Readmission|KPI tile", "Highest Volume|KPI tile"],
                ["Volume by Department|Horizontal bar", "Readmission by Department|Bar chart", "Efficiency Score|Ranked bar", "Avg Stay by Department|Bar chart"],
                ["Capacity by Department|Grouped bar", "Hospital x Department|Heatmap", "Discharge Outcomes|Stacked bar", "Department Detail|Text/KPI panel"],
            ],
            [
                "Sort departments by total admissions by default.",
                "Use Department Efficiency Score as the main comparison metric.",
                "Selecting a department should filter hospital and resource details.",
            ],
            MAGENTA,
        )
    )
    story.extend(
        dashboard_page(
            st,
            "Dashboard 4 - Resource Utilization",
            "Resource planning view for beds, staff, equipment, capacity, and availability.",
            [
                ["Bed Utilization|KPI tile", "Equipment Utilization|KPI tile", "Staff Coverage|KPI tile", "Available Capacity|KPI tile"],
                ["Bed Utilization by Dept|Bar chart", "Staff Available vs Required|Grouped bar", "Equipment Use|Bar chart", "Capacity Trend|Monthly line"],
                ["Hospital Capacity|Ranked bar", "Resource Availability|Heatmap", "Utilization Scatter|Beds vs staff", "Planning Notes|Text panel"],
            ],
            [
                "Use red/magenta warnings when utilization or staffing becomes risky.",
                "Hospital and department filters should drive the resource views.",
                "This dashboard supports capacity planning decisions.",
            ],
            GREEN,
        )
    )
    story.extend(spec_tables(st))
    return story


def main() -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=PAGE_SIZE,
        rightMargin=0.45 * inch,
        leftMargin=0.45 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.45 * inch,
        title="MedTrack_DV Dashboard Storyboard",
    )
    doc.build(build_story())
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
