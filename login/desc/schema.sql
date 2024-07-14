create database userdb;
use userdb;
create table if not exists login_info(
    user_id int not null primary key auto_increment,
    username varchar(50) not null,
    user_password varchar(255) not null
);

select * from userdb.login_info;