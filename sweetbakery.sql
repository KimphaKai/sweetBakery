-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 25, 2022 at 04:00 AM
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
-- Database: `sweetbakery`
--

-- --------------------------------------------------------

--
-- Table structure for table `cartlist`
--

CREATE TABLE `cartlist` (
  `memberId` varchar(50) NOT NULL,
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

--
-- Dumping data for table `classimg`
--

INSERT INTO `classimg` (`classImgId`, `classId`, `imgPath`) VALUES
(1, 1, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/bear%201-1.jpg?alt=media&token=f58c1fae-1765-4e57-8e20-cf68fa18924c'),
(2, 1, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/bear%201-2.jpg?alt=media&token=9c7e18f0-1127-45cb-b106-ff1745b95a3b'),
(3, 1, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/bear%201-3.jpg?alt=media&token=513ea7c0-de1d-4252-a5b9-d789e437c619');

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

--
-- Dumping data for table `classlist`
--

INSERT INTO `classlist` (`classId`, `classTitle`, `classInfo`, `classPrice`, `classDuration`) VALUES
(1, '熊熊蛋糕', '巧克力杯子蛋糕 (Chocolate Cupcake)，是派對聚會、戶外野餐、下午茶點心的好選擇。\r\n法國綠色山丘諾曼第無鹽發酵奶油跟法芙娜巧克力粉，做出香濃可口的巧克力杯子蛋糕，甜而不膩的質地，好吃到真的會上癮。', 360, 2.5),
(2, '草莓蛋糕', '草莓蛋糕，是派對聚會、戶外野餐、下午茶點心的好選擇。\r\n法國綠色山丘諾曼第無鹽發酵奶油跟法芙娜巧克力粉，做出香濃可口的巧克力杯子蛋糕，甜而不膩的質地，好吃到真的會上癮。', 450, 2);

-- --------------------------------------------------------

--
-- Table structure for table `classreservation`
--

CREATE TABLE `classreservation` (
  `reservationId` int(10) NOT NULL,
  `memberId` varchar(50) NOT NULL,
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

--
-- Dumping data for table `classtime`
--

INSERT INTO `classtime` (`classTimeId`, `classId`, `startDate`, `startTime`, `totalPeople`, `remain`) VALUES
(1, 1, '2022-02-02', '10:00:00', 15, 10),
(2, 2, '2022-02-02', '13:30:00', 15, 10),
(3, 1, '2022-02-15', '15:00:00', 10, 10),
(4, 1, '2022-02-28', '10:00:00', 15, 0),
(5, 1, '2022-03-01', '10:00:00', 12, 10),
(6, 1, '2022-03-20', '10:00:00', 12, 0),
(7, 1, '2022-03-18', '10:30:00', 20, 2);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `memberId` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `userPassword` varchar(100) NOT NULL,
  `userName` varchar(10) NOT NULL,
  `userPhone` char(10) NOT NULL,
  `userBirthday` date NOT NULL,
  `fb` varchar(50) NOT NULL,
  `google` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`memberId`, `email`, `userPassword`, `userName`, `userPhone`, `userBirthday`, `fb`, `google`) VALUES
('dede', 'cosmo4956@gmail.com', '123456', '李慧婷', '', '1999-02-17', '', ''),
('hhhhfffcrcrc', 'hhl5778@gmail.com', '123456', '袁于晴', '0954254754', '1999-02-17', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `orderId` varchar(12) NOT NULL,
  `productId` int(5) NOT NULL,
  `productNum` int(3) NOT NULL,
  `productPrice` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`orderId`, `productId`, `productNum`, `productPrice`) VALUES
('202202130001', 10001, 3, 250),
('202202130001', 10002, 2, 350),
('202202130002', 10001, 1, 250),
('202202130002', 20001, 4, 150),
('202202130003', 10001, 2, 250),
('202202130003', 10002, 1, 350),
('202202180001', 10001, 1, 250),
('202202180001', 10002, 2, 350),
('202202180001', 20001, 2, 150),
('202202180002', 10001, 1, 250),
('202202180002', 10002, 2, 350),
('202202180003', 10002, 1, 350),
('202202180003', 20001, 2, 150),
('202202190001', 10001, 1, 250),
('202202190001', 20001, 3, 150),
('202202200001', 10002, 2, 350),
('202202200002', 10001, 2, 250),
('202202230001', 10001, 3, 250),
('202202230001', 20001, 3, 150),
('202202230002', 10002, 4, 350),
('202202230002', 20001, 5, 150),
('202202230003', 10001, 2, 250),
('202202230003', 20001, 4, 150),
('202202240001', 10001, 1, 250),
('202202240001', 10002, 3, 350),
('202202240002', 10002, 1, 350),
('202202240002', 20001, 1, 150),
('202202250001', 10001, 2, 250),
('202202250001', 10002, 2, 350),
('202202250001', 20001, 2, 150);

-- --------------------------------------------------------

--
-- Table structure for table `orderlist`
--

CREATE TABLE `orderlist` (
  `orderId` varchar(12) NOT NULL,
  `memberId` varchar(50) NOT NULL,
  `orderDate` date NOT NULL,
  `paymementStatus` varchar(4) NOT NULL,
  `pickupDate` date NOT NULL,
  `orderStatus` varchar(4) NOT NULL,
  `buyerPhone` char(10) NOT NULL,
  `buyerName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orderlist`
--

INSERT INTO `orderlist` (`orderId`, `memberId`, `orderDate`, `paymementStatus`, `pickupDate`, `orderStatus`, `buyerPhone`, `buyerName`) VALUES
('202202130001', 'hhhhfffcrcrc', '2022-02-13', '已付款', '2022-02-20', '確認訂單', '0944652789', '陳惠貞'),
('202202130002', 'dede', '2022-02-13', '已付款', '2022-02-21', '確認訂單', '0922485458', '陳俊榮'),
('202202130003', 'dede', '2022-02-13', '已付款', '2022-02-20', '確認訂單', '0911111111', '歐志信'),
('202202130004', 'dede', '2022-02-13', '已付款', '2022-02-22', '確認訂單', '0922584888', '蔡文龍'),
('202202140001', 'hhhhfffcrcrc', '2022-02-14', '已付款', '2022-02-22', '確認訂單', '098588111', '許郁雯'),
('202202140002', 'hhhhfffcrcrc', '2022-02-14', '已付款', '2022-02-23', '確認訂單', '0984827222', '張雅芳'),
('202202180001', 'dede', '2022-02-18', '未付款', '2022-02-25', '確認訂單', '0955849682', '黃小白'),
('202202180002', 'dede', '2022-02-18', '未付款', '2022-02-26', '確認訂單', '0985889551', '李白'),
('202202180003', 'hhhhfffcrcrc', '2022-02-18', '未付款', '2022-02-24', '確認訂單', '0911859648', '王浩浩'),
('202202190001', 'hhhhfffcrcrc', '2022-02-19', '未付款', '2022-02-28', '確認訂單', '0912846950', '林國毅'),
('202202200001', 'hhhhfffcrcrc', '2022-02-20', '未付款', '2022-02-27', '確認訂單', '0984885231', '杜甫'),
('202202200002', 'hhhhfffcrcrc', '2022-02-20', '未付款', '2022-03-01', '確認訂單', '0988952110', '施琅'),
('202202230001', 'dede', '2022-02-23', '未付款', '2022-03-03', '未確認', '0985768165', '劉大偉'),
('202202230002', 'hhhhfffcrcrc', '2022-02-23', '未付款', '2022-03-01', '未確認', '0985889568', '吳小廢'),
('202202230003', 'dede', '2022-02-23', '未付款', '2022-03-05', '未確認', '0984827651', '林玲玲'),
('202202240001', 'hhhhfffcrcrc', '2022-02-24', '未付款', '2022-03-06', '未確認', '0988888888', '蕭哈哈'),
('202202240002', 'dede', '2022-02-24', '未付款', '2022-03-07', '未確認', '0922586945', '楊瑞芳'),
('202202250001', 'hhhhfffcrcrc', '2022-02-25', '未付款', '2022-03-07', '未確認', '0912345678', '賀崎頭');

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

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productId`, `categoryId`, `sizeId`, `productTitle`, `productInfo`, `productPrice`, `ingredient`, `productStatus`) VALUES
(10001, 1, 7, '奶油蛋糕', '台灣第一款 如香水般有豐富層次的頂級巧克力蛋糕\r\n入口前味微苦的巧克力，\r\n中段帶有濃郁的咖啡香，\r\n尾韻則為淡淡的榛果及焦糖香味…', 250, '雞蛋、牛奶、動物鮮奶油、低筋麵粉、比利時鈕扣調溫巧克力、奶油、砂糖、吉利丁', '上架中'),
(10002, 1, 7, '巧克力蛋糕', '台灣第一款 如香水般有豐富層次的頂級巧克力蛋糕\r\n入口前味微苦的巧克力，\r\n中段帶有濃郁的咖啡香，\r\n尾韻則為淡淡的榛果及焦糖香味…', 350, '雞蛋、牛奶、動物鮮奶油、低筋麵粉、比利時鈕扣調溫巧克力、奶油、砂糖、吉利丁', '上架中'),
(20001, 2, 1, '櫻桃杯子蛋糕', '台灣第一款 如香水般有豐富層次的頂級巧克力蛋糕\r\n入口前味微苦的巧克力，\r\n中段帶有濃郁的咖啡香，\r\n尾韻則為淡淡的榛果及焦糖香味…', 150, '雞蛋、牛奶、動物鮮奶油、低筋麵粉、比利時鈕扣調溫巧克力、奶油、砂糖、吉利丁', '上架中'),
(20002, 2, 4, 'test1', '巧克力杯子蛋糕 (Chocolate Cupcake)，是派對聚會、戶外野餐、下午茶點心的好選擇。\r\n法國綠色山丘諾曼第無鹽發酵奶油跟法芙娜巧克力粉，做出香濃可口的巧克力杯子蛋糕，甜而不膩的質地，好吃到真的會上癮。', 550, '低筋麵粉 、法芙娜巧克力粉、泡打粉、鹽、糖、綠色山丘諾曼第無鹽發酵奶油、牛奶 、雞蛋、香草精、Oreo 巧克力夾心', '上架中'),
(20003, 2, 4, 'test2', ' (Chocolate Cupcake)，是派對聚會、戶外野餐、下午茶點心的好選擇。\r\n法國綠色山丘諾曼第無鹽發酵奶油跟法芙娜巧克力粉，做出香濃可口的巧克力杯子蛋糕，甜而不膩的質地，好吃到真的會上癮。', 300, '低筋麵粉 、法芙娜巧克力粉、泡打粉、鹽、糖、綠色山丘諾曼第無鹽發酵奶油、牛奶 、雞蛋、香草精、Oreo 巧克力夾心', '下架中');

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
  `imgPath` varchar(1000) NOT NULL,
  `productImgId` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productimg`
--

INSERT INTO `productimg` (`productId`, `imgPath`, `productImgId`) VALUES
(10001, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/butterscotch%201-1.jpg?alt=media&token=170bc7cf-3ea7-4aa3-a709-a0de5d414262', 1),
(10001, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/butterscotch%201-2.jpg?alt=media&token=2c96709c-cf52-447c-898a-95cb6a21bc06', 2),
(10001, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/butterscotch%201-3.jpg?alt=media&token=41599a12-3959-4177-9831-d7036711d0da', 3),
(10002, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/choco-fruit%201-1.jpg?alt=media&token=ca23a2de-60bc-4828-939d-86485f3d99f5', 4),
(10002, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/choco-fruit%201-2.jpg?alt=media&token=38ee4bec-c5ec-4787-8dad-2c4fd934c0cb', 5),
(10002, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/choco-fruit%201-3.jpg?alt=media&token=4706db33-2db6-4f96-8bf9-bda063f70aea', 6),
(20001, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/cupcake%201-1.jpg?alt=media&token=7ede4d42-9003-4797-98e7-a3c454c667ed', 7),
(20001, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/cupcake%201-2.jpg?alt=media&token=9e94c094-7744-41b9-a166-ce4929f2e1c5', 8),
(20001, 'https://firebasestorage.googleapis.com/v0/b/sweetbakeryimg.appspot.com/o/cupcake%201-3.jpeg?alt=media&token=d97c2ad4-deb7-46f1-8aee-d10e7e576de9', 9);

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
  ADD KEY `classTimeId` (`classTimeId`),
  ADD KEY `memberId` (`memberId`);

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
  ADD KEY `sizeId` (`sizeId`),
  ADD KEY `categoryId` (`categoryId`);

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
  MODIFY `classImgId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `classlist`
--
ALTER TABLE `classlist`
  MODIFY `classId` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `classreservation`
--
ALTER TABLE `classreservation`
  MODIFY `reservationId` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `classtime`
--
ALTER TABLE `classtime`
  MODIFY `classTimeId` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `productimg`
--
ALTER TABLE `productimg`
  MODIFY `productImgId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  ADD CONSTRAINT `cartlist_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`),
  ADD CONSTRAINT `cartlist_ibfk_3` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `classimg`
--
ALTER TABLE `classimg`
  ADD CONSTRAINT `classimg_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classlist` (`classId`);

--
-- Constraints for table `classreservation`
--
ALTER TABLE `classreservation`
  ADD CONSTRAINT `classreservation_ibfk_2` FOREIGN KEY (`classTimeId`) REFERENCES `classtime` (`classTimeId`),
  ADD CONSTRAINT `classreservation_ibfk_3` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `classtime`
--
ALTER TABLE `classtime`
  ADD CONSTRAINT `classtime_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classlist` (`classId`);

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`),
  ADD CONSTRAINT `orderdetail_ibfk_3` FOREIGN KEY (`orderId`) REFERENCES `orderlist` (`orderId`);

--
-- Constraints for table `orderlist`
--
ALTER TABLE `orderlist`
  ADD CONSTRAINT `orderlist_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`sizeId`) REFERENCES `productsize` (`sizeId`),
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`categoryId`) REFERENCES `productcategory` (`categoryId`);

--
-- Constraints for table `productimg`
--
ALTER TABLE `productimg`
  ADD CONSTRAINT `productimg_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
