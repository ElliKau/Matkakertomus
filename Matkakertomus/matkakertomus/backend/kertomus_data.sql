  INSERT INTO `matkakertomus`.`matkakohde` 
(`idmatkakohde`,`kohdenimi`, `maa`, `paikkakunta`, `kuvausteksti`,`kuva`) 
VALUES ('100', 'Shanghai', 'Kiina', 'Shanghai', 'Shanghai on Kiinan 
suurin ja samalla maailman suurin kaupunki asukasluvultaan, 
jos metropolialuetta ei lasketa mukaan', 'pexels-benjamin-shanghai-2362004.jpg');
INSERT INTO `matkakertomus`.`matkakohde` 
(`idmatkakohde`,`kohdenimi`, `maa`, `paikkakunta`, `kuvausteksti`, `kuva`) 
VALUES ('101', 'Malediivit', 'Malediivit', 'Malé', 'Malediivit eli Malediivien tasavaltaon noin 
800 kilometriä pitkä saaristo Intian eteläkärjen lounaispuolella. Malediiveihin kuuluu
 kaikkiaan 1 190 saarta ja atollia, joista 200 on asuttua ja lisäksi 80
 saarella on matkailijoiden majoituspalveluita. Saaret ovat suosittu turistikohde.', 'pexels-asad-photo-maldives-1591373.jpg');


INSERT INTO `matkakertomus`.`matkaaja` 
(`idmatkaaja`,`etunimi`, `sukunimi`, `nimimerkki`, `paikkakunta`, `esittely`, `kuva`, `email`, `password`) 
VALUES ('65','Topias', 'Blomkvist', 'Maikkari0', 'Kitee', 'Hei olen uusi täällä', 'pexels-andrea-piacquadio-845457 (2).jpg',
 'palikka732@moikka.co.uk', 'dsssa'); 
 INSERT INTO `matkakertomus`.`matkaaja` 
(`idmatkaaja`,`etunimi`, `sukunimi`, `nimimerkki`, `paikkakunta`, `esittely`, `kuva`, `email`, `password`) 
VALUES ('59','Jaana', 'Vikström', 'viki1', 'Helsinki', "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
 'pexels-luizclas-1848565 (2).jpg', 'jaana1@moikka.co.uk', 'dssdsasa'); 
 INSERT INTO `matkakertomus`.`matkaaja` 
(`idmatkaaja`,`etunimi`, `sukunimi`, `nimimerkki`, `paikkakunta`, `esittely`, `kuva`, `email`, `password`) 
VALUES ('77','Marco', 'Polo', 'Polo', 'Boston', '"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
A small river named Duden flows by their place and supplies it with the necessary regelialia', 'pexels-pixabay-39866 (2).jpg',
'mpolo@fixit.com', 'dsssgfggga');


INSERT INTO `matkakertomus`.`matka` 
(`idmatkaaja`, `alkupvm`, `loppupvm`, `yksityinen`, `idmatka`, `nimi`, `luomispvm`) 
VALUES ('65', '2022-04-01', '2022-04-21', '0', '112', 'Malediivien kauniit rannat', '2022-04-21 15:59:36');
INSERT INTO `matkakertomus`.`matka` 
(`idmatkaaja`, `alkupvm`, `loppupvm`, `yksityinen`, `idmatka`, `nimi`, `luomispvm`) 
VALUES ('65', '2022-02-18', '2022-02-22', '0', '113', 'Kaupunkilomaa, ah ihanaa!', '2022-04-21 15:59:36');
INSERT INTO `matkakertomus`.`matka` 
(`idmatkaaja`, `alkupvm`, `loppupvm`, `yksityinen`, `idmatka`, `nimi`, `luomispvm`) 
VALUES ('59', '2022-04-11', '2022-04-20', '0', '114', 'Tuuli humisee...', '2022-04-21 15:51:36');


INSERT INTO `matkakertomus`.`tarina` 
(`idtarina`,`pvm`, `teksti`, `idmatkakohde`, `idmatka`) 
VALUES ('100', '2022-02-18', 
'Kaksi merkkiä sanassa Shanghai tarkoittavat kirjaimellisesti
 ’ylös/yläpuolella’ ja ’meri’. Tämän nimen kaupunki sai Song-
 dynastian aikana noin vuonna 1075, jolloin joen luona oli jo
  kalastajakylä nimeltä Shanghai. On epäselvää, mistä nimi tuli j
  a miten se tulisi tulkita, vaikka kirjallisuus esittää yleensä
   ajatusta ’meren päälle’ tai ’paikka laajan vesialueen yläosassa', '100', '113');
INSERT INTO `matkakertomus`.`tarina` 
(`idtarina`,`pvm`, `teksti`, `idmatkakohde`, `idmatka`) 
VALUES ('101','2022-02-20', 
'Joihinkin muihin Kiinan kaupunkeihin verrattuna Shanghai on muodostunut verrattain myöhään. 
Ennen 1000-lukua alue tunnettiin nimillä Shen tai Hudu. Se oli harvaan asuttua aluetta, 
ja sen kehitystä hidasti suistotasangon suojattomuus. Paikalliset harjoittivat lähinnä 
kalastusta. Song-dynastian aikana Taijärvellä Shanghaista länteen alettiin harjoittaa maataloutta 
vedestä vallatuilla suojaisemmilla alueilla, mikä johti taloudelliseen kehitykseen.', '100', '113');
INSERT INTO `matkakertomus`.`tarina` 
(`idtarina`,`pvm`, `teksti`, `idmatkakohde`, `idmatka`) 
VALUES ('102', '2022-04-11', 
'Arkeologiset löydöt viittaavat siihen, että jo 2000-luvulla eaa. 
saaret olivat varhaisten Egyptin, Mesopotamian ja Intian kulttuurien 
merenkulkijoiden reitillä.[3] Ensimmäiset Malediiveille asettuneet
 ihmiset olivat kotoisin Intiasta ja Sri Lankalta. Malediivien nykyinen 
 kieli divehi on sukua Sri Lankalla puhutulle singaleesille. 1100-luvulla 
 tuli merenkulkijoita Itä-Afrikasta ja arabimaista.', '101', '112');
 INSERT INTO `matkakertomus`.`tarina` 
(`pvm`, `teksti`, `idmatkakohde`, `idmatka`) 
VALUES ('2022-04-17', 
'Malediivit on maailman matalin valtio. Sen korkein kohta on vain 2,4 metriä merenpinnan
 yläpuolella, ja 80 prosenttia maasta on alle metrin korkeudella. Ilmaston lämpenemisen
  aiheuttama mahdollinen merenpinnan nousu on vakava uhka Malediivien olemassaololle.
   Maan presidentti Mohamed Nasheed on 
ilmoittanut, että maan turismituloista aletaan säästää varoja uuden kotimaan ostoa varten', '101', '114');


INSERT INTO `matkakertomus`.`kuva` (`idkuva`,`kuva`, `idtarina`) 
VALUES ('100','pexels-asad-photo-maldives-1450372.jpg', '102');
INSERT INTO `matkakertomus`.`kuva` (`idkuva`,`kuva`, `idtarina`) 
VALUES ('101','pexels-mentatdgt-GF-937416.jpg', '100');
INSERT INTO `matkakertomus`.`kuva` (`idkuva`,`kuva`, `idtarina`) 
VALUES ('102','pexels-pixabay-fant-247431.jpg', '102');
INSERT INTO `matkakertomus`.`kuva` (`idkuva`,`kuva`, `idtarina`) 
VALUES ('103','pexels-benjamin-shanghai-2362004.jpg', '101');






