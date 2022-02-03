-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2021 at 07:14 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supermarket`
--
CREATE DATABASE IF NOT EXISTS `supermarket` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `supermarket`;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createDate` date NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `cart`:
--   `userId`
--       `users` -> `userId`
--

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cartId`, `userId`, `createDate`, `isActive`) VALUES
(1, 11111111, '2021-10-13', 0),
(2, 11111111, '2021-10-01', 0),
(3, 11111111, '2021-10-10', 0),
(4, 99999901, '2020-10-22', 0),
(5, 99999901, '2020-10-22', 0),
(6, 99999901, '2020-10-22', 0),
(7, 99999901, '2020-10-22', 0),
(8, 99999901, '2020-10-22', 0),
(9, 99999901, '2020-10-22', 0),
(22, 11111111, '2020-10-22', 0),
(24, 99999901, '2020-10-22', 1),
(64, 11111111, '2021-11-05', 0),
(89, 444444, '2021-11-09', 0),
(91, 444444, '2021-11-10', 0),
(92, 11111111, '2021-11-11', 0),
(97, 444444, '2021-11-13', 0),
(98, 444444, '2021-11-15', 0),
(99, 444444, '2021-11-16', 0),
(100, 444444, '2021-11-17', 0),
(101, 11111111, '2021-11-19', 0),
(102, 11111111, '2021-11-19', 0),
(103, 11111111, '2021-11-19', 0),
(104, 11111111, '2021-11-19', 0),
(105, 11111111, '2021-11-19', 0),
(106, 444444, '2021-11-19', 0),
(107, 444444, '2021-11-20', 0),
(108, 444444, '2021-11-20', 0),
(110, 444444, '2021-11-21', 0),
(111, 444444, '2021-11-21', 0),
(112, 444444, '2021-11-21', 0),
(114, 444444, '2021-11-24', 0),
(115, 444444, '2021-11-24', 0),
(116, 444444, '2021-11-24', 0),
(117, 444444, '2021-11-24', 0),
(118, 444444, '2021-11-24', 0),
(119, 444444, '2021-11-24', 0),
(120, 444444, '2021-11-24', 0),
(121, 444444, '2021-11-24', 0),
(122, 444444, '2021-11-24', 0),
(123, 11111111, '2021-11-24', 0),
(125, 444444, '2021-11-29', 0),
(127, 123456789, '2021-11-29', 1),
(128, 444444, '2021-12-04', 0),
(129, 444444, '2021-12-04', 0),
(131, 444444, '2021-12-07', 0),
(132, 444444, '2021-12-07', 0),
(133, 444444, '2021-12-07', 1),
(134, 333333, '2021-12-07', 0),
(135, 333333, '2021-12-07', 0),
(136, 333333, '2021-12-07', 1),
(137, 555555, '2021-12-07', 0),
(143, 555555, '2021-12-07', 1),
(144, 11111111, '2021-12-07', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cartitem`
--

