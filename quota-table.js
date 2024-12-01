// Monthly Sales Data (initially empty or loaded from localStorage)
let regionsMonthly = ['North', 'South', 'East', 'West'];
let salesDataMonthly = [120, 150, 200, 180];

// Daily Sales Data (initially empty or loaded from localStorage)
let regionsDaily = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];
let salesDataDaily = [30, 50, 70, 40];

// Save Monthly and Daily Sales Data to localStorage
function saveDataToLocalStorage() {
    const monthlyData = { regions: regionsMonthly, sales: salesDataMonthly };
    const dailyData = { regions: regionsDaily, sales: salesDataDaily };

    localStorage.setItem('monthlySalesData', JSON.stringify(monthlyData));
    localStorage.setItem('dailySalesData', JSON.stringify(dailyData));
}

// Load Monthly and Daily Sales Data from localStorage
function loadDataFromLocalStorage() {
    const storedMonthlyData = localStorage.getItem('monthlySalesData');
    const storedDailyData = localStorage.getItem('dailySalesData');

    if (storedMonthlyData) {
        const data = JSON.parse(storedMonthlyData);
        regionsMonthly = data.regions || [];
        salesDataMonthly = data.sales || [];
    }

    if (storedDailyData) {
        const data = JSON.parse(storedDailyData);
        regionsDaily = data.regions || [];
        salesDataDaily = data.sales || [];
    }
}

// Initialize Monthly and Daily Sales Charts and Tables
loadDataFromLocalStorage(); // Load data when the page is loaded

// Monthly Sales Chart
const ctxMonthly = document.getElementById('monthlySalesChart').getContext('2d');
let monthlySalesChart = new Chart(ctxMonthly, {
    type: 'bar',
    data: {
        labels: regionsMonthly,
        datasets: [{
            label: 'Monthly Sales Quota',
            data: salesDataMonthly,
            backgroundColor: '#FF5733', // Single color for all bars
            borderColor: '#000',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Daily Sales Chart
const ctxDaily = document.getElementById('dailySalesChart').getContext('2d');
let dailySalesChart = new Chart(ctxDaily, {
    type: 'bar',
    data: {
        labels: regionsDaily,
        datasets: [{
            label: 'Daily Sales Quota',
            data: salesDataDaily,
            backgroundColor: '#4CAF50', // Single color for all bars
            borderColor: '#000',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Function to update the Monthly Sales Chart
function updateMonthlyChart() {
    regionsMonthly = [];
    salesDataMonthly = [];

    const rows = document.querySelectorAll('#monthlySalesTable tbody tr');
    rows.forEach(row => {
        const region = row.cells[0].innerText.trim();
        const sales = parseInt(row.cells[1].innerText.trim()) || 0;  // Default to 0 if empty

        if (region && !isNaN(sales)) {
            regionsMonthly.push(region);
            salesDataMonthly.push(sales);
        }
    });

    monthlySalesChart.data.labels = regionsMonthly;
    monthlySalesChart.data.datasets[0].data = salesDataMonthly;
    monthlySalesChart.update();

    saveDataToLocalStorage();
}

// Function to update the Daily Sales Chart
function updateDailyChart() {
    regionsDaily = [];
    salesDataDaily = [];

    const rows = document.querySelectorAll('#dailySalesTable tbody tr');
    rows.forEach(row => {
        const region = row.cells[0].innerText.trim();
        const sales = parseInt(row.cells[1].innerText.trim()) || 0;  // Default to 0 if empty

        if (region && !isNaN(sales)) {
            regionsDaily.push(region);
            salesDataDaily.push(sales);
        }
    });

    dailySalesChart.data.labels = regionsDaily;
    dailySalesChart.data.datasets[0].data = salesDataDaily;
    dailySalesChart.update();

    saveDataToLocalStorage();
}

// Add Row to Monthly Sales Table
function addRow(tableId) {
    const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    
    cell1.contentEditable = "true";
    cell2.contentEditable = "true";
    cell3.innerHTML = `<button onclick="deleteRow(this, '${tableId}')">Delete</button>`;
    
    cell1.innerText = "New Region";
    cell2.innerText = "0";

    // Attach input event listener to update the chart dynamically when editing
    cell1.addEventListener('input', updateMonthlyChart);
    cell2.addEventListener('input', updateMonthlyChart);

    regionsMonthly.push(cell1.innerText);
    salesDataMonthly.push(parseInt(cell2.innerText) || 0);

    monthlySalesChart.data.labels = regionsMonthly;
    monthlySalesChart.data.datasets[0].data = salesDataMonthly;
    monthlySalesChart.update();

    saveDataToLocalStorage();
}

// Add Row to Daily Sales Table
function addRowDaily(tableId) {
    const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    
    cell1.contentEditable = "true";
    cell2.contentEditable = "true";
    cell3.innerHTML = `<button onclick="deleteRow(this, '${tableId}')">Delete</button>`;
    
    cell1.innerText = "New Region";
    cell2.innerText = "0";

    // Attach input event listener to update the chart dynamically when editing
    cell1.addEventListener('input', updateDailyChart);
    cell2.addEventListener('input', updateDailyChart);

    regionsDaily.push(cell1.innerText);
    salesDataDaily.push(parseInt(cell2.innerText) || 0);

    dailySalesChart.data.labels = regionsDaily;
    dailySalesChart.data.datasets[0].data = salesDataDaily;
    dailySalesChart.update();

    saveDataToLocalStorage();
}

// Delete Row from Monthly Sales Table and Update Chart
function deleteRow(button, tableId) {
    const row = button.parentNode.parentNode;
    const index = row.rowIndex - 1;

    row.parentNode.removeChild(row);

    regionsMonthly.splice(index, 1);
    salesDataMonthly.splice(index, 1);

    monthlySalesChart.data.labels = regionsMonthly;
    monthlySalesChart.data.datasets[0].data = salesDataMonthly;
    monthlySalesChart.update();

    saveDataToLocalStorage();
}

// Delete Row from Daily Sales Table and Update Chart
function deleteRowDaily(button, tableId) {
    const row = button.parentNode.parentNode;
    const index = row.rowIndex - 1;

    row.parentNode.removeChild(row);

    regionsDaily.splice(index, 1);
    salesDataDaily.splice(index, 1);

    dailySalesChart.data.labels = regionsDaily;
    dailySalesChart.data.datasets[0].data = salesDataDaily;
    dailySalesChart.update();

    saveDataToLocalStorage();
}
