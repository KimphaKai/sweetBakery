-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 15, 2022 at 03:53 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sweetybakery`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartlist`
--

CREATE TABLE `cartlist` (
  `memberId` int(8) NOT NULL,
  `productId` int(5) NOT NULL,
  `productNum` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `classimg`
--

CREATE TABLE `classimg` (
  `classImgId` int(5) NOT NULL,
  `classId` int(3) NOT NULL,
  `imgPath` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `classlist`
--

CREATE TABLE `classlist` (
  `classId` int(3) NOT NULL,
  `classTitle` varchar(20) NOT NULL,
  `classInfo` varchar(1000) NOT NULL,
  `classPrice` int(4) NOT NULL,
  `classDuration` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `classreservation`
--

CREATE TABLE `classreservation` (
  `reservationId` int(10) NOT NULL,
  `memberId` int(8) NOT NULL,
  `classTimeId` int(8) NOT NULL,
  `guestNum` int(2) NOT NULL,
  `guestName` varchar(10) NOT NULL,
  `guestPhone` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `classtime`
--

CREATE TABLE `classtime` (
  `classTimeId` int(8) NOT NULL,
  `classId` int(3) NOT NULL,
  `startDate` date NOT NULL,
  `startTime` time NOT NULL,
  `totalPeople` int(2) NOT NULL,
  `remain` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `memberId` int(8) NOT NULL,
  `email` varchar(100) NOT NULL,
  `userPassword` varchar(100) NOT NULL,
  `userName` varchar(10) NOT NULL,
  `userPhone` char(10) NOT NULL,
  `userBirthday` date NOT NULL,
  `fb` int(100) NOT NULL,
  `google` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `orderId` int(12) NOT NULL,
  `productId` int(5) NOT NULL,
  `productNum` int(3) NOT NULL,
  `productPrice` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `orderlist`
--

CREATE TABLE `orderlist` (
  `orderId` int(12) NOT NULL,
  `memberId` int(8) NOT NULL,
  `orderDate` date NOT NULL,
  `paymementStatus` varchar(4) NOT NULL,
  `pickupDate` date NOT NULL,
  `orderStatus` varchar(4) NOT NULL,
  `buyerPhone` char(10) NOT NULL,
  `buyerName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productId` int(5) NOT NULL,
  `categoryId` int(3) NOT NULL,
  `sizeId` int(3) NOT NULL,
  `productTitle` varchar(100) NOT NULL,
  `productInfo` varchar(1000) NOT NULL,
  `productPrice` int(4) NOT NULL,
  `ingredient` varchar(500) NOT NULL,
  `productStatus` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `productcategory`
--

CREATE TABLE `productcategory` (
  `categoryId` int(3) NOT NULL,
  `categoryName` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productcategory`
--

INSERT INTO `productcategory` (`categoryId`, `categoryName`) VALUES
(1, '圓形蛋糕'),
(2, '杯子蛋糕');

-- --------------------------------------------------------

--
-- Table structure for table `productimg`
--

CREATE TABLE `productimg` (
  `productId` int(5) NOT NULL,
  `imgPath` varchar(256) NOT NULL,
  `productImgId` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `productsize`
--

CREATE TABLE `productsize` (
  `sizeId` int(3) NOT NULL,
  `sizeName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productsize`
--

INSERT INTO `productsize` (`sizeId`, `sizeName`) VALUES
(1, '一盒4入'),
(2, '一盒6入'),
(3, '一盒8入'),
(4, '一盒12入'),
(5, '一盒20入'),
(6, '一盒30入'),
(7, '6吋'),
(8, '8吋'),
(9, '10吋');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cartlist`
--
ALTER TABLE `cartlist`
  ADD PRIMARY KEY (`memberId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `classimg`
--
ALTER TABLE `classimg`
  ADD PRIMARY KEY (`classImgId`),
  ADD KEY `classId` (`classId`);

--
-- Indexes for table `classlist`
--
ALTER TABLE `classlist`
  ADD PRIMARY KEY (`classId`);

--
-- Indexes for table `classreservation`
--
ALTER TABLE `classreservation`
  ADD PRIMARY KEY (`reservationId`),
  ADD KEY `memberId` (`memberId`),
  ADD KEY `classTimeId` (`classTimeId`);

--
-- Indexes for table `classtime`
--
ALTER TABLE `classtime`
  ADD PRIMARY KEY (`classTimeId`),
  ADD KEY `classId` (`classId`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`memberId`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`orderId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `orderlist`
--
ALTER TABLE `orderlist`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `memberId` (`memberId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `sizeId` (`sizeId`);

--
-- Indexes for table `productcategory`
--
ALTER TABLE `productcategory`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `productimg`
--
ALTER TABLE `productimg`
  ADD PRIMARY KEY (`productImgId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `productsize`
--
ALTER TABLE `productsize`
  ADD PRIMARY KEY (`sizeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classimg`
--
ALTER TABLE `classimg`
  MODIFY `classImgId` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `classlist`
--
ALTER TABLE `classlist`
  MODIFY `classId` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `classreservation`
--
ALTER TABLE `classreservation`
  MODIFY `reservationId` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `classtime`
--
ALTER TABLE `classtime`
  MODIFY `classTimeId` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `memberId` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productcategory`
--
ALTER TABLE `productcategory`
  MODIFY `categoryId` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `productsize`
--
ALTER TABLE `productsize`
  MODIFY `sizeId` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartlist`
--
ALTER TABLE `cartlist`
  ADD CONSTRAINT `cartlist_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `cartlist_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`);

--
-- Constraints for table `classimg`
--
ALTER TABLE `classimg`
  ADD CONSTRAINT `classimg_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classlist` (`classId`);

--
-- Constraints for table `classreservation`
--
ALTER TABLE `classreservation`
  ADD CONSTRAINT `classreservation_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `classreservation_ibfk_2` FOREIGN KEY (`classTimeId`) REFERENCES `classtime` (`classTimeId`);

--
-- Constraints for table `classtime`
--
ALTER TABLE `classtime`
  ADD CONSTRAINT `classtime_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classlist` (`classId`);

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orderlist` (`orderId`),
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`);

--
-- Constraints for table `orderlist`
--
ALTER TABLE `orderlist`
  ADD CONSTRAINT `orderlist_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `productcategory` (`categoryId`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`sizeId`) REFERENCES `productsize` (`sizeId`);

--
-- Constraints for table `productimg`
--
ALTER TABLE `productimg`
  ADD CONSTRAINT `productimg_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
