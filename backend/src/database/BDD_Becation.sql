SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema becation_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `becation_db`;
CREATE SCHEMA IF NOT EXISTS `becation_db` ;
USE `becation_db` ;


-- -----------------------------------------------------
-- Table `becation_db`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `becation_db`.`user` ;

CREATE TABLE IF NOT EXISTS `becation_db`.`user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL COMMENT 'nombre de pila',
    `surname` VARCHAR(50) NOT NULL COMMENT 'apellido del usuario',
    `email` VARCHAR(150) NOT NULL COMMENT 'email del usuario (empresarial si es posible)',
    `password` VARCHAR(500) NOT NULL COMMENT 'contraseña encriptada',
    `dni` BIGINT(9) NOT NULL,
    `is_able` TINYINT NOT NULL DEFAULT 1 COMMENT 'es una usuario activo en la empresa para usar el sistema???',
    `privileges` INT NOT NULL,
    `to_create` TIMESTAMP NOT NULL COMMENT 'fecha que se da de alta EN EL SISTEMA\n\ndato predeterminado: CURRENT_TIMESTAMP    ',
    `sign_up_date` DATETIME NULL COMMENT 'fecha que se da de alta administrativa en la empresa',
    `to_update` INT NOT NULL COMMENT 'ID del ultimo usuario que realizo modificaciones en los datos',
    `to_update_date` DATETIME NOT NULL COMMENT 'fecha de la ultima modificacion',
    PRIMARY KEY (`id`),
    UNIQUE INDEX `dni_UNIQUE` (`dni` ASC),
    UNIQUE INDEX `email_UNIQUE` (`email` ASC)
);


-- -----------------------------------------------------
-- Table `becation_db`.`area`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `becation_db`.`area` ;

CREATE TABLE IF NOT EXISTS `becation_db`.`area` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `area` VARCHAR(50) NOT NULL COMMENT 'areas de la empresa',
    `area_manager` INT NULL COMMENT 'id de empleado que es el JEFE de esta area',
    `to_create` TIMESTAMP NOT NULL COMMENT 'marca temporal automatica de cuando se crea este registro en le DB\ndato predeterminado: CURRENT_TIMESTAMP    ',
    `to_update` INT NOT NULL COMMENT 'ID del ultimo usuario que realizo modificaciones en los datos',
    `to_update_date` DATETIME NOT NULL COMMENT 'fecha de la ultima modificacion',
    PRIMARY KEY (`id`),
    INDEX `area_manager_id_idx` (`area_manager` ASC),
    CONSTRAINT `area_manager_id`
    FOREIGN KEY (`area_manager`)
    REFERENCES `becation_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table `becation_db`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `becation_db`.`role` ;

CREATE TABLE IF NOT EXISTS `becation_db`.`role` (
    `id` INT NOT NULL,
    `role_name` VARCHAR(45) NOT NULL COMMENT 'si es jefe, PM, etc',
    `to_create` TIMESTAMP NOT NULL COMMENT 'marca temporal automatica de cuando se crea este registro en le DB\ndato predeterminado: CURRENT_TIMESTAMP    ',
    `to_update` INT NOT NULL COMMENT 'ID del ultimo usuario que realizo modificaciones en los datos\n',
    `to_update_date` DATETIME NOT NULL COMMENT 'fecha de la ultima modificacion',
    PRIMARY KEY (`id`)
)ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `becation_db`.`employer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `becation_db`.`employer` ;

CREATE TABLE IF NOT EXISTS `becation_db`.`employer` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NULL COMMENT 'datos del usuario',
    `available_days` INT NULL COMMENT 'cantidad de dias disponibles para tomarse',
    `total_days` INT NOT NULL DEFAULT 15 COMMENT 'cantidad de dias anuales contractuales',
    `is_cumulative` INT NOT NULL DEFAULT 0 COMMENT 'se pueden acumular vacaciones? aca la cantidad de años que pueden se acumulados',
    `role_id` INT NOT NULL COMMENT 'que rol cumple dentro del area que se encuantra',
    `area` INT NOT NULL COMMENT 'area de trabajo en la que esta el empleado actualmente trabajando',
    `to_update` INT NOT NULL COMMENT 'ID del ultimo usuario que realizo modificaciones en los datos',
    `to_update_date` DATETIME NOT NULL COMMENT 'fecha de la ultima modificacion',
    `to_create` TIMESTAMP NOT NULL COMMENT 'marca temporal automatica de cuando se crea este registro en le DB\ndato predeterminado: CURRENT_TIMESTAMP    ',
    PRIMARY KEY (`id`),
    UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
    INDEX `role_id_idx` (`role_id` ASC),
    INDEX `area_id_idx` (`area` ASC),
    CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `becation_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `role_id`
    FOREIGN KEY (`role_id`)
    REFERENCES `becation_db`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `area_id`
    FOREIGN KEY (`area`)
    REFERENCES `becation_db`.`area` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `becation_db`.`vacation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `becation_db`.`vacation` ;

CREATE TABLE IF NOT EXISTS `becation_db`.`vacation` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `employee` INT NOT NULL COMMENT 'datos del empleado (no de usuario)',
    `start_date` DATETIME NOT NULL COMMENT 'fecha inicial',
    `end_date` DATETIME NOT NULL COMMENT 'fecha final',
    `status` ENUM("aproved", "denied", "revision", "null") NULL DEFAULT 'null' COMMENT 'aprobado rechazado observado',
    `note` TEXT(500) NULL DEFAULT 'null',
    `date_asked` DATETIME NOT NULL COMMENT 'fecha que el eempleado pidio las vacaciones',
    `area_manager_authorization` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'el jefe del area autoriza o no al empleado',
    `to_create` TIMESTAMP NOT NULL COMMENT 'marca temporal automatica de cuando se crea este registro en le DB\ndato predeterminado: CURRENT_TIMESTAMP    ',
    `to_update` INT NOT NULL COMMENT 'quien fue el de rrhh que modifico estas vacaciones por ultima vez\nID del ultimo usuario que realizo modificaciones en los datos',
    `to_update_date` DATETIME NOT NULL COMMENT 'fecha de la ultima modificacion',
    PRIMARY KEY (`id`),
    INDEX `employee_id_idx` (`employee` ASC),
    CONSTRAINT `employee_id`
    FOREIGN KEY (`employee`)
    REFERENCES `becation_db`.`employer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `becation_db`.`user`(`name`, `surname`, `email`, `password`, `dni`, `privileges`) VALUES("Gonzalo", "Carranza", "gonzalocarranza@streambe.com", "gonzac123", 11223344, 1);
INSERT INTO `becation_db`.`user`(`name`, `surname`, `email`, `password`, `dni`, `privileges`) VALUES("Diego", "Sanchez", "diegosanchez@streambe.com", "diegos123", 55667788, 1);
INSERT INTO `becation_db`.`user`(`name`, `surname`, `email`, `password`, `dni`, `privileges`) VALUES("Dylan", "Seltzer", "dylanseltzer@streambe.com", "dylans123", 11663388, 2);