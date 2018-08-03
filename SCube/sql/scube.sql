-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2018 at 08:38 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `scube`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE IF NOT EXISTS `account` (
  `accountId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL COMMENT 'email',
  `passwordHash` varchar(70) NOT NULL,
  `companyId` int(11) NOT NULL,
  `accountType` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`accountId`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`accountId`, `username`, `passwordHash`, `companyId`, `accountType`, `name`) VALUES
(1, 'admin', '$2a$10$1FqAeDh3N0e1wewHjwJBJ.XCWOqj5iEtB27LsjxwlpHbyV2ZASsfW', 1, 'admin', 'Admin'),
(2, 'leo', '$2a$10$1FqAeDh3N0e1wewHjwJBJ.XCWOqj5iEtB27LsjxwlpHbyV2ZASsfW', 1, 'developer', 'Leo Tan'),
(4, 'test', '$2a$10$1FqAeDh3N0e1wewHjwJBJ.XCWOqj5iEtB27LsjxwlpHbyV2ZASsfW', 1, 'user', 'Report Generator'),
(5, 'manager', '$2a$10$1FqAeDh3N0e1wewHjwJBJ.XCWOqj5iEtB27LsjxwlpHbyV2ZASsfW', 1, 'manager', 'Manager'),
(6, 'user', '$2a$10$1FqAeDh3N0e1wewHjwJBJ.XCWOqj5iEtB27LsjxwlpHbyV2ZASsfW', 1, 'user', 'User'),
(7, 'company', '$2a$10$1FqAeDh3N0e1wewHjwJBJ.XCWOqj5iEtB27LsjxwlpHbyV2ZASsfW', 1, 'company', 'Company Account'),
(8, 'dion', '$2a$10$YwQxMJtBDbhFwj2v/uxnteTCeP2jkLeHscn7/r.o25FxNsepqfepW', 1, 'user', 'Dion');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE IF NOT EXISTS `company` (
  `companyId` int(11) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phoneNo` varchar(20) NOT NULL,
  `fax` varchar(20) DEFAULT NULL,
  `logoUrl` varchar(100) DEFAULT NULL,
  `pocId` int(11) DEFAULT NULL,
  `datasourceUrl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`companyId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`companyId`, `companyName`, `address`, `phoneNo`, `fax`, `logoUrl`, `pocId`, `datasourceUrl`) VALUES
(1, 'SCube Pte Ltd', 'SCube Address', '12345678', '12345678', 'http://logo.url', 1, 'test'),
(2, 'Singapore Management University', '81 Victoria St, Singapore 188065', '+65 6828 0100', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `component`
--

CREATE TABLE IF NOT EXISTS `component` (
  `templateId` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  PRIMARY KEY (`templateId`,`position`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `component`
--

INSERT INTO `component` (`templateId`, `position`, `type`, `x`, `y`, `height`, `width`) VALUES
(1, 0, 'line', 170, 104, 200, 300),
(1, 1, 'text', 578, 66, 50, 200),
(1, 2, 'bar', 117, 392, 182, 404),
(2, 0, 'line', 562, 376, 200, 300),
(2, 1, 'text', 681, 24, 50, 200),
(2, 2, 'bar', 117, 392, 182, 404),
(2, 3, 'bar', 262, 136, 200, 300),
(2, 4, 'text', 15, 19, 50, 200);

-- --------------------------------------------------------

--
-- Table structure for table `datasource`
--

CREATE TABLE `datasource` (
  `datasourceId` int(11) NOT NULL AUTO_INCREMENT,
  `companyId` int(11) NOT NULL,
  `datasourceUrl` varchar(500) NOT NULL,
  `datasourceName` varchar(50) NOT NULL,
  `remark` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`datasourceId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=5;

--
-- Dumping data for table `datasource`
--

INSERT INTO `datasource` (`datasourceId`, `companyId`, `datasourceUrl`, `datasourceName`, `remark`) VALUES
(1, 1, 'http://localhost:8084/Dummy_API/getFurnituresByCategory', 'Furnitures', 'Furniture data'),
(2, 1, 'http://localhost:8084/Dummy_API/getInformationByCategory', 'Information', 'Information data'),
(3, 1, 'http://localhost:8084/Dummy_API/getCustomerInformation', 'Customers', 'Customer data'),
(4, 1, 'http://localhost:8084/Dummy_API/getCustomerOrderLocation', 'Locations', 'Location data');

-- --------------------------------------------------------

--
-- Table structure for table `poc`
--

CREATE TABLE IF NOT EXISTS `poc` (
  `companyId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phoneNo` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `poc`
--

INSERT INTO `poc` (`companyId`, `name`, `phoneNo`, `email`) VALUES
(1, 'Leo Tan', '+65 9172 3563', 'leo@scube.com');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE IF NOT EXISTS `report` (
  `reportId` int(11) NOT NULL AUTO_INCREMENT,
  `reportName` varchar(50) NOT NULL,
  `generatedBy` int(11) NOT NULL,
  `createdOn` date NOT NULL,
  `reportUrl` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`reportId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `template`
--

CREATE TABLE `template` (
  `templateId` int(11) NOT NULL AUTO_INCREMENT,
  `companyId` int(11) NOT NULL,
  `templateName` varchar(50) NOT NULL,
  `createdBy` varchar(50) NOT NULL,
  `createdOn` date NOT NULL,
  `lastUpdatedOn` date NOT NULL,
  `size` varchar(2) NOT NULL,
  `layout` varchar(20) NOT NULL,
  PRIMARY KEY (`templateId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=2;

--
-- Dumping data for table `template`
--

INSERT INTO `template` (`templateId`, `companyId`, `templateName`, `createdBy`, `createdOn`, `lastUpdatedOn`, `size`, `layout`) VALUES
(1, 1, 'AA', 'admin', '2018-07-31', '2018-07-31', 'A4', 'Portrait');

-- --------------------------------------------------------

--
-- Table structure for table `textbox`
--

CREATE TABLE IF NOT EXISTS `textbox` (
  `templateId` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `text` varchar(1000) NOT NULL,
  PRIMARY KEY (`templateId`,`position`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `textbox`
--

INSERT INTO `textbox` (`templateId`, `position`, `text`) VALUES
(1, 1, '<p>HelloWorld!</p>'),
(2, 1, '<p>B<u><em>y</em></u><em>e!</em></p>'),
(2, 4, '<p>He<em><strong>ll</strong></em><strong>o!</strong></p>');


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
