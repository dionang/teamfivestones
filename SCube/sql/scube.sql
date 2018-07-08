-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2018 at 03:00 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

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
(8, 'dion', '$2a$10$YwQxMJtBDbhFwj2v/uxnteTCeP2jkLeHscn7/r.o25FxNsepqfepW', 1, 'user', 'Dion'),
(22, 'P@ssw0rd', '$2a$10$shXMkrPYZzHqtFvS93S1zufLhZ4ZuFtLzfl8FuCQqV9Gmt7i6nkUW', 1, 'developer', 'P@ssw0rd'),
(23, 'P@ssw0rd2', '$2a$10$09.0H0/CUEgt74OToX6aNOhy/VynU7VcUsyPfJfvwOrlGA.WX3F1S', 1, 'manager', 'P@ssw0rd2');

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
  `componentId` varchar(20) NOT NULL,
  `templateId` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `page` int(11) NOT NULL,
  `x` double NOT NULL,
  `y` double NOT NULL,
  `height` double NOT NULL,
  `width` double NOT NULL,
  PRIMARY KEY (`componentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `component`
--

INSERT INTO `component` (`componentId`, `templateId`, `type`, `page`, `x`, `y`, `height`, `width`) VALUES
('barChartBox8585', 1, 'barChartBox', 1, 0, 115, 193, 503),
('lineChartBox8447', 1, 'lineChartBox', 1, 0, 376, 127, 588),
('pieChartBox3928', 1, 'pieChartBox', 1, 661, 107, 267, 402),
('textbox9767', 1, 'textbox', 1, 114, 34, 50, 150);

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

CREATE TABLE IF NOT EXISTS `template` (
  `templateId` int(11) NOT NULL AUTO_INCREMENT,
  `templateName` varchar(50) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` date NOT NULL,
  PRIMARY KEY (`templateId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `template`
--

INSERT INTO `template` (`templateId`, `templateName`, `createdBy`, `createdOn`) VALUES
(1, 'My First Report Template', 5, '2018-08-07');

-- --------------------------------------------------------

--
-- Table structure for table `textbox`
--

CREATE TABLE IF NOT EXISTS `textbox` (
  `componentId` varchar(20) NOT NULL,
  `templateId` int(11) NOT NULL,
  `text` varchar(500) NOT NULL,
  PRIMARY KEY (`componentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `textbox`
--

INSERT INTO `textbox` (`componentId`, `templateId`, `text`) VALUES
('textbox9767', 1, 'My Personal Report');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
