import base64 from './base64'

let foo = {
  getSingerName: (singerArr) => {
    if (typeof singerArr === 'string') return singerArr
    let txt = ''
    for (let i = 0; i < singerArr.length; i++) {
      txt += '/' + singerArr[i].name
    }
    txt = txt.slice(1)
    return txt
  },
  creatAudioObj: (songId, songName, singerArr, albummId) => {
    let picUrl = albummId ? 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + albummId + '.jpg?max_age=2592000' : "";
    return {
      songId,
      songName: songName,
      singerName: foo.getSingerName(singerArr),
      songUrl: 'http://ws.stream.qqmusic.qq.com/' + songId + '.m4a?fromtag=46',
      picUrl,
    }
  },
  getLrcs(lyric) {
    const lyrics = base64.decode(lyric).split('\n')
    let lrcArr = []
    const timeReg = /\[\d*:\d*([\.\:]\d*)*\]/g
    for (let i = 0; i < lyrics.length; i++) {
      let timeRegExpArr = lyrics[i].match(timeReg)
      if (!timeRegExpArr) continue
      let txt = lyrics[i].replace(timeReg, '')
      if (!txt) continue
      let t = timeRegExpArr[0]
      let m = Number(String(t.match(/\[\d*/i)).slice(1))
      let s = Number(String(t.match(/\:\d*/i)).slice(1))
      let time = m * 60 + s
      lrcArr.push({
        time,
        txt
      })
    }
    if (lrcArr.length === 1) {
      lrcArr.unshift({
        time: 0,
        txt: ''
      })
      console.log(lrcArr)
    }
    lrcArr.push({
      time: 10000,
      txt: ''
    })
    return lrcArr
  }
}

export default foo
