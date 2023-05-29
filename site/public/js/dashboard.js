var setores = []
var ocupacaoSetores = []
var ocupacaoGeral = []
var historicoAtualizacao = []
var primeiroPlot = true
var coresOcupacao = []
var capacidadeMaxima = []

const chartVagaspSetor = document.getElementById('chartVagaspSetor');
const chartOcupacaoGeral = document.getElementById('chartOcupacaoGeral');

document.addEventListener('DOMContentLoaded', () => {

    fetch('/setores/listar', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                json.forEach(setor => {
                    setores.push(setor)

                    capacidadeMaxima.push({ setor: setor.nome, capacidade: setor.capacidadeMaxima })
                })
            })
        }
    })


    const btnDropdownUser = document.getElementById('btn-dropdown-user');
    const dropdownUser = document.getElementById('dropdown-user');

    btnDropdownUser.addEventListener('focus', () => {
        dropdownUser.classList.toggle('show');
    });

    btnDropdownUser.addEventListener('blur', () => {
        dropdownUser.classList.toggle('show');
    });

    // userSpan.innerHTML = sessionStorage.nomeUsuario || 'Admin';

    buscarMedidas()
})

function buscarMedidas() {
    fetch('/medidas/setores/ocupacao', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then(json => {
                if (primeiroPlot) {
                    json.forEach((element, index) => {
                        ocupacaoSetores.push(element.ocupacao)
                    });
                } else {
                    json.forEach((element, index) => {
                        ocupacaoSetores.splice(index, 1, element.ocupacao)
                        ultimaAttdata.innerText = element.dtUltimaOcupacao
                    })
                }
            })
        } else {
            console.log('erro no fetch')
        }
    })

    fetch('/medidas/ocupacaoGeral', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => {
        if (resposta.ok) {
            resposta.json().then(json => {
                if (ocupacaoGeral.length < 6) {
                    ocupacaoGeral.push(json[0].ocupacao)
                    historicoAtualizacao.push(json[0].data)
                } else {
                    ocupacaoGeral.shift()
                    historicoAtualizacao.shift()

                    ocupacaoGeral.push(json[0].ocupacao)
                    historicoAtualizacao.push(json[0].data)
                }
            })
        }
    })

    setTimeout(() => {
        loadCharts()
    }, 1000);
}

let graficoOcupacaoGeral, graficoVagaspSetor

function loadCharts() {
    let p40 = (capacidadeMaxima.capacidade * 40) / 100
    let p25 = (capacidadeMaxima.capacidade * 25) / 100
    let p75 = (capacidadeMaxima.capacidade * 75) / 100
    let p60 = (capacidadeMaxima.capacidade * 60) / 100

    ocupacaoSetores.forEach((ocupacao, index) => {
        if (ocupacao > p40 && ocupacao <= p60) {
            coresOcupacao[index] = 'green'
        } else if (ocupacao <= p75 || ocupacao >= p25) {
            coresOcupacao[index] = 'orange'
        } else {
            coresOcupacao[index] = 'red'
        }
    })

    if (!primeiroPlot) {
        attGraficos()
    } else {
        graficoVagaspSetor = new Chart(chartVagaspSetor, {
            type: 'bar',
            data: {
                labels: [setores[0].nome, setores[1].nome, setores[2].nome, setores[3].nome],
                datasets: [{
                    label: 'Ocupação',
                    backgroundColor: [
                        coresOcupacao[0],
                        coresOcupacao[1],
                        coresOcupacao[2],
                        coresOcupacao[3],
                    ],
                    data: [ocupacaoSetores[0], ocupacaoSetores[1], ocupacaoSetores[2], ocupacaoSetores[3]],
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

        graficoOcupacaoGeral = new Chart(chartOcupacaoGeral, {
            type: 'line',
            data: {
                labels: [historicoAtualizacao[0], historicoAtualizacao[1], historicoAtualizacao[2], historicoAtualizacao[3], historicoAtualizacao[4], historicoAtualizacao[5]],
                datasets: [{
                    label: 'Ocupação',
                    backgroundColor: [
                        'red'
                    ],
                    data: [ocupacaoGeral[0], ocupacaoGeral[1], ocupacaoGeral[2], ocupacaoGeral[3], ocupacaoGeral[4], ocupacaoGeral[5]],
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Ocupação geral do estacionamento',
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
        })
    }

    primeiroPlot = false

    setTimeout(() => {
        buscarMedidas()
    }, 1000);
}

let dataVagaspSetor, dataOcupacaoGeral, labelsOcupacaoGeral
function attGraficos() {
    dataVagaspSetor = graficoVagaspSetor.data.datasets[0].data

    dataVagaspSetor.forEach((data, index) => {
        dataVagaspSetor[index] = ocupacaoSetores[index]
    })

    graficoVagaspSetor.update()

    dataOcupacaoGeral = graficoOcupacaoGeral.data.datasets[0].data
    labelsOcupacaoGeral = graficoOcupacaoGeral.data.labels

    dataOcupacaoGeral.forEach((data, index) => {
        dataOcupacaoGeral[index] = ocupacaoGeral[index]
        labelsOcupacaoGeral[index] = historicoAtualizacao[index]
    })

    graficoOcupacaoGeral.update()
}