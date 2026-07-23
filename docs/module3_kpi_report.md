# Module 3 KPI Engineering Report

## Deliverables

- `scripts/generate_hospital_kpis.py`
- `data/processed/hospital_final_dataset.xlsx`
- `data/processed/hospital_final_dataset.csv`

## Overall KPI Results

| KPI | Value |
|---|---:|
| Total Admissions | 1500 |
| Occupancy Rate | 74.83% |
| Average Length of Stay | 4.75 days |
| Readmission Rate | 7.4% |
| Bed Utilization Rate | 74.83% |
| Department Efficiency Score | 80.97 |

## KPI Definitions

### Total Admissions

- Formula: `Count of admission_id`
- Use: Measures patient volume handled by the hospital or department.

### Occupancy Rate

- Formula: `occupied_beds / department_bed_capacity * 100`
- Use: Shows how much department capacity is being used.

### Average Length of Stay

- Formula: `Average of length_of_stay_days`
- Use: Tracks how long patients remain admitted on average.

### Readmission Rate

- Formula: `readmitted admissions / total admissions * 100`
- Use: Indicates possible care quality, follow-up, or discharge planning issues.

### Bed Utilization Rate

- Formula: `occupied_beds / department_bed_capacity * 100`
- Use: Monitors bed usage for resource planning.

### Department Efficiency Score

- Formula: `0.40*(100-readmission_rate) + 0.30*bed_utilization_rate + 0.20*equipment_utilization_rate + 0.10*staff_coverage_rate`
- Use: Composite score for comparing departments using quality and utilization indicators.

## Mentor Target Status

- 6+ KPIs generated: Passed
- Dataset optimized for Tableau: Passed
- KPI calculation script created: Passed
- Final Excel dataset created: Passed