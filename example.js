import Translator from "./translator";
import {LANGUAGES} from "./languages/index";

console.log(Translator.t('book', LANGUAGES.TR));

console.log(Translator.t('read_log', LANGUAGES.TR, {bookName: 'lotr'}));

console.log(Translator.t('read_log', LANGUAGES.EN, {bookName: 'lotr'}));

console.log(Translator.t('library', LANGUAGES.EN));

console.log(Translator.t('library', LANGUAGES.TR));

console.log(Translator.t('nope', LANGUAGES.TR));