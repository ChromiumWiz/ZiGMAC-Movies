-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 13, 2021 at 04:15 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zigmacimdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `downloads`
--

DROP TABLE IF EXISTS `downloads`;
CREATE TABLE IF NOT EXISTS `downloads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(100) NOT NULL,
  `user` int(11) NOT NULL,
  `ttl` bigint(20) NOT NULL,
  `path` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `movie_data`
--

DROP TABLE IF EXISTS `movie_data`;
CREATE TABLE IF NOT EXISTS `movie_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `imdb_id` varchar(10) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `local_title` text,
  `runtime` varchar(20) DEFAULT NULL,
  `date_published` varchar(50) DEFAULT NULL,
  `genre` text,
  `img_url` text,
  `img_path` text,
  `summary` text,
  `actors` text,
  `rating` float DEFAULT NULL,
  `local_path` text,
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created time',
  `updated_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'updated time',
  `type` varchar(30) DEFAULT NULL COMMENT 'Movie or TV',
  `country` varchar(100) DEFAULT NULL,
  `imdb_fetch` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `imdb_id` (`imdb_id`),
  UNIQUE KEY `imdb_id_2` (`imdb_id`),
  UNIQUE KEY `imdb_id_3` (`imdb_id`),
  UNIQUE KEY `imdb_id_4` (`imdb_id`)
) ENGINE=MyISAM AUTO_INCREMENT=232 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movie_data`
--

