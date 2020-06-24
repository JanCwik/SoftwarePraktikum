Create database IF NOT EXISTS shoppinglist;

USE shoppinglist;


/*Bis Zeile 19 in die SQL-Workbench kopieren um die Tabelle artikel zu erstellen und um einen Testdatensatz anzulegen*/
CREATE TABLE artikel(
    id INT,
    name VARCHAR(30),
    erstellungs_zeitpunkt datetime,
    einheit varchar(30),
    standardartikel bool,
    primary key(id)
);


INSERT INTO artikel VALUES (1, "Brot","2020-05-16 15:15:15", "Stück", false);



/*Bis Zeile 32 in die SQL-Workbench kopieren um die Tabelle einzelhaendler zu erstellen und um einen Testdatensatz anzulegen*/
CREATE TABLE einzelhaendler(
    id INT,
    name VARCHAR(30),
    erstellungs_zeitpunkt datetime,
    primary key(id)
);

INSERT INTO einzelhaendler VALUES (1, "Lidl","2020-05-16 15:15:15");
INSERT INTO einzelhaendler VALUES (2, "Penny","2020-05-16 15:15:15");


/*Bis Zeile 46 in die SQL-Workbench kopieren um die Tabelle benutzer zu erstellen und um einen Testdatensatz anzulegen*/
CREATE TABLE benutzer(
    id INT,
    name VARCHAR(30),
    erstellungs_zeitpunkt datetime,
    email varchar(60),
    google_id INT,
    primary key(id)
);

INSERT INTO benutzer VALUES (1, "mh300","2020-05-16 15:15:15", "mh300@hdm-stuttgart.de", 77);
INSERT INTO benutzer VALUES (2, "lh400","2020-05-16 15:15:15", "lh400@hdm-stuttgart.de", 99);



/*Bis Zeile 60 in die SQL-Workbench kopieren um die Tabelle benutzer zu erstellen und um einen Testdatensatz anzulegen*/
CREATE TABLE anwenderverbund(
    id INT,
    name VARCHAR(30),
    erstellungs_zeitpunkt datetime,
    primary key(id)
);


INSERT INTO anwenderverbund VALUES (1, "WG","2020-05-16 15:15:15");
INSERT INTO anwenderverbund VALUES (2, "lh400","2020-05-16 15:15:15");





