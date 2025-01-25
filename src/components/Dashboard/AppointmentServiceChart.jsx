import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';  // Importação correta do ReactApexChart
import supabase from "../../supabase"; // Supondo que você tenha o arquivo de configuração do Supabase

const AppointmentServiceChart = ({ services }) => {
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'last',
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        },
      },
      xaxis: {
        type: 'datetime',
        categories: [], // As datas retornadas do Supabase (convertidas em timestamps)
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    },
  });

  // Função para buscar dados da view no Supabase (view_appointment_service)
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('view_appointment_service') // Usando o nome da view "view_appointment_service"
      .select('*');

    if (error) {
      console.error('Erro ao buscar dados:', error.message);
      return;
    }

    // Organize os dados para o gráfico
    const formattedData = processChartData(data);
    setState((prevState) => ({
      ...prevState,
      series: formattedData.series,
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: formattedData.categories, // Atualiza as categorias (datas)
        },
      }
    }));
  };

  const processChartData = (data) => {
    const categories = [];
    const seriesData = {}; 

    data.forEach(item => {
      const date = new Date(item.date).getTime(); 
      if (!categories.includes(date)) {
        categories.push(date); 
      }

      if (!seriesData[item.service]) {
        seriesData[item.service] = new Array(categories.length).fill(0);  
      }

      seriesData[item.service][categories.indexOf(date)] = item.service_count;
    });


    const series = Object.keys(seriesData).map(key => ({
      name: key, 
      data: seriesData[key]
    }));

    return {
      categories, 
      series,    
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </div>
    </div>
  );
}

export default AppointmentServiceChart;
