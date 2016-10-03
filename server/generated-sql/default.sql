
# This is a fix for InnoDB in MySQL >= 4.1.x
# It "suspends judgement" for fkey relationships until are tables are set.
SET FOREIGN_KEY_CHECKS = 0;

-- ---------------------------------------------------------------------
-- user
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN','REGISTERED') DEFAULT 'REGISTERED' NOT NULL,
    `player_id` INT UNSIGNED,
    `time_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `state` ENUM('ACTIVE','DISABLED') DEFAULT 'ACTIVE' NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `user_u_f86ef3` (`username`),
    INDEX `user_fi_97a1b7` (`player_id`),
    CONSTRAINT `user_fk_97a1b7`
        FOREIGN KEY (`player_id`)
        REFERENCES `player` (`id`)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- player
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `player`;

CREATE TABLE `player`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `time_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `created_by_user_id` INT UNSIGNED,
    PRIMARY KEY (`id`),
    INDEX `player_fi_517110` (`created_by_user_id`),
    CONSTRAINT `player_fk_517110`
        FOREIGN KEY (`created_by_user_id`)
        REFERENCES `user` (`id`)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- course
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `course`;

CREATE TABLE `course`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `rating` VARCHAR(4),
    `user_id` INT UNSIGNED,
    PRIMARY KEY (`id`),
    INDEX `course_fi_29554a` (`user_id`),
    CONSTRAINT `course_fk_29554a`
        FOREIGN KEY (`user_id`)
        REFERENCES `user` (`id`)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- fairway
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `fairway`;

CREATE TABLE `fairway`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `course_id` INT UNSIGNED NOT NULL,
    `ordinal` INT UNSIGNED NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `length` SMALLINT UNSIGNED COMMENT 'Pituus metreinä',
    `relief` SMALLINT UNSIGNED COMMENT 'Korkeusero metreinä',
    `par` TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fairway_fi_ebed28` (`course_id`),
    CONSTRAINT `fairway_fk_ebed28`
        FOREIGN KEY (`course_id`)
        REFERENCES `course` (`id`)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- layout
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `layout`;

CREATE TABLE `layout`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `course_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED,
    PRIMARY KEY (`id`),
    INDEX `layout_fi_ebed28` (`course_id`),
    INDEX `layout_fi_29554a` (`user_id`),
    CONSTRAINT `layout_fk_ebed28`
        FOREIGN KEY (`course_id`)
        REFERENCES `course` (`id`),
    CONSTRAINT `layout_fk_29554a`
        FOREIGN KEY (`user_id`)
        REFERENCES `user` (`id`)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- layout_fairway
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `layout_fairway`;

CREATE TABLE `layout_fairway`
(
    `layout_id` INT UNSIGNED NOT NULL,
    `fairway_id` INT UNSIGNED NOT NULL,
    `ordinal` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`layout_id`,`fairway_id`),
    INDEX `layout_fairway_fi_8d6389` (`fairway_id`),
    CONSTRAINT `layout_fairway_fk_02954e`
        FOREIGN KEY (`layout_id`)
        REFERENCES `layout` (`id`),
    CONSTRAINT `layout_fairway_fk_8d6389`
        FOREIGN KEY (`fairway_id`)
        REFERENCES `fairway` (`id`)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- round
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `round`;

CREATE TABLE `round`
(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `layout_id` INT UNSIGNED NOT NULL,
    `starttime` DATETIME NOT NULL,
    `endtime` DATETIME NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `round_fi_02954e` (`layout_id`),
    INDEX `round_fi_29554a` (`user_id`),
    CONSTRAINT `round_fk_02954e`
        FOREIGN KEY (`layout_id`)
        REFERENCES `layout` (`id`),
    CONSTRAINT `round_fk_29554a`
        FOREIGN KEY (`user_id`)
        REFERENCES `user` (`id`)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- round_fairway
-- ---------------------------------------------------------------------

DROP TABLE IF EXISTS `round_fairway`;

CREATE TABLE `round_fairway`
(
    `round_id` INT UNSIGNED NOT NULL,
    `fairway_id` INT UNSIGNED NOT NULL,
    `player_id` INT UNSIGNED NOT NULL,
    `par` TINYINT UNSIGNED NOT NULL,
    `result` TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (`round_id`,`fairway_id`,`player_id`),
    INDEX `round_fairway_fi_8d6389` (`fairway_id`),
    INDEX `round_fairway_fi_97a1b7` (`player_id`),
    CONSTRAINT `round_fairway_fk_7a807c`
        FOREIGN KEY (`round_id`)
        REFERENCES `round` (`id`),
    CONSTRAINT `round_fairway_fk_8d6389`
        FOREIGN KEY (`fairway_id`)
        REFERENCES `fairway` (`id`),
    CONSTRAINT `round_fairway_fk_97a1b7`
        FOREIGN KEY (`player_id`)
        REFERENCES `player` (`id`)
) ENGINE=InnoDB;

# This restores the fkey checks, after having unset them earlier
SET FOREIGN_KEY_CHECKS = 1;
