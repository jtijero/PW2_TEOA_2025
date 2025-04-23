let myChart;

async function loadData() {
    const response = await fetch('../data.json');
    return await response.json();
}

function createChart(selectedRegions, data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: selectedRegions.map(region => region.region),
            datasets: [{
                label: 'Casos Confirmados',
                data: selectedRegions.map(region => 
                    region.confirmed.reduce((sum, day) => sum + parseInt(day.value), 0)
                ),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)'
            }]
        }
    });
}

async function init() {
    const data = await loadData();
    const select = document.getElementById('regionSelect');
    
    data.forEach(region => {
        const option = document.createElement('option');
        option.value = region.region;
        option.textContent = region.region;
        select.appendChild(option);
    });
}

async function updateChart() {
    const data = await loadData();
    const selected = Array.from(document.getElementById('regionSelect').selectedOptions)
        .map(opt => data.find(r => r.region === opt.value));
    
    createChart(selected, data);
}

init();
