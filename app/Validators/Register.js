'use strict'
const Antl = use('Antl')
class Register {
  get rules () {
    return {
      'username': 'required|min:5|max:10|unique:users',
      'password': 'required|min:3'
    }
  }
  get messages () {
    return {
      'username.unique': Antl.forLocale(this.ctx.session.get('locale')).formatMessage('messages.Failed_RegisterUT'),
      'username.min': Antl.forLocale(this.ctx.session.get('locale')).formatMessage('messages.Failed_RegisterUM')
    }
  }
}

module.exports = Register
