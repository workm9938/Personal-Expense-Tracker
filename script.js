const expenseForm = document.getElementById('expense-form');
const expenseTableBody = document.getElementById('expense-table-body');
const expenseChartCanvas = document.getElementById('expenseChart');
let expenses = [];
let chart;

function updateChart() {
  const categories = {};
  expenses.forEach(expense => {
    categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [{
      data: Object.values(categories),
      backgroundColor: ['#2196f3', '#ff5722', '#ff9800', '#9c27b0', '#8bc34a'],
      hoverOffset: 4
    }]
  };

  if (chart) chart.destroy();
  chart = new Chart(expenseChartCanvas, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#ffffff' } }
      }
    }
  });
}

function renderExpenses() {
  expenseTableBody.innerHTML = '';
  expenses.forEach(expense => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>${expense.amount.toFixed(2)}</td>
      <td>${expense.category}</td>
    `;
    expenseTableBody.appendChild(row);
  });
}

expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  expenses.push({ description, amount, category });
  renderExpenses();
  updateChart();
  expenseForm.reset();
});

updateChart();
