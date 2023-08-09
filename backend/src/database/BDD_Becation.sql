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