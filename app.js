document.addEventListener("DOMContentLoaded", () => {
  let appData = null;
  let chartInstances = {};

  // Tab switching logic
  const navItems = document.querySelectorAll(".nav-item");
  const tabPanels = document.querySelectorAll(".tab-panel");
  const tabTitle = document.getElementById("current-tab-title");
  const tabSubtitle = document.getElementById("current-tab-subtitle");

  const tabMeta = {
    overview: {
      title: "Hospital Overview",
      subtitle: "Executive summary of hospital performance, admissions, and regional distribution"
    },
    "patient-flow": {
      title: "Patient Flow",
      subtitle: "Patient movement, admission/discharge tracking, length of stay, and peak capacity load"
    },
    "department-analytics": {
      title: "Department Analytics",
      subtitle: "Department performance comparisons, readmission rates, and composite efficiency scores"
    },
    "resource-utilization": {
      title: "Resource Utilization",
      subtitle: "Bed utilization, staff allocation coverage, and equipment usage monitoring"
    }
  };

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetTab = item.getAttribute("data-tab");
      
      navItems.forEach(nav => nav.classList.remove("active"));
      tabPanels.forEach(panel => panel.classList.remove("active"));

      item.classList.add("active");
      const activePanel = document.getElementById(`panel-${targetTab}`);
      if (activePanel) activePanel.classList.add("active");

      if (tabMeta[targetTab]) {
        tabTitle.textContent = tabMeta[targetTab].title;
        tabSubtitle.textContent = tabMeta[targetTab].subtitle;
      }
    });
  });

  // Load JSON Data
  fetch("data/app_data.json")
    .then(res => res.json())
    .then(data => {
      appData = data;
      initFilters();
      renderDashboard();
    })
    .catch(err => {
      console.error("Error loading app_data.json:", err);
    });

  // Initialize filter dropdowns
  function initFilters() {
    const hospitalSelect = document.getElementById("filter-hospital");
    const deptSelect = document.getElementById("filter-department");
    const regionSelect = document.getElementById("filter-region");

    appData.hospitals_list.forEach(h => {
      const opt = document.createElement("option");
      opt.value = h;
      opt.textContent = h;
      hospitalSelect.appendChild(opt);
    });

    appData.departments_list.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      deptSelect.appendChild(opt);
    });

    appData.regions_list.forEach(r => {
      const opt = document.createElement("option");
      opt.value = r;
      opt.textContent = r;
      regionSelect.appendChild(opt);
    });

    [hospitalSelect, deptSelect, regionSelect].forEach(select => {
      select.addEventListener("change", renderDashboard);
    });

    document.getElementById("btn-reset-filters").addEventListener("click", () => {
      hospitalSelect.value = "ALL";
      deptSelect.value = "ALL";
      regionSelect.value = "ALL";
      renderDashboard();
    });
  }

  function getFilterValues() {
    return {
      hospital: document.getElementById("filter-hospital").value,
      department: document.getElementById("filter-department").value,
      region: document.getElementById("filter-region").value
    };
  }

  function renderDashboard() {
    if (!appData) return;
    const filters = getFilterValues();

    // Filter department summary data
    let filteredDept = appData.department;
    if (filters.department !== "ALL") {
      filteredDept = filteredDept.filter(d => d.department === filters.department);
    }

    // Filter monthly data
    let filteredMonthly = appData.monthly;

    // Destroy existing charts to prevent canvas re-render issues
    Object.keys(chartInstances).forEach(key => {
      if (chartInstances[key]) chartInstances[key].destroy();
    });

    // Render Overview
    renderMonthlyTrendChart(filteredMonthly);
    renderDeptAdmissionsChart(filteredDept);
    renderRegionAdmissionsChart(appData.region);

    // Render Patient Flow
    renderAdmissionTypeChart(appData.admission_types);
    renderDischargeStatusChart(appData.discharge_statuses);
    renderLosDistChart(appData.los_distribution);

    // Render Department Analytics
    renderDeptEfficiencyChart(filteredDept);
    renderDeptLosChart(filteredDept);
    renderDeptCapacityChart(filteredDept);

    // Render Resource Utilization
    renderStaffCoverageChart(filteredDept);
    renderEquipUtilizationChart(filteredDept);
    renderHospitalSummaryTable(appData.hospital, filters);
  }

  // --- Chart Renderers ---

  function renderMonthlyTrendChart(monthlyData) {
    const ctx = document.getElementById("chart-monthly-trend").getContext("2d");
    const labels = monthlyData.map(m => m.admission_month);
    const admissions = monthlyData.map(m => m.admissions);
    const occRates = monthlyData.map(m => m.occ_rate);

    chartInstances["monthlyTrend"] = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Admissions",
            data: admissions,
            borderColor: "#48cae4",
            backgroundColor: "rgba(72, 202, 228, 0.15)",
            fill: true,
            tension: 0.3,
            yAxisID: "y"
          },
          {
            label: "Occupancy Rate (%)",
            data: occRates,
            borderColor: "#f72585",
            borderDash: [5, 5],
            fill: false,
            tension: 0.3,
            yAxisID: "y1"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#8d99ae" } },
          y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#8d99ae" } },
          y1: { position: "right", grid: { drawOnChartArea: false }, ticks: { color: "#f72585" } }
        },
        plugins: { legend: { labels: { color: "#f8f9fa" } } }
      }
    });
  }

  function renderDeptAdmissionsChart(deptData) {
    const ctx = document.getElementById("chart-dept-admissions").getContext("2d");
    chartInstances["deptAdmissions"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [{
          label: "Admissions",
          data: deptData.map(d => d.admissions),
          backgroundColor: "#00b4d8",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#8d99ae" } },
          y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#8d99ae" } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderRegionAdmissionsChart(regionData) {
    const ctx = document.getElementById("chart-region-admissions").getContext("2d");
    chartInstances["regionAdmissions"] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: regionData.map(r => r.region),
        datasets: [{
          data: regionData.map(r => r.admissions),
          backgroundColor: ["#48cae4", "#00b4d8", "#52b788", "#f72585", "#ffb703"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "right", labels: { color: "#f8f9fa" } } }
      }
    });
  }

  function renderAdmissionTypeChart(types) {
    const ctx = document.getElementById("chart-admission-type").getContext("2d");
    chartInstances["admissionType"] = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(types),
        datasets: [{
          data: Object.values(types),
          backgroundColor: ["#f72585", "#48cae4", "#52b788", "#ffb703"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom", labels: { color: "#f8f9fa" } } }
      }
    });
  }

  function renderDischargeStatusChart(statuses) {
    const ctx = document.getElementById("chart-discharge-status").getContext("2d");
    chartInstances["dischargeStatus"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(statuses),
        datasets: [{
          label: "Patients",
          data: Object.values(statuses),
          backgroundColor: "#52b788",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#8d99ae" } },
          y: { grid: { display: false }, ticks: { color: "#8d99ae" } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderLosDistChart(losDist) {
    const ctx = document.getElementById("chart-los-dist").getContext("2d");
    chartInstances["losDist"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(losDist).map(k => `${k} Day${k > 1 ? 's' : ''}`),
        datasets: [{
          label: "Patient Volume",
          data: Object.values(losDist),
          backgroundColor: "#48cae4",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#8d99ae" } },
          y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#8d99ae" } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderDeptEfficiencyChart(deptData) {
    const ctx = document.getElementById("chart-dept-efficiency").getContext("2d");
    chartInstances["deptEfficiency"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [
          {
            label: "Efficiency Score",
            data: deptData.map(d => d.efficiency),
            backgroundColor: "#52b788",
            borderRadius: 6
          },
          {
            label: "Readmission Rate (%)",
            data: deptData.map(d => d.readmission_rate),
            backgroundColor: "#f72585",
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#8d99ae" } },
          y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#8d99ae" } }
        },
        plugins: { legend: { labels: { color: "#f8f9fa" } } }
      }
    });
  }

  function renderDeptLosChart(deptData) {
    const ctx = document.getElementById("chart-dept-los").getContext("2d");
    chartInstances["deptLos"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [{
          label: "Avg LOS (Days)",
          data: deptData.map(d => d.avg_los),
          backgroundColor: "#ffb703",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#8d99ae" } },
          y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#8d99ae" } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderDeptCapacityChart(deptData) {
    const ctx = document.getElementById("chart-dept-capacity").getContext("2d");
    chartInstances["deptCapacity"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [
          {
            label: "Occupied Beds",
            data: deptData.map(d => d.occupied_beds),
            backgroundColor: "#00b4d8"
          },
          {
            label: "Bed Capacity",
            data: deptData.map(d => d.capacity_beds),
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#8d99ae" } },
          y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#8d99ae" } }
        },
        plugins: { legend: { labels: { color: "#f8f9fa" } } }
      }
    });
  }

  function renderStaffCoverageChart(deptData) {
    const ctx = document.getElementById("chart-staff-coverage").getContext("2d");
    chartInstances["staffCoverage"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [{
          label: "Staff Coverage Rate (%)",
          data: deptData.map(d => d.staff_coverage),
          backgroundColor: "#48cae4",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#8d99ae" } },
          y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#8d99ae" } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderEquipUtilizationChart(deptData) {
    const ctx = document.getElementById("chart-equip-utilization").getContext("2d");
    chartInstances["equipUtilization"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(d => d.department),
        datasets: [{
          label: "Equipment Utilization (%)",
          data: deptData.map(d => d.equip_util),
          backgroundColor: "#f72585",
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#8d99ae" } },
          y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#8d99ae" } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderHospitalSummaryTable(hospitals, filters) {
    const tbody = document.getElementById("table-hospital-body");
    tbody.innerHTML = "";

    let list = hospitals;
    if (filters.hospital !== "ALL") {
      list = list.filter(h => h.hospital_name === filters.hospital);
    }
    if (filters.region !== "ALL") {
      list = list.filter(h => h.region === filters.region);
    }

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
        <td><span class="status-tag ${statusClass}">${statusText}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }
});
