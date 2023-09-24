import{O as G,u as N}from"./app-ec795db7.js";import{g as v,E as S,B as F,k as $,l as n,R as f}from"./framework-a2a9bb97.js";var m=v({name:"FontIcon",props:{icon:{type:String,default:""},color:{type:String,default:""},size:{type:[String,Number],default:""}},setup(l){const p=$(()=>{const c={};return l.color&&(c.color=l.color),l.size&&(c["font-size"]=Number.isNaN(Number(l.size))?l.size:`${l.size}px`),Object.keys(c).length?c:null});return()=>l.icon?n("span",{class:["font-icon icon",`${l.icon}`],style:p.value}):null}}),O=v({name:"Catalog",props:{base:{type:String,default:""},level:{type:Number,default:3},titleGetter:{type:Function,default:l=>l.title},iconGetter:{type:Function,default:l=>l.icon},orderGetter:{type:Function,default:l=>l.order||0},shouldIndex:{type:Function,default:l=>l.index!==!1}},setup(l){const p=G({"/":{title:"目录"}}),c=S(),b=F(),y=N(),k=()=>{const s=l.base||c.path.replace(/\/[^/]+$/,"/"),u=b.getRoutes(),d=[];return u.filter(({meta:t,path:e})=>{if(!e.startsWith(s)||e===s)return!1;if(s==="/"){const r=Object.keys(y.value.locales).filter(i=>i!=="/");if(e==="/404.html"||r.some(i=>e.startsWith(i)))return!1}return(e.endsWith(".html")&&!e.endsWith("/index.html")||e.endsWith("/"))&&l.shouldIndex(t)}).map(({path:t,meta:e})=>{const r=t.substring(s.length).split("/").length;return{title:l.titleGetter(e),icon:l.iconGetter(e),base:t.replace(/\/[^/]+\/?$/,"/"),order:l.orderGetter(e),level:t.endsWith("/")?r-1:r,path:t}}).filter(({title:t,level:e})=>e<=l.level||!t).sort((t,e)=>t.level-e.level||(t.path.endsWith("/index.html")?-1:e.path.endsWith("/index.html")?1:t.order===null?e.order===null?t.title.localeCompare(e.title):e.order:e.order===null?t.order:t.order>0?e.order>0?t.order-e.order:-1:e.order<0?t.order-e.order:1)).forEach(t=>{var e;const{base:r,level:i}=t;switch(i){case 1:d.push(t);break;case 2:{const o=d.find(a=>a.path===r);o&&(o.children??(o.children=[])).push(t);break}default:{const o=d.find(a=>a.path===r.replace(/\/[^/]+\/$/,"/"));if(o){const a=(e=o.children)==null?void 0:e.find(h=>h.path===r);a&&(a.children??(a.children=[])).push(t)}}}}),d},x=$(()=>k());return()=>n("div",{class:"catalog-wrapper"},[n("h2",{class:"main-title"},p.value.title),...x.value.map(({children:s=[],icon:u,path:d,title:t},e)=>[n("h3",{id:t,class:["child-title",{"has-children":s.length}]},[n("a",{href:`#${t}`,class:"header-anchor"},"#"),n(f,{class:"catalog-title",to:d},()=>[u?n(m,{icon:u}):null,`${e+1}. ${t||"Unknown"}`])]),s.length?n("ul",{class:"child-catalog-wrapper"},s.map(({children:r=[],icon:i,path:o,title:a},h)=>n("li",{class:"child-catalog-item"},[n("div",{class:["sub-title",{"has-children":r.length}]},[n("a",{href:`#${a}`,class:"header-anchor"},"#"),n(f,{class:"catalog-title",to:o},()=>[i?n(m,{icon:i}):null,`${e+1}.${h+1} ${a||"Unknown"}`])]),r.length?n("div",{class:"sub-catalog-wrapper"},r.map(({icon:g,path:W,title:w},z)=>n(f,{class:"sub-catalog-item",to:W},()=>[g?n(m,{icon:g}):null,`${e+1}.${h+1}.${z+1} ${w||"Unknown"}`]))):null]))):null])])}});export{O as default};
