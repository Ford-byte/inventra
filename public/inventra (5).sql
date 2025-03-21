

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



CREATE TABLE `category` (
  `id` int(255) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category`) VALUES
(1, 'Grains and Staples'),
(2, 'Canned and Packaged Goods'),
(3, 'Dairy and Refrigerated Items'),
(4, 'Beverages'),
(5, 'Snacks and Sweets'),
(6, 'Cleaning and Household Products'),
(7, 'Fresh Produce'),
(8, 'Frozen Foods'),
(9, 'Health and Personal Care');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `stock_in` int(255) DEFAULT NULL,
  `stock_out` int(255) DEFAULT 0,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `product_name`, `price`, `stock_in`, `stock_out`, `date`, `flag`) VALUES
('a22e929b-9347-404f-821a-45990c91d423', 'eee', 134, 0, 0, '2025-03-06', 1),
('f9cec70f-9bcb-467d-88ec-71cb80c624f8', 'eee', 250, 25, 0, '2025-03-07', 1),
('faf6c897-4dfa-4104-aed8-1f4d66e148ca', 'qweeeee', 12, 9, 4, '2025-03-06', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

CREATE TABLE `product_details` (
  `id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `supplier_id` varchar(255) DEFAULT NULL,
  `category_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`id`, `product_id`, `supplier_id`, `category_id`) VALUES
('116d500c-f8bd-42ba-94ff-32c73de93641', 'faf6c897-4dfa-4104-aed8-1f4d66e148ca', '123', '7'),
('381dd105-844e-476f-b8e1-c28f3362c026', 'f9cec70f-9bcb-467d-88ec-71cb80c624f8', 'qwe', '4'),
('745c7def-b416-4512-9baf-edd34ef81a7b', 'a22e929b-9347-404f-821a-45990c91d423', '123', '4');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `item_supplied` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` text NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `fullname`, `item_supplied`, `email`, `phone_number`, `flag`) VALUES
('14f61da8-f105-4be7-820c-48cdee9bbf2e', 'Clifford Jay Iyac', 'Rice', 'cliffordjay.halcyondigital@gmail.com', '0912345678', 0),
('84236cb8-f061-41ad-b7af-c2a9f88f0c11', 'Clifford Jay Iyac', 'Rice', 'cliffordjay.halcyondigital@gmail.com', '09123456789', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `stock_out` int(255) NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `product_name`, `price`, `stock_out`, `flag`) VALUES
('bebe1a15-dba7-4a1e-8356-8314b7258f1d', 'qweeeee', 12, 23, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `flag`) VALUES
('ae6d3012-6892-49f7-98ad-443f4e745612', '12334', '$2b$10$j6NnxRoLfsM43BL.f3eHJeRr4MQoJKdjr90DV6AaWT0CIa/hPDX5u', 1),
('d1a563ae-b3c3-4eab-a98d-57c27577e468', '123', '$2b$10$cEIOvqLH/Fg05VOws7DJX.1jfdxrJRDpD3Qch5CmSw0h7gAJTd1rW', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `fullname`, `email`, `phone_number`) VALUES
('bb74ea5a-63c0-455c-8d65-15387a7c26f6', 'd1a563ae-b3c3-4eab-a98d-57c27577e468', 'Clifford', 'cliffordjay.halcyondigital@gmail.com', '0912345678'),
('c1bc48b7-08b9-4df7-b975-28c12abd5c68', 'ae6d3012-6892-49f7-98ad-443f4e745612', 'Clifford', 'cliffordjay.halcyondigital@gmail.com', '0912345678');

-- --------------------------------------------------------

--
-- Table structure for table `user_transaction`
--

CREATE TABLE `user_transaction` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_transaction`
--

INSERT INTO `user_transaction` (`id`, `user_id`, `transaction_id`, `flag`) VALUES
('1', 'ae6d3012-6892-49f7-98ad-443f4e745612', 'db006dbd-233d-48ec-ad60-81fcd7b30c5b', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

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

--
-- Indexes for table `user_transaction`
--
ALTER TABLE `user_transaction`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
