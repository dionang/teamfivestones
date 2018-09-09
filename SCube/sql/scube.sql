-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2018 at 03:15 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scube`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `accountId` int(11) NOT NULL,
  `username` varchar(50) NOT NULL COMMENT 'email',
  `passwordHash` varchar(70) NOT NULL,
  `companyId` int(11) NOT NULL,
  `accountType` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Table structure for table `chart`
--

CREATE TABLE `chart` (
  `templateId` int(11) NOT NULL,
  `page` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `datasourceUrl` varchar(500) NOT NULL,
  `dataset` varchar(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `xAxis` varchar(20) NOT NULL,
  `yAxis` varchar(20) NOT NULL,
  `aggregate` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chart`
--

INSERT INTO `chart` (`templateId`, `page`, `position`, `datasourceUrl`, `dataset`, `title`, `xAxis`, `yAxis`, `aggregate`) VALUES
(5, 1, 0, 'http://localhost:8084/Dummy_API/getCustomerOrders', 'customerOrders', '', 'customerName', 'customerID', 'sum');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `companyId` int(11) NOT NULL,
  `companyName` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phoneNo` varchar(20) NOT NULL,
  `fax` varchar(20) DEFAULT NULL,
  `logoUrl` varchar(100) DEFAULT NULL,
  `pocId` int(11) DEFAULT NULL,
  `datasourceUrl` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `component` (
  `templateId` int(11) NOT NULL,
  `page` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `width` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `component`
--

INSERT INTO `component` (`templateId`, `page`, `position`, `type`, `x`, `y`, `height`, `width`) VALUES
(1, 1, 2, 'text', 202, 327, 120, 200),
(4, 1, 0, 'text', 198, 65, 120, 200),
(5, 1, 0, 'line', 0, 0, 250, 300);

-- --------------------------------------------------------

--
-- Table structure for table `dataset`
--

CREATE TABLE `dataset` (
  `datasetId` int(11) NOT NULL,
  `datasetName` varchar(50) NOT NULL,
  `path` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  `datasourceId` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dataset`
--

INSERT INTO `dataset` (`datasetId`, `datasetName`, `path`, `type`, `datasourceId`) VALUES
(102, 'asd', 'af/dash/detail/checkItemList', 'list', 118),
(101, 'ads', 'af/dash/detail/attendeeList', 'list', 117);

-- --------------------------------------------------------

--
-- Table structure for table `datasource`
--

CREATE TABLE `datasource` (
  `datasourceId` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  `datasourceUrl` varchar(500) NOT NULL,
  `datasourceName` varchar(50) NOT NULL,
  `remark` varchar(500) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `datasource`
--

INSERT INTO `datasource` (`datasourceId`, `companyId`, `datasourceUrl`, `datasourceName`, `remark`) VALUES
(4, 1, 'http://localhost:8084/Dummy_API/getCustomerOrderLocation', 'Locations', 'Location data'),
(117, 1, 'http://gronex.sg:8081/api/api?actionKey=getAppt&pfc=SG&cid=JWINE&uid=1525945167982&docId=APPT-0395', 'sd', ''),
(118, 1, 'http://gronex.sg:8081/api/api?actionKey=getAppt&pfc=SG&cid=JWINE&uid=1525945167982&docId=APPT-0395', 'dfg', '');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `templateId` int(11) NOT NULL,
  `page` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `imagePrefix` varchar(30) NOT NULL,
  `imageData` mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `listoption`
--

CREATE TABLE `listoption` (
  `listId` int(11) NOT NULL,
  `fieldName` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  `infoType` varchar(20) NOT NULL,
  `datasetId` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listoption`
--

INSERT INTO `listoption` (`listId`, `fieldName`, `type`, `infoType`, `datasetId`) VALUES
(39, 'balanceQt', 'string', 'categorical', 102),
(40, 'changeStageDat', 'string', 'categorical', 102),
(9, 'custProdI', 'string', 'categorical', 0),
(10, 'custProdNam', 'string', 'categorical', 0),
(38, 'allocatedItemLis', 'string', 'categorical', 101),
(36, 'accessMod', 'string', 'categorical', 101),
(37, 'acctCod', 'string', 'categorical', 101);

-- --------------------------------------------------------

--
-- Table structure for table `poc`
--

CREATE TABLE `poc` (
  `companyId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phoneNo` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL
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

CREATE TABLE `report` (
  `reportId` int(11) NOT NULL,
  `reportName` varchar(50) NOT NULL,
  `generatedBy` int(11) NOT NULL,
  `createdOn` date NOT NULL,
  `reportUrl` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `template`
--

CREATE TABLE `template` (
  `templateId` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  `templateName` varchar(50) NOT NULL,
  `createdBy` varchar(50) NOT NULL,
  `createdOn` date NOT NULL,
  `lastUpdatedOn` date NOT NULL,
  `size` varchar(2) NOT NULL,
  `layout` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `template`
--

INSERT INTO `template` (`templateId`, `companyId`, `templateName`, `createdBy`, `createdOn`, `lastUpdatedOn`, `size`, `layout`) VALUES
(1, 1, 'My First Report', 'manager', '2018-08-13', '2018-08-13', 'A4', 'Portrait'),
(4, 1, 'My First Reported Win', 'manager', '2018-08-13', '2018-08-13', 'A4', 'Portrait'),
(5, 1, 'Report Name', 'manager', '2018-08-10', '2018-08-13', 'A4', 'Portrait');

-- --------------------------------------------------------

--
-- Table structure for table `textbox`
--

CREATE TABLE `textbox` (
  `templateId` int(11) NOT NULL,
  `page` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `text` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `textbox`
--

INSERT INTO `textbox` (`templateId`, `page`, `position`, `text`) VALUES
(1, 1, 2, '<p>SDF</p>'),
(4, 1, 0, '<p>sad</p>');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`accountId`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `chart`
--
ALTER TABLE `chart`
  ADD PRIMARY KEY (`templateId`,`page`,`position`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`companyId`);

--
-- Indexes for table `component`
--
ALTER TABLE `component`
  ADD PRIMARY KEY (`templateId`,`page`,`position`);

--
-- Indexes for table `dataset`
--
ALTER TABLE `dataset`
  ADD PRIMARY KEY (`datasetId`);

--
-- Indexes for table `datasource`
--
ALTER TABLE `datasource`
  ADD PRIMARY KEY (`datasourceId`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`templateId`,`page`,`position`);

--
-- Indexes for table `listoption`
--
ALTER TABLE `listoption`
  ADD PRIMARY KEY (`listId`);

--
-- Indexes for table `poc`
--
ALTER TABLE `poc`
  ADD PRIMARY KEY (`companyId`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`reportId`);

--
-- Indexes for table `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`templateId`);

--
-- Indexes for table `textbox`
--
ALTER TABLE `textbox`
  ADD PRIMARY KEY (`templateId`,`page`,`position`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `accountId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `companyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `dataset`
--
ALTER TABLE `dataset`
  MODIFY `datasetId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;
--
-- AUTO_INCREMENT for table `datasource`
--
ALTER TABLE `datasource`
  MODIFY `datasourceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;
--
-- AUTO_INCREMENT for table `listoption`
--
ALTER TABLE `listoption`
  MODIFY `listId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `reportId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `template`
--
ALTER TABLE `template`
  MODIFY `templateId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
