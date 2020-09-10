'use strict'
const Video = use('App/Models/Video')
const axios = require('axios')
const { validate } = use('Validator')
const Antl = use('Antl')

async function getVinfo(id){
  const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${id}&key=apikey`);
  if (res.length == 0) {
    return false;
  } else {
    return res.data.items[0];
  }
}

class AddVidController {
  async add ({ response, request, session }){
    const rules = {
      vid: 'required|unique:videos'
    }
    const messages = {
      'vid.unique': Antl.forLocale(session.get('locale')).formatMessage('messages.AEVU'),
      'vid.required': Antl.forLocale(session.get('locale')).formatMessage('messages.AEVR')
    }
    const validation = await validate(request.all(), rules, messages)
    if(validation.fails()){
      session.withErrors(validation.messages()).flashExcept(['vid'])
      return response.redirect('back')
    }
    await getVinfo(request.input('vid')).then(async (item) => {
      if(!item){
        session.withErrors({ vid: Antl.forLocale(session.get('locale')).formatMessage('messages.AEVE')}).flashExcept(['vid'])
        return response.redirect('back')
      }
      if(!item.snippet.title.toLowerCase().includes('nightcore')){
        session.withErrors({ vid: Antl.forLocale(session.get('locale')).formatMessage('messages.AEVN')}).flashExcept(['vid'])
        return response.redirect('back')
      }
      if(item.snippet.title.toLowerCase().includes('top') || item.snippet.title.toLowerCase().includes('hour') || item.snippet.title.toLowerCase().includes('mix') || item.snippet.title.toLowerCase().includes('24/7') || item.snippet.title.toLowerCase().includes('live')){
        session.withErrors({ vid: Antl.forLocale(session.get('locale')).formatMessage('messages.AEVH')}).flashExcept(['vid'])
        return response.redirect('back')
      }
      await Video.create({
        vid: request.input('vid')
      })
      session.flash({ vid: Antl.forLocale(session.get('locale')).formatMessage('messages.ASV') }).flashExcept(['vid'])
      return response.redirect('back')
    })
  }
}

module.exports = AddVidController
