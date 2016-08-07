# foodora-deliveroo-foursquare

User-script für [tampermonkey](http://tampermonkey.net) um Foursquare Checkins, Tips, ... auf foodora und Deliveroo anzuzeigen.

## Installation

Um das Skript benutzen zu können, musst Du Dir eine ["App" bei Foursquare](https://foursquare.com/developers/apps) anlegen. Die Konfiguration ist in `.env.local` (Ein Beispiel ist in `.env`).

Der Rest der Schritte ist wie folgt:

```
$ git clone https://github.com/till/foodora-deliveroo-foursquare
$ cd foodora-deliveroo-foursquare
$ npm install
$ npm run-script build
```

Das Ergebnis dann lokal in tampermonkey einbinden.

## Lizenzen & rechtlicher Hinweis

Das Foursquare-Logo gehört [Foursquare](https://foursquare.com/legal/api/trademarkusage).

Dies ist ein "inoffizielles" Skript um Foodora und Deliveroo zu erweitern. Foodora ist ein Dienst der Foodora GmbH. Deliveroo ist ein Dienst der Deliveroo Germany GmbH.

Das Skript steht unter der [BSD-2-Clause-Lizenz](https://opensource.org/licenses/BSD-2-Clause).

## Screenshots

![Beispiel foodora](https://www.dropbox.com/s/h4zxqw9zmfam3oy/Screenshot%202016-08-01%2000.12.47.png?dl=1)

![Beispiel deliveroo](https://www.dropbox.com/s/74skz0nhk9hcblr/Screenshot%202016-08-01%2000.00.38.png?dl=1)
