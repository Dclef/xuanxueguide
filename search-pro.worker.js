const nt="ENTRIES",V="KEYS",T="VALUES",F="";class D{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===F)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==F).join("")}value(){return E(this._path).node.get(F)}result(){switch(this._type){case T:return this.value();case V:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],ot=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return W(e,t,s,n,i,1,o,""),n},W=(e,t,s,n,o,u,i,r)=>{const h=u*i;t:for(const c of e.keys())if(c===F){const d=o[h-1];d<=s&&n.set(r,[e.get(c),d])}else{let d=u;for(let l=0;l<c.length;++l,++d){const p=c[l],f=i*d,g=f-i;let a=o[f];const m=Math.max(0,d-s-1),y=Math.min(i-1,d+s);for(let _=m;_<y;++_){const b=p!==t[_],z=o[g+_]+ +b,A=o[g+_+1]+1,w=o[f+_]+1,L=o[f+_+1]=Math.min(z,A,w);L<a&&(a=L)}if(a>s)continue t}W(e.get(c),t,s,n,o,d,i,r+c)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=O(n);for(const i of o.keys())if(i!==F&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ut(this._tree,t)}entries(){return new D(this,nt)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ot(this._tree,t,s)}get(t){const s=I(this._tree,t);return s!==void 0?s.get(F):void 0}has(t){const s=I(this._tree,t);return s!==void 0&&s.has(F)}keys(){return new D(this,V)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,M(this._tree,t).set(F,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);return n.set(F,s(n.get(F))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);let o=n.get(F);return o===void 0&&n.set(F,o=s()),o}values(){return new D(this,T)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==F&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},I=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==F&&t.startsWith(s))return I(e.get(s),t.slice(s.length))},M=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==F&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const h=e.get(u);if(r===u.length)e=h;else{const c=new Map;c.set(u.slice(r),h),e.set(t.slice(n,n+r),c),e.delete(u),e=c}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},ut=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(F),s.size===0)R(n);else if(s.size===1){const[o,u]=s.entries().next().value;$(n,o,u)}}},R=e=>{if(e.length===0)return;const[t,s]=O(e);if(t.delete(s),t.size===0)R(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==F&&$(e.slice(0,-1),n,o)}},$=(e,t,s)=>{if(e.length===0)return;const[n,o]=O(e);n.set(o+t,s),n.delete(o)},O=e=>e[e.length-1],it=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},rt=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,S="or",q="and",ct="and_not",lt=(e,t)=>{e.includes(t)||e.push(t)},P=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},G=({score:e},{score:t})=>t-e,ht=()=>new Map,k=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},N=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,dt={[S]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),P(n.terms,u)}}return e},[q]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);P(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[ct]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},at=(e,t,s,n,o,u)=>{const{k:i,b:r,d:h}=u;return Math.log(1+(s-t+.5)/(t+.5))*(h+e*(i+1)/(e+i*(1-r+r*n/o)))},ft=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},H=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},gt=(e,t,s,n)=>{if(!e._index.has(n)){H(e,s,t,n);return}const o=e._index.fetch(n,ht),u=o.get(t);u==null||u.get(s)==null?H(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},mt={k:1.2,b:.7,d:.5},pt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(rt),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof(console==null?void 0:console[e])=="function"&&console[e](t)},autoVacuum:!0},J={combineWith:S,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:mt},Ft={combineWith:q,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},U={minDirtFactor:.1,minDirtCount:20},yt={..._t,...U},Y=(e,t=S)=>{if(e.length===0)return new Map;const s=t.toLowerCase();return e.reduce(dt[s])||new Map},B=(e,t,s,n,o,u,i,r,h=new Map)=>{if(o==null)return h;for(const c of Object.keys(u)){const d=u[c],l=e._fieldIds[c],p=o.get(l);if(p==null)continue;let f=p.size;const g=e._avgFieldLength[l];for(const a of p.keys()){if(!e._documentIds.has(a)){gt(e,l,a,s),f-=1;continue}const m=i?i(e._documentIds.get(a),s,e._storedFields.get(a)):1;if(!m)continue;const y=p.get(a),_=e._fieldLength.get(a)[l],b=at(y,f,e._documentCount,_,g,r),z=n*d*m*b,A=h.get(a);if(A){A.score+=z,lt(A.terms,t);const w=N(A.match,s);w?w.push(c):A.match[s]=[c]}else h.set(a,{score:z,terms:[t],match:{[s]:[c]}})}}return h},At=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((a,m)=>({...a,[m]:N(n.boost,m)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:h}=n,{fuzzy:c,prefix:d}={...J.weights,...i},l=e._index.get(t.term),p=B(e,t.term,t.term,1,l,o,u,h);let f,g;if(t.prefix&&(f=e._index.atPrefix(t.term)),t.fuzzy){const a=t.fuzzy===!0?.2:t.fuzzy,m=a<1?Math.min(r,Math.round(t.term.length*a)):a;m&&(g=e._index.fuzzyGet(t.term,m))}if(f)for(const[a,m]of f){const y=a.length-t.term.length;if(!y)continue;g==null||g.delete(a);const _=d*a.length/(a.length+.3*y);B(e,t.term,a,_,m,o,u,h,p)}if(g)for(const a of g.keys()){const[m,y]=g.get(a);if(!y)continue;const _=c*a.length/(a.length+y);B(e,t.term,a,_,m,o,u,h,p)}return p},X=(e,t,s={})=>{if(typeof t!="string"){const d={...s,...t,queries:void 0},l=t.queries.map(p=>X(e,p,d));return Y(l,d.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:h}=i,c=r(t).flatMap(d=>h(d)).filter(d=>!!d).map(ft(i)).map(d=>At(e,d,i));return Y(c,i.combineWith)},K=(e,t,s={})=>{const n=X(e,t,s),o=[];for(const[u,{score:i,terms:r,match:h}]of n){const c=r.length,d={id:e._documentIds.get(u),score:i*c,terms:Object.keys(h),match:h};Object.assign(d,e._storedFields.get(u)),(s.filter==null||s.filter(d))&&o.push(d)}return o.sort(G),o},Ct=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of K(e,t,s)){const r=i.join(" "),h=n.get(r);h!=null?(h.score+=u,h.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:h}]of n)o.push({suggestion:u,terms:r,score:i/h});return o.sort(G),o};class Et{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if((t==null?void 0:t.fields)==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...pt,...t,autoVacuum:s,searchOptions:{...J,...t.searchOptions||{}},autoSuggestOptions:{...Ft,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=U,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const zt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:h,serializationVersion:c},d)=>{if(c!==1&&c!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const l=new Et(d);l._documentCount=t,l._nextId=s,l._documentIds=k(n),l._idToShortId=new Map,l._fieldIds=o,l._fieldLength=k(u),l._avgFieldLength=i,l._storedFields=k(r),l._dirtCount=h||0,l._index=new C;for(const[p,f]of l._documentIds)l._idToShortId.set(f,p);for(const[p,f]of e){const g=new Map;for(const a of Object.keys(f)){let m=f[a];c===1&&(m=m.ds),g.set(parseInt(a,10),k(m))}l._index.set(p,g)}return l},Q=Object.entries,wt=Object.fromEntries,j=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(c,d=!1)=>{let l="";i===0?l=c.length>20?`… ${c.slice(-20)}`:c:d?l=c.length+i>100?`${c.slice(0,100-i)}… `:c:l=c.length>20?`${c.slice(0,20)} … ${c.slice(-20)}`:c,l&&o.push(l),i+=l.length,d||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let h=s.indexOf(n,u);if(h===-1)return null;for(;h>=0;){const c=h+n.length;if(r(e.slice(u,h)),u=c,i>100)break;h=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},Z=/[\u4e00-\u9fa5]/g,tt=(e={})=>({fuzzy:.2,prefix:!0,processTerm:t=>{const s=t.match(Z)||[],n=t.replace(Z,"").toLowerCase();return n?[n,...s]:[...s]},...e}),xt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),kt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),et=(e,t,s={})=>{const n={};return K(t,e,tt({boost:{h:2,t:1,c:4},...s})).forEach(o=>{const{id:u,terms:i,score:r}=o,h=u.includes("@"),c=u.includes("#"),[d,l]=u.split(/[#@]/),{contents:p}=n[d]??={title:"",contents:[]};if(h)p.push([{type:"customField",key:d,index:l,display:i.map(f=>o.c.map(g=>j(g,f))).flat().filter(f=>f!==null)},r]);else{const f=i.map(g=>j(o.h,g)).filter(g=>g!==null);if(f.length&&p.push([{type:c?"heading":"title",key:d,...c&&{anchor:l},display:f},r]),"t"in o)for(const g of o.t){const a=i.map(m=>j(g,m)).filter(m=>m!==null);a.length&&p.push([{type:"text",key:d,...c&&{anchor:l},display:a},r])}}}),Q(n).sort(([,o],[,u])=>"max"==="total"?xt(o,u):kt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=it(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},st=(e,t,s={})=>Ct(t,e,tt(s)).map(({suggestion:n})=>n),v=wt(Q(JSON.parse("{\"/\":{\"documentCount\":25,\"nextId\":25,\"documentIds\":{\"0\":\"v-760ae03a\",\"1\":\"v-760ae03a@0\",\"2\":\"v-fffb8e28\",\"3\":\"v-fffb8e28#说明\",\"4\":\"v-fffb8e28@0\",\"5\":\"v-3df38960\",\"6\":\"v-3df38960#_1-流派起源\",\"7\":\"v-3df38960#_2-什么是八字\",\"8\":\"v-3df38960#_3-先天还是后天\",\"9\":\"v-3df38960#_4-同年同日的命运解析\",\"10\":\"v-3df38960#_5-命理推算算法解析\",\"11\":\"v-3df38960#_6-紫微斗数和八字的区别\",\"12\":\"v-3df38960@0\",\"13\":\"v-3df38960@1\",\"14\":\"v-ea0062ce\",\"15\":\"v-ea0062ce#_1-阴阳起源\",\"16\":\"v-ea0062ce#_2-卦气说\",\"17\":\"v-ea0062ce#_3-五行起源\",\"18\":\"v-ea0062ce@0\",\"19\":\"v-ea0062ce@1\",\"20\":\"v-769d16dc\",\"21\":\"v-769d16dc@0\",\"22\":\"v-59435161\",\"23\":\"v-59435161@0\",\"24\":\"v-5a067350\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1],\"1\":[null,null,1],\"2\":[1],\"3\":[1,6],\"4\":[null,null,1],\"5\":[1],\"6\":[2,15],\"7\":[2,35],\"8\":[2,34],\"9\":[2,18],\"10\":[2,160],\"11\":[2,9],\"12\":[null,null,1],\"13\":[null,null,2],\"14\":[1],\"15\":[2,70],\"16\":[2,71],\"17\":[2,107],\"18\":[null,null,1],\"19\":[null,null,2],\"20\":[1],\"21\":[null,null,1],\"22\":[1],\"23\":[null,null,1],\"24\":[1,2]},\"averageFieldLength\":[1.4858523119392686,31.97333333333333,0.8222727272727273],\"storedFields\":{\"0\":{\"h\":\"赞助\"},\"1\":{\"c\":[\"致谢\"]},\"2\":{\"h\":\"指南目录\"},\"3\":{\"h\":\"说明\",\"t\":[\"本教程基于众多书籍以及史料从而写出，目的是让更多的人学习到命理。\\n基于这点，本教程并不是进行学术讨究，而是快速掌握应学的系统知识。\"]},\"4\":{\"c\":[\"指南\"]},\"5\":{\"h\":\"命理起源\"},\"6\":{\"h\":\"1.流派起源\",\"t\":[\"什么是传统命理学？以一个人的出生时间推算方法为八字命理学和紫微斗数。 紫微斗数产生在北宋时代，跟八字命理学的形成，差不多是在同一个时期。 紫微斗数的前身是十八飞星。再追湖上去，是古代的五星术，也称七政四余。 所以紫微斗数实际上是占星学，跟国外的占星术实际上是一样的。 严格来讲两者皆为术数，但八字命理学形成了一套自己独有的逻辑，所以这里着重讲八字以及衍伸。\"]},\"7\":{\"h\":\"2.什么是八字\",\"t\":[\"那么，什么是八字呢？ 由年天干、地支的两个字，月天干、地支的两个字，日天干、地支的两个字和时天干、地支的两个字，共八个字组成。 按传统的习惯写法，年、月、日、时的天干地支呈竖式从右书写，因此也称\\\"四柱\\\"。 八字的基本结构如下：\",\"时\",\"日\",\"月\",\"年\",\"天干\",\"地支\",\"命盘排盘\",\"如果一个人出生在2023年8月31日14时45分 那么他的八字是 癸卯 庚申 辛酉 乙未\",\"那么他的结构如下\",\"时\",\"日\",\"月\",\"年\",\"乙\",\"辛\",\"庚\",\"癸\",\"天干\",\"未\",\"酉\",\"申\",\"卯\",\"地支\"]},\"8\":{\"h\":\"3.先天还是后天\",\"t\":[\"所以在这一逻辑里，我们可以理解成这样一个概念\",\"影响一个人的成长和发展的因素很多。但是有先天条件可以决定人的一生 比如说基因,所以我们不能既忽视先天也不能忽视后天 所谓的后天指家庭、教育、政治、经济制度等等 而细分的话则为 一、地理环境。二、种族差异。三、风俗习尚。 四、政治制度。五、先人门风。六、教育程度。 七、品德修为。八、体格相貌。九、突发异变。\",\"所以如果做命理推算不光是要考虑先天还要考虑后天条件 这里的后天条件包括国运，在危难关头，个人的命运就显的没那么重要了。\"]},\"9\":{\"h\":\"4.同年同日的命运解析\",\"t\":[\"世界上有不少同年同月同日同时生的人，他们的命运难道会完全相同吗？ 三命通会其实也有说明，《三命通会》卷 六·十干十二年生大贵人例中 余纪缙绅与凡民，命同者不能悉数。有说明 所以算命不可能是百分百正确，但大多相当。 即使放在现代的大数据，也只可能是99.9%的正确率，不可能做到100%\"]},\"10\":{\"h\":\"5.命理推算算法解析\",\"t\":[\"古人分为早子时和晚子时 那么一天有十三个时辰\",\"早子\",\"凌晨\",\"0-1\",\"丑\",\"1-3\",\"寅\",\"3-5\",\"卯\",\"上午\",\"5-7\",\"辰\",\"7-9\",\"已\",\"9-11\",\"午\",\"中午\",\"11-13\",\"未\",\"13-15\",\"申\",\"15-17\",\"酉\",\"下午\",\"17-19\",\"戌\",\"19-21\",\"亥\",\"21-23\",\"夜子\",\"半夜\",\"23-24\",\"天干有 甲、乙、丙、丁、戊、己、庚、辛、壬、癸\",\"地支有 子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥\",\"十个天干和十二个地支顺序组合，自甲子始，至癸亥终，天干循环六次，地支循环五次。 共有六十个组合，称为六十甲子 既\",\"01 甲子\",\"11甲戌\",\"21甲申\",\"31 甲午\",\"41甲辰\",\"51甲寅\",\"02 乙丑\",\"12 乙亥\",\"22乙酉\",\"32 乙未\",\"42乙巳\",\"52 乙卯\",\"03 丙寅\",\"13丙子\",\"23 丙戌\",\"33丙申\",\"43丙午\",\"53丙辰\",\"04丁卯\",\"14丁丑\",\"24丁亥\",\"34丁酉\",\"44丁未\",\"54丁巳\",\"05戊辰\",\"15戊寅\",\"25戊子\",\"35戊戌\",\"45戊申\",\"55 戊午\",\"06己巳\",\"16己卯\",\"26己丑\",\"36 己亥\",\"46 己酉\",\"56 己未\",\"07庚午\",\"17 庚辰\",\"27庚寅\",\"37 庚子\",\"47 庚戌\",\"57 庚申\",\"08辛未\",\"18 辛巳\",\"28 辛卯\",\"38 辛丑\",\"48 辛亥\",\"58 辛酉\",\"09壬申\",\"19壬午\",\"29 壬辰\",\"39 壬寅\",\"49 壬子\",\"59 壬戌\",\"10癸酉\",\"20癸未\",\"30 癸巳\",\"40 癸卯\",\"50 癸丑\",\"60 癸亥\",\"所以有八字结构为\",\"时\",\"日\",\"月\",\"年\",\"天干\",\"地支\",\"13\",\"60\",\"12\",\"60\",\"561600\",\"又分男女，以这个系数乘2 既得112.32万个男命女命\",\"不难看出数据集有100万个\",\"按照类的方法去分那么每个属科目纲门的每一个种类都有所不同\",\"相对于现代的大量数据集，从概率上讲已经不够用了，所以准确率比现代的大数据低也是有一定道理的\"]},\"11\":{\"h\":\"6.紫微斗数和八字的区别\",\"t\":[\"紫微斗数是通过星盘的十二宫按照规则进行解读和推算，再按照合冲等规则让其本质发生改变从而进行推算\",\"这里有个流程图可以进行理解\",\"通过紫微斗数的规则解读排出来的星盘上的星耀的位置合组合的意义，从而推断除结果。\",\"那么八字的流程是怎么样的呢\",\"具备完整的理论模型和一整套的推理系统，它已经超越了仅仅总结经验规则的那个层面。\"]},\"12\":{\"c\":[\"起源\"]},\"13\":{\"c\":[\"八字\",\"紫微斗数\"]},\"14\":{\"h\":\"阴阳五行学说\"},\"15\":{\"h\":\"1.阴阳起源\",\"t\":[\"传统八卦被认为是周易八卦 八卦指的是八个基本卦\",\"卦名\",\"乾\",\"坤\",\"震\",\"巽\",\"卦体\",\"☰\",\"☷\",\"☳\",\"☴\",\"象征\",\"天\",\"地\",\"雷\",\"风\",\"家庭\",\"父\",\"母\",\"长男\",\"长女\",\"卦名\",\"坎\",\"离\",\"艮\",\"兑\",\"卦体\",\"☵\",\"☲\",\"☶\",\"☳\",\"象征\",\"水\",\"火\",\"山\",\"泽\",\"家庭\",\"中男\",\"中女\",\"少男\",\"少女\",\"而从道家学派的《老子》描绘万物从而描绘除阴阳\",\"道生一，一生二，二生三，三生万物。\",\"道所生出的“一”，是未分阴阳的混沌世界 “二”便是天地，便是阴阳。 “二生三”，是指天地交合，阴阳二气相互激荡而生成冲气，即和气。 “三生万物”，就是和气通过不同的途径形成了天下万物。 故万物有阴阳，万物都是阴阳之和。\",\"而阴阳成了《周易》的核心思想 那为什么周易在西周所著为什么在东周的战国阴阳成为周易的核心思想呢？ 原因是周易分为经合传，经是占卜，传是易传。 易传采用阴阳的说法。 但它认为阴阳不仅是一种气，而是事物的属性，每个事物都有阴阳的属性\",\"既有天就有地，有雷就有风，有水就有火等\"]},\"16\":{\"h\":\"2.卦气说\",\"t\":[\"所谓封气说，就是利用《周易》的卦交象，来解说一年节气的变化。具体地讲，就是将《周易》的卦象，按照一定的规律，与四时、十二月、二十四节气、七十二候等有机地结合起来，形成一套独有的理论。\",\"季节\",\"春\",\"月份\",\"一\",\"二\",\"三\",\"节气\",\"立春\",\"惊蛰\",\"清明\",\"中气\",\"雨水\",\"春分\",\"谷雨\",\"卦象\",\"泰\",\"大壮\",\"央\",\"季节\",\"夏\",\"月份\",\"四\",\"五\",\"六\",\"节气\",\"立夏\",\"芒种\",\"小暑\",\"中气\",\"小满\",\"夏至\",\"大暑\",\"卦象\",\"乾\",\"姤\",\"遁\",\"季节\",\"秋\",\"月份\",\"七\",\"八\",\"九\",\"节气\",\"立秋\",\"白露\",\"寒露\",\"中气\",\"处暑\",\"秋分\",\"霜降\",\"卦象\",\"否\",\"观\",\"剥\",\"季节\",\"冬\",\"月份\",\"十\",\"十一\",\"十二\",\"节气\",\"立冬\",\"大雪\",\"小寒\",\"中气\",\"小雪\",\"冬至\",\"大寒\",\"卦象\",\"坤\",\"复\",\"临\"]},\"17\":{\"h\":\"3.五行起源\",\"t\":[\"五方观念\",\"已已，王卜，贞今岁商受年。王占日：吉。 东土受年。 南土受年。 西土爱年。 北土受年。\",\"五方观念最早出自殷商 又有五臣、五火等所以殷人尚五的传统 以方位为基础的五的体系，为五行说的原始来源\",\"洪范五行\",\"五行：一日水，二日火，三日木，四日金，五日士。水日润下，火日炎上，木日曲 直，金回从草，土口琼鹅。润下作成，炎上作苦，曲直作酸，从整作辛，称稿作计\",\"此五行是指五种基本的生产活动 又到我们熟悉的战国时期，阴阳家讲五行融合了起来 五行就不再是五种事物，而是五种元素，五种相互联系 故有\",\"五行相生相克\",\"相生：木->火->土->金->水 相克: 水->火->金->木->土\",\"在《管子》里，阴阳是宇宙的本源 这也是早期弹阴阳五行融合的著作\",\"《管子 ·四时》\",\"是故阴阳者，天地之大理也，四时者，阴阳之大经也。 东方曰星，其时曰春。其气曰风，风生木与骨 南方曰日，其时曰夏，其气曰阳，阳生火与气 中央曰土，土德实辅四时入出，以风雨节土益力，土生皮肌肤 西方曰辰，其时曰秋，其气曰阴，阴生金与甲 北方曰月，其时曰冬，其气曰寒，寒生水与血\",\"到了而西汉初年的《淮南子》中的《天文训》中,\\n则以方位（空间）作为世界的框架，以天地相应、天人相应为主要的联系方式。\\n::: details《淮南子·天文训》\\n天地之袭精为阴阳，阴阳之专精为四时，四时之散精为万物。积阳之热气生火，火气之精者为日；积阴之寒气为水，水气之精者为月；日月之淫为精者为星辰，天受日月星辰，地受水潦尘埃。\\n:::\\n到了西汉的董仲舒的《春秋繁露》吸取了战国以来的阴阳五行思想，进一步用阴阳五行来揭示事物发展的规律。他认为，五行关系是社会伦理关系从而进一步提出阳尊阴卑之说\"]},\"18\":{\"c\":[\"起源\"]},\"19\":{\"c\":[\"阴阳\",\"五行\"]},\"20\":{\"h\":\"初阶目录\"},\"21\":{\"c\":[\"初阶\"]},\"22\":{\"h\":\"进阶目录\"},\"23\":{\"c\":[\"进阶\"]},\"24\":{\"h\":\"Ray\",\"t\":[\"功能详情...\"]}},\"dirtCount\":0,\"index\":[[\"功能详情\",{\"1\":{\"24\":1}}],[\"ray\",{\"0\":{\"24\":1}}],[\"进阶\",{\"2\":{\"23\":1}}],[\"进阶目录\",{\"0\":{\"22\":1}}],[\"进一步用阴阳五行来揭示事物发展的规律\",{\"1\":{\"17\":1}}],[\"初阶\",{\"2\":{\"21\":1}}],[\"初阶目录\",{\"0\":{\"20\":1}}],[\"他认为\",{\"1\":{\"17\":1}}],[\"他们的命运难道会完全相同吗\",{\"1\":{\"9\":1}}],[\"吸取了战国以来的阴阳五行思想\",{\"1\":{\"17\":1}}],[\"到了西汉的董仲舒的\",{\"1\":{\"17\":1}}],[\"到了而西汉初年的\",{\"1\":{\"17\":1}}],[\"积阴之寒气为水\",{\"1\":{\"17\":1}}],[\"积阳之热气生火\",{\"1\":{\"17\":1}}],[\"details\",{\"1\":{\"17\":1}}],[\"作为世界的框架\",{\"1\":{\"17\":1}}],[\"空间\",{\"1\":{\"17\":1}}],[\"则以方位\",{\"1\":{\"17\":1}}],[\"淮南子\",{\"1\":{\"17\":2}}],[\"寒生水与血\",{\"1\":{\"17\":1}}],[\"寒露\",{\"1\":{\"16\":1}}],[\"北方曰月\",{\"1\":{\"17\":1}}],[\"北土受年\",{\"1\":{\"17\":1}}],[\"阴生金与甲\",{\"1\":{\"17\":1}}],[\"阴阳\",{\"2\":{\"19\":1}}],[\"阴阳之专精为四时\",{\"1\":{\"17\":1}}],[\"阴阳之大经也\",{\"1\":{\"17\":1}}],[\"阴阳是宇宙的本源\",{\"1\":{\"17\":1}}],[\"阴阳家讲五行融合了起来\",{\"1\":{\"17\":1}}],[\"阴阳二气相互激荡而生成冲气\",{\"1\":{\"15\":1}}],[\"阴阳起源\",{\"0\":{\"15\":1}}],[\"阴阳五行学说\",{\"0\":{\"14\":1}}],[\"西方曰辰\",{\"1\":{\"17\":1}}],[\"西土爱年\",{\"1\":{\"17\":1}}],[\"土生皮肌肤\",{\"1\":{\"17\":1}}],[\"土德实辅四时入出\",{\"1\":{\"17\":1}}],[\"土口琼鹅\",{\"1\":{\"17\":1}}],[\"阳生火与气\",{\"1\":{\"17\":1}}],[\"南方曰日\",{\"1\":{\"17\":1}}],[\"南土受年\",{\"1\":{\"17\":1}}],[\"其气曰寒\",{\"1\":{\"17\":1}}],[\"其气曰阴\",{\"1\":{\"17\":1}}],[\"其气曰阳\",{\"1\":{\"17\":1}}],[\"其气曰风\",{\"1\":{\"17\":1}}],[\"其时曰冬\",{\"1\":{\"17\":1}}],[\"其时曰秋\",{\"1\":{\"17\":1}}],[\"其时曰夏\",{\"1\":{\"17\":1}}],[\"其时曰春\",{\"1\":{\"17\":1}}],[\"东方曰星\",{\"1\":{\"17\":1}}],[\"东土受年\",{\"1\":{\"17\":1}}],[\"这也是早期弹阴阳五行融合的著作\",{\"1\":{\"17\":1}}],[\"这里有个流程图可以进行理解\",{\"1\":{\"11\":1}}],[\"这里的后天条件包括国运\",{\"1\":{\"8\":1}}],[\"里\",{\"1\":{\"17\":1}}],[\"管子\",{\"1\":{\"17\":2}}],[\"在\",{\"1\":{\"17\":1}}],[\"在危难关头\",{\"1\":{\"8\":1}}],[\">木\",{\"1\":{\"17\":1}}],[\">水\",{\"1\":{\"17\":1}}],[\">金\",{\"1\":{\"17\":2}}],[\">土\",{\"1\":{\"17\":2}}],[\">火\",{\"1\":{\"17\":2}}],[\"木\",{\"1\":{\"17\":1}}],[\"木日曲\",{\"1\":{\"17\":1}}],[\"相克\",{\"1\":{\"17\":1}}],[\"相生\",{\"1\":{\"17\":1}}],[\"相对于现代的大量数据集\",{\"1\":{\"10\":1}}],[\"故有\",{\"1\":{\"17\":1}}],[\"故万物有阴阳\",{\"1\":{\"15\":1}}],[\"此五行是指五种基本的生产活动\",{\"1\":{\"17\":1}}],[\"称稿作计\",{\"1\":{\"17\":1}}],[\"称为六十甲子\",{\"1\":{\"10\":1}}],[\"曲直作酸\",{\"1\":{\"17\":1}}],[\"炎上作苦\",{\"1\":{\"17\":1}}],[\"润下作成\",{\"1\":{\"17\":1}}],[\"金回从草\",{\"1\":{\"17\":1}}],[\"直\",{\"1\":{\"17\":1}}],[\"洪范五行\",{\"1\":{\"17\":1}}],[\"为五行说的原始来源\",{\"1\":{\"17\":1}}],[\"又到我们熟悉的战国时期\",{\"1\":{\"17\":1}}],[\"又有五臣\",{\"1\":{\"17\":1}}],[\"又分男女\",{\"1\":{\"10\":1}}],[\"吉\",{\"1\":{\"17\":1}}],[\"王占日\",{\"1\":{\"17\":1}}],[\"王卜\",{\"1\":{\"17\":1}}],[\"贞今岁商受年\",{\"1\":{\"17\":1}}],[\"临\",{\"1\":{\"16\":1}}],[\"复\",{\"1\":{\"16\":1}}],[\"冬至\",{\"1\":{\"16\":1}}],[\"冬\",{\"1\":{\"16\":1}}],[\"剥\",{\"1\":{\"16\":1}}],[\"观\",{\"1\":{\"16\":1}}],[\"否\",{\"1\":{\"16\":1}}],[\"霜降\",{\"1\":{\"16\":1}}],[\"处暑\",{\"1\":{\"16\":1}}],[\"白露\",{\"1\":{\"16\":1}}],[\"秋分\",{\"1\":{\"16\":1}}],[\"秋\",{\"1\":{\"16\":1}}],[\"遁\",{\"1\":{\"16\":1}}],[\"姤\",{\"1\":{\"16\":1}}],[\"大寒\",{\"1\":{\"16\":1}}],[\"大雪\",{\"1\":{\"16\":1}}],[\"大暑\",{\"1\":{\"16\":1}}],[\"大壮\",{\"1\":{\"16\":1}}],[\"小雪\",{\"1\":{\"16\":1}}],[\"小寒\",{\"1\":{\"16\":1}}],[\"小满\",{\"1\":{\"16\":1}}],[\"小暑\",{\"1\":{\"16\":1}}],[\"芒种\",{\"1\":{\"16\":1}}],[\"立冬\",{\"1\":{\"16\":1}}],[\"立秋\",{\"1\":{\"16\":1}}],[\"立夏\",{\"1\":{\"16\":1}}],[\"立春\",{\"1\":{\"16\":1}}],[\"夏至\",{\"1\":{\"16\":1}}],[\"夏\",{\"1\":{\"16\":1}}],[\"央\",{\"1\":{\"16\":1}}],[\"泰\",{\"1\":{\"16\":1}}],[\"谷雨\",{\"1\":{\"16\":1}}],[\"雨水\",{\"1\":{\"16\":1}}],[\"清明\",{\"1\":{\"16\":1}}],[\"惊蛰\",{\"1\":{\"16\":1}}],[\"节气\",{\"1\":{\"16\":4}}],[\"春秋繁露\",{\"1\":{\"17\":1}}],[\"春分\",{\"1\":{\"16\":1}}],[\"春\",{\"1\":{\"16\":1}}],[\"季节\",{\"1\":{\"16\":4}}],[\"形成一套独有的理论\",{\"1\":{\"16\":1}}],[\"与四时\",{\"1\":{\"16\":1}}],[\"具体地讲\",{\"1\":{\"16\":1}}],[\"具备完整的理论模型和一整套的推理系统\",{\"1\":{\"11\":1}}],[\"来解说一年节气的变化\",{\"1\":{\"16\":1}}],[\"就是将\",{\"1\":{\"16\":1}}],[\"就是利用\",{\"1\":{\"16\":1}}],[\"就是和气通过不同的途径形成了天下万物\",{\"1\":{\"15\":1}}],[\"有水就有火等\",{\"1\":{\"15\":1}}],[\"有雷就有风\",{\"1\":{\"15\":1}}],[\"有说明\",{\"1\":{\"9\":1}}],[\"每个事物都有阴阳的属性\",{\"1\":{\"15\":1}}],[\"易传采用阴阳的说法\",{\"1\":{\"15\":1}}],[\"传是易传\",{\"1\":{\"15\":1}}],[\"传统八卦被认为是周易八卦\",{\"1\":{\"15\":1}}],[\"经是占卜\",{\"1\":{\"15\":1}}],[\"经济制度等等\",{\"1\":{\"8\":1}}],[\"原因是周易分为经合传\",{\"1\":{\"15\":1}}],[\"那为什么周易在西周所著为什么在东周的战国阴阳成为周易的核心思想呢\",{\"1\":{\"15\":1}}],[\"那么八字的流程是怎么样的呢\",{\"1\":{\"11\":1}}],[\"那么一天有十三个时辰\",{\"1\":{\"10\":1}}],[\"那么他的结构如下\",{\"1\":{\"7\":1}}],[\"那么他的八字是\",{\"1\":{\"7\":1}}],[\"那么\",{\"1\":{\"7\":1}}],[\"的卦象\",{\"1\":{\"16\":1}}],[\"的卦交象\",{\"1\":{\"16\":1}}],[\"的核心思想\",{\"1\":{\"15\":1}}],[\"的正确率\",{\"1\":{\"9\":1}}],[\"周易\",{\"1\":{\"15\":1,\"16\":2}}],[\"万物都是阴阳之和\",{\"1\":{\"15\":1}}],[\"即和气\",{\"1\":{\"15\":1}}],[\"即使放在现代的大数据\",{\"1\":{\"9\":1}}],[\"便是阴阳\",{\"1\":{\"15\":1}}],[\"便是天地\",{\"1\":{\"15\":1}}],[\"是故阴阳者\",{\"1\":{\"17\":1}}],[\"是指天地交合\",{\"1\":{\"15\":1}}],[\"是未分阴阳的混沌世界\",{\"1\":{\"15\":1}}],[\"是古代的五星术\",{\"1\":{\"6\":1}}],[\"道所生出的\",{\"1\":{\"15\":1}}],[\"道生一\",{\"1\":{\"15\":1}}],[\"描绘万物从而描绘除阴阳\",{\"1\":{\"15\":1}}],[\"老子\",{\"1\":{\"15\":1}}],[\"少女\",{\"1\":{\"15\":1}}],[\"少男\",{\"1\":{\"15\":1}}],[\"中\",{\"1\":{\"17\":1}}],[\"中的\",{\"1\":{\"17\":1}}],[\"中央曰土\",{\"1\":{\"17\":1}}],[\"中气\",{\"1\":{\"16\":4}}],[\"中女\",{\"1\":{\"15\":1}}],[\"中男\",{\"1\":{\"15\":1}}],[\"中午\",{\"1\":{\"10\":1}}],[\"泽\",{\"1\":{\"15\":1}}],[\"山\",{\"1\":{\"15\":1}}],[\"火气之精者为日\",{\"1\":{\"17\":1}}],[\"火日炎上\",{\"1\":{\"17\":1}}],[\"火\",{\"1\":{\"15\":1}}],[\"水气之精者为月\",{\"1\":{\"17\":1}}],[\"水日润下\",{\"1\":{\"17\":1}}],[\"水\",{\"1\":{\"15\":1,\"17\":1}}],[\"☶\",{\"1\":{\"15\":1}}],[\"☲\",{\"1\":{\"15\":1}}],[\"☵\",{\"1\":{\"15\":1}}],[\"兑\",{\"1\":{\"15\":1}}],[\"艮\",{\"1\":{\"15\":1}}],[\"离\",{\"1\":{\"15\":1}}],[\"坎\",{\"1\":{\"15\":1}}],[\"长女\",{\"1\":{\"15\":1}}],[\"长男\",{\"1\":{\"15\":1}}],[\"母\",{\"1\":{\"15\":1}}],[\"父\",{\"1\":{\"15\":1}}],[\"家庭\",{\"1\":{\"15\":2}}],[\"风生木与骨\",{\"1\":{\"17\":1}}],[\"风\",{\"1\":{\"15\":1}}],[\"风俗习尚\",{\"1\":{\"8\":1}}],[\"雷\",{\"1\":{\"15\":1}}],[\"天受日月星辰\",{\"1\":{\"17\":1}}],[\"天地之袭精为阴阳\",{\"1\":{\"17\":1}}],[\"天地之大理也\",{\"1\":{\"17\":1}}],[\"天人相应为主要的联系方式\",{\"1\":{\"17\":1}}],[\"天文训\",{\"1\":{\"17\":2}}],[\"天\",{\"1\":{\"15\":1}}],[\"天干循环六次\",{\"1\":{\"10\":1}}],[\"天干有\",{\"1\":{\"10\":1}}],[\"天干\",{\"1\":{\"7\":2,\"10\":1}}],[\"象征\",{\"1\":{\"15\":2}}],[\"☴\",{\"1\":{\"15\":1}}],[\"☳\",{\"1\":{\"15\":2}}],[\"☷\",{\"1\":{\"15\":1}}],[\"☰\",{\"1\":{\"15\":1}}],[\"卦象\",{\"1\":{\"16\":4}}],[\"卦气说\",{\"0\":{\"16\":1}}],[\"卦体\",{\"1\":{\"15\":2}}],[\"卦名\",{\"1\":{\"15\":2}}],[\"巽\",{\"1\":{\"15\":1}}],[\"震\",{\"1\":{\"15\":1}}],[\"坤\",{\"1\":{\"15\":1,\"16\":1}}],[\"乾\",{\"1\":{\"15\":1,\"16\":1}}],[\"起源\",{\"2\":{\"12\":1,\"18\":1}}],[\"它已经超越了仅仅总结经验规则的那个层面\",{\"1\":{\"11\":1}}],[\"从整作辛\",{\"1\":{\"17\":1}}],[\"从而推断除结果\",{\"1\":{\"11\":1}}],[\"从概率上讲已经不够用了\",{\"1\":{\"10\":1}}],[\"通过紫微斗数的规则解读排出来的星盘上的星耀的位置合组合的意义\",{\"1\":{\"11\":1}}],[\"再按照合冲等规则让其本质发生改变从而进行推算\",{\"1\":{\"11\":1}}],[\"再追湖上去\",{\"1\":{\"6\":1}}],[\"6\",{\"0\":{\"11\":1}}],[\"60\",{\"1\":{\"10\":3}}],[\"按照一定的规律\",{\"1\":{\"16\":1}}],[\"按照类的方法去分那么每个属科目纲门的每一个种类都有所不同\",{\"1\":{\"10\":1}}],[\"按传统的习惯写法\",{\"1\":{\"7\":1}}],[\"不难看出数据集有100万个\",{\"1\":{\"10\":1}}],[\"不可能做到100\",{\"1\":{\"9\":1}}],[\"以天地相应\",{\"1\":{\"17\":1}}],[\"以风雨节土益力\",{\"1\":{\"17\":1}}],[\"以方位为基础的五的体系\",{\"1\":{\"17\":1}}],[\"以这个系数乘2\",{\"1\":{\"10\":1}}],[\"以一个人的出生时间推算方法为八字命理学和紫微斗数\",{\"1\":{\"6\":1}}],[\"既有天就有地\",{\"1\":{\"15\":1}}],[\"既得112\",{\"1\":{\"10\":1}}],[\"既\",{\"1\":{\"10\":1}}],[\"共有六十个组合\",{\"1\":{\"10\":1}}],[\"共八个字组成\",{\"1\":{\"7\":1}}],[\"至癸亥终\",{\"1\":{\"10\":1}}],[\"自甲子始\",{\"1\":{\"10\":1}}],[\"十二\",{\"1\":{\"16\":1}}],[\"十二月\",{\"1\":{\"16\":1}}],[\"十一\",{\"1\":{\"16\":1}}],[\"十\",{\"1\":{\"16\":1}}],[\"十个天干和十二个地支顺序组合\",{\"1\":{\"10\":1}}],[\"十干十二年生大贵人例中\",{\"1\":{\"9\":1}}],[\"巳\",{\"1\":{\"10\":1}}],[\"子\",{\"1\":{\"10\":1}}],[\"壬戌\",{\"1\":{\"10\":1}}],[\"壬子\",{\"1\":{\"10\":1}}],[\"壬寅\",{\"1\":{\"10\":1}}],[\"壬辰\",{\"1\":{\"10\":1}}],[\"壬\",{\"1\":{\"10\":1}}],[\"己未\",{\"1\":{\"10\":1}}],[\"己酉\",{\"1\":{\"10\":1}}],[\"己亥\",{\"1\":{\"10\":1}}],[\"己\",{\"1\":{\"10\":1}}],[\"戊午\",{\"1\":{\"10\":1}}],[\"戊\",{\"1\":{\"10\":1}}],[\"丁\",{\"1\":{\"10\":1}}],[\"丙戌\",{\"1\":{\"10\":1}}],[\"丙寅\",{\"1\":{\"10\":1}}],[\"丙\",{\"1\":{\"10\":1}}],[\"甲午\",{\"1\":{\"10\":1}}],[\"甲子\",{\"1\":{\"10\":1}}],[\"甲\",{\"1\":{\"10\":1}}],[\"半夜\",{\"1\":{\"10\":1}}],[\"夜子\",{\"1\":{\"10\":1}}],[\"亥\",{\"1\":{\"10\":2}}],[\"戌\",{\"1\":{\"10\":2}}],[\"下午\",{\"1\":{\"10\":1}}],[\"午\",{\"1\":{\"10\":2}}],[\"已已\",{\"1\":{\"17\":1}}],[\"已\",{\"1\":{\"10\":1}}],[\"辰\",{\"1\":{\"10\":2}}],[\"7\",{\"1\":{\"10\":2}}],[\"上午\",{\"1\":{\"10\":1}}],[\"寅\",{\"1\":{\"10\":2}}],[\"丑\",{\"1\":{\"10\":2}}],[\"09壬申\",{\"1\":{\"10\":1}}],[\"08辛未\",{\"1\":{\"10\":1}}],[\"07庚午\",{\"1\":{\"10\":1}}],[\"06己巳\",{\"1\":{\"10\":1}}],[\"05戊辰\",{\"1\":{\"10\":1}}],[\"04丁卯\",{\"1\":{\"10\":1}}],[\"03\",{\"1\":{\"10\":1}}],[\"02\",{\"1\":{\"10\":1}}],[\"01\",{\"1\":{\"10\":1}}],[\"0\",{\"1\":{\"10\":1}}],[\"凌晨\",{\"1\":{\"10\":1}}],[\"早子\",{\"1\":{\"10\":1}}],[\"古人分为早子时和晚子时\",{\"1\":{\"10\":1}}],[\"50\",{\"1\":{\"10\":1}}],[\"59\",{\"1\":{\"10\":1}}],[\"58\",{\"1\":{\"10\":1}}],[\"57\",{\"1\":{\"10\":1}}],[\"561600\",{\"1\":{\"10\":1}}],[\"56\",{\"1\":{\"10\":1}}],[\"55\",{\"1\":{\"10\":1}}],[\"54丁巳\",{\"1\":{\"10\":1}}],[\"53丙辰\",{\"1\":{\"10\":1}}],[\"52\",{\"1\":{\"10\":1}}],[\"51甲寅\",{\"1\":{\"10\":1}}],[\"5\",{\"0\":{\"10\":1},\"1\":{\"10\":2}}],[\"9\",{\"1\":{\"9\":1,\"10\":2}}],[\"也只可能是99\",{\"1\":{\"9\":1}}],[\"也称七政四余\",{\"1\":{\"6\":1}}],[\"余纪缙绅与凡民\",{\"1\":{\"9\":1}}],[\"卷\",{\"1\":{\"9\":1}}],[\"世界上有不少同年同月同日同时生的人\",{\"1\":{\"9\":1}}],[\"同年同日的命运解析\",{\"0\":{\"9\":1}}],[\"40\",{\"1\":{\"10\":1}}],[\"49\",{\"1\":{\"10\":1}}],[\"48\",{\"1\":{\"10\":1}}],[\"47\",{\"1\":{\"10\":1}}],[\"46\",{\"1\":{\"10\":1}}],[\"45戊申\",{\"1\":{\"10\":1}}],[\"44丁未\",{\"1\":{\"10\":1}}],[\"43丙午\",{\"1\":{\"10\":1}}],[\"42乙巳\",{\"1\":{\"10\":1}}],[\"41甲辰\",{\"1\":{\"10\":1}}],[\"4\",{\"0\":{\"9\":1}}],[\"个人的命运就显的没那么重要了\",{\"1\":{\"8\":1}}],[\"突发异变\",{\"1\":{\"8\":1}}],[\"九\",{\"1\":{\"8\":1,\"16\":1}}],[\"体格相貌\",{\"1\":{\"8\":1}}],[\"八卦指的是八个基本卦\",{\"1\":{\"15\":1}}],[\"八字\",{\"2\":{\"13\":1}}],[\"八字的基本结构如下\",{\"1\":{\"7\":1}}],[\"八\",{\"1\":{\"8\":1,\"16\":1}}],[\"品德修为\",{\"1\":{\"8\":1}}],[\"七十二候等有机地结合起来\",{\"1\":{\"16\":1}}],[\"七\",{\"1\":{\"8\":1,\"16\":1}}],[\"六\",{\"1\":{\"8\":1,\"9\":1,\"16\":1}}],[\"先人门风\",{\"1\":{\"8\":1}}],[\"先天还是后天\",{\"0\":{\"8\":1}}],[\"五种相互联系\",{\"1\":{\"17\":1}}],[\"五日士\",{\"1\":{\"17\":1}}],[\"五行关系是社会伦理关系从而进一步提出阳尊阴卑之说\",{\"1\":{\"17\":1}}],[\"五行相生相克\",{\"1\":{\"17\":1}}],[\"五行就不再是五种事物\",{\"1\":{\"17\":1}}],[\"五行\",{\"1\":{\"17\":1},\"2\":{\"19\":1}}],[\"五行起源\",{\"0\":{\"17\":1}}],[\"五火等所以殷人尚五的传统\",{\"1\":{\"17\":1}}],[\"五方观念最早出自殷商\",{\"1\":{\"17\":1}}],[\"五方观念\",{\"1\":{\"17\":1}}],[\"五\",{\"1\":{\"8\":1,\"16\":1}}],[\"四时之散精为万物\",{\"1\":{\"17\":1}}],[\"四时者\",{\"1\":{\"17\":1}}],[\"四时\",{\"1\":{\"17\":1}}],[\"四日金\",{\"1\":{\"17\":1}}],[\"四\",{\"1\":{\"8\":1,\"16\":1}}],[\"四柱\",{\"1\":{\"7\":1}}],[\"三日木\",{\"1\":{\"17\":1}}],[\"三生万物\",{\"1\":{\"15\":2}}],[\"三命通会\",{\"1\":{\"9\":1}}],[\"三命通会其实也有说明\",{\"1\":{\"9\":1}}],[\"三\",{\"1\":{\"8\":1,\"16\":1}}],[\"种族差异\",{\"1\":{\"8\":1}}],[\"二日火\",{\"1\":{\"17\":1}}],[\"二十四节气\",{\"1\":{\"16\":1}}],[\"二生三\",{\"1\":{\"15\":2}}],[\"二\",{\"1\":{\"8\":1,\"15\":1,\"16\":1}}],[\"地受水潦尘埃\",{\"1\":{\"17\":1}}],[\"地\",{\"1\":{\"15\":1}}],[\"地理环境\",{\"1\":{\"8\":1}}],[\"地支循环五次\",{\"1\":{\"10\":1}}],[\"地支有\",{\"1\":{\"10\":1}}],[\"地支\",{\"1\":{\"7\":2,\"10\":1}}],[\"地支的两个字和时天干\",{\"1\":{\"7\":1}}],[\"地支的两个字\",{\"1\":{\"7\":3}}],[\"一日水\",{\"1\":{\"17\":1}}],[\"一生二\",{\"1\":{\"15\":1}}],[\"一\",{\"1\":{\"8\":1,\"15\":1,\"16\":1}}],[\"而是五种元素\",{\"1\":{\"17\":1}}],[\"而是事物的属性\",{\"1\":{\"15\":1}}],[\"而是快速掌握应学的系统知识\",{\"1\":{\"3\":1}}],[\"而阴阳成了\",{\"1\":{\"15\":1}}],[\"而从道家学派的\",{\"1\":{\"15\":1}}],[\"而细分的话则为\",{\"1\":{\"8\":1}}],[\"政治制度\",{\"1\":{\"8\":1}}],[\"政治\",{\"1\":{\"8\":1}}],[\"教育程度\",{\"1\":{\"8\":1}}],[\"教育\",{\"1\":{\"8\":1}}],[\"所谓封气说\",{\"1\":{\"16\":1}}],[\"所谓的后天指家庭\",{\"1\":{\"8\":1}}],[\"所以准确率比现代的大数据低也是有一定道理的\",{\"1\":{\"10\":1}}],[\"所以有八字结构为\",{\"1\":{\"10\":1}}],[\"所以算命不可能是百分百正确\",{\"1\":{\"9\":1}}],[\"所以如果做命理推算不光是要考虑先天还要考虑后天条件\",{\"1\":{\"8\":1}}],[\"所以我们不能既忽视先天也不能忽视后天\",{\"1\":{\"8\":1}}],[\"所以在这一逻辑里\",{\"1\":{\"8\":1}}],[\"所以这里着重讲八字以及衍伸\",{\"1\":{\"6\":1}}],[\"所以紫微斗数实际上是占星学\",{\"1\":{\"6\":1}}],[\"比如说基因\",{\"1\":{\"8\":1}}],[\"但它认为阴阳不仅是一种气\",{\"1\":{\"15\":1}}],[\"但大多相当\",{\"1\":{\"9\":1}}],[\"但是有先天条件可以决定人的一生\",{\"1\":{\"8\":1}}],[\"但八字命理学形成了一套自己独有的逻辑\",{\"1\":{\"6\":1}}],[\"影响一个人的成长和发展的因素很多\",{\"1\":{\"8\":1}}],[\"我们可以理解成这样一个概念\",{\"1\":{\"8\":1}}],[\"30\",{\"1\":{\"10\":1}}],[\"39\",{\"1\":{\"10\":1}}],[\"38\",{\"1\":{\"10\":1}}],[\"37\",{\"1\":{\"10\":1}}],[\"36\",{\"1\":{\"10\":1}}],[\"35戊戌\",{\"1\":{\"10\":1}}],[\"34丁酉\",{\"1\":{\"10\":1}}],[\"33丙申\",{\"1\":{\"10\":1}}],[\"32万个男命女命\",{\"1\":{\"10\":1}}],[\"32\",{\"1\":{\"10\":1}}],[\"31\",{\"1\":{\"10\":1}}],[\"3\",{\"0\":{\"8\":1,\"17\":1},\"1\":{\"10\":2}}],[\"卯\",{\"1\":{\"7\":1,\"10\":2}}],[\"申\",{\"1\":{\"7\":1,\"10\":2}}],[\"酉\",{\"1\":{\"7\":1,\"10\":2}}],[\"未\",{\"1\":{\"7\":1,\"10\":2}}],[\"癸亥\",{\"1\":{\"10\":1}}],[\"癸丑\",{\"1\":{\"10\":1}}],[\"癸巳\",{\"1\":{\"10\":1}}],[\"癸\",{\"1\":{\"7\":1,\"10\":1}}],[\"癸卯\",{\"1\":{\"7\":1,\"10\":1}}],[\"庚戌\",{\"1\":{\"10\":1}}],[\"庚子\",{\"1\":{\"10\":1}}],[\"庚辰\",{\"1\":{\"10\":1}}],[\"庚\",{\"1\":{\"7\":1,\"10\":1}}],[\"庚申\",{\"1\":{\"7\":1,\"10\":1}}],[\"辛亥\",{\"1\":{\"10\":1}}],[\"辛丑\",{\"1\":{\"10\":1}}],[\"辛卯\",{\"1\":{\"10\":1}}],[\"辛巳\",{\"1\":{\"10\":1}}],[\"辛\",{\"1\":{\"7\":1,\"10\":1}}],[\"辛酉\",{\"1\":{\"7\":1,\"10\":1}}],[\"乙卯\",{\"1\":{\"10\":1}}],[\"乙亥\",{\"1\":{\"10\":1}}],[\"乙丑\",{\"1\":{\"10\":1}}],[\"乙\",{\"1\":{\"7\":1,\"10\":1}}],[\"乙未\",{\"1\":{\"7\":1,\"10\":1}}],[\"如果一个人出生在2023年8月31日14时45分\",{\"1\":{\"7\":1}}],[\"命理推算算法解析\",{\"0\":{\"10\":1}}],[\"命理起源\",{\"0\":{\"5\":1}}],[\"命同者不能悉数\",{\"1\":{\"9\":1}}],[\"命盘排盘\",{\"1\":{\"7\":1}}],[\"时\",{\"1\":{\"7\":2,\"10\":1}}],[\"时的天干地支呈竖式从右书写\",{\"1\":{\"7\":1}}],[\"因此也称\",{\"1\":{\"7\":1}}],[\"日月之淫为精者为星辰\",{\"1\":{\"17\":1}}],[\"日\",{\"1\":{\"7\":3,\"10\":1}}],[\"日天干\",{\"1\":{\"7\":1}}],[\"月份\",{\"1\":{\"16\":4}}],[\"月\",{\"1\":{\"7\":3,\"10\":1}}],[\"月天干\",{\"1\":{\"7\":1}}],[\"年\",{\"1\":{\"7\":3,\"10\":1}}],[\"由年天干\",{\"1\":{\"7\":1}}],[\"什么是八字呢\",{\"1\":{\"7\":1}}],[\"什么是八字\",{\"0\":{\"7\":1}}],[\"什么是传统命理学\",{\"1\":{\"6\":1}}],[\"20癸未\",{\"1\":{\"10\":1}}],[\"29\",{\"1\":{\"10\":1}}],[\"28\",{\"1\":{\"10\":1}}],[\"27庚寅\",{\"1\":{\"10\":1}}],[\"26己丑\",{\"1\":{\"10\":1}}],[\"25戊子\",{\"1\":{\"10\":1}}],[\"22乙酉\",{\"1\":{\"10\":1}}],[\"24丁亥\",{\"1\":{\"10\":1}}],[\"24\",{\"1\":{\"10\":1}}],[\"23\",{\"1\":{\"10\":3}}],[\"21甲申\",{\"1\":{\"10\":1}}],[\"21\",{\"1\":{\"10\":2}}],[\"2\",{\"0\":{\"7\":1,\"16\":1}}],[\"严格来讲两者皆为术数\",{\"1\":{\"6\":1}}],[\"跟国外的占星术实际上是一样的\",{\"1\":{\"6\":1}}],[\"跟八字命理学的形成\",{\"1\":{\"6\":1}}],[\"紫微斗数\",{\"2\":{\"13\":1}}],[\"紫微斗数是通过星盘的十二宫按照规则进行解读和推算\",{\"1\":{\"11\":1}}],[\"紫微斗数和八字的区别\",{\"0\":{\"11\":1}}],[\"紫微斗数的前身是十八飞星\",{\"1\":{\"6\":1}}],[\"紫微斗数产生在北宋时代\",{\"1\":{\"6\":1}}],[\"差不多是在同一个时期\",{\"1\":{\"6\":1}}],[\"流派起源\",{\"0\":{\"6\":1}}],[\"10癸酉\",{\"1\":{\"10\":1}}],[\"18\",{\"1\":{\"10\":1}}],[\"16己卯\",{\"1\":{\"10\":1}}],[\"14丁丑\",{\"1\":{\"10\":1}}],[\"12\",{\"1\":{\"10\":2}}],[\"19壬午\",{\"1\":{\"10\":1}}],[\"19\",{\"1\":{\"10\":2}}],[\"17\",{\"1\":{\"10\":3}}],[\"15戊寅\",{\"1\":{\"10\":1}}],[\"15\",{\"1\":{\"10\":2}}],[\"13丙子\",{\"1\":{\"10\":1}}],[\"13\",{\"1\":{\"10\":3}}],[\"11甲戌\",{\"1\":{\"10\":1}}],[\"11\",{\"1\":{\"10\":2}}],[\"1\",{\"0\":{\"6\":1,\"15\":1},\"1\":{\"10\":2}}],[\"指南\",{\"2\":{\"4\":1}}],[\"指南目录\",{\"0\":{\"2\":1}}],[\"本教程并不是进行学术讨究\",{\"1\":{\"3\":1}}],[\"本教程基于众多书籍以及史料从而写出\",{\"1\":{\"3\":1}}],[\"基于这点\",{\"1\":{\"3\":1}}],[\"目的是让更多的人学习到命理\",{\"1\":{\"3\":1}}],[\"说明\",{\"0\":{\"3\":1}}],[\"致谢\",{\"2\":{\"1\":1}}],[\"赞助\",{\"0\":{\"0\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,zt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(st(t,v[s],n)):e==="search"?self.postMessage(et(t,v[s],n)):self.postMessage({suggestions:st(t,v[s],n),results:et(t,v[s],n)})};
//# sourceMappingURL=index.js.map
