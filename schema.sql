-- --------------------------------------------------------
-- Διακομιστής:                  127.0.0.1
-- Έκδοση διακομιστή:            10.4.32-MariaDB - mariadb.org binary distribution
-- Λειτ. σύστημα διακομιστή:     Win64
-- HeidiSQL Έκδοση:              12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for πίνακας ludo.board
CREATE TABLE IF NOT EXISTS `board` (
  `x` tinyint(1) NOT NULL,
  `y` tinyint(1) NOT NULL,
  `b_color` enum('R','B','G','Y','W','RB','BG','GY','YR','RBGY','S','S_R','S_B','S_G','S_Y') NOT NULL,
  `b_fun` enum('R_sleep','B_sleep','G_sleep','Y_sleep','R_start','B_start','G_start','Y_start','W','S','R_finals','B_finals','G_finals','Y_finals','R_end','B_end','G_end','Y_end') DEFAULT NULL,
  PRIMARY KEY (`x`,`y`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ludo.board: ~121 rows (approximately)
INSERT INTO `board` (`x`, `y`, `b_color`, `b_fun`) VALUES
	(1, 1, 'B', NULL),
	(1, 2, 'B', NULL),
	(1, 3, 'B', NULL),
	(1, 4, 'B', NULL),
	(1, 5, 'W', 'W'),
	(1, 6, 'W', 'W'),
	(1, 7, 'W', 'W'),
	(1, 8, 'G', NULL),
	(1, 9, 'G', NULL),
	(1, 10, 'G', NULL),
	(1, 11, 'G', NULL),
	(2, 1, 'B', NULL),
	(2, 2, 'W', 'B_sleep'),
	(2, 3, 'W', 'B_sleep'),
	(2, 4, 'B', NULL),
	(2, 5, 'S', 'S'),
	(2, 6, 'G', 'G_finals'),
	(2, 7, 'S_G', 'G_start'),
	(2, 8, 'G', NULL),
	(2, 9, 'W', 'G_sleep'),
	(2, 10, 'W', 'G_sleep'),
	(2, 11, 'G', NULL),
	(3, 1, 'B', NULL),
	(3, 2, 'W', 'B_sleep'),
	(3, 3, 'W', 'B_sleep'),
	(3, 4, 'B', NULL),
	(3, 5, 'W', 'W'),
	(3, 6, 'G', 'G_finals'),
	(3, 7, 'W', 'W'),
	(3, 8, 'G', NULL),
	(3, 9, 'W', 'G_sleep'),
	(3, 10, 'W', 'G_sleep'),
	(3, 11, 'G', NULL),
	(4, 1, 'B', NULL),
	(4, 2, 'B', NULL),
	(4, 3, 'B', NULL),
	(4, 4, 'B', NULL),
	(4, 5, 'W', 'W'),
	(4, 6, 'G', 'G_finals'),
	(4, 7, 'W', 'W'),
	(4, 8, 'G', NULL),
	(4, 9, 'G', NULL),
	(4, 10, 'G', NULL),
	(4, 11, 'G', NULL),
	(5, 1, 'W', 'W'),
	(5, 2, 'S_B', 'B_start'),
	(5, 3, 'W', 'W'),
	(5, 4, 'W', 'W'),
	(5, 5, 'BG', NULL),
	(5, 6, 'G', 'G_end'),
	(5, 7, 'GY', NULL),
	(5, 8, 'W', 'W'),
	(5, 9, 'W', 'W'),
	(5, 10, 'S', 'S'),
	(5, 11, 'W', 'W'),
	(6, 1, 'W', 'W'),
	(6, 2, 'B', 'B_finals'),
	(6, 3, 'B', 'B_finals'),
	(6, 4, 'B', 'B_finals'),
	(6, 5, 'B', 'B_end'),
	(6, 6, 'RBGY', NULL),
	(6, 7, 'Y', 'Y_end'),
	(6, 8, 'Y', 'Y_finals'),
	(6, 9, 'Y', 'Y_finals'),
	(6, 10, 'Y', 'Y_finals'),
	(6, 11, 'W', 'W'),
	(7, 1, 'W', 'W'),
	(7, 2, 'S', 'S'),
	(7, 3, 'W', 'W'),
	(7, 4, 'W', 'W'),
	(7, 5, 'RB', NULL),
	(7, 6, 'R', 'R_end'),
	(7, 7, 'YR', NULL),
	(7, 8, 'W', 'W'),
	(7, 9, 'W', 'W'),
	(7, 10, 'S_Y', 'Y_start'),
	(7, 11, 'W', 'W'),
	(8, 1, 'R', NULL),
	(8, 2, 'R', NULL),
	(8, 3, 'R', NULL),
	(8, 4, 'R', NULL),
	(8, 5, 'W', 'W'),
	(8, 6, 'R', 'R_finals'),
	(8, 7, 'W', 'W'),
	(8, 8, 'Y', NULL),
	(8, 9, 'Y', NULL),
	(8, 10, 'Y', NULL),
	(8, 11, 'Y', NULL),
	(9, 1, 'R', NULL),
	(9, 2, 'W', 'R_sleep'),
	(9, 3, 'W', 'R_sleep'),
	(9, 4, 'R', NULL),
	(9, 5, 'W', 'W'),
	(9, 6, 'R', 'R_finals'),
	(9, 7, 'W', 'W'),
	(9, 8, 'Y', NULL),
	(9, 9, 'W', 'Y_sleep'),
	(9, 10, 'W', 'Y_sleep'),
	(9, 11, 'Y', NULL),
	(10, 1, 'R', NULL),
	(10, 2, 'W', 'R_sleep'),
	(10, 3, 'W', 'R_sleep'),
	(10, 4, 'R', NULL),
	(10, 5, 'S_R', 'R_start'),
	(10, 6, 'R', 'R_finals'),
	(10, 7, 'S', 'S'),
	(10, 8, 'Y', NULL),
	(10, 9, 'W', 'Y_sleep'),
	(10, 10, 'W', 'Y_sleep'),
	(10, 11, 'Y', NULL),
	(11, 1, 'R', NULL),
	(11, 2, 'R', NULL),
	(11, 3, 'R', NULL),
	(11, 4, 'R', NULL),
	(11, 5, 'W', 'W'),
	(11, 6, 'W', 'W'),
	(11, 7, 'W', 'W'),
	(11, 8, 'Y', NULL),
	(11, 9, 'Y', NULL),
	(11, 10, 'Y', NULL),
	(11, 11, 'Y', NULL);

-- Dumping structure for procedure ludo.check_status
DELIMITER //
CREATE PROCEDURE `check_status`()
BEGIN
	UPDATE `game_status` SET status='initialized' WHERE status='not active' AND logged='1';
	UPDATE `game_status` SET status='started',p_turn='R' WHERE status='initialized' AND logged IN('2','3','4');
	UPDATE `game_status` SET status='aborted',result_1=(select p_color from players),p_turn=NULL,result_2=NULL,result_3=NULL WHERE status='started' AND logged='1';
END//
DELIMITER ;

-- Dumping structure for procedure ludo.clean_pawns
DELIMITER //
CREATE PROCEDURE `clean_pawns`()
BEGIN
	REPLACE INTO `pawns` SELECT * FROM `pawns_empty`;
	UPDATE `players` SET username=NULL, token=NULL;
   UPDATE `game_status` SET `status`='not active', `p_turn`=NULL, `result_1`=NULL, `result_2`=NULL, `result_3`=NULL;
END//
DELIMITER ;

-- Dumping structure for πίνακας ludo.game_status
CREATE TABLE IF NOT EXISTS `game_status` (
  `status` enum('not active','initialized','started','ended','aborted') NOT NULL DEFAULT 'not active',
  `p_turn` enum('R','B','G','Y') DEFAULT NULL,
  `result_1` enum('R','B','G','Y') DEFAULT NULL,
  `result_2` enum('R','B','G','Y') DEFAULT NULL,
  `result_3` enum('R','B','G','Y') DEFAULT NULL,
  `last_change` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `logged` enum('1','2','3','4') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ludo.game_status: ~0 rows (approximately)
INSERT INTO `game_status` (`status`, `p_turn`, `result_1`, `result_2`, `result_3`, `last_change`, `logged`) VALUES
	('started', 'B', NULL, NULL, NULL, '2023-12-30 11:43:53', NULL);

-- Dumping structure for procedure ludo.move_piece
DELIMITER //
CREATE PROCEDURE `move_piece`(x2 TINYINT, y2 TINYINT, num CHAR, color CHAR, steps CHAR)
BEGIN
	DECLARE x1,y1 TINYINT;
	SELECT x,y INTO x1,y1 FROM `pawns` WHERE p_color=color AND p_num=num;
	UPDATE `pawns` SET x=x2, y=y2, sum=steps WHERE p_color=color AND p_num=num;
	UPDATE `pawns` SET p_color=NULL, p_num=NULL WHERE x=x1 AND y=y1;
	
	UPDATE `game_status` SET p_turn = (case 
														WHEN color = 'R' then 'B'
														WHEN color = 'B' then 'G'
														WHEN color = 'G' then 'Y'
														WHEN color = 'Y' then 'R'
														ELSE null
														END);
END//
DELIMITER ;

-- Dumping structure for procedure ludo.new_game
DELIMITER //
CREATE PROCEDURE `new_game`()
BEGIN
	DELETE FROM `players`;
	INSERT INTO `players` VALUES (NULL,'R',NULL,NULL),(NULL,'B',NULL,NULL),(NULL,'G',NULL,NULL),(NULL,'Y',NULL,NULL);
END//
DELIMITER ;

-- Dumping structure for πίνακας ludo.pawns
CREATE TABLE IF NOT EXISTS `pawns` (
  `p_color` enum('R','B','G','Y') NOT NULL,
  `p_num` enum('1','2','3','4') NOT NULL,
  `x` tinyint(1) NOT NULL,
  `y` tinyint(1) NOT NULL,
  `sum` smallint(1) DEFAULT NULL,
  PRIMARY KEY (`p_color`,`p_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ludo.pawns: ~16 rows (approximately)
INSERT INTO `pawns` (`p_color`, `p_num`, `x`, `y`, `sum`) VALUES
	('R', '1', 9, 2, NULL),
	('R', '2', 9, 3, NULL),
	('R', '3', 10, 2, NULL),
	('R', '4', 9, 5, 2),
	('B', '1', 2, 2, NULL),
	('B', '2', 2, 3, NULL),
	('B', '3', 3, 2, NULL),
	('B', '4', 3, 3, NULL),
	('G', '1', 2, 9, NULL),
	('G', '2', 2, 10, NULL),
	('G', '3', 3, 9, NULL),
	('G', '4', 3, 10, NULL),
	('Y', '1', 9, 9, NULL),
	('Y', '2', 9, 10, NULL),
	('Y', '3', 10, 9, NULL),
	('Y', '4', 10, 10, NULL);

-- Dumping structure for πίνακας ludo.pawns_empty
CREATE TABLE IF NOT EXISTS `pawns_empty` (
  `p_color` enum('R','B','G','Y') NOT NULL,
  `p_num` enum('1','2','3','4') NOT NULL,
  `x` tinyint(1) NOT NULL,
  `y` tinyint(1) NOT NULL,
  `sum` smallint(1) DEFAULT NULL,
  PRIMARY KEY (`p_color`,`p_num`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table ludo.pawns_empty: ~16 rows (approximately)
INSERT INTO `pawns_empty` (`p_color`, `p_num`, `x`, `y`, `sum`) VALUES
	('R', '1', 9, 2, NULL),
	('R', '2', 9, 3, NULL),
	('R', '3', 10, 2, NULL),
	('R', '4', 10, 3, NULL),
	('B', '1', 2, 2, NULL),
	('B', '2', 2, 3, NULL),
	('B', '3', 3, 2, NULL),
	('B', '4', 3, 3, NULL),
	('G', '1', 2, 9, NULL),
	('G', '2', 2, 10, NULL),
	('G', '3', 3, 9, NULL),
	('G', '4', 3, 10, NULL),
	('Y', '1', 9, 9, NULL),
	('Y', '2', 9, 10, NULL),
	('Y', '3', 10, 9, NULL),
	('Y', '4', 10, 10, NULL);

-- Dumping structure for πίνακας ludo.players
CREATE TABLE IF NOT EXISTS `players` (
  `username` varchar(20) DEFAULT NULL,
  `p_color` enum('R','B','G','Y') NOT NULL,
  `token` varchar(100) DEFAULT NULL,
  `last_action` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`p_color`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ludo.players: ~4 rows (approximately)
INSERT INTO `players` (`username`, `p_color`, `token`, `last_action`) VALUES
	(NULL, 'R', NULL, NULL),
	(NULL, 'B', NULL, NULL),
	(NULL, 'G', NULL, NULL),
	(NULL, 'Y', NULL, NULL);

-- Dumping structure for πίνακας ludo.positions
CREATE TABLE IF NOT EXISTS `positions` (
  `x` tinyint(1) NOT NULL,
  `y` tinyint(1) NOT NULL,
  `pos` smallint(1) DEFAULT NULL,
  PRIMARY KEY (`x`,`y`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ludo.positions: ~121 rows (approximately)
INSERT INTO `positions` (`x`, `y`, `pos`) VALUES
	(1, 1, NULL),
	(1, 2, NULL),
	(1, 3, NULL),
	(1, 4, NULL),
	(1, 5, 16),
	(1, 6, 17),
	(1, 7, 18),
	(1, 8, NULL),
	(1, 9, NULL),
	(1, 10, NULL),
	(1, 11, NULL),
	(2, 1, NULL),
	(2, 2, 200),
	(2, 3, 201),
	(2, 4, NULL),
	(2, 5, 15),
	(2, 6, 304),
	(2, 7, 19),
	(2, 8, NULL),
	(2, 9, 300),
	(2, 10, 301),
	(2, 11, NULL),
	(3, 1, NULL),
	(3, 2, 202),
	(3, 3, 203),
	(3, 4, NULL),
	(3, 5, 14),
	(3, 6, 305),
	(3, 7, 20),
	(3, 8, NULL),
	(3, 9, 302),
	(3, 10, 303),
	(3, 11, NULL),
	(4, 1, NULL),
	(4, 2, NULL),
	(4, 3, NULL),
	(4, 4, NULL),
	(4, 5, 13),
	(4, 6, 306),
	(4, 7, 21),
	(4, 8, NULL),
	(4, 9, NULL),
	(4, 10, NULL),
	(4, 11, NULL),
	(5, 1, 9),
	(5, 2, 10),
	(5, 3, 11),
	(5, 4, 12),
	(5, 5, NULL),
	(5, 6, 307),
	(5, 7, NULL),
	(5, 8, 22),
	(5, 9, 23),
	(5, 10, 24),
	(5, 11, 25),
	(6, 1, 8),
	(6, 2, 204),
	(6, 3, 205),
	(6, 4, 206),
	(6, 5, 207),
	(6, 6, NULL),
	(6, 7, 407),
	(6, 8, 406),
	(6, 9, 405),
	(6, 10, 404),
	(6, 11, 26),
	(7, 1, 7),
	(7, 2, 6),
	(7, 3, 5),
	(7, 4, 4),
	(7, 5, NULL),
	(7, 6, 107),
	(7, 7, NULL),
	(7, 8, 30),
	(7, 9, 29),
	(7, 10, 28),
	(7, 11, 27),
	(8, 1, NULL),
	(8, 2, NULL),
	(8, 3, NULL),
	(8, 4, NULL),
	(8, 5, 3),
	(8, 6, 106),
	(8, 7, 31),
	(8, 8, NULL),
	(8, 9, NULL),
	(8, 10, NULL),
	(8, 11, NULL),
	(9, 1, NULL),
	(9, 2, 100),
	(9, 3, 101),
	(9, 4, NULL),
	(9, 5, 2),
	(9, 6, 105),
	(9, 7, 32),
	(9, 8, NULL),
	(9, 9, 400),
	(9, 10, 401),
	(9, 11, NULL),
	(10, 1, NULL),
	(10, 2, 102),
	(10, 3, 103),
	(10, 4, NULL),
	(10, 5, 1),
	(10, 6, 104),
	(10, 7, 33),
	(10, 8, NULL),
	(10, 9, 402),
	(10, 10, 403),
	(10, 11, NULL),
	(11, 1, NULL),
	(11, 2, NULL),
	(11, 3, NULL),
	(11, 4, NULL),
	(11, 5, 36),
	(11, 6, 35),
	(11, 7, 34),
	(11, 8, NULL),
	(11, 9, NULL),
	(11, 10, NULL),
	(11, 11, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
