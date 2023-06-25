

select * from groups;
select * from users;
select * from resources;
select * from access;
select * from access_resources;
select * from group_access;
select * from members;
delete from members where id_user=1;



insert into  users(name,last_name) values('juancito','garcia');
insert into access(name) values('solo juan');
insert into members(id_user,id_group) values(3,1);
insert into public.groups(name) value('solo juan');
insert into access_resources values(2,2);
insert into group_access values(3,2);
insert into resources(name,type) values('solo juan','foto');

select * from members;
-- grupos
select users.name, gr.name from users inner join members on users.id=members.id_user inner join public.groups gr on members.id_group=gr.id where users.id=2;
-- acceso a recurso 1 usuario 1//;

select * from access_resources ar inner join group_access ga on ar.id_access=ga.id_access inner join members m on m.id_group=ga.id_group  where id_resource=1 and  m.id_user=2;

-- //quien tiene acceso a un recurso//;
select * from users  where id in (select m.id_user from access_resources ar inner join group_access ga on ar.id_access=ga.id_access inner join members m on m.id_group=ga.id_group  where id_resource=3);


-- //que accesos tiene un usaurio//;
select * from access where id in (select ar.id_access from access_resources ar inner join group_access ga on ar.id_access=ga.id_access inner join members m on m.id_group=ga.id_group  where m.id_user=3);
-- store procedures

-- create user 

USE `access-control`;
DROP PROCEDURE IF EXISTS createUser;
DROP PROCEDURE IF EXISTS selectAllUsers;
DROP PROCEDURE IF EXISTS disableUser;
DROP PROCEDURE IF EXISTS activeUser;



DELIMITER //
//
CREATE PROCEDURE  createUser(in name varchar(45),in last_name varchar(45))
BEGIN
insert into users(name, last_name) values(name,last_name);
END
//
CREATE PROCEDURE  selectAllUsers()
BEGIN
select * from users;
END
 //
 CREATE PROCEDURE  disableUser(in id_user int)
BEGIN
update users set status='INACTIVE' where id=id_user;
END
//
 CREATE PROCEDURE  activeUser(in id_user int)
BEGIN
update users set status='ACTIVE' where id=id_user;
END
 //
DELIMITER ;


call createUser('alan','garcia')

call selectAllUsers()
call disableUser(3)
call activeUser(3)

-- groups
USE `access-control`;
DROP PROCEDURE IF EXISTS createGroup;
DROP PROCEDURE IF EXISTS selectAllGroups;


DELIMITER //
//
CREATE PROCEDURE  createGroup(in name varchar(45))
BEGIN
insert into groups(name) values(name);
END
//


CREATE PROCEDURE  selectAllGroups()
BEGIN
select * from groups;
END
//

DELIMITER ;
call createGroup('basic231');
call selectAllGroups();




-- members
USE `access-control`;
DROP PROCEDURE IF EXISTS addUserToGroup;
DROP PROCEDURE IF EXISTS selectAllMembers;
DROP PROCEDURE IF EXISTS removeUserFromGroup;



DELIMITER //
//
CREATE PROCEDURE  addUserToGroup(in id_user int,in id_group int)
BEGIN
insert into members(id_user,id_group) values(id_user,id_group);
END

//
CREATE PROCEDURE  selectAllMembers()
BEGIN
select * from members;
END

//
CREATE PROCEDURE  removeUserFromGroup(in id_user_in int,in id_group_in int)
BEGIN
 delete from members where id_user=id_user_in and id_group=id_group_in;
END

//

DELIMITER ;

call addUserToGroup(1,2);
call selectAllMembers();
call removeUserFromGroup(1,1);

delete from members where id_user=1 and id_group=2









-- resources

USE `access-control`;
DROP PROCEDURE IF EXISTS createResource;
DROP PROCEDURE IF EXISTS selectAllResources;




DELIMITER //
//
CREATE PROCEDURE  createResource(in name varchar(45),in type varchar(45))
BEGIN
insert into resources(name,type) values(name,type);
END

//
CREATE PROCEDURE  selectAllResources()
BEGIN
select * from resources;
END

//

DELIMITER ;
call createResource('prueba','http');
call selectAllResources()




-- access

USE `access-control`;
DROP PROCEDURE IF EXISTS createAccess;
DROP PROCEDURE IF EXISTS selectAllAccess;





DELIMITER //
//
CREATE PROCEDURE  createAccess(in name varchar(45))
BEGIN
insert into access(name) values(name);
END

//
CREATE PROCEDURE  selectAllAccess()
BEGIN
select * from access;
END

//

DELIMITER ;
call selectAllAccess()
call createAccess('avanzado')



-- group access

USE `access-control`;
DROP PROCEDURE IF EXISTS assingAccessToGroup;
DROP PROCEDURE IF EXISTS selectAllGroupsAccess;
DROP PROCEDURE IF EXISTS removeAccessToGroup;



DELIMITER //
//
CREATE PROCEDURE  assingAccessToGroup(in id_group_in int, in id_access_in int)
BEGIN
insert into group_access(id_group,id_access) values(id_group_in,id_access_in);
END

//
CREATE PROCEDURE  removeAccessToGroup(in id_group_in int, in id_access_in int)
BEGIN
delete from  group_access where id_group=id_group_in and id_access= id_access_in;

END

//
CREATE PROCEDURE  selectAllGroupsAccess()
BEGIN
select * from group_access;
END

//

DELIMITER ;

call selectAllGroupsAccess()
call assingAccessToGroup(1,4)
call removeAccessToGroup(1,3)





-- access resources 



USE `access-control`;
DROP PROCEDURE IF EXISTS assingAccessToGroup;




DELIMITER //
//
CREATE PROCEDURE  assingAccessToGroup(in id_group_in int, in id_access_in int)
BEGIN
insert into group_access(id_group,id_access) values(id_group_in,id_access_in);
END


//

DELIMITER ;


