// Create a new div element dynamically for the chart container
const chartDiv = document.getElementById('chartDiv');
const chartWrapper = document.createElement('div');
chartWrapper.classList.add('chart-container');

// Create an h2 element for the title and append it to the wrapper
const title = document.createElement('h2');
title.textContent = 'Sales Overview';
chartWrapper.appendChild(title);

// Create a div to hold the canvas for the chart
const canvasContainer = document.createElement('div');
canvasContainer.innerHTML = '<canvas id="myChart"></canvas>';
chartWrapper.appendChild(canvasContainer);

// Append the entire chart wrapper to the main chartDiv
chartDiv.appendChild(chartWrapper);

// Get the context for the chart (using the canvas id)
const ctx = document.getElementById('myChart').getContext('2d');

// Chart data (example)
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'], // X-axis labels
    datasets: [{
        label: 'Sales (in ₱)', // Dataset label
        data: [1000, 1500, 1700, 1300, 1800, 2100, 3200, 1200, 2800], // Data points for each month
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area fill color under the line
        fill: true, // Enable fill under the line
        tension: 0.4 // Smoothness of the line
    }]
};

// Create the chart
const myChart = new Chart(ctx, {
    type: 'line', // Type of chart (Line chart)
    data: data,   // Chart data
    options: {
        responsive: true,  // Ensure the chart resizes responsively
        scales: {
            y: {
                beginAtZero: true  // Start the Y-axis from zero
            }
        }
    }
});
