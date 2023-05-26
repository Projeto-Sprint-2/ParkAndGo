var setores = []
var ocupacaoSetores = []
var ocupacaoGeral = []
var historicoAtualizacao = []
var primeiroPlot = true

const chartVagaspSetor = document.getElementById('chartVagaspSetor');
const chartOcupacaoGeral = document.getElementById('chartOcupacaoGeral');

document.addEventListener('DOMContentLoaded', () => {

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
                if(primeiroPlot){
                    json.forEach(element => {
                        setores.push(element.nome)
                        ocupacaoSetores.push(element.ocupacao)
                    });
                }else{
                    json.forEach((element, index) =>{
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
                json.forEach(element => {
                    ocupacaoGeral.push(element.ocupacao)
                    historicoAtualizacao.push(element.data)
                })
            })
        }
    })

    setTimeout(() => {
        loadCharts()
    }, 1000);
}

let graficoOcupacaoGeral, graficoVagaspSetor

function loadCharts(){
    if (!primeiroPlot) {
        attGraficos()
    }else{
        graficoVagaspSetor = new Chart(chartVagaspSetor, {
            type: 'bar',
            data: {
                labels: [setores[0], setores[1], setores[2], setores[3]],
                datasets: [{
                    label: 'Ocupação',
                    backgroundColor: [
                        '#5EABF3'
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
                labels: [historicoAtualizacao[0]],
                datasets: [{
                    label: 'Ocupação',
                    backgroundColor: [
                        'red'
                    ],
                    data: [1],
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

    primeiroPlot = false

    setTimeout(() => {
        buscarMedidas()
    }, 1000);
}

let dataVagaspSetor
function attGraficos() {
    dataVagaspSetor = graficoVagaspSetor.data.datasets[0].data
    
    dataVagaspSetor.forEach((data, index) => {
        dataVagaspSetor[index] = ocupacaoSetores[index]
    })

    graficoVagaspSetor.update()
}