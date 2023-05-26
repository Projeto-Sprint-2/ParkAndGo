var database = require("../database/config");

function buscarUltimasMedidas(idSensor, limite_linhas) {
    instrucaoSql = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
        
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select valor, dtValor from Metrica where fkSensor = ${idSensor}
        limit ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idSensor) {
    instrucaoSql = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select valor, dtValor from Metrica
                            where fkSensor = ${idSensor}
                                order by idMetrica desc limit 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasPorSetor() {
    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        return
    } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        instrucaoSql = `
        select st.nome, max(m.dtValor) as 'dtUltimaOcupacao', count(m.idMetrica) as 'ocupacao'
            from Metrica m
                join Sensor s on m.fkSensor = s.idSensor
                    join Setor st on s.fkSetor = st.idSetor
                        where m.valor = '1'
                            group by st.nome
                                order by dtUltimaOcupacao desc;
        `
    }
    return database.executar(instrucaoSql)
}

function buscarOcupacaoGeral() {
    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        return
    } else {
        instrucao = `
        select count(idMetrica) as ocupacao, DATE_FORMAT(dtValor, '%H:%i:%s') as 'data' from Metrica 
            where valor = '1' 
                and dtValor = (select max(dtValor) from Metrica) 
                    group by dtValor;
        `

        return database.executar(instrucao)
    }
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasPorSetor,
    buscarOcupacaoGeral
}
