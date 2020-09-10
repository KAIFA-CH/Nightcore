'use strict'

const User = use('App/Models/User')

class ProfileController {
  async index ({ view, response, params }){
    const user = await User.finduser('username', params.username)
    if(!user) return response.send("epic");
    return response.send(user.username);
  }
}

module.exports = ProfileController
