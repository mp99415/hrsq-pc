/**
 * Created by Administrator on 2017/1/27.
 */

"use strict";
module.exports = function(sequelize, DataTypes) {
    var User =  sequelize.define("User", {
        uuid: {
            type: DataTypes.UUID,
            field: 'uuid',
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique:true
        },
        userName:{
            field: 'user_name',
            type: DataTypes.STRING,
            allowNull:false
        },
        userPwd:{
            field: 'user_pwd',
            type: DataTypes.STRING,
            allowNull:false
        },
        loginTime:{
            field: 'login_time',
            type: DataTypes.DATE,
            allowNull:false
        }
    },{
        timestamps: true,
        underscored: true,
        paranoid: true,
        freezeTableName: true,
        tableName: 'hrsq_user_info'
    });
    return User;
};

