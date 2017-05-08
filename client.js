var nodegrass=require("nodegrass");
var cheerio=require("cheerio");
var async=require("async");
var mysql=require("./mysql");
var read=require("./read");

/*waterfall: 按顺序依次执行一组函数。每个函数产生的值，都将传给下一个*/
/*each: 如果想对同一个集合中的所有元素都执行同一个异步操作。*/
/*语法规则：查看手册
* http://blog.fens.me/nodejs-async/
* */

async.waterfall([
    function(callback) {
        read.readCategory("http://tech.qq.com/science.htm",function (data) {
            async.each(data,function (item,cb) {
                mysql.query(`insert into category (catname,caturl,catid) values ('${item.catname}','${item.caturl}',${item.catid})`,function () {
                    cb(null);
                });
            })
            callback(null,data);
        })
    },
    function(data, callback) {
        async.eachSeries(data,function (item,cb) {
            read.readList(item.caturl,function(data1){
                async.each(data1,function (item1,cb1) {
                    item1.catid=item.catid;  /*栏目与列表对应。。。即catid相等，然后爬取满足条件的数据插入数据库*/
                    mysql.query(`insert into shows (title,info,url,img,catid) values ('${item1.title}','${item1.info}','${item1.url}','${item1.img}',${item1.catid})`,function () {
                        cb1(null);
                    })
                })
                cb(null, 'yes');/*eachSeries的回调函数*/
            })

        })
    callback(null,"over"); /*waterfall的回调*/
    }
], function (err, result) {
    console.log(result);
});



