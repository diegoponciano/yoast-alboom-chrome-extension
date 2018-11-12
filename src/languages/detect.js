function getBrowserLang () {
  if (navigator.languages !== undefined) {
    return navigator.languages[0]
  } else {
    return navigator.language
  }
}

export function getTranslation () {
  // var translations = {}
  var lang = getBrowserLang().replace('-', '_')
  return import(`./${lang}.json`)
    .then((translation) => {
      return translation
    })
}

export default {
  getTranslation
}
