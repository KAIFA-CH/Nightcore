'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideosSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.increments()
      table.string('vid', 2555).nullable()
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideosSchema
