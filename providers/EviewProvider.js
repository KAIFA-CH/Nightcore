'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class EviewProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const View = this.app.use('Adonis/Src/View')
    View.global('getLName', (code) => {
      if(code == 'de'){
        return 'Deutsch'
      }else if(code == 'en'){
        return 'English'
      }else if(code == 'nl'){
        return 'Nederlands'
      }
    })
  }
}

module.exports = EviewProvider
