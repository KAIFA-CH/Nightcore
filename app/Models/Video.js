'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Video extends Model {
  static search (type, value) {
    return this.findBy(type, value)
  }
}

module.exports = Video
