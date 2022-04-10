import mockData from "./mock";
import "./index.css";
import layer from "layui-layer";

new Vue({
    el : '#example-1',
    data: {
        items : mockData.leftUsers
    }
});

init();

function init() {
    bindEvent();
    console.log(mockData.users);
}

function bindEvent() {
    document.querySelector("#menu").addEventListener("click", function (e) {
      e.stopPropagation();
      // 如果正在抽奖，则禁止一切操作'
      let target = e.target.id;

      switch (target) {
        case 'import':
            layer.open({
                //formType: 2,//这里依然指定类型是多行文本框，但是在下面content中也可绑定多行文本框
                title: 'add name',
                area: ['400px', '240px'],
                btnAlign: 'c',
                closeBtn:'1',//右上角的关闭
                content: `<div><textarea name="txt_remark" id="remark" style="width:300px;height:100px;" placeholder="请输入对应的名单(可直接从excel复制),格式(名字)如：
      张三
      赵四
      王五
                "></textarea></div>`,
                btn:['add','cancel'],
                yes: function (index, layero) {
                    var isSucess = false;
                  var value1 = $('#remark').val();
                  if((value1 ||'').length ==0)
                    layer.alert('无数据');
                  var rows = value1.split('\n');
                  if (rows && rows.length > 0) {
                    rows.forEach(element => {
                      if((element ||'').length > 0)
                      {
                        var rowList = element.split(/\t|\s/);
                        var s = 0;
                        var name = rowList[0].trim();
                        if(mockData.leftUsers.filter((x) => x[1] == name).length > 0)
                        {
                            layer.alert(`${name}已存在名单中`, {time: 1000});
                            return false;
                        }                               
                        if(rowList.length >=2){
                            s = parseInt(rowList[1] || 0);
                        }
                        mockData.leftUsers.push(buildLuckyOne(name, s));
                        var data = JSON.stringify(mockData.leftUsers.sort((a, b) =>  b[3] - a[3]));
                        localStorage.setItem("leftUsers", data);
                        isSucess = true;
                      }
                    });
                    
                    if(isSucess)
                        layer.alert('success', {time: 1000});
                    layer.close(index);
                  }
                },
                no:function(index)
                {          
                  layer.close(index);            
                  return false;//点击按钮按钮不想让弹层关闭就返回false          
                }
                });
        break;
        case 'clear':
            localStorage.clear();
            location.reload(true);
        break;
       
      }
    });
    window.addEventListener("resize", onWindowResize, false);
}

function buildLuckyOne(name, s = 0){
    return ['000000', name, '', s];
  }