use semi1PR2;


alter table archivo drop constraint fk_use;
alter table amigo drop constraint fk_usu1;
alter table amigo drop constraint fk_usu2;
alter table publicar drop constraint fk_tag_publicar;
alter table publicar drop constraint fk_archivo_publicar;
truncate table publicar;
truncate table archivo;
truncate table tag;
drop table archivo;
drop table usuario;
drop table amigo;
drop table publicar;
drop table tag;

#---------------------------------------------------------TABLAS------------------------------------------
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
ALTER TABLE amigo ADD CONSTRAINT fk_usu2 FOREIGN KEY (user2)
        REFERENCES usuario (idUser);
   
#------------------------------------------PROCEDIMIENTOS---------------------------------------------------
drop Procedure PUBLICAR;
/*DELIMITER $$
CREATE  PROCEDURE PUBLICAR ( tagN varchar(100))
BEGIN
	IF (select count(*) from tag where tag=tagN)=0 THEN
		insert into tag values (0, tagN);
        insert into publicar values ((select idArchivo from archivo Order by idArchivo desc Limit 1),(select idTag  from tag Order by idTag desc Limit 1)) ;
	ELSE
		insert into publicar values ((select idArchivo from archivo Order by idArchivo desc Limit 1),(select idTag  from tag where tag=tagN)) ;
	END IF;
END$$
*/

#CALL PUBLICAR("Person");



#-------------------------------------------CONSULTAS-------------------------------------------------------

SELECT * FROM publicar;
SELECT * FROM tag;
SELECT * FROM archivo;
SELECT * FROM usuario;
SELECT * FROM amigo;


-- Mostrar publicaciones
SELECT * FROM archivo 
WHERE idUsu IN (
select idUser from usuario
where idUser in 
(select user1 from amigo
where user2=1
and estado=0)
or idUser in 
(select user2 from amigo
where user1=1
and estado=0)
or idUsu=1
);
-- Mostrar sugerencias
select idUser, Concat(nombre,' ',apellido )as nombre,usuario, correo, contra, foto from usuario as u
where idUser not in 
(select user1 from amigo
where user2=1)
and idUser not in 
(select user2 from amigo
where user1=1)
and idUser!=1;

-- Mostrar Amigos
select idUser , Concat(nombre,' ', apellido)as nombre, usuario, correo, contra, foto 
from usuario as u
where idUser in 
(select user1 from amigo
where user2=1
and estado=0)
or idUser in 
(select user2 from amigo
where user1=1
and estado=0);

-- Mis Solicitudes
select idUser, Concat(nombre,' ', apellido) as nombre, usuario, correo, contra, foto from usuario, amigo
where user1=idUser
and user2=1
and estado=2;


