function cadastrar() {


    let nome = signup_usuario.value
    let email = signup_email.value
    let senha = signup_senha.value
    let confirmSenha = signup_confimsenha.value
    let div_retorno = document.querySelector('.retorno')

    console.log('Cadastrar')

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

function login(){
    let email = signup_email.value
    let senha = signup_senha.value
    let div_retorno = document.querySelector('.retorno')

    console.log('logando')

    if (email == '' || senha == ''){
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
                        window.location = "./dashboard/dashboard.html";

                       
                    }, 1000);

                    
                })
            }
        })
    }
}