CREATE DATABASE ParkAndGo;
USE ParkAndGo;

CREATE TABLE Endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
	logradouro VARCHAR(100),
	bairro VARCHAR(100),
	cidade VARCHAR(50),
	estado VARCHAR(50),
	numero VARCHAR(10),
	CEP CHAR(9)
) AUTO_INCREMENT = 100;

CREATE TABLE Empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
	CNPJ CHAR(18),
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
	CPF CHAR(14),
	email VARCHAR(45),
	telefone CHAR(11),
	dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
	fkEmpresa INT,
	CONSTRAINT fkEmpresa foreign key (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Mercado (
	idMercado INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(70),
	CNPJ CHAR(18),
	unidade VARCHAR(50),
	dataCadastro DATETIME default CURRENT_TIMESTAMP,
	fkEmpresa INT,
	fkEndereco INT,
	CONSTRAINT fkEmpresa2 foreign key (fkEmpresa) REFERENCES Empresa(idEmpresa),
	CONSTRAINT fkEndereco2 foreign key (fkEndereco) REFERENCES Endereco(idEndereco) ON DELETE CASCADE
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
	fkEmpresa INT,
	fkTipoUsuario INT,
	CONSTRAINT FOREIGN KEY(fkTipoUsuario) REFERENCES tipoUsuario(idTipoUsuario),
	CONSTRAINT FOREIGN KEY(fkEmpresa) REFERENCES Empresa(idEmpresa),
	CONSTRAINT usuarioMercado FOREIGN KEY(fkMercado) REFERENCES Mercado(idMercado),
	CONSTRAINT pkUsuario PRIMARY KEY (idUsuario, fkTipoUsuario)
);

CREATE TABLE Alerta(
	idAlerta INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	dataOcorrido DATETIME,
	fkMercado INT,
	CONSTRAINT FOREIGN KEY (fkMercado) REFERENCES Mercado(idMercado)
);

CREATE TABLE Setor(
	idSetor INT auto_increment,
	nome VARCHAR(45) NOT NULL,
	andar VARCHAR(45),
	capacidadeMaxima INT,
	fkMercado int,
	constraint fkSetorMercado foreign key(fkMercado) references Mercado(idMercado) ON DELETE CASCADE,
	constraint pkSetor primary key (idSetor, fkMercado)
);

CREATE TABLE Status(
	idStatus INT PRIMARY KEY auto_increment,
	nomeStatus VARCHAR(45)
);

CREATE TABLE Sensor(
	idSensor INT PRIMARY KEY auto_increment,
	modeloSensor VARCHAR(45),
	fkSetor INT,
	fkStatus INT,
	CONSTRAINT sensorSetor FOREIGN KEY (fkSetor) REFERENCES Setor(idSetor),
	CONSTRAINT sensorStatus FOREIGN KEY (fkStatus) REFERENCES `Status`(idStatus)
);

CREATE TABLE Metrica(
	idMetrica INT PRIMARY KEY auto_increment,
	valor FLOAT,
	tipoMetrica VARCHAR(45),
	dtValor DATETIME DEFAULT CURRENT_TIMESTAMP,
	fkSensor INT,
	CONSTRAINT metricaSetor FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor)
);

insert into Endereco values
	(null, 'Rua Dois', 'Paulista', 'São Paulo', 'São Paulo', '102', '09172-855'),
	(null, 'Rua Um', 'Paulista', 'São Paulo', 'São Paulo', '23', '03582-815');

insert into Empresa values
	(null, '96.118.890/0001-00', 'ParkAndGo', 'ParkAndGo', now(), 100);

insert into Responsavel values
	(null, 'Kauan', 'Oliveira', '240.441.947-05', 'kauan@gmail.com', '11910434006', now(), 50);

insert into
	tipoUsuario
values
	(null, 'Administrador'),
	(null, 'Analista');

insert into Usuario values
	(null, 'kauan@gmail.com', '123456', 'Kauan', null, 50, 1);

insert into Mercado values
	(null, 'Mercado Paulistano', '32.296.969/0001-48', 'Paulista', now(), 50, 101);
    
insert into Setor values
	(null, 'A', 'Terreo', 50, 1),
	(null, 'B', 'Terreo', 70, 1),
	(null, 'C', 'Terreo', 80, 1),
	(null, 'D', 'Terreo', 110, 1);
    
insert into Status values
	(null, 'Ativo');
    
insert into Sensor values
	(null, 'TCRT5000', 1, 1),
	(null, 'TCRT5000', 2, 1),
	(null, 'TCRT5000', 3, 1),
	(null, 'TCRT5000', 4, 1);