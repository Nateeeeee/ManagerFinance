const ctx = document.getElementById('donut');
const sidebar = document.getElementById('sidebar');
const toggleBtns = document.querySelectorAll('.toggle-btn');

// Função para alternar a sidebar
function toggleSidebar() {
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('show');
    } else {
        sidebar.classList.toggle('collapsed');
    }
}

// Adiciona o evento de clique em todos os botões de toggle
toggleBtns.forEach(btn => {
    btn.addEventListener('click', toggleSidebar);
});

// Fecha a sidebar ao clicar fora em dispositivos móveis
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !e.target.classList.contains('toggle-btn')) {
        sidebar.classList.remove('show');
    }
});

// Gerencia o estado da sidebar ao redimensionar a janela
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('show');
    }
});

const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Essencial', 'Pessoal', 'Outros'],
        datasets: [{
            data: [40, 35, 25],
            backgroundColor: ["#f47c72", "#36d4cb", "#007a9b"],
            borderWidth: 0,
            hoverOffset: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: { 
            legend: { display: false }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const i = elements[0].index;
                const label = chart.data.labels[i];
                const value = chart.data.datasets[0].data[i];

                // Reseta todas as bordas
                chart.data.datasets[0].borderWidth = 0;
                chart.data.datasets[0].borderColor = Array(3).fill("#fff");
                
                // Aplica a borda no elemento clicado
                chart.data.datasets[0].borderWidth = Array(3).fill(0);
                chart.data.datasets[0].borderWidth[i] = 4;

                chart.update();

                // Mostra o status no popup
                const popup = document.getElementById('status-popup');
                const statusText = popup.querySelector('.status-text');
                statusText.textContent = `${label}: ${value}%`;
                popup.classList.add('show');

                // Remove o popup e a borda após 2 segundos
                setTimeout(() => {
                    chart.data.datasets[0].borderWidth = Array(3).fill(0);
                    popup.classList.remove('show');
                    chart.update();
                }, 2000);
            }
        }
    },
});
lucide.createIcons();