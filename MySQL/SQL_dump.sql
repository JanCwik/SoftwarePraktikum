/*Erstellt die Datenbank, falls diese nicht bereits angelegt wurde*/
Create database IF NOT EXISTS shoppinglist;

/*Gibt an welche Datenbank für die Nachfolgenden Statements verwendet werden soll*/
USE shoppinglist;


/*Erstellt die Tabelle "artikel" mit den jeweiligen Attributen
  --> INT = Integer (INT ist das gleiche wie INT(11))
  --> VARCHAR = String (in Klammern wird angegeben wie viele Zeichen der String maximal enthalten darf
  --> NOT NULL = Das Feld darf nicht leer sein
  --> PRIMARY KEY = Gibt an welches Attribut der Primärschlüssel ist*/
DROP TABLE IF EXISTS `artikel`;
CREATE TABLE artikel(
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    erstellungs_zeitpunkt datetime NOT NULL,
    einheit varchar(30) NOT NULL,
    standardartikel bool NOT NULL,
    PRIMARY KEY (id)
);

/*Legt einen Testdatensatz in der Tabelle "artikel" an*/
INSERT INTO artikel VALUES (1, "Brot","2020-05-16 15:15:15", "Stück", false);



/*Erstellt die Tabelle "einzelhaendler" mit den jeweiligen Attributen*/
DROP TABLE IF EXISTS `einzelhaendler`;
CREATE TABLE einzelhaendler(
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    erstellungs_zeitpunkt datetime NOT NULL,
    PRIMARY KEY (id)
);

/*Legt einen Testdatensatz in der Tabelle "einzelhaendler" an*/
INSERT INTO einzelhaendler VALUES (1, "Lidl","2020-05-16 15:15:15");
INSERT INTO einzelhaendler VALUES (2, "Penny","2020-05-16 15:15:15");


/*Erstellt die Tabelle "benutzer" mit den jeweiligen Attributen
  --> datetime = Datentyp mit dem Format: YYYY-MM-DD hh:mm:ss*/
DROP TABLE IF EXISTS `benutzer`;
CREATE TABLE benutzer(
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    erstellungs_zeitpunkt datetime NOT NULL,
    email varchar(60) NOT NULL,
    google_id INT NOT NULL,
    PRIMARY KEY (id)
);

/*Legt einen Testdatensatz in der Tabelle "benutzer" an*/
INSERT INTO benutzer VALUES (1, "mh300","2020-05-16 15:15:15", "mh300@hdm-stuttgart.de", 77);
INSERT INTO benutzer VALUES (2, "lh400","2020-05-16 15:15:15", "lh400@hdm-stuttgart.de", 99);



/*Erstellt die Tabelle "anwenderverbund" mit den jeweiligen Attributen*/
DROP TABLE IF EXISTS `anwenderverbund`;
CREATE TABLE anwenderverbund(
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    erstellungs_zeitpunkt datetime NOT NULL,
    PRIMARY KEY (id)
);

/*Legt einen Testdatensatz in der Tabelle "benutzer" an*/
INSERT INTO anwenderverbund VALUES (1, "WG","2020-05-16 15:15:15");
INSERT INTO anwenderverbund VALUES (2, "lh400","2020-05-16 15:15:15");


/*Erstellt die Tabelle "einkaufsliste" mit den jeweiligen Attributen*/
DROP TABLE IF EXISTS `einkaufsliste`;
CREATE TABLE einkaufsliste(
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    erstellungs_zeitpunkt datetime NOT NULL,
    aenderungs_zeitpunkt datetime,
    anwenderverbund_id INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO einkaufsliste VALUES (1, "KW40","2020-05-16 15:15:15", None, 1);
INSERT INTO einkaufsliste VALUES (1, "KW40","2020-05-16 15:15:15", None, 1);



