// window.onload = function(){
    //选项卡
    var tab_t = document.getElementById("tab_t");
    var tab_t_li = tab_t.getElementsByTagName("li");
    var tab_c_li = document.querySelectorAll(".xuanxiangka");
    var len = tab_t_li.length;
    var i = 0;
    for (i = 0; i < len; i++) {
        tab_t_li[i].index = i;
        tab_t_li[i].onclick = function () {
            for (i = 0; i < len; i++) {
                tab_t_li[i].className = "";
                tab_c_li[i].className = "hide";
            }
            tab_t_li[this.index].className = "act";
            tab_c_li[this.index].className = "";
        };
    }
    /*-------------------------------- 审核注册用户---------------------------- */
    //展示所有申请表
var shenheDIV = document.getElementById('shenheDIV');
function loadShenQingBiao() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            //遍历json中所有对象,展示所有申请表
            Object.keys(json).forEach(function (key) {
                var OneDiv = document.createElement('div');
                OneDiv.className = "juzhong";
                OneDiv.id = `${json[key]['onlyid']}`;
                OneDiv.innerHTML = `
                                    <form action="" class="table-juzhong">
                        <table class="shenhezhuceyonghu">
                            <span>大数据处理研究中心资源申请表</span>
                            <tbody>
                                <tr>
                                    <td>部门</td>
                                    <td>${json[key]['apply_department']}</td>
                                    <td>申请日期</td>
                                    <td>${json[key]['apply_time']}</td>
                                </tr>
                                <tr>
                                    <td>申请人</td>
                                    <td>${json[key]['apply_name']}</td>
                                    <td>电话</td>
                                    <td>${json[key]['apply_phone']}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">E-mail</td>
                                    <td colspan="2">${json[key]['apply_email']}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">用途</td>
                                    <td colspan="2">${json[key]['apply_use']}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">所需资源</td>
                                    <td colspan="2">${json[key]['apply_type']}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">使用时长</td>
                                    <td colspan="2">${json[key]['apply_day']}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">所需操作系统</td>
                                    <td colspan="2">${json[key]['apply_system']}</td>
                                </tr>
                                <tr>
                                    <td colspan="2">对外开放的服务器端口</td>
                                    <td colspan="2">${json[key]['apply_port']}</td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <br>
                    <div class="ShenHeStatus">
                        <button  type="button" class="btn btn-outline-success tongguo">通过</button>
                        <button  type="button" class="btn btn-outline-danger jujue">拒绝</button>
                    </div>
                    <hr />`;
                // //把每一个对象添加到列表中展示
                shenheDIV.appendChild(OneDiv);
            });//生成申请表结束


            //审核通过操作
            var Alltongguo = document.getElementsByClassName('tongguo');
            var Alljujue = document.getElementsByClassName('jujue');
            var ShenHeStatus = document.getElementsByClassName('ShenHeStatus');
            var jujueContent = document.getElementById("jujue-content");
            var jujueContentText = document.getElementById("jujueContentText");
            var userName = document.getElementById('userName');
            var JuJuequeding = document.getElementById('JuJuequeding');
            var JuJuequxiao = document.getElementById('JuJuequxiao');
            var jishu = 0;
            //审核通过
            for (jishu = 0; jishu < Alltongguo.length; jishu++) {
                Alltongguo[jishu].onclick = function () {
                    //向后台发送 通过 申请的id
                    var json = [];
                    var j = {
                        onlyid: ''
                    };
                    j.onlyid = this.parentElement.parentElement.id;
                    json.push(j);
                    var TongGuoID = JSON.stringify(json);

                    var xmlhttp;
                    if (window.XMLHttpRequest) {
                        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                        xmlhttp = new XMLHttpRequest();
                    }
                    else {
                        // IE6, IE5 浏览器执行代码
                        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            console.log("向后台发送：通过了ID为【" + j.onlyid + "】的用户的申请。");
                        }
                    }
                    xmlhttp.open("POST", "./jsonModel/shenhe_apply.json", true);
                    xmlhttp.send(TongGuoID);//发送ID结束
                    //发送ID成功后 在HTML页面显示通过
                    this.parentElement.innerHTML = "已通过";
                }
            }//审核通过循环结束

            //审核拒绝操作
            for (jishu = 0; jishu < Alljujue.length; jishu++) {
                Alljujue[jishu].index = jishu;
                Alljujue[jishu].onclick = function () {
                    var SHU = this.index;


                    var ShenHeID = this.parentElement.parentElement.id;
                    var ShenHeName = this.parentElement.parentElement.firstElementChild.lastElementChild.childNodes[1].childNodes[3].childNodes[3].innerHTML;
                    userName.innerHTML = ShenHeName;
                    jujueContent.className = "alert alert-success chuxian";
                    //确定 拒绝申请操作
                    JuJuequeding.onclick = function () {
                        //获得，打包拒绝ID和理由，把 bao 发送给后台
                        var JuJueLiYou = this.parentElement.childNodes[3].value;
                        var json = [];
                        var j = {
                            onlyid: '',
                            reason: ''
                        };
                        j.onlyid = ShenHeID;
                        j.reason = JuJueLiYou;
                        json.push(j);
                        var bao = JSON.stringify(json);
                        //AJAX向后台发送数据
                        var xmlhttp;
                        if (window.XMLHttpRequest) {
                            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                            xmlhttp = new XMLHttpRequest();
                        }
                        else {
                            // IE6, IE5 浏览器执行代码
                            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                console.log("向后台发送了被拒绝的申请的信息:id为【" + j.onlyid + "】,拒绝理由为【" + j.reason + "】的信息（已经打包为json）。");
                            }
                        }
                        xmlhttp.open("POST", "./jsonModel/shenhe_apply.json", true);
                        xmlhttp.send(bao);
                        //AJAX结束
                        //清空 拒绝框 内容
                        jujueContentText.value = "";
                        userName.innerHTML = "";
                        jujueContent.className = "alert alert-success hide";
                        //清空按钮为拒绝
                        ShenHeStatus[SHU].innerHTML = "已拒绝";
                    }//确定拒绝 循环结束


                    //取消 拒绝申请操作
                    JuJuequxiao.onclick = function () {
                        jujueContentText.value = "";
                        jujueContent.className = "alert alert-success hide";
                    }//取消 事件结束


                }//单个按钮单击事件结束
            } //审核拒绝循环结束

        }//AJAX最外层if 200 400 结束
    }
    xmlhttp.open("POST", "./jsonModel/shenhe_apply.json", true);
    xmlhttp.send();
}
loadShenQingBiao();

    /*-------------------------------- 停用用户---------------------------- */
    var gengxin = document.getElementById('gengxin');
    var AllYongHu = document.getElementById("AllYongHu"); 
    var oldData;
    
    
    //单击更新按钮
    gengxin.onclick = function(){
        // console.log("更新");
        //AJAX
        var xmlhttp;
        if (window.XMLHttpRequest) {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp = new XMLHttpRequest();
        }
        else {
            // IE6, IE5 浏览器执行代码
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);
                //更新操作：如果之前的数据跟现在拿到的json字符串不相同就进行更新
                if (oldData !== xmlhttp.responseText)
                {
                    oldData = xmlhttp.responseText;
                    AllYongHu.innerHTML = '';
                    //遍历json中所有对象
                    Object.keys(json).forEach(function (key) {
                        var tr = document.createElement("tr");
                        //遍历对象中所有属性,onlyid除外
                        for (var tdShuXing in json[key]) {
                            //方便停用操作返回唯一ID给后台
                            if (tdShuXing != "onlyid")
                           {
                               var td = document.createElement("td");
                               td.innerHTML = json[key][tdShuXing];
                               if (json[key][tdShuXing] == "stop")
                                   td.innerHTML = "已停用";
                               if (json[key][tdShuXing] == "on")
                                   td.innerHTML = `<button type='button' id='${json[key].onlyid }' class='btn btn-outline-danger TingYong'>停用</button>`;
                               tr.appendChild(td);
                           }
                        }
                        //把每一个对象添加到列表中展示
                        AllYongHu.appendChild(tr);
                    });
                    //停用操作
                    var AllTingYong = document.getElementsByClassName('TingYong');
                    var tingyongLength = AllTingYong.length;
                    
                    for(i = 0; i < tingyongLength; i++)
                    {
                        AllTingYong[i].tingyongid = AllTingYong[i].id;
                        //点击停用按钮
                        AllTingYong[i].onclick = function(){
                            this.parentNode.innerHTML = "已停用";
                            var TingYongID = this.tingyongid;
                            var jsonkong = [];
                            var tingyongyonghu = {  
                                onlyid:''
                            };
                            tingyongyonghu.onlyid = TingYongID;
                            jsonkong.push(tingyongyonghu);
                            var JSONtingyongyonghu = JSON.stringify(jsonkong);
                            //AJAX
                            //向后台发送唯一ID，告诉哪个用户被停用
                            var xmlhttp;
                            if (window.XMLHttpRequest) {
                                //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                                xmlhttp = new XMLHttpRequest();
                            }
                            else {
                                // IE6, IE5 浏览器执行代码
                                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                            }
                            xmlhttp.onreadystatechange = function () {
                                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                    console.log("向后台发送信息：停用ID为【" + TingYongID + "】的用户。已成功!!!");
                                    console.log(tingyongyonghu);
                                }
                            }
                            xmlhttp.open("POST", "./jsonModel/shenqing.json", true);
                            xmlhttp.send(JSONtingyongyonghu);      
                        }//点击停用按钮结束   
                    }//for结束
                }//最外层if 200 400 结束 
            }
        }
        xmlhttp.open("POST", "./jsonModel/shenqing.json", true);
        xmlhttp.send();
    }

    /*-------------------------------- 公告管理---------------------------- */
    var xianshigonggao = document.getElementById('xianshigonggao');
    var xinjianGongGao = document.getElementById('xinjianGongGao');
    var GongGao = document.getElementById('GongGao');
    var oldGongGao;
    //显示公告
    xianshigonggao.onclick = function () {
        //AJAX从后台请求公告数据
        var xmlhttp;
        if (window.XMLHttpRequest) {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp = new XMLHttpRequest();
        }
        else {
            // IE6, IE5 浏览器执行代码
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var json = JSON.parse(xmlhttp.responseText);

                if (oldGongGao !== xmlhttp.responseText) {
                    oldGongGao = xmlhttp.responseText;
                    GongGao.innerHTML = '';
                    //遍历json中所有对象
                    Object.keys(json).forEach(function (key) {
                        var tr = document.createElement("tr");
                        tr.id = json[key].onlyid;
                        //遍历对象中所有属性,onlyid除外
                        for (var tdShuXing in json[key]) {
                            //显示操作 赋值ID给tr
                            if (tdShuXing != "onlyid") {
                                var td = document.createElement("td");
                                td.innerHTML = json[key][tdShuXing];
                                if (json[key][tdShuXing] == "on")
                                    td.innerHTML = `<button type="button" class="btn btn-outline-success fabu">发布</button> 
                                                    <button type="button" class="btn btn-outline-warning xiugai">修改</button>
                                                    <button type="button" class="btn btn-outline-danger shanchu">删除</button>`;
                                tr.appendChild(td);
                            }
                        }
                        //把每一个对象添加到列表中展示
                        GongGao.appendChild(tr);
                    });
                    FaXiuShan();
                }//if结束
            }
        }
        xmlhttp.open("GET", "./jsonModel/bulletin.json", true);
        xmlhttp.send();
    }
    //新建公告
    xinjianGongGao.onclick = function(){
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        td1.innerHTML = "公告标题";
        td2.innerHTML = "公告内容";
        td3.innerHTML = "公告时间";
        td4.innerHTML = `<button type="button" class="btn btn-outline-success fabu">发布</button> 
                        <button type="button" class="btn btn-outline-warning xiugai">修改</button>
                        <button type="button" class="btn btn-outline-danger shanchu">删除</button>`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        GongGao.append(tr);
        FaXiuShan();
    }

    //发布，修改，删除函数
    function FaXiuShan(){
        var fabu = document.getElementsByClassName('fabu');
        var xiugai = document.getElementsByClassName('xiugai');
        var shanchu = document.getElementsByClassName('shanchu');

        //删除循环 开始
        for(i = 0; i < shanchu.length; i++)
        {
            shanchu[i].onclick = function(){
                //删除所在行
                this.parentElement.parentElement.remove(this.parentElement);
                var TRID = this.parentElement.parentElement.id;
                var json = [];
                var IDjs = {
                    onlyid: ''
                };
                IDjs.onlyid = TRID;
                json.push(IDjs);
                var ContentJSON = JSON.stringify(json);
                console.log(ContentJSON);
                //AJAX向后台发送所在行的ID
                var xmlhttp;
                if (window.XMLHttpRequest) {
                    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                    xmlhttp = new XMLHttpRequest();
                }
                else {
                    // IE6, IE5 浏览器执行代码
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        console.log("删除成功");
                    }
                }
                xmlhttp.open("GET", "./jsonModel/bulletin.json", true);
                xmlhttp.send(ContentJSON);
            }
        }//删除循环 结束

        //修改循环 开始
        for(i = 0; i < xiugai.length; i++)
        {
            xiugai[i].onclick = function(){
                var OneTDs = this.parentElement.parentElement.getElementsByTagName("td");
                OneTDs[0].innerHTML = "<input type=\"text\" class=\"titleTD\"  value=" + OneTDs[0].innerText + " />"; 
                OneTDs[1].innerHTML = "<textarea class=\"contentTD\" cols=\"100\">" + OneTDs[1].innerText + "</textarea>"; 
                OneTDs[2].innerHTML = "<input type=\"text\" class=\"dateTD\"  value=" + OneTDs[2].innerText + " />"; 
            }
        }//修改循环结束

        //发布循环 开始
        for(i = 0; i < fabu.length; i++)
        {
            fabu[i].onclick = function(){
                var OneTDs = this.parentElement.parentElement.getElementsByTagName("td");

                var OtitleTD = OneTDs[0].getElementsByClassName('titleTD')[0].value;
                var OcontentTD = OneTDs[1].getElementsByClassName('contentTD')[0].value;
                var OdateTD = OneTDs[2].getElementsByClassName('dateTD')[0].value;

                OneTDs[0].removeChild(OneTDs[0].getElementsByClassName('titleTD')[0]);
                OneTDs[1].removeChild(OneTDs[1].getElementsByClassName('contentTD')[0]);
                OneTDs[2].removeChild(OneTDs[2].getElementsByClassName('dateTD')[0]);

                OneTDs[0].innerText = OtitleTD;
                OneTDs[1].innerText = OcontentTD;
                OneTDs[2].innerText = OdateTD;

                var json = [];
                var j = {
                    announcement_name: '',
                    announcement_content: '',
                    announcement_time:'',
                    gongneng:'on',
                    onlyid:'',
                };
                j.announcement_name = OtitleTD;
                j.announcement_content = OcontentTD;
                j.announcement_time = OdateTD;

                json.push(j);
                
                var shuju = JSON.stringify(json);
                

                //AJAX向后台传送 发布公告 的数据
                var xmlhttp;
                if (window.XMLHttpRequest) {
                    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                    xmlhttp = new XMLHttpRequest();
                }
                else {
                    // IE6, IE5 浏览器执行代码
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        console.log("发布公告成功，如下数据传送至后台。");
                        console.log(shuju);
                    }
                }
                xmlhttp.open("GET", "./jsonModel/bulletin.json", true);
                xmlhttp.send(shuju);    
            }
        }



    }





















































































// }


