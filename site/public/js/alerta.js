document.addEventListener('DOMContentLoad', buscarAlertas())

// idUsuario
function buscarAlertas() {
    fetch(`/alertas/listar/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(resposta){
        resposta.json().then(function(alertas) {
            document.querySelector('.alert-list').innerHTML = ``;

            alertas.forEach(alerta => {
                document.querySelector('.alert-list').innerHTML += `
                    <tr>
                        <td>${alerta.titulo}</td>
                        <td>${alerta.descricao}</td>
                        <td>${alerta.dataOcorrido}</td>
                    </tr>
                `;
            });
        })
    }).catch(function(error) {
        console.log(`Deu ruim na busca pelos alertas: ${error}`);
    }) 
}