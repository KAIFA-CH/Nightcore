'use strict'
const Validator = use('Validator')
const Database = use('Database')
const Antl = use('Antl')

const existsFn = async (data, field, message, args, get) => {
  const value = get(data, field)
  if (!value) {
    return
  }

  const [table, column] = ['users', 'username']
  const row = await Database.table(table).where(column, value).first()

  if (!row) {
    throw message
  }
}

Validator.extend('exists', existsFn)

class Login {
  get rules () {
    return {
      'username': 'exists|required',
      'password': 'required'
    }
  }
  get messages () {
    return {
      'username.required': Antl.forLocale(this.ctx.session.get('locale')).formatMessage('messages.Failed_LoginRU'),
      'username.exists': Antl.forLocale(this.ctx.session.get('locale')).formatMessage('messages.Failed_LoginEU'),
      'password.required': Antl.forLocale(this.ctx.session.get('locale')).formatMessage('messages.Failed_LoginRP').toString()
    }
  }
}

module.exports = Login
