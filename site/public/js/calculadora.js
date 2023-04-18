function calcular() {
    const resultado = document.querySelector('.resultado-table')

    let fluxoCarros = Number(fluxo_carros.value)
    let gastoMedio = Number(gasto_medio.value)

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