-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bwybkcq82enzs1mtccet-mysql.services.clever-cloud.com:3306
-- Generation Time: Mar 05, 2025 at 08:17 AM
-- Server version: 8.0.22-13
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bwybkcq82enzs1mtccet`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `flag`) VALUES
('6b4c142c-9a4c-4765-a06b-b5bfd84fca31', 'clifford', '$2b$10$y7NzgCCoBU9gJYE5enPzYe.EdL7R3KH3ANcwhDALFNJUB.fcYZsuO', 1),
('9d6c0db2-5568-4ed6-8f64-3e2ed3a4bf2b', 'Clifford', '$2b$10$oEEOasn8S2XgzHANfK1vdOf/YCJ6k2xHGNQE05WR3n2qIQhtmrsKC', 1),
('aa24d964-bf05-45d4-9135-0468199ee801', '123', '$2b$10$Lrc4fGYai6ek0qKc/m1pfuAWRnkzghfKEPf3DD3H/teyZRISzO/QK', 1),
('bcce7ccb-60dd-492d-905b-9dcd8509e4b7', 'clifford', '$2b$10$RXFYbFauwptDSR0VaAmVl.DE8fNq7ImwOP30uTjvX9nUAxUtMu0wu', 1),
('d6d0f586-9ab5-4847-9b30-c627a0feaa2b', 'Clifford', '$2b$10$jQkSwqkJ3tIW94.i51H2kO5tOyQ6exHikPPLMpdMYvSvD9pJhRWfy', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `fullname`, `email`, `phone_number`) VALUES
('063fc2d8-11dd-43d4-bd6f-562f4e3f3b98', '9d6c0db2-5568-4ed6-8f64-3e2ed3a4bf2b', 'Clifford', 'c.iyac123@gmail.com', '0912345678'),
('23f17b50-1df7-4ff7-bcbc-b268a8f5056e', 'aa24d964-bf05-45d4-9135-0468199ee801', 'clifford', 'c.iyac123@gmail.com', '091234567489'),
('3ea533f6-5903-4588-99d5-7e1316069772', 'bcce7ccb-60dd-492d-905b-9dcd8509e4b7', 'Clifford', 'cliffordjay.halcyondigital@gmail.com', '1123'),
('7c4b88ae-a866-497c-bb6c-ede6ced6d512', 'd6d0f586-9ab5-4847-9b30-c627a0feaa2b', 'Clifford', 'c.iyac123@gmail.com', '0912345678');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
