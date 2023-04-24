function calcular() {
    const resultado = document.querySelector('#resultado')

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
            <table>
            <caption> 
                <span>Carros</span>
                <p>
                    Quantidade de veículos que deixaram de consumir no estabelecimento.
                </p>
            </caption>
                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>
                            Diário
                        </th>
                        <th>
                            Mensal
                        </th>
                        <th>
                            Anual
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            Sem Solução <i class="ri-close-line"></i>
                        </th>
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
                        <th>
                            Com Solução <i class="ri-check-line"></i>
                        </th>
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
                </tbody>
            </table>
        </div>

        <div class="ganhos">
            <table>
                <caption> 
                    <span>Perdas</span>
                    <p>
                        Perda em relação ao gasto médio por cliente.
                    </p>
                </caption>
                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>
                            Diário
                        </th>
                        <th>
                            Mensal
                        </th>
                        <th>
                            Anual
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            Sem Solução <i class="ri-close-line"></i>
                        </th>
                        <td>
                            <span id="numCarrosPerdidos">${ganhoPerdido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </td>
                        <td>
                            <span id="numCarrosPerdidos">${ganhoPerdidoM.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </td>
                        <td>
                            <span id="numCarrosPerdidos">${ganhoPerdidoA.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Perda Evitada <i class="ri-add-line"></i>
                        </th>
                        <td>
                            <span id="objCarrosPerdidos">${perdaEvitada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </td>
                        <td>
                            <span id="objCarrosPerdidos">${perdaEvitadaM.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </td>
                        <td>
                            <span id="objCarrosPerdidos">${perdaEvitadaA.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}