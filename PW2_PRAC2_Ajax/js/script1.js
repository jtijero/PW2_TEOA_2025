let charts = {};

async function fetchData() {
    const response = await fetch('data.json'); // Fetch API para cargar datos
    return await response.json();
}

function createChart(ctx, regionData, color) {
    return new Chart(ctx, { // Constructor de Chart.js
        type: 'line',
        data: {
            labels: regionData.confirmed.map(d => d.date),
            datasets: [{
                label: `Casos en ${regionData.region}`,
                data: regionData.confirmed.map(d => parseInt(d.value)), // Valores numéricos
                borderColor: color,
                tension: 0.1,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    title: { display: true, text: 'Casos Confirmados' },
                    beginAtZero: true
                },
                x: {
                    ticks: { maxTicksLimit: 15 },
                    grid: { display: false }
                }
            }
        }
    });
}

async function init() {
    const data = await fetchData();
    const regions = data.map(r => r.region);
    
    // Llenar selects
    const select1 = document.getElementById('region1');
    const select2 = document.getElementById('region2');
    
    regions.forEach(region => { // Iteración sobre regiones
        [select1, select2].forEach(select => {
            const option = document.createElement('option');
            option.value = region; // Valor para backend
            option.textContent = region; //
            select.appendChild(option);
        });
    });
}

async function loadComparison() {
    const data = await fetchData(); // Recarga datos actualizados
    const region1 = document.getElementById('region1').value;
    const region2 = document.getElementById('region2').value;
    
    // Destruir gráficos anteriores
    Object.values(charts).forEach(chart => chart.destroy());
    
    // Crear nuevos gráficos
    const ctx1 = document.getElementById('chartRegion1');
    const ctx2 = document.getElementById('chartRegion2');
    
    const data1 = data.find(r => r.region === region1);
    const data2 = data.find(r => r.region === region2);
    
    charts.region1 = createChart(ctx1, data1, '#FF6384');
    charts.region2 = createChart(ctx2, data2, '#36A2EB');
}

// Inicialización
init();
