const btnAddMarket = document.getElementById('btn-add-market');
const modalAddMarket = document.getElementById('modal-add-mercado');
const btnCloseModal = document.getElementById('close-modal');
const btnDropdownUser = document.getElementById('btn-dropdown-user');
const dropdownUser = document.getElementById('dropdown-user');

btnDropdownUser.addEventListener('focus', () => {
    dropdownUser.classList.toggle('show');
});

btnDropdownUser.addEventListener('blur', () => {
    dropdownUser.classList.toggle('show');
});
btnAddMarket.addEventListener('click', openDialog);
btnCloseModal.addEventListener('click', closeDialog);

document.addEventListener('DOMContentLoaded', carregarLista())

function openDialog() {
    modalAddMarket.showModal()
}


function closeDialog() {
    modalAddMarket.close()
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
                            <td>
                            <a href="#" id="bnt-add-user" onclick=""class="add-user"><i class="ri-user-add-line"></i></a>
                        </td>
                        <td>
                            <a href="#" onclick="deletarMercado(${mercado.idMercado})" class="delete-market"><i class="ri-delete-bin-fill"></i></a>
                        </td>
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

document.getElementById('drop-logout').addEventListener('click', ()=>{
    sessionStorage.clear()
    window.location = '../index.html'
})

function deletarMercado(idMercado) {
    console.log("Criar função de apagar post escolhido - ID" + idMercado);
    fetch(`/mercados/deletar/${idMercado}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (resposta) {

      if (resposta.ok) {
        window.alert("Mercado deletado com sucesso pelo usuário: " + sessionStorage.getItem("emailUsuario") + "!");
        window.location = "/painel-empresa.html"
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
  }
