document.getElementById('btEntrar').addEventListener('click', ()=>{
    if(sessionStorage.emailUsuario && sessionStorage.senhaUsuario){
        login(sessionStorage.emailUsuario, sessionStorage.senhaUsuario)
    }else{
        window.location = 'login.html'
    }
})

function cadastrarEmpresa() {
    let razaoSocial = irazao_social.value
    let nomeFantasia = inome_fantasia.value
    let cnpj = icnpj.value
    let cep = icep.value
    let logradouro = ilogradouro.value
    let numero = inumero.value
    let bairro = ibairro.value
    let cidade = icidade.value
    let estado = iestado.value

    fetch('/empresas/cadastrar', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            razaoSocialServer: razaoSocial,
            nomeFantasiaServer: nomeFantasia,
            cnpjServer: cnpj,
            cepServer: cep,
            logradouroServer: logradouro,
            numeroServer: numero,
            bairroServer: bairro,
            cidadeServer: cidade,
            estadoServer: estado
        })
    }).then((resposta) => {
        console.log(resposta)
        if (resposta.ok) {
            resposta.json().then(json => {
                sessionStorage.idEmpresa = json.insertId
            })

            setTimeout(() => {
                window.location = "cadastro-responsavel.html";
            }, 2000)
        }
    }).catch((resposta) => {
        console.log(`#ERRO: ${resposta}`);
    })
}

function cadastrar() {
    let nome = signup_usuario.value
    let email = signup_email.value
    let senha = signup_senha.value
    let confirmSenha = signup_confimsenha.value
    let div_retorno = document.querySelector('.retorno')
    let fkMercado = null
    let fkTipoUsuario = Number(document.querySelector('#cadastroUsuario').getAttribute('tipoUsuario'))

    if (nome == "" || email == "" || senha == "" || confirmSenha == "") {
        div_retorno.style.transform = 'translateX(0)';
        div_retorno.style.color = 'white';
        div_retorno.style.backgroundColor = '#CC3333';
        div_retorno.style.borderLeft = '3px solid #D0342C';
        span_retorno.innerHTML = 'Erro ao cadastrar'
        sub_span_retorno.innerHTML = 'Preencha todos os campos'

        setTimeout(() => {
            div_retorno.style.transform = 'translateX(120%)';
        }, "4000")
    } else {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,
                fkMercadoServer: fkMercado,
                fkTipoUsuarioServer: fkTipoUsuario,
                fkEmpresaServer: sessionStorage.idEmpresa
            })
        }).then((resposta) => {
            if (resposta.ok) {
                console.log("resposta: ", resposta);
                div_retorno.style.transform = 'translateX(0)';
                div_retorno.style.borderLeft = '#2F9E6C';
                div_retorno.style.backgroundColor = '#5EDC8A';
                span_retorno.innerHTML = 'Sucesso ao cadastrar'
                sub_span_retorno.innerHTML = 'Redirecionando'
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

function login(emailParam, senhaParam) {
    let email = emailParam || login_email.value
    let senha = senhaParam || login_senha.value
    let div_retorno = document.querySelector('.retorno')

    if (email == '' || senha == '') {
        div_retorno.style.transform = 'translateX(0)';
        div_retorno.style.color = 'white';
        div_retorno.style.backgroundColor = '#CC3333';
        div_retorno.style.borderLeft = '3px solid #D0342C';
        span_retorno.innerHTML = 'Erro ao cadastrar'
        sub_span_retorno.innerHTML = 'Preencha todos os campos'

        setTimeout(() => {
            div_retorno.style.transform = 'translateX(120%)';
        }, "4000")

        console.log('erro')
    } else {
        fetch('/usuarios/autenticar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            })
        }).then((resposta) => {
            if (resposta.ok) {
                resposta.json().then(json => {
                    var location
                    if (json.fkTipoUsuario == 1) {
                        location = 'painel-empresa.html'
                    } else {
                        location = '/dashboard'
                    }

                    sessionStorage.emailUsuario = json.email
                    sessionStorage.senhaUsuario = json.senha
                    sessionStorage.idUsuario = json.idUsuario
                    sessionStorage.nomeUsuario = json.nome
                    sessionStorage.fkEmpresa = json.fkEmpresa
                    setTimeout(function () {
                        window.location = location
                    }, 1000);
                })
            }
        })
    }
}

function cadastrarResponsavel() {
    let nome = inome.value
    let sobrenome = isobrenome.value
    let cpf = icpf.value
    let email = iemail.value
    let telefone = itelefone.value

    fetch('/responsaveis/cadastrar', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            sobrenomeServer: sobrenome,
            cpfServer: cpf,
            emailServer: email,
            telefoneServer: telefone,
            fkEmpresaServer: sessionStorage.idEmpresa
        })
    }).then(resposta => {
        if (resposta.ok) {
            setTimeout(function () {
                window.location = "signup.html";
            }, 1000);
        }
    }).catch((resposta) => {
        console.log(`#ERRO: ${resposta}`);
    })
}