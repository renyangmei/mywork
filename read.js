var cheerio=require("cheerio");
var nodegrass=require("nodegrass");
var async=require("async");
/*each: 如果想对同一个集合中的所有元素都执行同一个异步操作。*/

    module.exports.readCategory=function (url,callback) {
        var categoryArr=[];
        nodegrass.get(url,function (body,status,heads) {
        var $=cheerio.load(body);
        //加载HTML,通过Cheerio,我们需要把HTML document 传进去,完成整个网页爬虫..用法类似jquery
        // console.log($)

        /*标题*/
            var categorys=$("#smnav").find("li a");
            categorys.each(function (index,obj) {
                console.log(obj);
                var newobj={};

                var catname=unescape($(obj).html().replace(/&#x/g,"%u").replace(/;/g,""));
                if(catname=="专题"||catname=="图片站"||catname=="科技频道"){
                    return;
                }

                newobj.catname=catname;
                newobj.caturl=obj.attribs.href;
                newobj.catid=index+1;
                categoryArr.push(newobj);
                // console.log(arr1)
            })
            callback(categoryArr);
        },"gbk")
    }

    module.exports.readList=function (url,callback) {
        var listArr=[];
        nodegrass.get(url,function (body,status,heads) {
        var $=cheerio.load(body);

        var lists=$("#listZone .Q-tpList");
        lists.each(function (index,obj) {
            var newobj={};
            // console.log(obj);
            var str1=$(obj).find("h3").find("a").html();
            // console.log(str)
            newobj.title=unescape(str1.replace(/&#x/g,"%u").replace(/;/g,""));
            newobj.url=$(obj).find("h3 a")[0].attribs.href;

            var str2=$(obj).find("p").html();
            // console.log(str2)
            newobj.info=unescape(str2.replace(/&#x/g,"%u").replace(/;/g,""));

            newobj.img=$(obj).find(".pic img")[0].attribs.src;
            // console.log($(this).find(".pic").find("img"))

            listArr.push(newobj);
            // console.log(arr2);
        })
            callback(listArr);
    },"gbk")
}
/*数组中的对象，数组有push的方法。
* 新建空数组
* 循环
* 新建空对象
* 把该对象中保存的所需数据通过 . 的方式访问取出
* push进入数组
*
* */