INSERT INTO `movie_data` (`id`, `imdb_id`, `title`, `local_title`, `runtime`, `date_published`, `genre`, `img_url`, `img_path`, `summary`, `actors`, `rating`, `local_path`, `created_time`, `updated_time`, `type`, `country`, `imdb_fetch`) VALUES
(231, 'tt9777666', 'The Tomorrow War', '[mov-231]-The Tomorrow War 2021', '138 min', '2021-07-02', 'Action, Adventure, Drama', 'https://m.media-amazon.com/images/M/MV5BNTI2YTI0MWEtNGQ4OS00ODIzLWE1MWEtZGJiN2E3ZmM1OWI1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg', 'tt9777666.jpg', 'The world is stunned when a group of time travelers arrive from the year 2051 to deliver an urgent message: Thirty years in the future, mankind is losing a global war against a deadly alien species. The only hope for survival is for soldiers and civilians from the present to be transported to the future and join the fight. Among those recruited is high school teacher and family man Dan Forester (Chris Pratt). Determined to save the world for his young daughter, Dan teams up with a brilliant scientist (Yvonne Strahovski) and his estranged father (J.K. Simmons) in a desperate quest to rewrite the fate of the planet.', 'Chris Pratt, Yvonne Strahovski, J.K. Simmons', 6.6, 'F:/sym', '2021-09-18 14:09:23', '2021-09-18 14:13:44', 'movie', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `scratch`
--

DROP TABLE IF EXISTS `scratch`;
CREATE TABLE IF NOT EXISTS `scratch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `secret` varchar(100) NOT NULL,
  `used_date` datetime DEFAULT NULL,
  `used_by` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `used` tinyint(1) DEFAULT '0',
  `value` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `secret` (`secret`)
) ENGINE=MyISAM AUTO_INCREMENT=262 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scratch`
--

INSERT INTO `scratch` (`id`, `secret`, `used_date`, `used_by`, `created_by`, `created_on`, `used`, `value`) VALUES
(261, '$2b$10$5otoS6tUwoKNYCpU0mKPX.t.KsglVoFUls.bvSspjyCMCh1zlA9/W', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(260, '$2b$10$5otoS6tUwoKNYCpU0mKPX.otiQXZQcQde96g/UFzjSjQqefxBWRFm', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(259, '$2b$10$5otoS6tUwoKNYCpU0mKPX.YaehChoAfasPfFHlEbpqMxbE04P86Hu', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(258, '$2b$10$5otoS6tUwoKNYCpU0mKPX.LkzOdIrPbZFkeL35h.Wqb1TWM25g/zO', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(257, '$2b$10$5otoS6tUwoKNYCpU0mKPX.1NPE8f3GpcdO.ums4ffDs5OZw7oBsvG', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(256, '$2b$10$5otoS6tUwoKNYCpU0mKPX.DF.gLRRPjuZO3AaHziwq4p8H6RJG/Cu', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(255, '$2b$10$5otoS6tUwoKNYCpU0mKPX.43TypDea2OAbnnT./prihOWV.bKKAXa', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(254, '$2b$10$5otoS6tUwoKNYCpU0mKPX.5gLfc5Zt1AkWLpyfx53pYpPR6XKDfVu', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(253, '$2b$10$5otoS6tUwoKNYCpU0mKPX.vuFWktAcyYAG8ZDw7dJ5VcQGDCdjr4G', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(252, '$2b$10$5otoS6tUwoKNYCpU0mKPX.a1FmCUqcIq9WVbQGtaFRYe.BWxZaFnu', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(251, '$2b$10$5otoS6tUwoKNYCpU0mKPX.rgMD1ALbZui5wrl66ClD5huwHce9ebC', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(250, '$2b$10$5otoS6tUwoKNYCpU0mKPX.uFeyuXadZCOfxeehTrU/ufqEUkQGmp.', NULL, NULL, 0, '2021-09-25 14:27:46', 0, 100),
(249, '$2b$10$5otoS6tUwoKNYCpU0mKPX.b/Nhvo8Hmf30XXyzqh/mFhfdLxo70.a', '2021-09-28 08:11:26', 19, 0, '2021-09-25 14:27:46', 1, 100),
(248, '$2b$10$5otoS6tUwoKNYCpU0mKPX.KiILNTwwjPA0H.cm85lnBo9E2NPOMae', '2021-09-26 02:49:55', 19, 0, '2021-09-25 14:27:46', 1, 100),
(247, '$2b$10$5otoS6tUwoKNYCpU0mKPX.4IhnIjIdSiH5cqrZoUOMK5gIIt4ipFq', '2021-09-26 02:49:27', 19, 0, '2021-09-25 14:27:46', 1, 100),
(246, '$2b$10$5otoS6tUwoKNYCpU0mKPX.D/o.O4lhxe32Cw0suKPSSbjCJVk4b6i', '2021-09-25 12:25:47', 19, 0, '2021-09-25 14:27:46', 1, 100),
(245, '$2b$10$5otoS6tUwoKNYCpU0mKPX.Objp2fZxZUfO0/327wSxKhqF5r5WJqO', '2021-09-25 12:24:39', 19, 0, '2021-09-25 14:27:46', 1, 100),
(244, '$2b$10$5otoS6tUwoKNYCpU0mKPX.UzpxVSk.1cjzoUdRqTYLaNjUEuFP/Gi', '2021-09-25 12:18:46', 19, 0, '2021-09-25 14:27:46', 1, 100),
(243, '$2b$10$5otoS6tUwoKNYCpU0mKPX.yZEgafVdoi7JfQyXz5AHQDyXkABU38a', '2021-09-25 11:56:00', 19, 0, '2021-09-25 14:27:46', 1, 100),
(242, '$2b$10$5otoS6tUwoKNYCpU0mKPX.XWX3h/Fzb4ijGSXoI.ZdKemHLnaW/TS', '2021-09-25 11:50:30', 19, 0, '2021-09-25 14:27:44', 1, 100);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ttl` int(11) NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `balance` int(11) DEFAULT '0',
  `session` varchar(100) DEFAULT NULL,
  `ttl` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `balance`, `session`, `ttl`) VALUES
(18, 'a@b.com', '$2b$10$0/4NoKPcZ0YJ9nKEQ5iUzuPzfjULvpkrzFLiocrUbPFFLd25BKPc2', 0, '56d251c4-8d7b-4091-9268-9e7335c46028', '1632273472874'),
(19, 'senavirathne.l.b@gmail.com', '$2b$10$qPKsZWcu5N1EmaJ3WUpUfuS54gV03RqJndhkJEKvO4Hit9LApz7iO', 740, '', '1632816658027');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
