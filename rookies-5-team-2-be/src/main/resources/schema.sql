DROP TABLE IF EXISTS `assignment`;
DROP TABLE IF EXISTS `authority`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `asset`;
DROP TABLE IF EXISTS `location`;
DROP TABLE IF EXISTS `category`;


CREATE TABLE `category`
(
    `category_code` varchar(45) NOT NULL,
    `name`          varchar(45) DEFAULT NULL,
    `max_asset_code` int,
    PRIMARY KEY (`category_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `location`
(
    `location_code` varchar(45) NOT NULL,
    `name`          varchar(45) DEFAULT NULL,
    PRIMARY KEY (`location_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



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
    KEY              `category_id_idx` (`category_code`),
    KEY              `location_code_idx` (`location_code`),
    CONSTRAINT `category_code` FOREIGN KEY (`category_code`) REFERENCES `category` (`category_code`),
    CONSTRAINT `location_code` FOREIGN KEY (`location_code`) REFERENCES `location` (`location_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `user`
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
    KEY             `user_FK` (`location_code`),
    CONSTRAINT `location_code_user` FOREIGN KEY (`location_code`) REFERENCES `location` (`location_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `authority`
(
    `authority_id` int NOT NULL,
    `username`     varchar(45) DEFAULT NULL,
    `authority`    varchar(45) DEFAULT NULL,
    PRIMARY KEY (`authority_id`),
    KEY            `authority_idx` (`username`),
    CONSTRAINT `authority` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



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
    KEY             `asset_code_idx` (`asset_code`),
    KEY             `assigned_to_idx` (`assigned_to`),
    KEY             `assigned_by_idx` (`assigned_by`),
    KEY             `accepted_by_idx` (`accepted_by`),
    KEY             `request_by_idx` (`requested_by`),
    CONSTRAINT `asset_code` FOREIGN KEY (`asset_code`) REFERENCES `asset` (`asset_code`) ON DELETE CASCADE,
    CONSTRAINT `accepted_by` FOREIGN KEY (`accepted_by`) REFERENCES `user` (`username`),
    CONSTRAINT `assigned_by` FOREIGN KEY (`assigned_by`) REFERENCES `user` (`username`),
    CONSTRAINT `assigned_to` FOREIGN KEY (`assigned_to`) REFERENCES `user` (`username`),
    CONSTRAINT `request_by` FOREIGN KEY (`requested_by`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Dump completed on 2022-07-26  9:42:12
