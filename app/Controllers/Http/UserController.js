'use strict'
const User = use('App/Models/User')
const Mail = use('Mail')
const Antl = use('Antl')

class UserController {
  index({ response, view, session }) {
    if (!session.get('user')) return response.send(Antl.forLocale(session.get('locale')).formatMessage('messages.NotLI'));
    const content = {message: Antl.forLocale(session.get('locale')).formatMessage('messages.Home_Message')};
    return view.render('home', content);
  }

  async store({request, response, session, auth}) {
    const post = request.post();
    try {
      await auth.attempt(post.username, post.password);
    } catch (e) {
      var e = e.toString();
      var index = e.indexOf(' ', e.indexOf(' ') + 2);
      var error = e.substr(index + 1);
      console.log(error);
      return response.redirect('/login');
    }
    return response.redirect('/home');
  }

  async register({request, response, session, auth}) {
    try {
      const user = await User.create({
        username: request.input('username'),
        password: request.input('password')
      });
      await Mail.raw('<strong>Hello, ' + request.input('username') + '<br> Thanks for Registering on Vextoria!</strong>', (message) => {
        message
          .to('robloxfilmcam@gmail.com')
          .from('auto@vextoria.com')
          .subject('Oh No!');
      })
      return response.redirect('/home');
    } catch (e) {
      return response.redirect('/login');
    }
  }

  logout({ response, session, auth }) {
    if (!auth.user) return response.send(Antl.forLocale(session.get('locale')).formatMessage('messages.NotLI'));
    session.forget('user');
    auth.logout()
    return response.redirect('/login');
  }
}


module.exports = UserController
