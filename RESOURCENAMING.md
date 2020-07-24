# Resource Naming

## Einleitung
Für einen REST-Server/Service benötigen wir eine konsistente Bennenung aller Ressourcen.
Wir verwenden die folgende Ressourcen-Struktur, um mittels REST auf den
Applikationsserver zuzugreifen.

## Festlegung Ressourcen-Präfix
Die gesamte Applikation benutzt konsistent den Ressourcen-Präfix `/shopping`.

## A) Zugriff auf `Artikel`-Objekte

1. Auslesen aller Artikel:
    ```
    GET /shopping/artikel
    ```
2. Auslesen eines bestimmten Artikel anhand einer id:
    ```
    GET /shopping/artikel-by-id/<id>
    ```
3. Auslesen eines bestimmten Artikel anhand dessen Namen:
    ```
    GET /shopping/artikel-by-name/<name>
    ```
4. Anlegen eines Artikels:
    ```
    POST /shopping/artikel
    ```
5. Update eines durch eine id bestimmten Artikel:
    ```
    PUT /shopping/artikel-by-id/<id>
    ```
6. Löschen eines Artikels anhand einer id:
    ```
    DELETE /shopping/artikel-by-id/<id>
    ```

Daraus ergeben sich folgende Ressourcen:
1. `ArtikelListOperations` mit den Operationen A.1, A.4
2. `ArtikelOperations` mit den Operationen A.2, A.5, A.6
3. `ArtikelByNameOperations` mit der Operation A.3


## B) Zugriff auf `Einzelhändler`-Objekte

1. Auslesen aller Einzelhändler anhand einer Benutzer-ID :
    ```
    GET /shopping/einzelhaendler/<email>
    ```
2. Anlegen eines Einzelhändlers:
    ```
    POST /shopping/einzelhaendler
    ```
3. Auslesen eines bestimmten Einzelhändlers anhand dessen Namen:
    ```
    GET /shopping/einzelhaendler-by-name/<name>
    ```
4. Auslesen eines bestimmten Einzelhändlers anhand einer id:
    ```
    GET /shopping/einzelhaendler-by-id/<id>
    ```
6. Löschen eines Einzelhändlers anhand einer id:
    ```
    DELETE /shopping/einzelhaendler-by-id/<id>
    ```
5. Update eines durch eine id bestimmten Einzelhändlers:    
    ```
    PUT /shopping/einzelhaendler-by-id/<id>
    ```
   
Daraus ergeben sich folgende Ressourcen:
1. `EinzelhaendlerByBenutzerMailOperations` mit der Operation B.1
2. `EinzelhaendlerListOperations` mit der Operation B.2
3. `EinzelhaendlerByNameOperations` mit der Operation B.3
4. `EinzelhaendlerOperations` mit den Operationen B.4, B.5, B.6


## C) Zugriff auf `Benutzer`-Objekte

1. Auslesen aller Benutzer:
    ```
    GET /shopping/benutzer
    ```
2. Anlegen eines Benutzers:
    ```
    POST /shopping/benutzer
    ```
3. Auslesen eines bestimmten Benutzers anhand einer id":
    ```
    GET /shopping/benutzer-by-id/<id>
    ```
4. Update eines durch eine id bestimmten Benutzer:
    ```
    PUT /shopping/benutzer-by-id/<id>
    ```
5. Löschen eines Benutzers anhand einer id:
    ```
    DELETE /shopping/benutzer-by-id/<id>
    ```
6. Auslesen eines bestimmten Benutzers anhand seines Namen:
    ```
    GET /shopping/benutzer-by-name/<name>
    ```
7.  Auslesen eines bestimmten Benutzers anhand seiner Email:
    ```
    GET /shopping/benutzer-by-email/<email>
    ```  
8.  Auslesen aller Listeneinträge für einen durch Id definierten Benutzer:
    ```
    GET /shopping/benutzer/<id>/listeneintraege
    ```
9.  Auslesen aller Artikel die zu einem Benutzer gehören:
    ```
    GET /shopping/benutzer/<email>/artikel
    ```
10. Auslesen aller Anwenderverbünde für einen durch Id definierten Benutzer:
    ```
    GET /shopping/benutzer/<email>/anwenderverbuende
    ```
Daraus ergeben sich folgende Ressourcen:
1. `BenutzerListOperations` mit den Operationen C.1, C.2
2. `BenutzerOperations` mit den Operationen C.3, C.4, C.5
3. `BenutzerByNameOperations` mit der Operation C.6
4. `BenutzerByEmailOperations` mit der Operation C.7
5. `BenutzerRelatedListeneintragOperations` mit der Operation C.8
6. `BenutzerRelatedArtikelOperations` mit der Operation C.9
7. `BenutzerRelatedAnwenderverbundOperations` mit der Operation C.10

## D) Zugriff auf `Listeneintrag`-Objekte

1. Anlegen eines Listeneintrages:
    ```
    POST /shopping/listeneintrag
    ```
