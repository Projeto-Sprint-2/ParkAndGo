function calcular() {
    const simulador = document.querySelector('.simulador')
    const resultado = document.querySelector('#resultado')

    simulador.setAttribute('id', 'ativo')

    if (!resultado.classList.contains('fade')) {
        setTimeout(() => {
            resultado.classList.toggle('fade')
        }, 1000);
    }

    let fluxoCarros = Number(iFluxoCarros.value)
    let gastoMedio = Number(iGastoMedio.value)

    let carrosPerdidos = fluxoCarros / 6
    let carrosPerdidosM = carrosPerdidos.toFixed(0) * 30
    let carrosPerdidosA = carrosPerdidosM.toFixed(0) * 12
    let ganhoPerdido = carrosPerdidos.toFixed(0) * gastoMedio
    let ganhoPerdidoM = ganhoPerdido * 30
    let ganhoPerdidoA = ganhoPerdidoM * 12

    let objetivoCarrosPerdidos = fluxoCarros / 40
    let objetivoCarrosPerdidosM = objetivoCarrosPerdidos.toFixed(0) * 30
    let objetivoCarrosPerdidosA = objetivoCarrosPerdidosM.toFixed(0) * 12

    let objetivoGanhoPerdido = objetivoCarrosPerdidos.toFixed(0) * gastoMedio

    let perdaEvitada = ganhoPerdido - objetivoGanhoPerdido
    let perdaEvitadaM = perdaEvitada * 30
    let perdaEvitadaA = perdaEvitadaM * 12

    resultado.innerHTML = `
    <div class="carros">
                Carros: 
                <table>
                    <tr>
                        <td>

                        </td>
                        <td>
                            Diário
                        </td>
                        <td>
                            Mensal
                        </td>
                        <td>
                            Anual
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Sem solução
                        </td>
                        <td>
                            <span id="numCarrosPerdidos">${carrosPerdidos.toFixed(0)}</span>
                        </td>
                        <td>
                            <span id="numCarrosPerdidos">${carrosPerdidosM.toFixed(0)}</span>
                        </td>
                        <td>
                            <span id="numCarrosPerdidos">${carrosPerdidosA.toFixed(0)}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Com solução
                        </td>
                        <td>
                            <span id="objCarrosPerdidos">${objetivoCarrosPerdidos.toFixed(0)}</span>
                        </td>
                        <td>
                            <span id="objCarrosPerdidos">${objetivoCarrosPerdidosM.toFixed(0)}</span>
                        </td>
                        <td>
                            <span id="objCarrosPerdidos">${objetivoCarrosPerdidosA.toFixed(0)}</span>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="ganhos">
            Perdas: 
            <table>
                <tr>
                    <td>

                    </td>
                    <td>
                        Diário
                    </td>
                    <td>
                        Mensal
                    </td>
                    <td>
                        Anual
                    </td>
                </tr>
                <tr>
                    <td>
                        Sem solução
                    </td>
                    <td>
                        <span id="numCarrosPerdidos">${ganhoPerdido.toFixed(2)}</span>
                    </td>
                    <td>
                        <span id="numCarrosPerdidos">${ganhoPerdidoM.toFixed(2)}</span>
                    </td>
                    <td>
                        <span id="numCarrosPerdidos">${ganhoPerdidoA.toFixed(2)}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Perda Evitada
                    </td>
                    <td>
                        <span id="objCarrosPerdidos">${perdaEvitada.toFixed(2)}</span>
                    </td>
                    <td>
                        <span id="objCarrosPerdidos">${perdaEvitadaM.toFixed(2)}</span>
                    </td>
                    <td>
                        <span id="objCarrosPerdidos">${perdaEvitadaA.toFixed(2)}</span>
                    </td>
                </tr>
            </table>
        </div>

    `
}



function cadastrar() {
    let nome = i_nome.value
    let email = i_email.value
    let senha = i_senha.value
    let confirmSenha = i_confirsenha.value
    let div_retorno = document.querySelector('.retorno')

    if (nome == "" || email == "" || senha == "" || confirmSenha == "") {
        div_retorno.style.transform = 'translateX(0)';
        div_retorno.style.color = 'white';
        div_retorno.style.backgroundColor = 'red';
        span_retorno.innerHTML = 'Erro ao cadastrar'
        sup_span_retorno.innerHTML = 'Preencha todos os campos'

        setTimeout(() => {
            div_retorno.style.transform = 'translateX(120%)';
        }, "4000")

        console.log('erro')
    } else {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha
            })
        }).then((resposta) => {
            if (resposta.ok) {
                console.log("resposta: ", resposta);
                div_retorno.style.transform = 'translateX(0)';
                div_retorno.style.color = 'white';
                div_retorno.style.backgroundColor = 'green';
                span_retorno.innerHTML = 'Sucesso ao cadastrar'
                sup_span_retorno.innerHTML = 'Redirecionando'
                setTimeout(() => {
                    window.location = "login.html";
                }, "2000")
            } else {
                console.log('Erro ao cadastrar')
            }
        }).catch((resposta) => {
            console.log(`#ERRO: ${resposta}`);
        })
    }
}

function login(){
    let email = iEmailLogin.value
    let senha = iSenhaLogin.value
    let div_retorno = document.querySelector('.retorno')

    if (email == '' || senha == ''){
        div_retorno.style.transform = 'translateX(0)';
        div_retorno.style.color = 'white';
        div_retorno.style.backgroundColor = 'red';
        span_retorno.innerHTML = 'Erro ao cadastrar'
        sup_span_retorno.innerHTML = 'Preencha todos os campos'

        setTimeout(() => {
            div_retorno.style.transform = 'translateX(120%)';
        }, "4000")

        console.log('erro')
    }else{
        fetch('/usuarios/autenticar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then((resposta)=>{
            if(resposta.ok) {
                console.log(resposta)
                
                resposta.json().then(json =>{
                    console.log(json)

                    sessionStorage.emailUsuario = json.email
                    sessionStorage.senhaUsuario = json.senha
                    sessionStorage.idUsuario = json.id
                    sessionStorage.nomeUsuario = json.nome
                    

                    setTimeout(function () {
                        window.location = "./dashboard/dash.html";

                       
                    }, 1000);

                    
                })
            }
        })
    }
}