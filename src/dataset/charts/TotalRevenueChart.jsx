import Chart from 'react-apexcharts';

const TotalRevenueChart = () => {

  const options = {
  chart: {
    type: 'area',
    toolbar: { show: false },
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  tooltip: {
  theme: false,
  custom: function({ series, seriesIndex, dataPointIndex, w }) {
    const month = w.globals.labels[dataPointIndex];
    const value = series[seriesIndex][dataPointIndex];
    const seriesName = w.globals.seriesNames[seriesIndex];

    return `
      <div style="background-color:#000068; color:white; padding:10px 14px; border-radius:6px; font-size:13px;">
        <div><strong>${month}</strong></div>
        <div>${seriesName}: ₦${value.toLocaleString()}</div>
      </div>
    `;
  }
},
  colors: ['#000068'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.3,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  },
};


  const series = [
    {
      name: 'Income',
      data: [500, 450, 600, 700, 800, 980, 720, 640, 900, 840, 780, 820],
    },
  ];

  return <Chart options={options} series={series} type="area" height={300} />;
};

export default TotalRevenueChart;
