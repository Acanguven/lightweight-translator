# Ligtweight Translator

Fastest way to implement translations to your Javascript project.


## Languages

```js
const Translator = require('lighweight-translator');
Translator.addLanguage('TR', {
    book: 'Kitap',
    game: 'Oyun',
    dog: 'Köpek',
    lotr: 'Lord Of The Rings',
    finished_book: 'I just finished {book}'
});

Translator.translate('game', 'TR') // Kitap
Translator.translate('finished_book', 'TR', {book: 'a book'}) // I just finished a book
Translator.translate('finished_book', 'TR', {book: 'lotr'}) // I just finished Lord Of The Rings
```

## Examples

### Basic Translation
book: 'Kitap'

`console.log(Translator.translate('book', 'TR'));`

--> Kitap

book: 'Book'

`console.log(Translator.translate('book', 'EN'));`

--> Book


### Translation with variables
animal: '{name} bir köpektir'

`console.log(Translator.translate('animal', 'TR', {name: 'Nano'}));`

-->  Nano bir köpektir

animal: '{name} is a dog'

`console.log(Translator.translate('animal', 'EN', {name: 'Nano'}));`

--> Nano is a dog


### Deep translation with variables
lotr: 'Yüzüklerin Efendisi'
read_log: '{bookName} adlı kitabı okudum.'

`console.log(Translator.translate('read_log', 'TR', {bookName: 'lotr'}));`

--> Yüzüklerin Efendisi adlı kitabı okudum


lotr: 'Lord Of The Rings',
read_log: 'I read {bookName}'

`console.log(Translator.translate('read_log', 'EN', {bookName: 'lotr'}));`

--> I read Lord Of The Rings

### Untranslated Text

`console.log(Translator.translate('nope', 'EN'));`

-->\*nope|EN\*