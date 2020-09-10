'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
class Locale {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, session, view }, next) {
      if (session.get('locale') === null) {
        session.put('locale', 'en')
        session.put('locale', request.language(['en', 'de', 'nl']))
      }
      view.share({
        currentLocale: session.get('locale')
      })
      await next()
  }
}

module.exports = Locale
