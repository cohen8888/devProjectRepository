var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res){
	console.log("处理post请求")
	var result = {};
	result.error = false;
	result.status = "100000";
	result.msg = "成功";
	result.extra = "";
	result.code = "3131";
	fs.readFile('./routes/data/equipment.txt', function(err, data){
		if (!err){
			result.data = JSON.parse(data.toString());
			console.log("数据获取成功" + result);
			res.end(JSON.stringify(result));
		}else{
			console.log(err);
			console.log("读取数据文件失败")
		}
	});
})

router.put("/", function(req, res){
	console.log("put");
	res.end();
});

module.exports = router;
