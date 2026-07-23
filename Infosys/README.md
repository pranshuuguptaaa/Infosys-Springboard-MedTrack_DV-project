# MedTrack_DV - Hospital Operations & Patient Analytics Dashboard

This repository follows the Infosys Springboard mentor brief for a Tableau-based hospital operations dashboard suite.

## Current Scope

Milestone 1 is complete:

- Data collection and integration
- Data cleaning and transformation
- Raw hospital operations dataset
- Cleaned Tableau-ready dataset
- Cleaning notebook and quality report

Module 3 is complete:

- Hospital KPI engineering
- Final Excel dataset for Tableau
- KPI calculation script
- KPI definitions and validation report

## Project Structure

```text
data/
  raw/hospital_raw_data.csv
  processed/hospital_cleaned.csv
  processed/hospital_final_dataset.csv
  processed/hospital_final_dataset.xlsx
scripts/
  data_collection.py
  clean_hospital_data.py
  generate_hospital_kpis.py
notebooks/
  hospital_cleaning.ipynb
docs/
  milestone1_quality_report.md
  module3_kpi_report.md
  data_dictionary.md
dashboard/
```

## Reproduce Project Outputs

```bash
python3 scripts/data_collection.py
python3 scripts/clean_hospital_data.py
python3 scripts/generate_hospital_kpis.py
```

## Data Source Note

The project uses reproducible synthetic hospital admission data inspired by public Synthea healthcare data concepts. This is appropriate for portfolio work because real patient-level admission records are privacy-sensitive and usually not publicly available.

Reference:

- Synthea, Synthetic Patient Population Simulator: https://github.com/synthetichealth/synthea
- Synthea sample data repository: https://github.com/synthetichealth/synthea-sample-data
