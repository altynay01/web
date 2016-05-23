-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2016 at 11:34 AM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exampleproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `surname` text COLLATE utf8_unicode_ci NOT NULL,
  `email` text COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `admin` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `admin`) VALUES
(1, 'admin', 'adminovich', 'admin.kz@mail.ru', 'bfd59291e825b5f2bbf1eb76569f8fe7', '0'),
(2, 'Vasya', 'Pupkin', 'vasyapupkin@mail.ru', 'c17e3fadffb8fe22c3baa1916f31c35d', '1'),
(3, 'Altynay', ' Anuarbek', 'altynay.anuarbek@is.sdu.edu.kz', '8db1ba4daf143faa33bf2697d9151270', '1'),
(4, 'lala', 'lala', 'lala@mail.ru', '2e3817293fc275dbee74bd71ce6eb056', '1'),
(5, 'aigera', 'iajsoi', 'aigera@mail.ru', '69802c32f139ed8f2782b401a673e58d', '1'),
(8, 'dfghjgdjs', 'TYUIO', 'jh@mail.ru', '4b6def99ab559fd29ce10df453d6ddce', '1'),
(9, 'jojo', 'jiji', 'joji@mail.ru', '7510d498f23f5815d3376ea7bad64e29', '1'),
(10, '', '', '', 'd41d8cd98f00b204e9800998ecf8427e', '1'),
(11, '', '', '', 'd41d8cd98f00b204e9800998ecf8427e', '1'),
(12, 'ss', 's', 'ss', '3691308f2a4c2f6983f2880d32e29c84', '1'),
(13, '', '', '', 'd41d8cd98f00b204e9800998ecf8427e', '1'),
(14, '', 'fghjk', 'fghjh@mauhi.ru', '63e20e898389de083989e257bea88cf0', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
