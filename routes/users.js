var express = require('express');
var router = express.Router();
var models = require("../models");
var moment = require('moment');
var BaseResp = require("../utils/baseResp");
var Const =  require("../utils/const");

router.post('/create', function (req, res, next) {
    var _userName = req.body.userName;
    var _userPwd = req.body.userPwd;
    if (!_userName || !_userPwd) {
        res.json(new BaseResp(Const.PARAMS_ERROR,"参数错误!"));
    }else{
        models.User.create({
            userName: req.body.userName,
            userPwd: req.body.userPwd,
            loginTime: moment()
        }).then(function (user) {
            res.json(new BaseResp(Const.OK,"用户信息生成成功。",user));
        }).catch(function (err) {
            res.json(new BaseResp(Const.ERROR,"后台出错!",err));
        });
    }
});

router.post('/list', function (req, res, next) {
    models.User.findAll().then(function (users) {
        res.json(new BaseResp(Const.OK,"返回用户列表成功。",users));
    });
});


module.exports = router;
