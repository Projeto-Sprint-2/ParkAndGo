var setores = []
var ocupacaoSetores = []
var ocupacaoGeral = []
var historicoAtualizacao = []
var primeiroPlot = true
var coresOcupacao = []
var capacidadeMaxima = []
var setorOcupacao
var primeiroChartEspec = true

const chartVagaspSetor = document.getElementById('chartVagaspSetor');
const chartOcupacaoGeral = document.getElementById('chartOcupacaoGeral');
let selectSetores = document.getElementById('slSetores')

document.addEventListener('DOMContentLoaded', () => {
    fetch(`/setores/listar/${sessionStorage.fkMercado}`, {
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
                    selectSetores.innerHTML += `<option value='${setor.idSetor}'>${setor.nome}<option>`
                })
            })

        }
    })

    selectSetores.addEventListener('change', (e) => {
        buscarSetorEspecifico(e.target.value)
    })

    buscarMedidas()

    const btnDropdownUser = document.getElementById('btn-dropdown-user');
    const dropdownUser = document.getElementById('dropdown-user');

    btnDropdownUser.addEventListener('focus', () => {
        dropdownUser.classList.toggle('show');
    });

    btnDropdownUser.addEventListener('blur', () => {
        dropdownUser.classList.toggle('show');
    });


})

function buscarSetorEspecifico(idSetorEspec) {
    fetch(`/medidas/ocupacao/${idSetorEspec}/${sessionStorage.fkMercado}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                setorOcupacao = ({ ocupacao: json[0].ocupacao, data: json[0].data, setor: json[0].setor })
            })
        }
    })

    setTimeout(() => {
        loadSetorEspecifico()
    }, 1000);
}

function buscarMedidas() {
    fetch(`/medidas/setores/ocupacao/${sessionStorage.fkMercado}`, {
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
                kpiSetorMaisOcupado.innerHTML = setores[ocupacaoSetores.indexOf(Math.max.apply(null, ocupacaoSetores))].nome
            })
        } else {
            console.log('erro no fetch')
        }
    })

    fetch(`/medidas/ocupacaoGeral/${sessionStorage.fkMercado}`, {
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
        ocupacaoSetores.forEach((ocupacao, index) => {
            let p40 = (capacidadeMaxima[index].capacidade * 40) / 100
            let p25 = (capacidadeMaxima[index].capacidade * 25) / 100
            let p75 = (capacidadeMaxima[index].capacidade * 75) / 100
            let p60 = (capacidadeMaxima[index].capacidade * 60) / 100

            if (ocupacao >= p40 && ocupacao <= p60) {
                coresOcupacao[index] = '#22c55e'
            } else if (ocupacao < p25 || ocupacao > p75) {
                coresOcupacao[index] = '#d91e1e'
                publicarAlerta('O amigo', 'oq acontece', sessionStorage.idUsuario)
                mostraToast('Deu ruim')
            } else {
                coresOcupacao[index] = '#fbbf24'
                publicarAlerta('O amigo', 'oq acontece', sessionStorage.idUsuario)
                mostraToast('Deu ruim')
            }
        });
    }, 500);

    setTimeout(() => {
        loadCharts()
    }, 1000);
}

function publicarAlerta(titulo, descricao, idUsuario) {
    fetch(`/alertas/publicar/${idUsuario}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tituloServer: titulo,
            descricaoServer: descricao,
            idUsuarioServer: idUsuario
        })
    })
}

function mostraToast(descricao, tipo = 'warning') {
    document.querySelector('div.toast-stack').innerHTML += `
        <div class="toast">
            <div class="${tipo}">
                <div class="toast-icon">
                    <i class="ri-alert-fill"></i>
                </div>
                <span>${descricao}</span>
                <button class="close">
                    <i class="ri-close-fill"></i>
                </button>
            </div>
            <div class="timer">

            </div>
        </div>
    `;
}

let graficoOcupacaoGeral, graficoVagaspSetor, graficoOcupacaoSetor

function loadSetorEspecifico() {
    if (!primeiroChartEspec) {
        attSetorEspec()
    } else {
        graficoOcupacaoSetor = new Chart(chartOcupacaoSetor, {
            type: 'bar',
            data: {
                labels: [setorOcupacao.setor],
                datasets: [{
                    label: 'Ocupação',
                    backgroundColor: ['blue'],
                    data: [setorOcupacao.ocupacao]
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
        })
    }

    primeiroChartEspec = false

    setTimeout(() => {
        buscarSetorEspecifico
    }, 2000);
}

function loadCharts() {
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

let dataVagaspSetor, dataOcupacaoGeral, labelsOcupacaoGeral, dataOcupacaoSetor, labelsOcupacaoSetor, colorVagaspSetor
function attGraficos() {
    dataVagaspSetor = graficoVagaspSetor.data.datasets[0].data
    colorVagaspSetor = graficoVagaspSetor.data.datasets[0].backgroundColor

    dataVagaspSetor.forEach((data, index) => {
        dataVagaspSetor[index] = ocupacaoSetores[index]
        colorVagaspSetor[index] = coresOcupacao[index]
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

function attSetorEspec() {
    dataOcupacaoSetor = graficoOcupacaoSetor.data.datasets[0].data
    labelsOcupacaoSetor = graficoOcupacaoSetor.data.labels

    dataOcupacaoSetor[0] = setorOcupacao.ocupacao
    labelsOcupacaoSetor[0] = setorOcupacao.setor

    graficoOcupacaoSetor.update()
}

let botaoSair = document.querySelector('.sair')
botaoSair.addEventListener('click', () => {
    console.log('saindo')
    sessionStorage.clear()
    window.location = '../index.html'
})