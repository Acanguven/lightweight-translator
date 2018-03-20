const expect = require('chai').expect;
const Translator = require('../');

describe('Translator', function () {
  beforeEach(() => {
    Translator.languages = {};
    Translator.__cache = {};
  });

  it('should expose module', function () {
    expect(Translator).to.be.an('object');
  });

  it('should expose defined languages object', function () {
    expect(Translator.languages).to.be.an('object');
  });

  it('should extend languages with provided object', function () {
    Translator.addLanguage('TR', {
      book: 'kitap'
    });

    expect(Translator.languages.TR).to.deep.eq({
      book: 'kitap'
    });
  });

  it('should cache translation', function () {
    const hash = Translator.__createHash('test', 'TR', {test: 'test'});

    expect(hash).to.eq('testTR{"test":"test"}');
  });


  it('should print untranslated text for dictionary value', function () {
    const unResolved = Translator.__bundleUnresolvedTranslation('test', 'TR', {value: 5});

    expect(unResolved).to.eq('*test|TR|{"value":5}*');
  });

  it('should replace variables in translation string', function () {
    Translator.addLanguage('TR', {});
    const translated = Translator.__buildVariables('I just finished {book}', 'TR', {book: 'Sherlock Holmes'});

    expect(translated).to.eq('I just finished Sherlock Holmes');
  });

  it('should replace variables with deep translation', function () {
    Translator.addLanguage('TR', {
      book_lotr: 'Yüzüklerin Efendisi'
    });

    Translator.addLanguage('EN', {
      book_lotr: 'Lord Of The Rings'
    });

    const translated_tr = Translator.__buildVariables('I just finished {book}', 'TR', {book: 'book_lotr'});
    const translated_en = Translator.__buildVariables('I just finished {book}', 'EN', {book: 'book_lotr'});

    expect(translated_en).to.eq('I just finished Lord Of The Rings');
    expect(translated_tr).to.eq('I just finished Yüzüklerin Efendisi');
  });

  it('should translate given string', function () {
    Translator.addLanguage('TR', {
      status_available: 'Durum: Uygun'
    });

    const translated_tr = Translator.translate('status_available', 'TR');
    expect(translated_tr).to.eq('Durum: Uygun');
  });

  it('should print unresolved for not added language', function () {
    const translated_tr = Translator.translate('status_available', 'TR');
    expect(translated_tr).to.eq('*status_available|TR|*');
  });

  it('should translate with variables', function () {
    Translator.addLanguage('TR', {
      status_available: 'Durum: {status}'
    });

    const translated_tr = Translator.translate('status_available', 'TR', {status: 'Uygun'});
    expect(translated_tr).to.eq('Durum: Uygun');
  });

  it('should translate with deep translation', function () {
    Translator.addLanguage('TR', {
      status: 'Durum: {status}',
      available: 'Uygun'
    });

    const translated_tr = Translator.translate('status', 'TR', {status: 'available'});
    expect(translated_tr).to.eq('Durum: Uygun');
  });

  it('should respond from cache if same translation requested', function () {
    Translator.addLanguage('TR', {
      status: 'Durum: {status}',
      available: 'Uygun'
    });

    const translated = Translator.translate('status', 'TR', {status: 'available'});
    expect(translated).to.eq('Durum: Uygun');

    Translator.__cache['statusTR{"status":"available"}'] = 'changed memory';

    const translated_from_cache = Translator.translate('status', 'TR', {status: 'available'});
    expect(translated_from_cache).to.eq('changed memory');
  });
});