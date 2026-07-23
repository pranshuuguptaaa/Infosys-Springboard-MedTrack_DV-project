# MedTrack_DV - Hospital Operations & Patient Analytics Dashboard

This repository follows the Infosys Springboard mentor brief for a Tableau-based hospital operations dashboard suite and interactive Web Analytics prototype.

## Tech Stack

| Area | Tools / Libraries |
|---|---|
| **Data Collection** | Python, Hospital Dataset, Patient Admission Dataset |
| **Data Processing** | Pandas, NumPy |
| **Data Cleaning** | Python |
| **Visualization** | Tableau Desktop / Tableau Public, Web Interactive Suite (Chart.js) |
| **Dashboard Integration** | Tableau Filters, Parameters, Actions |
| **Documentation** | Markdown, GitHub |

---

## Current Scope

### Milestone 1 (Complete)
- Data collection and integration (`scripts/data_collection.py`)
- Data cleaning and transformation (`scripts/clean_hospital_data.py`)
- Raw hospital operations dataset (`data/raw/hospital_raw_data.csv`)
- Cleaned Tableau-ready dataset (`data/processed/hospital_cleaned.csv`)
- Cleaning notebook and quality report (`docs/milestone1_quality_report.md`)

### Module 3 (Complete)
- Hospital KPI engineering (`scripts/generate_hospital_kpis.py`)
- Final Excel dataset for Tableau (`data/processed/hospital_final_dataset.xlsx`)
- KPI calculation script and Definitions report (`docs/module3_kpi_report.md`)

### Module 4 (Complete)
- Tableau prototype build guide (`dashboard/medtrack_prototype_build_guide.md`)
- Calculated fields documentation (`dashboard/tableau_calculated_fields.md`)
- Full interactive web prototype (`index.html`, `index.css`, `app.js`)

---

## Project Structure

```text
Infosys/
  data/
    raw/hospital_raw_data.csv
    processed/hospital_cleaned.csv
    processed/hospital_final_dataset.csv
    processed/hospital_final_dataset.xlsx
    app_data.json
  scripts/
    data_collection.py
    clean_hospital_data.py
    generate_hospital_kpis.py
    create_dashboard_storyboard.py
    export_app_data.py
  notebooks/
    hospital_cleaning.ipynb
  docs/
    milestone1_quality_report.md
    module3_kpi_report.md
    module4_dashboard_spec.md
    data_dictionary.md
    dashboard_storyboard.pdf
  dashboard/
    tableau_calculated_fields.md
    medtrack_prototype_build_guide.md
  index.html
  index.css
  app.js
```

---

## Reproduce Project Outputs

Run commands inside the `Infosys` directory:

```bash
cd Infosys
python3 scripts/data_collection.py
python3 scripts/clean_hospital_data.py
python3 scripts/generate_hospital_kpis.py
python3 scripts/create_dashboard_storyboard.py
python3 scripts/export_app_data.py
```

---

## Data Source Note

The project uses reproducible synthetic hospital admission data inspired by public Synthea healthcare data concepts. This is appropriate for portfolio work because real patient-level admission records are privacy-sensitive and usually not publicly available.

- Synthea Simulator: https://github.com/synthetichealth/synthea
