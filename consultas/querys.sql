

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
insert into groups(name) value('solo juan');
insert into access_resources values(2,2);
insert into group_access values(3,2);
insert into resources(name,type) values('solo juan','foto');

select * from members;
//grupos//;
select users.name,groups.name from users inner join members on users.id=members.id_user inner join groups on members.id_group=groups.id where users.id=2;alter
//acceso a recurso 1 usuario 1//;

select * from access_resources ar inner join group_access ga on ar.id_access=ga.id_access inner join members m on m.id_group=ga.id_group  where id_resource=1 and  m.id_user=2;

//quien tiene acceso a un recurso//;
select * from users  where id in (select m.id_user from access_resources ar inner join group_access ga on ar.id_access=ga.id_access inner join members m on m.id_group=ga.id_group  where id_resource=3);


//que accesos tiene un usaurio//;
select * from access where id in (select ar.id_access from access_resources ar inner join group_access ga on ar.id_access=ga.id_access inner join members m on m.id_group=ga.id_group  where m.id_user=3);




