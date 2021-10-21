use semi1PR2;

alter table archivo drop constraint fk_use;
alter table amigo drop constraint fk_usu1;
alter table amigo drop constraint fk_usu2;
alter table publicar drop constraint fk_tag_publicar;
alter table publicar drop constraint fk_archivo_publicar;
drop table archivo;
drop table usuario;
drop table amigo;
drop table publicar;
drop table tag;

select * from usuario;
create table usuario(
	idUser int not null auto_increment primary key,
	nombre varchar(40),
    apellido varchar(40),
	usuario varchar(16) unique,
	correo varchar(35),
	contra varchar(50),
	foto varchar(300),
    chatbot int
);

create table archivo(
	idArchivo int not null auto_increment primary key,
	texto varchar(500),
	Arch varchar(300),
    fecha date,
	idUsu int,
	CONSTRAINT fk_use FOREIGN KEY (idUsu)
        REFERENCES usuario (idUser)
);

create table tag(
	idTag int not null auto_increment primary key,
    tag varchar(100) unique not null
);

create table publicar(
	idArchivo int not null,
    idTag int not null,
    Primary key (idArchivo, idTag)
);

alter table publicar add constraint fk_tag_publicar foreign key (idTag) references tag(idTag);
alter table publicar add constraint fk_archivo_publicar foreign key (idArchivo) references archivo(idArchivo);

create table amigo(
	user1 int,
	user2 int,
	estado int,
	CONSTRAINT fk_usu1 FOREIGN KEY (user1)
        REFERENCES usuario (idUser),
	CONSTRAINT fk_usu2 FOREIGN KEY (user2)
        REFERENCES usuario (idUser)
);