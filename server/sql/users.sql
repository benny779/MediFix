CREATE DATABASE IF NOT EXISTS MediFix;

drop table if exists `refresh_tokens`;
drop table if exists `users`;

CREATE TABLE `users` (
	`user_id` char(64) NOT NULL primary key,
    `first_name` varchar(50) NOT NULL,
    `last_name` varchar(50) NOT NULL,
    `email` varchar(128) NOT NULL unique,
    `password` varchar(70) NOT NULL,
    `phone` varchar(15) NULL,
    `created` datetime NOT NULL default current_timestamp(),
    `updated` datetime NOT NULL default current_timestamp()
);

CREATE TABLE `refresh_tokens` (
	`user_id` char(64) NOT NULL,
    `token` varchar(35) NOT NULL,
    `created` datetime NOT NULL default current_timestamp(),
    
    constraint foreign key (`user_id`) references `users` (`user_id`)
);

ALTER TABLE `refresh_tokens`
	ADD KEY `user_id` (`user_id`),
    ADD KEY `token` (`token`)