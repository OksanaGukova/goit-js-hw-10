import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                     */import{f as y,i as g}from"./assets/vendor-77e16229.js";function c(e){const l=Math.floor(e/864e5),m=Math.floor(e%864e5/36e5),f=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:l,hours:m,minutes:f,seconds:h}}console.log(c(2e3));console.log(c(14e4));console.log(c(2414e4));const d=document.querySelector("[data-start]"),S=document.querySelector("[data-days]"),p=document.querySelector("[data-hours]"),D=document.querySelector("[data-minutes]"),C=document.querySelector("[data-seconds]"),r=document.querySelector("#datetime-picker");d.addEventListener("click",I);const T={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){q(e)}};let u,s;const k=y(r,T);function q(e){u=e[0].getTime(),s=new Date().getTime(),u>s?d.disabled=!1:g.show({message:"Please choose a date in the future"})}function I(){const e=k.selectedDates[0].getTime(),n=setInterval(()=>{s=new Date().getTime();const t=e-s;if(t<=0){clearInterval(n),i({days:0,hours:0,minutes:0,seconds:0}),r.disabled=!1;return}const o=c(t);i(o)},1e3);d.disabled=!0,r.disabled=!0}function a(e){return String(e).padStart(2,"0")}function i({days:e,hours:n,minutes:t,seconds:o}){S.textContent=a(e),p.textContent=a(n),D.textContent=a(t),C.textContent=a(o)}
//# sourceMappingURL=commonHelpers.js.map