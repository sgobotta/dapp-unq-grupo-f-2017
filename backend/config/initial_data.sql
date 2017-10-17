/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `morfiya`
--

-- CREATE DATABASE /*!32312 IF NOT EXISTS*/ `morfiya` /*!40100 DEFAULT CHARACTER SET latin1 */;
--
-- USE `morfiya`;

--
-- Table structure for table `menu`
--

-- DROP TABLE IF EXISTS `menu`;
--
-- CREATE TABLE `menu` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `name` varchar(10) DEFAULT NULL,
--   `description` varchar(45) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu`
--

-- LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
-- INSERT INTO `menu` VALUES (2016,'VANILLA ALMOND',8,8,8,1,68,2146435081),(2016,'VANILLA ALMOND',8,8,8,3,64,2146435081);


/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `store`
--

-- DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
-- CREATE TABLE `store` (
--   `id` int(11) NOT NULL,
--   `description` varchar(50) DEFAULT NULL,
--   `address1` varchar(128) DEFAULT NULL,
--   `city` varchar(45) DEFAULT NULL,
--   `postal` varchar(45) DEFAULT NULL,
--   `prov` varchar(45) DEFAULT NULL,
--   `manager_email` varchar(255) DEFAULT NULL,
--   `tax_rate` double DEFAULT NULL,
--   `tax_crv` double DEFAULT NULL,
--   `store_email` varchar(255) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
-- INSERT INTO `store` VALUES (3,'WEST HOLLYWOOD','8714 SANTA MONICA BLVD.','WEST HOLLYWOOD','90069','CA','wehosm@pressedjuicery.com',9,0.05,''),(4,'COOPER','860 S. LOS ANGELES ST.','LOS ANGELES','90014','CA','coopsm@pressedjuicery.com',9,0.05,'');
-- UNLOCK TABLES;
