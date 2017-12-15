function reqServer(jsonData,isAsync,success,error){
    if(!error){
        error=function(failInfo){
            alert("请求失败");
            console.info(JSON.stringify(failInfo));
        }
    }
    var baseUrl="http://192.168.1.34:8099/3DAdvanced/gain3D.action";
    $.ajax({
        type:"post",
        data:JSON.stringify(jsonData),
        url:baseUrl,
        //dataType: "jsonp",
        ////jsonp: 'callback',
        crossDomain:true,
        //contentType:"application/json;charset=utf-8",
        async:isAsync,
        success:success,
        error:error,
        withCredentials: true
    })
}