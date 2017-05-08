var cheerio=require("cheerio");
var nodegrass=require("nodegrass");

nodegrass.get("http://tech.qq.com/all/newtech.htm",function (body,status,heads) {
    var $=cheerio.load(body);
    // console.log($)


    var arr1=[];
    $("#smnav").find("li").each(function (index,obj) {
        // console.log(obj);
        var sortArr={};

        var str=$(this).find("a").html();
        //console.log(str);
        sortArr.title=unescape(str.replace(/&#x/g,"%u").replace(/;/g,""));

        sortArr.url=$(this).find("a")[0].attribs.href;

        sortArr.catid=index+1;
        arr1.push(sortArr);
        // console.log(arr1)
    })

    var arr2=[];
    $("#listZone .Q-tpList").each(function (index,obj) {
        var conArr={};
        // console.log(obj);
        var str1=$(this).find("h3").find("a").html();
        // console.log(str)
        conArr.title=unescape(str1.replace(/&#x/g,"%u").replace(/;/g,""));
        conArr.url=$(this).find("h3").find("a")[0].attribs.href;

        var str2=$(this).find("p").html();
        // console.log(str2)
        conArr.info=unescape(str2.replace(/&#x/g,"%u").replace(/;/g,""));

        conArr.img=$(this).find(".pic").find("img")[0].attribs.src;
        // console.log($(this).find(".pic").find("img"))

        arr2.push(conArr);
        // console.log(arr2);
    })

},"gbk");