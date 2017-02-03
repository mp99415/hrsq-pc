/**
 * Created by Administrator on 2017/1/27.
 */
var express = require('express');
var router = express.Router();
var models = require("../models");
var jwt = require('jwt-simple');
var moment = require('moment');
var BaseResp = require("../utils/baseResp");
var Const =  require("../utils/const");

router.post('/access_token', function (req, res, next) {
    var _userName = req.body.userName;
    var _userPwd = req.body.userPwd;
    if (!_userName || !_userPwd) {
        res.json(new BaseResp(Const.PARAMS_ERROR,"参数错误!"));
    } else {
        var check = checkUser(_userName,_userPwd);
        check.then(function (user){
            if(user)
                return checkToken(user);
            else
                return Promise.reject(Const.LOGIN_FAIL);
        }).then(function (userToken){
            if(userToken){
                return refreshToken(userToken);
            }else{
                return createToken(_userName);
            }
        }).then(function (result){
            res.json(new BaseResp(Const.OK,"用户Token生成成功。",result));
        }).catch(function (err) {
                if(err == Const.LOGIN_FAIL){
                    res.json(new BaseResp(Const.LOGIN_FAIL,"用戶名或密码出错，登陆失败。"));
                }else{
                    res.json(new BaseResp(Const.ERROR,"后台出错!",err));
                }
        })
    }
});


var checkUser = function(_userName,_userPwd){
  return  models.User.findOne({
        where: {
            userName: _userName,
            userPwd: _userPwd
        }
    })
}

var checkToken = function (user) {
    return models.Token.findOne({
        where: {
            login: user.userName
        }
    });
}

var refreshToken = function(userToken){
    var mom = moment();
    var expireAt = moment(userToken.expireAt);
    if(mom.isBefore(expireAt)){
        return userToken;
    }else{
        var expires = mom.add(2, 'hours');
        var token = jwt.encode({
            iss: userToken.login,
            exp: expires.valueOf()
        }, 'HRSQ_PC_SECRET_STRING');
        return models.Token.update({
            accessToken: token,
            expireAt: expires
        },{
            where: {
                login: userToken.login
            },
            individualHooks:true
        });
    }
}

var createToken = function (_userName) {
    var expires = moment().add(2, 'hours');
    var token = jwt.encode({
        iss: _userName,
        exp: expires.valueOf()
    }, 'HRSQ_PC_SECRET_STRING');
    return models.Token.create({
        login: _userName,
        accessToken: token,
        expireAt: expires
    });
}
module.exports = router;
