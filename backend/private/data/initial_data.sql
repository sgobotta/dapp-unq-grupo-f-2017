
--
-- Current Database: `morfiya`
--

-- CREATE DATABASE IF NOT EXISTS `morfiya`;

--
-- Table structure for table `menu`
--


DROP TABLE IF EXISTS `ProviderBalance`;

CREATE TABLE `ProviderBalance`
(
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `providerId` VARCHAR(50) NOT NULL,
  `amount` DECIMAL(7,2) DEFAULT 0,
  `lastAccesed` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `providerId`)
);

--
-- Dumping data for table `ProviderBalance`
--

INSERT INTO `ProviderBalance` (providerId, amount, lastAccesed)
  VALUES ('bouffet@unq.edu.ar', 12000.00, CURRENT_TIMESTAMP),
         ('delivery@losgallegos.com.ar', 9000.00, CURRENT_TIMESTAMP),
         ('contacto@buenosairessushi.com.ar', 35000.00, CURRENT_TIMESTAMP);


DROP TABLE IF EXISTS `CustomerBalance`;

CREATE TABLE `CustomerBalance`
 (
   `id` INT(11) NOT NULL AUTO_INCREMENT,
   `customerId` BIGINT NOT NULL,
   `amount` DECIMAL(7,2) DEFAULT 0,
   `lastAccesed` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`, `customerId`)
 );

 --
 -- Dumping data for table `CustomerBalance`
 --

INSERT INTO `CustomerBalance` (customerId, amount, lastAccesed)
  VALUES (20343687878, 500.00, CURRENT_TIMESTAMP),
         (20382524765, 8000.00, CURRENT_TIMESTAMP),
         (20257137989, 300.00, CURRENT_TIMESTAMP);



