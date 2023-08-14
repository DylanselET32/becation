create database becation_bdd;
use becation_bdd;

create table role(
	role_id int not null,
    role_name varchar(25) not null,
    primary key(role_id)
);

create table user(
	user_id int auto_increment not null,
    name varchar(50),
    surname varchar(50),
    email varchar(150) not null,
    password varchar(500) not null,
    dni int,
    is_able boolean,
    role_id int not null,
    available_days int,
    contrat_day date,
    primary key(user_id),
    foreign key(role_id) references role(role_id)
);

create table vacation(
	vacation_id int auto_increment not null,
    required_user_id int not null,
    hr_user_id int,
    initial_date date,
    final_date date,
    days_taked date,
    status enum("acepted", "denied", "revised"),
    note text,
    primary key(vacation_id),
    foreign key(required_user_id) references user(user_id)
);

/*DATOS DE TESTEO - BORRAR EN PRODUCCION*/

INSERT INTO role (role_id, role_name) VALUES
(1, 'Admin'),
(2, 'RRHH'),
(3, 'Employee');

INSERT INTO user (name, surname, email, password, dni, is_able, role_id, available_days, contrat_day)
VALUES
('John', 'Doe', 'john@example.com', 'hashed_password', 123456789, 1, 1, 20, '2022-01-15'),
('Jane', 'Smith', 'jane@example.com', 'hashed_password', 987654321, 1, 2, 15, '2022-03-10'),
('Michael', 'Johnson', 'michael@example.com', 'hashed_password', 456789123, 1, 3, 18, '2022-02-20');


INSERT INTO vacation (required_user_id, hr_user_id, initial_date, final_date, days_taked, status, note)
VALUES
(1, 2, '2023-08-15', '2023-08-20', 6, 'acepted', 'Vacation by the sea'),
(2, 3, '2023-09-10', '2023-09-15', 5, 'revised', 'Family trip');
