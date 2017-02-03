/**
 * Created by Administrator on 2017/1/27.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Token =  sequelize.define("Token", {
        uuid: {
            type: DataTypes.UUID,
            field: 'uuid',
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique:true
        },
        login:{
            field: 'login_id',
            type: DataTypes.STRING,
            allowNull:false
        },
        accessToken:{
            field: 'access_token',
            type: DataTypes.STRING,
            allowNull:false
        },
        expireAt:{
            field: 'expire_at',
            type: DataTypes.DATE,
            allowNull:false
        }
    },{
        timestamps: true,
        underscored: true,
        paranoid: true,
        freezeTableName: true,
        tableName: 'hrsq_user_token',
    });
    return Token;
};