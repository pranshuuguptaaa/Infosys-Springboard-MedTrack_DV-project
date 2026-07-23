# MedTrack_DV Tableau Prototype Build Guide

## File to Connect

Open Tableau Desktop or Tableau Public and connect to:

`data/processed/hospital_final_dataset.xlsx`

Use the `Final Dataset` sheet as the main source.

## Workbook Name

Save the Tableau workbook as:

`dashboard/medtrack_prototype.twbx`

## Dashboard Size

Recommended fixed size:

- Width: 1366 px
- Height: 768 px

## Visual Theme

- Background: dark navy
- Primary accent: teal
- Secondary accents: green, blue, magenta
- Use compact KPI cards across the top
- Use a left sidebar for navigation
- Use consistent filters across all dashboards

## Build Order

1. Connect to `hospital_final_dataset.xlsx`.
2. Create calculated fields listed in `dashboard/tableau_calculated_fields.md`.
3. Create worksheets for KPI cards and charts.
4. Build `Hospital Overview` dashboard.
5. Duplicate the dashboard structure for Patient Flow, Department Analytics, and Resource Utilization.
6. Add global filters and apply them to all related worksheets.
7. Add navigation buttons between dashboards.
8. Add dashboard actions for hospital, department, month, and region drilldowns.
9. Verify KPI values against `docs/module3_kpi_report.md`.
10. Save as packaged workbook `.twbx`.

## Required Dashboards

### Hospital Overview

Use this for the main executive view:

- Total Admissions
- Occupancy Rate
- Average Length of Stay
- Readmission Rate
- Bed Utilization Rate
- Monthly admissions trend
- Admissions by department
- Admissions by region
- Readmission by department

### Patient Flow

Use this for movement and timeline analysis:

- Admission trends
- Discharge tracking
- Length of stay distribution
- Peak patient load
- Admission type mix
- Discharge status breakdown

### Department Analytics

Use this for performance comparison:

- Patient volume by department
- Readmission rate by department
- Department efficiency score
- Treatment capacity
- Average stay by department

### Resource Utilization

Use this for resource planning:

- Bed utilization analysis
- Staff allocation monitoring
- Equipment utilization tracking
- Capacity planning insights
- Resource availability analysis

## Prototype Verification

Before showing the mentor:

- Confirm the workbook contains four dashboards.
- Confirm filters work on all dashboards.
- Confirm navigation buttons move between dashboards.
- Confirm KPI values match the Module 3 report.
- Confirm workbook is saved as `medtrack_prototype.twbx`.
