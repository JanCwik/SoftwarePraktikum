# Resource Naming

## Einleitung
Für einen REST-Server/Service benötigen wir eine konsistente Bennenung aller Ressourcen.
Wir verwenden die folgende Ressourcen-Struktur, um mittels REST auf den
Applikationsserver zuzugreifen.

## Festlegung Ressourcen-Präfix
Die gesamte Applikation benutzt konsistent den Ressourcen-Präfix `/bank`.

## A) Zugriff auf `Customer`-Objekte

1. Alle Kunden auslesen:
    ```
    GET /bank/customers
    ```
2. Einen Kunden per ID auslesen:
    ```
    GET /bank/customers/<id>
    ```
3. **NEW:** Kunden per Nachname auslesen:
    ```
    GET /bank/customers-by-name/<name>
    ```
4. Einen neuen Kunden erstellen:
    ```
    POST /bank/customers
    ```
5. Einen bereits bestehenden Kunden speichern (update):
    **TODO**: ACHTUNG, hier ist die ID überflüssig!!!
    ```
    PUT /bank/customers/<id>
    ```
6. Einen Kunden löschen:
    ```
    DELETE /bank/customers/<id>
    ```

Daraus ergeben sich folgende Ressourcen:
1. `CustomerListOperations` mit den Operationen A.1, A.4
2. `CustomerOperations` mit den Operationen A.2, A.5, A.6
3. `CustomersByNameOperations` mit der Operation A.3

## B) Zugriff auf `Account`-Objekte

1. Alle Konten der Bank / des Systems auslesen:
    ```
    GET /bank/accounts
    ```
2. Ein Konto auslesen:
    ```
    GET /bank/accounts/<id>
    ```
3. Alle Konten eines Kunden auslesen:
    ```
    GET /bank/customers/<id>/accounts
    ```
4. Ein neues Konto für einen Kunden erstellen:
    ```
    POST /bank/customers/<id>/accounts
    ```
5. Ein bereits bestehendes Konto speichern (update):
    ```
    PUT /bank/accounts/<id>
    ```
6. Ein Konto löschen:
    ```
    DELETE /bank/accounts/<id>
    ```
7. **NEW:** Kontostand eines Kontos auslesen:
    ```
    GET /bank/accounts/<id>/balance
    ```
8. **NEW:** Cash-Konto der Bank auslesen:
    ```
    GET /bank/cash-account
    ```

Daraus ergeben sich folgende Ressourcen:
1. `AccountListOperations` mit den Operationen B.1
2. `AccountOperations` mit den Operationen B.2, B.5, B.6
3. `CustomerRelatedAccountOperations` mit der Operation B.3, B.4
4. `AccountBalanceOperations` mit der Operation B.7
5. `CashAccountOperations` mit der Operation B.8

## C) Zugriff auf `Transaction`-Objekte
1. **NEW:** Eine Buchung auslesen:
    ```
    GET /bank/transactions/<id>
    ```
2. Alle *Abbuchungen* eines Kontos auslesen:
    ```
    GET /bank/account/<id>/debits
    ```
3. Alle *Guthabenbuchungen* eines Kontos auslesen:
    ```
    GET /bank/account/<id>/credits
    ```
4. Eine neue Buchung erstellen:
    ```
    POST /bank/transactions
    ```
5. Eine bereits bestehende Buchung speichern (update):
    ```
    PUT /bank/transactions/<id>
    ```
6. Eine Buchung löschen:
    ```
    DELETE /bank/transactions/<id>
    ```
*Hinweis:* *Alle* Buchungen der Bank / des Systems durch eine einzelne Anfrage auszulesen,
ist bislang nicht vorgesehen.

Daraus ergeben sich folgende Ressourcen:
1. `TransactionListOperations` mit den Operationen C.3
2. `TransactionOperations` mit den Operationen C.1, C.5, C.6
3. `DebitOperations`mit der Operation C.2
4. `CreditOperations`mit der Operation C.3

## Hinweise
Gelegentlich ist es unklar, welche HTTP-Operation unter welchen Bedingungen zu verwenden ist:

**POST** wird verwendet, wenn *neue* Objekte angelegt werden sollen.

**PUT** wird für ein Update von *bereits bestehenden* Objekten verwendet.

## Allgemeine Infos zum Resource Naming
Weitere Infos zum *Resource Naming* unter: https://restfulapi.net/resource-naming/

Dort wird insbesondere auf die folgenden 4 Archetypen eingegangen:
1. *document*: Zugriff auf einzelne Dokumente / Ressourcen.
2. *collection*: Zugriff auf Mengen von Dokumenten / Ressourcen.
3. *store*: Ein durch den Client verwalteter Bereich für das Anlegen, Anpassen und
Löschen von Ressourcen. *Kommt in diesem Projekt nicht zur Anwenung.*
4. *controller*: Expliziter Aufruf von Funktionen, die nicht zu 1.-3. gehören.


