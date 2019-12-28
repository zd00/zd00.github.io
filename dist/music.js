const ap = new APlayer({
  container: document.getElementById('aplayer'),
  autoplay: true, //自动播放
  listFolded: true, //播放列表默认折叠
  listMaxHeight: 90, //播放列表最大高度
  order: 'list', //音频循环顺序, 可选值: 'list', 'random'
  loop: 'all', //音频循环播放, 可选值: 'all', 'one', 'none'
  theme: '#e9e9e9', //切换音频时的主题色，优先级低于audio.theme
  preload: 'none', //音频预加载，可选值: 'none', 'metadata', 'auto'
  mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
  lrcType: 3, //歌词格式，可选值：3（LRC文件歌词格式），1（JS字符串歌词格式）
  volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
  fixed: true, //吸底模式（fixed:true），迷你模式（mini:true），普通模式（注释此行或者设置fixed:false）
  audio: [{
      name: '蝴蝶泉边',
      artist: '黄雅莉',
      lrc: 'http://music.zd1150.com/%E8%9D%B4%E8%9D%B6%E6%B3%89%E8%BE%B9-%E9%BB%84%E9%9B%85%E8%8E%89.lrc',
      cover: 'http://music.zd1150.com/hdqb-hyl.jpg?param=300x300',
      url: 'http://music.zd1150.com/%E8%9D%B4%E8%9D%B6%E6%B3%89%E8%BE%B9-%E9%BB%84%E9%9B%85%E8%8E%89.mp3'
    },
    {
      name: '你有一座世外桃源，用来补血和自言自语',
      artist: '音乐故事',
      //lrc: '/downloads/lrc/后会无期-G.E.M.邓紫棋.lrc',
      cover: 'http://music.zd1150.com/nyyzswty.jpg?param=300x300',
      url: 'http://music.zd1150.com/%E4%BD%A0%E6%9C%89%E4%B8%80%E5%BA%A7%E4%B8%96%E5%A4%96%E6%A1%83%E6%BA%90%EF%BC%8C%E7%94%A8%E6%9D%A5%E8%A1%A5%E8%A1%80%E5%92%8C%E8%87%AA%E8%A8%80%E8%87%AA%E8%AF%AD.m4a'
    },
    {
      name: '大部分的生活都乏味的不值一提',
      artist: '默默道来',
      //lrc: '/downloads/lrc/后会无期-G.E.M.邓紫棋.lrc',
      cover: 'http://music.zd1150.com/dbfdshdfwdbzyt.jpg?param=300x300',
      url: 'http://music.zd1150.com/%E5%A4%A7%E9%83%A8%E5%88%86%E7%9A%84%E7%94%9F%E6%B4%BB%E9%83%BD%E4%B9%8F%E5%91%B3%E7%9A%84%E4%B8%8D%E5%80%BC%E4%B8%80%E6%8F%90.m4a'
    }

  ]
});

//实现切换音频时，根据音频的封面图片自适应主题色
const colorThief = new ColorThief();
const setTheme = (index) => {
  if (!ap.list.audios[index].theme) {
    colorThief.getColorAsync(ap.list.audios[index].cover, function(color) {
      ap.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
    });
  }
};
setTheme(ap.list.index);
ap.on('listswitch', (data) => {
  setTheme(data.index);
});
