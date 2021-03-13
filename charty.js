  const chartLabels = ['Kyle', 'Nate', 'Hugo'];
const ctx = document.getElementById('garlicChart');
const breadChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: chartLabels,
    datasets: [
      {
        label: 'Garlic Bread',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 163, 235, 0.2)',
        lineTension: 0.3,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  },
  options: {},
});