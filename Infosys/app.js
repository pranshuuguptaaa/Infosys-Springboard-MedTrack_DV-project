document.addEventListener("DOMContentLoaded", () => {
  const DEFAULT_DATA = {
    "summary": { "total_admissions": 24580, "occupancy_rate": 82.4, "avg_los": 4.8, "readmission_rate": 7.2, "bed_utilization_rate": 76.5, "avg_efficiency": 84.2, "total_discharges": 23613 },
    "monthly": [
      { "admission_month": "Jan", "admissions": 1850, "readmissions": 130, "avg_los": 4.6, "occupied_beds": 3128, "capacity_beds": 4340, "occ_rate": 78.2, "readmission_rate": 7.0 },
      { "admission_month": "Feb", "admissions": 1920, "readmissions": 140, "avg_los": 4.7, "occupied_beds": 3276, "capacity_beds": 4252, "occ_rate": 80.1, "readmission_rate": 7.3 },
      { "admission_month": "Mar", "admissions": 2100, "readmissions": 155, "avg_los": 4.8, "occupied_beds": 3520, "capacity_beds": 4733, "occ_rate": 82.4, "readmission_rate": 7.4 },
      { "admission_month": "Apr", "admissions": 2040, "readmissions": 145, "avg_los": 4.7, "occupied_beds": 3347, "capacity_beds": 4418, "occ_rate": 81.0, "readmission_rate": 7.1 },
      { "admission_month": "May", "admissions": 2150, "readmissions": 160, "avg_los": 4.9, "occupied_beds": 3444, "capacity_beds": 4801, "occ_rate": 83.5, "readmission_rate": 7.4 },
      { "admission_month": "Jun", "admissions": 1980, "readmissions": 138, "avg_los": 4.6, "occupied_beds": 3027, "capacity_beds": 4080, "occ_rate": 79.8, "readmission_rate": 7.0 },
      { "admission_month": "Jul", "admissions": 2090, "readmissions": 150, "avg_los": 4.8, "occupied_beds": 3526, "capacity_beds": 4649, "occ_rate": 81.9, "readmission_rate": 7.2 },
      { "admission_month": "Aug", "admissions": 2210, "readmissions": 165, "avg_los": 5.0, "occupied_beds": 4071, "capacity_beds": 5278, "occ_rate": 84.1, "readmission_rate": 7.5 },
      { "admission_month": "Sep", "admissions": 2030, "readmissions": 142, "avg_los": 4.7, "occupied_beds": 3431, "capacity_beds": 4594, "occ_rate": 80.5, "readmission_rate": 7.0 },
      { "admission_month": "Oct", "admissions": 2180, "readmissions": 158, "avg_los": 4.9, "occupied_beds": 3632, "capacity_beds": 4803, "occ_rate": 83.2, "readmission_rate": 7.2 },
      { "admission_month": "Nov", "admissions": 2010, "readmissions": 140, "avg_los": 4.8, "occupied_beds": 3522, "capacity_beds": 4727, "occ_rate": 80.2, "readmission_rate": 7.0 },
      { "admission_month": "Dec", "admissions": 2020, "readmissions": 142, "avg_los": 4.7, "occupied_beds": 3707, "capacity_beds": 4956, "occ_rate": 81.5, "readmission_rate": 7.0 }
    ],
    "department": [
      { "department": "General Medicine", "admissions": 6820, "readmission_rate": 7.1, "avg_los": 5.1, "efficiency": 85.2, "occupied_beds": 11797, "capacity_beds": 14200, "staff_coverage": 114.4, "equip_util": 78.5 },
      { "department": "Surgery", "admissions": 4950, "readmission_rate": 5.4, "avg_los": 6.1, "efficiency": 86.8, "occupied_beds": 6650, "capacity_beds": 8200, "staff_coverage": 117.7, "equip_util": 82.0 },
      { "department": "Orthopedics", "admissions": 3410, "readmission_rate": 6.8, "avg_los": 5.6, "efficiency": 83.4, "occupied_beds": 4392, "capacity_beds": 5500, "staff_coverage": 123.8, "equip_util": 75.6 },
      { "department": "Cardiology", "admissions": 3120, "readmission_rate": 7.5, "avg_los": 4.5, "efficiency": 84.1, "occupied_beds": 5824, "capacity_beds": 7100, "staff_coverage": 121.4, "equip_util": 81.2 },
      { "department": "Pediatrics", "admissions": 2890, "readmission_rate": 4.8, "avg_los": 3.7, "efficiency": 87.5, "occupied_beds": 5351, "capacity_beds": 6800, "staff_coverage": 122.5, "equip_util": 79.8 },
      { "department": "Emergency", "admissions": 2140, "readmission_rate": 8.2, "avg_los": 2.0, "efficiency": 81.0, "occupied_beds": 5434, "capacity_beds": 7000, "staff_coverage": 120.3, "equip_util": 84.5 },
      { "department": "ICU", "admissions": 1250, "readmission_rate": 14.5, "avg_los": 7.7, "efficiency": 78.2, "occupied_beds": 2183, "capacity_beds": 2800, "staff_coverage": 125.0, "equip_util": 88.0 }
    ],
    "region": [
      { "region": "North", "admissions": 5420, "readmissions": 380, "occupied_beds": 10204, "capacity_beds": 12800, "occupancy_rate": 79.7, "readmission_rate": 7.0 },
      { "region": "South", "admissions": 5810, "readmissions": 405, "occupied_beds": 9806, "capacity_beds": 12200, "occupancy_rate": 80.3, "readmission_rate": 7.0 },
      { "region": "East", "admissions": 4210, "readmissions": 310, "occupied_beds": 6376, "capacity_beds": 8100, "occupancy_rate": 78.7, "readmission_rate": 7.4 },
      { "region": "West", "admissions": 4890, "readmissions": 350, "occupied_beds": 9815, "capacity_beds": 12000, "occupancy_rate": 81.8, "readmission_rate": 7.2 },
      { "region": "Central", "admissions": 4250, "readmissions": 300, "occupied_beds": 5430, "capacity_beds": 6900, "occupancy_rate": 78.6, "readmission_rate": 7.0 }
    ],
    "hospital": [
      { "hospital_id": "H001", "hospital_name": "CityCare Hospital", "region": "North", "city": "Metro City", "admissions": 5420, "readmissions": 380, "avg_los": 4.7, "occupied_beds": 10204, "capacity_beds": 12800, "occupancy_rate": 79.7, "readmission_rate": 7.0 },
      { "hospital_id": "H002", "hospital_name": "Green Valley Hospital", "region": "South", "city": "Lake Town", "admissions": 5810, "readmissions": 405, "avg_los": 4.8, "occupied_beds": 9806, "capacity_beds": 12200, "occupancy_rate": 80.3, "readmission_rate": 7.0 },
      { "hospital_id": "H003", "hospital_name": "Sunrise Medical Center", "region": "East", "city": "River City", "admissions": 4210, "readmissions": 310, "avg_los": 4.7, "occupied_beds": 6376, "capacity_beds": 8100, "occupancy_rate": 78.7, "readmission_rate": 7.4 },
      { "hospital_id": "H004", "hospital_name": "Metro Health Institute", "region": "West", "city": "Hill View", "admissions": 4890, "readmissions": 350, "avg_los": 4.8, "occupied_beds": 9815, "capacity_beds": 12000, "occupancy_rate": 81.8, "readmission_rate": 7.2 },
      { "hospital_id": "H005", "hospital_name": "Hopewell Hospital", "region": "Central", "city": "Capital District", "admissions": 4250, "readmissions": 300, "avg_los": 4.8, "occupied_beds": 5430, "capacity_beds": 6900, "occupancy_rate": 78.6, "readmission_rate": 7.0 }
    ],
    "admission_types": { "Inpatient": 11200, "Outpatient": 8450, "Emergency": 4930 },
    "discharge_statuses": { "Recovered": 20450, "Transferred": 2210, "Against Medical Advice": 750, "Deceased": 203 },
    "los_distribution": { "1": 2450, "2": 3120, "3": 4580, "4": 5210, "5": 4120, "6": 2890, "7": 1340, "8": 580, "9": 210, "10": 80 },
    "hospitals_list": ["CityCare Hospital", "Green Valley Hospital", "Hopewell Hospital", "Metro Health Institute", "Sunrise Medical Center"],
    "departments_list": ["Cardiology", "Emergency", "General Medicine", "ICU", "Orthopedics", "Pediatrics", "Surgery"],
    "regions_list": ["Central", "East", "North", "South", "West"]
  };

  let appData = DEFAULT_DATA;
  let chartInstances = {};

  const navItems = document.querySelectorAll(".nav-item");
  const tabPanels = document.querySelectorAll(".tab-panel");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetTab = item.getAttribute("data-tab");
      navItems.forEach(nav => nav.classList.remove("active"));
      tabPanels.forEach(panel => panel.classList.remove("active"));

      item.classList.add("active");
      const activePanel = document.getElementById(`panel-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add("active");
        setTimeout(() => {
          renderAllDashboards();
        }, 50);
      }
    });
  });

  const topBtns = document.querySelectorAll(".top-nav-btn");
  topBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      topBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  fetch("data/app_data.json")
    .then(res => res.json())
    .then(data => {
      if (data && data.summary) {
        appData = data;
      }
      populateFilters();
      renderAllDashboards();
    })
    .catch(() => {
      populateFilters();
      renderAllDashboards();
    });

  function populateFilters() {
    const sbHospital = document.getElementById("sb-hospital");
    const sbDept = document.getElementById("sb-department");
    const sbRegion = document.getElementById("sb-region");

    const topHospital = document.getElementById("top-filter-hospital");
    const topDept = document.getElementById("top-filter-department");
    const topRegion = document.getElementById("top-filter-region");

    if (!sbHospital || !sbDept || !sbRegion) return;

    sbHospital.innerHTML = '<option value="ALL">All Hospitals</option>';
    sbDept.innerHTML = '<option value="ALL">All Departments</option>';
    sbRegion.innerHTML = '<option value="ALL">All Regions</option>';
    topHospital.innerHTML = '<option value="ALL">All</option>';
    topDept.innerHTML = '<option value="ALL">All</option>';
    topRegion.innerHTML = '<option value="ALL">All</option>';

    appData.hospitals_list.forEach(h => {
      sbHospital.add(new Option(h, h));
      topHospital.add(new Option(h, h));
    });

    appData.departments_list.forEach(d => {
      sbDept.add(new Option(d, d));
      topDept.add(new Option(d, d));
    });

    appData.regions_list.forEach(r => {
      sbRegion.add(new Option(r, r));
      topRegion.add(new Option(r, r));
    });

    [sbHospital, topHospital].forEach(sel => sel.addEventListener("change", (e) => {
      sbHospital.value = e.target.value;
      topHospital.value = e.target.value;
      renderAllDashboards();
    }));

    [sbDept, topDept].forEach(sel => sel.addEventListener("change", (e) => {
      sbDept.value = e.target.value;
      topDept.value = e.target.value;
      renderAllDashboards();
    }));

    [sbRegion, topRegion].forEach(sel => sel.addEventListener("change", (e) => {
      sbRegion.value = e.target.value;
      topRegion.value = e.target.value;
      renderAllDashboards();
    }));
  }

  function getSelectedFilters() {
    const sbH = document.getElementById("sb-hospital");
    const sbD = document.getElementById("sb-department");
    const sbR = document.getElementById("sb-region");
    return {
      hospital: sbH ? sbH.value : "ALL",
      department: sbD ? sbD.value : "ALL",
      region: sbR ? sbR.value : "ALL"
    };
  }

  function renderAllDashboards() {
    if (!appData) return;
    const filters = getSelectedFilters();

    Object.keys(chartInstances).forEach(key => {
      if (chartInstances[key]) {
        chartInstances[key].destroy();
        delete chartInstances[key];
      }
    });

    let filteredDept = appData.department;
    if (filters.department !== "ALL") {
      filteredDept = filteredDept.filter(d => d.department === filters.department);
    }

    let filteredMonthly = appData.monthly;
    let filteredRegion = appData.region;

    updateKPIValues(appData.summary);

    renderAdmissionsTrend(filteredMonthly);
    renderOccupancyTrend(filteredMonthly);
    renderReadmissionTrend(filteredMonthly);

    renderPatientTypeChart(appData.admission_types);
    renderDeptAdmissionsChart(filteredDept);
    renderDeptLosChart(filteredDept);
    renderDeptReadmissionChart(filteredDept);

    renderRegionAdmissionsChart(filteredRegion);
    renderAdmissionsVsDischargesChart(filteredMonthly);
    renderBedAvailabilityChart(filteredDept);

    renderFlowAdmissionType(appData.admission_types);
    renderFlowDischargeStatus(appData.discharge_statuses);
    renderFlowLosDist(appData.los_distribution);

    renderDeptEfficiencyScore(filteredDept);
    renderDeptCapacityComparison(filteredDept);
    renderDeptResources(filteredDept);

    renderHospitalTable(appData.hospital, filters);
  }

  function updateKPIValues(summary) {
    if (!summary) return;
    const totalAdm = document.getElementById("kpi-total-admissions");
    const occRate = document.getElementById("kpi-occupancy-rate");
    const avgLos = document.getElementById("kpi-avg-los");
    const readmRate = document.getElementById("kpi-readmission-rate");
    const bedUtil = document.getElementById("kpi-bed-utilization");
    const disCount = document.getElementById("kpi-discharge-count");

    if (totalAdm) totalAdm.textContent = summary.total_admissions.toLocaleString();
    if (occRate) occRate.textContent = `${summary.occupancy_rate}%`;
    if (avgLos) avgLos.textContent = `${summary.avg_los} days`;
    if (readmRate) readmRate.textContent = `${summary.readmission_rate}%`;
    if (bedUtil) bedUtil.textContent = `${summary.bed_utilization_rate}%`;
    if (disCount) disCount.textContent = summary.total_discharges.toLocaleString();
  }

  function renderAdmissionsTrend(monthlyData) {
    const el = document.getElementById("chart-admissions-trend");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["admissionsTrend"] = new Chart(ctx, {
      type: "line",
      data: {
        labels: monthlyData.map(m => m.admission_month),
        datasets: [{
          label: "Admissions",
          data: monthlyData.map(m => m.admissions),
          borderColor: "#38bdf8",
          backgroundColor: "rgba(56, 189, 248, 0.15)",
          fill: true,
          tension: 0.3,
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 10 } } },
          y: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 10 } } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderOccupancyTrend(monthlyData) {
    const el = document.getElementById("chart-occupancy-trend");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["occupancyTrend"] = new Chart(ctx, {
      type: "line",
      data: {
        labels: monthlyData.map(m => m.admission_month),
        datasets: [{
          label: "Occupancy Rate (%)",
          data: monthlyData.map(m => m.occ_rate),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.15)",
          fill: true,
          tension: 0.3,
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 10 } } },
          y: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 10 } } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderReadmissionTrend(monthlyData) {
    const el = document.getElementById("chart-readmission-trend");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["readmissionTrend"] = new Chart(ctx, {
      type: "line",
      data: {
        labels: monthlyData.map(m => m.admission_month),
        datasets: [{
          label: "Readmission Rate (%)",
          data: monthlyData.map(m => m.readmission_rate),
          borderColor: "#ec4899",
          backgroundColor: "rgba(236, 72, 153, 0.15)",
          fill: true,
          tension: 0.3,
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 10 } } },
          y: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 10 } } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderPatientTypeChart(types) {
    const el = document.getElementById("chart-patient-type");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["patientType"] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(types),
        datasets: [{
          data: Object.values(types),
          backgroundColor: ["#0284c7", "#38bdf8", "#8b5cf6", "#ec4899"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "right", labels: { color: "#94a3b8", font: { size: 10 } } } }
      }
    });
  }

  function renderDeptAdmissionsChart(deptData) {
    const el = document.getElementById("chart-dept-admissions");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["deptAdmissions"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [{
          data: deptData.map(d => d.admissions),
          backgroundColor: ["#3b82f6", "#8b5cf6", "#38bdf8", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"],
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 10 } } },
          y: { grid: { display: false }, ticks: { color: "#94a3b8", font: { size: 10 } } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderDeptLosChart(deptData) {
    const el = document.getElementById("chart-dept-los");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["deptLos"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [{
          data: deptData.map(d => d.avg_los),
          backgroundColor: "#8b5cf6",
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 10 } } },
          y: { grid: { display: false }, ticks: { color: "#94a3b8", font: { size: 10 } } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderDeptReadmissionChart(deptData) {
    const el = document.getElementById("chart-dept-readmissions");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["deptReadmissions"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [{
          data: deptData.map(d => d.readmission_rate),
          backgroundColor: "#ec4899",
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 10 } } },
          y: { grid: { display: false }, ticks: { color: "#94a3b8", font: { size: 10 } } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderRegionAdmissionsChart(regionData) {
    const el = document.getElementById("chart-region-admissions");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["regionAdmissions"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: regionData.map(r => r.region),
        datasets: [{
          label: "Admissions",
          data: regionData.map(r => r.admissions),
          backgroundColor: "#06b6d4",
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#94a3b8", font: { size: 10 } } },
          y: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 10 } } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderAdmissionsVsDischargesChart(monthlyData) {
    const el = document.getElementById("chart-admissions-vs-discharges");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["admissionsVsDischarges"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: monthlyData.map(m => m.admission_month),
        datasets: [
          {
            label: "Admissions",
            data: monthlyData.map(m => m.admissions),
            backgroundColor: "#38bdf8",
            borderRadius: 3
          },
          {
            label: "Discharges",
            data: monthlyData.map(m => Math.round(m.admissions * 0.98)),
            backgroundColor: "#06b6d4",
            borderRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#64748b", font: { size: 9 } } },
          y: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 9 } } }
        },
        plugins: { legend: { labels: { color: "#94a3b8", font: { size: 10 } } } }
      }
    });
  }

  function renderBedAvailabilityChart(deptData) {
    const el = document.getElementById("chart-bed-availability");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["bedAvailability"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [
          {
            label: "Occupied",
            data: deptData.map(d => d.occupied_beds),
            backgroundColor: "#3b82f6"
          },
          {
            label: "Available",
            data: deptData.map(d => Math.max(0, d.capacity_beds - d.occupied_beds)),
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          x: { stacked: true, grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#64748b", font: { size: 10 } } },
          y: { stacked: true, grid: { display: false }, ticks: { color: "#94a3b8", font: { size: 10 } } }
        },
        plugins: { legend: { labels: { color: "#94a3b8", font: { size: 10 } } } }
      }
    });
  }

  function renderFlowAdmissionType(types) {
    const el = document.getElementById("chart-flow-admission-type");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["flowAdmissionType"] = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(types),
        datasets: [{ data: Object.values(types), backgroundColor: ["#38bdf8", "#3b82f6", "#8b5cf6", "#ec4899"] }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { color: "#94a3b8" } } } }
    });
  }

  function renderFlowDischargeStatus(statuses) {
    const el = document.getElementById("chart-flow-discharge-status");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["flowDischargeStatus"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(statuses),
        datasets: [{ label: "Discharges", data: Object.values(statuses), backgroundColor: "#10b981", borderRadius: 4 }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#94a3b8" } }, y: { grid: { display: false }, ticks: { color: "#94a3b8" } } }, plugins: { legend: { display: false } } }
    });
  }

  function renderFlowLosDist(losDist) {
    const el = document.getElementById("chart-flow-los-dist");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["flowLosDist"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(losDist).map(k => `${k} Day${k > 1 ? 's' : ''}`),
        datasets: [{ label: "Volume", data: Object.values(losDist), backgroundColor: "#38bdf8", borderRadius: 4 }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { x: { display: false }, ticks: { color: "#94a3b8" } }, y: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#94a3b8" } } }, plugins: { legend: { display: false } } }
    });
  }

  function renderDeptEfficiencyScore(deptData) {
    const el = document.getElementById("chart-dept-efficiency-score");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["deptEfficiencyScore"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [{ label: "Efficiency Score", data: deptData.map(d => d.efficiency), backgroundColor: "#10b981", borderRadius: 4 }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false }, ticks: { color: "#94a3b8" } }, y: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#94a3b8" } } }, plugins: { legend: { display: false } } }
    });
  }

  function renderDeptCapacityComparison(deptData) {
    const el = document.getElementById("chart-dept-capacity-comparison");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["deptCapacityComparison"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [
          { label: "Occupied Beds", data: deptData.map(d => d.occupied_beds), backgroundColor: "#38bdf8", borderRadius: 4 },
          { label: "Bed Capacity", data: deptData.map(d => d.capacity_beds), backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 4 }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false }, ticks: { color: "#94a3b8" } }, y: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#94a3b8" } } }, plugins: { legend: { labels: { color: "#94a3b8" } } } }
    });
  }

  function renderDeptResources(deptData) {
    const el = document.getElementById("chart-dept-resources");
    if (!el) return;
    const ctx = el.getContext("2d");
    chartInstances["deptResources"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [
          { label: "Staff Coverage (%)", data: deptData.map(d => d.staff_coverage), backgroundColor: "#3b82f6" },
          { label: "Equipment Util (%)", data: deptData.map(d => d.equip_util), backgroundColor: "#ec4899" }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false }, ticks: { color: "#94a3b8" } }, y: { grid: { color: "rgba(255,255,255,0.03)" }, ticks: { color: "#94a3b8" } } }, plugins: { legend: { labels: { color: "#94a3b8" } } } }
    });
  }

  function renderHospitalTable(hospitals, filters) {
    const tbody = document.getElementById("table-hospital-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    let list = hospitals;
    if (filters.hospital !== "ALL") list = list.filter(h => h.hospital_name === filters.hospital);
    if (filters.region !== "ALL") list = list.filter(h => h.region === filters.region);

    list.forEach(h => {
      const tr = document.createElement("tr");
      const statusClass = h.occupancy_rate > 85 ? "high" : (h.occupancy_rate > 70 ? "good" : "normal");
      const statusText = h.occupancy_rate > 85 ? "High Load" : (h.occupancy_rate > 70 ? "Optimal" : "Moderate");

      tr.innerHTML = `
        <td><strong>${h.hospital_name}</strong></td>
        <td>${h.region}</td>
        <td>${h.city}</td>
        <td>${h.admissions}</td>
        <td>${h.occupancy_rate}%</td>
        <td>${h.avg_los}</td>
        <td>${h.readmission_rate}%</td>
        <td><span class="badge-tag ${statusClass}">${statusText}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }
});
