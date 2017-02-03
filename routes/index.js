var express = require('express');
var router = express.Router();
var path = require('path');
var models = require("../models");
var moment = require('moment');
var BaseResp = require("../utils/baseResp");
var Const = require("../utils/const");

router.use(function (req, res, next) {
    var url = req.originalUrl;
    var at = req.body.accessToken;

    if (!at) {
        res.json(new BaseResp(Const.AT_FAIL, "AT为空或者失效。"));
    } else {
        checkAT(at).then(function (token) {
            if (token) {
                var expireAt = moment(token.expireAt);
                var now = moment();
                if (now.isBefore(expireAt))
                    next();
                else
                    res.json(new BaseResp(Const.AT_FAIL, "AT为空或者失效。"));
            } else {
                res.json(new BaseResp(Const.AT_FAIL, "AT为空或者失效。"));
            }
        });

    }

});


var checkAT = function (_accessToken) {
    return models.Token.findOne({
        where: {
            accessToken: _accessToken
        }
    })
}

module.exports = router;
