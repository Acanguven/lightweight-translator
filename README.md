# Ligtweight Translator

Fastest way to implement translations to your Javascript project.

## Examples

### Basic Translation
book: 'Kitap'

`console.log(Translator.t('book', LANGUAGES.TR));`

--> Kitap

book: 'Book'

`console.log(Translator.t('book', LANGUAGES.EN));`

--> Book


### Translation with variables
animal: '{name} bir köpektir'

`console.log(Translator.t('animal', LANGUAGES.TR, {name: 'Nano'}));`

-->  Nano bir köpektir

animal: '{name} is a dog'

`console.log(Translator.t('animal', LANGUAGES.EN, {name: 'Nano'}));`

--> Nano is a dog


### Deep translation with variables
lotr: 'Yüzüklerin Efendisi'
read_log: '{bookName} adlı kitabı okudum.'

`console.log(Translator.t('read_log', LANGUAGES.TR, {bookName: 'lotr'}));`

--> Yüzüklerin Efendisi adlı kitabı okudum


lotr: 'Lord Of The Rings',
read_log: 'I read {bookName}'

`console.log(Translator.t('read_log', LANGUAGES.EN, {bookName: 'lotr'}));`

--> I read Lord Of The Rings

### Untranslated Text

`console.log(Translator.t('nope', LANGUAGES.EN));`

-->\*nope|EN\*