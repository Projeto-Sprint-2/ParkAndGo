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
                    order by id desc;`;

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

function buscarMedidasPorSetor(idMercado) {
    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        return
    } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
        instrucaoSql = `
        select st.nome, max(DATE_FORMAT(m.dtValor, '%H:%i')) as 'dtUltimaOcupacao', count(m.idMetrica) as 'ocupacao'
        from Metrica m
            join Sensor s on m.fkSensor = s.idSensor
                join Setor st on s.fkSetor = st.idSetor
                    where m.valor = '1'
                        and m.dtValor = (select max(dtValor) from Metrica)
                        and st.fkMercado = 1
                            group by st.nome, DATE_FORMAT(m.dtValor, '%H:%i')
                                order by dtUltimaOcupacao desc
                                    limit 4;
        `
    }
    return database.executar(instrucaoSql)
}

function buscarOcupacaoGeral(idMercado) {
    if (process.env.AMBIENTE_PROCESSO == 'producao') {
        return
    } else {
        instrucao = `
        select count(idMetrica) as ocupacao, DATE_FORMAT(dtValor, '%H:%i') as 'data' from Metrica m
        join Sensor s on m.fkSensor = s.idSensor
            join Setor st on s.fkSetor = st.idSetor
                where valor = '1' 
                    and DATE_FORMAT(dtValor, '%H:%i') = (select max(DATE_FORMAT(dtValor, '%H:%i')) from Metrica)
                        and st.fkMercado = ${idMercado}
                            group by DATE_FORMAT(dtValor, '%H:%i');
        `
        return database.executar(instrucao)
    }
}

function buscarOcupacaoSetor(idSetor, idMercado) {
    return database.executar(`
        select count(idMetrica) as ocupacao, DATE_FORMAT(dtValor, '%H:%i') as 'data', st.nome as 'setor' from Metrica m
            join Sensor s on m.fkSensor = s.idSensor
                join Setor st on s.fkSetor = st.idSetor
                    where valor = '1'
                        and DATE_FORMAT(dtValor, '%H:%i') = (select max(DATE_FORMAT(dtValor, '%H:%i')) from Metrica)
                            and st.fkMercado = ${idMercado}
                                and st.idSetor = ${idSetor}
                                 group by DATE_FORMAT(dtValor, '%H:%i');
    `)
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasPorSetor,
    buscarOcupacaoGeral,
    buscarOcupacaoSetor
}
