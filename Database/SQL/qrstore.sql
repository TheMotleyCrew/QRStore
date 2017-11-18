-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2017 at 05:38 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qrstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `uid` int(100) NOT NULL,
  `pid` int(100) NOT NULL,
  `qty` int(100) NOT NULL,
  `store_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`uid`, `pid`, `qty`, `store_id`) VALUES
(6, 11, 5, 0),
(6, 20, 5, 0),
(6, 13, 10, 0),
(6, 44, 2, 0),
(6, 25, 2, 0),
(6, 26, 3, 0),
(7, 40, 1, 0),
(7, 32, 1, 0),
(7, 31, 2, 0),
(7, 42, 1, 0),
(7, 21, 5, 0),
(7, 17, 3, 0),
(7, 9, 2, 0),
(9, 2, 3, 0),
(9, 4, 2, 0),
(9, 7, 10, 0),
(9, 8, 1, 0),
(9, 15, 5, 0),
(9, 35, 1, 0),
(9, 38, 4, 0),
(9, 45, 3, 0),
(9, 28, 3, 0),
(9, 22, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pending`
--

CREATE TABLE `pending` (
  `uname` varchar(100) NOT NULL,
  `urole` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `uid` int(100) NOT NULL,
  `pid` int(100) NOT NULL,
  `qty` int(100) NOT NULL,
  `price` int(100) NOT NULL,
  `pname` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `sid` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`uid`, `pid`, `qty`, `price`, `pname`, `category`, `sid`) VALUES
(0, 1, 20, 5000, 'Dress Shoes', 'Apparel', 1),
(0, 2, 15, 5000, 'Dress Shoes', 'Apparel', 2),
(0, 3, 25, 5000, 'Dress Shoes', 'Apparel', 3),
(0, 4, 30, 10000, 'Tuxedo', 'Apparel', 1),
(0, 5, 25, 10000, 'Tuxedo', 'Apparel', 3),
(0, 6, 10, 500, 'Cufflinks', 'Apparel', 2),
(0, 7, 15, 500, 'Cufflinks', 'Apparel', 3),
(0, 8, 50, 2000, 'Gold Watch Male', 'Apparel', 1),
(0, 9, 50, 2000, 'Gold Watch Female', 'Apparel', 1),
(0, 10, 20, 15000, 'Evening Gown', 'Apparel', 1),
(0, 11, 35, 15000, 'Evening Gown', 'Apparel', 3),
(0, 12, 10, 5000, 'Stilettos', 'Apparel', 1),
(0, 13, 35, 5000, 'Stilettos', 'Apparel', 2),
(0, 14, 15, 5000, 'Stilettos', 'Apparel', 3),
(0, 15, 15, 500, 'Money Clip', 'Apparel', 2),
(0, 16, 15, 500, 'Money Clip', 'Apparel', 3),
(0, 17, 15, 500, 'Clutch', 'Apparel', 1),
(0, 18, 15, 500, 'Clutch', 'Apparel', 2),
(0, 19, 15, 500, 'Clutch', 'Apparel', 3),
(0, 20, 15, 2000, 'Platinum Necklace', 'Apparel', 1),
(3, 21, 20, 13000, 'SmartPhone', 'Electronic', 0),
(4, 22, 10, 13000, 'SmartPhone', 'Electronic', 0),
(5, 23, 30, 13000, 'SmartPhone', 'Electronic', 0),
(3, 24, 15, 30000, 'IPhone', 'Electronic', 0),
(5, 25, 10, 30000, 'IPhone', 'Electronic', 0),
(3, 26, 30, 1000, 'Earphones', 'Electronic', 0),
(4, 27, 40, 1000, 'Earphones', 'Electronic', 0),
(5, 28, 40, 1000, 'Earphones', 'Electronic', 0),
(3, 29, 30, 2500, 'Headphones', 'Electronic', 0),
(4, 30, 25, 2500, 'Headphones', 'Electronic', 0),
(5, 31, 30, 2500, 'Headphones', 'Electronic', 0),
(3, 32, 20, 60000, 'Laptop', 'Electronic', 0),
(5, 33, 25, 60000, 'Laptop', 'Electronic', 0),
(4, 34, 30, 75000, 'MacBook', 'Electronic', 0),
(4, 35, 20, 150000, 'LED TV', 'Electronic', 0),
(3, 36, 15, 5000, 'Switch Controller', 'Electronic', 0),
(4, 37, 25, 5000, 'Switch Controller', 'Electronic', 0),
(5, 38, 20, 5000, 'Switch Controller', 'Electronic', 0),
(4, 39, 20, 35000, 'Oculus Rift', 'Electronic', 0),
(5, 40, 10, 35000, 'Oculus Rift', 'Electronic', 0),
(3, 41, 40, 1500, 'DragonWar Mouse', 'Electronic', 0),
(4, 42, 35, 1500, 'DragonWar Mouse', 'Electronic', 0),
(4, 43, 50, 3000, 'Power Bank', 'Electronic', 0),
(5, 44, 35, 3000, 'Power Bank', 'Electronic', 0),
(3, 45, 25, 11000, 'Surround Speakers', 'Electronic', 0);

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

CREATE TABLE `purchase` (
  `bid` int(100) NOT NULL,
  `uid` int(100) NOT NULL,
  `pid` int(100) NOT NULL,
  `qty` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase`
--

INSERT INTO `purchase` (`bid`, `uid`, `pid`, `qty`) VALUES
(1, 6, 45, 5),
(1, 6, 35, 1),
(1, 6, 30, 2),
(1, 6, 45, 3),
(2, 8, 45, 5),
(2, 8, 35, 1),
(2, 8, 30, 2),
(2, 8, 45, 3),
(2, 8, 2, 3),
(2, 8, 4, 2),
(2, 8, 7, 10),
(2, 8, 8, 1),
(2, 8, 15, 5),
(3, 6, 42, 1),
(3, 6, 21, 5),
(3, 6, 17, 3),
(3, 6, 9, 2);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `sid` int(100) NOT NULL,
  `sname` varchar(100) NOT NULL,
  `slocation` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`sid`, `sname`, `slocation`) VALUES
(1, 'Brand Factory', 'Yelahanka'),
(2, 'Big Bazaar', 'Vijayanagar'),
(3, 'FBB', 'Koramangala');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(100) NOT NULL,
  `wallet` int(100) NOT NULL,
  `uname` varchar(100) NOT NULL,
  `urole` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `wallet`, `uname`, `urole`, `username`, `password`) VALUES
(1, 0, 'Ramadas Mahale', 'admin', 'ramadas', 'ramadas'),
(2, 0, 'Ritesh Surana', 'admin', 'ritesh', 'ritesh'),
(3, 250000, 'Samyak M', 'retail', 'samyak', 'samyak'),
(4, 275000, 'Suhas M', 'retail', 'suhas', 'suhas'),
(5, 260000, 'Shrinidhi B', 'retail', 'shrinidhi', 'shrinidhi'),
(6, 50000, 'Rakshita Prabhu', 'user', 'rakshita', 'rakshita'),
(7, 69500, 'Surabhi Ravindra', 'user', 'surabhi', 'surabhi'),
(8, 58500, 'Mayank Kumar Singh', 'user', 'mayank', 'mayank'),
(9, 79000, 'Varun Pai', 'user', 'varun', 'varun');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `sid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
