let graficoCombinado = null;
const PALETA_COLORES = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#6B5B95'];

async function obtenerDatos() {
    const respuesta = await fetch('data.json');
    return await respuesta.json();
}

function generarConfiguracion(regionesSeleccionadas, datosCompletos) {
    const conjuntosDatos = regionesSeleccionadas.map((region, indice) => {
        const datosRegion = datosCompletos.find(r => r.region === region);
        return {
            label: region,
            data: datosRegion.confirmed.map(d => parseInt(d.value)),
            borderColor: PALETA_COLORES[indice % PALETA_COLORES.length],
            tension: 0.2,
            pointRadius: 3,
            borderWidth: 2
        };
    });

    return {
        type: 'line',
        data: {
            labels: datosCompletos[0].confirmed.map(d => d.date),
            datasets: conjuntosDatos
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'nearest',
                intersect: false
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    mode: 'index',
                    callbacks: {
                        title: (ctx) => `Fecha: ${ctx[0].label}`,
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue} casos`
                    }
                }
            },
            scales: {
                x: {
                    ticks: { autoSkip: true, maxTicksLimit: 20 },
                    grid: { color: '#f5f5f5' }
                },
                y: {
                    title: { display: true, text: 'Casos Confirmados' },
                    beginAtZero: true,
                    grid: { color: '#f5f5f5' }
                }
            }
        }
    };
}

async function inicializar() {
    const datos = await obtenerDatos();
    const selector = document.getElementById('regionSelector');
    
    datos.forEach(region => {
        const opcion = document.createElement('option');
        opcion.value = region.region;
        opcion.textContent = region.region;
        selector.appendChild(opcion);
    });
}

async function actualizarGrafico() {
    const datos = await obtenerDatos();
    const regionesSeleccionadas = Array.from(document.getElementById('regionSelector').selectedOptions)
                                 .map(opcion => opcion.value);
    
    if (regionesSeleccionadas.length < 1) {
        alert('Selecciona al menos 1 región');
        return;
    }

    if (graficoCombinado) graficoCombinado.destroy();
    
    const contexto = document.getElementById('combinedChart').getContext('2d');
    const configuracion = generarConfiguracion(regionesSeleccionadas, datos);
    
    graficoCombinado = new Chart(contexto, configuracion);
}

// Inicializar
inicializar();
