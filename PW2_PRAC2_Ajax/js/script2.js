let graficoCombinado = null;
const COLORES_REGIONES = [
  // Cálidos
  '#FF6B6B', '#FF9F1C', '#FF5252', '#FF7F50',
  // Fríos tecnológicos
  '#45B7D1', '#4ECDC4', '#6B5B95', '#7B68EE',
  '#96CEB4', '#88D8B0', '#20B2AA', '#3CB371',
  '#D4A5A5', '#FFB6C1', '#E6E6FA', '#FFF0F5',
  // Contrastes fuertes
  '#800080', '#4B0082', '#DC143C', '#8B0000',
  '#00CED1', '#48D1CC', '#DA70D6', '#BA55D3',
  '#32CD32', '#FFD700', '#FF4500', '#8A2BE2'
];


// Filtrado inicial de regiones
function filtrarRegionesNoPermitidas(datos) {
    return datos.filter(region => 
        !['Lima', 'Callao'].includes(region.region)
    );
}

async function obtenerDatosFiltrados() {
    const datosCrudos = await obtenerDatos();
    return filtrarRegionesNoPermitidas(datosCrudos);
}

async function inicializar() {
    const datosFiltrados = await obtenerDatosFiltrados();
    const selector = document.getElementById('regionSelector');
    
    // Orden alfabético excluyendo regiones no permitidas
    datosFiltrados.sort((a, b) => a.region.localeCompare(b.region))
                  .forEach(region => {
        const opcion = new Option(region.region, region.region);
        selector.add(opcion);
    });
}

async function actualizarGrafico() {
    const datosFiltrados = await obtenerDatosFiltrados();
    const selecciones = Array.from(
        document.getElementById('regionSelector').selectedOptions,
        opcion => opcion.value
    );
    
    if (selecciones.length < 2) {
        alert(' Por favor seleccione al menos 2 regiones para comparar');
        return;
    }

    if (graficoCombinado) graficoCombinado.destroy();
    
    graficoCombinado = new Chart(
        document.getElementById('combinedChart').getContext('2d'),
        generarConfiguracion(selecciones, datosFiltrados)
    );
}

function generarConfiguracion(regionesSeleccionadas, datosCompletos) {
    return {
        type: 'line',
        data: {
            labels: datosCompletos[0].confirmed.map(d => d.date),
            datasets: regionesSeleccionadas.map((region, indice) => ({
                label: region,
                data: datosCompletos.find(r => r.region === region)
                            .confirmed.map(d => parseInt(d.value)),
                borderColor: COLORES_REGIONES[indice % COLORES_REGIONES.length],
                backgroundColor: COLORES_REGIONES[indice % COLORES_REGIONES.length] + '20',
                tension: 0.3,
                pointRadius: 4,
                borderWidth: 2,
                fill: false
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { font: { size: 14 } }
                },
                tooltip: {
                    mode: 'nearest',
                    bodyFont: { size: 14 },
                    titleFont: { size: 16 },
                    padding: 12,
                    boxPadding: 8
                }
            },
            scales: {
                x: {
                    grid: { color: '#e9ecef' },
                    ticks: { 
                        maxRotation: 45,
                        autoSkip: true,
                        maxTicksLimit: 15,
                        font: { size: 12 }
                    }
                },
                y: {
                    title: { 
                        display: true, 
                        text: 'Casos confirmados acumulados',
                        font: { size: 14 }
                    },
                    beginAtZero: true,
                    grid: { color: '#e9ecef' },
                    ticks: { 
                        stepSize: 200,
                        callback: value => value.toLocaleString('es-PE'),
                        font: { size: 12 }
                    }
                }
            }
        }
    };
}

// Funcionalidad básica
async function obtenerDatos() {
    const response = await fetch('data.json');
    return await response.json();
}

// Inicio
document.addEventListener('DOMContentLoaded', inicializar);