Create database IF NOT EXISTS shoppinglist;

USE shoppinglist;



CREATE TABLE artikel(
    id INT,
    name VARCHAR(30),
    erstellungs_zeitpunkt datetime,
    einheit varchar(30),
    standardartikel bool,
    primary key(id)
);


INSERT INTO artikel VALUES (1, "Brot","2020-05-16 15:15:15", "Stück", false);