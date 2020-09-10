'use strict'
const Video = use('App/Models/Video')
const axios = require('axios')

async function getVinfo(id){
  const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${id}&key=apikey`);
  if (res.length == 0) {
    return false;
  } else {
    return res.data.items[0];
  }
}

class VideoController {
  async index ({ view }){
    var vids = []
    const videos = await Video.query().orderByRaw('RAND()').limit(6).fetch()
    for (var i = 0; i < videos.rows.length; i++) {
      await getVinfo(videos.rows[i].vid).then(async (item) => {
        var addo = {}
        if(!item){
          var delvid = await Video.search('vid', videos.rows[i].vid)
          await delvid.delete()
          addo["vid"] = null
          vids.push(addo)
          return
        }
        addo["title"] = item.snippet.title
        addo["vid"] = item.id
        addo["artist"] = item.snippet.channelTitle.toString()
        vids.push(addo)
      })
      if(videos.rows.length - 1 === i){
        return view.render('main', { videos: vids })
      }
    }
  }
  async watch ({ view, params, response }){
    const video = await Video.search('vid', params.id)
    if(!video) return response.redirect('back')
    var vid = {}
    await getVinfo(video.vid).then((item) => {
      vid["title"] = item.snippet.title
      vid["vid"] = item.id
      vid["artist"] = item.snippet.channelTitle
    })
    return view.render('watch', { video: vid })
  }
}

module.exports = VideoController
