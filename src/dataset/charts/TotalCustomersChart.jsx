import Chart from 'react-apexcharts';

const TotalCustomersChart = ({ monthlyCounts }) => {
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

  const series = [{ name: 'Customers', data: monthlyCounts }];

  return <Chart options={options} series={series} type="bar" height={300} />;
};

export default TotalCustomersChart;
