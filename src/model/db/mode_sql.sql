-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema access-control
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema access-control
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `access-control` DEFAULT CHARACTER SET utf8 ;
USE `access-control` ;

-- -----------------------------------------------------
-- Table `access-control`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `access-control`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `status` VARCHAR(45) NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `access-control`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `access-control`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT Now(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT Now(),
  `enabled` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `access-control`.`members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `access-control`.`members` (
  `id_user` INT NOT NULL,
  `id_group` INT NOT NULL,
  PRIMARY KEY (`id_user`, `id_group`),
  INDEX `group_id_idx` (`id_group` ASC) VISIBLE,
  CONSTRAINT `user_id_members`
    FOREIGN KEY (`id_user`)
    REFERENCES `access-control`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `group_id_members`
    FOREIGN KEY (`id_group`)
    REFERENCES `access-control`.`groups` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `access-control`.`resources`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `access-control`.`resources` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `access-control`.`access`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `access-control`.`access` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `access-control`.`group_access`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `access-control`.`group_access` (
  `id_group` INT NOT NULL,
  `id_access` INT NOT NULL,
  PRIMARY KEY (`id_group`, `id_access`),
  INDEX `access_id_ref_idx` (`id_access` ASC) VISIBLE,
  CONSTRAINT `group_id_group_access`
    FOREIGN KEY (`id_group`)
    REFERENCES `access-control`.`groups` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `access_id_groupi_access`
    FOREIGN KEY (`id_access`)
    REFERENCES `access-control`.`access` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `access-control`.`access_resources`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `access-control`.`access_resources` (
  `id_resource` INT NOT NULL,
  `id_access` INT NOT NULL,
  PRIMARY KEY (`id_resource`, `id_access`),
  INDEX `access_id_ref_idx` (`id_access` ASC) VISIBLE,
  CONSTRAINT `resource_id_access_resources`
    FOREIGN KEY (`id_resource`)
    REFERENCES `access-control`.`resources` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `access_id_access_resources`
    FOREIGN KEY (`id_access`)
    REFERENCES `access-control`.`access` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Store Procedures 
-- -----------------------------------------------------


-- -----------------------------------------------------
-- USERS
-- -----------------------------------------------------


DROP PROCEDURE IF EXISTS createUser;
DROP PROCEDURE IF EXISTS selectAllUsers;
DROP PROCEDURE IF EXISTS disableUser;
DROP PROCEDURE IF EXISTS activeUser;
DROP PROCEDURE IF EXISTS selectUserById;
DELIMITER //
//
CREATE PROCEDURE  createUser(in name varchar(45),in last_name varchar(45))
BEGIN
DECLARE lastId INT DEFAULT 0;
START TRANSACTION;
insert into users(name, last_name) values(name,last_name);
set lastId=LAST_INSERT_ID();
insert into members(id_user,id_group) values (lastId,1);
COMMIT;
END
//
CREATE PROCEDURE  selectUserById(in id_in int)
BEGIN
select * from users where id=id_in;
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

-- -----------------------------------------------------
-- GROUPS
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS createGroup;
DROP PROCEDURE IF EXISTS selectAllGroups;
DROP PROCEDURE IF EXISTS selectGroupById;

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

CREATE PROCEDURE selectGroupById(in id_in int)
BEGIN
select * from groups where id= id_in;
END
//
DELIMITER ;
-- -----------------------------------------------------
-- MEMBERS
-- -----------------------------------------------------

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
-- -----------------------------------------------------
-- RESOURCES
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS createResource;
DROP PROCEDURE IF EXISTS selectAllResources;
DROP PROCEDURE IF EXISTS selectResourceById;

DELIMITER //
//
CREATE PROCEDURE  createResource(in name varchar(45),in type varchar(45))
BEGIN
insert into resources(name,type) values(name,type);
END

//
CREATE PROCEDURE  selectResourceById(in id_in int)
BEGIN
select * from resources where id= id_in;
END

//
CREATE PROCEDURE  selectAllResources()
BEGIN
select * from resources;
END

//

DELIMITER ;
-- -----------------------------------------------------
-- ACCESS
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS createAccess;
DROP PROCEDURE IF EXISTS selectAllAccess;
DROP PROCEDURE IF EXISTS selectAccessById;
DELIMITER //
//
CREATE PROCEDURE  createAccess(in name varchar(45))
BEGIN
insert into access(name) values(name);
END

//
CREATE PROCEDURE  selectAccessById(in id_in int)
BEGIN
select * from access where id=id_in;
END

//
CREATE PROCEDURE  selectAllAccess()
BEGIN
select * from access;
END

//

DELIMITER ;

-- -----------------------------------------------------
-- GROUP ACCESS
-- -----------------------------------------------------

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
-- -----------------------------------------------------
-- ACCESS RESOURCES
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS assignAccessToResource;
DROP PROCEDURE IF EXISTS removeAccessToResource;
DROP PROCEDURE IF EXISTS selectAllAccessToResource;

DELIMITER //
//
CREATE PROCEDURE  assignAccessToResource(in id_resource_in int, in id_access_in int)
BEGIN
insert into access_resources(id_resource,id_access) values(id_resource_in,id_access_in);
END


//
CREATE PROCEDURE  selectAllAccessToResource()
BEGIN
select * from access_resources;
END
//
CREATE PROCEDURE  removeAccessToResource(in id_resource_in int, in id_access_in int)
BEGIN
delete from access_resources where id_resource=  id_resource_in  and id_access=id_access_in;

END


//

call createGroup('guest');
call createAccess('basic');
call assingAccessToGroup(1,1);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;