Create database IF NOT EXISTS shoppinglist;

USE shoppinglist;



CREATE TABLE artikel(
    id INT(10),
    name VARCHAR(255),
    erstellungs_zeitpunkt varchar(250),
    einheit varchar(250),
    standardartikel bool,
    primary key(id)
);


INSERT INTO artikel VALUES (1, "Brot","03.06.2020 13:30:30", "Stück", false);