CREATE TABLE `cartitem` (
  `cartItemId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `cartId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `cartitem`:
--   `productId`
--       `products` -> `productId`
--   `cartId`
--       `cart` -> `cartId`
--

--
-- Dumping data for table `cartitem`
--

INSERT INTO `cartitem` (`cartItemId`, `productId`, `quantity`, `totalPrice`, `cartId`) VALUES
(1, 2, 2, '46.00', 3),
(88, 4, 1, '3.20', 64),
(91, 7, 3, '17.70', 64),
(93, 1, 2, '11.60', 64),
(98, 1, 1, '5.80', 89),
(99, 2, 1, '23.00', 89),
(100, 2, 2, '46.00', 89),
(102, 1, 1, '5.80', 91),
(103, 3, 2, '65.80', 91),
(104, 2, 2, '46.00', 91),
(105, 4, 1, '3.20', 91),
(106, 7, 1, '5.90', 91),
(107, 9, 1, '555111.00', 91),
(108, 3, 1, '32.90', 91),
(111, 1, 1, '5.80', 92),
(112, 2, 3, '69.00', 92),
(121, 1, 1, '5.80', 97),
(122, 3, 2, '65.80', 97),
(123, 6, 3, '80.40', 97),
(124, 12, 2, '246.00', 97),
(146, 1, 2, '11.60', 98),
(147, 4, 1, '3.20', 98),
(148, 6, 1, '26.80', 98),
(149, 3, 1, '32.90', 99),
(150, 4, 3, '9.60', 99),
(151, 5, 3, '47.70', 99),
(157, 5, 2, '31.80', 100),
(158, 1, 2, '11.60', 100),
(159, 3, 2, '65.80', 100),
(160, 7, 2, '11.80', 100),
(161, 11, 2, '3.58', 92),
(162, 9, 1, '555.00', 92),
(163, 7, 5, '29.50', 101),
(164, 4, 2, '6.40', 101),
(165, 6, 2, '53.60', 101),
(166, 1, 1, '5.80', 102),
(167, 2, 2, '46.00', 102),
(168, 4, 1, '3.20', 102),
(169, 6, 4, '107.20', 102),
(170, 3, 1, '32.90', 103),
(171, 6, 1, '26.80', 103),
(172, 7, 1, '5.90', 103),
(173, 7, 1, '5.90', 104),
(174, 4, 1, '3.20', 104),
(175, 1, 1, '5.80', 104),
(176, 2, 1, '23.00', 104),
(177, 5, 1, '15.90', 104),
(178, 1, 1, '5.80', 106),
(179, 3, 1, '32.90', 106),
(185, 3, 1, '32.90', 107),
(186, 2, 1, '23.00', 107),
(187, 1, 1, '5.80', 107),
(192, 1, 1, '5.80', 108),
(194, 4, 1, '3.20', 108),
(195, 3, 2, '65.80', 108),
(196, 2, 1, '23.00', 108),
(197, 3, 1, '32.90', 108),
(198, 7, 1, '5.90', 108),
(199, 8, 1, '66.00', 108),
(200, 9, 1, '555.00', 108),
(201, 2, 1, '23.00', 108),
(202, 1, 1, '5.80', 108),
(203, 2, 1, '23.00', 108),
(204, 3, 1, '32.90', 108),
(205, 4, 1, '3.20', 108),
(206, 1, 2, '11.60', 108),
(207, 2, 1, '23.00', 108),
(208, 3, 1, '32.90', 108),
(209, 3, 1, '32.90', 110),
(210, 1, 1, '5.80', 111),
(216, 1, 1, '5.80', 112),
(217, 2, 1, '23.00', 114),
(218, 2, 3, '69.00', 115),
(219, 2, 1, '23.00', 116),
(220, 1, 1, '5.80', 117),
(221, 4, 1, '3.20', 118),
(222, 6, 1, '26.80', 119),
(223, 1, 1, '5.80', 120),
(224, 5, 1, '15.90', 121),
(226, 1, 1, '5.80', 105),
(267, 3, 3, '98.70', 105),
(268, 5, 3, '47.70', 105),
(269, 20, 3, '369.00', 105),
(270, 10, 1, '1.00', 105),
(271, 7, 1, '5.90', 123),
(272, 8, 1, '66.00', 123),
(350, 8, 1, '66.00', 122),
(351, 3, 1, '32.90', 122),
(352, 9, 1, '555.00', 122),
(353, 4, 1, '3.20', 122),
(354, 10, 1, '1.00', 122),
(355, 2, 1, '23.00', 122),
(356, 3, 1, '32.90', 122),
(357, 3, 1, '32.90', 122),
(358, 7, 1, '5.90', 122),
(360, 6, 1, '26.80', 122),
(361, 4, 1, '3.20', 122),
(387, 2, 1, '23.00', 125),
(397, 9, 1, '555.00', 125),
(400, 5, 3, '47.70', 125),
(402, 20, 2, '246.00', 125),
(404, 3, 2, '65.98', 125),
(414, 1, 1, '5.80', 128),
(415, 2, 1, '23.00', 128),
(416, 3, 1, '32.99', 128),
(417, 4, 1, '3.20', 128),
(418, 23, 1, '3.20', 128),
(420, 29, 1, '8.90', 128),
(421, 9, 1, '555.00', 128),
(432, 9, 1, '8.79', 129),
(433, 5, 2, '31.80', 129),
(434, 6, 4, '107.20', 129),
(435, 8, 2, '19.80', 129),
(436, 12, 3, '5.07', 129),
(437, 11, 3, '5.37', 129),
(438, 13, 3, '35.70', 131),
(439, 37, 3, '2.25', 131),
(440, 7, 2, '11.80', 131),
(441, 9, 3, '26.37', 131),
(442, 1, 2, '11.60', 132),
(443, 11, 3, '5.37', 132),
(444, 12, 5, '8.45', 132),
(447, 1, 1, '5.80', 133),
(449, 31, 2, '39.80', 134),
(450, 3, 3, '98.97', 135),
(451, 8, 2, '19.80', 137),
(452, 1, 1, '5.80', 143),
(453, 1, 2, '11.60', 136),
(454, 2, 2, '46.00', 136),
(455, 4, 2, '1.78', 136),
(456, 4, 2, '1.78', 24),
(457, 11, 2, '3.58', 24);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `category`:
--

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
(1, 'Dairy'),
(2, 'Fruits'),
(3, 'Vegetables'),
(4, 'Meat & Chicken'),
(5, 'Sea-Food'),
(6, 'Bakery'),
(7, 'Coffee');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `cartPrice` decimal(10,2) NOT NULL,
  `shippingCity` varchar(30) NOT NULL,
  `shippingStreet` varchar(30) NOT NULL,
  `shippingDate` date NOT NULL,
  `orderDate` date NOT NULL,
  `creditCardLast4` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `orders`:
--   `userId`
--       `users` -> `userId`
--   `cartId`
--       `cart` -> `cartId`
--

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `cartId`, `cartPrice`, `shippingCity`, `shippingStreet`, `shippingDate`, `orderDate`, `creditCardLast4`) VALUES
(1, 11111111, 3, '123.00', 'Jerusalem', 'my street address', '2021-10-20', '2021-10-19', '1111'),
(17, 11111111, 64, '32.50', 'Jerusalem', 'Yafo', '2021-11-12', '2021-11-08', '0000'),
(18, 444444, 89, '74.80', 'Jerusalem', '2222', '2021-11-11', '2021-11-10', '0000'),
(20, 444444, 91, '555270.60', 'Jerusalem', '2222', '2021-11-14', '2021-11-13', '0000'),
(22, 444444, 98, '41.60', 'Jerusalem', '2222', '2021-11-16', '2021-11-16', '0000'),
(23, 444444, 99, '90.20', 'Jerusalem', '2222', '2021-11-17', '2021-11-17', '0000'),
(24, 444444, 100, '121.00', 'Jerusalem', '2222', '2021-11-19', '2021-11-19', '0000'),
(25, 11111111, 92, '633.38', 'Jerusalem', 'Yafo', '2021-11-19', '2021-11-19', '0010'),
(26, 11111111, 101, '89.50', 'Jerusalem', 'Yafo', '2021-11-19', '2021-11-19', '0010'),
(27, 11111111, 102, '162.20', 'Jerusalem', 'Yafo', '2021-11-20', '2021-11-19', '0090'),
(28, 11111111, 103, '65.60', 'Jerusalem', 'Yafo', '2021-11-26', '2021-11-19', '0200'),
(29, 11111111, 104, '53.80', 'Jerusalem', 'Yafo', '2021-11-26', '2021-11-19', '0990'),
(30, 444444, 106, '38.70', 'Jerusalem', '2222', '2021-11-27', '2021-11-19', '0000'),
(31, 444444, 107, '61.70', 'Jerusalem', '2222', '2021-11-21', '2021-11-20', '0000'),
(32, 444444, 108, '913.00', 'Jerusalem', '2222', '2021-11-21', '2021-11-21', '0000'),
(33, 444444, 110, '32.90', 'Jerusalem', '2222', '2021-11-21', '2021-11-21', '0000'),
(34, 444444, 111, '5.80', 'Jerusalem', '2222', '2021-11-22', '2021-11-21', '0000'),
(35, 444444, 112, '5.80', 'Jerusalem', '2222', '2021-11-25', '2021-11-24', '0000'),
(36, 444444, 114, '23.00', 'Jerusalem', '2222', '2021-11-25', '2021-11-24', '0000'),
(37, 444444, 115, '69.00', 'Jerusalem', '2222', '2021-12-01', '2021-11-24', '0000'),
(38, 444444, 116, '23.00', 'Jerusalem', '2222', '2021-11-24', '2021-11-24', '0000'),
(39, 444444, 117, '5.80', 'Jerusalem', '2222', '2021-11-24', '2021-11-24', '0000'),
(40, 444444, 118, '3.20', 'Jerusalem', '2222', '2021-11-23', '2021-11-24', '0000'),
(41, 444444, 119, '26.80', 'Jerusalem', '2222', '2021-11-25', '2021-11-24', '0000'),
(42, 444444, 120, '5.80', 'Jerusalem', '2222', '2021-11-26', '2021-11-24', '0110'),
(43, 444444, 121, '15.90', 'Jerusalem', '2222', '2021-11-27', '2021-11-24', '0100'),
(44, 11111111, 105, '522.20', 'Jerusalem', 'Yafo', '2021-11-28', '2021-11-24', '8888'),
(45, 444444, 122, '782.80', 'Jerusalem', '2222', '2021-12-01', '2021-11-29', '0110'),
(46, 444444, 125, '937.68', 'Jerusalem', '2222', '2021-12-07', '2021-12-04', '0010'),
(47, 444444, 128, '633.09', 'Jerusalem', '2222', '2021-12-14', '2021-12-04', '5555'),
(48, 444444, 129, '178.03', 'Jerusalem', '2222', '2021-12-11', '2021-12-07', '5555'),
(49, 444444, 131, '76.12', 'Hifa', 'sfgsdfd', '2021-12-11', '2021-12-07', '5555'),
(50, 444444, 132, '25.42', 'Petah Tikva', '5th ave', '2021-12-11', '2021-12-07', '3333'),
(51, 333333, 134, '39.80', 'Hifa', 'Main Street', '2021-12-12', '2021-12-07', '4444'),
(52, 333333, 135, '98.97', 'Ashdod', 'Street', '2021-12-12', '2021-12-07', '4545'),
(53, 555555, 137, '19.80', 'Tel Aviv', 'Jerusalem Street', '2021-12-12', '2021-12-07', '3030');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `productName` varchar(30) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `products`:
--   `categoryId`
--       `category` -> `categoryId`
--

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `categoryId`, `price`, `image`) VALUES
(1, 'Milk', 1, '5.80', '0e0a85d6-e2a9-4dbe-8539-4eb438b2b27e.jpg'),
(2, 'Cream', 1, '23.00', '46eebefa-a5ff-42b8-b957-2449b672abc7.jpg'),
(3, 'Chicken Wings', 4, '32.99', '7e3432fd-b96f-4192-b6fa-f17be1f35b73.jpg'),
(4, 'Tomato', 3, '0.89', '3c707f26-94b5-459a-8fee-6ba444a42f94.jpg'),
(5, 'Cream-Cheese', 1, '15.90', 'f14a6d0c-5eff-4ed9-845d-c1eb84ce2958.jpg'),
(6, 'Mozzarella', 1, '26.80', 'afb28a34-379f-4c83-9530-92782ffe329b.jpg'),
(7, 'Bread', 6, '5.90', '2e55e214-3145-41c0-834b-b11f416b6638.jpg'),
(8, 'Challah', 6, '9.90', '4a89c16f-e1d2-4399-a4ef-bdd06015f3cf.jpg'),
(9, 'Baguette', 6, '8.79', '80101e76-c6ca-4d58-adf9-f0a0649b088c.jpg'),
(10, 'Pita Bread', 6, '1.00', '873c4e41-b36a-45ea-8eb8-a5650ff8d295.jpg'),
(11, 'Green Apple', 2, '1.79', '9cc99b47-450d-47e4-a7fe-bfbd1950cc99.jpg'),
(12, 'Red Apple', 2, '1.69', 'f37133a1-5cca-40f6-9b5e-c0723d8aa983.jpg'),
(13, 'Pineapple', 2, '11.90', '2f8735d2-8a73-4728-b03b-dde7521b29c6.jpg'),
(17, 'Watermelon', 2, '11.80', '8d1f1a22-fe55-4171-ad49-a173839985cc.jpg'),
(18, 'Lettuce', 3, '3.50', '736e2c45-c272-43a7-b562-9e2c9834665c.jpg'),
(19, 'Potato', 3, '0.39', '2c323f06-ea22-4a47-ba55-34cbaf954116.jpg'),
(20, 'Yogurt', 1, '1.20', '9e6c4e73-7278-40f9-a363-8c8f5e23cc80.jpg'),
(21, 'Ground Beef', 4, '13.00', 'a7388543-e7bd-46f7-8fe4-2fae89d5251e.jpg'),
(22, 'Steak', 4, '12.90', '5ec8510d-eea9-464f-8e8a-51fc9bc04957.jpg'),
(23, 'Cucumber', 3, '0.69', 'df07de8e-4349-4312-ab03-7aa172bdbcb2.jpg'),
(28, 'Oniun', 3, '0.78', '6707a279-9dfa-40a2-bec3-c91e0befbaa1.jpg'),
(29, 'Corn', 3, '1.99', 'c1bbd4cf-e50c-43cd-b829-700716fb25ad.jpg'),
(30, 'Salmon Fillet', 5, '10.85', '2b5ba627-dde3-4f79-bdc5-9422ff9ffe76.jpg'),
(31, 'Sea Bass', 5, '19.90', '953f9ad7-d9d4-46a8-b012-7583259cc85c.jpg'),
(32, 'Instant Coffee', 7, '9.90', '71477bc5-a5c5-4511-af07-4dda19a3eef3.jpg'),
(33, 'Instant Coffee (Decaf)', 7, '13.00', '7b695d1b-3e68-4c06-902e-c66b443ac9ff.jpg'),
(34, 'Turkish Coffee', 7, '3.50', 'd01d096b-5d86-4609-8368-d1e4c32d54ac.jpg'),
(35, 'Sugar', 7, '2.70', 'c4b447c7-abf1-4ecf-8b29-6005b423fe14.jpg'),
(36, 'Chicken Breast', 4, '13.00', '77cd759d-573c-4c67-b544-220260892a9d.jpg'),
(37, 'Orange', 2, '0.75', '5ad835de-a310-4a26-9c7e-998e351be11b.jpg'),
(38, 'Banana', 2, '1.00', '9c367793-e2c4-4742-8807-4edfd307a702.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `permission` varchar(5) NOT NULL,
  `fName` varchar(30) NOT NULL,
  `lName` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `street` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `users`:
--

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `password`, `permission`, `fName`, `lName`, `city`, `street`) VALUES
(333333, 'user3@user.com', '333333', 'user', 'David', 'Levy', 'Bnei Brak', 'Main Street'),
(444444, 'user4@user.com', '444444', 'user', 'Yafa', 'Shemesh', 'Haifa', 'Haoman Street'),
(555555, 'user5@user.com', '555555', 'user', 'Tikva', 'Tal', 'Tel Aviv', 'Jerusalem Street'),
(11111111, 'user1@user.com', '111111', 'user', 'Shlomo', 'Yamin', 'Jerusalem', 'Yafo'),
(99999901, 'user2@user.com', '999999', 'user', 'Yossi', 'Cohen', 'Jerusalem', 'Haneviim'),
(123456789, 'admin@admin.com', 'admin', 'admin', 'Moshe', 'Levy', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD PRIMARY KEY (`cartItemId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `cartId` (`cartId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `cartitem`
--
ALTER TABLE `cartitem`
  MODIFY `cartItemId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=458;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD CONSTRAINT `cartitem_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cartitem_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
