function Translator(){
  this.languages = {};
  this.__cache = {};
  this.defaultLanguage = null;
}

Translator.prototype.setDefault = function(languageKey){
  this.defaultLanguage = languageKey;
}

Translator.prototype.translate = function(name, language, variableSet){
  if(!language && this.defaultLanguage) {
    language = this.defaultLanguage;
  }
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

Translator.prototype.addLanguage = function(languageKey, dictionary){
  this.languages[languageKey] = dictionary;
}

Translator.prototype.__createHash = function(name, language, variableSet) {
  return name + language + (variableSet ? JSON.stringify(variableSet) : '');
}

Translator.prototype.__bundleUnresolvedTranslation = function (name, language, variableSet) {
  return '*' + name + '|' + language + '|' + (variableSet ? JSON.stringify(variableSet) : '') + '*';
}

Translator.prototype.__buildVariables = function(replaceString, language, variables) {
  for (let prop in variables) {
    let value = null;
    if (this.languages[language]) {
      value = this.languages[language][variables[prop]];
    }
    replaceString = replaceString.replace(new RegExp('{' + prop + '}', "g"), value || variables[prop]);
  }
  return replaceString;
}

module.exports = Translator;