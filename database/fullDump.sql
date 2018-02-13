CREATE DATABASE  IF NOT EXISTS `wasps` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `wasps`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: wasps
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
-- Table structure for table `availability`
--

DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `availability` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '	',
  `start` time NOT NULL,
  `end` time NOT NULL,
  `days` set('Sun','Mon','Tue','Wed','Thu','Fri','Sat') NOT NULL,
  `driverID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_DriverAvailability_User1_idx` (`driverID`),
  CONSTRAINT `fk_DriverAvailability_User1` FOREIGN KEY (`driverID`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
INSERT INTO `availability` VALUES (1,'07:00:00','04:00:00','Mon,Tue,Wed,Thu,Fri',3),(2,'07:00:00','04:00:00','Sun,Sat',5),(3,'07:30:00','04:00:00','Mon,Tue,Wed,Thu,Fri',5);
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `availabilityexclusion`
--

DROP TABLE IF EXISTS `availabilityexclusion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `availabilityexclusion` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '	',
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `driverID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_DriverAvailabilityException_User1_idx` (`driverID`),
  CONSTRAINT `fk_DriverAvailabilityException_User1` FOREIGN KEY (`driverID`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availabilityexclusion`
--

LOCK TABLES `availabilityexclusion` WRITE;
/*!40000 ALTER TABLE `availabilityexclusion` DISABLE KEYS */;
INSERT INTO `availabilityexclusion` VALUES (1,'2018-04-20 00:00:00','2018-04-21 00:00:00',3),(3,'2018-04-20 00:00:11','2018-04-21 00:00:00',3);
/*!40000 ALTER TABLE `availabilityexclusion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(2048) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` int(11) NOT NULL,
  `rideID` int(11) NOT NULL,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_Comments_User1_idx` (`userID`),
  KEY `fk_Comments_Ride1_idx` (`rideID`),
  CONSTRAINT `fk_Comments_Ride1` FOREIGN KEY (`rideID`) REFERENCES `ride` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comments_User1` FOREIGN KEY (`userID`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'This is a comment by admin on ride 1','2018-02-01 08:01:00',1,1,'2018-02-05 14:51:09'),(2,'This is a comment by dispatcher on ride 1','2018-02-01 08:02:00',2,1,'2018-02-05 14:51:09'),(3,'This is a comment by admin on ride 3','2018-02-01 08:03:00',1,3,'2018-02-05 14:51:09');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` enum('sms','email') DEFAULT NULL,
  `message` varchar(2048) DEFAULT NULL,
  `userID` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_SentMessagesLog_User1_idx` (`userID`),
  CONSTRAINT `fk_SentMessagesLog_User1` FOREIGN KEY (`userID`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'sms','Would you like to drive blah blah blah',3,'2018-02-01 08:01:00'),(3,'sms','test test test',3,'2018-02-07 19:55:04');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ride`
--

DROP TABLE IF EXISTS `ride`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ride` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `passengerID` int(11) NOT NULL,
  `driverID` int(11) DEFAULT NULL,
  `apptStart` datetime NOT NULL,
  `apptEnd` datetime NOT NULL,
  `numMiles` decimal(5,3) DEFAULT NULL,
  `totalMinutes` int(11) DEFAULT NULL,
  `pickupTime` datetime NOT NULL,
  `wheelchairVan` tinyint(1) NOT NULL,
  `status` enum('Unverified','Pending','Scheduled','Complete','Canceled') NOT NULL DEFAULT 'Unverified',
  `pickupStreetAddress` varchar(255) NOT NULL,
  `pickupCity` varchar(100) NOT NULL,
  `apptStreetAddress` varchar(255) NOT NULL,
  `apptCity` varchar(100) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_Ride_Driver` (`driverID`),
  KEY `fk_Ride_User` (`passengerID`),
  CONSTRAINT `fk_Ride_Driver` FOREIGN KEY (`driverID`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ride_User` FOREIGN KEY (`passengerID`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ride`
--

LOCK TABLES `ride` WRITE;
/*!40000 ALTER TABLE `ride` DISABLE KEYS */;
INSERT INTO `ride` VALUES (1,4,3,'2018-04-23 09:00:00','2018-04-23 10:00:00',NULL,NULL,'2018-04-23 08:30:00',0,'Scheduled','855 publishers parkway','Webster','45 Webster Commons Blvd #201','Webster','2018-02-01 08:00:00','2018-02-05 14:51:08'),(2,4,3,'2018-04-25 09:00:00','2018-04-25 10:00:00',NULL,NULL,'2018-04-25 08:30:00',0,'Pending','746 Newberry Ln','Webster','55 North Ave B','Webster','2018-02-01 08:00:00','2018-02-05 14:51:08'),(3,4,NULL,'2018-04-24 09:00:00','2018-04-24 10:00:00',NULL,NULL,'2018-04-24 08:30:00',0,'Unverified','746 Newberry Ln','Webster','55 North Ave B','Webster','2018-02-01 08:00:00','2018-02-05 14:51:08'),(4,4,3,'2018-04-27 09:00:00','2018-04-27 10:00:00',7.000,120,'2018-04-27 08:30:00',0,'Complete','855 publishers parkway','Webster','45 Webster Commons Blvd #201','Webster','2018-02-01 08:00:00','2018-02-05 14:51:08'),(5,4,5,'2018-04-22 09:00:00','2018-04-22 10:00:00',NULL,NULL,'2018-04-22 08:30:00',0,'Scheduled','746 Newberry Ln','Webster','55 North Ave B','Webster','2018-02-01 08:00:00','2018-02-05 14:51:08'),(6,4,5,'2018-04-22 09:00:00','2018-04-22 10:00:00',NULL,NULL,'2018-04-22 08:30:00',0,'Canceled','855 publishers parkway','Webster','45 Webster Commons Blvd #201','Webster','2018-02-01 08:00:00','2018-02-05 14:51:08'),(7,4,NULL,'2018-04-22 11:00:00','2018-04-22 11:30:00',NULL,NULL,'2018-04-22 10:30:00',0,'Unverified','746 Newberry Ln','Webster','55 North Ave B','Webster','2018-02-01 08:00:00','2018-02-05 14:51:08'),(8,4,7,'2018-04-20 09:00:00','2018-04-20 10:00:00',NULL,NULL,'2018-04-20 08:30:00',0,'Unverified','855 publishers parkway','Webster','45 Webster Commons Blvd #201','Webster','2018-02-01 08:00:00','2018-02-05 14:51:08');
/*!40000 ALTER TABLE `ride` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(100) NOT NULL,
  `role` enum('admin','driver','dispatcher','passenger') NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `registered` datetime NOT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `wantsSMS` tinyint(1) DEFAULT NULL,
  `wantsEmail` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userID_UNIQUE` (`id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `Email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'$2b$10$FAwacfpZVEEUKcbA1Hgcou.SQrtClJxUI4itEjACONP/d71kXl6YK','admin','Super','Admin','5852167829','admin@websterwasps.com','2018-01-01 00:00:00','2018-03-01 00:00:00',1,1),(2,'$2b$10$SqfJMr261d3VBpvVZ1l8PeILqBn.E88Eghfq8BwDBwSn3csf5xUpy','dispatcher','Main','Dispatcher','5852167819','dispatcher@websterwasps.com','2018-01-01 00:00:00','2018-03-01 00:00:00',1,1),(3,'$2b$10$6AnBy.iXxh2r9keggcxAZO1TpaYLAE7l2JXWUfHYIwze5CVe1L31C','driver','Main','Driver','2035254835','driver@websterwasps.com','2018-01-01 00:00:00','2018-03-01 00:00:00',1,1),(4,'$2b$10$x5/o./v8KWXgnrbxYOKWIOBKj0kxVWfjUcIiHNPEcYseJXr16Ybqq','passenger','Main','Passenger','2435254235','passanger@websterwasps.com','2018-01-01 00:00:00','2018-03-01 00:00:00',1,1),(5,'$2b$10$6AnBy.iXxh2r9keggcxAZO1TpaYLAE7l2JXWUfHYIwze5CVe1L31C','driver','Weekend','Driver','5852167818','weekendDriver@websterwasps.com','2018-01-01 00:00:00','2018-03-01 00:00:00',1,1),(6,'$2b$10$x5/o./v8KWXgnrbxYOKWIOBKj0kxVWfjUcIiHNPEcYseJXr16Ybqq','passenger','WannaBe','Driver','2432253835','wannabeDriver@websterwasps.com','2018-01-01 00:00:00','2018-03-01 00:00:00',1,1),(7,'$2b$10$6AnBy.iXxh2r9keggcxAZO1TpaYLAE7l2JXWUfHYIwze5CVe1L31C','driver','Weekday','Driver','5852167813','weekdayDriver@websterwasps.com','2018-01-01 00:00:00','2018-03-01 00:00:00',1,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteerrequest`
--

DROP TABLE IF EXISTS `volunteerrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `volunteerrequest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime DEFAULT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_VolunteerRequest_User1_idx` (`userID`),
  CONSTRAINT `fk_VolunteerRequest_User1` FOREIGN KEY (`userID`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteerrequest`
--

LOCK TABLES `volunteerrequest` WRITE;
/*!40000 ALTER TABLE `volunteerrequest` DISABLE KEYS */;
INSERT INTO `volunteerrequest` VALUES (1,'2018-02-01 08:01:00',6);
/*!40000 ALTER TABLE `volunteerrequest` ENABLE KEYS */;
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

-- Dump completed on 2018-02-11 16:50:38
