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
    adresse varchar(30),
    primary key(id)
);

INSERT INTO einzelhaendler VALUES (1, "Penny","2020-05-16 15:15:15", "0711 Germany");
INSERT INTO einzelhaendler VALUES (2, "Penny","2020-05-16 15:15:15", "0711 Stuggi");


