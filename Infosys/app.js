document.addEventListener("DOMContentLoaded", function () {
  var DEFAULT_DATA = {
    summary: {
      total_admissions: 24580,
      occupancy_rate: 82.4,
      avg_los: 4.8,
      readmission_rate: 7.2,
      bed_utilization_rate: 76.5,
      avg_efficiency: 84.2,
      total_discharges: 23613
    },
    monthly: [
      { admission_month: "Jan", admissions: 1850, readmissions: 130, avg_los: 4.6, occupied_beds: 3128, capacity_beds: 4340, occ_rate: 78.2, readmission_rate: 7.0 },
      { admission_month: "Feb", admissions: 1920, readmissions: 140, avg_los: 4.7, occupied_beds: 3276, capacity_beds: 4252, occ_rate: 80.1, readmission_rate: 7.3 },
      { admission_month: "Mar", admissions: 2100, readmissions: 155, avg_los: 4.8, occupied_beds: 3520, capacity_beds: 4733, occ_rate: 82.4, readmission_rate: 7.4 },
      { admission_month: "Apr", admissions: 2040, readmissions: 145, avg_los: 4.7, occupied_beds: 3347, capacity_beds: 4418, occ_rate: 81.0, readmission_rate: 7.1 },
      { admission_month: "May", admissions: 2150, readmissions: 160, avg_los: 4.9, occupied_beds: 3444, capacity_beds: 4801, occ_rate: 83.5, readmission_rate: 7.4 },
      { admission_month: "Jun", admissions: 1980, readmissions: 138, avg_los: 4.6, occupied_beds: 3027, capacity_beds: 4080, occ_rate: 79.8, readmission_rate: 7.0 },
      { admission_month: "Jul", admissions: 2090, readmissions: 150, avg_los: 4.8, occupied_beds: 3526, capacity_beds: 4649, occ_rate: 81.9, readmission_rate: 7.2 },
      { admission_month: "Aug", admissions: 2210, readmissions: 165, avg_los: 5.0, occupied_beds: 4071, capacity_beds: 5278, occ_rate: 84.1, readmission_rate: 7.5 },
      { admission_month: "Sep", admissions: 2030, readmissions: 142, avg_los: 4.7, occupied_beds: 3431, capacity_beds: 4594, occ_rate: 80.5, readmission_rate: 7.0 },
      { admission_month: "Oct", admissions: 2180, readmissions: 158, avg_los: 4.9, occupied_beds: 3632, capacity_beds: 4803, occ_rate: 83.2, readmission_rate: 7.2 },
      { admission_month: "Nov", admissions: 2010, readmissions: 140, avg_los: 4.8, occupied_beds: 3522, capacity_beds: 4727, occ_rate: 80.2, readmission_rate: 7.0 },
      { admission_month: "Dec", admissions: 2020, readmissions: 142, avg_los: 4.7, occupied_beds: 3707, capacity_beds: 4956, occ_rate: 81.5, readmission_rate: 7.0 }
    ],
    department: [
      { department: "General Medicine", admissions: 6820, readmission_rate: 7.1, avg_los: 5.1, efficiency: 85.2, occupied_beds: 11797, capacity_beds: 14200, staff_coverage: 114.4, equip_util: 78.5 },
      { department: "Surgery", admissions: 4950, readmission_rate: 5.4, avg_los: 6.1, efficiency: 86.8, occupied_beds: 6650, capacity_beds: 8200, staff_coverage: 117.7, equip_util: 82.0 },
      { department: "Orthopedics", admissions: 3410, readmission_rate: 6.8, avg_los: 5.6, efficiency: 83.4, occupied_beds: 4392, capacity_beds: 5500, staff_coverage: 123.8, equip_util: 75.6 },
      { department: "Cardiology", admissions: 3120, readmission_rate: 7.5, avg_los: 4.5, efficiency: 84.1, occupied_beds: 5824, capacity_beds: 7100, staff_coverage: 121.4, equip_util: 81.2 },
      { department: "Pediatrics", admissions: 2890, readmission_rate: 4.8, avg_los: 3.7, efficiency: 87.5, occupied_beds: 5351, capacity_beds: 6800, staff_coverage: 122.5, equip_util: 79.8 },
      { department: "Emergency", admissions: 2140, readmission_rate: 8.2, avg_los: 2.0, efficiency: 81.0, occupied_beds: 5434, capacity_beds: 7000, staff_coverage: 120.3, equip_util: 84.5 },
      { department: "ICU", admissions: 1250, readmission_rate: 14.5, avg_los: 7.7, efficiency: 78.2, occupied_beds: 2183, capacity_beds: 2800, staff_coverage: 125.0, equip_util: 88.0 }
    ],
    region: [
      { region: "North", admissions: 5420, readmissions: 380, occupied_beds: 10204, capacity_beds: 12800, occupancy_rate: 79.7, readmission_rate: 7.0 },
      { region: "South", admissions: 5810, readmissions: 405, occupied_beds: 9806, capacity_beds: 12200, occupancy_rate: 80.3, readmission_rate: 7.0 },
      { region: "East", admissions: 4210, readmissions: 310, occupied_beds: 6376, capacity_beds: 8100, occupancy_rate: 78.7, readmission_rate: 7.4 },
      { region: "West", admissions: 4890, readmissions: 350, occupied_beds: 9815, capacity_beds: 12000, occupancy_rate: 81.8, readmission_rate: 7.2 },
      { region: "Central", admissions: 4250, readmissions: 300, occupied_beds: 5430, capacity_beds: 6900, occupancy_rate: 78.6, readmission_rate: 7.0 }
    ],
    hospital: [
      { hospital_id: "H001", hospital_name: "CityCare Hospital", region: "North", city: "Metro City", admissions: 5420, readmissions: 380, avg_los: 4.7, occupied_beds: 10204, capacity_beds: 12800, occupancy_rate: 79.7, readmission_rate: 7.0 },
      { hospital_id: "H002", hospital_name: "Green Valley Hospital", region: "South", city: "Lake Town", admissions: 5810, readmissions: 405, avg_los: 4.8, occupied_beds: 9806, capacity_beds: 12200, occupancy_rate: 80.3, readmission_rate: 7.0 },
      { hospital_id: "H003", hospital_name: "Sunrise Medical Center", region: "East", city: "River City", admissions: 4210, readmissions: 310, avg_los: 4.7, occupied_beds: 6376, capacity_beds: 8100, occupancy_rate: 78.7, readmission_rate: 7.4 },
      { hospital_id: "H004", hospital_name: "Metro Health Institute", region: "West", city: "Hill View", admissions: 4890, readmissions: 350, avg_los: 4.8, occupied_beds: 9815, capacity_beds: 12000, occupancy_rate: 81.8, readmission_rate: 7.2 },
      { hospital_id: "H005", hospital_name: "Hopewell Hospital", region: "Central", city: "Capital District", admissions: 4250, readmissions: 300, avg_los: 4.8, occupied_beds: 5430, capacity_beds: 6900, occupancy_rate: 78.6, readmission_rate: 7.0 }
    ],
    admission_types: { Inpatient: 11200, Outpatient: 8450, Emergency: 4930 },
    discharge_statuses: { Recovered: 20450, Transferred: 2210, "Against Medical Advice": 750, Deceased: 203 },
    los_distribution: { "1": 2450, "2": 3120, "3": 4580, "4": 5210, "5": 4120, "6": 2890, "7": 1340, "8": 580, "9": 210, "10": 80 },
    hospitals_list: ["CityCare Hospital", "Green Valley Hospital", "Hopewell Hospital", "Metro Health Institute", "Sunrise Medical Center"],
    departments_list: ["Cardiology", "Emergency", "General Medicine", "ICU", "Orthopedics", "Pediatrics", "Surgery"],
    regions_list: ["Central", "East", "North", "South", "West"]
  };

  var appData = DEFAULT_DATA;
  var chartInstances = {};

  var GRID_COLOR = "rgba(255,255,255,0.05)";
  var TICK_COLOR = "#94a3b8";
  var TICK_FONT = { size: 10 };

  function axisDefaults(showGrid) {
    return {
      grid: { display: showGrid, color: GRID_COLOR },
      ticks: { color: TICK_COLOR, font: TICK_FONT }
    };
  }

  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }

  // Tab navigation
  var navItems = document.querySelectorAll(".nav-item");
  var tabPanels = document.querySelectorAll(".tab-panel");

  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var targetTab = item.getAttribute("data-tab");
      navItems.forEach(function (nav) { nav.classList.remove("active"); });
      tabPanels.forEach(function (panel) { panel.classList.remove("active"); });
      item.classList.add("active");
      var activePanel = document.getElementById("panel-" + targetTab);
      if (activePanel) {
        activePanel.classList.add("active");
        setTimeout(function () { renderAllDashboards(); }, 60);
      }
    });
  });

  var topBtns = document.querySelectorAll(".top-nav-btn");
  topBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      topBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
    });
  });

  // Try loading live JSON; fall back to embedded data
  fetch("data/app_data.json")
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data && data.summary) { appData = data; }
      populateFilters();
      renderAllDashboards();
    })
    .catch(function () {
      populateFilters();
      renderAllDashboards();
    });

  function populateFilters() {
    var sbHospital = document.getElementById("sb-hospital");
    var sbDept = document.getElementById("sb-department");
    var sbRegion = document.getElementById("sb-region");
    var topHospital = document.getElementById("top-filter-hospital");
    var topDept = document.getElementById("top-filter-department");
    var topRegion = document.getElementById("top-filter-region");

    if (!sbHospital || !sbDept || !sbRegion) return;

    sbHospital.innerHTML = '<option value="ALL">All Hospitals</option>';
    sbDept.innerHTML = '<option value="ALL">All Departments</option>';
    sbRegion.innerHTML = '<option value="ALL">All Regions</option>';
    topHospital.innerHTML = '<option value="ALL">All</option>';
    topDept.innerHTML = '<option value="ALL">All</option>';
    topRegion.innerHTML = '<option value="ALL">All</option>';

    appData.hospitals_list.forEach(function (h) {
      sbHospital.add(new Option(h, h));
      topHospital.add(new Option(h, h));
    });
    appData.departments_list.forEach(function (d) {
      sbDept.add(new Option(d, d));
      topDept.add(new Option(d, d));
    });
    appData.regions_list.forEach(function (r) {
      sbRegion.add(new Option(r, r));
      topRegion.add(new Option(r, r));
    });

    [sbHospital, topHospital].forEach(function (sel) {
      sel.addEventListener("change", function (e) {
        sbHospital.value = e.target.value;
        topHospital.value = e.target.value;
        renderAllDashboards();
      });
    });
    [sbDept, topDept].forEach(function (sel) {
      sel.addEventListener("change", function (e) {
        sbDept.value = e.target.value;
        topDept.value = e.target.value;
        renderAllDashboards();
      });
    });
    [sbRegion, topRegion].forEach(function (sel) {
      sel.addEventListener("change", function (e) {
        sbRegion.value = e.target.value;
        topRegion.value = e.target.value;
        renderAllDashboards();
      });
    });
  }

  function getFilters() {
    var h = document.getElementById("sb-hospital");
    var d = document.getElementById("sb-department");
    var r = document.getElementById("sb-region");
    return {
      hospital: h ? h.value : "ALL",
      department: d ? d.value : "ALL",
      region: r ? r.value : "ALL"
    };
  }

  function destroyAll() {
    Object.keys(chartInstances).forEach(function (key) {
      if (chartInstances[key]) { chartInstances[key].destroy(); }
    });
    chartInstances = {};
  }

  function renderAllDashboards() {
    if (!appData) return;
    destroyAll();

    var filters = getFilters();
    var deptData = appData.department;
    if (filters.department !== "ALL") {
      deptData = deptData.filter(function (d) { return d.department === filters.department; });
    }

    updateKPIs(appData.summary);

    // Overview tab
    renderLine("chart-admissions-trend", appData.monthly, "admission_month", "admissions", "#38bdf8");
    renderLine("chart-occupancy-trend", appData.monthly, "admission_month", "occ_rate", "#3b82f6");
    renderLine("chart-readmission-trend", appData.monthly, "admission_month", "readmission_rate", "#ec4899");
    renderDoughnut("chart-patient-type", appData.admission_types);
    renderHBar("chart-dept-admissions", deptData, "department", "admissions", ["#3b82f6", "#8b5cf6", "#38bdf8", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"]);
    renderHBar("chart-dept-los", deptData, "department", "avg_los", "#8b5cf6");
    renderHBar("chart-dept-readmissions", deptData, "department", "readmission_rate", "#ec4899");
    renderVBar("chart-region-admissions", appData.region.map(function (r) { return r.region; }), appData.region.map(function (r) { return r.admissions; }), "#06b6d4");
    renderGroupedBar("chart-admissions-vs-discharges", appData.monthly);
    renderStackedHBar("chart-bed-availability", deptData);

    // Patient Flow tab
    renderPie("chart-flow-admission-type", appData.admission_types);
    renderVBar("chart-flow-discharge-status", Object.keys(appData.discharge_statuses), Object.values(appData.discharge_statuses), "#10b981");
    renderVBar("chart-flow-los-dist",
      Object.keys(appData.los_distribution).map(function (k) { return k + " Day" + (k > 1 ? "s" : ""); }),
      Object.values(appData.los_distribution),
      "#38bdf8"
    );

    // Department Analytics tab
    renderVBar("chart-dept-efficiency-score", deptData.map(function (d) { return d.department; }), deptData.map(function (d) { return d.efficiency; }), "#10b981");
    renderCapacity("chart-dept-capacity-comparison", deptData);
    renderResources("chart-dept-resources", deptData);

    // Resource Utilization tab
    renderTable(appData.hospital, filters);
  }

  function updateKPIs(s) {
    if (!s) return;
    setText("kpi-total-admissions", s.total_admissions.toLocaleString());
    setText("kpi-occupancy-rate", s.occupancy_rate + "%");
    setText("kpi-avg-los", s.avg_los + " days");
    setText("kpi-readmission-rate", s.readmission_rate + "%");
    setText("kpi-bed-utilization", s.bed_utilization_rate + "%");
    setText("kpi-discharge-count", s.total_discharges.toLocaleString());
  }

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function getCtx(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    return el.getContext("2d");
  }

  function renderLine(id, data, labelKey, valKey, color) {
    var ctx = getCtx(id);
    if (!ctx) return;
    chartInstances[id] = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map(function (m) { return m[labelKey]; }),
        datasets: [{
          label: valKey,
          data: data.map(function (m) { return m[valKey]; }),
          borderColor: color,
          backgroundColor: hexToRgba(color, 0.15),
          fill: true,
          tension: 0.3,
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: axisDefaults(false), y: axisDefaults(true) },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderDoughnut(id, obj) {
    var ctx = getCtx(id);
    if (!ctx) return;
    chartInstances[id] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(obj),
        datasets: [{
          data: Object.values(obj),
          backgroundColor: ["#0284c7", "#38bdf8", "#8b5cf6", "#ec4899"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "right", labels: { color: TICK_COLOR, font: TICK_FONT } }
        }
      }
    });
  }

  function renderPie(id, obj) {
    var ctx = getCtx(id);
    if (!ctx) return;
    chartInstances[id] = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(obj),
        datasets: [{
          data: Object.values(obj),
          backgroundColor: ["#38bdf8", "#3b82f6", "#8b5cf6", "#ec4899"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { color: TICK_COLOR } }
        }
      }
    });
  }

  function renderHBar(id, data, labelKey, valKey, colors) {
    var ctx = getCtx(id);
    if (!ctx) return;
    var bgColor = Array.isArray(colors) ? colors : colors;
    chartInstances[id] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map(function (d) { return d[labelKey]; }),
        datasets: [{
          data: data.map(function (d) { return d[valKey]; }),
          backgroundColor: bgColor,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: { x: axisDefaults(true), y: axisDefaults(false) },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderVBar(id, labels, values, color) {
    var ctx = getCtx(id);
    if (!ctx) return;
    chartInstances[id] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: color,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: axisDefaults(false), y: axisDefaults(true) },
        plugins: { legend: { display: false } }
      }
    });
  }

  function renderGroupedBar(id, monthly) {
    var ctx = getCtx(id);
    if (!ctx) return;
    chartInstances[id] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: monthly.map(function (m) { return m.admission_month; }),
        datasets: [
          {
            label: "Admissions",
            data: monthly.map(function (m) { return m.admissions; }),
            backgroundColor: "#38bdf8",
            borderRadius: 3
          },
          {
            label: "Discharges",
            data: monthly.map(function (m) { return Math.round(m.admissions * 0.98); }),
            backgroundColor: "#06b6d4",
            borderRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: axisDefaults(false), y: axisDefaults(true) },
        plugins: { legend: { labels: { color: TICK_COLOR, font: TICK_FONT } } }
      }
    });
  }

  function renderStackedHBar(id, deptData) {
    var ctx = getCtx(id);
    if (!ctx) return;
    chartInstances[id] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(function (d) { return d.department; }),
        datasets: [
          {
            label: "Occupied",
            data: deptData.map(function (d) { return d.occupied_beds; }),
            backgroundColor: "#3b82f6"
          },
          {
            label: "Available",
            data: deptData.map(function (d) { return Math.max(0, d.capacity_beds - d.occupied_beds); }),
            backgroundColor: "rgba(255,255,255,0.1)"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          x: { stacked: true, grid: { color: GRID_COLOR }, ticks: { color: TICK_COLOR, font: TICK_FONT } },
          y: { stacked: true, grid: { display: false }, ticks: { color: TICK_COLOR, font: TICK_FONT } }
        },
        plugins: { legend: { labels: { color: TICK_COLOR, font: TICK_FONT } } }
      }
    });
  }

  function renderCapacity(id, deptData) {
    var ctx = getCtx(id);
    if (!ctx) return;
    chartInstances[id] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(function (d) { return d.department; }),
        datasets: [
          {
            label: "Occupied Beds",
            data: deptData.map(function (d) { return d.occupied_beds; }),
            backgroundColor: "#38bdf8",
            borderRadius: 4
          },
          {
            label: "Bed Capacity",
            data: deptData.map(function (d) { return d.capacity_beds; }),
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: axisDefaults(false), y: axisDefaults(true) },
        plugins: { legend: { labels: { color: TICK_COLOR } } }
      }
    });
  }

  function renderResources(id, deptData) {
    var ctx = getCtx(id);
    if (!ctx) return;
    chartInstances[id] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: deptData.map(function (d) { return d.department; }),
        datasets: [
          {
            label: "Staff Coverage (%)",
            data: deptData.map(function (d) { return d.staff_coverage; }),
            backgroundColor: "#3b82f6"
          },
          {
            label: "Equipment Util (%)",
            data: deptData.map(function (d) { return d.equip_util; }),
            backgroundColor: "#ec4899"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: axisDefaults(false), y: axisDefaults(true) },
        plugins: { legend: { labels: { color: TICK_COLOR } } }
      }
    });
  }

  function renderTable(hospitals, filters) {
    var tbody = document.getElementById("table-hospital-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    var list = hospitals || [];
    if (filters.hospital !== "ALL") {
      list = list.filter(function (h) { return h.hospital_name === filters.hospital; });
    }
    if (filters.region !== "ALL") {
      list = list.filter(function (h) { return h.region === filters.region; });
    }

    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:20px;color:#94a3b8;">No matching records. Reset filters to show all data.</td></tr>';
      return;
    }

    list.forEach(function (h) {
      var tr = document.createElement("tr");
      var cls = h.occupancy_rate > 85 ? "high" : (h.occupancy_rate > 70 ? "good" : "normal");
      var txt = h.occupancy_rate > 85 ? "High Load" : (h.occupancy_rate > 70 ? "Optimal" : "Moderate");
      tr.innerHTML =
        "<td><strong>" + h.hospital_name + "</strong></td>" +
        "<td>" + h.region + "</td>" +
        "<td>" + h.city + "</td>" +
        "<td>" + (h.admissions || 0).toLocaleString() + "</td>" +
        "<td>" + h.occupancy_rate + "%</td>" +
        "<td>" + h.avg_los + "</td>" +
        "<td>" + h.readmission_rate + "%</td>" +
        '<td><span class="badge-tag ' + cls + '">' + txt + "</span></td>";
      tbody.appendChild(tr);
    });
  }
});
