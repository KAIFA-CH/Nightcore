'use strict'
const Antl = use('Antl')

class LangController {
  async switch ({ response, session, params }) {
    const locales = Antl.availableLocales();
    var lang = new Promise((resolve, reject) => {
      locales.forEach(function(locale, index, array){
        if(!array[index + 1]) resolve();
        if (session.get('locale') == params.lang) resolve();
        if (params.lang != locale) return
        session.put('locale', params.lang)
        resolve();
      })
    })
    await lang.then(() => {
      return response.redirect('back')
    })
  }
}

module.exports = LangController
