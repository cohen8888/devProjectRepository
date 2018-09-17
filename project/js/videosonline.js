currentDateObj = null;

//jQuery ready function start
$(function(){
	
	setLink($(".header_left dl"));

	currentDateObj = $('.timeText');
	timingDate();
});	//jQuery ready function end;