var setores = []
var valoresSetores = []

const ctx1 = document.getElementById('myChart1');
const ctx2 = document.getElementById('myChart2');
const ctx3 = document.getElementById('myChart3');

document.addEventListener('DOMContentLoaded', carregarGraficos = () => {
    userSpan.innerHTML = sessionStorage.nomeUsuario || 'Admin';

    fetch('/medidas/setores/ocupacao', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then(json => {
                json.forEach(element => {
                    setores.push(element.nome)
                    valoresSetores.push(element.ocupacao)
                });
                console.log(setores)
                console.log(valoresSetores)
            }).then(() => {
                loadDash()
            })
        } else {
            console.log('erro no fetch')
        }
    })
})

function loadDash() {
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['12:00', '12:20', '12:40', '13:00', '13:20', '13:40'],
            datasets: [{
                label: 'Estacionamento',
                backgroundColor: 'RGB(247, 74, 74)',
                borderColor: 'RGB(247, 74, 74)',
                data: [257, 300, 230, 150, 100, 90, 120],

            }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de vagas ocupadas no Estacionamento',
                    font: {
                        size: 17
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: [setores[0], setores[1], setores[2], setores[3], setores[4], setores[5]],
            datasets: [{
                label: 'Ocupação',
                backgroundColor: [
                    '#5EABF3',
                    '#4485D0',
                    '#2F64AE',
                    '#1D468C',
                    '#2F64AE',
                    '#123074',
                ],
                data: [valoresSetores[0], valoresSetores[1], valoresSetores[2], valoresSetores[3], valoresSetores[4], valoresSetores[5]],

            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Ocupação de vagas por setores',
                    font: {
                        size: 17

                    },
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['10:00:00', '10:20:00', '10:40:00', '11:00:00', '11:20:00', '11:40:00'],
            datasets: [{
                label: 'Setores',
                backgroundColor: [
                    'green',
                    'yellow',
                    'yellow',
                    'green',
                    'red',
                    'red',
                ],
                data: [26, 15, 18, 26, 6, 7],
            }],

        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de vagas ocupadas do setor A',
                    font: {
                        size: 17

                    },
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}