# Resource Naming

## Einleitung
Für einen REST-Server/Service benötigen wir eine konsistente Bennenung aller Ressourcen.
Wir verwenden die folgende Ressourcen-Struktur, um mittels REST auf den
Applikationsserver zuzugreifen.

## Festlegung Ressourcen-Präfix
Die gesamte Applikation benutzt konsistent den Ressourcen-Präfix `/shopping`.

## A) Zugriff auf `Artikel`-Objekte

1. Anlegen eines Artikels:
    ```
    POST /shopping/artikel
    ```
2. Update eines durch eine id bestimmten Artikel:
    ```
    PUT /shopping/artikel-by-id/<id>
    ```
3. Löschen eines Artikels anhand einer id:
    ```
    DELETE /shopping/artikel-by-id/<id>
    ```
4. Auslesen eines bestimmten Artikel anhand dessen Namen:
    ```
    GET /shopping/artikel-by-name/<name>
    ```

Daraus ergeben sich folgende Ressourcen:
1. `ArtikelListOperations` mit der Operation A.1
2. `ArtikelOperations` mit den Operationen A.2, A.3
3. `ArtikelByNameOperations` mit der Operation A.4


## B) Zugriff auf `Einzelhändler`-Objekte

1. Auslesen aller Einzelhändler anhand einer Benutzer-Email :
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
4. Löschen eines Einzelhändlers anhand einer id:
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
4. `EinzelhaendlerOperations` mit den Operationen B.4, B.5


## C) Zugriff auf `Benutzer`-Objekte


1. Anlegen eines Benutzers:
    ```
    POST /shopping/benutzer
    ```
2. Auslesen eines bestimmten Benutzers anhand seines Namen:
    ```
    GET /shopping/benutzer-by-name/<name>
    ```
3.  Auslesen eines bestimmten Benutzers anhand seiner Email:
    ```
    GET /shopping/benutzer-by-email/<email>
    ```  
4.  Auslesen aller Artikel, die zu einem Benutzer gehören:
    ```
    GET /shopping/benutzer/<email>/artikel
    ```
5. Auslesen aller Anwenderverbünde für einen durch Email definierten Benutzer:
    ```
    GET /shopping/benutzer/<email>/anwenderverbuende
    ```
Daraus ergeben sich folgende Ressourcen:
1. `BenutzerListOperations` mit der Operation C.1
2. `BenutzerByNameOperations` mit der Operation C.2
3. `BenutzerByEmailOperations` mit der Operation C.3
4. `BenutzerRelatedArtikelOperations` mit der Operation C.4
5. `BenutzerRelatedAnwenderverbundOperations` mit der Operation C.5

## D) Zugriff auf `Listeneintrag`-Objekte

1. Anlegen eines Listeneintrages:
    ```
    POST /shopping/listeneintrag
    ```
2. Update eines durch eine id bestimmten Listeneintrag:
    ```
    PUT /shopping/listeneintrag-by-id/<id>
    ```
3. Löschen eines Listeneintrages anhand einer id:
    ```
    DELETE /shopping/listeneintrag-by-id/<id>
    ```
   
Daraus ergeben sich folgende Ressourcen:
1. `ListeneintragListOperations` mit der Operation D.1
2. `ListeneintragOperations` mit den Operationen D.2, D.3


## E) Zugriff auf `Einkaufsliste`-Objekte

1. Anlegen einer Einkaufsliste:
    ```
    POST /shopping/einkaufsliste/<email>
    ```
2. Update einer durch id bestimmten Einkaufsliste:
    ```
    PUT /shopping/einkaufsliste-by-id/<id>
    ```
3. Löschen einer Einkaufsliste anhand einer id:
    ```
    DELETE /shopping/einkaufsliste-by-id/<id>
    ```
4.  Auslesen aller Listeneinträge für eine durch ID definierte Einkaufsliste:
    ```
    GET /shopping/einkaufsliste/<id>/listeneintraege
    ```
    
Daraus ergeben sich folgende Ressourcen:
1. `EinkaufslisteByBenutzerListOperations` mit der Operation E.1
2. `EinkaufslisteOperations` mit den Operationen E.2, E.3
3. `EinkaufslisteRelatedListeneintraegeOperations` mit der Operation E.4

## F) Zugriff auf `Anwenderverbund`-Objekte

1. Anlegen eines Anwenderverbundes:
    ```
    POST /shopping/anwenderverbund
    ```
2. Update eines durch eine id bestimmten Anwenderverbundes:
    ```
    PUT /shopping/anwenderverbund-by-id/<id>
    ```
3. Löschen eines Anwenderverbundes anhand einer id:
    ```
    DELETE /shopping/anwenderverbund-by-id/<id>
    ```
4.  Auslesen aller Einkaufslisten in einem durch Id definierten Anwenderverbund:
    ```
    GET /shopping/anwenderverbund/<id>/einkauflisten
    ```
5.  Auslesen aller Mitglieder in einem durch Id definierten Anwenderverbund:
    ```
    GET /shopping/anwenderverbund/<id>/mitglieder
    ```  
6. Hinzufügen eines Benutzers in einen Anwenderverbund:
    ```
    POST /shopping/anwenderverbund/<id>/mitglieder
    ```
7. Löschen eines Benutzers in einem Anwenderverbund:
    ```
    DELETE /shopping/anwenderverbund/<id>/mitglieder
    ```
Daraus ergeben sich folgende Ressourcen:
1. `AnwenderverbundListOperations` mit der Operation F.1
2. `AnwenderverbundOperations` mit den Operationen F.2, F.3
4. `AnwenderverbundRelatedEinkaufslisteOperations` mit der Operation F.4
5. `AnwenderverbundRelatedBenutzerOperations` mit den Operationen F.5, F.6, F.7


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




