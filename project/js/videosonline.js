currentDateObj = null;

//jQuery ready function start
$(function(){
	
	setLink($(".header_left img"));

	currentDateObj = $('.timeText');
	timingDate();
});	//jQuery ready function end;