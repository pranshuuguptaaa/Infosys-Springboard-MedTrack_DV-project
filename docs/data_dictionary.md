# Data Dictionary

## Dataset

Primary Tableau dataset: `data/processed/hospital_final_dataset.xlsx`

Base cleaned dataset: `data/processed/hospital_cleaned.csv`

## Fields

| Column | Description |
|---|---|
| admission_id | Unique admission record identifier |
| patient_id | Synthetic patient identifier |
| hospital_id | Hospital identifier |
| hospital_name | Hospital name |
| region | Hospital region |
| city | Hospital city |
| department | Standardized department name |
| admission_date | Patient admission date |
| discharge_date | Patient discharge date |
| admission_type | Emergency, elective, referral, or outpatient transfer |
| discharge_status | Patient discharge outcome |
| age | Patient age |
| gender | Patient gender |
| insurance_type | Insurance/payment category |
| total_beds | Total beds in the hospital |
| department_bed_capacity | Beds assigned to the department |
| occupied_beds | Beds occupied during the admission snapshot |
| staff_available | Staff available for the department snapshot |
| staff_required | Staff required for the department snapshot |
| equipment_available | Equipment available for the department snapshot |
| equipment_in_use | Equipment currently in use |
| readmission_flag | 1 if admission is a readmission, otherwise 0 |
| length_of_stay_days | Days between admission and discharge |
| admission_month | Month extracted from admission date |
| admission_year | Year extracted from admission date |
| admission_quarter | Quarter extracted from admission date |
| bed_utilization_rate | Occupied beds divided by department bed capacity |
| equipment_utilization_rate | Equipment in use divided by equipment available |
| staff_coverage_rate | Staff available divided by staff required |
| is_readmission | Tableau-friendly readmission indicator |
| total_admissions | Row-level admission counter; sum this field to calculate total admissions |
| occupancy_rate | Occupied beds divided by department bed capacity |
| average_length_of_stay | Row-level length of stay value used for average LOS calculations |
| department_efficiency_score | Composite performance score using readmission, bed utilization, equipment utilization, and staff coverage |

## Workbook Sheets

| Sheet | Description |
|---|---|
| Final Dataset | Row-level Tableau-ready dataset with KPI fields |
| Overall KPIs | Overall hospital network KPI summary |
| Hospital Summary | KPI summary grouped by hospital |
| Department Summary | KPI summary grouped by department |
| Hospital Department | KPI summary grouped by hospital and department |
| Monthly Trends | KPI summary grouped by admission month |
| KPI Definitions | Formula and business meaning for each required KPI |
