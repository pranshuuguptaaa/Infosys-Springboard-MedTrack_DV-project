# Module 4 Dashboard Planning & Prototyping

## Objective

Design the Tableau dashboard suite for MedTrack_DV before full dashboard development. This module defines layouts, filters, navigation, actions, and the prototype build process.

## Tableau Data Source

Use:

`data/processed/hospital_final_dataset.xlsx`

Primary sheet:

`Final Dataset`

Supporting validation sheets:

- `Overall KPIs`
- `Hospital Summary`
- `Department Summary`
- `Hospital Department`
- `Monthly Trends`
- `KPI Definitions`

## Dashboard Suite

### 1. Hospital Overview

Purpose: executive summary of hospital performance.

Planned visuals:

- KPI cards: Total Admissions, Occupancy Rate, Average Length of Stay, Readmission Rate, Bed Utilization Rate, Discharge Count
- Admissions trend by month
- Occupancy trend by month
- Readmission trend by month
- Admissions by patient/admission type
- Admissions by department
- Average length of stay by department
- Readmission rate by department
- Admissions by region
- Monthly admissions vs discharges
- Top hospitals by occupancy rate

### 2. Patient Flow

Purpose: patient movement and admission/discharge monitoring.

Planned visuals:

- Admission trends
- Discharge tracking
- Patient movement from admission to discharge
- Average length of stay distribution
- Peak patient load by month
- Admission type mix
- Discharge status breakdown
- Patient flow by department and hospital

### 3. Department Analytics

Purpose: compare department performance and efficiency.

Planned visuals:

- Patient volume by department
- Readmission by department
- Department efficiency score comparison
- Treatment capacity by department
- Average length of stay by department
- Hospital and department heatmap
- Department outcome profile

### 4. Resource Utilization

Purpose: monitor beds, staff, equipment, and capacity planning.

Planned visuals:

- Bed utilization by department
- Staff available vs staff required
- Equipment utilization tracking
- Capacity planning trend
- Resource availability heatmap
- Hospital utilization ranking
- Bed utilization vs staff coverage scatter

## Global Filters

Apply these filters to all dashboards:

- Date Range: `admission_date`
- Hospital: `hospital_name`
- Department: `department`
- Region: `region`
- Admission Type: `admission_type`
- Discharge Status: `discharge_status`

## Navigation

Create dashboard navigation buttons:

- Hospital Overview
- Patient Flow
- Department Analytics
- Resource Utilization

Recommended placement:

- Left sidebar navigation
- Top-right home/dashboard/about icons

## Dashboard Actions

| Action | Source | Target | Purpose |
|---|---|---|---|
| Navigation | Sidebar buttons | All dashboards | Move between dashboards |
| Department filter | Department charts | All dashboards | Drill into department performance |
| Hospital filter | Hospital charts | All dashboards | Drill into hospital performance |
| Month filter | Trend charts | Patient Flow and Overview | Analyze peak load periods |
| Region filter | Region visual | All dashboards | Compare geography |
| Highlight | Efficiency score chart | Department and resource charts | Compare high/low efficiency departments |

## Prototype Approval Criteria

- Four dashboard layouts are defined.
- Filters and navigation are planned.
- Dashboard actions are documented.
- KPI cards align with Module 3 KPI definitions.
- Tableau workbook can be built from `hospital_final_dataset.xlsx`.
