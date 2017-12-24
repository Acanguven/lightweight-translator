import {LANGUAGE_MAPS} from "./languages/index";

export default class Translator {
  /**
   * Hashmap for previously created translations
   * @type {{}}
   */
  static hashMap = {};

  /**
   * Language Map
   * @type {{TR: {}}}
   */
  static langMap = {
    ...LANGUAGE_MAPS
  };

  /**
   * Translates the text with variables
   * @param {string} name - Name of the translation
   * @param {object} variableSet - Translation variables
   * @param {object} language - Language Object
   * @returns {string} - Translation
   */
  static t(name, language, variableSet = null) {
    const hash = Translator.__getHash.apply(this, arguments);
    if (this.hashMap[hash]) return this.hashMap[hash];
    const preVariableTranslation = this.langMap[language][name] ? this.langMap[language][name] : this.__bundleUnresolvedName(name, variableSet, language);
    const translation = variableSet ? this.__buildVariables(preVariableTranslation, variableSet, this.langMap[language]) : preVariableTranslation;
    this.__setHashedCache(hash, translation);
    return translation;
  }

  /**
   * Returns hash of request translation
   * @param name
   * @param language
   * @param variableSet
   * @returns {string}
   * @private
   */
  static __getHash(name, language, variableSet) {
    return name + language + (variableSet ? JSON.stringify(variableSet) : '');
  }

  /**
   * Caches translation into hashMap
   * @param hash
   * @param value
   * @private
   */
  static __setHashedCache(hash, value) {
    this.hashMap[hash] = value;
  }

  /**
   * Replaces variables on translation
   * @param {string} returnString - Replaced translation with variables
   * @param {object} variableSet - Translation variables
   * @param {object} language - Language Object
   * @return {string} - Translation result
   */
  static __buildVariables(returnString, variableSet, language) {
    for (let prop in variableSet) {
      returnString = returnString.replace(new RegExp('{' + prop + '}', "g"), language[variableSet[prop]] || variableSet[prop]);
    }
    return returnString;
  }

  /**
   * Bundles unresolved name into *name* format
   * @param {string} name - Name of the translation
   * @param {object} variableSet - Translation variables
   * @param {object} language - Language Object
   * @return {string}
   */
  static __bundleUnresolvedName(name, variableSet, language) {
    return '*' + name + '|' + language + '*' + (variableSet ? JSON.stringify(variableSet) : '');
  }
}
