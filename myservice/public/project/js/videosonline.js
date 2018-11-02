
let videoUrls = ['../video/video1.mp4','../video/video2.mp4','../video/video3.mp4',
	'../video/video4.mp4','../video/video5.mp4','../video/video6.mp4','../video/video7.mp4',
	'../video/video8.mp4','../video/video9.mp4','../video/video10.mp4','../video/video11.mp4'];

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
  currentDateObj = $('.timeText');
  timingDate();

/*	$("video").each((index, elem) => {
		//console.log(videoUrls[index]);
		viewpagerVideo(videoUrls[index+1], $(elem));
	});*/
	
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