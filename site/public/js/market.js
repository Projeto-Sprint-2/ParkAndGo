const btnAddMarket = document.getElementById('btn-add-market');
const modalAddMarket = document.getElementById('modal-add-mercado');

btnAddMarket.addEventListener('click', openDialog);

document.addEventListener('DOMContentLoaded', carregarLista())

function openDialog() {
    modalAddMarket.showModal()
}

async function cadastrarMercado() {
    var nome = inome_fantasia.value
    var cnpj = icnpj.value
    var unidade = iunidade.value
    var cep = icep.value
    var logradouro = ilogradouro.value
    var numero = inumero.value
    var bairro = ibairro.value
    var cidade = icidade.value
    var estado = iestado.value
    var fkEmpresa = sessionStorage.fkEmpresa

    fetch('/mercados/cadastrar', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            cnpjServer: cnpj,
            unidadeServer: unidade,
            cepServer: cep,
            logradouroServer: logradouro,
            numeroServer: numero,
            bairroServer: bairro,
            cidadeServer: cidade,
            estadoServer: estado,
            fkEmpresaServer: fkEmpresa
        })
    })

    carregarLista()
}

function carregarLista() {
    fetch(`/mercados/listar/${sessionStorage.fkEmpresa}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(mercados => {
                mercados.forEach(mercado => {
                    document.querySelector('.market-list-tbody').innerHTML += `
                        <tr>
                            <td>${mercado.nome}</td>
                            <td>${mercado.CNPJ}</td>
                            <td>${mercado.unidade}</td>
                            <td>${mercado.CEP}</td>
                            <td>${mercado.data}</td>
                        </tr>
                    `
                });
            })
        }
    })
}

document.getElementById('btLogout').addEventListener('click', ()=>{
    sessionStorage.clear()
    window.location = '../index.html'
})