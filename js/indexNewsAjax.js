$.ajax({
    url:"./data/newsCategory.php",  //请求的URL地址
    dataType:"json", //返回格式为json
    async:true,  //请求是否异步，默认为异步，这也是ajax重要性
    cache:false, //是否读取缓存
    timeout:5000, //设置超市
    data:JSON.stringify({
        module:"news"
    }),    //参数值
    headers:{
        "Content-Type":"application-json; charset=utf-8"
    },
    type:"POST", //请求的方法
    beforeSend:function(){/*请求前的处理*/},
    success:function(req){//请求成功时处理
          let tabMenu = document.getElementsByClassName("tab-menu")[0];
          let data = req.data;
          let menuHtml = "";
        data.forEach((item,index)=>{
            let className = "";
            if(index === 0){className = "current"}
            menuHtml += `<a data-request="false" href="javascript:;" title="${item.categoryName}" class="${className}" onclick="loadNewsData({index:${index},id:${item.id},_this:this})" id="${item.id}">${item.categoryName}</a>`
        })
        //菜单
        tabMenu.innerHTML = menuHtml;
        loadNewsData({index:0,id: data[0].id,_this:tabMenu.children[0]})
    },
    complete:function(){/*请求完成的处理*/},
    error:function(res){
           //请求出错处理
    }
});
function loadNewsData(params){
    //获取request标识，判断是否已请求成功数据，true为请求成功 false为为请求
    let getRequest = params._this.getAttribute("data-request");
    //显示指定的内容区域
    let tabContentWrap = document.getElementById("tab-content-wrap").children   ;
    let tabMenu = document.getElementsByClassName("tab-menu")[0];
    let aItem = tabMenu.children;
    for(let i=0;i<tabContentWrap.length;i++){
        tabContentWrap[i].style.display = "none";
      }
      tabContentWrap[params.index].style.display = "block";
      //分类高光
      for(var i=0;i<aItem.length;i++){
        if(params.index == i){
            //清除所有高光
          aItem[i].classList.add("current") 
        }else{
            aItem[i].classList.remove("current") 
        }
    } 
    //请求数据   
    if(getRequest === "false"){
        $.ajax({
            url:"./data/indexNews.php",
            dataType:"json",
            async:true,
            cache:false,
            timeout:5000,
            data:JSON.stringify({
              categoryId: params.id
            }),
            headers:{
                "Content-Type":"application-json; charset=utf-8"
            },
            type:"POST",
            success:function(req){
                let data = req.data;
                let html = `
                <div class="news-wrap">
                    <div class="box clear">`
                       
              
                data.forEach(item=>{
                    let time = item.time.split(" ");
                    console.log(time);
                    html +=`  
                    <div class="item">
                        <img src="${item.imgUrl}" alt="">
                        <h4 class="${item.title}">${item.title}</h4>
                        <time datatime="${item.time}" pubtime="${time[0]}">${time[0]}</time>
                        <i class="line"></i> 
                        <p class="dec">${item.dec}</p> 
                        <a href="" class="link-more">
                            查看更多
                            <i class="iconfont icon-jiantou1"></i>
                        </a>  
                    </div> `  
                })
                
                html += `      </div>
                           </div>` 
                tabContentWrap[params.index].innerHTML = html 
                //请求成功修改标识
                params._this.setAttribute("data-request","true");           
            },
             error:function(){},
        });
      }           
}

 