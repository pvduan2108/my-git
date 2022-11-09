DROP TABLE IF EXISTS `assignment`;
DROP TABLE IF EXISTS `authority`;
DROP TABLE IF EXISTS `_user`;
DROP TABLE IF EXISTS `asset`;
DROP TABLE IF EXISTS `location`;
DROP TABLE IF EXISTS `category`;


CREATE TABLE `category`
(
    `category_code` varchar(45) NOT NULL,
    `name`          varchar(45) DEFAULT NULL,
    `max_asset_code` int,
    PRIMARY KEY (`category_code`)
);



CREATE TABLE `location`
(
    `location_code` varchar(45) NOT NULL,
    `name`          varchar(45) DEFAULT NULL,
    PRIMARY KEY (`location_code`)
);



CREATE TABLE `asset`
(
    `asset_code`     varchar(45) NOT NULL,
    `name`           varchar(50) DEFAULT NULL,
    `category_code`  varchar(60) DEFAULT NULL,
    `state`          int         DEFAULT NULL,
    `specification`  TEXT DEFAULT NULL,
    `installed_date` date        DEFAULT NULL,
    `location_code`  varchar(45) DEFAULT NULL,
    PRIMARY KEY (`asset_code`),
    CONSTRAINT `category_code` FOREIGN KEY (`category_code`) REFERENCES `category` (`category_code`),
    CONSTRAINT `location_code` FOREIGN KEY (`location_code`) REFERENCES `location` (`location_code`)
);


CREATE TABLE `_user`
(
    `username`      varchar(80) NOT NULL,
    `first_name`    varchar(45)  DEFAULT NULL,
    `last_name`     varchar(80)  DEFAULT NULL,
    `birthdate`     date         DEFAULT NULL,
    `joined_date`   date         DEFAULT NULL,
    `gender`        varchar(45)  DEFAULT NULL,
    `type`          varchar(45)  DEFAULT NULL,
    `staff_code`    varchar(45)  DEFAULT NULL,
    `password`      varchar(200) DEFAULT NULL,
    `location_code` varchar(45)  DEFAULT NULL,
    `state`         int          DEFAULT NULL,
    `first_time`    int          DEFAULT NULL,
    PRIMARY KEY (`username`),
    CONSTRAINT `location_code_user` FOREIGN KEY (`location_code`) REFERENCES `location` (`location_code`)
);



CREATE TABLE `authority`
(
    `authority_id` int NOT NULL,
    `username`     varchar(45) DEFAULT NULL,
    `authority`    varchar(45) DEFAULT NULL,
    PRIMARY KEY (`authority_id`),
    CONSTRAINT `authority` FOREIGN KEY (`username`) REFERENCES `_user` (`username`)
);



CREATE TABLE `assignment`
(
    `id`            int NOT NULL,
    `assigned_to`   varchar(45)   DEFAULT NULL,
    `asset_code`    varchar(45)   DEFAULT NULL,
    `assigned_date` date          DEFAULT NULL,
    `state`         int           DEFAULT NULL,
    `note`          varchar(1200) DEFAULT NULL,
    `return_date`   date          DEFAULT NULL,
    `assigned_by`   varchar(45)   DEFAULT NULL,
    `accepted_by`   varchar(45)   DEFAULT NULL,
    `requested_by`  varchar(45)   DEFAULT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `asset_code` FOREIGN KEY (`asset_code`) REFERENCES `asset` (`asset_code`),
    CONSTRAINT `accepted_by` FOREIGN KEY (`accepted_by`) REFERENCES `_user` (`username`),
    CONSTRAINT `assigned_by` FOREIGN KEY (`assigned_by`) REFERENCES `_user` (`username`),
    CONSTRAINT `assigned_to` FOREIGN KEY (`assigned_to`) REFERENCES `_user` (`username`),
    CONSTRAINT `request_by` FOREIGN KEY (`requested_by`) REFERENCES `_user` (`username`)
);


-- Dump completed on 2022-07-26  9:42:12