2. Auslesen eines bestimmten Listeneintrages anhand einer id:
    ```
    GET /shopping/listeneintrag-by-id/<id>
    ```
3. Update eines durch eine id bestimmten Listeneintrag:
    ```
    PUT /shopping/listeneintrag-by-id/<id>
    ```
4. Löschen eines Listeneintrages anhand einer id:
    ```
    DELETE /shopping/listeneintrag-by-id/<id>
    ```
   
Daraus ergeben sich folgende Ressourcen:
1. `ListeneintragListOperations` mit der Operation D.1
2. `ListeneintragOperations` mit den Operationen D.2, D.3, D.4


## E) Zugriff auf `Einkaufsliste`-Objekte

1. Auslesen aller Einkaufslisten:
    ```
    GET /shopping/einkaufsliste
    ```
2. Anlegen einer Einkaufsliste:
    ```
    POST /shopping/einkaufsliste/<email>
    ```
3. Auslesen einer bestimmten Einkaufsliste anhand einer id:
    ```
    GET /shopping/einkaufsliste-by-id/<id>
    ```
4. Update einer durch id bestimmten Einkaufsliste:
    ```
    PUT /shopping/einkaufsliste-by-id/<id>
    ```
5. Löschen einer Einkaufsliste anhand einer id:
    ```
    DELETE /shopping/einkaufsliste-by-id/<id>
    ```
6.  Auslesen aller Listeneinträge für einen durch Id definierten Benutzer:
    ```
    GET /shopping/einkaufsliste/<id>/listeneintraege
    ```
    
Daraus ergeben sich folgende Ressourcen:
1. `EinkaufslisteListOperations` mit der Operation E.1,
2. `EinkaufslisteByBenutzerListOperations` mit der Operation E.2
3. `EinkaufslisteOperations` mit den Operationen E.3, E.4, E.5
4. `EinkaufslisteRelatedListeneintraegeOperations` mit der Operation E.6

## F) Zugriff auf `Anwenderverbund`-Objekte

1. Auslesen aller Anwenderverbünde:
    ```
    GET /shopping/anwenderverbund
    ```
2. Anlegen eines Anwenderverbundes:
    ```
    POST /shopping/anwenderverbund
    ```
3. Auslesen eines bestimmten Anwenderverbundes anhand einer id:
    ```
    GET /shopping/anwenderverbund-by-id/<id>
    ```
4. Update eines durch eine id bestimmten Anwenderverbundes:
    ```
    PUT /shopping/anwenderverbund-by-id/<id>
    ```
5. Löschen eines Anwenderverbundes anhand einer id:
    ```
    DELETE /shopping/anwenderverbund-by-id/<id>
    ```
6. Auslesen eines bestimmten Anwenderverbundes anhand dessen Namen:
    ```
    GET /shopping/anwenderverbund-by-name/<name>
    ```
7.  Auslesen aller Einkaufslisten in einem durch Id definierten Anwenderverbund:
    ```
    GET /shopping/anwenderverbund/<id>/einkauflisten
    ```
8.  Auslesen aller Mitglieder in einem durch Id definierten Anwenderverbund:
    ```
    GET /shopping/anwenderverbund/<id>/mitglieder
    ```  
9. Hinzufügen eines Benutzers in einen Anwenderverbund:
    ```
    POST /shopping/anwenderverbund/<id>/mitglieder
    ```
10. Löschen eines Benutzers in einem Anwenderverbund:
    ```
    DELETE /shopping/anwenderverbund/<id>/mitglieder
    ```
Daraus ergeben sich folgende Ressourcen:
1. `AnwenderverbundListOperations` mit den Operationen F.1, F.2
2. `AnwenderverbundOperations` mit den Operationen F.3, F.4, F.5
3. `AnwenderverbundByNameOperations` mit der Operation F.6
4. `AnwenderverbundRelatedEinkaufslisteOperations` mit der Operation F.7
5. `AnwenderverbundRelatedBenutzerOperations` mit den Operationen F.8, F.9, F.10


## G) Zugriff auf `Statistik`-Objekte

1. Auslesen der meist gekauften Artikel:
    ```
    GET /shopping/statistik/<email>
    ```
2. Auslesen der meist gekauften Artikel bei einem durch Namen definierten Einzelhaendler:
    ```
    GET /shopping/statistik/<email>/<name>
    ```
3. Auslesen der meist gekauften Artikel bei einem durch Namen definierten Einzelhaendler:
    ```
    GET /shopping/statistik/<email>/<von>/<bis>
    ```
4. Auslesen der meist gekauften Artikel bei einem durch Namen definierten Einzelhaendler:
    ```
    GET /shopping/statistik/<email>/<name>/<von>/<bis>
    ```
   
Daraus ergeben sich folgende Ressourcen:
1. `StatistikListOperationsByBenutzer` mit der Operation G.1
2. `StatistikListOperationsByEinzelhaendler` mit der Operation G.2
3. `StatistikListOperationsByDatum` mit der Operation G.3
4. `StatistikListOperationsByEinzelhaendlerDatum` mit der Operation G.4




