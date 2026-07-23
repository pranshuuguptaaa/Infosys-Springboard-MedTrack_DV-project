# Tableau Calculated Fields

Use these calculated fields if Tableau does not automatically use the KPI fields from `hospital_final_dataset.xlsx`.

## Total Admissions

```tableau
COUNT([admission_id])
```

## Occupancy Rate

```tableau
SUM([occupied_beds]) / SUM([department_bed_capacity]) * 100
```

## Average Length of Stay

```tableau
AVG([length_of_stay_days])
```

## Readmission Rate

```tableau
SUM([is_readmission]) / COUNT([admission_id]) * 100
```

## Bed Utilization Rate

```tableau
SUM([occupied_beds]) / SUM([department_bed_capacity]) * 100
```

## Equipment Utilization Rate

```tableau
SUM([equipment_in_use]) / SUM([equipment_available]) * 100
```

## Staff Coverage Rate

```tableau
SUM([staff_available]) / SUM([staff_required]) * 100
```

## Department Efficiency Score

```tableau
0.40 * (100 - [Readmission Rate])
+ 0.30 * [Bed Utilization Rate]
+ 0.20 * [Equipment Utilization Rate]
+ 0.10 * MIN([Staff Coverage Rate], 100)
```

## Discharge Count

```tableau
COUNT([discharge_date])
```

## Peak Patient Load

```tableau
MAX({ FIXED [admission_month] : COUNT([admission_id]) })
```
