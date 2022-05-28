-- --------------------------------------------------------
-- Verkkotietokone:              127.0.0.1
-- Palvelinversio:               10.7.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Versio:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for matkakertomus
CREATE DATABASE IF NOT EXISTS `matkakertomus` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `matkakertomus`;

-- Dumping structure for taulu matkakertomus.kuva
CREATE TABLE IF NOT EXISTS `kuva` (
  `idkuva` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `kuva` varchar(100) DEFAULT 'empty_icon.jpg',
  `idtarina` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idkuva`),
  KEY `fk_kuva_tarina1` (`idtarina`),
  CONSTRAINT `fk_kuva_tarina1` FOREIGN KEY (`idtarina`) REFERENCES `tarina` (`idtarina`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table matkakertomus.kuva: ~4 rows (suunnilleen)
/*!40000 ALTER TABLE `kuva` DISABLE KEYS */;
INSERT INTO `kuva` (`idkuva`, `kuva`, `idtarina`) VALUES
	(100, 'pexels-asad-photo-maldives-1450372.jpg', 102),
	(101, 'pexels-mentatdgt-GF-937416.jpg', 100),
	(102, 'pexels-pixabay-fant-247431.jpg', 102),
	(103, 'pexels-benjamin-shanghai-2362004.jpg', 101);
/*!40000 ALTER TABLE `kuva` ENABLE KEYS */;

-- Dumping structure for taulu matkakertomus.matka
CREATE TABLE IF NOT EXISTS `matka` (
  `idmatkaaja` int(10) unsigned NOT NULL,
  `alkupvm` date DEFAULT NULL,
  `loppupvm` date DEFAULT NULL,
  `yksityinen` tinyint(4) DEFAULT NULL,
  `idmatka` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nimi` varchar(45) NOT NULL,
  `luomispvm` datetime NOT NULL,
  PRIMARY KEY (`idmatka`),
  KEY `fk_matkaaja_has_matkakohde_matkaaja_idx` (`idmatkaaja`),
  CONSTRAINT `fk_matkaaja_has_matkakohde_matkaaja` FOREIGN KEY (`idmatkaaja`) REFERENCES `matkaaja` (`idmatkaaja`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table matkakertomus.matka: ~3 rows (suunnilleen)
/*!40000 ALTER TABLE `matka` DISABLE KEYS */;
INSERT INTO `matka` (`idmatkaaja`, `alkupvm`, `loppupvm`, `yksityinen`, `idmatka`, `nimi`, `luomispvm`) VALUES
	(65, '2022-04-01', '2022-04-21', 0, 112, 'Malediivien kauniit rannat', '2022-04-21 15:59:36'),
	(65, '2022-02-18', '2022-02-22', 0, 113, 'Kaupunkilomaa, ah ihanaa!', '2022-04-21 15:59:36'),
	(59, '2022-04-11', '2022-04-20', 0, 114, 'Tuuli humisee...', '2022-04-21 15:51:36');
/*!40000 ALTER TABLE `matka` ENABLE KEYS */;

-- Dumping structure for taulu matkakertomus.matkaaja
CREATE TABLE IF NOT EXISTS `matkaaja` (
  `idmatkaaja` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `etunimi` varchar(45) NOT NULL,
  `sukunimi` varchar(45) NOT NULL,
  `nimimerkki` varchar(45) NOT NULL,
  `paikkakunta` varchar(45) DEFAULT NULL,
  `esittely` varchar(500) DEFAULT NULL,
  `kuva` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`idmatkaaja`),
  UNIQUE KEY `nimimerkki_UNIQUE` (`nimimerkki`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table matkakertomus.matkaaja: ~3 rows (suunnilleen)
/*!40000 ALTER TABLE `matkaaja` DISABLE KEYS */;
INSERT INTO `matkaaja` (`idmatkaaja`, `etunimi`, `sukunimi`, `nimimerkki`, `paikkakunta`, `esittely`, `kuva`, `email`, `password`) VALUES
	(59, 'Jaana', 'Vikström', 'viki1', 'Helsinki', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.', 'pexels-luizclas-1848565 (2).jpg', 'jaana1@moikka.co.uk', 'dssdsasa'),
	(65, 'Topias', 'Blomkvist', 'Maikkari0', 'Kitee', 'Hei olen uusi täällä', 'pexels-andrea-piacquadio-845457 (2).jpg', 'palikka732@moikka.co.uk', 'dsssa'),
	(77, 'Marco', 'Polo', 'Polo', 'Boston', '"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.\r\nA small river named Duden flows by their place and supplies it with the necessary regelialia', 'pexels-pixabay-39866 (2).jpg', 'mpolo@fixit.com', 'dsssgfggga');
/*!40000 ALTER TABLE `matkaaja` ENABLE KEYS */;

-- Dumping structure for taulu matkakertomus.matkakohde
CREATE TABLE IF NOT EXISTS `matkakohde` (
  `idmatkakohde` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `kohdenimi` varchar(45) DEFAULT NULL,
  `maa` varchar(45) DEFAULT NULL,
  `paikkakunta` varchar(45) DEFAULT NULL,
  `kuvausteksti` varchar(500) DEFAULT NULL,
  `kuva` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idmatkakohde`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table matkakertomus.matkakohde: ~2 rows (suunnilleen)
/*!40000 ALTER TABLE `matkakohde` DISABLE KEYS */;
INSERT INTO `matkakohde` (`idmatkakohde`, `kohdenimi`, `maa`, `paikkakunta`, `kuvausteksti`, `kuva`) VALUES
	(100, 'Shanghai', 'Kiina', 'Shanghai', 'Shanghai on Kiinan \r\nsuurin ja samalla maailman suurin kaupunki asukasluvultaan, \r\njos metropolialuetta ei lasketa mukaan', 'pexels-benjamin-shanghai-2362004.jpg'),
	(101, 'Malediivit', 'Malediivit', 'Malé', 'Malediivit eli Malediivien tasavaltaon noin \r\n800 kilometriä pitkä saaristo Intian eteläkärjen lounaispuolella. Malediiveihin kuuluu\r\n kaikkiaan 1 190 saarta ja atollia, joista 200 on asuttua ja lisäksi 80\r\n saarella on matkailijoiden majoituspalveluita. Saaret ovat suosittu turistikohde.', 'pexels-asad-photo-maldives-1591373.jpg');
/*!40000 ALTER TABLE `matkakohde` ENABLE KEYS */;

-- Dumping structure for taulu matkakertomus.tarina
CREATE TABLE IF NOT EXISTS `tarina` (
  `idtarina` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pvm` date NOT NULL,
  `teksti` varchar(500) DEFAULT NULL,
  `idmatkakohde` int(10) unsigned NOT NULL,
  `idmatka` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idtarina`) USING BTREE,
  KEY `fk_tarina_matkakohde1_idx` (`idmatkakohde`),
  KEY `fk_tarina_matka1_idx` (`idmatka`),
  CONSTRAINT `fk_tarina_matka1` FOREIGN KEY (`idmatka`) REFERENCES `matka` (`idmatka`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_tarina_matkakohde1` FOREIGN KEY (`idmatkakohde`) REFERENCES `matkakohde` (`idmatkakohde`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table matkakertomus.tarina: ~4 rows (suunnilleen)
/*!40000 ALTER TABLE `tarina` DISABLE KEYS */;
INSERT INTO `tarina` (`idtarina`, `pvm`, `teksti`, `idmatkakohde`, `idmatka`) VALUES
	(100, '2022-02-18', 'Kaksi merkkiä sanassa Shanghai tarkoittavat kirjaimellisesti\r\n ’ylös/yläpuolella’ ja ’meri’. Tämän nimen kaupunki sai Song-\r\n dynastian aikana noin vuonna 1075, jolloin joen luona oli jo\r\n  kalastajakylä nimeltä Shanghai. On epäselvää, mistä nimi tuli j\r\n  a miten se tulisi tulkita, vaikka kirjallisuus esittää yleensä\r\n   ajatusta ’meren päälle’ tai ’paikka laajan vesialueen yläosassa', 100, 113),
	(101, '2022-02-20', 'Joihinkin muihin Kiinan kaupunkeihin verrattuna Shanghai on muodostunut verrattain myöhään. \r\nEnnen 1000-lukua alue tunnettiin nimillä Shen tai Hudu. Se oli harvaan asuttua aluetta, \r\nja sen kehitystä hidasti suistotasangon suojattomuus. Paikalliset harjoittivat lähinnä \r\nkalastusta. Song-dynastian aikana Taijärvellä Shanghaista länteen alettiin harjoittaa maataloutta \r\nvedestä vallatuilla suojaisemmilla alueilla, mikä johti taloudelliseen kehitykseen.', 100, 113),
	(102, '2022-04-11', 'Arkeologiset löydöt viittaavat siihen, että jo 2000-luvulla eaa. \r\nsaaret olivat varhaisten Egyptin, Mesopotamian ja Intian kulttuurien \r\nmerenkulkijoiden reitillä.[3] Ensimmäiset Malediiveille asettuneet\r\n ihmiset olivat kotoisin Intiasta ja Sri Lankalta. Malediivien nykyinen \r\n kieli divehi on sukua Sri Lankalla puhutulle singaleesille. 1100-luvulla \r\n tuli merenkulkijoita Itä-Afrikasta ja arabimaista.', 101, 112),
	(103, '2022-04-17', 'Malediivit on maailman matalin valtio. Sen korkein kohta on vain 2,4 metriä merenpinnan\r\n yläpuolella, ja 80 prosenttia maasta on alle metrin korkeudella. Ilmaston lämpenemisen\r\n  aiheuttama mahdollinen merenpinnan nousu on vakava uhka Malediivien olemassaololle.\r\n   Maan presidentti Mohamed Nasheed on \r\nilmoittanut, että maan turismituloista aletaan säästää varoja uuden kotimaan ostoa varten', 101, 114);
/*!40000 ALTER TABLE `tarina` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
