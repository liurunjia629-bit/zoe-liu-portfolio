const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const motion=document.getElementById('product-motion');
const toggle=document.getElementById('motion-toggle');
const seek=document.getElementById('motion-seek');
const time=document.getElementById('motion-time');
let userPaused=reduced.matches;
const stamp=n=>`${String(Math.floor(n/60)).padStart(2,'0')}:${String(Math.floor(n%60)).padStart(2,'0')}`;
function syncMotion(){
 const playing=!motion.paused;
 toggle.textContent=playing?'暂停演示 Ⅱ':'播放演示 ▶';
 toggle.setAttribute('aria-label',playing?'暂停产品演示':'播放产品演示');
 const duration=Number.isFinite(motion.duration)?motion.duration:34.5;
 seek.max=duration;seek.value=motion.currentTime;
 time.textContent=`${stamp(motion.currentTime)} / ${stamp(duration)}`;
 const chapters=[...document.querySelectorAll('[data-time]')];
 chapters.forEach((button,i)=>button.setAttribute('aria-pressed',String(motion.currentTime>=Number(button.dataset.time)&&(!chapters[i+1]||motion.currentTime<Number(chapters[i+1].dataset.time)))));
}
toggle.addEventListener('click',()=>{userPaused=!motion.paused;if(motion.paused){userPaused=false;motion.play().catch(syncMotion)}else motion.pause()});
seek.addEventListener('input',()=>{userPaused=true;motion.pause();motion.currentTime=Number(seek.value);syncMotion()});
document.querySelectorAll('[data-time]').forEach(button=>button.addEventListener('click',()=>{motion.currentTime=Number(button.dataset.time);syncMotion()}));
['timeupdate','loadedmetadata','play','pause','seeked'].forEach(event=>motion.addEventListener(event,syncMotion));
motion.addEventListener('error',()=>{motion.controls=true;toggle.textContent='视频加载失败，请刷新';toggle.disabled=true});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
 const video=entry.target;
 if(!entry.isIntersecting){video.pause();return;}
 if(!reduced.matches&&(video!==motion||!userPaused))video.play().catch(()=>{});
}),{threshold:.2});
document.querySelectorAll('.ambient-video,#product-motion').forEach(video=>observer.observe(video));
document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(video=>video.pause())});
reduced.addEventListener('change',()=>{if(reduced.matches){userPaused=true;document.querySelectorAll('.ambient-video,#product-motion').forEach(video=>video.pause())}});
document.querySelectorAll('[data-flow]').forEach(button=>button.addEventListener('click',()=>{
 const i=button.dataset.flow,label=button.textContent.slice(2);
 document.getElementById('flow-image').src=`assets/flow-${i}.png`;
 document.getElementById('flow-image').alt=`步骤 ${i}：${label}`;
 document.getElementById('flow-original').href=`assets/flow-${i}.png`;
 document.getElementById('flow-caption').textContent=`0${i} / ${label}`;
 document.querySelectorAll('[data-flow]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));
