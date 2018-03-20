class Translator {
  constructor() {
    this.languages = {};

    this.__cache = {};
  }

  translate(name, language, variableSet) {
    const hash = this.__createHash.apply(null, arguments);
    if (this.__cache[hash]) return this.__cache[hash];

    let translation = null;
    if (this.languages[language]) translation = this.languages[language][name];
    if (!translation) return this.__bundleUnresolvedTranslation.apply(null, arguments);

    if(variableSet) {
      translation = this.__buildVariables(translation, language, variableSet)
    }

    this.__cache[hash] = translation;
    return translation;
  }

  /**
   * Adds new language to the library
   * @param languageKey
   * @param dictionary
   */
  addLanguage(languageKey, dictionary) {
    this.languages[languageKey] = dictionary;
  }

  /**
   * Returns hash for memoizing
   * @param name
   * @param language
   * @param variableSet
   * @returns {string}
   * @private
   */
  __createHash(name, language, variableSet) {
    return name + language + (variableSet ? JSON.stringify(variableSet) : '');
  }


  /**
   * Creates text for untranslated value
   * @param name
   * @param language
   * @param variableSet
   * @returns {string}
   * @private
   */
  __bundleUnresolvedTranslation(name, language, variableSet) {
    return '*' + name + '|' + language + '|' + (variableSet ? JSON.stringify(variableSet) : '') + '*';
  }

  /**
   * Replaces variables with language values
   * @param replaceString
   * @param language
   * @param variables
   * @returns {*}
   * @private
   */
  __buildVariables(replaceString, language, variables) {
    for (let prop in variables) {
      let value = null;
      if (this.languages[language]) {
        value = this.languages[language][variables[prop]];
      }
      replaceString = replaceString.replace(new RegExp('{' + prop + '}', "g"), value || variables[prop]);
    }
    return replaceString;
  }
}

module.exports = new Translator();