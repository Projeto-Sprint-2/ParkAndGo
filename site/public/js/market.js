const btnAddMarket = document.getElementById('btn-add-market');
const modalAddMarket = document.getElementById('modal-add-mercado');

btnAddMarket.addEventListener('click', openDialog);

function openDialog() {
    modalAddMarket.showModal()
}

function cadastrarMercado(){
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
}

function carregarLista(){
    fetch('/mercados/listar')
}