function renderiza_faturamento_semanal() {
    const data = {
        faturamento_por_dia: {
            'Seg': 850,
            'Ter': 1230,
            'Qua': 960,
            'Qui': 1050,
            'Sex': 1420,
            'Sáb': 680,
            'Dom': 430
        }
    };

    const ctx = document.getElementById('chartWeekly').getContext('2d');
    const labels = Object.keys(data.faturamento_por_dia);
    const valores = Object.values(data.faturamento_por_dia).map(Number);
    const total = valores.reduce((acc, curr) => acc + curr, 0);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: [
                    'rgb(13, 53, 89)',
                    'rgb(16, 77, 132)',
                    'rgb(37, 119, 191)',
                    'rgb(58, 148, 228)',
                    'rgb(110, 181, 245)',
                    'rgb(143, 200, 252)',
                    'rgb(182, 218, 251)',
                ],
                hoverOffset: 4,
                spacing: 5,
                borderColor: '#3C3C3C',
                borderRadius: 5,
                cutout: '75%',
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'right',
                    align: 'center',
                    labels: {
                        color: '#fff',
                        font: { size: 16 },
                    }
                },
            },
            layout: { padding: { right: 10 } },
            scales: {
                x: { display: false },
                y: { display: false }
            },
        },
        plugins: [{
            id: 'centerText',
            beforeDraw: function(chart) {
                const ctx = chart.ctx;
                ctx.save();
                const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                const totalText = `${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                const subText = "Total";

                ctx.font = 'bold 22px Plus Jakarta Sans';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(totalText, centerX, centerY - 15);

                ctx.font = '16px Plus Jakarta Sans';
                ctx.fillStyle = '#B1B1B1';
                ctx.fillText(subText, centerX, centerY + 15);
                ctx.restore();
            }
        }]
    });
}

function renderiza_faturamento_mensal() {
    const data = {
        faturamento_diario: {
            '01': 320,
            '02': 450,
            '03': 390,
            '04': 510,
            '05': 410,
            '06': 480,
            '07': 530,
            '08': 600,
            '09': 750,
            '10': 810,
            '11': 720,
            '12': 670,
            '13': 550,
            '14': 470,
            '15': 490,
            '16': 560,
            '17': 620,
            '18': 700,
            '19': 780,
            '20': 850
        }
    };

    const ctx = document.getElementById('chartMonthly').getContext('2d');
    const labels = Object.keys(data.faturamento_diario);
    const valores = Object.values(data.faturamento_diario).map(Number);
    const totalFaturamento = valores.reduce((acc, curr) => acc + curr, 0);

    document.getElementById('total_faturamento_mensal').innerText = totalFaturamento.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                borderColor: '#3563E9',
                borderWidth: 2,
                pointBackgroundColor: '#3563E9',
                pointRadius: 3,
                fill: true,
                lineTension: 0,
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            },
            layout: { padding: 10 },
            responsive: true,
            scales: {
                x: { grid: { display: false } },
                y: {
                    grid: {
                        display: true,
                        color: 'rgba(80, 102, 120, 0.25)'
                    },
                    ticks: {
                        beginAtZero: false,
                        min: 0,
                        suggestedMax: Math.max(...valores) * 1.2,
                        padding: 10
                    }
                }
            }
        }
    });
}

function setActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => link.classList.remove('active'));
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

setActiveLink();
renderiza_faturamento_semanal();
renderiza_faturamento_mensal();
