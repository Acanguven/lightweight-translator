const expect = require('chai').expect;
const Translator = require('../');

const translator = new Translator();

describe('Translator', function () {
  beforeEach(() => {
    translator.languages = {};
    translator.__cache = {};
  });

  it('should expose module', function () {
    expect(Translator).to.be.an('function');
  });

  it('should expose defined languages object', function () {
    expect(translator.languages).to.be.an('object');
  });

  it('should extend languages with provided object', function () {
    translator.addLanguage('TR', {
      book: 'kitap'
    });

    expect(translator.languages.TR).to.deep.eq({
      book: 'kitap'
    });
  });

  it('should cache translation', function () {
    const hash = translator.__createHash('test', 'TR', {test: 'test'});

    expect(hash).to.eq('testTR{"test":"test"}');
  });


  it('should print untranslated text for dictionary value', function () {
    const unResolved = translator.__bundleUnresolvedTranslation('test', 'TR', {value: 5});

    expect(unResolved).to.eq('*test|TR|{"value":5}*');
  });

  it('should replace variables in translation string', function () {
    translator.addLanguage('TR', {});
    const translated = translator.__buildVariables('I just finished {book}', 'TR', {book: 'Sherlock Holmes'});

    expect(translated).to.eq('I just finished Sherlock Holmes');
  });

  it('should replace variables with deep translation', function () {
    translator.addLanguage('TR', {
      book_lotr: 'Yüzüklerin Efendisi'
    });

    translator.addLanguage('EN', {
      book_lotr: 'Lord Of The Rings'
    });

    const translated_tr = translator.__buildVariables('I just finished {book}', 'TR', {book: 'book_lotr'});
    const translated_en = translator.__buildVariables('I just finished {book}', 'EN', {book: 'book_lotr'});

    expect(translated_en).to.eq('I just finished Lord Of The Rings');
    expect(translated_tr).to.eq('I just finished Yüzüklerin Efendisi');
  });

  it('should translate given string', function () {
    translator.addLanguage('TR', {
      status_available: 'Durum: Uygun'
    });

    const translated_tr = translator.translate('status_available', 'TR');
    expect(translated_tr).to.eq('Durum: Uygun');
  });

  it('should print unresolved for not added language', function () {
    const translated_tr = translator.translate('status_available', 'TR');
    expect(translated_tr).to.eq('*status_available|TR|*');
  });

  it('should translate with variables', function () {
    translator.addLanguage('TR', {
      status_available: 'Durum: {status}'
    });

    const translated_tr = translator.translate('status_available', 'TR', {status: 'Uygun'});
    expect(translated_tr).to.eq('Durum: Uygun');
  });

  it('should translate with deep translation', function () {
    translator.addLanguage('TR', {
      status: 'Durum: {status}',
      available: 'Uygun'
    });

    const translated_tr = translator.translate('status', 'TR', {status: 'available'});
    expect(translated_tr).to.eq('Durum: Uygun');
  });

  it('should respond from cache if same translation requested', function () {
    translator.addLanguage('TR', {
      status: 'Durum: {status}',
      available: 'Uygun'
    });

    const translated = translator.translate('status', 'TR', {status: 'available'});
    expect(translated).to.eq('Durum: Uygun');

    translator.__cache['statusTR{"status":"available"}'] = 'changed memory';

    const translated_from_cache = translator.translate('status', 'TR', {status: 'available'});
    expect(translated_from_cache).to.eq('changed memory');
  });

  it('should set default language', function () {
    translator.addLanguage('TR', {
      status_available: 'Durum: Uygun'
    });

    translator.setDefault('TR');

    const translated_tr = translator.translate('status_available');
    expect(translated_tr).to.eq('Durum: Uygun');
  });
});