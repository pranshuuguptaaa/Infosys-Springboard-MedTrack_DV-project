"""Create the Milestone 1 raw hospital operations dataset.

The project brief asks for publicly available hospital and patient admission
data. Real patient-level admission data is usually restricted, so this script
creates a reproducible Synthea-style synthetic dataset suitable for Tableau
practice and portfolio work.
"""

from __future__ import annotations

import csv
import random
from datetime import date, timedelta
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RAW_PATH = ROOT / "data" / "raw" / "hospital_raw_data.csv"

RANDOM_SEED = 20260705
ROW_COUNT = 1500

HOSPITALS = [
    ("H001", "CityCare Hospital", "North", "Metro City", 320),
    ("H002", "Green Valley Hospital", "South", "Lake Town", 260),
    ("H003", "Sunrise Medical Center", "East", "River City", 210),
    ("H004", "Metro Health Institute", "West", "Hill View", 280),
    ("H005", "Hopewell Hospital", "Central", "Capital District", 180),
]

DEPARTMENTS = [
    ("General Medicine", 0.26, 5.0),
    ("Surgery", 0.16, 6.2),
    ("Orthopedics", 0.12, 5.4),
    ("Cardiology", 0.14, 4.6),
    ("Pediatrics", 0.12, 3.2),
    ("Emergency", 0.15, 1.7),
    ("ICU", 0.05, 7.8),
]

ADMISSION_TYPES = ["Emergency", "Elective", "Referral", "Outpatient Transfer"]
DISCHARGE_STATUS = ["Recovered", "Transferred", "Against Medical Advice", "Deceased"]
INSURANCE_TYPES = ["Private", "Government", "Self Pay", "Corporate"]
GENDERS = ["Female", "Male", "Other"]

DEPARTMENT_VARIANTS = {
    "General Medicine": ["general medicine", "Gen. Medicine", "General Medicine"],
    "Surgery": ["surgery", "Surgery", "Surgical"],
    "Orthopedics": ["orthopedics", "Orthopaedics", "Orthopedics"],
    "Cardiology": ["cardiology", "Cardiology"],
    "Pediatrics": ["paediatrics", "Pediatrics", "pediatrics"],
    "Emergency": ["emergency", "Emergency", "ER"],
    "ICU": ["icu", "ICU", "Intensive Care"],
}


def weighted_department() -> tuple[str, float]:
    pick = random.random()
    running = 0.0
    for department, weight, avg_stay in DEPARTMENTS:
        running += weight
        if pick <= running:
            return department, avg_stay
    department, _, avg_stay = DEPARTMENTS[-1]
    return department, avg_stay


def choose_discharge_status(department: str) -> str:
    if department == "ICU":
        weights = [0.72, 0.16, 0.03, 0.09]
    elif department == "Emergency":
        weights = [0.82, 0.12, 0.04, 0.02]
    else:
        weights = [0.88, 0.08, 0.03, 0.01]
    return random.choices(DISCHARGE_STATUS, weights=weights, k=1)[0]


def make_rows() -> list[dict[str, object]]:
    random.seed(RANDOM_SEED)
    rows: list[dict[str, object]] = []
    start = date(2024, 1, 1)
    end = date(2024, 12, 31)
    total_days = (end - start).days

    for idx in range(1, ROW_COUNT + 1):
        hospital_id, hospital_name, region, city, total_beds = random.choice(HOSPITALS)
        department, average_stay = weighted_department()
        noisy_department = random.choice(DEPARTMENT_VARIANTS[department])
        admission_date = start + timedelta(days=random.randint(0, total_days))
        length_of_stay = max(1, round(random.gauss(average_stay, 1.8)))
        discharge_date = admission_date + timedelta(days=length_of_stay)
        age = max(0, min(95, int(random.gauss(45, 22))))
        patient_id = f"P{random.randint(1, 850):05d}"
        bed_capacity = max(10, int(total_beds * random.uniform(0.08, 0.22)))
        occupied_beds = min(bed_capacity, max(1, int(random.gauss(bed_capacity * 0.78, 8))))
        staff_available = max(5, int(bed_capacity * random.uniform(0.24, 0.42)))
        staff_required = max(5, int(occupied_beds * random.uniform(0.28, 0.44)))
        equipment_available = max(4, int(bed_capacity * random.uniform(0.18, 0.35)))
        equipment_in_use = min(
            equipment_available, max(1, int(equipment_available * random.uniform(0.45, 0.9)))
        )
        readmission_flag = int(random.random() < (0.11 if department in {"ICU", "Cardiology"} else 0.07))
        discharge_status = choose_discharge_status(department)

        row = {
            "admission_id": f"A{idx:06d}",
            "patient_id": patient_id,
            "hospital_id": hospital_id,
            "hospital_name": hospital_name,
            "region": region,
            "city": city,
            "department": noisy_department,
            "admission_date": admission_date.isoformat(),
            "discharge_date": discharge_date.isoformat(),
            "admission_type": random.choice(ADMISSION_TYPES),
            "discharge_status": discharge_status,
            "age": age,
            "gender": random.choice(GENDERS),
            "insurance_type": random.choice(INSURANCE_TYPES),
            "total_beds": total_beds,
            "department_bed_capacity": bed_capacity,
            "occupied_beds": occupied_beds,
            "staff_available": staff_available,
            "staff_required": staff_required,
            "equipment_available": equipment_available,
            "equipment_in_use": equipment_in_use,
            "readmission_flag": readmission_flag,
        }

        rows.append(row)

    # Add realistic raw-data issues for the cleaning milestone.
    rows.extend(rows[:18])
    for row in random.sample(rows, 12):
        row["department"] = ""
    for row in random.sample(rows, 9):
        row["insurance_type"] = ""
    for row in random.sample(rows, 6):
        row["age"] = ""

    return rows


def main() -> None:
    RAW_PATH.parent.mkdir(parents=True, exist_ok=True)
    rows = make_rows()
    with RAW_PATH.open("w", newline="", encoding="utf-8") as output:
        writer = csv.DictWriter(output, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)
    print(f"Wrote {len(rows)} raw rows to {RAW_PATH}")


if __name__ == "__main__":
    main()
