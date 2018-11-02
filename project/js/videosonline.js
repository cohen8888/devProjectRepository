/**
 * module：视频在线
 * author：Cohen.lee
 * date：2018-09-09
 */

/*
let videoUrls = ['http://39.104.135.24:8081/public/video/video1.mp4',
'http://39.104.135.24:8081/public/video/video2.mp4',
'http://39.104.135.24:8081/public/video/video3.mp4',	
'http://39.104.135.24:8081/public/video/video4.mp4',
'http://39.104.135.24:8081/public/video/video5.mp4',
'http://39.104.135.24:8081/public/video/video6.mp4',
'http://39.104.135.24:8081/public/video/video7.mp4',
'http://39.104.135.24:8081/public/video/video8.mp4',
'http://39.104.135.24:8081/public/video/video9.mp4',
'http://39.104.135.24:8081/public/video/video10.mp4',
'http://39.104.135.24:8081/public/video/video11.mp4',
'http://39.104.135.24:8081/public/video/20170222213323_20170222230001.mp4',
'http://39.104.135.24:8081/public/video/20170222225202_20170222225300.mp4',
'http://39.104.135.24:8081/public/video/20170222225430_20170222225536.mp4',
'http://39.104.135.24:8081/public/video/20170222231845_20170222232049.mp4',
'http://39.104.135.24:8081/public/video/20170222232400_20170222232450.mp4',
'http://39.104.135.24:8081/public/video/20170222232441_20170222235000.mp4',
'http://39.104.135.24:8081/public/video/20180713130035_20180713130036.mp4',
'http://39.104.135.24:8081/public/video/20180911000000_20180911005520.mp4'
];
*/
let videoUrls = [
'../video/video1.mp4',
'../video/video2.mp4',
'../video/video3.mp4',
'../video/video4.mp4',
'../video/video5.mp4',
'../video/video6.mp4',
'../video/video7.mp4',
'../video/video8.mp4',
'../video/video9.mp4',
'../video/video10.mp4',
'../video/video11.mp4',
'../video/v7.mp4',
'../video/v8.mp4',
'../video/v9.mp4',
'../video/v10.mp4',
'../video/v44.mp4',
'../video/v55.mp4',
];

function viewpagerVideo(urls, playElem){
    //var vLen = urls.length; 
   // var curr = 0; 
   // var video = $('.map');
	console.log(urls);
    playElem.on('ended', function(){
		play();
	});  
     
    function play() {
        playElem.get(0).src = urls;
        playElem.get(0).load();   
        playElem.get(0).play();  
       // curr++;
       // if(curr >= vLen){  
            curr = 0; //重新循环播放
       // }
    }  
    play();
}

//jQuery ready function start
$(function(){
	
	setLink($(".header_left img"));

  timingDate();

	$("video").each((index, elem) => {
		console.log(videoUrls[index]);
		viewpagerVideo(videoUrls[index+1], $(elem));
	});
	
  $( document ).tooltip({
    items: "img",
    content: function() {
      var element = $( this );
      if ( element.is( "img" ) && element.attr('class') == 'fullscreen') {
        return "最大化";
      }
      if (element.is( "img" ) && element.attr('class') == 'markFullscreen'){
        return '最小化'
      }
      if (element.is( "img" ) && element.attr('class') == 'replay'){
        return '录像'
      }
      if (element.is( "img" ) && element.attr('class') == 'markReplay'){
        return '录像'
      }
    }
  });

});	//jQuery ready function end;