import Chart from 'react-apexcharts';

const TotalCustomersChart = () => {
  const options = {
    chart: { type: 'bar' },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    colors: ['#000068'],
    plotOptions: {
      bar: {
        columnWidth: '50%',
        borderRadius: 4,
      },
    },
  };

  const series = [
    {
      name: 'Customers',
      data: [1000, 1150, 1200, 980, 900, 1020, 950, 1100, 1050, 1200, 1000, 950],
    },
  ];

  return <Chart options={options} series={series} type="bar" height={300} />;
};

export default TotalCustomersChart;
