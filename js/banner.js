//获取滚动范围的对象
let slideWrap = document.getElementById("slide-wrap");
//获取滚动对象[div]
let slideContent = slideWrap.getElementsByClassName("slide-content")[0];
//获取图片对象[li,li,li].length
let li = slideContent.getElementsByTagName("li");
//获取可视区的宽度chrome || 兼容IE内核 我用的是BOM获取用户设备的宽度
let viewWidth = window.innerWidth; //document.documentElement.clientWidth || document.body.clientWidth;
//获取分页按钮ul对象[ul]
let slideNav = slideWrap.getElementsByClassName("slide-nav")[0];
//获取ul下的a对象[a,a,a]
let a = slideNav.getElementsByTagName("a");
//获取右箭头对象
let nextButton = slideWrap.getElementsByTagName("span")[0];
//获取左箭头对象
let firstButton = slideWrap.getElementsByTagName("span")[1];
//设置滚动对象的宽度
slideContent.style.width = viewWidth * li.length + "px"
for( let i=0; i<li.length; i++){
   li[i].style.width = viewWidth + "px"
}
//保存当前显示图片的下标
let index = 0;
//设置节流
let throttle = true;
//定时器标记
let flagTime = null;
//自动播放的定时器
let interval = null;
//给每个分页按钮添加点击事件
for(let k=0; k<a.length; k++){
    a[k].onclick=function(){
    toogleHigh()
    //给当前按钮添加高光颜色
    this.classList.add("current")
    index = k;
    slide(k)
  }
}
//定义图片滚动的方法
function slide(k){
  slideContent.style.left = -k * viewWidth + "px"
  flagTime=setTimeout(()=>{
    throttle=true
    clearTimeout(flagTime)
  },1000)
}
//定义按钮高光切换
function toogleHigh(){
    //首先清除所有高光颜色
    for(let m=0; m<a.length; m++){
      a[m].classList.remove("current");
   }
}
//nextButton事件
nextButton.onclick = function(){
  if(throttle){
      throttle=false
      index--
      if(index < 0){
      index=li.length-1
      }
      toogleHigh()
      a[index].classList.add("current")
      slide(index)
    }    
}
//firstButton事件
firstButton.onclick = function(){
  next()
}
//定义自动滚动图片
 interval = setInterval(()=>{
    next() 
},3000)
//鼠标进入停止自动
slideWrap.onmouseenter = function(){
  clearInterval(interval);
}
slideWrap.onmouseleave=function(){
  interval = setInterval(()=>{
    next() 
},2000)
}
//定义next方法
function next(){
  if(throttle){
    throttle=false
     index++
     if(index == li.length){
      slideContent.classList.remove("slide-contents")
      index=0
      setTimeout(()=>{
        slideContent.classList.add("slide-contents")
      },50)
      }
     toogleHigh()
     a[index].classList.add("current")
     slide(index)
  }  
}
console.log();


















































/*let slideWrap = document.getElementById("slide-wrap");
let slideContent = slideWrap.children[0]; 
let viewWidth = window.innerWidth//document.documentElement.clientWidth || document.body.clientWidth;
let firstUl = slideWrap.getElementsByTagName("ul")[0].children;
let lasttUl = slideWrap.getElementsByTagName("ul")[1].children;
let prev= slideWrap.getElementsByTagName("span")[0];
let next= slideWrap.getElementsByTagName("span")[1];
let index=0;
//设置滑动对象的宽度
slideContent.style.width = viewWidth * firstUl.length + "px"
//设置li对象的宽度
for(let i=0;i<firstUl.length;i++){
    firstUl[i].style.width = viewWidth + "px";

}
//按钮高光切换
for(let i=0;i<lasttUl.length;i++){
    
    lasttUl[i].onclick=function(){
         for(let f=0;f<lasttUl.length;f++){
             lasttUl[f].className=""
         }
        this.className="current"
        imgSlide(i);
        index=i;
    }
}
//图片滑动
function imgSlide(i){
    slideContent.style.left=-viewWidth*i+"px"
}
//箭头的点击事件
prev.onclick=function(){
    index--
    if(index<0){
        slideContent.classList.remove("slide-contents");
        index= firstUl.length-1
    }else{
        slideContent.classList.add("slide-contents");  
      } 
    for(let f=0;f<lasttUl.length;f++){
        lasttUl[f].className=""
    }
    lasttUl[index].className="current"
    imgSlide(index);
   
}
next.onclick=function(){
      index++
      if(index>2){
        slideContent.classList.remove("slide-contents");
        index=0
      }else{
        slideContent.classList.add("slide-contents");  
      }
      for(let f=0;f<lasttUl.length;f++){
        lasttUl[f].className=""
      }
      lasttUl[index].className="current"
      imgSlide(index);
}*/