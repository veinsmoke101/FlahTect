CREATE TABLE `admins` (
    `username` varchar(255) PRIMARY KEY,
    `password` varchar(255) NOT NULL,
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;


CREATE TABLE `clients` (
    `id` int(11) PRIMARY KEY AUTO_INCREMENT,
    `clientRef` varchar(255) NOT NULL,
    `firstname` varchar(50) NOT NULL,
    `lastname` varchar(50) NOT NULL,
    `age` int(11) NOT NULL,
    `profession` varchar(255) DEFAULT NULL,
    UNIQUE KEY `clientRef` (`clientRef`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;


CREATE TABLE `time_slots` (
    `id` int(11) PRIMARY KEY,
    `time_slot` VARCHAR(255) NOT NULL,
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;


CREATE TABLE `rdvs` (
    `id` int(11) PRIMARY KEY AUTO_INCREMENT,
    `client_id` int(11) NOT NULL,
    `date` date NOT NULL,
    `time_slot` int(11) NOT NULL,
    `description` text NOT NULL,
    FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`time_slot`) REFERENCES `time_slots`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;



INSERT INTO `time_slots` (id, time_slot)
VALUES (1, '10:00 - 10:30'),
    (2, '11:00 - 11:30'),
    (3, '14:00 - 14:30'),
    (4, '15:00 - 15:30'),
    (5, '16:00 - 16:30');