CREATE DATABASE ParkAndGo;
USE ParkAndGo;

CREATE TABLE Endereco (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
Logradouro VARCHAR(100),
Bairro VARCHAR(100),
Cidade VARCHAR(50),
Estado VARCHAR(50),
CEP CHAR(8)
) AUTO_INCREMENT = 100;

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
CNPJ CHAR(14),
razaoSocial VARCHAR(100),
nomeFantasia VARCHAR(70),
 dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
 fkEndereco INT, 
	CONSTRAINT Fklocal foreign key (fkEndereco) REFERENCES Endereco(idEndereco)
) AUTO_INCREMENT = 50;

CREATE TABLE Responsavel (
idResponsavel INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
sobrenome VARCHAR(45),
CPF CHAR(11),
email VARCHAR(45),
telefone CHAR(9),
dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
fkEmpresa INT, 
	CONSTRAINT fkEmpresa foreign key (fkEmpresa) REFERENCES Empresa(idEmpresa)
); 

CREATE TABLE Mercado (
idMercado INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(70),
CNPJ CHAR(14),
unidade VARCHAR(50),
fkEmpresa INT,
fkEndereco INT,
	CONSTRAINT fkEmpresa2 foreign key (fkEmpresa) REFERENCES Empresa(idEmpresa),
    CONSTRAINT fkEndereco2 foreign key (fkEndereco) REFERENCES Endereco(idEndereco)
);

CREATE TABLE tipoUsuario(
	idTipoUsuario INT PRIMARY KEY auto_increment,
    tipoUsuario VARCHAR(45)
);

CREATE TABLE Usuario (
	idUsuario INT auto_increment,
    email VARCHAR(45),
    senha VARCHAR(45),
    nome VARCHAR(45),
    fkMercado INT,
    fkTipoUsuario INT,
    CONSTRAINT tipoUsuarioUsuario FOREIGN KEY(fkTipoUsuario)
		REFERENCES tipoUsuario(idTipoUsuario),
    CONSTRAINT usuarioMercado FOREIGN KEY(fkMercado)
		REFERENCES Mercado(idMercado),
	CONSTRAINT pkUsuario PRIMARY KEY (idUsuario, fkTipoUsuario)
);

CREATE TABLE Setor(
	idSetor INT auto_increment,
    nome VARCHAR(45) NOT NULL,
    andar VARCHAR(45),
	fkMercado int,
	constraint fkSetorMercado foreign key(fkMercado) references Mercado(idMercado),
	constraint pkSetor primary key (idSetor, fkMercado)
);
    
CREATE TABLE Status(
	idStatus INT PRIMARY KEY auto_increment,
    nomeStatus VARCHAR(45)
);
    
CREATE TABLE Sensor(
	idSensor INT  PRIMARY KEY auto_increment,
	ModeloSensor VARCHAR(45),
    fkSetor INT,
    fkStatus INT,
    CONSTRAINT sensorSetor FOREIGN KEY (fkSetor)
		REFERENCES Setor(idSetor),
	CONSTRAINT sensorStatus FOREIGN KEY (fkStatus)
		REFERENCES `Status`(idStatus)
);

CREATE TABLE Metrica(
	idMetrica INT PRIMARY KEY auto_increment,
    valor FLOAT,
    tipoMetrica VARCHAR(45),
    dtValor DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkSensor INT,
    CONSTRAINT metricaSetor FOREIGN KEY (fkSensor)
		REFERENCES Sensor(idSensor)
);

insert into Mercado (nome, cnpj, unidade) values
	('mercado simples', '12345678901234', 'rua simples');

insert into Setor (nome, andar, fkMercado) values
	('A', '1', 1),
	('B', '1', 1),
	('C', '1', 1),
	('D', '1', 1);

insert into Sensor (fkSetor) values
	(1),
	(2),
	(3),
	(4);

insert into Metrica values
	(null, '1', 'bloqueio', now(), 1),
	(null, '1', 'bloqueio', now(), 1),
	(null, '1', 'bloqueio', now(), 1),
	(null, '1', 'bloqueio', now(), 1),
	(null, '1', 'bloqueio', now(), 2),
	(null, '1', 'bloqueio', now(), 2),
	(null, '0', 'bloqueio', now(), 2),
	(null, '1', 'bloqueio', now(), 2),
	(null, '1', 'bloqueio', now(), 2),
	(null, '1', 'bloqueio', now(), 2),
	(null, '0', 'bloqueio', now(), 2),
	(null, '1', 'bloqueio', now(), 2),
	(null, '1', 'bloqueio', now(), 2),
	(null, '1', 'bloqueio', now(), 2),
	(null, '1', 'bloqueio', now(), 2),
	(null, '1', 'bloqueio', now(), 3),
	(null, '0', 'bloqueio', now(), 3),
	(null, '1', 'bloqueio', now(), 3),
	(null, '1', 'bloqueio', now(), 3),
	(null, '1', 'bloqueio', now(), 3),
	(null, '1', 'bloqueio', now(), 3),
	(null, '0', 'bloqueio', now(), 4),
	(null, '1', 'bloqueio', now(), 4),
	(null, '1', 'bloqueio', now(), 4),
	(null, '0', 'bloqueio', now(), 4),
	(null, '1', 'bloqueio', now(), 4),
	(null, '1', 'bloqueio', now(), 4),
	(null, '1', 'bloqueio', now(), 4),
	(null, '1', 'bloqueio', now(), 4),
	(null, '0', 'bloqueio', now(), 4),
	(null, '1', 'bloqueio', now(), 4);

select  st.nome, count(m.idMetrica) from Metrica m
	join Sensor s ON m.fkSensor = s.idSensor
		join Setor st ON s.fkSetor = st.idSetor
			where m.valor = '1'
				group by st.nome;