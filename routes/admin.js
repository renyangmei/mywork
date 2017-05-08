var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader("content-type","text/html;charset=utf-8");
    res.end("后台")
});

router.get('/list', function(req, res, next) {
    res.setHeader("content-type","text/html;charset=utf-8");
    res.end("后台列表")
});

router.get('/show', function(req, res, next) {
    res.setHeader("content-type","text/html;charset=utf-8");
    res.end("后台内容页")
});

module.exports = router;
