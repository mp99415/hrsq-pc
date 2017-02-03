/**
 * Created by Administrator on 2017/1/28.
 */
module.exports= function BaseResp(_code,_message,_result){
    this.code = _code;
    this.message = _message;
    this.result=_result;
}