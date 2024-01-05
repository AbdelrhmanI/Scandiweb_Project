-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2024 at 02:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `sku` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` decimal(9,2) NOT NULL,
  `size` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`sku`, `name`, `price`, `size`) VALUES
('abdoo', 'Acme DISK', 3.00, 'Weight: 3KG'),
('JVC200123', 'Acme DISK', 5.00, 'Size: 4MB'),
('JVC2001234', 'Book', 500.00, 'Weight: 4KG'),
('JVC2001237', 'Acme DISK', 4.00, 'Size: 5MB'),
('JVC200124', 'Acme DISK', 2.00, 'Size: 2MB'),
('JVC2001244', 'Acme DISK', 400.00, 'Size: 500MB'),
('JVC200125', 'Book', 500.00, 'Weight: 8KG'),
('JVC2001251', 'Chair', 1500.00, 'Dimension: 100x100x100'),
('JVC200127', 'Acme DISK', 12.00, 'Size: 500MB'),
('JVC200127[8', 'Acme DISK', 100.00, 'Size: 6MB');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`sku`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
