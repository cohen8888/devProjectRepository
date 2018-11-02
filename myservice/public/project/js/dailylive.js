/**
*  日常现场
*
*/

//baseUrl = baseUrl + "interf01";
baseUrl = baseUrl + "/api/dailylive";
currentDateObj = null;
tmpUrls = ["http://39.104.135.24:8081/public/video/ryxx.mp4", 
	"http://39.104.135.24:8081/public/video/ryxx.mp4", 
	"http://39.104.135.24:8081/public/video/ryxx.mp4"];
/**
* 渲染维修列表
* @rootElem 要渲染的容器
* @data 后端获取的数据
* @attrs 表格列名
*
*/
function renderTableData(rootElem, data, attrs){
	for(var i = 0, len = data.length; i < len; i++){
		var tr = $('<tr></tr>');
		for(var j = 0, aLen = attrs.length ; j < aLen ; j++){
			tr.append($('<td>'+ data[i][attrs[j]] + '</td>'));
		}
		rootElem.append(tr);
	}
}

/**
* 
*
*/
function viewpagerVideo(urls, playElem){
    var vLen = urls.length; 
    var curr = 0; 

    playElem.on('ended', function(){
		play();
	});  
     
    function play() {
        playElem.get(0).src = urls[curr];
        playElem.get(0).load();   
        playElem.get(0).play();  
        curr++;
        if(curr >= vLen){  
            curr = 0; //重新循环播放
        }
    }  
    play();
}

//jQuery ready function start
$(function(){

	setLink($(".header_left img"));
	currentDateObj = $('.timeText');
	timingDate();

	viewpagerVideo(tmpUrls, $('.map'));
	ajax(baseUrl).then(res => {
		let data = res.data;
		//viewpagerVideo(data.mapUrls, $('.map'));
		renderTableData($('.section_left_top table') 
			,data.data.maintain.data
			,['workOrderCode'
			,'workStation'
			,'maintenanceContent'
			,'craft'
			,'maintenaceMan'
			,'group'
			,'maintenanceState'
			,'maintenanceDatetime'
		]);
		renderTableData($('.section_left_bottom table') 
			,data.data.fault.data
			,["faultNum"
			,"faultCode"
			,"faultDescription"
			,"reporter"
			,"reportDatetime"
			,"state"
			,"checkMan"
			,"group"
		]);
	});

});	//jQuery ready function end;



