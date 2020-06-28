function loadingMsg(data){
    let infowListWrap = document.getElementById(data.id);
    infowListWrap.innerHTML = `<div class="loading-wait">
                                  ${data.message}
                                  <div class="loading-icon"><i class="iconfont ${data.iconJiazai}"></i></div> 
                               </div> `;
    let welfareWrap = document.getElementById(data.id);                           
    welfareWrap.innerHTML =  `<div class="loading-wait" style="flex:1;">
                              ${data.message}
                             <div class="loading-icon"><i class="iconfont ${data.iconJiazai}"></i></div> 
                             </div> `;                        
 
}