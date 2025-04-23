async function fetchData() {
  const region1 = document.getElementById("region1").value;
  const region2 = document.getElementById("region2").value;

  if (region1 && region2) {
      const response = await fetch('data.json');
      //Al declarar la función como asíncrona, await espera la resolución de la promesa devuelta por fetch. Esto permite escribir código que se lee de manera secuencial, facilitando la comprensión y el mantenimiento del código.
      const data = await response.json();
      const confirmedData1 = data.find(region => region.region === region1).confirmed;
      //Busca en el array de datos la entrada correspondiente a region1 y obtiene los datos confirmados.
      const confirmedData2 = data.find(region => region.region === region2).confirmed;
    
      const labels = confirmedData1.map(entry => entry.date);
      const values1 = confirmedData1.map(entry => entry.value);
      const values2 = confirmedData2.map(entry => entry.value);

      const ctx = document.getElementById('comparar').getContext('2d');
      new Chart(ctx, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [
                  {
                      label: region1,
                      data: values1,
                      borderColor: 'blue',
                      fill: false
                  },
                  {
                      label: region2,
                      data: values2,
                      borderColor: 'red',
                      fill: false
                  }
              ]
          }
      });
  }
}
