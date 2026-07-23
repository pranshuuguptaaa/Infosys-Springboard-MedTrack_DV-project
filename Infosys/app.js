document.addEventListener("DOMContentLoaded", () => {
  let appData = null;
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
      if (activePanel) activePanel.classList.add("active");
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
      appData = data;
      populateFilters();
      renderAllDashboards();
    })
    .catch(err => console.error("Error loading app_data.json:", err));

  function populateFilters() {
    const sbHospital = document.getElementById("sb-hospital");
    const sbDept = document.getElementById("sb-department");
    const sbRegion = document.getElementById("sb-region");

    const topHospital = document.getElementById("top-filter-hospital");
    const topDept = document.getElementById("top-filter-department");
    const topRegion = document.getElementById("top-filter-region");

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
    return {
      hospital: document.getElementById("sb-hospital").value,
      department: document.getElementById("sb-department").value,
      region: document.getElementById("sb-region").value
    };
  }

  function renderAllDashboards() {
    if (!appData) return;
    const filters = getSelectedFilters();

    Object.keys(chartInstances).forEach(key => {
      if (chartInstances[key]) chartInstances[key].destroy();
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
    document.getElementById("kpi-total-admissions").textContent = summary.total_admissions.toLocaleString();
    document.getElementById("kpi-occupancy-rate").textContent = `${summary.occupancy_rate}%`;
    document.getElementById("kpi-avg-los").textContent = `${summary.avg_los} days`;
    document.getElementById("kpi-readmission-rate").textContent = `${summary.readmission_rate}%`;
    document.getElementById("kpi-bed-utilization").textContent = `${summary.bed_utilization_rate}%`;
    document.getElementById("kpi-discharge-count").textContent = summary.total_discharges.toLocaleString();
  }

  function renderAdmissionsTrend(monthlyData) {
    const ctx = document.getElementById("chart-admissions-trend").getContext("2d");
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
    const ctx = document.getElementById("chart-occupancy-trend").getContext("2d");
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
    const ctx = document.getElementById("chart-readmission-trend").getContext("2d");
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
    const ctx = document.getElementById("chart-patient-type").getContext("2d");
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
    const ctx = document.getElementById("chart-dept-admissions").getContext("2d");
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
    const ctx = document.getElementById("chart-dept-los").getContext("2d");
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
    const ctx = document.getElementById("chart-dept-readmissions").getContext("2d");
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
    const ctx = document.getElementById("chart-region-admissions").getContext("2d");
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
    const ctx = document.getElementById("chart-admissions-vs-discharges").getContext("2d");
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
    const ctx = document.getElementById("chart-bed-availability").getContext("2d");
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
    const ctx = document.getElementById("chart-flow-admission-type").getContext("2d");
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
    const ctx = document.getElementById("chart-flow-discharge-status").getContext("2d");
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
    const ctx = document.getElementById("chart-flow-los-dist").getContext("2d");
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
    const ctx = document.getElementById("chart-dept-efficiency-score").getContext("2d");
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
    const ctx = document.getElementById("chart-dept-capacity-comparison").getContext("2d");
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
    const ctx = document.getElementById("chart-dept-resources").getContext("2d");
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
