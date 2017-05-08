var express = require('express');
var path=require('path');
var nodegrass=require("nodegrass");
var mysql=require("../mysql");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});

router.get('/indexData',function (req,res) {
    var sql=`select * from shows where catid=2 limit 0,10`;
    mysql.query(sql,function (error,result) {
        res.send(result);
    })
})

router.get('/welcome', function(req, res, next) {
    res.render('welcome',{title:'欢迎您'});
});

router.get('/tpl/:name',function (req,res) {
    res.sendfile(path.join(process.cwd(),"public/tpl/"+req.params.name));
})

router.get("/getCon",function (req,res) {
    var url=req.query.url;
    console.log(url);
    nodegrass.get(url,function (body) {
        res.send(body);
    },"gbk");
})

/*process.cwd() 当前进程所在目录*/

// router.get('/list', function(req, res, next) {
//     res.setHeader("content-type","text/html;charset=utf-8");
//     res.end("前台列表")
// });
//
// router.get('/show', function(req, res, next) {
//     res.setHeader("content-type","text/html;charset=utf-8");
//     res.end("前台内容页")
// });

module.exports = router;
