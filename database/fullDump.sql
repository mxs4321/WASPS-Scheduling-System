CREATE DATABASE  IF NOT EXISTS `wasps` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `wasps`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: wasps
-- ------------------------------------------------------
-- Server version	5.7.15-log

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
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointment` (
  `apptID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `driverID` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `apptStart` datetime DEFAULT NULL,
  `apptEnd` datetime DEFAULT NULL,
  `apptLocation` varchar(300) DEFAULT NULL,
  `numMiles` decimal(5,3) DEFAULT NULL,
  `totalHours` decimal(3,2) DEFAULT NULL,
  `donation` decimal(10,2) DEFAULT NULL,
  `pickupLocation` varchar(300) DEFAULT NULL,
  `pickupTime` datetime DEFAULT NULL,
  `wheelchairVan` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`apptID`),
  KEY `fk_Appointment_Driver1_idx` (`driverID`),
  KEY `fk_Appointment_User1_idx` (`userID`),
  CONSTRAINT `fk_Appointment_Driver1` FOREIGN KEY (`driverID`) REFERENCES `driver` (`driverID`) ON UPDATE CASCADE,
  CONSTRAINT `fk_Appointment_User1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (3,1,2,1,'2018-01-29 13:30:00','2018-01-29 14:30:00','1 Lomb Memorial Dr, Rochester, NY 14623, USA',50.000,3.00,NULL,'4912 Cherry Ridge Drive Rochester NY','2018-01-29 13:15:00',0),(4,5,3,1,'2018-01-29 17:45:00','2018-01-29 18:15:00','2904 Caldwell Road Rochester NY',25.000,1.00,10.50,'606 Walt Nuzum Farm Road Rochester NY','2018-01-29 17:35:00',1),(5,1,3,0,'2018-02-05 07:45:00','2018-02-05 09:00:00','3898 Whiteman Street Rochester NY',30.000,1.00,5.00,'143 Amethyst Drive Rochester NY','2018-02-05 08:00:00',0);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointmentusers`
--

DROP TABLE IF EXISTS `appointmentusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointmentusers` (
  `appointmentUsersID` int(11) NOT NULL AUTO_INCREMENT,
  `apptID` int(11) NOT NULL,
  `endUserID` int(11) NOT NULL,
  PRIMARY KEY (`appointmentUsersID`),
  KEY `fk_AppointmentUsers_Appointment1_idx` (`apptID`),
  KEY `fk_AppointmentUsers_EndUser1_idx` (`endUserID`),
  CONSTRAINT `fk_AppointmentUsers_Appointment1` FOREIGN KEY (`apptID`) REFERENCES `appointment` (`apptID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_AppointmentUsers_EndUser1` FOREIGN KEY (`endUserID`) REFERENCES `enduser` (`endUserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointmentusers`
--

LOCK TABLES `appointmentusers` WRITE;
/*!40000 ALTER TABLE `appointmentusers` DISABLE KEYS */;
INSERT INTO `appointmentusers` VALUES (1,3,1),(2,4,2),(3,5,1);
/*!40000 ALTER TABLE `appointmentusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driver` (
  `driverID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `requestStatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`driverID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES (1,'jack','smith','0123-456-789','jack@gmail.com',0),(2,'pepe','maximus','987-6543-210','pepe@live.com',1),(3,'julia','samson','147-258-3690','jsamson@gmail.com',1);
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driveravailability`
--

DROP TABLE IF EXISTS `driveravailability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driveravailability` (
  `driverAvailabilityID` int(11) NOT NULL AUTO_INCREMENT,
  `driverID` int(11) NOT NULL,
  `availableStart` datetime DEFAULT NULL,
  `availableEnd` datetime DEFAULT NULL,
  PRIMARY KEY (`driverAvailabilityID`),
  KEY `fk_Driver_Availability_Driver1_idx` (`driverID`),
  CONSTRAINT `fk_Driver_Availability_Driver1` FOREIGN KEY (`driverID`) REFERENCES `driver` (`driverID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driveravailability`
--

LOCK TABLES `driveravailability` WRITE;
/*!40000 ALTER TABLE `driveravailability` DISABLE KEYS */;
INSERT INTO `driveravailability` VALUES (1,2,'2018-01-29 12:30:00','2018-01-29 16:00:00'),(2,2,'2018-02-01 08:00:00','2018-02-01 12:00:00'),(3,3,'2018-01-29 17:15:00','2018-01-29 20:15:00'),(4,3,'2018-02-05 07:00:00','2018-02-05 10:45:00');
/*!40000 ALTER TABLE `driveravailability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enduser`
--

DROP TABLE IF EXISTS `enduser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enduser` (
  `endUserID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`endUserID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enduser`
--

LOCK TABLES `enduser` WRITE;
/*!40000 ALTER TABLE `enduser` DISABLE KEYS */;
INSERT INTO `enduser` VALUES (1,'jane','doe','0123-456-789','janedoe@gmail.com'),(2,'jack','jacky','456-789-1230','jackyjack@live.com');
/*!40000 ALTER TABLE `enduser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userRole` enum('user','dispatcher','admin') NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john123','123john','user'),(2,'jack123','123jack','dispatcher'),(3,'admin','123admin','admin'),(5,'susan','123susan','user'),(6,'dispatcher','123dispatcher','dispatcher');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'wasps'
--

--
-- Dumping routines for database 'wasps'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-27 12:56:33
