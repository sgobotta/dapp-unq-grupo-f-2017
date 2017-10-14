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

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `morfiya` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `morfiya`;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (2016,'VANILLA ALMOND',8,8,8,1,68,2146435081),(2016,'VANILLA ALMOND',8,8,8,3,64,2146435081)


/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store` (
  `id` int(11) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `address1` varchar(128) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `postal` varchar(45) DEFAULT NULL,
  `prov` varchar(45) DEFAULT NULL,
  `manager_email` varchar(255) DEFAULT NULL,
  `tax_rate` double DEFAULT NULL,
  `tax_crv` double DEFAULT NULL,
  `store_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (3,'WEST HOLLYWOOD','8714 SANTA MONICA BLVD.','WEST HOLLYWOOD','90069','CA','wehosm@pressedjuicery.com',9,0.05,''),(4,'COOPER','860 S. LOS ANGELES ST.','LOS ANGELES','90014','CA','coopsm@pressedjuicery.com',9,0.05,''),(6,'STUDIO CITY','13033B VENTURA BLVD.','STUDIO CITY','91604','CA','studsm@pressedjuicery.com',9,0.05,''),(7,'WESTWOOD','10878 KINROSS AVENUE','LOS ANGELES','90024','CA','wwodsm@pressedjuicery.com',9,0.05,''),(8,'NOE VALLEY','3901 24TH STREET','SAN FRANCISCO','94114','CA','noevsm@pressedjuicery.com',8.75,0.05,''),(9,'ONE MARKET','1 MARKET STREET ','SAN FRANCISCO','94105','CA','febdsm@pressedjuicery.com',8.75,0.05,''),(10,'BEVERLY HILLS','430 BEDFORD DRIVE','BEVERLY HILLS','90210','CA','behism@pressedjuicery.com',9,0.05,''),(11,'MONTECITO','1024 COAST VILLAGE RD #C','MONTECITO','93108','CA','montsm@pressedjuicery.com',8,0.05,''),(12,'MARIN ','2205 LARKSPUR LANDING CIRCLE','LARKSPUR','94939','CA','marism@pressedjuicery.com',8.5,0.05,''),(13,'UNION STREET','2162A UNION STREET ','SAN FRANCISCO','94123','CA','uniosm@pressedjuicery.com',9,0.05,''),(16,'LARCHMONT','201 N. LARCHMONT BLVD.','LOS ANGELES','90004','CA','lrmtsm@pressedjuicery.com',9,0.05,''),(17,'MANHATTAN BEACH','310 MANHATTAN BEACH BLVD.','MANHATTAN BEACH','90266','CA','mbeasm@pressedjuicery.com',9,0.05,''),(18,'PALO ALTO ','660 STANFORD SHOPPING CENTER #','PALO ALTO','94304','CA','palosm@pressedjuicery.com',9,0.05,''),(19,'WESTFIELD SFC','845 MARKET ST. SUITEFE13B','SAN FRANCISCO','94103','CA','sfccsm@pressedjuicery.com',8.75,0.05,''),(20,'PASADENA','59 E COLORADO BLVD.','PASADENA','91105','CA','pasasm@pressedjuicery.com',9,0.05,''),(21,'SANTA MONICA ','2409 MAIN ST.','SANTA MONICA','90405','CA','samosm@pressedjuicery.com',9.5,0.05,'samostore@pressedjuicery.com'),(22,'PASEO NUEVO','305 PASEO NUEVO','SANTA BARBARA','93101','CA','panusm@pressedjuicery.com',8,0.05,''),(23,'WESTCLIFF','1116 IRVINE AVE','NEWPORT BEACH','92660','CA','wclfsm@pressedjuicery.com',8,0.05,''),(24,'AMERICANA ','132 CARUSO ST.','GLENDALE','91210','CA','amersm@pressedjuicery.com',9,0.05,''),(25,'FIRST STREET ','75 FIRST STREET','SAN FRANCISCO','94105','CA','fistsm@pressedjuicery.com',9,0.05,''),(26,'FLS1','','','','','',9,0.05,''),(27,'FASHION ISLAND','1181 NEWPORT CENTER DR.','NEWPORT BEACH','92660','CA','fashsm@pressedjuicery.com',8,0.05,''),(28,'SANTANA ROW','1035 OLIN AVENUE','SAN JOSE','95128','CA','sarosm@pressedjuicery.com',8.75,0.05,''),(29,'FOUNTAINS','1182 ROSEVILLE PARKWAY','ROSEVILLE','95678','CA','fontsm@pressedjuicery.com',7.5,0.05,''),(30,'HOLLYWOOD','6201 HOLLYWOOD BLVD. STE#B','LOS ANGELES','90028','CA','howosm@pressedjuicery.com',9,0.05,''),(31,'WESTLAKE LA','2728 TOWNSGATE RD STE4','THOUSAND OAKS','91361','CA','wevism@pressedjuicery.com',7.5,0.05,''),(32,'TIVOLI','410 S. RAMPART BLVD. #135','LAS VEGAS','89118','CA','tivosm@pressedjuicery.com',8.25,0,''),(33,'SPECTRUM','808 SPECTRUM CENTER DR.','IRVINE','92618','CA','specsm@pressedjuicery.com',8,0.05,''),(35,'ARIA ','3730 LAS VEGAS BLVD.','SOUTH LAS VEGAS','89158','NV','ariasm@pressedjuicery.com',8.25,0,''),(36,'UTC ','4545 LA JOLLAVILLAGE DRIVE','SAN DIEGO','92122','CA','utsdsm@pressedjuicery.com',8,0.05,''),(37,'WALNUT CREEK','1179A LOCUST ST.','WALNUT CREEK','94596','CA','wnutsm@pressedjuicery.com',8.5,0.05,''),(38,'TOPANGA','WESTFIELD TOPANGA','CANOGA PARK','91303','CA','topcsm@pressedjuicery.com',9,0.05,''),(39,'LAFAYETTE ','329 LAFAYETTE STREET','NEW YORK','10012','NY','lafasm@pressedjuicery.com',8.875,0,''),(40,'NYM1','','','','','',8.875,0,''),(41,'NYM2','','','','','',8.875,0,''),(42,'GARD','1 GARDEN STATE PLAZA','PARAMUS','07652','NJ','gardsm@pressedjuicery.com',7,0,''),(43,'LEXINGTON UPPER','1240 LEXINGTON AVE. ','NEW YORK','10028','NY','lexusm@pressedjuicery.com',8.875,0,''),(44,'COLUMBIA  ','2857 BROADWAY','NEW YORK','10019','NY','colcsm@pressedjuicery.com',8.75,0,''),(45,'COLUMBIA TURNSTYLE','1000 8th AVE  SUITE 24','NEW YORK','10019','NY','coltsm@pressedjuicery.com',9,0,''),(46,'THE GROVE','101 S. THE GROVE DR.','LOS ANGELES','90036','CA','grovsm@pressedjuicery.com',9,0.05,''),(47,'ALA MOANA ','1450 ALA MOANA BLVD. # 1375','HONOLULU','96814','HI','almosm@pressedjuicery.com',4.71,0.06,''),(48,'MERCER','103 MERCER ST.','NEW YORK','10012','NY','mercsm@pressedjuicery.com',8.875,0,''),(49,'BRENTWOOD 2','11711 GORHAM AVE.','LOS ANGELES','90049','CA','',9,0.05,''),(50,'FASHION SHOW','3200 Las Vegas Blvd. South','Las Vegas','89109','NV','',8.25,0,''),(51,'LEXINGTON LOWER','369 Lexington Ave.','New York','10016','NY','',8.875,0,''),(52,'PARK AVENUE','','','','','',8.875,0,''),(53,'THE POINT','','','','','',9,0.05,''),(54,'BUNKER HILL','','','','','',9,0.05,''),(55,'MAIDEN LANE','','','','','',8.875,0,''),(56,'AVANTI','','','','','',9,0.05,''),(57,'FORUM','','','','','',8,0.05,''),(58,'PLAZA DE LA PAZ','','','','','',9,0.05,''),(59,'DEL AMO','','','','','',9,0.05,''),(60,'WESTLAKE SEATTLE ','','','','','',9.6,0,''),(61,'ABBOT KINNEY ','','','','','',9,0.05,''),(62,'FULTON CENTER','','','','','',8.875,0,''),(63,'QUEEN ANNE ','','','','','',9,0,''),(64,'DANVILLE','','','','','',9,0.05,''),(65,'BELLEVUE','','','','','',9,0,''),(66,'CAPITOL HILL ','','','','','',9,0,''),(67,'MONTICELLO ','','','','','',9,0.05,''),(68,'WILLIAMSBURG','','','','','',9,0,''),(69,'UNION SQUARE','','','','','',9,0,''),(70,'NEWBURY','','','','','',9,0,''),(71,'HARVARD SQUARE ','','','','','',9,0,''),(72,'WELLESLEY','','','','','',9,0.05,''),(73,'LOS GATOS','','','','','',9,0.05,''),(74,'CUPPERTINO','','','','','',9,0.05,''),(75,'CRYSTAL COVE','','','','','',9,0.05,''),(76,'CENTURY CITY','','','','','',9,0.05,'');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
