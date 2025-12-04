var cp=()=>{};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nl=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},up=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=t[n++];e[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=t[n++],a=t[n++],u=t[n++],h=((i&7)<<18|(o&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=t[n++],a=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return e.join("")},rl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const o=t[i],a=i+1<t.length,u=a?t[i+1]:0,h=i+2<t.length,d=h?t[i+2]:0,p=o>>2,y=(o&3)<<4|u>>4;let R=(u&15)<<2|d>>6,C=d&63;h||(C=64,a||(R=64)),r.push(n[p],n[y],n[R],n[C])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(nl(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):up(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const o=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const u=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,o==null||a==null||u==null||h==null)throw new lp;const d=o<<2|a>>4;if(r.push(d),u!==64){const p=a<<4&240|u>>2;if(r.push(p),h!==64){const y=u<<6&192|h;r.push(y)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},lp=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},hp=function(t){const e=nl(t);return rl.encodeByteArray(e,!0)},pi=function(t){return hp(t).replace(/\./g,"")},il=function(t){try{return rl.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function dp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var fp=()=>dp().__FIREBASE_DEFAULTS__,pp=()=>{if(typeof process>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},mp=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&il(t[1]);return e&&JSON.parse(e)},ki=()=>{try{return cp()||fp()||pp()||mp()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},sl=t=>ki()?.emulatorHosts?.[t],gp=t=>{const e=sl(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},ol=()=>ki()?.config,al=t=>ki()?.[`_${t}`];/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _p=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}};/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function fn(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function cl(t){return(await fetch(t,{credentials:"include"})).ok}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function yp(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,o=t.sub||t.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...t};return[pi(JSON.stringify(n)),pi(JSON.stringify(a)),""].join(".")}var Yn={};function vp(){const t={prod:[],emulator:[]};for(const e of Object.keys(Yn))Yn[e]?t.emulator.push(e):t.prod.push(e);return t}function Ep(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}var yc=!1;function ul(t,e){if(typeof window>"u"||typeof document>"u"||!fn(window.location.host)||Yn[t]===e||Yn[t]||yc)return;Yn[t]=e;function n(y){return`__firebase__banner__${y}`}const r="__firebase__banner",i=vp().prod.length>0;function o(){const y=document.getElementById(r);y&&y.remove()}function a(y){y.style.display="flex",y.style.background="#7faaf0",y.style.position="fixed",y.style.bottom="5px",y.style.left="5px",y.style.padding=".5em",y.style.borderRadius="5px",y.style.alignItems="center"}function u(y,R){y.setAttribute("width","24"),y.setAttribute("id",R),y.setAttribute("height","24"),y.setAttribute("viewBox","0 0 24 24"),y.setAttribute("fill","none"),y.style.marginLeft="-6px"}function h(){const y=document.createElement("span");return y.style.cursor="pointer",y.style.marginLeft="16px",y.style.fontSize="24px",y.innerHTML=" &times;",y.onclick=()=>{yc=!0,o()},y}function d(y,R){y.setAttribute("id",R),y.innerText="Learn more",y.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",y.setAttribute("target","__blank"),y.style.paddingLeft="5px",y.style.textDecoration="underline"}function p(){const y=Ep(r),R=n("text"),C=document.getElementById(R)||document.createElement("span"),N=n("learnmore"),k=document.getElementById(N)||document.createElement("a"),O=n("preprendIcon"),q=document.getElementById(O)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(y.created){const W=y.element;a(W),d(k,N);const X=h();u(q,O),W.append(q,C,k,X),document.body.appendChild(W)}i?(C.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ip(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ge())}function Tp(){const t=ki()?.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function wp(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ap(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Rp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Pp(){const t=ge();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Sp(){return!Tp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Cp(){try{return typeof indexedDB=="object"}catch{return!1}}function bp(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(n){e(n)}})}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Vp="FirebaseError",Lt=class ll extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Vp,Object.setPrototypeOf(this,ll.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,mr.prototype.create)}},mr=class{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},r=`${this.service}/${t}`,i=this.errors[t],o=i?kp(i,n):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Lt(r,a,n)}};function kp(t,e){return t.replace(Dp,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}var Dp=/\{\$([^}]+)}/g;function Np(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Dt(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const o=t[i],a=e[i];if(vc(o)&&vc(a)){if(!Dt(o,a))return!1}else if(o!==a)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function vc(t){return t!==null&&typeof t=="object"}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function gr(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function xn(t){const e={};return t.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[r,i]=n.split("=");e[decodeURIComponent(r)]=decodeURIComponent(i)}}),e}function Fn(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Op(t,e){const n=new Mp(t,e);return n.subscribe.bind(n)}var Mp=class{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(n=>{this.error(n)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,n){let r;if(t===void 0&&e===void 0&&n===void 0)throw new Error("Missing Observer.");Lp(t,["next","error","complete"])?r=t:r={next:t,error:e,complete:n},r.next===void 0&&(r.next=Ps),r.error===void 0&&(r.error=Ps),r.complete===void 0&&(r.complete=Ps);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Lp(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ps(){}var KI=14400*1e3;/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function ne(t){return t&&t._delegate?t._delegate:t}var Nt=class{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var St="[DEFAULT]";/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var xp=class{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new _p;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:e});r&&n.resolve(r)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t?.identifier),n=t?.optional??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(r){if(n)return null;throw r}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Up(t))try{this.getOrInitializeService({instanceIdentifier:St})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:r});n.resolve(i)}catch{}}}}clearInstance(t=St){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=St){return this.instances.has(t)}getOptions(t=St){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);n===a&&o.resolve(r)}return r}onInit(t,e){const n=this.normalizeInstanceIdentifier(e),r=this.onInitCallbacks.get(n)??new Set;r.add(t),this.onInitCallbacks.set(n,r);const i=this.instances.get(n);return i&&t(i,n),()=>{r.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const r of n)try{r(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Fp(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}return n||null}normalizeInstanceIdentifier(t=St){return this.component?this.component.multipleInstances?t:St:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Fp(t){return t===St?void 0:t}function Up(t){return t.instantiationMode==="EAGER"}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Bp=class{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new xp(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var qp=[],j;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(j||(j={}));var jp={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},zp=j.INFO,Hp={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},Gp=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=Hp[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},Co=class{constructor(t){this.name=t,this._logLevel=zp,this._logHandler=Gp,this._userLogHandler=null,qp.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in j))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?jp[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...t),this._logHandler(this,j.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...t),this._logHandler(this,j.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,j.INFO,...t),this._logHandler(this,j.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,j.WARN,...t),this._logHandler(this,j.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...t),this._logHandler(this,j.ERROR,...t)}},Wp=(t,e)=>e.some(n=>t instanceof n),Ec,Ic;function Kp(){return Ec||(Ec=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Qp(){return Ic||(Ic=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var hl=new WeakMap,js=new WeakMap,dl=new WeakMap,Ss=new WeakMap,bo=new WeakMap;function Yp(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",o),t.removeEventListener("error",a)},o=()=>{n(lt(t.result)),i()},a=()=>{r(t.error),i()};t.addEventListener("success",o),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&hl.set(n,t)}).catch(()=>{}),bo.set(e,t),e}function Xp(t){if(js.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",a),t.removeEventListener("abort",a)},o=()=>{n(),i()},a=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",o),t.addEventListener("error",a),t.addEventListener("abort",a)});js.set(t,e)}var zs={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return js.get(t);if(e==="objectStoreNames")return t.objectStoreNames||dl.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return lt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Jp(t){zs=t(zs)}function $p(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Cs(this),e,...n);return dl.set(r,e.sort?e.sort():[e]),lt(r)}:Qp().includes(t)?function(...e){return t.apply(Cs(this),e),lt(hl.get(this))}:function(...e){return lt(t.apply(Cs(this),e))}}function Zp(t){return typeof t=="function"?$p(t):(t instanceof IDBTransaction&&Xp(t),Wp(t,Kp())?new Proxy(t,zs):t)}function lt(t){if(t instanceof IDBRequest)return Yp(t);if(Ss.has(t))return Ss.get(t);const e=Zp(t);return e!==t&&(Ss.set(t,e),bo.set(e,t)),e}var Cs=t=>bo.get(t);function em(t,e,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const a=indexedDB.open(t,e),u=lt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(lt(a.result),h.oldVersion,h.newVersion,lt(a.transaction),h)}),n&&a.addEventListener("blocked",h=>n(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}var tm=["get","getKey","getAll","getAllKeys","count"],nm=["put","add","delete","clear"],bs=new Map;function Tc(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(bs.get(e))return bs.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=nm.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||tm.includes(n)))return;const o=async function(a,...u){const h=this.transaction(a,i?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(u.shift())),(await Promise.all([d[n](...u),i&&h.done]))[0]};return bs.set(e,o),o}Jp(t=>({...t,get:(e,n,r)=>Tc(e,n)||t.get(e,n,r),has:(e,n)=>!!Tc(e,n)||t.has(e,n)}));/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rm=class{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(im(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}else return null}).filter(t=>t).join(" ")}};function im(t){return t.getComponent()?.type==="VERSION"}var Hs="@firebase/app",wc="0.14.6";/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var We=new Co("@firebase/app"),sm="@firebase/app-compat",om="@firebase/analytics-compat",am="@firebase/analytics",cm="@firebase/app-check-compat",um="@firebase/app-check",lm="@firebase/auth",hm="@firebase/auth-compat",dm="@firebase/database",fm="@firebase/data-connect",pm="@firebase/database-compat",mm="@firebase/functions",gm="@firebase/functions-compat",_m="@firebase/installations",ym="@firebase/installations-compat",vm="@firebase/messaging",Em="@firebase/messaging-compat",Im="@firebase/performance",Tm="@firebase/performance-compat",wm="@firebase/remote-config",Am="@firebase/remote-config-compat",Rm="@firebase/storage",Pm="@firebase/storage-compat",Sm="@firebase/firestore",Cm="@firebase/ai",bm="@firebase/firestore-compat",Vm="firebase",km="12.6.0";/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var fl="[DEFAULT]",Dm={[Hs]:"fire-core",[sm]:"fire-core-compat",[am]:"fire-analytics",[om]:"fire-analytics-compat",[um]:"fire-app-check",[cm]:"fire-app-check-compat",[lm]:"fire-auth",[hm]:"fire-auth-compat",[dm]:"fire-rtdb",[fm]:"fire-data-connect",[pm]:"fire-rtdb-compat",[mm]:"fire-fn",[gm]:"fire-fn-compat",[_m]:"fire-iid",[ym]:"fire-iid-compat",[vm]:"fire-fcm",[Em]:"fire-fcm-compat",[Im]:"fire-perf",[Tm]:"fire-perf-compat",[wm]:"fire-rc",[Am]:"fire-rc-compat",[Rm]:"fire-gcs",[Pm]:"fire-gcs-compat",[Sm]:"fire-fst",[bm]:"fire-fst-compat",[Cm]:"fire-vertex","fire-js":"fire-js",[Vm]:"fire-js-all"};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var mi=new Map,Nm=new Map,Gs=new Map;function Ac(t,e){try{t.container.addComponent(e)}catch(n){We.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function an(t){const e=t.name;if(Gs.has(e))return We.debug(`There were multiple attempts to register component ${e}.`),!1;Gs.set(e,t);for(const n of mi.values())Ac(n,t);for(const n of Nm.values())Ac(n,t);return!0}function Vo(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Se(t){return t==null?!1:t.settings!==void 0}var ht=new mr("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Om=class{constructor(t,e,n){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Nt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw ht.create("app-deleted",{appName:this._name})}};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pn=km;function Mm(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:fl,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw ht.create("bad-app-name",{appName:String(i)});if(n||(n=ol()),!n)throw ht.create("no-options");const o=mi.get(i);if(o){if(Dt(n,o.options)&&Dt(r,o.config))return o;throw ht.create("duplicate-app",{appName:i})}const a=new Bp(i);for(const h of Gs.values())a.addComponent(h);const u=new Om(n,r,a);return mi.set(i,u),u}function pl(t=fl){const e=mi.get(t);if(!e&&t==="[DEFAULT]"&&ol())return Mm();if(!e)throw ht.create("no-app",{appName:t});return e}function dt(t,e,n){let r=Dm[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),We.warn(a.join(" "));return}an(new Nt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Lm="firebase-heartbeat-database",xm=1,ir="firebase-heartbeat-store",Vs=null;function ml(){return Vs||(Vs=em(Lm,xm,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ir)}catch(n){console.warn(n)}}}}).catch(t=>{throw ht.create("idb-open",{originalErrorMessage:t.message})})),Vs}async function Fm(t){try{const e=(await ml()).transaction(ir),n=await e.objectStore(ir).get(gl(t));return await e.done,n}catch(e){if(e instanceof Lt)We.warn(e.message);else{const n=ht.create("idb-get",{originalErrorMessage:e?.message});We.warn(n.message)}}}async function Rc(t,e){try{const n=(await ml()).transaction(ir,"readwrite");await n.objectStore(ir).put(e,gl(t)),await n.done}catch(n){if(n instanceof Lt)We.warn(n.message);else{const r=ht.create("idb-set",{originalErrorMessage:n?.message});We.warn(r.message)}}}function gl(t){return`${t.name}!${t.options.appId}`}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Um=1024,Bm=30,qm=class{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new zm(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),e=Pc();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===e||this._heartbeatsCache.heartbeats.some(n=>n.date===e))return;if(this._heartbeatsCache.heartbeats.push({date:e,agent:t}),this._heartbeatsCache.heartbeats.length>Bm){const n=Hm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(n,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(t){We.warn(t)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Pc(),{heartbeatsToSend:e,unsentEntries:n}=jm(this._heartbeatsCache.heartbeats),r=pi(JSON.stringify({version:2,heartbeats:e}));return this._heartbeatsCache.lastSentHeartbeatDate=t,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return We.warn(t),""}}};function Pc(){return new Date().toISOString().substring(0,10)}function jm(t,e=Um){const n=[];let r=t.slice();for(const i of t){const o=n.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),Sc(n)>e){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Sc(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var zm=class{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Cp()?bp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Fm(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const e=await this.read();return Rc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??e.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const e=await this.read();return Rc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??e.lastSentHeartbeatDate,heartbeats:[...e.heartbeats,...t.heartbeats]})}else return}};function Sc(t){return pi(JSON.stringify({version:2,heartbeats:t})).length}function Hm(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Gm(t){an(new Nt("platform-logger",e=>new rm(e),"PRIVATE")),an(new Nt("heartbeat",e=>new qm(e),"PRIVATE")),dt(Hs,wc,t),dt(Hs,wc,"esm2020"),dt("fire-js","")}Gm("");/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/dt("firebase","12.6.0","app");function _l(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Wm=_l,yl=new mr("auth","Firebase",_l());/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var gi=new Co("@firebase/auth");function Km(t,...e){gi.logLevel<=j.WARN&&gi.warn(`Auth (${pn}): ${t}`,...e)}function Kr(t,...e){gi.logLevel<=j.ERROR&&gi.error(`Auth (${pn}): ${t}`,...e)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ve(t,...e){throw ko(t,...e)}function Le(t,...e){return ko(t,...e)}function vl(t,e,n){const r={...Wm(),[e]:n};return new mr("auth","Firebase",r).create(e,{appName:t.name})}function He(t){return vl(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ko(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return yl.create(t,...e)}function M(t,e,...n){if(!t)throw ko(e,...n)}function Oe(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Kr(e),new Error(e)}function Ke(t,e){t||Oe(e)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ws(){return typeof self<"u"&&self.location?.href||""}function Qm(){return Cc()==="http:"||Cc()==="https:"}function Cc(){return typeof self<"u"&&self.location?.protocol||null}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ym(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Qm()||Ap()||"connection"in navigator)?navigator.onLine:!0}function Xm(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _r=class{constructor(t,e){this.shortDelay=t,this.longDelay=e,Ke(e>t,"Short delay should be less than long delay!"),this.isMobile=Ip()||Rp()}get(){return Ym()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Do(t,e){Ke(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var El=class{static initialize(t,e,n){this.fetchImpl=t,e&&(this.headersImpl=e),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Oe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Oe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Oe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Jm={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $m=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Zm=new _r(3e4,6e4);function se(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function _e(t,e,n,r,i={}){return Il(t,i,async()=>{let o={},a={};r&&(e==="GET"?a=r:o={body:JSON.stringify(r)});const u=gr({key:t.config.apiKey,...a}).slice(1),h=await t._getAdditionalHeaders();h["Content-Type"]="application/json",t.languageCode&&(h["X-Firebase-Locale"]=t.languageCode);const d={method:e,headers:h,...o};return wp()||(d.referrerPolicy="no-referrer"),t.emulatorConfig&&fn(t.emulatorConfig.host)&&(d.credentials="include"),El.fetch()(await Tl(t,t.config.apiHost,n,u),d)})}async function Il(t,e,n){t._canInitEmulator=!1;const r={...Jm,...e};try{const i=new tg(t),o=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Un(t,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const[u,h]=(o.ok?a.errorMessage:a.error.message).split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Un(t,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Un(t,"email-already-in-use",a);if(u==="USER_DISABLED")throw Un(t,"user-disabled",a);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw vl(t,d,h);Ve(t,d)}}catch(i){if(i instanceof Lt)throw i;Ve(t,"network-request-failed",{message:String(i)})}}async function vt(t,e,n,r,i={}){const o=await _e(t,e,n,r,i);return"mfaPendingCredential"in o&&Ve(t,"multi-factor-auth-required",{_serverResponse:o}),o}async function Tl(t,e,n,r){const i=`${e}${n}?${r}`,o=t,a=o.config.emulator?Do(t.config,i):`${t.config.apiScheme}://${i}`;return $m.includes(n)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(a).toString():a}function eg(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var tg=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,n)=>{this.timer=setTimeout(()=>n(Le(this.auth,"network-request-failed")),Zm.get())})}};function Un(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Le(t,e,r);return i.customData._tokenResponse=n,i}function bc(t){return t!==void 0&&t.enterprise!==void 0}var wl=class{constructor(t){if(this.siteKey="",this.recaptchaEnforcementState=[],t.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=t.recaptchaEnforcementState}getProviderEnforcementState(t){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const e of this.recaptchaEnforcementState)if(e.provider&&e.provider===t)return eg(e.enforcementState);return null}isProviderEnabled(t){return this.getProviderEnforcementState(t)==="ENFORCE"||this.getProviderEnforcementState(t)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function Al(t,e){return _e(t,"GET","/v2/recaptchaConfig",se(t,e))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function ng(t,e){return _e(t,"POST","/v1/accounts:delete",e)}async function _i(t,e){return _e(t,"POST","/v1/accounts:lookup",e)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Xn(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function rg(t,e=!1){const n=ne(t),r=await n.getIdToken(e),i=No(r);M(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,a=o?.sign_in_provider;return{claims:i,token:r,authTime:Xn(ks(i.auth_time)),issuedAtTime:Xn(ks(i.iat)),expirationTime:Xn(ks(i.exp)),signInProvider:a||null,signInSecondFactor:o?.sign_in_second_factor||null}}function ks(t){return Number(t)*1e3}function No(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Kr("JWT malformed, contained fewer than 3 sections"),null;try{const i=il(n);return i?JSON.parse(i):(Kr("Failed to decode base64 JWT payload"),null)}catch(i){return Kr("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Vc(t){const e=No(t);return M(e,"internal-error"),M(typeof e.exp<"u","internal-error"),M(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function sr(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Lt&&ig(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function ig({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var sg=class{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){t?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ks=class{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=Xn(this.lastLoginAt),this.creationTime=Xn(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function yi(t){const e=t.auth,n=await t.getIdToken(),r=await sr(t,_i(e,{idToken:n}));M(r?.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const o=i.providerUserInfo?.length?Rl(i.providerUserInfo):[],a=ag(t.providerData,o),u=t.isAnonymous,h=!(t.email&&i.passwordHash)&&!a?.length,d=u?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Ks(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(t,p)}async function og(t){const e=ne(t);await yi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ag(t,e){return[...t.filter(n=>!e.some(r=>r.providerId===n.providerId)),...e]}function Rl(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function cg(t,e){const n=await Il(t,{},async()=>{const r=gr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:o}=t.config,a=await Tl(t,i,"/v1/token",`key=${o}`),u=await t._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const h={method:"POST",headers:u,body:r};return t.emulatorConfig&&fn(t.emulatorConfig.host)&&(h.credentials="include"),El.fetch()(a,h)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function ug(t,e){return _e(t,"POST","/v2/accounts:revokeToken",se(t,e))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ds=class Qs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){M(e.idToken,"internal-error"),M(typeof e.idToken<"u","internal-error"),M(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){M(e.length!==0,"internal-error");const n=Vc(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(M(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:o}=await cg(e,n);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:o}=n,a=new Qs;return r&&(M(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(M(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),o&&(M(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Qs,this.toJSON())}_performRefresh(){return Oe("not implemented")}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function ct(t,e){M(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}var Zt=class Bn{constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new sg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Ks(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await sr(this,this.stsTokenManager.getToken(this.auth,e));return M(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return rg(this,e)}reload(){return og(this)}_assign(e){this!==e&&(M(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Bn({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){M(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await yi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Se(this.auth.app))return Promise.reject(He(this.auth));const e=await this.getIdToken();return await sr(this,ng(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,o=n.phoneNumber??void 0,a=n.photoURL??void 0,u=n.tenantId??void 0,h=n._redirectEventId??void 0,d=n.createdAt??void 0,p=n.lastLoginAt??void 0,{uid:y,emailVerified:R,isAnonymous:C,providerData:N,stsTokenManager:k}=n;M(y&&k,e,"internal-error");const O=Ds.fromJSON(this.name,k);M(typeof y=="string",e,"internal-error"),ct(r,e.name),ct(i,e.name),M(typeof R=="boolean",e,"internal-error"),M(typeof C=="boolean",e,"internal-error"),ct(o,e.name),ct(a,e.name),ct(u,e.name),ct(h,e.name),ct(d,e.name),ct(p,e.name);const q=new Bn({uid:y,auth:e,email:i,emailVerified:R,displayName:r,isAnonymous:C,photoURL:a,phoneNumber:o,tenantId:u,stsTokenManager:O,createdAt:d,lastLoginAt:p});return N&&Array.isArray(N)&&(q.providerData=N.map(W=>({...W}))),h&&(q._redirectEventId=h),q}static async _fromIdTokenResponse(e,n,r=!1){const i=new Ds;i.updateFromServerResponse(n);const o=new Bn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await yi(o),o}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];M(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?Rl(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!o?.length,u=new Ds;u.updateFromIdToken(r);const h=new Bn({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Ks(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!o?.length};return Object.assign(h,d),h}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var kc=new Map;function ze(t){Ke(t instanceof Function,"Expected a class definition");let e=kc.get(t);return e?(Ke(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,kc.set(t,e),e)}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Pl=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}};Pl.type="NONE";var Dc=Pl;/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Qr(t,e,n){return`firebase:${t}:${e}:${n}`}var Nc=class Yr{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=Qr(this.userKey,i.apiKey,o),this.fullPersistenceKey=Qr("persistence",i.apiKey,o),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await _i(this.auth,{idToken:e}).catch(()=>{});return n?Zt._fromGetAccountInfoResponse(this.auth,n,e):null}return Zt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Yr(ze(Dc),e,r);const i=(await Promise.all(n.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=i[0]||ze(Dc);const a=Qr(r,e.config.apiKey,e.name);let u=null;for(const d of n)try{const p=await d._get(a);if(p){let y;if(typeof p=="string"){const R=await _i(e,{idToken:p}).catch(()=>{});if(!R)break;y=await Zt._fromGetAccountInfoResponse(e,R,p)}else y=Zt._fromJSON(e,p);d!==o&&(u=y),o=d;break}}catch{}const h=i.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new Yr(o,e,r):(o=h[0],u&&await o._set(a,u.toJSON()),await Promise.all(n.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new Yr(o,e,r))}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Oc(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Vl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Sl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Dl(e))return"Blackberry";if(Nl(e))return"Webos";if(Cl(e))return"Safari";if((e.includes("chrome/")||bl(e))&&!e.includes("edge/"))return"Chrome";if(kl(e))return"Android";{const n=t.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if(n?.length===2)return n[1]}return"Other"}function Sl(t=ge()){return/firefox\//i.test(t)}function Cl(t=ge()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function bl(t=ge()){return/crios\//i.test(t)}function Vl(t=ge()){return/iemobile/i.test(t)}function kl(t=ge()){return/android/i.test(t)}function Dl(t=ge()){return/blackberry/i.test(t)}function Nl(t=ge()){return/webos/i.test(t)}function Oo(t=ge()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function lg(t=ge()){return Oo(t)&&!!window.navigator?.standalone}function hg(){return Pp()&&document.documentMode===10}function Ol(t=ge()){return Oo(t)||kl(t)||Nl(t)||Dl(t)||/windows phone/i.test(t)||Vl(t)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ml(t,e=[]){let n;switch(t){case"Browser":n=Oc(ge());break;case"Worker":n=`${Oc(ge())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${pn}/${r}`}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var dg=class{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const n=i=>new Promise((o,a)=>{try{const u=t(i);o(u)}catch(u){a(u)}});n.onAbort=e,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const n of this.queue)await n(t),n.onAbort&&e.push(n.onAbort)}catch(n){e.reverse();for(const r of e)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}};/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function fg(t,e={}){return _e(t,"GET","/v2/passwordPolicy",se(t,e))}/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pg=6,mg=class{constructor(t){const e=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=e.minPasswordLength??pg,e.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=e.maxPasswordLength),e.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=e.containsLowercaseCharacter),e.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=e.containsUppercaseCharacter),e.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=e.containsNumericCharacter),e.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=e.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=t.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const e={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,e),this.validatePasswordCharacterOptions(t,e),e.isValid&&(e.isValid=e.meetsMinPasswordLength??!0),e.isValid&&(e.isValid=e.meetsMaxPasswordLength??!0),e.isValid&&(e.isValid=e.containsLowercaseLetter??!0),e.isValid&&(e.isValid=e.containsUppercaseLetter??!0),e.isValid&&(e.isValid=e.containsNumericCharacter??!0),e.isValid&&(e.isValid=e.containsNonAlphanumericCharacter??!0),e}validatePasswordLengthOptions(t,e){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(e.meetsMinPasswordLength=t.length>=n),r&&(e.meetsMaxPasswordLength=t.length<=r)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let n;for(let r=0;r<t.length;r++)n=t.charAt(r),this.updatePasswordCharacterOptionsStatuses(e,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(t,e,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var gg=class{constructor(t,e,n,r){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Mc(this),this.idTokenSubscription=new Mc(this),this.beforeStateQueue=new dg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=yl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=ze(e)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Nc.create(this,t),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await _i(this,{idToken:t}),n=await Zt._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(n)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){if(Se(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const e=await this.assertedPersistence.getCurrentUser();let n=e,r=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=n?._redirectEventId,a=await this.tryRedirectSignIn(t);(!i||i===o)&&a?.user&&(n=a.user,r=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(n)}catch(i){n=e,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return M(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await yi(t)}catch(e){if(e?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=Xm()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(Se(this.app))return Promise.reject(He(this));const e=t?ne(t):null;return e&&M(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&M(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return Se(this.app)?Promise.reject(He(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return Se(this.app)?Promise.reject(He(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ze(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await fg(this),e=new mg(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new mr("auth","Firebase",t())}onAuthStateChanged(t,e,n){return this.registerStateListener(this.authStateSubscription,t,e,n)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,n){return this.registerStateListener(this.idTokenSubscription,t,e,n)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const n=this.onAuthStateChanged(()=>{n(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(n.tenantId=this.tenantId),await ug(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(t,e){const n=await this.getOrInitRedirectPersistenceManager(e);return t===null?n.removeCurrentUser():n.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&ze(t)||this._popupRedirectResolver;M(e,this,"argument-error"),this.redirectPersistenceManager=await Nc.create(this,[ze(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===t?this._currentUser:this.redirectUser?._redirectEventId===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=this.currentUser?.uid??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,n,r){if(this._deleted)return()=>{};const i=typeof e=="function"?e:e.next.bind(e);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(M(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof e=="function"){const u=t.addObserver(e,n,r);return()=>{o=!0,u()}}else{const u=t.addObserver(e);return()=>{o=!0,u()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return M(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Ml(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const e=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();e&&(t["X-Firebase-Client"]=e);const n=await this._getAppCheckToken();return n&&(t["X-Firebase-AppCheck"]=n),t}async _getAppCheckToken(){if(Se(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return t?.error&&Km(`Error while retrieving App Check token: ${t.error}`),t?.token}};function et(t){return ne(t)}var Mc=class{constructor(t){this.auth=t,this.observer=null,this.addObserver=Op(e=>this.observer=e)}get next(){return M(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Di={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _g(t){Di=t}function Ll(t){return Di.loadJS(t)}function yg(){return Di.recaptchaEnterpriseScript}function vg(){return Di.gapiScript}function xl(t){return`__${t}${Math.floor(Math.random()*1e6)}`}var Eg=class{constructor(){this.enterprise=new Ig}ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}},Ig=class{ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}},Tg="recaptcha-enterprise",Jn="NO_RECAPTCHA",Fl=class{constructor(t){this.type=Tg,this.auth=et(t)}async verify(t="verify",e=!1){async function n(i){if(!e){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{Al(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const h=new wl(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(u=>{a(u)})})}function r(i,o,a){const u=window.grecaptcha;bc(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:t}).then(h=>{o(h)}).catch(()=>{o(Jn)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Eg().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{n(this.auth).then(a=>{if(!e&&bc(window.grecaptcha))r(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=yg();u.length!==0&&(u+=a),Ll(u).then(()=>{r(a,i,o)}).catch(h=>{o(h)})}}).catch(a=>{o(a)})})}};async function Ln(t,e,n,r=!1,i=!1){const o=new Fl(t);let a;if(i)a=Jn;else try{a=await o.verify(n)}catch{a=await o.verify(n,!0)}const u={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){const h=u.phoneEnrollmentInfo.phoneNumber,d=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:h,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){const h=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:a}):Object.assign(u,{captchaResponse:a}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function en(t,e,n,r,i){if(i==="EMAIL_PASSWORD_PROVIDER")if(t._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Ln(t,e,n,n==="getOobCode");return r(t,o)}else return r(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Ln(t,e,n,n==="getOobCode");return r(t,a)}else return Promise.reject(o)});else if(i==="PHONE_PROVIDER")if(t._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const o=await Ln(t,e,n);return r(t,o).catch(async a=>{if(t._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(a.code==="auth/missing-recaptcha-token"||a.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const u=await Ln(t,e,n,!1,!0);return r(t,u)}return Promise.reject(a)})}else{const o=await Ln(t,e,n,!1,!0);return r(t,o)}else return Promise.reject(i+" provider is not supported.")}async function wg(t){const e=et(t),n=await Al(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new wl(n);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Fl(e).verify()}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ag(t,e){const n=Vo(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(Dt(i,e??{}))return r;Ve(r,"already-initialized")}return n.initialize({options:e})}function Rg(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(ze);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function Pg(t,e,n){const r=et(t);M(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!n?.disableWarnings,o=Ul(e),{host:a,port:u}=Sg(e),h=u===null?"":`:${u}`,d={url:`${o}//${a}${h}/`},p=Object.freeze({host:a,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){M(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),M(Dt(d,r.config.emulator)&&Dt(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,fn(a)?(cl(`${o}//${a}${h}`),ul("Auth",!0)):i||Cg()}function Ul(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Sg(t){const e=Ul(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:Lc(r.substr(o.length+1))}}else{const[o,a]=r.split(":");return{host:o,port:Lc(a)}}}function Lc(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Cg(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ni=class{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return Oe("not implemented")}_getIdTokenResponse(t){return Oe("not implemented")}_linkToIdToken(t,e){return Oe("not implemented")}_getReauthenticationResolver(t){return Oe("not implemented")}};async function bg(t,e){return _e(t,"POST","/v1/accounts:signUp",e)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function Vg(t,e){return vt(t,"POST","/v1/accounts:signInWithPassword",se(t,e))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function kg(t,e){return vt(t,"POST","/v1/accounts:signInWithEmailLink",se(t,e))}async function Dg(t,e){return vt(t,"POST","/v1/accounts:signInWithEmailLink",se(t,e))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var xc=class Ys extends Ni{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new Ys(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Ys(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n?.email&&n?.password){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return en(e,n,"signInWithPassword",Vg,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return kg(e,{email:this._email,oobCode:this._password});default:Ve(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return en(e,r,"signUpPassword",bg,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Dg(e,{idToken:n,email:this._email,oobCode:this._password});default:Ve(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function tn(t,e){return vt(t,"POST","/v1/accounts:signInWithIdp",se(t,e))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ng="http://localhost",Oi=class Xs extends Ni{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Xs(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ve("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const{providerId:n,signInMethod:r,...i}=typeof e=="string"?JSON.parse(e):e;if(!n||!r)return null;const o=new Xs(n,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return tn(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,tn(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,tn(e,n)}buildRequest(){const e={requestUri:Ng,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=gr(n)}return e}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function Fc(t,e){return _e(t,"POST","/v1/accounts:sendVerificationCode",se(t,e))}async function Og(t,e){return vt(t,"POST","/v1/accounts:signInWithPhoneNumber",se(t,e))}async function Mg(t,e){const n=await vt(t,"POST","/v1/accounts:signInWithPhoneNumber",se(t,e));if(n.temporaryProof)throw Un(t,"account-exists-with-different-credential",n);return n}var Lg={USER_NOT_FOUND:"user-not-found"};async function xg(t,e){const n={...e,operation:"REAUTH"};return vt(t,"POST","/v1/accounts:signInWithPhoneNumber",se(t,n),Lg)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Uc=class Xr extends Ni{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new Xr({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new Xr({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return Og(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return Mg(e,{idToken:n,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return xg(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:r,verificationCode:i}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:o}=e;return!r&&!n&&!i&&!o?null:new Xr({verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:o})}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Fg(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Ug(t){const e=xn(Fn(t)).link,n=e?xn(Fn(e)).deep_link_id:null,r=xn(Fn(t)).deep_link_id;return(r?xn(Fn(r)).link:null)||r||n||e||t}var Bg=class Bl{constructor(e){const n=xn(Fn(e)),r=n.apiKey??null,i=n.oobCode??null,o=Fg(n.mode??null);M(r&&i&&o,"argument-error"),this.apiKey=r,this.operation=o,this.code=i,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=Ug(e);try{return new Bl(n)}catch{return null}}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Mi=class ql{constructor(){this.providerId=ql.PROVIDER_ID}static credential(e,n){return xc._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Bg.parseLink(n);return M(r,"argument-error"),xc._fromEmailAndCode(e,r.code,r.tenantId)}};Mi.PROVIDER_ID="password";Mi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Mi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jl=class{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yr=class extends jl{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var zl=class zt extends yr{constructor(){super("facebook.com")}static credential(e){return Oi._fromParams({providerId:zt.PROVIDER_ID,signInMethod:zt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zt.credentialFromTaggedObject(e)}static credentialFromError(e){return zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return zt.credential(e.oauthAccessToken)}catch{return null}}};zl.FACEBOOK_SIGN_IN_METHOD="facebook.com";zl.PROVIDER_ID="facebook.com";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Hl=class Ht extends yr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Oi._fromParams({providerId:Ht.PROVIDER_ID,signInMethod:Ht.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ht.credentialFromTaggedObject(e)}static credentialFromError(e){return Ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Ht.credential(n,r)}catch{return null}}};Hl.GOOGLE_SIGN_IN_METHOD="google.com";Hl.PROVIDER_ID="google.com";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Gl=class Gt extends yr{constructor(){super("github.com")}static credential(e){return Oi._fromParams({providerId:Gt.PROVIDER_ID,signInMethod:Gt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gt.credentialFromTaggedObject(e)}static credentialFromError(e){return Gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gt.credential(e.oauthAccessToken)}catch{return null}}};Gl.GITHUB_SIGN_IN_METHOD="github.com";Gl.PROVIDER_ID="github.com";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Wl=class Wt extends yr{constructor(){super("twitter.com")}static credential(e,n){return Oi._fromParams({providerId:Wt.PROVIDER_ID,signInMethod:Wt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Wt.credentialFromTaggedObject(e)}static credentialFromError(e){return Wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Wt.credential(n,r)}catch{return null}}};Wl.TWITTER_SIGN_IN_METHOD="twitter.com";Wl.PROVIDER_ID="twitter.com";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function qg(t,e){return vt(t,"POST","/v1/accounts:signUp",se(t,e))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Li=class Js{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const o=await Zt._fromIdTokenResponse(e,r,i),a=Bc(r);return new Js({user:o,providerId:a,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Bc(r);return new Js({user:e,providerId:i,_tokenResponse:r,operationType:n})}};function Bc(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var jg=class $s extends Lt{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,$s.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new $s(e,n,r,i)}};function Kl(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?jg._fromErrorAndOperation(t,i,e,r):i})}async function zg(t,e,n=!1){const r=await sr(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Li._forOperation(t,"link",r)}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function Hg(t,e,n=!1){const{auth:r}=t;if(Se(r.app))return Promise.reject(He(r));const i="reauthenticate";try{const o=await sr(t,Kl(r,i,e,t),n);M(o.idToken,r,"internal-error");const a=No(o.idToken);M(a,r,"internal-error");const{sub:u}=a;return M(t.uid===u,r,"user-mismatch"),Li._forOperation(t,i,o)}catch(o){throw o?.code==="auth/user-not-found"&&Ve(r,"user-mismatch"),o}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function Ql(t,e,n=!1){if(Se(t.app))return Promise.reject(He(t));const r="signIn",i=await Kl(t,r,e),o=await Li._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(o.user),o}async function Gg(t,e){return Ql(et(t),e)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function Yl(t){const e=et(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function QI(t,e,n){if(Se(t.app))return Promise.reject(He(t));const r=et(t),i=await en(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",qg,"EMAIL_PASSWORD_PROVIDER").catch(a=>{throw a.code==="auth/password-does-not-meet-requirements"&&Yl(t),a}),o=await Li._fromIdTokenResponse(r,"signIn",i);return await r._updateCurrentUser(o.user),o}function YI(t,e,n){return Se(t.app)?Promise.reject(He(t)):Gg(ne(t),Mi.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Yl(t),r})}function Wg(t,e,n,r){return ne(t).onIdTokenChanged(e,n,r)}function Kg(t,e,n){return ne(t).beforeAuthStateChanged(e,n)}function XI(t,e,n,r){return ne(t).onAuthStateChanged(e,n,r)}function JI(t){return ne(t).signOut()}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function qc(t,e){return _e(t,"POST","/v2/accounts/mfaEnrollment:start",se(t,e))}function Qg(t,e){return _e(t,"POST","/v2/accounts/mfaEnrollment:finalize",se(t,e))}function Yg(t,e){return _e(t,"POST","/v2/accounts/mfaEnrollment:start",se(t,e))}function Xg(t,e){return _e(t,"POST","/v2/accounts/mfaEnrollment:finalize",se(t,e))}var vi="__sak";/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Xl=class{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(vi,"1"),this.storage.removeItem(vi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Jg=1e3,$g=10,Jl=class extends Xl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ol(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const n=this.storage.getItem(e),r=this.localCache[e];n!==r&&t(e,r,n)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((o,a,u)=>{this.notifyListeners(o,u)});return}const n=t.key;e?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(n);!e&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);hg()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(r,$g):r()}notifyListeners(t,e){this.localCache[t]=e;const n=this.listeners[t];if(n)for(const r of Array.from(n))r(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:n}),!0)})},Jg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}};Jl.type="LOCAL";var Zg=Jl;/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e_=1e3;function Ns(t){const e=t.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),n=RegExp(`${e}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function Os(t){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${t.split(":")[3]}`}var t_=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(t){const e=new URL(`${window.location.origin}/__cookies__`);return e.searchParams.set("finalTarget",t),e}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(t,e){}async _get(t){if(!this._isAvailable())return null;const e=Os(t);return window.cookieStore?(await window.cookieStore.get(e))?.value:Ns(e)}async _remove(t){if(!this._isAvailable()||!await this._get(t))return;const e=Os(t);document.cookie=`${e}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(t,e){if(!this._isAvailable())return;const n=Os(t);if(window.cookieStore){const a=(h=>{const d=h.changed.find(p=>p.name===n);d&&e(d.value),h.deleted.find(p=>p.name===n)&&e(null)}),u=()=>window.cookieStore.removeEventListener("change",a);return this.listenerUnsubscribes.set(e,u),window.cookieStore.addEventListener("change",a)}let r=Ns(n);const i=setInterval(()=>{const a=Ns(n);a!==r&&(e(a),r=a)},e_),o=()=>clearInterval(i);this.listenerUnsubscribes.set(e,o)}_removeListener(t,e){const n=this.listenerUnsubscribes.get(e);n&&(n(),this.listenerUnsubscribes.delete(e))}};t_.type="COOKIE";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $l=class extends Xl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}};$l.type="SESSION";var Zl=$l;/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function n_(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var eh=class th{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new th(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:o}=n.data,a=this.handlersMap[i];if(!a?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const u=Array.from(a).map(async d=>d(n.origin,o)),h=await n_(u);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:h})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};eh.receivers=[];/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Mo(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var r_=class{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,n=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,u)=>{const h=Mo("",20);r.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:r,onMessage(p){const y=p;if(y.data.eventId===h)switch(y.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(y.data.response);break;default:clearTimeout(d),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:h,data:e},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function xe(){return window}function i_(t){xe().location.href=t}/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function nh(){return typeof xe().WorkerGlobalScope<"u"&&typeof xe().importScripts=="function"}async function s_(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function o_(){return navigator?.serviceWorker?.controller||null}function a_(){return nh()?self:null}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rh="firebaseLocalStorageDb",c_=1,Ei="firebaseLocalStorage",ih="fbase_key",vr=class{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}};function xi(t,e){return t.transaction([Ei],e?"readwrite":"readonly").objectStore(Ei)}function u_(){const t=indexedDB.deleteDatabase(rh);return new vr(t).toPromise()}function Zs(){const t=indexedDB.open(rh,c_);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ei,{keyPath:ih})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ei)?e(r):(r.close(),await u_(),e(await Zs()))})})}async function jc(t,e,n){const r=xi(t,!0).put({[ih]:e,value:n});return new vr(r).toPromise()}async function l_(t,e){const n=xi(t,!1).get(e),r=await new vr(n).toPromise();return r===void 0?null:r.value}function zc(t,e){const n=xi(t,!0).delete(e);return new vr(n).toPromise()}var h_=800,d_=3,sh=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Zs(),this.db)}async _withRetries(t){let e=0;for(;;)try{const n=await this._openDb();return await t(n)}catch(n){if(e++>d_)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return nh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=eh._getInstance(a_()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await s_(),!this.activeServiceWorker)return;this.sender=new r_(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&t[0]?.fulfilled&&t[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||o_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await Zs();return await jc(t,vi,"1"),await zc(t,vi),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(n=>jc(n,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(n=>l_(n,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>zc(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(r=>{const i=xi(r,!1).getAll();return new vr(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],n=new Set;if(t.length!==0)for(const{fbase_key:r,value:i}of t)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),e.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),e.push(r));return e}notifyListeners(t,e){this.localCache[t]=e;const n=this.listeners[t];if(n)for(const r of Array.from(n))r(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),h_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}};sh.type="LOCAL";var f_=sh;/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Hc(t,e){return _e(t,"POST","/v2/accounts/mfaSignIn:start",se(t,e))}function p_(t,e){return _e(t,"POST","/v2/accounts/mfaSignIn:finalize",se(t,e))}function m_(t,e){return _e(t,"POST","/v2/accounts/mfaSignIn:finalize",se(t,e))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $I=xl("rcb"),ZI=new _r(3e4,6e4);/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Jr="recaptcha";async function g_(t,e,n){if(!t._getRecaptchaConfig())try{await wg(t)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){const i=r.session;if("phoneNumber"in r){M(i.type==="enroll",t,"internal-error");const o={idToken:i.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await en(t,o,"mfaSmsEnrollment",async(u,h)=>{if(h.phoneEnrollmentInfo.captchaResponse===Jn){M(n?.type===Jr,u,"argument-error");const d=await Ms(u,h,n);return qc(u,d)}return qc(u,h)},"PHONE_PROVIDER").catch(u=>Promise.reject(u))).phoneSessionInfo.sessionInfo}else{M(i.type==="signin",t,"internal-error");const o=r.multiFactorHint?.uid||r.multiFactorUid;M(o,t,"missing-multi-factor-info");const a={mfaPendingCredential:i.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await en(t,a,"mfaSmsSignIn",async(h,d)=>{if(d.phoneSignInInfo.captchaResponse===Jn){M(n?.type===Jr,h,"argument-error");const p=await Ms(h,d,n);return Hc(h,p)}return Hc(h,d)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).phoneResponseInfo.sessionInfo}}else{const i={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await en(t,i,"sendVerificationCode",async(a,u)=>{if(u.captchaResponse===Jn){M(n?.type===Jr,a,"argument-error");const h=await Ms(a,u,n);return Fc(a,h)}return Fc(a,u)},"PHONE_PROVIDER").catch(a=>Promise.reject(a))).sessionInfo}}finally{n?._reset()}}async function Ms(t,e,n){M(n.type===Jr,t,"argument-error");const r=await n.verify();M(typeof r=="string",t,"argument-error");const i={...e};if("phoneEnrollmentInfo"in i){const o=i.phoneEnrollmentInfo.phoneNumber,a=i.phoneEnrollmentInfo.captchaResponse,u=i.phoneEnrollmentInfo.clientType,h=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:o,recaptchaToken:r,captchaResponse:a,clientType:u,recaptchaVersion:h}}),i}else if("phoneSignInInfo"in i){const o=i.phoneSignInInfo.captchaResponse,a=i.phoneSignInInfo.clientType,u=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:o,clientType:a,recaptchaVersion:u}}),i}else return Object.assign(i,{recaptchaToken:r}),i}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var oh=class $r{constructor(e){this.providerId=$r.PROVIDER_ID,this.auth=et(e)}verifyPhoneNumber(e,n){return g_(this.auth,e,ne(n))}static credential(e,n){return Uc._fromVerification(e,n)}static credentialFromResult(e){const n=e;return $r.credentialFromTaggedObject(n)}static credentialFromError(e){return $r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:n,temporaryProof:r}=e;return n&&r?Uc._fromTokenResponse(n,r):null}};oh.PROVIDER_ID="phone";oh.PHONE_SIGN_IN_METHOD="phone";/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function __(t,e){return e?ze(e):(M(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Lo=class extends Ni{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return tn(t,this._buildIdpRequest())}_linkToIdToken(t,e){return tn(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return tn(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}};function y_(t){return Ql(t.auth,new Lo(t),t.bypassAuthState)}function v_(t){const{auth:e,user:n}=t;return M(n,e,"internal-error"),Hg(n,new Lo(t),t.bypassAuthState)}async function E_(t){const{auth:e,user:n}=t;return M(n,e,"internal-error"),zg(n,new Lo(t),t.bypassAuthState)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ah=class{constructor(t,e,n,r,i=!1){this.auth=t,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:n,postBody:r,tenantId:i,error:o,type:a}=t;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:e,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(u))}catch(h){this.reject(h)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return y_;case"linkViaPopup":case"linkViaRedirect":return E_;case"reauthViaPopup":case"reauthViaRedirect":return v_;default:Ve(this.auth,"internal-error")}}resolve(t){Ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var I_=new _r(2e3,1e4),T_=class qn extends ah{constructor(e,n,r,i,o){super(e,n,i,o),this.provider=r,this.authWindow=null,this.pollId=null,qn.currentPopupAction&&qn.currentPopupAction.cancel(),qn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return M(e,this.auth,"internal-error"),e}async onExecution(){Ke(this.filter.length===1,"Popup operations only handle one event");const e=Mo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Le(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Le(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,qn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Le(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,I_.get())};e()}};T_.currentPopupAction=null;/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var w_="pendingRedirect",Zr=new Map,A_=class extends ah{constructor(t,e,n=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,n),this.eventId=null}async execute(){let t=Zr.get(this.auth._key());if(!t){try{const e=await R_(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(e)}catch(e){t=()=>Promise.reject(e)}Zr.set(this.auth._key(),t)}return this.bypassAuthState||Zr.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function R_(t,e){const n=C_(e),r=S_(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function P_(t,e){Zr.set(t._key(),e)}function S_(t){return ze(t._redirectPersistence)}function C_(t){return Qr(w_,t.config.apiKey,t.name)}async function b_(t,e,n=!1){if(Se(t.app))return Promise.reject(He(t));const r=et(t),i=__(r,e),o=await new A_(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var V_=600*1e3,k_=class{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(t,n)&&(e=!0,this.sendToConsumer(t,n),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!D_(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){if(t.error&&!ch(t)){const n=t.error.code?.split("auth/")[1]||"internal-error";e.onError(Le(this.auth,n))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const n=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&n}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=V_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Gc(t))}saveEventToCache(t){this.cachedEventUids.add(Gc(t)),this.lastProcessedEventTime=Date.now()}};function Gc(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function ch({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function D_(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ch(t);default:return!1}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function N_(t,e={}){return _e(t,"GET","/v1/projects",e)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var O_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,M_=/^https?/;async function L_(t){if(t.config.emulator)return;const{authorizedDomains:e}=await N_(t);for(const n of e)try{if(x_(n))return}catch{}Ve(t,"unauthorized-domain")}function x_(t){const e=Ws(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!M_.test(n))return!1;if(O_.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var F_=new _r(3e4,6e4);function Wc(){const t=xe().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function U_(t){return new Promise((e,n)=>{function r(){Wc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Wc(),n(Le(t,"network-request-failed"))},timeout:F_.get()})}if(xe().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(xe().gapi?.load)r();else{const i=xl("iframefcb");return xe()[i]=()=>{gapi.load?r():n(Le(t,"network-request-failed"))},Ll(`${vg()}?onload=${i}`).catch(o=>n(o))}}).catch(e=>{throw ei=null,e})}var ei=null;function B_(t){return ei=ei||U_(t),ei}/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var q_=new _r(5e3,15e3),j_="__/auth/iframe",z_="emulator/auth/iframe",H_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},G_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function W_(t){const e=t.config;M(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Do(e,z_):`https://${t.config.authDomain}/${j_}`,r={apiKey:e.apiKey,appName:t.name,v:pn},i=G_.get(t.config.apiHost);i&&(r.eid=i);const o=t._getFrameworks();return o.length&&(r.fw=o.join(",")),`${n}?${gr(r).slice(1)}`}async function K_(t){const e=await B_(t),n=xe().gapi;return M(n,t,"internal-error"),e.open({where:document.body,url:W_(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:H_,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});const a=Le(t,"network-request-failed"),u=xe().setTimeout(()=>{o(a)},q_.get());function h(){xe().clearTimeout(u),i(r)}r.ping(h).then(h,()=>{o(a)})}))}/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Q_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Y_=500,X_=600,J_="_blank",$_="http://localhost",Kc=class{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Z_(t,e,n,r=Y_,i=X_){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const h={...Q_,width:r.toString(),height:i.toString(),top:o,left:a},d=ge().toLowerCase();n&&(u=bl(d)?J_:n),Sl(d)&&(e=e||$_,h.scrollbars="yes");const p=Object.entries(h).reduce((R,[C,N])=>`${R}${C}=${N},`,"");if(lg(d)&&u!=="_self")return ey(e||"",u),new Kc(null);const y=window.open(e||"",u,p);M(y,t,"popup-blocked");try{y.focus()}catch{}return new Kc(y)}function ey(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ty="__/auth/handler",ny="emulator/auth/handler",ry=encodeURIComponent("fac");async function Qc(t,e,n,r,i,o){M(t.config.authDomain,t,"auth-domain-config-required"),M(t.config.apiKey,t,"invalid-api-key");const a={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:pn,eventId:i};if(e instanceof jl){e.setDefaultLanguage(t.languageCode),a.providerId=e.providerId||"",Np(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,y]of Object.entries(o||{}))a[p]=y}if(e instanceof yr){const p=e.getScopes().filter(y=>y!=="");p.length>0&&(a.scopes=p.join(","))}t.tenantId&&(a.tid=t.tenantId);const u=a;for(const p of Object.keys(u))u[p]===void 0&&delete u[p];const h=await t._getAppCheckToken(),d=h?`#${ry}=${encodeURIComponent(h)}`:"";return`${iy(t)}?${gr(u).slice(1)}${d}`}function iy({config:t}){return t.emulator?Do(t,ny):`https://${t.authDomain}/${ty}`}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ls="webStorageSupport",sy=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Zl,this._completeRedirectFn=b_,this._overrideRedirectResult=P_}async _openPopup(t,e,n,r){Ke(this.eventManagers[t._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Qc(t,e,n,Ws(),r);return Z_(t,i,Mo())}async _openRedirect(t,e,n,r){await this._originValidation(t);const i=await Qc(t,e,n,Ws(),r);return i_(i),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:r,promise:i}=this.eventManagers[e];return r?Promise.resolve(r):(Ke(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(t);return this.eventManagers[e]={promise:n},n.catch(()=>{delete this.eventManagers[e]}),n}async initAndGetManager(t){const e=await K_(t),n=new k_(t);return e.register("authEvent",r=>(M(r?.authEvent,t,"invalid-auth-event"),{status:n.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:n},this.iframes[t._key()]=e,n}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(Ls,{type:Ls},n=>{const r=n?.[0]?.[Ls];r!==void 0&&e(!!r),Ve(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=L_(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return Ol()||Cl()||Oo()}},oy=sy,uh=class{constructor(t){this.factorId=t}_process(t,e,n){switch(e.type){case"enroll":return this._finalizeEnroll(t,e.credential,n);case"signin":return this._finalizeSignIn(t,e.credential);default:return Oe("unexpected MultiFactorSessionType")}}},ay=class lh extends uh{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new lh(e)}_finalizeEnroll(e,n,r){return Qg(e,{idToken:n,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,n){return p_(e,{mfaPendingCredential:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},cy=class{constructor(){}static assertion(t){return ay._fromCredential(t)}};cy.FACTOR_ID="phone";var uy=class{static assertionForEnrollment(t,e){return Yc._fromSecret(t,e)}static assertionForSignIn(t,e){return Yc._fromEnrollmentId(t,e)}static async generateSecret(t){const e=t;M(typeof e.user?.auth<"u","internal-error");const n=await Yg(e.user.auth,{idToken:e.credential,totpEnrollmentInfo:{}});return ly._fromStartTotpMfaEnrollmentResponse(n,e.user.auth)}};uy.FACTOR_ID="totp";var Yc=class eo extends uh{constructor(e,n,r){super("totp"),this.otp=e,this.enrollmentId=n,this.secret=r}static _fromSecret(e,n){return new eo(n,void 0,e)}static _fromEnrollmentId(e,n){return new eo(n,e)}async _finalizeEnroll(e,n,r){return M(typeof this.secret<"u",e,"argument-error"),Xg(e,{idToken:n,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,n){M(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");const r={verificationCode:this.otp};return m_(e,{mfaPendingCredential:n,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},ly=class hh{constructor(e,n,r,i,o,a,u){this.sessionInfo=a,this.auth=u,this.secretKey=e,this.hashingAlgorithm=n,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=o}static _fromStartTotpMfaEnrollmentResponse(e,n){return new hh(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,n)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,n){let r=!1;return(qr(e)||qr(n))&&(r=!0),r&&(qr(e)&&(e=this.auth.currentUser?.email||"unknownuser"),qr(n)&&(n=this.auth.name)),`otpauth://totp/${n}:${e}?secret=${this.secretKey}&issuer=${n}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function qr(t){return typeof t>"u"||t?.length===0}var Xc="@firebase/auth",Jc="1.11.1";/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hy=class{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(n=>{t(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){M(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function dy(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function fy(t){an(new Nt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;M(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:a,authDomain:u,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ml(t)},d=new gg(r,i,o,h);return Rg(d,n),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),an(new Nt("auth-internal",e=>(n=>new hy(n))(et(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),dt(Xc,Jc,dy(t)),dt(Xc,Jc,"esm2020")}var py=al("authIdTokenMaxAge")||300,$c=null,my=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>py)return;const i=n?.token;$c!==i&&($c=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function eT(t=pl()){const e=Vo(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Ag(t,{popupRedirectResolver:oy,persistence:[f_,Zg,Zl]}),r=al("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const a=my(o.toString());Kg(n,a,()=>a(n.currentUser)),Wg(n,u=>a(u))}}const i=sl("auth");return i&&Pg(n,`http://${i}`),n}function gy(){return document.getElementsByTagName("head")?.[0]??document}_g({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const o=Le("internal-error");o.customData=i,n(o)},r.type="text/javascript",r.charset="UTF-8",gy().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});fy("Browser");var Zc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},eu={};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ft,dh;(function(){var t;function e(E,m){function _(){}_.prototype=m.prototype,E.F=m.prototype,E.prototype=new _,E.prototype.constructor=E,E.D=function(I,v,w){for(var g=Array(arguments.length-2),Ee=2;Ee<arguments.length;Ee++)g[Ee-2]=arguments[Ee];return m.prototype[v].apply(I,g)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,n),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,m,_){_||(_=0);const I=Array(16);if(typeof m=="string")for(var v=0;v<16;++v)I[v]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(v=0;v<16;++v)I[v]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=E.g[0],_=E.g[1],v=E.g[2];let w=E.g[3],g;g=m+(w^_&(v^w))+I[0]+3614090360&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(v^m&(_^v))+I[1]+3905402710&4294967295,w=m+(g<<12&4294967295|g>>>20),g=v+(_^w&(m^_))+I[2]+606105819&4294967295,v=w+(g<<17&4294967295|g>>>15),g=_+(m^v&(w^m))+I[3]+3250441966&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(w^_&(v^w))+I[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(v^m&(_^v))+I[5]+1200080426&4294967295,w=m+(g<<12&4294967295|g>>>20),g=v+(_^w&(m^_))+I[6]+2821735955&4294967295,v=w+(g<<17&4294967295|g>>>15),g=_+(m^v&(w^m))+I[7]+4249261313&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(w^_&(v^w))+I[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(v^m&(_^v))+I[9]+2336552879&4294967295,w=m+(g<<12&4294967295|g>>>20),g=v+(_^w&(m^_))+I[10]+4294925233&4294967295,v=w+(g<<17&4294967295|g>>>15),g=_+(m^v&(w^m))+I[11]+2304563134&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(w^_&(v^w))+I[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(v^m&(_^v))+I[13]+4254626195&4294967295,w=m+(g<<12&4294967295|g>>>20),g=v+(_^w&(m^_))+I[14]+2792965006&4294967295,v=w+(g<<17&4294967295|g>>>15),g=_+(m^v&(w^m))+I[15]+1236535329&4294967295,_=v+(g<<22&4294967295|g>>>10),g=m+(v^w&(_^v))+I[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^v&(m^_))+I[6]+3225465664&4294967295,w=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(w^m))+I[11]+643717713&4294967295,v=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(v^w))+I[0]+3921069994&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(v^w&(_^v))+I[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^v&(m^_))+I[10]+38016083&4294967295,w=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(w^m))+I[15]+3634488961&4294967295,v=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(v^w))+I[4]+3889429448&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(v^w&(_^v))+I[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^v&(m^_))+I[14]+3275163606&4294967295,w=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(w^m))+I[3]+4107603335&4294967295,v=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(v^w))+I[8]+1163531501&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(v^w&(_^v))+I[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^v&(m^_))+I[2]+4243563512&4294967295,w=m+(g<<9&4294967295|g>>>23),g=v+(m^_&(w^m))+I[7]+1735328473&4294967295,v=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(v^w))+I[12]+2368359562&4294967295,_=v+(g<<20&4294967295|g>>>12),g=m+(_^v^w)+I[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^v)+I[8]+2272392833&4294967295,w=m+(g<<11&4294967295|g>>>21),g=v+(w^m^_)+I[11]+1839030562&4294967295,v=w+(g<<16&4294967295|g>>>16),g=_+(v^w^m)+I[14]+4259657740&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(_^v^w)+I[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^v)+I[4]+1272893353&4294967295,w=m+(g<<11&4294967295|g>>>21),g=v+(w^m^_)+I[7]+4139469664&4294967295,v=w+(g<<16&4294967295|g>>>16),g=_+(v^w^m)+I[10]+3200236656&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(_^v^w)+I[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^v)+I[0]+3936430074&4294967295,w=m+(g<<11&4294967295|g>>>21),g=v+(w^m^_)+I[3]+3572445317&4294967295,v=w+(g<<16&4294967295|g>>>16),g=_+(v^w^m)+I[6]+76029189&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(_^v^w)+I[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^v)+I[12]+3873151461&4294967295,w=m+(g<<11&4294967295|g>>>21),g=v+(w^m^_)+I[15]+530742520&4294967295,v=w+(g<<16&4294967295|g>>>16),g=_+(v^w^m)+I[2]+3299628645&4294967295,_=v+(g<<23&4294967295|g>>>9),g=m+(v^(_|~w))+I[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~v))+I[7]+1126891415&4294967295,w=m+(g<<10&4294967295|g>>>22),g=v+(m^(w|~_))+I[14]+2878612391&4294967295,v=w+(g<<15&4294967295|g>>>17),g=_+(w^(v|~m))+I[5]+4237533241&4294967295,_=v+(g<<21&4294967295|g>>>11),g=m+(v^(_|~w))+I[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~v))+I[3]+2399980690&4294967295,w=m+(g<<10&4294967295|g>>>22),g=v+(m^(w|~_))+I[10]+4293915773&4294967295,v=w+(g<<15&4294967295|g>>>17),g=_+(w^(v|~m))+I[1]+2240044497&4294967295,_=v+(g<<21&4294967295|g>>>11),g=m+(v^(_|~w))+I[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~v))+I[15]+4264355552&4294967295,w=m+(g<<10&4294967295|g>>>22),g=v+(m^(w|~_))+I[6]+2734768916&4294967295,v=w+(g<<15&4294967295|g>>>17),g=_+(w^(v|~m))+I[13]+1309151649&4294967295,_=v+(g<<21&4294967295|g>>>11),g=m+(v^(_|~w))+I[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~v))+I[11]+3174756917&4294967295,w=m+(g<<10&4294967295|g>>>22),g=v+(m^(w|~_))+I[2]+718787259&4294967295,v=w+(g<<15&4294967295|g>>>17),g=_+(w^(v|~m))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(v+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+v&4294967295,E.g[3]=E.g[3]+w&4294967295}r.prototype.v=function(E,m){m===void 0&&(m=E.length);const _=m-this.blockSize,I=this.C;let v=this.h,w=0;for(;w<m;){if(v==0)for(;w<=_;)i(this,E,w),w+=this.blockSize;if(typeof E=="string"){for(;w<m;)if(I[v++]=E.charCodeAt(w++),v==this.blockSize){i(this,I),v=0;break}}else for(;w<m;)if(I[v++]=E[w++],v==this.blockSize){i(this,I),v=0;break}}this.h=v,this.o+=m},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;m=this.o*8;for(var _=E.length-8;_<E.length;++_)E[_]=m&255,m/=256;for(this.v(E),E=Array(16),m=0,_=0;_<4;++_)for(let I=0;I<32;I+=8)E[m++]=this.g[_]>>>I&255;return E};function o(E,m){var _=u;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=m(E)}function a(E,m){this.h=m;const _=[];let I=!0;for(let v=E.length-1;v>=0;v--){const w=E[v]|0;I&&w==m||(_[v]=w,I=!1)}this.g=_}var u={};function h(E){return-128<=E&&E<128?o(E,function(m){return new a([m|0],m<0?-1:0)}):new a([E|0],E<0?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return y;if(E<0)return O(d(-E));const m=[];let _=1;for(let I=0;E>=_;I++)m[I]=E/_|0,_*=4294967296;return new a(m,0)}function p(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return O(p(E.substring(1),m));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(m,8));let I=y;for(let w=0;w<E.length;w+=8){var v=Math.min(8,E.length-w);const g=parseInt(E.substring(w,w+v),m);v<8?(v=d(Math.pow(m,v)),I=I.j(v).add(d(g))):(I=I.j(_),I=I.add(d(g)))}return I}var y=h(0),R=h(1),C=h(16777216);t=a.prototype,t.m=function(){if(k(this))return-O(this).m();let E=0,m=1;for(let _=0;_<this.g.length;_++){const I=this.i(_);E+=(I>=0?I:4294967296+I)*m,m*=4294967296}return E},t.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(N(this))return"0";if(k(this))return"-"+O(this).toString(E);const m=d(Math.pow(E,6));var _=this;let I="";for(;;){const v=Pe(_,m).g;_=q(_,v.j(m));let w=((_.g.length>0?_.g[0]:_.h)>>>0).toString(E);if(_=v,N(_))return w+I;for(;w.length<6;)w="0"+w;I=w+I}},t.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function N(E){if(E.h!=0)return!1;for(let m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function k(E){return E.h==-1}t.l=function(E){return E=q(this,E),k(E)?-1:N(E)?0:1};function O(E){const m=E.g.length,_=[];for(let I=0;I<m;I++)_[I]=~E.g[I];return new a(_,~E.h).add(R)}t.abs=function(){return k(this)?O(this):this},t.add=function(E){const m=Math.max(this.g.length,E.g.length),_=[];let I=0;for(let v=0;v<=m;v++){let w=I+(this.i(v)&65535)+(E.i(v)&65535),g=(w>>>16)+(this.i(v)>>>16)+(E.i(v)>>>16);I=g>>>16,w&=65535,g&=65535,_[v]=g<<16|w}return new a(_,_[_.length-1]&-2147483648?-1:0)};function q(E,m){return E.add(O(m))}t.j=function(E){if(N(this)||N(E))return y;if(k(this))return k(E)?O(this).j(O(E)):O(O(this).j(E));if(k(E))return O(this.j(O(E)));if(this.l(C)<0&&E.l(C)<0)return d(this.m()*E.m());const m=this.g.length+E.g.length,_=[];for(var I=0;I<2*m;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(let v=0;v<E.g.length;v++){const w=this.i(I)>>>16,g=this.i(I)&65535,Ee=E.i(v)>>>16,tt=E.i(v)&65535;_[2*I+2*v]+=g*tt,W(_,2*I+2*v),_[2*I+2*v+1]+=w*tt,W(_,2*I+2*v+1),_[2*I+2*v+1]+=g*Ee,W(_,2*I+2*v+1),_[2*I+2*v+2]+=w*Ee,W(_,2*I+2*v+2)}for(E=0;E<m;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=m;E<2*m;E++)_[E]=0;return new a(_,0)};function W(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function X(E,m){this.g=E,this.h=m}function Pe(E,m){if(N(m))throw Error("division by zero");if(N(E))return new X(y,y);if(k(E))return m=Pe(O(E),m),new X(O(m.g),O(m.h));if(k(m))return m=Pe(E,O(m)),new X(O(m.g),m.h);if(E.g.length>30){if(k(E)||k(m))throw Error("slowDivide_ only works with positive integers.");for(var _=R,I=m;I.l(E)<=0;)_=we(_),I=we(I);var v=he(_,1),w=he(I,1);for(I=he(I,2),_=he(_,2);!N(I);){var g=w.add(I);g.l(E)<=0&&(v=v.add(_),w=g),I=he(I,1),_=he(_,1)}return m=q(E,v.j(m)),new X(v,m)}for(v=y;E.l(m)>=0;){for(_=Math.max(1,Math.floor(E.m()/m.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),w=d(_),g=w.j(m);k(g)||g.l(E)>0;)_-=I,w=d(_),g=w.j(m);N(w)&&(w=R),v=v.add(w),E=q(E,g)}return new X(v,E)}t.B=function(E){return Pe(this,E).h},t.and=function(E){const m=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<m;I++)_[I]=this.i(I)&E.i(I);return new a(_,this.h&E.h)},t.or=function(E){const m=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<m;I++)_[I]=this.i(I)|E.i(I);return new a(_,this.h|E.h)},t.xor=function(E){const m=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<m;I++)_[I]=this.i(I)^E.i(I);return new a(_,this.h^E.h)};function we(E){const m=E.g.length+1,_=[];for(let I=0;I<m;I++)_[I]=E.i(I)<<1|E.i(I-1)>>>31;return new a(_,E.h)}function he(E,m){const _=m>>5;m%=32;const I=E.g.length-_,v=[];for(let w=0;w<I;w++)v[w]=m>0?E.i(w+_)>>>m|E.i(w+_+1)<<32-m:E.i(w+_);return new a(v,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,dh=eu.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,ft=eu.Integer=a}).apply(typeof Zc<"u"?Zc:typeof self<"u"?self:typeof window<"u"?window:{});var jr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},qe={};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var fh,_y,jn,ph,ti,to,mh,gh,_h;(function(){var t,e=Object.defineProperty;function n(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof jr=="object"&&jr];for(var c=0;c<s.length;++c){var l=s[c];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=n(this);function i(s,c){if(c)e:{var l=r;s=s.split(".");for(var f=0;f<s.length-1;f++){var T=s[f];if(!(T in l))break e;l=l[T]}s=s[s.length-1],f=l[s],c=c(f),c!=f&&c!=null&&e(l,s,{configurable:!0,writable:!0,value:c})}}i("Symbol.dispose",function(s){return s||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(s){return s||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(s){return s||function(c){var l=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&l.push([f,c[f]]);return l}});var o=o||{},a=this||self;function u(s){var c=typeof s;return c=="object"&&s!=null||c=="function"}function h(s,c,l){return s.call.apply(s.bind,arguments)}function d(s,c,l){return d=h,d.apply(null,arguments)}function p(s,c){var l=Array.prototype.slice.call(arguments,1);return function(){var f=l.slice();return f.push.apply(f,arguments),s.apply(this,f)}}function y(s,c){function l(){}l.prototype=c.prototype,s.Z=c.prototype,s.prototype=new l,s.prototype.constructor=s,s.Ob=function(f,T,A){for(var b=Array(arguments.length-2),B=2;B<arguments.length;B++)b[B-2]=arguments[B];return c.prototype[T].apply(f,b)}}var R=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?s=>s&&AsyncContext.Snapshot.wrap(s):s=>s;function C(s){const c=s.length;if(c>0){const l=Array(c);for(let f=0;f<c;f++)l[f]=s[f];return l}return[]}function N(s,c){for(let f=1;f<arguments.length;f++){const T=arguments[f];var l=typeof T;if(l=l!="object"?l:T?Array.isArray(T)?"array":l:"null",l=="array"||l=="object"&&typeof T.length=="number"){l=s.length||0;const A=T.length||0;s.length=l+A;for(let b=0;b<A;b++)s[l+b]=T[b]}else s.push(T)}}class k{constructor(c,l){this.i=c,this.j=l,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function O(s){a.setTimeout(()=>{throw s},0)}function q(){var s=E;let c=null;return s.g&&(c=s.g,s.g=s.g.next,s.g||(s.h=null),c.next=null),c}class W{constructor(){this.h=this.g=null}add(c,l){const f=X.get();f.set(c,l),this.h?this.h.next=f:this.g=f,this.h=f}}var X=new k(()=>new Pe,s=>s.reset());class Pe{constructor(){this.next=this.g=this.h=null}set(c,l){this.h=c,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let we,he=!1,E=new W,m=()=>{const s=Promise.resolve(void 0);we=()=>{s.then(_)}};function _(){for(var s;s=q();){try{s.h.call(s.g)}catch(l){O(l)}var c=X;c.j(s),c.h<100&&(c.h++,s.next=c.g,c.g=s)}he=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function v(s,c){this.type=s,this.g=this.target=c,this.defaultPrevented=!1}v.prototype.h=function(){this.defaultPrevented=!0};var w=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var s=!1,c=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};a.addEventListener("test",l,c),a.removeEventListener("test",l,c)}catch{}return s})();function g(s){return/^[\s\xa0]*$/.test(s)}function Ee(s,c){v.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s&&this.init(s,c)}y(Ee,v),Ee.prototype.init=function(s,c){const l=this.type=s.type,f=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;this.target=s.target||s.srcElement,this.g=c,c=s.relatedTarget,c||(l=="mouseover"?c=s.fromElement:l=="mouseout"&&(c=s.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=s.pointerType,this.state=s.state,this.i=s,s.defaultPrevented&&Ee.Z.h.call(this)},Ee.prototype.h=function(){Ee.Z.h.call(this);const s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var tt="closure_listenable_"+(Math.random()*1e6|0),kf=0;function Df(s,c,l,f,T){this.listener=s,this.proxy=null,this.src=c,this.type=l,this.capture=!!f,this.ha=T,this.key=++kf,this.da=this.fa=!1}function Rr(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function Pr(s,c,l){for(const f in s)c.call(l,s[f],f,s)}function Nf(s,c){for(const l in s)c.call(void 0,s[l],l,s)}function ga(s){const c={};for(const l in s)c[l]=s[l];return c}const _a="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ya(s,c){let l,f;for(let T=1;T<arguments.length;T++){f=arguments[T];for(l in f)s[l]=f[l];for(let A=0;A<_a.length;A++)l=_a[A],Object.prototype.hasOwnProperty.call(f,l)&&(s[l]=f[l])}}function Sr(s){this.src=s,this.g={},this.h=0}Sr.prototype.add=function(s,c,l,f,T){const A=s.toString();s=this.g[A],s||(s=this.g[A]=[],this.h++);const b=rs(s,c,f,T);return b>-1?(c=s[b],l||(c.fa=!1)):(c=new Df(c,this.src,A,!!f,T),c.fa=l,s.push(c)),c};function ns(s,c){const l=c.type;if(l in s.g){var f=s.g[l],T=Array.prototype.indexOf.call(f,c,void 0),A;(A=T>=0)&&Array.prototype.splice.call(f,T,1),A&&(Rr(c),s.g[l].length==0&&(delete s.g[l],s.h--))}}function rs(s,c,l,f){for(let T=0;T<s.length;++T){const A=s[T];if(!A.da&&A.listener==c&&A.capture==!!l&&A.ha==f)return T}return-1}var is="closure_lm_"+(Math.random()*1e6|0),ss={};function va(s,c,l,f,T){if(f&&f.once)return Ia(s,c,l,f,T);if(Array.isArray(c)){for(let A=0;A<c.length;A++)va(s,c[A],l,f,T);return null}return l=us(l),s&&s[tt]?s.J(c,l,u(f)?!!f.capture:!!f,T):Ea(s,c,l,!1,f,T)}function Ea(s,c,l,f,T,A){if(!c)throw Error("Invalid event type");const b=u(T)?!!T.capture:!!T;let B=as(s);if(B||(s[is]=B=new Sr(s)),l=B.add(c,l,f,b,A),l.proxy)return l;if(f=Of(),l.proxy=f,f.src=s,f.listener=l,s.addEventListener)w||(T=b),T===void 0&&(T=!1),s.addEventListener(c.toString(),f,T);else if(s.attachEvent)s.attachEvent(wa(c.toString()),f);else if(s.addListener&&s.removeListener)s.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return l}function Of(){function s(l){return c.call(s.src,s.listener,l)}const c=Mf;return s}function Ia(s,c,l,f,T){if(Array.isArray(c)){for(let A=0;A<c.length;A++)Ia(s,c[A],l,f,T);return null}return l=us(l),s&&s[tt]?s.K(c,l,u(f)?!!f.capture:!!f,T):Ea(s,c,l,!0,f,T)}function Ta(s,c,l,f,T){if(Array.isArray(c))for(var A=0;A<c.length;A++)Ta(s,c[A],l,f,T);else f=u(f)?!!f.capture:!!f,l=us(l),s&&s[tt]?(s=s.i,A=String(c).toString(),A in s.g&&(c=s.g[A],l=rs(c,l,f,T),l>-1&&(Rr(c[l]),Array.prototype.splice.call(c,l,1),c.length==0&&(delete s.g[A],s.h--)))):s&&(s=as(s))&&(c=s.g[c.toString()],s=-1,c&&(s=rs(c,l,f,T)),(l=s>-1?c[s]:null)&&os(l))}function os(s){if(typeof s!="number"&&s&&!s.da){var c=s.src;if(c&&c[tt])ns(c.i,s);else{var l=s.type,f=s.proxy;c.removeEventListener?c.removeEventListener(l,f,s.capture):c.detachEvent?c.detachEvent(wa(l),f):c.addListener&&c.removeListener&&c.removeListener(f),(l=as(c))?(ns(l,s),l.h==0&&(l.src=null,c[is]=null)):Rr(s)}}}function wa(s){return s in ss?ss[s]:ss[s]="on"+s}function Mf(s,c){if(s.da)s=!0;else{c=new Ee(c,this);const l=s.listener,f=s.ha||s.src;s.fa&&os(s),s=l.call(f,c)}return s}function as(s){return s=s[is],s instanceof Sr?s:null}var cs="__closure_events_fn_"+(Math.random()*1e9>>>0);function us(s){return typeof s=="function"?s:(s[cs]||(s[cs]=function(c){return s.handleEvent(c)}),s[cs])}function de(){I.call(this),this.i=new Sr(this),this.M=this,this.G=null}y(de,I),de.prototype[tt]=!0,de.prototype.removeEventListener=function(s,c,l,f){Ta(this,s,c,l,f)};function ye(s,c){var l,f=s.G;if(f)for(l=[];f;f=f.G)l.push(f);if(s=s.M,f=c.type||c,typeof c=="string")c=new v(c,s);else if(c instanceof v)c.target=c.target||s;else{var T=c;c=new v(f,s),ya(c,T)}T=!0;let A,b;if(l)for(b=l.length-1;b>=0;b--)A=c.g=l[b],T=Cr(A,f,!0,c)&&T;if(A=c.g=s,T=Cr(A,f,!0,c)&&T,T=Cr(A,f,!1,c)&&T,l)for(b=0;b<l.length;b++)A=c.g=l[b],T=Cr(A,f,!1,c)&&T}de.prototype.N=function(){if(de.Z.N.call(this),this.i){var s=this.i;for(const c in s.g){const l=s.g[c];for(let f=0;f<l.length;f++)Rr(l[f]);delete s.g[c],s.h--}}this.G=null},de.prototype.J=function(s,c,l,f){return this.i.add(String(s),c,!1,l,f)},de.prototype.K=function(s,c,l,f){return this.i.add(String(s),c,!0,l,f)};function Cr(s,c,l,f){if(c=s.i.g[String(c)],!c)return!0;c=c.concat();let T=!0;for(let A=0;A<c.length;++A){const b=c[A];if(b&&!b.da&&b.capture==l){const B=b.listener,ie=b.ha||b.src;b.fa&&ns(s.i,b),T=B.call(ie,f)!==!1&&T}}return T&&!f.defaultPrevented}function Lf(s,c){if(typeof s!="function")if(s&&typeof s.handleEvent=="function")s=d(s.handleEvent,s);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(s,c||0)}function Aa(s){s.g=Lf(()=>{s.g=null,s.i&&(s.i=!1,Aa(s))},s.l);const c=s.h;s.h=null,s.m.apply(null,c)}class xf extends I{constructor(c,l){super(),this.m=c,this.l=l,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Aa(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function En(s){I.call(this),this.h=s,this.g={}}y(En,I);var Ra=[];function Pa(s){Pr(s.g,function(c,l){this.g.hasOwnProperty(l)&&os(c)},s),s.g={}}En.prototype.N=function(){En.Z.N.call(this),Pa(this)},En.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ls=a.JSON.stringify,Ff=a.JSON.parse,Uf=class{stringify(s){return a.JSON.stringify(s,void 0)}parse(s){return a.JSON.parse(s,void 0)}};function Sa(){}function Ca(){}var In={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function hs(){v.call(this,"d")}y(hs,v);function ds(){v.call(this,"c")}y(ds,v);var Tt={},ba=null;function br(){return ba=ba||new de}Tt.Ia="serverreachability";function Va(s){v.call(this,Tt.Ia,s)}y(Va,v);function Tn(s){const c=br();ye(c,new Va(c))}Tt.STAT_EVENT="statevent";function ka(s,c){v.call(this,Tt.STAT_EVENT,s),this.stat=c}y(ka,v);function ve(s){const c=br();ye(c,new ka(c,s))}Tt.Ja="timingevent";function Da(s,c){v.call(this,Tt.Ja,s),this.size=c}y(Da,v);function wn(s,c){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){s()},c)}function An(){this.g=!0}An.prototype.ua=function(){this.g=!1};function Bf(s,c,l,f,T,A){s.info(function(){if(s.g)if(A){var b="",B=A.split("&");for(let Q=0;Q<B.length;Q++){var ie=B[Q].split("=");if(ie.length>1){const oe=ie[0];ie=ie[1];const De=oe.split("_");b=De.length>=2&&De[1]=="type"?b+(oe+"="+ie+"&"):b+(oe+"=redacted&")}}}else b=null;else b=A;return"XMLHTTP REQ ("+f+") [attempt "+T+"]: "+c+`
`+l+`
`+b})}function qf(s,c,l,f,T,A,b){s.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+T+"]: "+c+`
`+l+`
`+A+" "+b})}function Bt(s,c,l,f){s.info(function(){return"XMLHTTP TEXT ("+c+"): "+zf(s,l)+(f?" "+f:"")})}function jf(s,c){s.info(function(){return"TIMEOUT: "+c})}An.prototype.info=function(){};function zf(s,c){if(!s.g)return c;if(!c)return null;try{const A=JSON.parse(c);if(A){for(s=0;s<A.length;s++)if(Array.isArray(A[s])){var l=A[s];if(!(l.length<2)){var f=l[1];if(Array.isArray(f)&&!(f.length<1)){var T=f[0];if(T!="noop"&&T!="stop"&&T!="close")for(let b=1;b<f.length;b++)f[b]=""}}}}return ls(A)}catch{return c}}var Vr={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Na={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Oa;function fs(){}y(fs,Sa),fs.prototype.g=function(){return new XMLHttpRequest},Oa=new fs;function Rn(s){return encodeURIComponent(String(s))}function Hf(s){var c=1;s=s.split(":");const l=[];for(;c>0&&s.length;)l.push(s.shift()),c--;return s.length&&l.push(s.join(":")),l}function nt(s,c,l,f){this.j=s,this.i=c,this.l=l,this.S=f||1,this.V=new En(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ma}function Ma(){this.i=null,this.g="",this.h=!1}var La={},ps={};function ms(s,c,l){s.M=1,s.A=Dr(ke(c)),s.u=l,s.R=!0,xa(s,null)}function xa(s,c){s.F=Date.now(),kr(s),s.B=ke(s.A);var l=s.B,f=s.S;Array.isArray(f)||(f=[String(f)]),Xa(l.i,"t",f),s.C=0,l=s.j.L,s.h=new Ma,s.g=pc(s.j,l?c:null,!s.u),s.P>0&&(s.O=new xf(d(s.Y,s,s.g),s.P)),c=s.V,l=s.g,f=s.ba;var T="readystatechange";Array.isArray(T)||(T&&(Ra[0]=T.toString()),T=Ra);for(let A=0;A<T.length;A++){const b=va(l,T[A],f||c.handleEvent,!1,c.h||c);if(!b)break;c.g[b.key]=b}c=s.J?ga(s.J):{},s.u?(s.v||(s.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.B,s.v,s.u,c)):(s.v="GET",s.g.ea(s.B,s.v,null,c)),Tn(),Bf(s.i,s.v,s.B,s.l,s.S,s.u)}nt.prototype.ba=function(s){s=s.target;const c=this.O;c&&st(s)==3?c.j():this.Y(s)},nt.prototype.Y=function(s){try{if(s==this.g)e:{const B=st(this.g),ie=this.g.ya(),Q=this.g.ca();if(!(B<3)&&(B!=3||this.g&&(this.h.h||this.g.la()||rc(this.g)))){this.K||B!=4||ie==7||(ie==8||Q<=0?Tn(3):Tn(2)),gs(this);var c=this.g.ca();this.X=c;var l=Gf(this);if(this.o=c==200,qf(this.i,this.v,this.B,this.l,this.S,B,c),this.o){if(this.U&&!this.L){t:{if(this.g){var f,T=this.g;if((f=T.g?T.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(f)){var A=f;break t}}A=null}if(s=A)Bt(this.i,this.l,s,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,_s(this,s);else{this.o=!1,this.m=3,ve(12),wt(this),Pn(this);break e}}if(this.R){s=!0;let oe;for(;!this.K&&this.C<l.length;)if(oe=Wf(this,l),oe==ps){B==4&&(this.m=4,ve(14),s=!1),Bt(this.i,this.l,null,"[Incomplete Response]");break}else if(oe==La){this.m=4,ve(15),Bt(this.i,this.l,l,"[Invalid Chunk]"),s=!1;break}else Bt(this.i,this.l,oe,null),_s(this,oe);if(Fa(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),B!=4||l.length!=0||this.h.h||(this.m=1,ve(16),s=!1),this.o=this.o&&s,!s)Bt(this.i,this.l,l,"[Invalid Chunked Response]"),wt(this),Pn(this);else if(l.length>0&&!this.W){this.W=!0;var b=this.j;b.g==this&&b.aa&&!b.P&&(b.j.info("Great, no buffering proxy detected. Bytes received: "+l.length),As(b),b.P=!0,ve(11))}}else Bt(this.i,this.l,l,null),_s(this,l);B==4&&wt(this),this.o&&!this.K&&(B==4?lc(this.j,this):(this.o=!1,kr(this)))}else op(this.g),c==400&&l.indexOf("Unknown SID")>0?(this.m=3,ve(12)):(this.m=0,ve(13)),wt(this),Pn(this)}}}catch{}};function Gf(s){if(!Fa(s))return s.g.la();const c=rc(s.g);if(c==="")return"";let l="";const f=c.length,T=st(s.g)==4;if(!s.h.i){if(typeof TextDecoder>"u")return wt(s),Pn(s),"";s.h.i=new a.TextDecoder}for(let A=0;A<f;A++)s.h.h=!0,l+=s.h.i.decode(c[A],{stream:!(T&&A==f-1)});return c.length=0,s.h.g+=l,s.C=0,s.h.g}function Fa(s){return s.g?s.v=="GET"&&s.M!=2&&s.j.Aa:!1}function Wf(s,c){var l=s.C,f=c.indexOf(`
`,l);return f==-1?ps:(l=Number(c.substring(l,f)),isNaN(l)?La:(f+=1,f+l>c.length?ps:(c=c.slice(f,f+l),s.C=f+l,c)))}nt.prototype.cancel=function(){this.K=!0,wt(this)};function kr(s){s.T=Date.now()+s.H,Ua(s,s.H)}function Ua(s,c){if(s.D!=null)throw Error("WatchDog timer not null");s.D=wn(d(s.aa,s),c)}function gs(s){s.D&&(a.clearTimeout(s.D),s.D=null)}nt.prototype.aa=function(){this.D=null;const s=Date.now();s-this.T>=0?(jf(this.i,this.B),this.M!=2&&(Tn(),ve(17)),wt(this),this.m=2,Pn(this)):Ua(this,this.T-s)};function Pn(s){s.j.I==0||s.K||lc(s.j,s)}function wt(s){gs(s);var c=s.O;c&&typeof c.dispose=="function"&&c.dispose(),s.O=null,Pa(s.V),s.g&&(c=s.g,s.g=null,c.abort(),c.dispose())}function _s(s,c){try{var l=s.j;if(l.I!=0&&(l.g==s||ys(l.h,s))){if(!s.L&&ys(l.h,s)&&l.I==3){try{var f=l.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var T=f;if(T[0]==0){e:if(!l.v){if(l.g)if(l.g.F+3e3<s.F)Fr(l),Lr(l);else break e;ws(l),ve(18)}}else l.xa=T[1],0<l.xa-l.K&&T[2]<37500&&l.F&&l.A==0&&!l.C&&(l.C=wn(d(l.Va,l),6e3));ja(l.h)<=1&&l.ta&&(l.ta=void 0)}else Rt(l,11)}else if((s.L||l.g==s)&&Fr(l),!g(c))for(T=l.Ba.g.parse(c),c=0;c<T.length;c++){let Q=T[c];const oe=Q[0];if(!(oe<=l.K))if(l.K=oe,Q=Q[1],l.I==2)if(Q[0]=="c"){l.M=Q[1],l.ba=Q[2];const De=Q[3];De!=null&&(l.ka=De,l.j.info("VER="+l.ka));const Pt=Q[4];Pt!=null&&(l.za=Pt,l.j.info("SVER="+l.za));const ot=Q[5];ot!=null&&typeof ot=="number"&&ot>0&&(f=1.5*ot,l.O=f,l.j.info("backChannelRequestTimeoutMs_="+f)),f=l;const at=s.g;if(at){const Br=at.g?at.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Br){var A=f.h;A.g||Br.indexOf("spdy")==-1&&Br.indexOf("quic")==-1&&Br.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(vs(A,A.h),A.h=null))}if(f.G){const Rs=at.g?at.g.getResponseHeader("X-HTTP-Session-Id"):null;Rs&&(f.wa=Rs,Y(f.J,f.G,Rs))}}l.I=3,l.l&&l.l.ra(),l.aa&&(l.T=Date.now()-s.F,l.j.info("Handshake RTT: "+l.T+"ms")),f=l;var b=s;if(f.na=fc(f,f.L?f.ba:null,f.W),b.L){za(f.h,b);var B=b,ie=f.O;ie&&(B.H=ie),B.D&&(gs(B),kr(B)),f.g=b}else cc(f);l.i.length>0&&xr(l)}else Q[0]!="stop"&&Q[0]!="close"||Rt(l,7);else l.I==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?Rt(l,7):Ts(l):Q[0]!="noop"&&l.l&&l.l.qa(Q),l.A=0)}}Tn(4)}catch{}}var Kf=class{constructor(s,c){this.g=s,this.map=c}};function Ba(s){this.l=s||10,a.PerformanceNavigationTiming?(s=a.performance.getEntriesByType("navigation"),s=s.length>0&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function qa(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function ja(s){return s.h?1:s.g?s.g.size:0}function ys(s,c){return s.h?s.h==c:s.g?s.g.has(c):!1}function vs(s,c){s.g?s.g.add(c):s.h=c}function za(s,c){s.h&&s.h==c?s.h=null:s.g&&s.g.has(c)&&s.g.delete(c)}Ba.prototype.cancel=function(){if(this.i=Ha(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Ha(s){if(s.h!=null)return s.i.concat(s.h.G);if(s.g!=null&&s.g.size!==0){let c=s.i;for(const l of s.g.values())c=c.concat(l.G);return c}return C(s.i)}var Ga=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Qf(s,c){if(s){s=s.split("&");for(let l=0;l<s.length;l++){const f=s[l].indexOf("=");let T,A=null;f>=0?(T=s[l].substring(0,f),A=s[l].substring(f+1)):T=s[l],c(T,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function rt(s){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;s instanceof rt?(this.l=s.l,Sn(this,s.j),this.o=s.o,this.g=s.g,Cn(this,s.u),this.h=s.h,Es(this,Ja(s.i)),this.m=s.m):s&&(c=String(s).match(Ga))?(this.l=!1,Sn(this,c[1]||"",!0),this.o=bn(c[2]||""),this.g=bn(c[3]||"",!0),Cn(this,c[4]),this.h=bn(c[5]||"",!0),Es(this,c[6]||"",!0),this.m=bn(c[7]||"")):(this.l=!1,this.i=new kn(null,this.l))}rt.prototype.toString=function(){const s=[];var c=this.j;c&&s.push(Vn(c,Wa,!0),":");var l=this.g;return(l||c=="file")&&(s.push("//"),(c=this.o)&&s.push(Vn(c,Wa,!0),"@"),s.push(Rn(l).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.u,l!=null&&s.push(":",String(l))),(l=this.h)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(Vn(l,l.charAt(0)=="/"?Jf:Xf,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",Vn(l,Zf)),s.join("")},rt.prototype.resolve=function(s){const c=ke(this);let l=!!s.j;l?Sn(c,s.j):l=!!s.o,l?c.o=s.o:l=!!s.g,l?c.g=s.g:l=s.u!=null;var f=s.h;if(l)Cn(c,s.u);else if(l=!!s.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var T=c.h.lastIndexOf("/");T!=-1&&(f=c.h.slice(0,T+1)+f)}if(T=f,T==".."||T==".")f="";else if(T.indexOf("./")!=-1||T.indexOf("/.")!=-1){f=T.lastIndexOf("/",0)==0,T=T.split("/");const A=[];for(let b=0;b<T.length;){const B=T[b++];B=="."?f&&b==T.length&&A.push(""):B==".."?((A.length>1||A.length==1&&A[0]!="")&&A.pop(),f&&b==T.length&&A.push("")):(A.push(B),f=!0)}f=A.join("/")}else f=T}return l?c.h=f:l=s.i.toString()!=="",l?Es(c,Ja(s.i)):l=!!s.m,l&&(c.m=s.m),c};function ke(s){return new rt(s)}function Sn(s,c,l){s.j=l?bn(c,!0):c,s.j&&(s.j=s.j.replace(/:$/,""))}function Cn(s,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);s.u=c}else s.u=null}function Es(s,c,l){c instanceof kn?(s.i=c,ep(s.i,s.l)):(l||(c=Vn(c,$f)),s.i=new kn(c,s.l))}function Y(s,c,l){s.i.set(c,l)}function Dr(s){return Y(s,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),s}function bn(s,c){return s?c?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Vn(s,c,l){return typeof s=="string"?(s=encodeURI(s).replace(c,Yf),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Yf(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Wa=/[#\/\?@]/g,Xf=/[#\?:]/g,Jf=/[#\?]/g,$f=/[#\?@]/g,Zf=/#/g;function kn(s,c){this.h=this.g=null,this.i=s||null,this.j=!!c}function At(s){s.g||(s.g=new Map,s.h=0,s.i&&Qf(s.i,function(c,l){s.add(decodeURIComponent(c.replace(/\+/g," ")),l)}))}t=kn.prototype,t.add=function(s,c){At(this),this.i=null,s=qt(this,s);let l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(c),this.h+=1,this};function Ka(s,c){At(s),c=qt(s,c),s.g.has(c)&&(s.i=null,s.h-=s.g.get(c).length,s.g.delete(c))}function Qa(s,c){return At(s),c=qt(s,c),s.g.has(c)}t.forEach=function(s,c){At(this),this.g.forEach(function(l,f){l.forEach(function(T){s.call(c,T,f,this)},this)},this)};function Ya(s,c){At(s);let l=[];if(typeof c=="string")Qa(s,c)&&(l=l.concat(s.g.get(qt(s,c))));else for(s=Array.from(s.g.values()),c=0;c<s.length;c++)l=l.concat(s[c]);return l}t.set=function(s,c){return At(this),this.i=null,s=qt(this,s),Qa(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[c]),this.h+=1,this},t.get=function(s,c){return s?(s=Ya(this,s),s.length>0?String(s[0]):c):c};function Xa(s,c,l){Ka(s,c),l.length>0&&(s.i=null,s.g.set(qt(s,c),C(l)),s.h+=l.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var l=c[f];const T=Rn(l);l=Ya(this,l);for(let A=0;A<l.length;A++){let b=T;l[A]!==""&&(b+="="+Rn(l[A])),s.push(b)}}return this.i=s.join("&")};function Ja(s){const c=new kn;return c.i=s.i,s.g&&(c.g=new Map(s.g),c.h=s.h),c}function qt(s,c){return c=String(c),s.j&&(c=c.toLowerCase()),c}function ep(s,c){c&&!s.j&&(At(s),s.i=null,s.g.forEach(function(l,f){const T=f.toLowerCase();f!=T&&(Ka(this,f),Xa(this,T,l))},s)),s.j=c}function tp(s,c){const l=new An;if(a.Image){const f=new Image;f.onload=p(it,l,"TestLoadImage: loaded",!0,c,f),f.onerror=p(it,l,"TestLoadImage: error",!1,c,f),f.onabort=p(it,l,"TestLoadImage: abort",!1,c,f),f.ontimeout=p(it,l,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=s}else c(!1)}function np(s,c){const l=new An,f=new AbortController,T=setTimeout(()=>{f.abort(),it(l,"TestPingServer: timeout",!1,c)},1e4);fetch(s,{signal:f.signal}).then(A=>{clearTimeout(T),A.ok?it(l,"TestPingServer: ok",!0,c):it(l,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(T),it(l,"TestPingServer: error",!1,c)})}function it(s,c,l,f,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),f(l)}catch{}}function rp(){this.g=new Uf}function Nr(s){this.i=s.Sb||null,this.h=s.ab||!1}y(Nr,Sa),Nr.prototype.g=function(){return new Or(this.i,this.h)};function Or(s,c){de.call(this),this.H=s,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}y(Or,de),t=Or.prototype,t.open=function(s,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=s,this.D=c,this.readyState=1,Nn(this)},t.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};s&&(c.body=s),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Dn(this)),this.readyState=0},t.Pa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Nn(this)),this.g&&(this.readyState=3,Nn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;$a(this)}else s.text().then(this.Oa.bind(this),this.ga.bind(this))};function $a(s){s.j.read().then(s.Ma.bind(s)).catch(s.ga.bind(s))}t.Ma=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var c=s.value?s.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!s.done}))&&(this.response=this.responseText+=c)}s.done?Dn(this):Nn(this),this.readyState==3&&$a(this)}},t.Oa=function(s){this.g&&(this.response=this.responseText=s,Dn(this))},t.Na=function(s){this.g&&(this.response=s,Dn(this))},t.ga=function(){this.g&&Dn(this)};function Dn(s){s.readyState=4,s.l=null,s.j=null,s.B=null,Nn(s)}t.setRequestHeader=function(s,c){this.A.append(s,c)},t.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],c=this.h.entries();for(var l=c.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=c.next();return s.join(`\r
`)};function Nn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Or.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Za(s){let c="";return Pr(s,function(l,f){c+=f,c+=":",c+=l,c+=`\r
`}),c}function Is(s,c,l){e:{for(f in l){var f=!1;break e}f=!0}f||(l=Za(l),typeof s=="string"?l!=null&&Rn(l):Y(s,c,l))}function $(s){de.call(this),this.headers=new Map,this.L=s||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}y($,de);var ip=/^https?$/i,sp=["POST","PUT"];t=$.prototype,t.Fa=function(s){this.H=s},t.ea=function(s,c,l,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);c=c?c.toUpperCase():"GET",this.D=s,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Oa.g(),this.g.onreadystatechange=R(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(s),!0),this.B=!1}catch(A){ec(this,A);return}if(s=l||"",l=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var T in f)l.set(T,f[T]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const A of f.keys())l.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(l.keys()).find(A=>A.toLowerCase()=="content-type"),T=a.FormData&&s instanceof a.FormData,!(Array.prototype.indexOf.call(sp,c,void 0)>=0)||f||T||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,b]of l)this.g.setRequestHeader(A,b);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(s),this.v=!1}catch(A){ec(this,A)}};function ec(s,c){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=c,s.o=5,tc(s),Mr(s)}function tc(s){s.A||(s.A=!0,ye(s,"complete"),ye(s,"error"))}t.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=s||7,ye(this,"complete"),ye(this,"abort"),Mr(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Mr(this,!0)),$.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?nc(this):this.Xa())},t.Xa=function(){nc(this)};function nc(s){if(s.h&&typeof o<"u"){if(s.v&&st(s)==4)setTimeout(s.Ca.bind(s),0);else if(ye(s,"readystatechange"),st(s)==4){s.h=!1;try{const A=s.ca();e:switch(A){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var l;if(!(l=c)){var f;if(f=A===0){let b=String(s.D).match(Ga)[1]||null;!b&&a.self&&a.self.location&&(b=a.self.location.protocol.slice(0,-1)),f=!ip.test(b?b.toLowerCase():"")}l=f}if(l)ye(s,"complete"),ye(s,"success");else{s.o=6;try{var T=st(s)>2?s.g.statusText:""}catch{T=""}s.l=T+" ["+s.ca()+"]",tc(s)}}finally{Mr(s)}}}}function Mr(s,c){if(s.g){s.m&&(clearTimeout(s.m),s.m=null);const l=s.g;s.g=null,c||ye(s,"ready");try{l.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function st(s){return s.g?s.g.readyState:0}t.ca=function(){try{return st(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(s){if(this.g){var c=this.g.responseText;return s&&c.indexOf(s)==0&&(c=c.substring(s.length)),Ff(c)}};function rc(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.F){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function op(s){const c={};s=(s.g&&st(s)>=2&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<s.length;f++){if(g(s[f]))continue;var l=Hf(s[f]);const T=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const A=c[T]||[];c[T]=A,A.push(l)}Nf(c,function(f){return f.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function On(s,c,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||c}function ic(s){this.za=0,this.i=[],this.j=new An,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=On("failFast",!1,s),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=On("baseRetryDelayMs",5e3,s),this.Za=On("retryDelaySeedMs",1e4,s),this.Ta=On("forwardChannelMaxRetries",2,s),this.va=On("forwardChannelRequestTimeoutMs",2e4,s),this.ma=s&&s.xmlHttpFactory||void 0,this.Ua=s&&s.Rb||void 0,this.Aa=s&&s.useFetchStreams||!1,this.O=void 0,this.L=s&&s.supportsCrossDomainXhr||!1,this.M="",this.h=new Ba(s&&s.concurrentRequestLimit),this.Ba=new rp,this.S=s&&s.fastHandshake||!1,this.R=s&&s.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=s&&s.Pb||!1,s&&s.ua&&this.j.ua(),s&&s.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&s&&s.detectBufferingProxy||!1,this.ia=void 0,s&&s.longPollingTimeout&&s.longPollingTimeout>0&&(this.ia=s.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=ic.prototype,t.ka=8,t.I=1,t.connect=function(s,c,l,f){ve(0),this.W=s,this.H=c||{},l&&f!==void 0&&(this.H.OSID=l,this.H.OAID=f),this.F=this.X,this.J=fc(this,null,this.W),xr(this)};function Ts(s){if(sc(s),s.I==3){var c=s.V++,l=ke(s.J);if(Y(l,"SID",s.M),Y(l,"RID",c),Y(l,"TYPE","terminate"),Mn(s,l),c=new nt(s,s.j,c),c.M=2,c.A=Dr(ke(l)),l=!1,a.navigator&&a.navigator.sendBeacon)try{l=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!l&&a.Image&&(new Image().src=c.A,l=!0),l||(c.g=pc(c.j,null),c.g.ea(c.A)),c.F=Date.now(),kr(c)}dc(s)}function Lr(s){s.g&&(As(s),s.g.cancel(),s.g=null)}function sc(s){Lr(s),s.v&&(a.clearTimeout(s.v),s.v=null),Fr(s),s.h.cancel(),s.m&&(typeof s.m=="number"&&a.clearTimeout(s.m),s.m=null)}function xr(s){if(!qa(s.h)&&!s.m){s.m=!0;var c=s.Ea;we||m(),he||(we(),he=!0),E.add(c,s),s.D=0}}function ap(s,c){return ja(s.h)>=s.h.j-(s.m?1:0)?!1:s.m?(s.i=c.G.concat(s.i),!0):s.I==1||s.I==2||s.D>=(s.Sa?0:s.Ta)?!1:(s.m=wn(d(s.Ea,s,c),hc(s,s.D)),s.D++,!0)}t.Ea=function(s){if(this.m)if(this.m=null,this.I==1){if(!s){this.V=Math.floor(Math.random()*1e5),s=this.V++;const T=new nt(this,this.j,s);let A=this.o;if(this.U&&(A?(A=ga(A),ya(A,this.U)):A=this.U),this.u!==null||this.R||(T.J=A,A=null),this.S)e:{for(var c=0,l=0;l<this.i.length;l++){t:{var f=this.i[l];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=l;break e}if(c===4096||l===this.i.length-1){c=l+1;break e}}c=1e3}else c=1e3;c=ac(this,T,c),l=ke(this.J),Y(l,"RID",s),Y(l,"CVER",22),this.G&&Y(l,"X-HTTP-Session-Id",this.G),Mn(this,l),A&&(this.R?c="headers="+Rn(Za(A))+"&"+c:this.u&&Is(l,this.u,A)),vs(this.h,T),this.Ra&&Y(l,"TYPE","init"),this.S?(Y(l,"$req",c),Y(l,"SID","null"),T.U=!0,ms(T,l,null)):ms(T,l,c),this.I=2}}else this.I==3&&(s?oc(this,s):this.i.length==0||qa(this.h)||oc(this))};function oc(s,c){var l;c?l=c.l:l=s.V++;const f=ke(s.J);Y(f,"SID",s.M),Y(f,"RID",l),Y(f,"AID",s.K),Mn(s,f),s.u&&s.o&&Is(f,s.u,s.o),l=new nt(s,s.j,l,s.D+1),s.u===null&&(l.J=s.o),c&&(s.i=c.G.concat(s.i)),c=ac(s,l,1e3),l.H=Math.round(s.va*.5)+Math.round(s.va*.5*Math.random()),vs(s.h,l),ms(l,f,c)}function Mn(s,c){s.H&&Pr(s.H,function(l,f){Y(c,f,l)}),s.l&&Pr({},function(l,f){Y(c,f,l)})}function ac(s,c,l){l=Math.min(s.i.length,l);const f=s.l?d(s.l.Ka,s.l,s):null;e:{var T=s.i;let B=-1;for(;;){const ie=["count="+l];B==-1?l>0?(B=T[0].g,ie.push("ofs="+B)):B=0:ie.push("ofs="+B);let Q=!0;for(let oe=0;oe<l;oe++){var A=T[oe].g;const De=T[oe].map;if(A-=B,A<0)B=Math.max(0,T[oe].g-100),Q=!1;else try{A="req"+A+"_"||"";try{var b=De instanceof Map?De:Object.entries(De);for(const[Pt,ot]of b){let at=ot;u(ot)&&(at=ls(ot)),ie.push(A+Pt+"="+encodeURIComponent(at))}}catch(Pt){throw ie.push(A+"type=_badmap"),Pt}}catch{f&&f(De)}}if(Q){b=ie.join("&");break e}}b=void 0}return s=s.i.splice(0,l),c.G=s,b}function cc(s){if(!s.g&&!s.v){s.Y=1;var c=s.Da;we||m(),he||(we(),he=!0),E.add(c,s),s.A=0}}function ws(s){return s.g||s.v||s.A>=3?!1:(s.Y++,s.v=wn(d(s.Da,s),hc(s,s.A)),s.A++,!0)}t.Da=function(){if(this.v=null,uc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var s=4*this.T;this.j.info("BP detection timer enabled: "+s),this.B=wn(d(this.Wa,this),s)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ve(10),Lr(this),uc(this))};function As(s){s.B!=null&&(a.clearTimeout(s.B),s.B=null)}function uc(s){s.g=new nt(s,s.j,"rpc",s.Y),s.u===null&&(s.g.J=s.o),s.g.P=0;var c=ke(s.na);Y(c,"RID","rpc"),Y(c,"SID",s.M),Y(c,"AID",s.K),Y(c,"CI",s.F?"0":"1"),!s.F&&s.ia&&Y(c,"TO",s.ia),Y(c,"TYPE","xmlhttp"),Mn(s,c),s.u&&s.o&&Is(c,s.u,s.o),s.O&&(s.g.H=s.O);var l=s.g;s=s.ba,l.M=1,l.A=Dr(ke(c)),l.u=null,l.R=!0,xa(l,s)}t.Va=function(){this.C!=null&&(this.C=null,Lr(this),ws(this),ve(19))};function Fr(s){s.C!=null&&(a.clearTimeout(s.C),s.C=null)}function lc(s,c){var l=null;if(s.g==c){Fr(s),As(s),s.g=null;var f=2}else if(ys(s.h,c))l=c.G,za(s.h,c),f=1;else return;if(s.I!=0){if(c.o)if(f==1){l=c.u?c.u.length:0,c=Date.now()-c.F;var T=s.D;f=br(),ye(f,new Da(f,l)),xr(s)}else cc(s);else if(T=c.m,T==3||T==0&&c.X>0||!(f==1&&ap(s,c)||f==2&&ws(s)))switch(l&&l.length>0&&(c=s.h,c.i=c.i.concat(l)),T){case 1:Rt(s,5);break;case 4:Rt(s,10);break;case 3:Rt(s,6);break;default:Rt(s,2)}}}function hc(s,c){let l=s.Qa+Math.floor(Math.random()*s.Za);return s.isActive()||(l*=2),l*c}function Rt(s,c){if(s.j.info("Error code "+c),c==2){var l=d(s.bb,s),f=s.Ua;const T=!f;f=new rt(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Sn(f,"https"),Dr(f),T?tp(f.toString(),l):np(f.toString(),l)}else ve(2);s.I=0,s.l&&s.l.pa(c),dc(s),sc(s)}t.bb=function(s){s?(this.j.info("Successfully pinged google.com"),ve(2)):(this.j.info("Failed to ping google.com"),ve(1))};function dc(s){if(s.I=0,s.ja=[],s.l){const c=Ha(s.h);(c.length!=0||s.i.length!=0)&&(N(s.ja,c),N(s.ja,s.i),s.h.i.length=0,C(s.i),s.i.length=0),s.l.oa()}}function fc(s,c,l){var f=l instanceof rt?ke(l):new rt(l);if(f.g!="")c&&(f.g=c+"."+f.g),Cn(f,f.u);else{var T=a.location;f=T.protocol,c=c?c+"."+T.hostname:T.hostname,T=+T.port;const A=new rt(null);f&&Sn(A,f),c&&(A.g=c),T&&Cn(A,T),l&&(A.h=l),f=A}return l=s.G,c=s.wa,l&&c&&Y(f,l,c),Y(f,"VER",s.ka),Mn(s,f),f}function pc(s,c,l){if(c&&!s.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=s.Aa&&!s.ma?new $(new Nr({ab:l})):new $(s.ma),c.Fa(s.L),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function mc(){}t=mc.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function Ur(){}Ur.prototype.g=function(s,c){return new Ae(s,c)};function Ae(s,c){de.call(this),this.g=new ic(c),this.l=s,this.h=c&&c.messageUrlParams||null,s=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(s?s["X-WebChannel-Content-Type"]=c.messageContentType:s={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(s?s["X-WebChannel-Client-Profile"]=c.sa:s={"X-WebChannel-Client-Profile":c.sa}),this.g.U=s,(s=c&&c.Qb)&&!g(s)&&(this.g.u=s),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!g(c)&&(this.g.G=c,s=this.h,s!==null&&c in s&&(s=this.h,c in s&&delete s[c])),this.j=new jt(this)}y(Ae,de),Ae.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ae.prototype.close=function(){Ts(this.g)},Ae.prototype.o=function(s){var c=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.v&&(l={},l.__data__=ls(s),s=l);c.i.push(new Kf(c.Ya++,s)),c.I==3&&xr(c)},Ae.prototype.N=function(){this.g.l=null,delete this.j,Ts(this.g),delete this.g,Ae.Z.N.call(this)};function gc(s){hs.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var c=s.__sm__;if(c){e:{for(const l in c){s=l;break e}s=void 0}(this.i=s)&&(s=this.i,c=c!==null&&s in c?c[s]:void 0),this.data=c}else this.data=s}y(gc,hs);function _c(){ds.call(this),this.status=1}y(_c,ds);function jt(s){this.g=s}y(jt,mc),jt.prototype.ra=function(){ye(this.g,"a")},jt.prototype.qa=function(s){ye(this.g,new gc(s))},jt.prototype.pa=function(s){ye(this.g,new _c)},jt.prototype.oa=function(){ye(this.g,"b")},Ur.prototype.createWebChannel=Ur.prototype.g,Ae.prototype.send=Ae.prototype.o,Ae.prototype.open=Ae.prototype.m,Ae.prototype.close=Ae.prototype.close,_h=qe.createWebChannelTransport=function(){return new Ur},gh=qe.getStatEventTarget=function(){return br()},mh=qe.Event=Tt,to=qe.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Vr.NO_ERROR=0,Vr.TIMEOUT=8,Vr.HTTP_ERROR=6,ti=qe.ErrorCode=Vr,Na.COMPLETE="complete",ph=qe.EventType=Na,Ca.EventType=In,In.OPEN="a",In.CLOSE="b",In.ERROR="c",In.MESSAGE="d",de.prototype.listen=de.prototype.J,jn=qe.WebChannel=Ca,_y=qe.FetchXmlHttpFactory=Nr,$.prototype.listenOnce=$.prototype.K,$.prototype.getLastError=$.prototype.Ha,$.prototype.getLastErrorCode=$.prototype.ya,$.prototype.getStatus=$.prototype.ca,$.prototype.getResponseJson=$.prototype.La,$.prototype.getResponseText=$.prototype.la,$.prototype.send=$.prototype.ea,$.prototype.setWithCredentials=$.prototype.Fa,fh=qe.XhrIo=$}).apply(typeof jr<"u"?jr:typeof self<"u"?self:typeof window<"u"?window:{});var tu="@firebase/firestore",nu="4.9.2";/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pe=class{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}};pe.UNAUTHENTICATED=new pe(null),pe.GOOGLE_CREDENTIALS=new pe("google-credentials-uid"),pe.FIRST_PARTY=new pe("first-party-uid"),pe.MOCK_USER=new pe("mock-user");/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var mn="12.3.0";/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ot=new Co("@firebase/firestore");function Kt(){return Ot.logLevel}function D(t,...e){if(Ot.logLevel<=j.DEBUG){const n=e.map(xo);Ot.debug(`Firestore (${mn}): ${t}`,...n)}}function Qe(t,...e){if(Ot.logLevel<=j.ERROR){const n=e.map(xo);Ot.error(`Firestore (${mn}): ${t}`,...n)}}function cn(t,...e){if(Ot.logLevel<=j.WARN){const n=e.map(xo);Ot.warn(`Firestore (${mn}): ${t}`,...n)}}function xo(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(n){return JSON.stringify(n)})(t)}catch{return t}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function x(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,yh(t,r,n)}function yh(t,e,n){let r=`FIRESTORE (${mn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw Qe(r),new Error(r)}function K(t,e,n,r){let i="Unexpected state";typeof n=="string"?i=n:r=n,t||yh(e,i,r)}function F(t,e){return t}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},V=class extends Lt{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ge=class{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var vh=class{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}},yy=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(pe.UNAUTHENTICATED)))}shutdown(){}},vy=class{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}},Ey=class{constructor(t){this.t=t,this.currentUser=pe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){K(this.o===void 0,42304);let n=this.i;const r=u=>this.i!==n?(n=this.i,e(u)):Promise.resolve();let i=new Ge;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ge,t.enqueueRetryable((()=>r(this.currentUser)))};const o=()=>{const u=i;t.enqueueRetryable((async()=>{await u.promise,await r(this.currentUser)}))},a=u=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>a(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?a(u):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ge)}}),0),o()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((n=>this.i!==t?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(K(typeof n.accessToken=="string",31837,{l:n}),new vh(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return K(t===null||typeof t=="string",2055,{h:t}),new pe(t)}},Iy=class{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=pe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}},Ty=class{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new Iy(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(pe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}},ru=class{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},wy=class{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Se(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){K(this.o===void 0,3512);const n=i=>{i.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,D("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>n(i)))};const r=i=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>r(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?r(i):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new ru(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(K(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new ru(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ay(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Fo=class{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const r=Ay(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<e&&(n+=t.charAt(r[i]%62))}return n}};function z(t,e){return t<e?-1:t>e?1:0}function no(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const i=t.charAt(r),o=e.charAt(r);if(i!==o)return xs(i)===xs(o)?z(i,o):xs(i)?1:-1}return z(t.length,e.length)}var Ry=55296,Py=57343;function xs(t){const e=t.charCodeAt(0);return e>=Ry&&e<=Py}function un(t,e,n){return t.length===e.length&&t.every(((r,i)=>n(r,e[i])))}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var iu="__name__",Eh=class ut{constructor(e,n,r){n===void 0?n=0:n>e.length&&x(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&x(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return ut.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof ut?e.forEach((r=>{n.push(r)})):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const o=ut.compareSegments(e.get(i),n.get(i));if(o!==0)return o}return z(e.length,n.length)}static compareSegments(e,n){const r=ut.isNumericId(e),i=ut.isNumericId(n);return r&&!i?-1:!r&&i?1:r&&i?ut.extractNumericId(e).compare(ut.extractNumericId(n)):no(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return ft.fromString(e.substring(4,e.length-2))}},Z=class ni extends Eh{construct(e,n,r){return new ni(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter((i=>i.length>0)))}return new ni(n)}static emptyPath(){return new ni([])}},Sy=/^[_a-zA-Z][_a-zA-Z0-9]*$/,be=class Qt extends Eh{construct(e,n,r){return new Qt(e,n,r)}static isValidIdentifier(e){return Sy.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Qt.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===iu}static keyField(){return new Qt([iu])}static fromServerFormat(e){const n=[];let r="",i=0;const o=()=>{if(r.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let a=!1;for(;i<e.length;){const u=e[i];if(u==="\\"){if(i+1===e.length)throw new V(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new V(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,i+=2}else u==="`"?(a=!a,i++):u!=="."||a?(r+=u,i++):(o(),i++)}if(o(),a)throw new V(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Qt(n)}static emptyPath(){return new Qt([])}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var L=class zn{constructor(e){this.path=e}static fromPath(e){return new zn(Z.fromString(e))}static fromName(e){return new zn(Z.fromString(e).popFirst(5))}static empty(){return new zn(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Z.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new zn(new Z(e.slice()))}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ih(t,e,n){if(!n)throw new V(P.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Cy(t,e,n,r){if(e===!0&&r===!0)throw new V(P.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function su(t){if(!L.isDocumentKey(t))throw new V(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function ou(t){if(L.isDocumentKey(t))throw new V(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Th(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Fi(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":x(12329,{type:typeof t})}function Re(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new V(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Fi(t);throw new V(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function by(t,e){if(e<=0)throw new V(P.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function te(t,e){const n={typeString:t};return e&&(n.value=e),n}function Er(t,e){if(!Th(t))throw new V(P.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const i=e[r].typeString,o="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const a=t[r];if(i&&typeof a!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(o!==void 0&&a!==o.value){n=`Expected '${r}' field to equal '${o.value}'`;break}}if(n)throw new V(P.INVALID_ARGUMENT,n);return!0}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var au=-62135596800,cu=1e6,ue=class Ct{static now(){return Ct.fromMillis(Date.now())}static fromDate(e){return Ct.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*cu);return new Ct(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<au)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/cu}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ct._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Er(e,Ct._jsonSchema))return new Ct(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-au;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};ue._jsonSchemaVersion="firestore/timestamp/1.0",ue._jsonSchema={type:te("string",ue._jsonSchemaVersion),seconds:te("number"),nanoseconds:te("number")};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var U=class ri{static fromTimestamp(e){return new ri(e)}static min(){return new ri(new ue(0,0))}static max(){return new ri(new ue(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var or=-1,Vy=class{constructor(t,e,n,r){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=r}};Vy.UNKNOWN_ID=-1;function ky(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=U.fromTimestamp(r===1e9?new ue(n+1,0):new ue(n,r));return new ar(i,L.empty(),e)}function Dy(t){return new ar(t.readTime,t.key,or)}var ar=class ro{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new ro(U.min(),L.empty(),or)}static max(){return new ro(U.max(),L.empty(),or)}};function Ny(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=L.comparator(t.documentKey,e.documentKey),n!==0?n:z(t.largestBatchId,e.largestBatchId))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Oy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",My=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/async function gn(t){if(t.code!==P.FAILED_PRECONDITION||t.message!==Oy)throw t;D("LocalStore","Unexpectedly lost primary lease")}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var S=class Ie{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)}),(n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)}))}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&x(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new Ie(((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(n,o).next(r,i)}}))}toPromise(){return new Promise(((e,n)=>{this.next(e,n)}))}wrapUserFunction(e){try{const n=e();return n instanceof Ie?n:Ie.resolve(n)}catch(n){return Ie.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction((()=>e(n))):Ie.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction((()=>e(n))):Ie.reject(n)}static resolve(e){return new Ie(((n,r)=>{n(e)}))}static reject(e){return new Ie(((n,r)=>{r(e)}))}static waitFor(e){return new Ie(((n,r)=>{let i=0,o=0,a=!1;e.forEach((u=>{++i,u.next((()=>{++o,a&&o===i&&n()}),(h=>r(h)))})),a=!0,o===i&&n()}))}static or(e){let n=Ie.resolve(!1);for(const r of e)n=n.next((i=>i?Ie.resolve(i):r()));return n}static forEach(e,n){const r=[];return e.forEach(((i,o)=>{r.push(n.call(this,i,o))})),this.waitFor(r)}static mapArray(e,n){return new Ie(((r,i)=>{const o=e.length,a=new Array(o);let u=0;for(let h=0;h<o;h++){const d=h;n(e[d]).next((p=>{a[d]=p,++u,u===o&&r(a)}),(p=>i(p)))}}))}static doWhile(e,n){return new Ie(((r,i)=>{const o=()=>{e()===!0?n().next((()=>{o()}),i):r()};o()}))}};function Ly(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function _n(t){return t.name==="IndexedDbTransactionError"}/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ui=class{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>e.writeSequenceNumber(n))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}};Ui.ce=-1;/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Uo=-1;function Bi(t){return t==null}function cr(t){return t===0&&1/t==-1/0}function xy(t){return typeof t=="number"&&Number.isInteger(t)&&!cr(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var wh="";function Fy(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=uu(e)),e=Uy(t.get(n),e);return uu(e)}function Uy(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const o=t.charAt(i);switch(o){case"\0":n+="";break;case wh:n+="";break;default:n+=o}}return n}function uu(t){return t+wh+""}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var By="remoteDocuments",Ah="owner";var Rh="mutationQueues";var Ph="mutations";var Sh="documentMutations",qy="remoteDocumentsV14";var Ch="remoteDocumentGlobal";var bh="targets";var Vh="targetDocuments";var kh="targetGlobal",Dh="collectionParents";var Nh="clientMetadata";var Oh="bundles";var Mh="namedQueries";var jy="indexConfiguration";var zy="indexState";var Hy="indexEntries";var Lh="documentOverlays";var Gy="globals";var Wy=[Rh,Ph,Sh,By,bh,Ah,kh,Vh,Nh,Ch,Dh,Oh,Mh],tT=[...Wy,Lh],Ky=[Rh,Ph,Sh,qy,bh,Ah,kh,Vh,Nh,Ch,Dh,Oh,Mh,Lh],Qy=Ky,Yy=[...Qy,jy,zy,Hy];var nT=[...Yy,Gy];/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function lu(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Et(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function xh(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var re=class io{constructor(e,n){this.comparator=e,this.root=n||pt.EMPTY}insert(e,n){return new io(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,pt.BLACK,null,null))}remove(e){return new io(this.comparator,this.root.remove(e,this.comparator).copy(null,null,pt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((n,r)=>(e(n,r),!1)))}toString(){const e=[];return this.inorderTraversal(((n,r)=>(e.push(`${n}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new zr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new zr(this.root,e,this.comparator,!1)}getReverseIterator(){return new zr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new zr(this.root,e,this.comparator,!0)}},zr=class{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&r&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}},pt=class je{constructor(e,n,r,i,o){this.key=e,this.value=n,this.color=r??je.RED,this.left=i??je.EMPTY,this.right=o??je.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,o){return new je(e??this.key,n??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const o=r(e,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(e,n,r),null):o===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return je.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return je.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,je.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,je.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw x(27949);return e+(this.isRed()?0:1)}};pt.EMPTY=null,pt.RED=!0,pt.BLACK=!1;pt.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(e,n,r,i,o){return this}insert(e,n,r){return new pt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var me=class so{constructor(e){this.comparator=e,this.data=new re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((n,r)=>(e(n),!1)))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new hu(this.data.getIterator())}getIteratorFrom(e){return new hu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach((r=>{n=n.add(r)})),n}isEqual(e){if(!(e instanceof so)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((n=>{e.push(n)})),e}toString(){const e=[];return this.forEach((n=>e.push(n))),"SortedSet("+e.toString()+")"}copy(e){const n=new so(this.comparator);return n.data=e,n}},hu=class{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Me=class oo{constructor(e){this.fields=e,e.sort(be.comparator)}static empty(){return new oo([])}unionWith(e){let n=new me(be.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new oo(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return un(this.fields,e.fields,((n,r)=>n.isEqual(r)))}};/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Fh=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Te=class ao{constructor(e){this.binaryString=e}static fromBase64String(e){const n=(function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Fh("Invalid base64 string: "+o):o}})(e);return new ao(n)}static fromUint8Array(e){const n=(function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o})(e);return new ao(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(n){return btoa(n)})(this.binaryString)}toUint8Array(){return(function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Te.EMPTY_BYTE_STRING=new Te("");var Xy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ye(t){if(K(!!t,39018),typeof t=="string"){let e=0;const n=Xy.exec(t);if(K(!!n,46558,{timestamp:t}),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:J(t.seconds),nanos:J(t.nanos)}}function J(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Xe(t){return typeof t=="string"?Te.fromBase64String(t):Te.fromUint8Array(t)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Uh="server_timestamp",Bh="__type__",qh="__previous_value__",jh="__local_write_time__";function Bo(t){return(t?.mapValue?.fields||{})[Bh]?.stringValue===Uh}function qi(t){const e=t.mapValue.fields[qh];return Bo(e)?qi(e):e}function ur(t){const e=Ye(t.mapValue.fields[jh].timestampValue);return new ue(e.seconds,e.nanos)}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Jy=class{constructor(t,e,n,r,i,o,a,u,h,d){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=d}},Ii="(default)",zh=class co{constructor(e,n){this.projectId=e,this.database=n||Ii}static empty(){return new co("","")}get isDefaultDatabase(){return this.database===Ii}isEqual(e){return e instanceof co&&e.projectId===this.projectId&&e.database===this.database}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var qo="__type__",Hh="__max__",Hr={mapValue:{fields:{__type__:{stringValue:Hh}}}},jo="__vector__",ln="value";function mt(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Bo(t)?4:Wh(t)?9007199254740991:Gh(t)?10:11:x(28295,{value:t})}function Be(t,e){if(t===e)return!0;const n=mt(t);if(n!==mt(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ur(t).isEqual(ur(e));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const a=Ye(i.timestampValue),u=Ye(o.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos})(t,e);case 5:return t.stringValue===e.stringValue;case 6:return(function(i,o){return Xe(i.bytesValue).isEqual(Xe(o.bytesValue))})(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return(function(i,o){return J(i.geoPointValue.latitude)===J(o.geoPointValue.latitude)&&J(i.geoPointValue.longitude)===J(o.geoPointValue.longitude)})(t,e);case 2:return(function(i,o){if("integerValue"in i&&"integerValue"in o)return J(i.integerValue)===J(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const a=J(i.doubleValue),u=J(o.doubleValue);return a===u?cr(a)===cr(u):isNaN(a)&&isNaN(u)}return!1})(t,e);case 9:return un(t.arrayValue.values||[],e.arrayValue.values||[],Be);case 10:case 11:return(function(i,o){const a=i.mapValue.fields||{},u=o.mapValue.fields||{};if(lu(a)!==lu(u))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(u[h]===void 0||!Be(a[h],u[h])))return!1;return!0})(t,e);default:return x(52216,{left:t})}}function lr(t,e){return(t.values||[]).find((n=>Be(n,e)))!==void 0}function hn(t,e){if(t===e)return 0;const n=mt(t),r=mt(e);if(n!==r)return z(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return z(t.booleanValue,e.booleanValue);case 2:return(function(o,a){const u=J(o.integerValue||o.doubleValue),h=J(a.integerValue||a.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1})(t,e);case 3:return du(t.timestampValue,e.timestampValue);case 4:return du(ur(t),ur(e));case 5:return no(t.stringValue,e.stringValue);case 6:return(function(o,a){const u=Xe(o),h=Xe(a);return u.compareTo(h)})(t.bytesValue,e.bytesValue);case 7:return(function(o,a){const u=o.split("/"),h=a.split("/");for(let d=0;d<u.length&&d<h.length;d++){const p=z(u[d],h[d]);if(p!==0)return p}return z(u.length,h.length)})(t.referenceValue,e.referenceValue);case 8:return(function(o,a){const u=z(J(o.latitude),J(a.latitude));return u!==0?u:z(J(o.longitude),J(a.longitude))})(t.geoPointValue,e.geoPointValue);case 9:return fu(t.arrayValue,e.arrayValue);case 10:return(function(o,a){const u=o.fields||{},h=a.fields||{},d=u[ln]?.arrayValue,p=h[ln]?.arrayValue,y=z(d?.values?.length||0,p?.values?.length||0);return y!==0?y:fu(d,p)})(t.mapValue,e.mapValue);case 11:return(function(o,a){if(o===Hr.mapValue&&a===Hr.mapValue)return 0;if(o===Hr.mapValue)return 1;if(a===Hr.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),d=a.fields||{},p=Object.keys(d);h.sort(),p.sort();for(let y=0;y<h.length&&y<p.length;++y){const R=no(h[y],p[y]);if(R!==0)return R;const C=hn(u[h[y]],d[p[y]]);if(C!==0)return C}return z(h.length,p.length)})(t.mapValue,e.mapValue);default:throw x(23264,{he:n})}}function du(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return z(t,e);const n=Ye(t),r=Ye(e),i=z(n.seconds,r.seconds);return i!==0?i:z(n.nanos,r.nanos)}function fu(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const o=hn(n[i],r[i]);if(o)return o}return z(n.length,r.length)}function dn(t){return uo(t)}function uo(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?(function(n){const r=Ye(n);return`time(${r.seconds},${r.nanos})`})(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?(function(n){return Xe(n).toBase64()})(t.bytesValue):"referenceValue"in t?(function(n){return L.fromName(n).toString()})(t.referenceValue):"geoPointValue"in t?(function(n){return`geo(${n.latitude},${n.longitude})`})(t.geoPointValue):"arrayValue"in t?(function(n){let r="[",i=!0;for(const o of n.values||[])i?i=!1:r+=",",r+=uo(o);return r+"]"})(t.arrayValue):"mapValue"in t?(function(n){const r=Object.keys(n.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${uo(n.fields[a])}`;return i+"}"})(t.mapValue):x(61005,{value:t})}function ii(t){switch(mt(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=qi(t);return e?16+ii(e):16;case 5:return 2*t.stringValue.length;case 6:return Xe(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((i,o)=>i+ii(o)),0)})(t.arrayValue);case 10:case 11:return(function(r){let i=0;return Et(r.fields,((o,a)=>{i+=o.length+ii(a)})),i})(t.mapValue);default:throw x(13486,{value:t})}}function pu(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function lo(t){return!!t&&"integerValue"in t}function zo(t){return!!t&&"arrayValue"in t}function mu(t){return!!t&&"nullValue"in t}function gu(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function si(t){return!!t&&"mapValue"in t}function Gh(t){return(t?.mapValue?.fields||{})[qo]?.stringValue===jo}function $n(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return Et(t.mapValue.fields,((n,r)=>e.mapValue.fields[n]=$n(r))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=$n(t.arrayValue.values[n]);return e}return{...t}}function Wh(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===Hh}var iT={mapValue:{fields:{[qo]:{stringValue:jo},[ln]:{arrayValue:{}}}}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ce=class ho{constructor(e){this.value=e}static empty(){return new ho({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!si(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=$n(n)}setAll(e){let n=be.emptyPath(),r={},i=[];e.forEach(((a,u)=>{if(!n.isImmediateParentOf(u)){const h=this.getFieldsMap(n);this.applyChanges(h,r,i),r={},i=[],n=u.popLast()}a?r[u.lastSegment()]=$n(a):i.push(u.lastSegment())}));const o=this.getFieldsMap(n);this.applyChanges(o,r,i)}delete(e){const n=this.field(e.popLast());si(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Be(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];si(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){Et(n,((i,o)=>e[i]=o));for(const i of r)delete e[i]}clone(){return new ho($n(this.value))}};function Kh(t){const e=[];return Et(t.fields,((n,r)=>{const i=new be([n]);if(si(r)){const o=Kh(r.mapValue).fields;if(o.length===0)e.push(i);else for(const a of o)e.push(i.child(a))}else e.push(i)})),new Me(e)}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Je=class bt{constructor(e,n,r,i,o,a,u){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=o,this.data=a,this.documentState=u}static newInvalidDocument(e){return new bt(e,0,U.min(),U.min(),U.min(),Ce.empty(),0)}static newFoundDocument(e,n,r,i){return new bt(e,1,n,U.min(),r,i,0)}static newNoDocument(e,n){return new bt(e,2,n,U.min(),U.min(),Ce.empty(),0)}static newUnknownDocument(e,n){return new bt(e,3,n,U.min(),U.min(),Ce.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ce.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ce.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof bt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new bt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ti=class{constructor(t,e){this.position=t,this.inclusive=e}};function _u(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const o=e[i],a=t.position[i];if(o.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),n.key):r=hn(a,n.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function yu(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Be(t.position[n],e.position[n]))return!1;return!0}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hr=class{constructor(t,e="asc"){this.field=t,this.dir=e}};function $y(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Qh=class{},ce=class Yh extends Qh{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new ev(e,n,r):n==="array-contains"?new rv(e,r):n==="in"?new iv(e,r):n==="not-in"?new sv(e,r):n==="array-contains-any"?new ov(e,r):new Yh(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new tv(e,r):new nv(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(hn(n,this.value)):n!==null&&mt(this.value)===mt(n)&&this.matchesComparison(hn(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},$e=class Xh extends Qh{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new Xh(e,n)}matches(e){return Jh(this)?this.filters.find((n=>!n.matches(e)))===void 0:this.filters.find((n=>n.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,n)=>e.concat(n.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}};function Jh(t){return t.op==="and"}function $h(t){return Zy(t)&&Jh(t)}function Zy(t){for(const e of t.filters)if(e instanceof $e)return!1;return!0}function fo(t){if(t instanceof ce)return t.field.canonicalString()+t.op.toString()+dn(t.value);if($h(t))return t.filters.map((e=>fo(e))).join(",");{const e=t.filters.map((n=>fo(n))).join(",");return`${t.op}(${e})`}}function Zh(t,e){return t instanceof ce?(function(r,i){return i instanceof ce&&r.op===i.op&&r.field.isEqual(i.field)&&Be(r.value,i.value)})(t,e):t instanceof $e?(function(r,i){return i instanceof $e&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((o,a,u)=>o&&Zh(a,i.filters[u])),!0):!1})(t,e):void x(19439)}function ed(t){return t instanceof ce?(function(n){return`${n.field.canonicalString()} ${n.op} ${dn(n.value)}`})(t):t instanceof $e?(function(n){return n.op.toString()+" {"+n.getFilters().map(ed).join(" ,")+"}"})(t):"Filter"}var ev=class extends ce{constructor(t,e,n){super(t,e,n),this.key=L.fromName(n.referenceValue)}matches(t){const e=L.comparator(t.key,this.key);return this.matchesComparison(e)}},tv=class extends ce{constructor(t,e){super(t,"in",e),this.keys=td("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}},nv=class extends ce{constructor(t,e){super(t,"not-in",e),this.keys=td("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}};function td(t,e){return(e.arrayValue?.values||[]).map((n=>L.fromName(n.referenceValue)))}var rv=class extends ce{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return zo(e)&&lr(e.arrayValue,this.value)}},iv=class extends ce{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&lr(this.value.arrayValue,e)}},sv=class extends ce{constructor(t,e){super(t,"not-in",e)}matches(t){if(lr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!lr(this.value.arrayValue,e)}},ov=class extends ce{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!zo(e)||!e.arrayValue.values)&&e.arrayValue.values.some((n=>lr(this.value.arrayValue,n)))}};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var av=class{constructor(t,e=null,n=[],r=[],i=null,o=null,a=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=o,this.endAt=a,this.Te=null}};function vu(t,e=null,n=[],r=[],i=null,o=null,a=null){return new av(t,e,n,r,i,o,a)}function Ho(t){const e=F(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map((r=>fo(r))).join(","),n+="|ob:",n+=e.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),Bi(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map((r=>dn(r))).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map((r=>dn(r))).join(",")),e.Te=n}return e.Te}function Go(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!$y(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!Zh(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!yu(t.startAt,e.startAt)&&yu(t.endAt,e.endAt)}function po(t){return L.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var yn=class{constructor(t,e=null,n=[],r=[],i=null,o="F",a=null,u=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}};function cv(t,e,n,r,i,o,a,u){return new yn(t,e,n,r,i,o,a,u)}function ji(t){return new yn(t)}function Eu(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function nd(t){return t.collectionGroup!==null}function Zn(t){const e=F(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new me(be.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(a=a.add(h.field))}))})),a})(e).forEach((i=>{n.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new hr(i,r))})),n.has(be.keyField().canonicalString())||e.Ie.push(new hr(be.keyField(),r))}return e.Ie}function Fe(t){const e=F(t);return e.Ee||(e.Ee=uv(e,Zn(t))),e.Ee}function uv(t,e){if(t.limitType==="F")return vu(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map((i=>{const o=i.dir==="desc"?"asc":"desc";return new hr(i.field,o)}));const n=t.endAt?new Ti(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Ti(t.startAt.position,t.startAt.inclusive):null;return vu(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function mo(t,e){const n=t.filters.concat([e]);return new yn(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function wi(t,e,n){return new yn(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function zi(t,e){return Go(Fe(t),Fe(e))&&t.limitType===e.limitType}function rd(t){return`${Ho(Fe(t))}|lt:${t.limitType}`}function Yt(t){return`Query(target=${(function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map((i=>ed(i))).join(", ")}]`),Bi(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map((i=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(i))).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map((i=>dn(i))).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map((i=>dn(i))).join(",")),`Target(${r})`})(Fe(t))}; limitType=${t.limitType})`}function Hi(t,e){return e.isFoundDocument()&&(function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):L.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(t,e)&&(function(r,i){for(const o of Zn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0})(t,e)&&(function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0})(t,e)&&(function(r,i){return!(r.startAt&&!(function(a,u,h){const d=_u(a,u,h);return a.inclusive?d<=0:d<0})(r.startAt,Zn(r),i)||r.endAt&&!(function(a,u,h){const d=_u(a,u,h);return a.inclusive?d>=0:d>0})(r.endAt,Zn(r),i))})(t,e)}function lv(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function id(t){return(e,n)=>{let r=!1;for(const i of Zn(t)){const o=hv(i,e,n);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function hv(t,e,n){const r=t.field.isKeyField()?L.comparator(e.key,n.key):(function(o,a,u){const h=a.data.field(o),d=u.data.field(o);return h!==null&&d!==null?hn(h,d):x(42886)})(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return x(19790,{direction:t.dir})}}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var xt=class{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[r,i]of n)if(this.equalsFn(r,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(r===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],t))return void(r[i]=[t,e]);r.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return n.length===1?delete this.inner[e]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(t){Et(this.inner,((e,n)=>{for(const[r,i]of n)t(r,i)}))}isEmpty(){return xh(this.inner)}size(){return this.innerSize}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var dv=new re(L.comparator);function Ze(){return dv}var sd=new re(L.comparator);function Hn(...t){let e=sd;for(const n of t)e=e.insert(n.key,n);return e}function od(t){let e=sd;return t.forEach(((n,r)=>e=e.insert(n,r.overlayedDocument))),e}function Vt(){return er()}function ad(){return er()}function er(){return new xt((t=>t.toString()),((t,e)=>t.isEqual(e)))}var fv=new re(L.comparator),pv=new me(L.comparator);function H(...t){let e=pv;for(const n of t)e=e.add(n);return e}var mv=new me(z);function gv(){return mv}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Wo(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:cr(e)?"-0":e}}function cd(t){return{integerValue:""+t}}function _v(t,e){return xy(e)?cd(e):Wo(t,e)}/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Gi=class{constructor(){this._=void 0}};function yv(t,e,n){return t instanceof dr?(function(i,o){const a={fields:{[Bh]:{stringValue:Uh},[jh]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Bo(o)&&(o=qi(o)),o&&(a.fields[qh]=o),{mapValue:a}})(n,e):t instanceof fr?ld(t,e):t instanceof pr?hd(t,e):(function(i,o){const a=ud(i,o),u=Iu(a)+Iu(i.Ae);return lo(a)&&lo(i.Ae)?cd(u):Wo(i.serializer,u)})(t,e)}function vv(t,e,n){return t instanceof fr?ld(t,e):t instanceof pr?hd(t,e):n}function ud(t,e){return t instanceof Ai?(function(r){return lo(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(e)?e:{integerValue:0}:null}var dr=class extends Gi{},fr=class extends Gi{constructor(t){super(),this.elements=t}};function ld(t,e){const n=dd(e);for(const r of t.elements)n.some((i=>Be(i,r)))||n.push(r);return{arrayValue:{values:n}}}var pr=class extends Gi{constructor(t){super(),this.elements=t}};function hd(t,e){let n=dd(e);for(const r of t.elements)n=n.filter((i=>!Be(i,r)));return{arrayValue:{values:n}}}var Ai=class extends Gi{constructor(t,e){super(),this.serializer=t,this.Ae=e}};function Iu(t){return J(t.integerValue||t.doubleValue)}function dd(t){return zo(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ev=class{constructor(t,e){this.field=t,this.transform=e}};function Iv(t,e){return t.field.isEqual(e.field)&&(function(r,i){return r instanceof fr&&i instanceof fr||r instanceof pr&&i instanceof pr?un(r.elements,i.elements,Be):r instanceof Ai&&i instanceof Ai?Be(r.Ae,i.Ae):r instanceof dr&&i instanceof dr})(t.transform,e.transform)}var Tv=class{constructor(t,e){this.version=t,this.transformResults=e}},kt=class oi{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new oi}static exists(e){return new oi(void 0,e)}static updateTime(e){return new oi(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function ai(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}var Wi=class{};function fd(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new md(t.key,kt.none()):new Ir(t.key,t.data,kt.none());{const n=t.data,r=Ce.empty();let i=new me(be.comparator);for(let o of e.fields)if(!i.has(o)){let a=n.field(o);a===null&&o.length>1&&(o=o.popLast(),a=n.field(o)),a===null?r.delete(o):r.set(o,a),i=i.add(o)}return new It(t.key,r,new Me(i.toArray()),kt.none())}}function wv(t,e,n){t instanceof Ir?(function(i,o,a){const u=i.value.clone(),h=wu(i.fieldTransforms,o,a.transformResults);u.setAll(h),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(t,e,n):t instanceof It?(function(i,o,a){if(!ai(i.precondition,o))return void o.convertToUnknownDocument(a.version);const u=wu(i.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(pd(i)),h.setAll(u),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()})(t,e,n):(function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,n)}function tr(t,e,n,r){return t instanceof Ir?(function(o,a,u,h){if(!ai(o.precondition,a))return u;const d=o.value.clone(),p=Au(o.fieldTransforms,h,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(t,e,n,r):t instanceof It?(function(o,a,u,h){if(!ai(o.precondition,a))return u;const d=Au(o.fieldTransforms,h,a),p=a.data;return p.setAll(pd(o)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((y=>y.field)))})(t,e,n,r):(function(o,a,u){return ai(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(t,e,n)}function Av(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),o=ud(r.transform,i||null);o!=null&&(n===null&&(n=Ce.empty()),n.set(r.field,o))}return n||null}function Tu(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&un(r,i,((o,a)=>Iv(o,a)))})(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}var Ir=class extends Wi{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}},It=class extends Wi{constructor(t,e,n,r,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}};function pd(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function wu(t,e,n){const r=new Map;K(t.length===n.length,32656,{Re:n.length,Ve:t.length});for(let i=0;i<n.length;i++){const o=t[i],a=o.transform,u=e.data.field(o.field);r.set(o.field,vv(a,u,n[i]))}return r}function Au(t,e,n){const r=new Map;for(const i of t){const o=i.transform,a=n.data.field(i.field);r.set(i.field,yv(o,a,e))}return r}var md=class extends Wi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},Rv=class extends Wi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Pv=class{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(t.key)&&wv(i,t,n[r])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=tr(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=tr(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=ad();return this.mutations.forEach((r=>{const i=t.get(r.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=e.has(r.key)?null:a;const u=fd(o,a);u!==null&&n.set(r.key,u),o.isValidDocument()||o.convertToNoDocument(U.min())})),n}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),H())}isEqual(t){return this.batchId===t.batchId&&un(this.mutations,t.mutations,((e,n)=>Tu(e,n)))&&un(this.baseMutations,t.baseMutations,((e,n)=>Tu(e,n)))}},Sv=class gd{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){K(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=(function(){return fv})();const o=e.mutations;for(let a=0;a<o.length;a++)i=i.insert(o[a].key,r[a].version);return new gd(e,n,r,i)}};/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Cv=class{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var bv=class{constructor(t,e){this.count=t,this.unchangedNames=e}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ee,G;function Vv(t){switch(t){case P.OK:return x(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return x(15467,{code:t})}}function _d(t){if(t===void 0)return Qe("GRPC error has no .code"),P.UNKNOWN;switch(t){case ee.OK:return P.OK;case ee.CANCELLED:return P.CANCELLED;case ee.UNKNOWN:return P.UNKNOWN;case ee.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ee.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ee.INTERNAL:return P.INTERNAL;case ee.UNAVAILABLE:return P.UNAVAILABLE;case ee.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ee.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ee.NOT_FOUND:return P.NOT_FOUND;case ee.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ee.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ee.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ee.ABORTED:return P.ABORTED;case ee.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ee.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ee.DATA_LOSS:return P.DATA_LOSS;default:return x(39323,{code:t})}}(G=ee||(ee={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var kv=null;/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Dv(){return new TextEncoder}/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Nv=new ft([4294967295,4294967295],0);function Ru(t){const e=Dv().encode(t),n=new dh;return n.update(e),new Uint8Array(n.digest())}function Pu(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),o=e.getUint32(12,!0);return[new ft([n,r],0),new ft([i,o],0)]}var Ov=class yd{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Gn(`Invalid padding: ${n}`);if(r<0)throw new Gn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Gn(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Gn(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=ft.fromNumber(this.ge)}ye(e,n,r){let i=e.add(n.multiply(ft.fromNumber(r)));return i.compare(Nv)===1&&(i=new ft([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=Ru(e),[r,i]=Pu(n);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,i,o);if(!this.we(a))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,o=new Uint8Array(Math.ceil(e/8)),a=new yd(o,i,n);return r.forEach((u=>a.insert(u))),a}insert(e){if(this.ge===0)return;const n=Ru(e),[r,i]=Pu(n);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,i,o);this.Se(a)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}},Gn=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var vd=class Ed{constructor(e,n,r,i,o){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,Ko.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Ed(U.min(),i,new re(z),Ze(),H())}},Ko=class Id{constructor(e,n,r,i,o){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Id(r,n,H(),H(),H())}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ci=class{constructor(t,e,n,r){this.be=t,this.removedTargetIds=e,this.key=n,this.De=r}},Td=class{constructor(t,e){this.targetId=t,this.Ce=e}},wd=class{constructor(t,e,n=Te.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}},Su=class{constructor(){this.ve=0,this.Fe=Cu(),this.Me=Te.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=H(),e=H(),n=H();return this.Fe.forEach(((r,i)=>{switch(i){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:x(38017,{changeType:i})}})),new Ko(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=Cu()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,K(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}},Mv=class{constructor(t){this.Ge=t,this.ze=new Map,this.je=Ze(),this.Je=Gr(),this.He=Gr(),this.Ye=new re(z)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.rt(e)&&n.Le(t.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(n.We(),n.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),n.Le(t.resumeToken));break;default:x(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((n,r)=>{this.rt(r)&&e(r)}))}st(t){const e=t.targetId,n=t.Ce.count,r=this.ot(e);if(r){const i=r.target;if(po(i))if(n===0){const o=new L(i.path);this.et(e,o,Je.newNoDocument(o,U.min()))}else K(n===1,20013,{expectedCount:n});else{const o=this._t(e);if(o!==n){const a=this.ut(t),u=a?this.ct(a,t,o):1;if(u!==0){this.it(e);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,h)}kv?.lt((function(d,p,y,R,C){const N={localCacheCount:d,existenceFilterCount:p.count,databaseId:y.database,projectId:y.projectId},k=p.unchangedNames;return k&&(N.bloomFilter={applied:C===0,hashCount:k?.hashCount??0,bitmapLength:k?.bits?.bitmap?.length??0,padding:k?.bits?.padding??0,mightContain:O=>R?.mightContain(O)??!1}),N})(o,t.Ce,this.Ge.ht(),a,u))}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:i=0}=e;let o,a;try{o=Xe(n).toUint8Array()}catch(u){if(u instanceof Fh)return cn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{a=new Ov(o,r,i)}catch(u){return cn(u instanceof Gn?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return a.ge===0?null:a}ct(t,e,n){return e.Ce.count===n-this.Pt(t,e.targetId)?0:2}Pt(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let r=0;return n.forEach((i=>{const o=this.Ge.ht(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.mightContain(a)||(this.et(e,i,null),r++)})),r}Tt(t){const e=new Map;this.ze.forEach(((i,o)=>{const a=this.ot(o);if(a){if(i.current&&po(a.target)){const u=new L(a.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,Je.newNoDocument(u,t))}i.Be&&(e.set(o,i.ke()),i.qe())}}));let n=H();this.He.forEach(((i,o)=>{let a=!0;o.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)})),a&&(n=n.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(t)));const r=new vd(t,e,this.Ye,this.je,n);return this.je=Ze(),this.Je=Gr(),this.He=Gr(),this.Ye=new re(z),r}Xe(t,e){if(!this.rt(t))return;const n=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,n),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,n){if(!this.rt(t))return;const r=this.nt(t);this.Et(t,e)?r.Qe(e,1):r.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),n&&(this.je=this.je.insert(e,n))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new Su,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new me(z),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new me(z),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||D("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Su),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}};function Gr(){return new re(L.comparator)}function Cu(){return new re(L.comparator)}var Lv={asc:"ASCENDING",desc:"DESCENDING"},xv={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Fv={and:"AND",or:"OR"},Uv=class{constructor(t,e){this.databaseId=t,this.useProto3Json=e}};function go(t,e){return t.useProto3Json||Bi(e)?e:{value:e}}function Ri(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ad(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Bv(t,e){return Ri(t,e.toTimestamp())}function Ue(t){return K(!!t,49232),U.fromTimestamp((function(n){const r=Ye(n);return new ue(r.seconds,r.nanos)})(t))}function Qo(t,e){return _o(t,e).canonicalString()}function _o(t,e){const n=(function(i){return new Z(["projects",i.projectId,"databases",i.database])})(t).child("documents");return e===void 0?n:n.child(e)}function Rd(t){const e=Z.fromString(t);return K(Vd(e),10190,{key:e.toString()}),e}function yo(t,e){return Qo(t.databaseId,e.path)}function Fs(t,e){const n=Rd(e);if(n.get(1)!==t.databaseId.projectId)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new L(Sd(n))}function Pd(t,e){return Qo(t.databaseId,e)}function qv(t){const e=Rd(t);return e.length===4?Z.emptyPath():Sd(e)}function vo(t){return new Z(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Sd(t){return K(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function bu(t,e,n){return{name:yo(t,e),fields:n.value.mapValue.fields}}function jv(t,e){let n;if("targetChange"in e){e.targetChange;const r=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:x(39313,{state:d})})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],o=(function(d,p){return d.useProto3Json?(K(p===void 0||typeof p=="string",58123),Te.fromBase64String(p||"")):(K(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),Te.fromUint8Array(p||new Uint8Array))})(t,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&(function(d){const p=d.code===void 0?P.UNKNOWN:_d(d.code);return new V(p,d.message||"")})(a);n=new wd(r,i,o,u||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Fs(t,r.document.name),o=Ue(r.document.updateTime),a=r.document.createTime?Ue(r.document.createTime):U.min(),u=new Ce({mapValue:{fields:r.document.fields}}),h=Je.newFoundDocument(i,o,a,u),d=r.targetIds||[],p=r.removedTargetIds||[];n=new ci(d,p,h.key,h)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Fs(t,r.document),o=r.readTime?Ue(r.readTime):U.min(),a=Je.newNoDocument(i,o),u=r.removedTargetIds||[];n=new ci([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Fs(t,r.document),o=r.removedTargetIds||[];n=new ci([],o,i,null)}else{if(!("filter"in e))return x(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:o}=r,a=new bv(i,o),u=r.targetId;n=new Td(u,a)}}return n}function zv(t,e){let n;if(e instanceof Ir)n={update:bu(t,e.key,e.value)};else if(e instanceof md)n={delete:yo(t,e.key)};else if(e instanceof It)n={update:bu(t,e.key,e.data),updateMask:$v(e.fieldMask)};else{if(!(e instanceof Rv))return x(16599,{Vt:e.type});n={verify:yo(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((r=>(function(o,a){const u=a.transform;if(u instanceof dr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof fr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof pr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Ai)return{fieldPath:a.field.canonicalString(),increment:u.Ae};throw x(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(n.currentDocument=(function(i,o){return o.updateTime!==void 0?{updateTime:Bv(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:x(27497)})(t,e.precondition)),n}function Hv(t,e){return t&&t.length>0?(K(e!==void 0,14353),t.map((n=>(function(i,o){let a=i.updateTime?Ue(i.updateTime):Ue(o);return a.isEqual(U.min())&&(a=Ue(o)),new Tv(a,i.transformResults||[])})(n,e)))):[]}function Gv(t,e){return{documents:[Pd(t,e.path)]}}function Wv(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Pd(t,i);const o=(function(d){if(d.length!==0)return bd($e.create(d,"and"))})(e.filters);o&&(n.structuredQuery.where=o);const a=(function(d){if(d.length!==0)return d.map((p=>(function(R){return{field:Xt(R.field),direction:Yv(R.dir)}})(p)))})(e.orderBy);a&&(n.structuredQuery.orderBy=a);const u=go(t,e.limit);return u!==null&&(n.structuredQuery.limit=u),e.startAt&&(n.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(e.startAt)),e.endAt&&(n.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(e.endAt)),{ft:n,parent:i}}function Kv(t){let e=qv(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){K(r===1,65062);const p=n.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let o=[];n.where&&(o=(function(y){const R=Cd(y);return R instanceof $e&&$h(R)?R.getFilters():[R]})(n.where));let a=[];n.orderBy&&(a=(function(y){return y.map((R=>(function(N){return new hr(Jt(N.field),(function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(N.direction))})(R)))})(n.orderBy));let u=null;n.limit&&(u=(function(y){let R;return R=typeof y=="object"?y.value:y,Bi(R)?null:R})(n.limit));let h=null;n.startAt&&(h=(function(y){const R=!!y.before,C=y.values||[];return new Ti(C,R)})(n.startAt));let d=null;return n.endAt&&(d=(function(y){const R=!y.before,C=y.values||[];return new Ti(C,R)})(n.endAt)),cv(e,i,a,o,u,"F",h,d)}function Qv(t,e){const n=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x(28987,{purpose:i})}})(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Cd(t){return t.unaryFilter!==void 0?(function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Jt(n.unaryFilter.field);return ce.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Jt(n.unaryFilter.field);return ce.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Jt(n.unaryFilter.field);return ce.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Jt(n.unaryFilter.field);return ce.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return x(61313);default:return x(60726)}})(t):t.fieldFilter!==void 0?(function(n){return ce.create(Jt(n.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return x(58110);default:return x(50506)}})(n.fieldFilter.op),n.fieldFilter.value)})(t):t.compositeFilter!==void 0?(function(n){return $e.create(n.compositeFilter.filters.map((r=>Cd(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return x(1026)}})(n.compositeFilter.op))})(t):x(30097,{filter:t})}function Yv(t){return Lv[t]}function Xv(t){return xv[t]}function Jv(t){return Fv[t]}function Xt(t){return{fieldPath:t.canonicalString()}}function Jt(t){return be.fromServerFormat(t.fieldPath)}function bd(t){return t instanceof ce?(function(n){if(n.op==="=="){if(gu(n.value))return{unaryFilter:{field:Xt(n.field),op:"IS_NAN"}};if(mu(n.value))return{unaryFilter:{field:Xt(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(gu(n.value))return{unaryFilter:{field:Xt(n.field),op:"IS_NOT_NAN"}};if(mu(n.value))return{unaryFilter:{field:Xt(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Xt(n.field),op:Xv(n.op),value:n.value}}})(t):t instanceof $e?(function(n){const r=n.getFilters().map((i=>bd(i)));return r.length===1?r[0]:{compositeFilter:{op:Jv(n.op),filters:r}}})(t):x(54877,{filter:t})}function $v(t){const e=[];return t.fields.forEach((n=>e.push(n.canonicalString()))),{fieldPaths:e}}function Vd(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Yo=class Wn{constructor(e,n,r,i,o=U.min(),a=U.min(),u=Te.EMPTY_BYTE_STRING,h=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=h}withSequenceNumber(e){return new Wn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Wn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Wn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Wn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Zv=class{constructor(t){this.yt=t}};function eE(t){const e=Kv({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?wi(e,e.limit,"L"):e}/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Vu=class{constructor(){}Dt(t,e){this.Ct(t,e),e.vt()}Ct(t,e){if("nullValue"in t)this.Ft(e,5);else if("booleanValue"in t)this.Ft(e,10),e.Mt(t.booleanValue?1:0);else if("integerValue"in t)this.Ft(e,15),e.Mt(J(t.integerValue));else if("doubleValue"in t){const n=J(t.doubleValue);isNaN(n)?this.Ft(e,13):(this.Ft(e,15),cr(n)?e.Mt(0):e.Mt(n))}else if("timestampValue"in t){let n=t.timestampValue;this.Ft(e,20),typeof n=="string"&&(n=Ye(n)),e.xt(`${n.seconds||""}`),e.Mt(n.nanos||0)}else if("stringValue"in t)this.Ot(t.stringValue,e),this.Nt(e);else if("bytesValue"in t)this.Ft(e,30),e.Bt(Xe(t.bytesValue)),this.Nt(e);else if("referenceValue"in t)this.Lt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.Ft(e,45),e.Mt(n.latitude||0),e.Mt(n.longitude||0)}else"mapValue"in t?Wh(t)?this.Ft(e,Number.MAX_SAFE_INTEGER):Gh(t)?this.kt(t.mapValue,e):(this.qt(t.mapValue,e),this.Nt(e)):"arrayValue"in t?(this.Qt(t.arrayValue,e),this.Nt(e)):x(19022,{$t:t})}Ot(t,e){this.Ft(e,25),this.Ut(t,e)}Ut(t,e){e.xt(t)}qt(t,e){const n=t.fields||{};this.Ft(e,55);for(const r of Object.keys(n))this.Ot(r,e),this.Ct(n[r],e)}kt(t,e){const n=t.fields||{};this.Ft(e,53);const r=ln,i=n[r].arrayValue?.values?.length||0;this.Ft(e,15),e.Mt(J(i)),this.Ot(r,e),this.Ct(n[r],e)}Qt(t,e){const n=t.values||[];this.Ft(e,50);for(const r of n)this.Ct(r,e)}Lt(t,e){this.Ft(e,37),L.fromName(t).path.forEach((n=>{this.Ft(e,60),this.Ut(n,e)}))}Ft(t,e){t.Mt(e)}Nt(t){t.Mt(2)}};Vu.Kt=new Vu;/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var tE=class{constructor(){this.Cn=new nE}addToCollectionParentIndex(t,e){return this.Cn.add(e),S.resolve()}getCollectionParents(t,e){return S.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return S.resolve()}deleteFieldIndex(t,e){return S.resolve()}deleteAllFieldIndexes(t){return S.resolve()}createTargetIndexes(t,e){return S.resolve()}getDocumentsMatchingTarget(t,e){return S.resolve(null)}getIndexType(t,e){return S.resolve(0)}getFieldIndexes(t,e){return S.resolve([])}getNextCollectionGroupToUpdate(t){return S.resolve(null)}getMinOffset(t,e){return S.resolve(ar.min())}getMinOffsetFromCollectionGroup(t,e){return S.resolve(ar.min())}updateCollectionGroup(t,e,n){return S.resolve()}updateIndexEntries(t,e){return S.resolve()}},nE=class{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new me(Z.comparator),i=!r.has(n);return this.index[e]=r.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new me(Z.comparator)).toArray()}};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var sT=new Uint8Array(0);/**
* @license
* Copyright 2018 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ku={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},kd=41943040,Ne=class ui{static withCacheSize(e){return new ui(e,ui.DEFAULT_COLLECTION_PERCENTILE,ui.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/Ne.DEFAULT_COLLECTION_PERCENTILE=10,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ne.DEFAULT=new Ne(kd,Ne.DEFAULT_COLLECTION_PERCENTILE,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ne.DISABLED=new Ne(-1,0,0);/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Eo=class Io{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Io(0)}static cr(){return new Io(-1)}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Du="LruGarbageCollector",rE=1048576;function Nu([t,e],[n,r]){const i=z(t,n);return i===0?z(e,r):i}var iE=class{constructor(t){this.Ir=t,this.buffer=new me(Nu),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Nu(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}},sE=class{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){D(Du,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){_n(e)?D(Du,"Ignoring IndexedDB error during garbage collection: ",e):await gn(e)}await this.Vr(3e5)}))}},oE=class{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next((n=>Math.floor(e/100*n)))}nthSequenceNumber(t,e){if(e===0)return S.resolve(Ui.ce);const n=new iE(e);return this.mr.forEachTarget(t,(r=>n.Ar(r.sequenceNumber))).next((()=>this.mr.pr(t,(r=>n.Ar(r))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.mr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(ku)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ku):this.yr(t,e)))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let n,r,i,o,a,u,h;const d=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),r=this.params.maximumSequenceNumbersToCollect):r=p,o=Date.now(),this.nthSequenceNumber(t,r)))).next((p=>(n=p,a=Date.now(),this.removeTargets(t,n,e)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(t,n)))).next((p=>(h=Date.now(),Kt()<=j.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${r} in `+(a-o)+`ms
	Removed ${i} targets in `+(u-a)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-d}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:p}))))}};function aE(t,e){return new oE(t,e)}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var cE=class{constructor(){this.changes=new xt((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Je.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?S.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*//**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var uE=class{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var lE=class{constructor(t,e,n,r){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=r}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next((r=>(n=r,this.remoteDocumentCache.getEntry(t,e)))).next((r=>(n!==null&&tr(n.mutation,r,Me.empty(),ue.now()),r)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.getLocalViewOfDocuments(t,n,H()).next((()=>n))))}getLocalViewOfDocuments(t,e,n=H()){const r=Vt();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,n).next((i=>{let o=Hn();return i.forEach(((a,u)=>{o=o.insert(a,u.overlayedDocument)})),o}))))}getOverlayedDocuments(t,e){const n=Vt();return this.populateOverlays(t,n,e).next((()=>this.computeViews(t,e,n,H())))}populateOverlays(t,e,n){const r=[];return n.forEach((i=>{e.has(i)||r.push(i)})),this.documentOverlayCache.getOverlays(t,r).next((i=>{i.forEach(((o,a)=>{e.set(o,a)}))}))}computeViews(t,e,n,r){let i=Ze();const o=er(),a=(function(){return er()})();return e.forEach(((u,h)=>{const d=n.get(h.key);r.has(h.key)&&(d===void 0||d.mutation instanceof It)?i=i.insert(h.key,h):d!==void 0?(o.set(h.key,d.mutation.getFieldMask()),tr(d.mutation,h,d.mutation.getFieldMask(),ue.now())):o.set(h.key,Me.empty())})),this.recalculateAndSaveOverlays(t,i).next((u=>(u.forEach(((h,d)=>o.set(h,d))),e.forEach(((h,d)=>a.set(h,new uE(d,o.get(h)??null)))),a)))}recalculateAndSaveOverlays(t,e){const n=er();let r=new re(((o,a)=>o-a)),i=H();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((o=>{for(const a of o)a.keys().forEach((u=>{const h=e.get(u);if(h===null)return;let d=n.get(u)||Me.empty();d=a.applyToLocalView(h,d),n.set(u,d);const p=(r.get(a.batchId)||H()).add(u);r=r.insert(a.batchId,p)}))})).next((()=>{const o=[],a=r.getReverseIterator();for(;a.hasNext();){const u=a.getNext(),h=u.key,d=u.value,p=ad();d.forEach((y=>{if(!i.has(y)){const R=fd(e.get(y),n.get(y));R!==null&&p.set(y,R),i=i.add(y)}})),o.push(this.documentOverlayCache.saveOverlays(t,h,p))}return S.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((n=>this.recalculateAndSaveOverlays(t,n)))}getDocumentsMatchingQuery(t,e,n,r){return(function(o){return L.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):nd(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,r):this.getDocumentsMatchingCollectionQuery(t,e,n,r)}getNextDocuments(t,e,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,r).next((i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,r-i.size):S.resolve(Vt());let a=or,u=i;return o.next((h=>S.forEach(h,((d,p)=>(a<p.largestBatchId&&(a=p.largestBatchId),i.get(d)?S.resolve():this.remoteDocumentCache.getEntry(t,d).next((y=>{u=u.insert(d,y)}))))).next((()=>this.populateOverlays(t,h,i))).next((()=>this.computeViews(t,u,h,H()))).next((d=>({batchId:a,changes:od(d)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new L(e)).next((n=>{let r=Hn();return n.isFoundDocument()&&(r=r.insert(n.key,n)),r}))}getDocumentsMatchingCollectionGroupQuery(t,e,n,r){const i=e.collectionGroup;let o=Hn();return this.indexManager.getCollectionParents(t,i).next((a=>S.forEach(a,(u=>{const h=(function(p,y){return new yn(y,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(e,u.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,n,r).next((d=>{d.forEach(((p,y)=>{o=o.insert(p,y)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(t,e,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,r)))).next((o=>{i.forEach(((u,h)=>{const d=h.getKey();o.get(d)===null&&(o=o.insert(d,Je.newInvalidDocument(d)))}));let a=Hn();return o.forEach(((u,h)=>{const d=i.get(u);d!==void 0&&tr(d.mutation,h,Me.empty(),ue.now()),Hi(e,h)&&(a=a.insert(u,h))})),a}))}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var hE=class{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return S.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,(function(r){return{id:r.id,version:r.version,createTime:Ue(r.createTime)}})(e)),S.resolve()}getNamedQuery(t,e){return S.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,(function(r){return{name:r.name,query:eE(r.bundledQuery),readTime:Ue(r.readTime)}})(e)),S.resolve()}};/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var dE=class{constructor(){this.overlays=new re(L.comparator),this.qr=new Map}getOverlay(t,e){return S.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Vt();return S.forEach(e,(r=>this.getOverlay(t,r).next((i=>{i!==null&&n.set(r,i)})))).next((()=>n))}saveOverlays(t,e,n){return n.forEach(((r,i)=>{this.St(t,e,i)})),S.resolve()}removeOverlaysForBatchId(t,e,n){const r=this.qr.get(n);return r!==void 0&&(r.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(n)),S.resolve()}getOverlaysForCollection(t,e,n){const r=Vt(),i=e.length+1,o=new L(e.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const u=a.getNext().value,h=u.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>n&&r.set(u.getKey(),u)}return S.resolve(r)}getOverlaysForCollectionGroup(t,e,n,r){let i=new re(((h,d)=>h-d));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>n){let d=i.get(h.largestBatchId);d===null&&(d=Vt(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const a=Vt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,d)=>a.set(h,d))),!(a.size()>=r)););return S.resolve(a)}St(t,e,n){const r=this.overlays.get(n.key);if(r!==null){const o=this.qr.get(r.largestBatchId).delete(n.key);this.qr.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new Cv(e,n));let i=this.qr.get(e);i===void 0&&(i=H(),this.qr.set(e,i)),this.qr.set(e,i.add(n.key))}};/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var fE=class{constructor(){this.sessionToken=Te.EMPTY_BYTE_STRING}getSessionToken(t){return S.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,S.resolve()}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Xo=class{constructor(){this.Qr=new me(ae.$r),this.Ur=new me(ae.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const n=new ae(t,e);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(t,e){t.forEach((n=>this.addReference(n,e)))}removeReference(t,e){this.Gr(new ae(t,e))}zr(t,e){t.forEach((n=>this.removeReference(n,e)))}jr(t){const e=new L(new Z([])),n=new ae(e,t),r=new ae(e,t+1),i=[];return this.Ur.forEachInRange([n,r],(o=>{this.Gr(o),i.push(o.key)})),i}Jr(){this.Qr.forEach((t=>this.Gr(t)))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new L(new Z([])),n=new ae(e,t),r=new ae(e,t+1);let i=H();return this.Ur.forEachInRange([n,r],(o=>{i=i.add(o.key)})),i}containsKey(t){const e=new ae(t,0),n=this.Qr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}},ae=class{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return L.comparator(t.key,e.key)||z(t.Yr,e.Yr)}static Kr(t,e){return z(t.Yr,e.Yr)||L.comparator(t.key,e.key)}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var pE=class{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new me(ae.$r)}checkEmpty(t){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,r){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Pv(i,e,n,r);this.mutationQueue.push(o);for(const a of r)this.Zr=this.Zr.add(new ae(a.key,i)),this.indexManager.addToCollectionParentIndex(t,a.key.path.popLast());return S.resolve(o)}lookupMutationBatch(t,e){return S.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.ei(n),i=r<0?0:r;return S.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?Uo:this.tr-1)}getAllMutationBatches(t){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new ae(e,0),r=new ae(e,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([n,r],(o=>{const a=this.Xr(o.Yr);i.push(a)})),S.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new me(z);return e.forEach((r=>{const i=new ae(r,0),o=new ae(r,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],(a=>{n=n.add(a.Yr)}))})),S.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let i=n;L.isDocumentKey(i)||(i=i.child(""));const o=new ae(new L(i),0);let a=new me(z);return this.Zr.forEachWhile((u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===r&&(a=a.add(u.Yr)),!0)}),o),S.resolve(this.ti(a))}ti(t){const e=[];return t.forEach((n=>{const r=this.Xr(n);r!==null&&e.push(r)})),e}removeMutationBatch(t,e){K(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Zr;return S.forEach(e.mutations,(r=>{const i=new ae(r.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)})).next((()=>{this.Zr=n}))}ir(t){}containsKey(t,e){const n=new ae(e,0),r=this.Zr.firstAfterOrEqual(n);return S.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this.mutationQueue.length,S.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var mE=class{constructor(t){this.ri=t,this.docs=(function(){return new re(L.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,r=this.docs.get(n),i=r?r.size:0,o=this.ri(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return S.resolve(n?n.document.mutableCopy():Je.newInvalidDocument(e))}getEntries(t,e){let n=Ze();return e.forEach((r=>{const i=this.docs.get(r);n=n.insert(r,i?i.document.mutableCopy():Je.newInvalidDocument(r))})),S.resolve(n)}getDocumentsMatchingQuery(t,e,n,r){let i=Ze();const o=e.path,a=new L(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(a);for(;u.hasNext();){const{key:h,value:{document:d}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Ny(Dy(d),n)<=0||(r.has(d.key)||Hi(e,d))&&(i=i.insert(d.key,d.mutableCopy()))}return S.resolve(i)}getAllFromCollectionGroup(t,e,n,r){x(9500)}ii(t,e){return S.forEach(this.docs,(n=>e(n)))}newChangeBuffer(t){return new gE(this)}getSize(t){return S.resolve(this.size)}},gE=class extends cE{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach(((n,r)=>{r.isValidDocument()?e.push(this.Nr.addEntry(t,r)):this.Nr.removeEntry(n)})),S.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _E=class{constructor(t){this.persistence=t,this.si=new xt((e=>Ho(e)),Go),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.oi=0,this._i=new Xo,this.targetCount=0,this.ai=Eo.ur()}forEachTarget(t,e){return this.si.forEach(((n,r)=>e(r))),S.resolve()}getLastRemoteSnapshotVersion(t){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return S.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.oi&&(this.oi=e),S.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new Eo(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,S.resolve()}updateTargetData(t,e){return this.Pr(e),S.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,S.resolve()}removeTargets(t,e,n){let r=0;const i=[];return this.si.forEach(((o,a)=>{a.sequenceNumber<=e&&n.get(a.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(t,a.targetId)),r++)})),S.waitFor(i).next((()=>r))}getTargetCount(t){return S.resolve(this.targetCount)}getTargetData(t,e){const n=this.si.get(e)||null;return S.resolve(n)}addMatchingKeys(t,e,n){return this._i.Wr(e,n),S.resolve()}removeMatchingKeys(t,e,n){this._i.zr(e,n);const r=this.persistence.referenceDelegate,i=[];return r&&e.forEach((o=>{i.push(r.markPotentiallyOrphaned(t,o))})),S.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),S.resolve()}getMatchingKeysForTargetId(t,e){const n=this._i.Hr(e);return S.resolve(n)}containsKey(t,e){return S.resolve(this._i.containsKey(e))}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Dd=class{constructor(t,e){this.ui={},this.overlays={},this.ci=new Ui(0),this.li=!1,this.li=!0,this.hi=new fE,this.referenceDelegate=t(this),this.Pi=new _E(this),this.indexManager=new tE,this.remoteDocumentCache=(function(r){return new mE(r)})((n=>this.referenceDelegate.Ti(n))),this.serializer=new Zv(e),this.Ii=new hE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new dE,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ui[t.toKey()];return n||(n=new pE(e,this.referenceDelegate),this.ui[t.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,n){D("MemoryPersistence","Starting transaction:",t);const r=new yE(this.ci.next());return this.referenceDelegate.Ei(),n(r).next((i=>this.referenceDelegate.di(r).next((()=>i)))).toPromise().then((i=>(r.raiseOnCommittedEvent(),i)))}Ai(t,e){return S.or(Object.values(this.ui).map((n=>()=>n.containsKey(t,e))))}},yE=class extends My{constructor(t){super(),this.currentSequenceNumber=t}},vE=class Nd{constructor(e){this.persistence=e,this.Ri=new Xo,this.Vi=null}static mi(e){return new Nd(e)}get fi(){if(this.Vi)return this.Vi;throw x(60996)}addReference(e,n,r){return this.Ri.addReference(r,n),this.fi.delete(r.toString()),S.resolve()}removeReference(e,n,r){return this.Ri.removeReference(r,n),this.fi.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,n){return this.fi.add(n.toString()),S.resolve()}removeTarget(e,n){this.Ri.jr(n.targetId).forEach((i=>this.fi.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next((i=>{i.forEach((o=>this.fi.add(o.toString())))})).next((()=>r.removeTargetData(e,n)))}Ei(){this.Vi=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.fi,(r=>{const i=L.fromPath(r);return this.gi(e,i).next((o=>{o||n.removeEntry(i,U.min())}))})).next((()=>(this.Vi=null,n.apply(e))))}updateLimboDocument(e,n){return this.gi(e,n).next((r=>{r?this.fi.delete(n.toString()):this.fi.add(n.toString())}))}Ti(e){return 0}gi(e,n){return S.or([()=>S.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ai(e,n)])}},Ou=class Od{constructor(e,n){this.persistence=e,this.pi=new xt((r=>Fy(r.path)),((r,i)=>r.isEqual(i))),this.garbageCollector=aE(this,n)}static mi(e,n){return new Od(e,n)}Ei(){}di(e){return S.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}gr(e){const n=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>n.next((i=>r+i))))}wr(e){let n=0;return this.pr(e,(r=>{n++})).next((()=>n))}pr(e,n){return S.forEach(this.pi,((r,i)=>this.br(e,r,i).next((o=>o?S.resolve():n(i)))))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.ii(e,(a=>this.br(e,a,n).next((u=>{u||(r++,o.removeEntry(a,U.min()))})))).next((()=>o.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,n){return this.pi.set(n,e.currentSequenceNumber),S.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),S.resolve()}removeReference(e,n,r){return this.pi.set(r,e.currentSequenceNumber),S.resolve()}updateLimboDocument(e,n){return this.pi.set(n,e.currentSequenceNumber),S.resolve()}Ti(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=ii(e.data.value)),n}br(e,n,r){return S.or([()=>this.persistence.Ai(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const i=this.pi.get(n);return S.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var EE=class Md{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.Es=r,this.ds=i}static As(e,n){let r=H(),i=H();for(const o of n.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Md(e,n.fromCache,r,i)}};/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var IE=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var TE=class{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return Sp()?8:Ly(ge())>0?6:4})()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,n,r){const i={result:null};return this.ys(t,e).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ws(t,e,r,n).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new IE;return this.Ss(t,e,o).next((a=>{if(i.result=a,this.Vs)return this.bs(t,e,o,a.size)}))})).next((()=>i.result))}bs(t,e,n,r){return n.documentReadCount<this.fs?(Kt()<=j.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Yt(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),S.resolve()):(Kt()<=j.DEBUG&&D("QueryEngine","Query:",Yt(e),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.gs*r?(Kt()<=j.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Yt(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Fe(e))):S.resolve())}ys(t,e){if(Eu(e))return S.resolve(null);let n=Fe(e);return this.indexManager.getIndexType(t,n).next((r=>r===0?null:(e.limit!==null&&r===1&&(e=wi(e,null,"F"),n=Fe(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next((i=>{const o=H(...i);return this.ps.getDocuments(t,o).next((a=>this.indexManager.getMinOffset(t,n).next((u=>{const h=this.Ds(e,a);return this.Cs(e,h,o,u.readTime)?this.ys(t,wi(e,null,"F")):this.vs(t,h,e,u)}))))})))))}ws(t,e,n,r){return Eu(e)||r.isEqual(U.min())?S.resolve(null):this.ps.getDocuments(t,n).next((i=>{const o=this.Ds(e,i);return this.Cs(e,o,n,r)?S.resolve(null):(Kt()<=j.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Yt(e)),this.vs(t,o,e,ky(r,or)).next((a=>a)))}))}Ds(t,e){let n=new me(id(t));return e.forEach(((r,i)=>{Hi(t,i)&&(n=n.add(i))})),n}Cs(t,e,n,r){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ss(t,e,n){return Kt()<=j.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Yt(e)),this.ps.getDocumentsMatchingQuery(t,e,ar.min(),n)}vs(t,e,n,r){return this.ps.getDocumentsMatchingQuery(t,n,r).next((i=>(e.forEach((o=>{i=i.insert(o.key,o)})),i)))}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Jo="LocalStore",wE=3e8,AE=class{constructor(t,e,n,r){this.persistence=t,this.Fs=e,this.serializer=r,this.Ms=new re(z),this.xs=new xt((i=>Ho(i)),Go),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(n)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new lE(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ms)))}};function RE(t,e,n,r){return new AE(t,e,n,r)}async function Ld(t,e){const n=F(t);return await n.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next((o=>(i=o,n.Bs(e),n.mutationQueue.getAllMutationBatches(r)))).next((o=>{const a=[],u=[];let h=H();for(const d of i){a.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}for(const d of o){u.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}return n.localDocuments.getDocuments(r,h).next((d=>({Ls:d,removedBatchIds:a,addedBatchIds:u})))}))}))}function PE(t,e){const n=F(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const i=e.batch.keys(),o=n.Ns.newChangeBuffer({trackRemovals:!0});return(function(u,h,d,p){const y=d.batch,R=y.keys();let C=S.resolve();return R.forEach((N=>{C=C.next((()=>p.getEntry(h,N))).next((k=>{const O=d.docVersions.get(N);K(O!==null,48541),k.version.compareTo(O)<0&&(y.applyToRemoteDocument(k,d),k.isValidDocument()&&(k.setReadTime(d.commitVersion),p.addEntry(k)))}))})),C.next((()=>u.mutationQueue.removeMutationBatch(h,y)))})(n,r,e,o).next((()=>o.apply(r))).next((()=>n.mutationQueue.performConsistencyCheck(r))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(u){let h=H();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(h=h.add(u.batch.mutations[d].key));return h})(e)))).next((()=>n.localDocuments.getDocuments(r,i)))}))}function xd(t){const e=F(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(n=>e.Pi.getLastRemoteSnapshotVersion(n)))}function SE(t,e){const n=F(t),r=e.snapshotVersion;let i=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(o=>{const a=n.Ns.newChangeBuffer({trackRemovals:!0});i=n.Ms;const u=[];e.targetChanges.forEach(((p,y)=>{const R=i.get(y);if(!R)return;u.push(n.Pi.removeMatchingKeys(o,p.removedDocuments,y).next((()=>n.Pi.addMatchingKeys(o,p.addedDocuments,y))));let C=R.withSequenceNumber(o.currentSequenceNumber);e.targetMismatches.get(y)!==null?C=C.withResumeToken(Te.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):p.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(p.resumeToken,r)),i=i.insert(y,C),(function(k,O,q){return k.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=wE?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0})(R,C,p)&&u.push(n.Pi.updateTargetData(o,C))}));let h=Ze(),d=H();if(e.documentUpdates.forEach((p=>{e.resolvedLimboDocuments.has(p)&&u.push(n.persistence.referenceDelegate.updateLimboDocument(o,p))})),u.push(CE(o,a,e.documentUpdates).next((p=>{h=p.ks,d=p.qs}))),!r.isEqual(U.min())){const p=n.Pi.getLastRemoteSnapshotVersion(o).next((y=>n.Pi.setTargetsMetadata(o,o.currentSequenceNumber,r)));u.push(p)}return S.waitFor(u).next((()=>a.apply(o))).next((()=>n.localDocuments.getLocalViewOfDocuments(o,h,d))).next((()=>h))})).then((o=>(n.Ms=i,o)))}function CE(t,e,n){let r=H(),i=H();return n.forEach((o=>r=r.add(o))),e.getEntries(t,r).next((o=>{let a=Ze();return n.forEach(((u,h)=>{const d=o.get(u);h.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(u)),h.isNoDocument()&&h.version.isEqual(U.min())?(e.removeEntry(u,h.readTime),a=a.insert(u,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(h),a=a.insert(u,h)):D(Jo,"Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",h.version)})),{ks:a,qs:i}}))}function bE(t,e){const n=F(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Uo),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function VE(t,e){const n=F(t);return n.persistence.runTransaction("Allocate target","readwrite",(r=>{let i;return n.Pi.getTargetData(r,e).next((o=>o?(i=o,S.resolve(i)):n.Pi.allocateTargetId(r).next((a=>(i=new Yo(e,a,"TargetPurposeListen",r.currentSequenceNumber),n.Pi.addTargetData(r,i).next((()=>i)))))))})).then((r=>{const i=n.Ms.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(r.targetId,r),n.xs.set(e,r.targetId)),r}))}async function To(t,e,n){const r=F(t),i=r.Ms.get(e),o=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",o,(a=>r.persistence.referenceDelegate.removeTarget(a,i)))}catch(a){if(!_n(a))throw a;D(Jo,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(i.target)}function Mu(t,e,n){const r=F(t);let i=U.min(),o=H();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(h,d,p){const y=F(h),R=y.xs.get(p);return R!==void 0?S.resolve(y.Ms.get(R)):y.Pi.getTargetData(d,p)})(r,a,Fe(e)).next((u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,u.targetId).next((h=>{o=h}))})).next((()=>r.Fs.getDocumentsMatchingQuery(a,e,n?i:U.min(),n?o:H()))).next((u=>(kE(r,lv(e),u),{documents:u,Qs:o})))))}function kE(t,e,n){let r=t.Os.get(e)||U.min();n.forEach(((i,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)})),t.Os.set(e,r)}var Lu=class{constructor(){this.activeTargetIds=gv()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}},DE=class{constructor(){this.Mo=new Lu,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,n){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new Lu,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var NE=class{Oo(t){}shutdown(){}};/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var xu="ConnectivityMonitor",Fu=class{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){D(xu,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){D(xu,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Wr=null;function wo(){return Wr===null?Wr=(function(){return 268435456+Math.round(2147483648*Math.random())})():Wr++,"0x"+Wr.toString(16)}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Us="RestConnection",OE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"},ME=class{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${n}/databases/${r}`,this.Wo=this.databaseId.database===Ii?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Go(t,e,n,r,i){const o=wo(),a=this.zo(t,e.toUriEncodedString());D(Us,`Sending RPC '${t}' ${o}:`,a,n);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,r,i);const{host:h}=new URL(a),d=fn(h);return this.Jo(t,a,u,n,d).then((p=>(D(Us,`Received RPC '${t}' ${o}: `,p),p)),(p=>{throw cn(Us,`RPC '${t}' ${o} failed with error: `,p,"url: ",a,"request:",n),p}))}Ho(t,e,n,r,i,o){return this.Go(t,e,n,r,i)}jo(t,e,n){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+mn})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((r,i)=>t[i]=r)),n&&n.headers.forEach(((r,i)=>t[i]=r))}zo(t,e){const n=OE[t];return`${this.Uo}/v1/${e}:${n}`}terminate(){}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var LE=class{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var fe="WebChannelConnection",xE=class extends ME{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,n,r,i){const o=wo();return new Promise(((a,u)=>{const h=new fh;h.setWithCredentials(!0),h.listenOnce(ph.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case ti.NO_ERROR:const p=h.getResponseJson();D(fe,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(p)),a(p);break;case ti.TIMEOUT:D(fe,`RPC '${t}' ${o} timed out`),u(new V(P.DEADLINE_EXCEEDED,"Request time out"));break;case ti.HTTP_ERROR:const y=h.getStatus();if(D(fe,`RPC '${t}' ${o} failed with status:`,y,"response text:",h.getResponseText()),y>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const C=R?.error;if(C&&C.status&&C.message){const N=(function(O){const q=O.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(q)>=0?q:P.UNKNOWN})(C.status);u(new V(N,C.message))}else u(new V(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new V(P.UNAVAILABLE,"Connection failed."));break;default:x(9055,{l_:t,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{D(fe,`RPC '${t}' ${o} completed.`)}}));const d=JSON.stringify(r);D(fe,`RPC '${t}' ${o} sending request:`,r),h.send(e,"POST",d,n,15)}))}T_(t,e,n){const r=wo(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=_h(),a=gh(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,e,n),u.encodeInitMessageHeaders=!0;const d=i.join("");D(fe,`Creating RPC '${t}' stream ${r}: ${d}`,u);const p=o.createWebChannel(d,u);this.I_(p);let y=!1,R=!1;const C=new LE({Yo:k=>{R?D(fe,`Not sending because RPC '${t}' stream ${r} is closed:`,k):(y||(D(fe,`Opening RPC '${t}' stream ${r} transport.`),p.open(),y=!0),D(fe,`RPC '${t}' stream ${r} sending:`,k),p.send(k))},Zo:()=>p.close()}),N=(k,O,q)=>{k.listen(O,(W=>{try{q(W)}catch(X){setTimeout((()=>{throw X}),0)}}))};return N(p,jn.EventType.OPEN,(()=>{R||(D(fe,`RPC '${t}' stream ${r} transport opened.`),C.o_())})),N(p,jn.EventType.CLOSE,(()=>{R||(R=!0,D(fe,`RPC '${t}' stream ${r} transport closed`),C.a_(),this.E_(p))})),N(p,jn.EventType.ERROR,(k=>{R||(R=!0,cn(fe,`RPC '${t}' stream ${r} transport errored. Name:`,k.name,"Message:",k.message),C.a_(new V(P.UNAVAILABLE,"The operation could not be completed")))})),N(p,jn.EventType.MESSAGE,(k=>{if(!R){const O=k.data[0];K(!!O,16349);const q=O,W=q?.error||q[0]?.error;if(W){D(fe,`RPC '${t}' stream ${r} received error:`,W);const X=W.status;let Pe=(function(E){const m=ee[E];if(m!==void 0)return _d(m)})(X),we=W.message;Pe===void 0&&(Pe=P.INTERNAL,we="Unknown error status: "+X+" with message "+W.message),R=!0,C.a_(new V(Pe,we)),p.close()}else D(fe,`RPC '${t}' stream ${r} received:`,O),C.u_(O)}})),N(a,mh.STAT_EVENT,(k=>{k.stat===to.PROXY?D(fe,`RPC '${t}' stream ${r} detected buffering proxy`):k.stat===to.NOPROXY&&D(fe,`RPC '${t}' stream ${r} detected no buffering proxy`)})),setTimeout((()=>{C.__()}),0),C}terminate(){this.c_.forEach((t=>t.close())),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter((e=>e===t))}};function Bs(){return typeof document<"u"?document:null}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ki(t){return new Uv(t,!0)}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Fd=class{constructor(t,e,n=1e3,r=1.5,i=6e4){this.Mi=t,this.timerId=e,this.d_=n,this.A_=r,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,e-n);r>0&&D("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,(()=>(this.f_=Date.now(),t()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Uu="PersistentStream",Ud=class{constructor(t,e,n,r,i,o,a,u){this.Mi=t,this.S_=n,this.b_=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Fd(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(Qe(e.toString()),Qe("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,r])=>{this.D_===e&&this.G_(n,r)}),(n=>{t((()=>{const r=new V(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(r)}))}))}G_(t,e){const n=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo((()=>{n((()=>this.listener.Xo()))})),this.stream.t_((()=>{n((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((r=>{n((()=>this.z_(r)))})),this.stream.onMessage((r=>{n((()=>++this.F_==1?this.J_(r):this.onNext(r)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return D(Uu,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget((()=>this.D_===t?e():(D(Uu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}},FE=class extends Ud{constructor(t,e,n,r,i,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,r,o),this.serializer=i}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=jv(this.serializer,t),n=(function(i){if(!("targetChange"in i))return U.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?U.min():o.readTime?Ue(o.readTime):U.min()})(t);return this.listener.H_(e,n)}Y_(t){const e={};e.database=vo(this.serializer),e.addTarget=(function(i,o){let a;const u=o.target;if(a=po(u)?{documents:Gv(i,u)}:{query:Wv(i,u).ft},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=Ad(i,o.resumeToken);const h=go(i,o.expectedCount);h!==null&&(a.expectedCount=h)}else if(o.snapshotVersion.compareTo(U.min())>0){a.readTime=Ri(i,o.snapshotVersion.toTimestamp());const h=go(i,o.expectedCount);h!==null&&(a.expectedCount=h)}return a})(this.serializer,t);const n=Qv(this.serializer,t);n&&(e.labels=n),this.q_(e)}Z_(t){const e={};e.database=vo(this.serializer),e.removeTarget=t,this.q_(e)}},UE=class extends Ud{constructor(t,e,n,r,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,r,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return K(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,K(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){K(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=Hv(t.writeResults,t.commitTime),n=Ue(t.commitTime);return this.listener.na(n,e)}ra(){const t={};t.database=vo(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((n=>zv(this.serializer,n)))};this.q_(e)}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var BE=class{},qE=class extends BE{constructor(t,e,n,r){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Go(t,_o(e,n),r,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new V(P.UNKNOWN,i.toString())}))}Ho(t,e,n,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Ho(t,_o(e,n),r,o,a,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(P.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}},jE=class{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Qe(e),this.aa=!1):D("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Mt="RemoteStore",zE=class{constructor(t,e,n,r,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((o=>{n.enqueueAndForget((async()=>{Ft(this)&&(D(Mt,"Restarting streams for network reachability change."),await(async function(u){const h=F(u);h.Ea.add(4),await Tr(h),h.Ra.set("Unknown"),h.Ea.delete(4),await Qi(h)})(this))}))})),this.Ra=new jE(n,r)}};async function Qi(t){if(Ft(t))for(const e of t.da)await e(!0)}async function Tr(t){for(const e of t.da)await e(!1)}function Bd(t,e){const n=F(t);n.Ia.has(e.targetId)||(n.Ia.set(e.targetId,e),ta(n)?ea(n):vn(n).O_()&&Zo(n,e))}function $o(t,e){const n=F(t),r=vn(n);n.Ia.delete(e),r.O_()&&qd(n,e),n.Ia.size===0&&(r.O_()?r.L_():Ft(n)&&n.Ra.set("Unknown"))}function Zo(t,e){if(t.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}vn(t).Y_(e)}function qd(t,e){t.Va.Ue(e),vn(t).Z_(e)}function ea(t){t.Va=new Mv({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),At:e=>t.Ia.get(e)||null,ht:()=>t.datastore.serializer.databaseId}),vn(t).start(),t.Ra.ua()}function ta(t){return Ft(t)&&!vn(t).x_()&&t.Ia.size>0}function Ft(t){return F(t).Ea.size===0}function jd(t){t.Va=void 0}async function HE(t){t.Ra.set("Online")}async function GE(t){t.Ia.forEach(((e,n)=>{Zo(t,e)}))}async function WE(t,e){jd(t),ta(t)?(t.Ra.ha(e),ea(t)):t.Ra.set("Unknown")}async function KE(t,e,n){if(t.Ra.set("Online"),e instanceof wd&&e.state===2&&e.cause)try{await(async function(i,o){const a=o.cause;for(const u of o.targetIds)i.Ia.has(u)&&(await i.remoteSyncer.rejectListen(u,a),i.Ia.delete(u),i.Va.removeTarget(u))})(t,e)}catch(r){D(Mt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Pi(t,r)}else if(e instanceof ci?t.Va.Ze(e):e instanceof Td?t.Va.st(e):t.Va.tt(e),!n.isEqual(U.min()))try{const r=await xd(t.localStore);n.compareTo(r)>=0&&await(function(o,a){const u=o.Va.Tt(a);return u.targetChanges.forEach(((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const p=o.Ia.get(d);p&&o.Ia.set(d,p.withResumeToken(h.resumeToken,a))}})),u.targetMismatches.forEach(((h,d)=>{const p=o.Ia.get(h);if(!p)return;o.Ia.set(h,p.withResumeToken(Te.EMPTY_BYTE_STRING,p.snapshotVersion)),qd(o,h);const y=new Yo(p.target,h,d,p.sequenceNumber);Zo(o,y)})),o.remoteSyncer.applyRemoteEvent(u)})(t,n)}catch(r){D(Mt,"Failed to raise snapshot:",r),await Pi(t,r)}}async function Pi(t,e,n){if(!_n(e))throw e;t.Ea.add(1),await Tr(t),t.Ra.set("Offline"),n||(n=()=>xd(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{D(Mt,"Retrying IndexedDB access"),await n(),t.Ea.delete(1),await Qi(t)}))}function zd(t,e){return e().catch((n=>Pi(t,n,e)))}async function Yi(t){const e=F(t),n=gt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Uo;for(;QE(e);)try{const i=await bE(e.localStore,r);if(i===null){e.Ta.length===0&&n.L_();break}r=i.batchId,YE(e,i)}catch(i){await Pi(e,i)}Hd(e)&&Gd(e)}function QE(t){return Ft(t)&&t.Ta.length<10}function YE(t,e){t.Ta.push(e);const n=gt(t);n.O_()&&n.X_&&n.ea(e.mutations)}function Hd(t){return Ft(t)&&!gt(t).x_()&&t.Ta.length>0}function Gd(t){gt(t).start()}async function XE(t){gt(t).ra()}async function JE(t){const e=gt(t);for(const n of t.Ta)e.ea(n.mutations)}async function $E(t,e,n){const r=t.Ta.shift(),i=Sv.from(r,e,n);await zd(t,(()=>t.remoteSyncer.applySuccessfulWrite(i))),await Yi(t)}async function ZE(t,e){e&&gt(t).X_&&await(async function(r,i){if((function(a){return Vv(a)&&a!==P.ABORTED})(i.code)){const o=r.Ta.shift();gt(r).B_(),await zd(r,(()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i))),await Yi(r)}})(t,e),Hd(t)&&Gd(t)}async function Bu(t,e){const n=F(t);n.asyncQueue.verifyOperationInProgress(),D(Mt,"RemoteStore received new credentials");const r=Ft(n);n.Ea.add(3),await Tr(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ea.delete(3),await Qi(n)}async function eI(t,e){const n=F(t);e?(n.Ea.delete(2),await Qi(n)):e||(n.Ea.add(2),await Tr(n),n.Ra.set("Unknown"))}function vn(t){return t.ma||(t.ma=(function(n,r,i){const o=F(n);return o.sa(),new FE(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)})(t.datastore,t.asyncQueue,{Xo:HE.bind(null,t),t_:GE.bind(null,t),r_:WE.bind(null,t),H_:KE.bind(null,t)}),t.da.push((async e=>{e?(t.ma.B_(),ta(t)?ea(t):t.Ra.set("Unknown")):(await t.ma.stop(),jd(t))}))),t.ma}function gt(t){return t.fa||(t.fa=(function(n,r,i){const o=F(n);return o.sa(),new UE(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)})(t.datastore,t.asyncQueue,{Xo:()=>Promise.resolve(),t_:XE.bind(null,t),r_:ZE.bind(null,t),ta:JE.bind(null,t),na:$E.bind(null,t)}),t.da.push((async e=>{e?(t.fa.B_(),await Yi(t)):(await t.fa.stop(),t.Ta.length>0&&(D(Mt,`Stopping write stream with ${t.Ta.length} pending writes`),t.Ta=[]))}))),t.fa}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var tI=class Wd{constructor(e,n,r,i,o){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new Ge,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,o){const a=Date.now()+r,u=new Wd(e,n,a,i,o);return u.start(r),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function na(t,e){if(Qe("AsyncQueue",`${e}: ${t}`),_n(t))return new V(P.UNAVAILABLE,`${e}: ${t}`);throw t}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Kd=class li{static emptySet(e){return new li(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||L.comparator(n.key,r.key):(n,r)=>L.comparator(n.key,r.key),this.keyedMap=Hn(),this.sortedSet=new re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((n,r)=>(e(n),!1)))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof li)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,o=r.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const e=[];return this.forEach((n=>{e.push(n.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new li;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var qu=class{constructor(){this.ga=new re(L.comparator)}track(t){const e=t.doc.key,n=this.ga.get(e);n?t.type!==0&&n.type===3?this.ga=this.ga.insert(e,t):t.type===3&&n.type!==1?this.ga=this.ga.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.ga=this.ga.remove(e):t.type===1&&n.type===2?this.ga=this.ga.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):x(63341,{Rt:t,pa:n}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,n)=>{t.push(n)})),t}},Si=class Qd{constructor(e,n,r,i,o,a,u,h,d){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(e,n,r,i,o){const a=[];return n.forEach((u=>{a.push({type:0,doc:u})})),new Qd(e,n,Kd.emptySet(n),a,r,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&zi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var nI=class{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}},rI=class{constructor(){this.queries=ju(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,n){const r=F(e),i=r.queries;r.queries=ju(),i.forEach(((o,a)=>{for(const u of a.Sa)u.onError(n)}))})(this,new V(P.ABORTED,"Firestore shutting down"))}};function ju(){return new xt((t=>rd(t)),zi)}async function ra(t,e){const n=F(t);let r=3;const i=e.query;let o=n.queries.get(i);o?!o.ba()&&e.Da()&&(r=2):(o=new nI,r=e.Da()?0:1);try{switch(r){case 0:o.wa=await n.onListen(i,!0);break;case 1:o.wa=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(a){const u=na(a,`Initialization of query '${Yt(e.query)}' failed`);e.onError(u);return}n.queries.set(i,o),o.Sa.push(e),e.va(n.onlineState),o.wa&&e.Fa(o.wa)&&sa(n)}async function ia(t,e){const n=F(t),r=e.query;let i=3;const o=n.queries.get(r);if(o){const a=o.Sa.indexOf(e);a>=0&&(o.Sa.splice(a,1),o.Sa.length===0?i=e.Da()?0:1:!o.ba()&&e.Da()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function iI(t,e){const n=F(t);let r=!1;for(const i of e){const o=i.query,a=n.queries.get(o);if(a){for(const u of a.Sa)u.Fa(i)&&(r=!0);a.wa=i}}r&&sa(n)}function sI(t,e,n){const r=F(t),i=r.queries.get(e);if(i)for(const o of i.Sa)o.onError(n);r.queries.delete(e)}function sa(t){t.Ca.forEach((e=>{e.next()}))}var Ao,zu;(zu=Ao||(Ao={})).Ma="default",zu.Cache="cache";var oa=class{constructor(t,e,n){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(t){if(!this.options.includeMetadataChanges){const n=[];for(const r of t.docChanges)r.type!==3&&n.push(r);t=new Si(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const n=e!=="Offline";return(!this.options.qa||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=Si.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Ao.Cache}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Yd=class{constructor(t){this.key=t}},Xd=class{constructor(t){this.key=t}},oI=class{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=H(),this.mutatedKeys=H(),this.eu=id(t),this.tu=new Kd(this.eu)}get nu(){return this.Ya}ru(t,e){const n=e?e.iu:new qu,r=e?e.tu:this.tu;let i=e?e.mutatedKeys:this.mutatedKeys,o=r,a=!1;const u=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,h=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal(((d,p)=>{const y=r.get(d),R=Hi(this.query,p)?p:null,C=!!y&&this.mutatedKeys.has(y.key),N=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let k=!1;y&&R?y.data.isEqual(R.data)?C!==N&&(n.track({type:3,doc:R}),k=!0):this.su(y,R)||(n.track({type:2,doc:R}),k=!0,(u&&this.eu(R,u)>0||h&&this.eu(R,h)<0)&&(a=!0)):!y&&R?(n.track({type:0,doc:R}),k=!0):y&&!R&&(n.track({type:1,doc:y}),k=!0,(u||h)&&(a=!0)),k&&(R?(o=o.add(R),i=N?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),n.track({type:1,doc:d})}return{tu:o,iu:n,Cs:a,mutatedKeys:i}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,r){const i=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const o=t.iu.ya();o.sort(((d,p)=>(function(R,C){const N=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x(20277,{Rt:k})}};return N(R)-N(C)})(d.type,p.type)||this.eu(d.doc,p.doc))),this.ou(n),r=r??!1;const a=e&&!r?this._u():[],u=this.Xa.size===0&&this.current&&!r?1:0,h=u!==this.Za;return this.Za=u,o.length!==0||h?{snapshot:new Si(this.query,t.tu,i,o,t.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new qu,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Ya=this.Ya.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ya=this.Ya.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=H(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Xa=this.Xa.add(n.key))}));const e=[];return t.forEach((n=>{this.Xa.has(n)||e.push(new Xd(n))})),this.Xa.forEach((n=>{t.has(n)||e.push(new Yd(n))})),e}cu(t){this.Ya=t.Qs,this.Xa=H();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return Si.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}},aa="SyncEngine",aI=class{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}},cI=class{constructor(t){this.key=t,this.hu=!1}},uI=class{constructor(t,e,n,r,i,o){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new xt((a=>rd(a)),zi),this.Iu=new Map,this.Eu=new Set,this.du=new re(L.comparator),this.Au=new Map,this.Ru=new Xo,this.Vu={},this.mu=new Map,this.fu=Eo.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}};async function lI(t,e,n=!0){const r=nf(t);let i;const o=r.Tu.get(e);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.lu()):i=await Jd(r,e,n,!0),i}async function hI(t,e){const n=nf(t);await Jd(n,e,!0,!1)}async function Jd(t,e,n,r){const i=await VE(t.localStore,Fe(e)),o=i.targetId,a=t.sharedClientState.addLocalQueryTarget(o,n);let u;return r&&(u=await dI(t,e,o,a==="current",i.resumeToken)),t.isPrimaryClient&&n&&Bd(t.remoteStore,i),u}async function dI(t,e,n,r,i){t.pu=(y,R,C)=>(async function(k,O,q,W){let X=O.view.ru(q);X.Cs&&(X=await Mu(k.localStore,O.query,!1).then((({documents:E})=>O.view.ru(E,X))));const Pe=W&&W.targetChanges.get(O.targetId),we=W&&W.targetMismatches.get(O.targetId)!=null,he=O.view.applyChanges(X,k.isPrimaryClient,Pe,we);return Gu(k,O.targetId,he.au),he.snapshot})(t,y,R,C);const o=await Mu(t.localStore,e,!0),a=new oI(e,o.Qs),u=a.ru(o.documents),h=Ko.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),d=a.applyChanges(u,t.isPrimaryClient,h);Gu(t,n,d.au);const p=new aI(e,n,a);return t.Tu.set(e,p),t.Iu.has(n)?t.Iu.get(n).push(e):t.Iu.set(n,[e]),d.snapshot}async function fI(t,e,n){const r=F(t),i=r.Tu.get(e),o=r.Iu.get(i.targetId);if(o.length>1)return r.Iu.set(i.targetId,o.filter((a=>!zi(a,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await To(r.localStore,i.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(i.targetId),n&&$o(r.remoteStore,i.targetId),Ro(r,i.targetId)})).catch(gn)):(Ro(r,i.targetId),await To(r.localStore,i.targetId,!0))}async function pI(t,e){const n=F(t),r=n.Tu.get(e),i=n.Iu.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),$o(n.remoteStore,r.targetId))}async function mI(t,e,n){const r=TI(t);try{const i=await(function(a,u){const h=F(a),d=ue.now(),p=u.reduce(((C,N)=>C.add(N.key)),H());let y,R;return h.persistence.runTransaction("Locally write mutations","readwrite",(C=>{let N=Ze(),k=H();return h.Ns.getEntries(C,p).next((O=>{N=O,N.forEach(((q,W)=>{W.isValidDocument()||(k=k.add(q))}))})).next((()=>h.localDocuments.getOverlayedDocuments(C,N))).next((O=>{y=O;const q=[];for(const W of u){const X=Av(W,y.get(W.key).overlayedDocument);X!=null&&q.push(new It(W.key,X,Kh(X.value.mapValue),kt.exists(!0)))}return h.mutationQueue.addMutationBatch(C,d,q,u)})).next((O=>{R=O;const q=O.applyToLocalDocumentSet(y,k);return h.documentOverlayCache.saveOverlays(C,O.batchId,q)}))})).then((()=>({batchId:R.batchId,changes:od(y)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),(function(a,u,h){let d=a.Vu[a.currentUser.toKey()];d||(d=new re(z)),d=d.insert(u,h),a.Vu[a.currentUser.toKey()]=d})(r,i.batchId,n),await wr(r,i.changes),await Yi(r.remoteStore)}catch(i){const o=na(i,"Failed to persist write");n.reject(o)}}async function $d(t,e){const n=F(t);try{const r=await SE(n.localStore,e);e.targetChanges.forEach(((i,o)=>{const a=n.Au.get(o);a&&(K(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.hu=!0:i.modifiedDocuments.size>0?K(a.hu,14607):i.removedDocuments.size>0&&(K(a.hu,42227),a.hu=!1))})),await wr(n,r,e)}catch(r){await gn(r)}}function Hu(t,e,n){const r=F(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Tu.forEach(((o,a)=>{const u=a.view.va(e);u.snapshot&&i.push(u.snapshot)})),(function(a,u){const h=F(a);h.onlineState=u;let d=!1;h.queries.forEach(((p,y)=>{for(const R of y.Sa)R.va(u)&&(d=!0)})),d&&sa(h)})(r.eventManager,e),i.length&&r.Pu.H_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function gI(t,e,n){const r=F(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Au.get(e),o=i&&i.key;if(o){let a=new re(L.comparator);a=a.insert(o,Je.newNoDocument(o,U.min()));const u=H().add(o),h=new vd(U.min(),new Map,new re(z),a,u);await $d(r,h),r.du=r.du.remove(o),r.Au.delete(e),ca(r)}else await To(r.localStore,e,!1).then((()=>Ro(r,e,n))).catch(gn)}async function _I(t,e){const n=F(t),r=e.batch.batchId;try{const i=await PE(n.localStore,e);ef(n,r,null),Zd(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await wr(n,i)}catch(i){await gn(i)}}async function yI(t,e,n){const r=F(t);try{const i=await(function(a,u){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let p;return h.mutationQueue.lookupMutationBatch(d,u).next((y=>(K(y!==null,37113),p=y.keys(),h.mutationQueue.removeMutationBatch(d,y)))).next((()=>h.mutationQueue.performConsistencyCheck(d))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(d,p,u))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p))).next((()=>h.localDocuments.getDocuments(d,p)))}))})(r.localStore,e);ef(r,e,n),Zd(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await wr(r,i)}catch(i){await gn(i)}}function Zd(t,e){(t.mu.get(e)||[]).forEach((n=>{n.resolve()})),t.mu.delete(e)}function ef(t,e,n){const r=F(t);let i=r.Vu[r.currentUser.toKey()];if(i){const o=i.get(e);o&&(n?o.reject(n):o.resolve(),i=i.remove(e)),r.Vu[r.currentUser.toKey()]=i}}function Ro(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Iu.get(e))t.Tu.delete(r),n&&t.Pu.yu(r,n);t.Iu.delete(e),t.isPrimaryClient&&t.Ru.jr(e).forEach((r=>{t.Ru.containsKey(r)||tf(t,r)}))}function tf(t,e){t.Eu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&($o(t.remoteStore,n),t.du=t.du.remove(e),t.Au.delete(n),ca(t))}function Gu(t,e,n){for(const r of n)r instanceof Yd?(t.Ru.addReference(r.key,e),vI(t,r)):r instanceof Xd?(D(aa,"Document no longer in limbo: "+r.key),t.Ru.removeReference(r.key,e),t.Ru.containsKey(r.key)||tf(t,r.key)):x(19791,{wu:r})}function vI(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Eu.has(r)||(D(aa,"New document in limbo: "+n),t.Eu.add(r),ca(t))}function ca(t){for(;t.Eu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Eu.values().next().value;t.Eu.delete(e);const n=new L(Z.fromString(e)),r=t.fu.next();t.Au.set(r,new cI(n)),t.du=t.du.insert(n,r),Bd(t.remoteStore,new Yo(Fe(ji(n.path)),r,"TargetPurposeLimboResolution",Ui.ce))}}async function wr(t,e,n){const r=F(t),i=[],o=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((u,h)=>{a.push(r.pu(h,e,n).then((d=>{if((d||n)&&r.isPrimaryClient){const p=d?!d.fromCache:n?.targetChanges.get(h.targetId)?.current;r.sharedClientState.updateQueryState(h.targetId,p?"current":"not-current")}if(d){i.push(d);const p=EE.As(h.targetId,d);o.push(p)}})))})),await Promise.all(a),r.Pu.H_(i),await(async function(h,d){const p=F(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",(y=>S.forEach(d,(R=>S.forEach(R.Es,(C=>p.persistence.referenceDelegate.addReference(y,R.targetId,C))).next((()=>S.forEach(R.ds,(C=>p.persistence.referenceDelegate.removeReference(y,R.targetId,C)))))))))}catch(y){if(!_n(y))throw y;D(Jo,"Failed to update sequence numbers: "+y)}for(const y of d){const R=y.targetId;if(!y.fromCache){const C=p.Ms.get(R),N=C.snapshotVersion,k=C.withLastLimboFreeSnapshotVersion(N);p.Ms=p.Ms.insert(R,k)}}})(r.localStore,o))}async function EI(t,e){const n=F(t);if(!n.currentUser.isEqual(e)){D(aa,"User change. New user:",e.toKey());const r=await Ld(n.localStore,e);n.currentUser=e,(function(o,a){o.mu.forEach((u=>{u.forEach((h=>{h.reject(new V(P.CANCELLED,a))}))})),o.mu.clear()})(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await wr(n,r.Ls)}}function II(t,e){const n=F(t),r=n.Au.get(e);if(r&&r.hu)return H().add(r.key);{let i=H();const o=n.Iu.get(e);if(!o)return i;for(const a of o){const u=n.Tu.get(a);i=i.unionWith(u.view.nu)}return i}}function nf(t){const e=F(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=$d.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=II.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=gI.bind(null,e),e.Pu.H_=iI.bind(null,e.eventManager),e.Pu.yu=sI.bind(null,e.eventManager),e}function TI(t){const e=F(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=_I.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=yI.bind(null,e),e}var Ci=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Ki(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return RE(this.persistence,new TE,t.initialUser,this.serializer)}Cu(t){return new Dd(vE.mi,this.serializer)}Du(t){return new DE}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};Ci.provider={build:()=>new Ci};var wI=class extends Ci{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){K(this.persistence.referenceDelegate instanceof Ou,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new sE(n,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?Ne.withCacheSize(this.cacheSizeBytes):Ne.DEFAULT;return new Dd((n=>Ou.mi(n,e)),this.serializer)}},Po=class{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Hu(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=EI.bind(null,this.syncEngine),await eI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new rI})()}createDatastore(t){const e=Ki(t.databaseInfo.databaseId),n=(function(i){return new xE(i)})(t.databaseInfo);return(function(i,o,a,u){return new qE(i,o,a,u)})(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return(function(n,r,i,o,a){return new zE(n,r,i,o,a)})(this.localStore,this.datastore,t.asyncQueue,(e=>Hu(this.syncEngine,e,0)),(function(){return Fu.v()?new Fu:new NE})())}createSyncEngine(t,e){return(function(r,i,o,a,u,h,d){const p=new uI(r,i,o,a,u,h);return d&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){await(async function(e){const n=F(e);D(Mt,"RemoteStore shutting down."),n.Ea.add(5),await Tr(n),n.Aa.shutdown(),n.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}};Po.provider={build:()=>new Po};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*//**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var ua=class{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):Qe("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var _t="FirestoreClient",AI=class{constructor(t,e,n,r,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=r,this.user=pe.UNAUTHENTICATED,this.clientId=Fo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async o=>{D(_t,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(n,(o=>(D(_t,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ge;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=na(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}};async function qs(t,e){t.asyncQueue.verifyOperationInProgress(),D(_t,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async i=>{r.isEqual(i)||(await Ld(e.localStore,i),r=i)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t._offlineComponents=e}async function Wu(t,e){t.asyncQueue.verifyOperationInProgress();const n=await RI(t);D(_t,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener((r=>Bu(e.remoteStore,r))),t.setAppCheckTokenChangeListener(((r,i)=>Bu(e.remoteStore,i))),t._onlineComponents=e}async function RI(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){D(_t,"Using user provided OfflineComponentProvider");try{await qs(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!(function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(n))throw n;cn("Error using user provided cache. Falling back to memory cache: "+n),await qs(t,new Ci)}}else D(_t,"Using default OfflineComponentProvider"),await qs(t,new wI(void 0));return t._offlineComponents}async function rf(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(D(_t,"Using user provided OnlineComponentProvider"),await Wu(t,t._uninitializedComponentsProvider._online)):(D(_t,"Using default OnlineComponentProvider"),await Wu(t,new Po))),t._onlineComponents}function PI(t){return rf(t).then((e=>e.syncEngine))}async function bi(t){const e=await rf(t),n=e.eventManager;return n.onListen=lI.bind(null,e.syncEngine),n.onUnlisten=fI.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=hI.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=pI.bind(null,e.syncEngine),n}function SI(t,e,n={}){const r=new Ge;return t.asyncQueue.enqueueAndForget((async()=>(function(o,a,u,h,d){const p=new ua({next:R=>{p.Nu(),a.enqueueAndForget((()=>ia(o,y)));const C=R.docs.has(u);!C&&R.fromCache?d.reject(new V(P.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&R.fromCache&&h&&h.source==="server"?d.reject(new V(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(R)},error:R=>d.reject(R)}),y=new oa(ji(u.path),p,{includeMetadataChanges:!0,qa:!0});return ra(o,y)})(await bi(t),t.asyncQueue,e,n,r))),r.promise}function CI(t,e,n={}){const r=new Ge;return t.asyncQueue.enqueueAndForget((async()=>(function(o,a,u,h,d){const p=new ua({next:R=>{p.Nu(),a.enqueueAndForget((()=>ia(o,y))),R.fromCache&&h.source==="server"?d.reject(new V(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(R)},error:R=>d.reject(R)}),y=new oa(u,p,{includeMetadataChanges:!0,qa:!0});return ra(o,y)})(await bi(t),t.asyncQueue,e,n,r))),r.promise}/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function sf(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ku=new Map;/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var of="firestore.googleapis.com",Qu=!0,Yu=class{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new V(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=of,this.ssl=Qu}else this.host=t.host,this.ssl=t.ssl??Qu;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=kd;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<rE)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Cy("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=sf(t.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(n,r){return n.timeoutSeconds===r.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}},Xi=class{constructor(t,e,n,r){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Yu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new V(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Yu(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new yy;switch(n.type){case"firstParty":return new Ty(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new V(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const n=Ku.get(e);n&&(D("ComponentProvider","Removing Datastore"),Ku.delete(e),n.terminate())})(this),Promise.resolve()}};function bI(t,e,n,r={}){t=Re(t,Xi);const i=fn(e),o=t._getSettings(),a={...o,emulatorOptions:t._getEmulatorOptions()},u=`${e}:${n}`;i&&(cl(`https://${u}`),ul("Firestore",!0)),o.host!==of&&o.host!==u&&cn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:u,ssl:i,emulatorOptions:r};if(!Dt(h,a)&&(t._setSettings(h),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=pe.MOCK_USER;else{d=yp(r.mockUserToken,t._app?.options.projectId);const y=r.mockUserToken.sub||r.mockUserToken.user_id;if(!y)throw new V(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new pe(y)}t._authCredentials=new vy(new vh(d,p))}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Ut=class af{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new af(this.firestore,e,this._query)}},le=class Kn{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new nn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Kn(this.firestore,e,this._key)}toJSON(){return{type:Kn._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(Er(n,Kn._jsonSchema))return new Kn(e,r||null,new L(Z.fromString(n.referencePath)))}};le._jsonSchemaVersion="firestore/documentReference/1.0",le._jsonSchema={type:te("string",le._jsonSchemaVersion),referencePath:te("string")};var nn=class cf extends Ut{constructor(e,n,r){super(e,n,ji(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new le(this.firestore,null,new L(e))}withConverter(e){return new cf(this.firestore,e,this._path)}};function oT(t,e,...n){if(t=ne(t),Ih("collection","path",e),t instanceof Xi){const r=Z.fromString(e,...n);return ou(r),new nn(t,null,r)}{if(!(t instanceof le||t instanceof nn))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Z.fromString(e,...n));return ou(r),new nn(t.firestore,null,r)}}function VI(t,e,...n){if(t=ne(t),arguments.length===1&&(e=Fo.newId()),Ih("doc","path",e),t instanceof Xi){const r=Z.fromString(e,...n);return su(r),new le(t,null,new L(r))}{if(!(t instanceof le||t instanceof nn))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Z.fromString(e,...n));return su(r),new le(t.firestore,t instanceof nn?t.converter:null,new L(r))}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Xu="AsyncQueue",Ju=class{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Fd(this,"async_queue_retry"),this._c=()=>{const n=Bs();n&&D(Xu,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=t;const e=Bs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Bs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new Ge;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Xu.push(t),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!_n(t))throw t;D(Xu,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((n=>{throw this.nc=n,this.rc=!1,Qe("INTERNAL UNHANDLED ERROR: ",$u(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=e,e}enqueueAfterDelay(t,e,n){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const r=tI.createAndSchedule(this,t,e,n,(i=>this.hc(i)));return this.tc.push(r),r}uc(){this.nc&&x(47125,{Pc:$u(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then((()=>{this.tc.sort(((e,n)=>e.targetTimeMs-n.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}};function $u(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Zu(t){return(function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const o of r)if(o in i&&typeof i[o]=="function")return!0;return!1})(t,["next","error","complete"])}var yt=class extends Xi{constructor(t,e,n,r){super(t,e,n,r),this.type="firestore",this._queue=new Ju,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Ju(t),this._firestoreClient=void 0,await t}}};function aT(t,e){const n=typeof t=="object"?t:pl(),r=typeof t=="string"?t:e||Ii,i=Vo(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=gp("firestore");o&&bI(i,...o)}return i}function Ji(t){if(t._terminated)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||kI(t),t._firestoreClient}function kI(t){const e=t._freezeSettings(),n=(function(i,o,a,u){return new Jy(i,o,a,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,sf(u.experimentalLongPollingOptions),u.useFetchStreams,u.isUsingEmulator)})(t._databaseId,t._app?.options.appId||"",t._persistenceKey,e);t._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new AI(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&(function(i){const o=i?._online.build();return{_offline:i?._offline.build(o),_online:o}})(t._componentsProvider))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var rn=class $t{constructor(e){this._byteString=e}static fromBase64String(e){try{return new $t(Te.fromBase64String(e))}catch(n){throw new V(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new $t(Te.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:$t._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Er(e,$t._jsonSchema))return $t.fromBase64String(e.bytes)}};rn._jsonSchemaVersion="firestore/bytes/1.0",rn._jsonSchema={type:te("string",rn._jsonSchemaVersion),bytes:te("string")};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var $i=class{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new V(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new be(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var Zi=class{constructor(t){this._methodName=t}};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var sn=class hi{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new V(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new V(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:hi._jsonSchemaVersion}}static fromJSON(e){if(Er(e,hi._jsonSchema))return new hi(e.latitude,e.longitude)}};sn._jsonSchemaVersion="firestore/geoPoint/1.0",sn._jsonSchema={type:te("string",sn._jsonSchemaVersion),latitude:te("number"),longitude:te("number")};/**
* @license
* Copyright 2024 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var on=class di{constructor(e){this._values=(e||[]).map((n=>n))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0})(this._values,e._values)}toJSON(){return{type:di._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Er(e,di._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((n=>typeof n=="number")))return new di(e.vectorValues);throw new V(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};on._jsonSchemaVersion="firestore/vectorValue/1.0",on._jsonSchema={type:te("string",on._jsonSchemaVersion),vectorValues:te("object")};/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var DI=/^__.*__$/,NI=class{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new It(t,this.data,this.fieldMask,e,this.fieldTransforms):new Ir(t,this.data,e,this.fieldTransforms)}},uf=class{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new It(t,this.data,this.fieldMask,e,this.fieldTransforms)}};function lf(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{Ac:t})}}var OI=class hf{constructor(e,n,r,i,o,a){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.Rc(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new hf({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){const n=this.path?.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Vi(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((n=>e.isPrefixOf(n)))!==void 0||this.fieldTransforms.find((n=>e.isPrefixOf(n.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(lf(this.Ac)&&DI.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}},MI=class{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||Ki(t)}Cc(t,e,n,r=!1){return new OI({Ac:t,methodName:e,Dc:n,path:be.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function es(t){const e=t._freezeSettings(),n=Ki(t._databaseId);return new MI(t._databaseId,!!e.ignoreUndefinedProperties,n)}function df(t,e,n,r,i,o={}){const a=t.Cc(o.merge||o.mergeFields?2:0,e,n,i);la("Data must be an object, but it was:",a,r);const u=gf(r,a);let h,d;if(o.merge)h=new Me(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const p=[];for(const y of o.mergeFields){const R=So(e,y,n);if(!a.contains(R))throw new V(P.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);yf(p,R)||p.push(R)}h=new Me(p),d=a.fieldTransforms.filter((y=>h.covers(y.field)))}else h=null,d=a.fieldTransforms;return new NI(new Ce(u),h,d)}var ff=class pf extends Zi{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof pf}},LI=class mf extends Zi{_toFieldTransform(e){return new Ev(e.path,new dr)}isEqual(e){return e instanceof mf}};function xI(t,e,n,r){const i=t.Cc(1,e,n);la("Data must be an object, but it was:",i,r);const o=[],a=Ce.empty();Et(r,((h,d)=>{const p=ha(e,h,n);d=ne(d);const y=i.yc(p);if(d instanceof ff)o.push(p);else{const R=Ar(d,y);R!=null&&(o.push(p),a.set(p,R))}}));const u=new Me(o);return new uf(a,u,i.fieldTransforms)}function FI(t,e,n,r,i,o){const a=t.Cc(1,e,n),u=[So(e,r,n)],h=[i];if(o.length%2!=0)throw new V(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let R=0;R<o.length;R+=2)u.push(So(e,o[R])),h.push(o[R+1]);const d=[],p=Ce.empty();for(let R=u.length-1;R>=0;--R)if(!yf(d,u[R])){const C=u[R];let N=h[R];N=ne(N);const k=a.yc(C);if(N instanceof ff)d.push(C);else{const O=Ar(N,k);O!=null&&(d.push(C),p.set(C,O))}}const y=new Me(d);return new uf(p,y,a.fieldTransforms)}function UI(t,e,n,r=!1){return Ar(n,t.Cc(r?4:3,e))}function Ar(t,e){if(_f(t=ne(t)))return la("Unsupported field value:",e,t),gf(t,e);if(t instanceof Zi)return(function(r,i){if(!lf(i.Ac))throw i.Sc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Sc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(r,i){const o=[];let a=0;for(const u of r){let h=Ar(u,i.wc(a));h??={nullValue:"NULL_VALUE"},o.push(h),a++}return{arrayValue:{values:o}}})(t,e)}return(function(r,i){if((r=ne(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return _v(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=ue.fromDate(r);return{timestampValue:Ri(i.serializer,o)}}if(r instanceof ue){const o=new ue(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ri(i.serializer,o)}}if(r instanceof sn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof rn)return{bytesValue:Ad(i.serializer,r._byteString)};if(r instanceof le){const o=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw i.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Qo(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof on)return(function(a,u){return{mapValue:{fields:{[qo]:{stringValue:jo},[ln]:{arrayValue:{values:a.toArray().map((h=>{if(typeof h!="number")throw u.Sc("VectorValues must only contain numeric values.");return Wo(u.serializer,h)}))}}}}}})(r,i);throw i.Sc(`Unsupported field value: ${Fi(r)}`)})(t,e)}function gf(t,e){const n={};return xh(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Et(t,((r,i)=>{const o=Ar(i,e.mc(r));o!=null&&(n[r]=o)})),{mapValue:{fields:n}}}function _f(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof ue||t instanceof sn||t instanceof rn||t instanceof le||t instanceof Zi||t instanceof on)}function la(t,e,n){if(!_f(n)||!Th(n)){const r=Fi(n);throw r==="an object"?e.Sc(t+" a custom object"):e.Sc(t+" "+r)}}function So(t,e,n){if((e=ne(e))instanceof $i)return e._internalPath;if(typeof e=="string")return ha(t,e);throw Vi("Field path arguments must be of type string or ",t,!1,void 0,n)}var BI=new RegExp("[~\\*/\\[\\]]");function ha(t,e,n){if(e.search(BI)>=0)throw Vi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new $i(...e.split("."))._internalPath}catch{throw Vi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Vi(t,e,n,r,i){const o=r&&!r.isEmpty(),a=i!==void 0;let u=`Function ${e}() called with invalid data`;n&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${i}`),h+=")"),new V(P.INVALID_ARGUMENT,u+t+h)}function yf(t,e){return t.some((n=>n.isEqual(e)))}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var vf=class{constructor(t,e,n,r,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new le(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new qI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(ts("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}},qI=class extends vf{data(){return super.data()}};function ts(t,e){return typeof e=="string"?ha(t,e):e instanceof $i?e._internalPath:e._delegate._internalPath}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Ef(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new V(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var da=class{},fa=class extends da{};function cT(t,e,...n){let r=[];e instanceof da&&r.push(e),r=r.concat(n),(function(o){const a=o.filter((h=>h instanceof jI)).length,u=o.filter((h=>h instanceof If)).length;if(a>1||a>0&&u>0)throw new V(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const i of r)t=i._apply(t);return t}var If=class Tf extends fa{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Tf(e,n,r)}_apply(e){const n=this._parse(e);return Pf(e._query,n),new Ut(e.firestore,e.converter,mo(e._query,n))}_parse(e){const n=es(e.firestore);return(function(i,o,a,u,h,d,p){let y;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new V(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){tl(p,d);const R=[];for(const C of p)R.push(el(u,i,C));y={arrayValue:{values:R}}}else y=el(u,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||tl(p,d),y=UI(a,o,p,d==="in"||d==="not-in");return ce.create(h,d,y)})(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}};function uT(t,e,n){const r=e,i=ts("where",t);return If._create(i,r,n)}var jI=class wf extends da{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new wf(e,n)}_parse(e){const n=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return n.length===1?n[0]:$e.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:((function(i,o){let a=i;const u=o.getFlattenedFilters();for(const h of u)Pf(a,h),a=mo(a,h)})(e._query,n),new Ut(e.firestore,e.converter,mo(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}},zI=class Af extends fa{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Af(e,n)}_apply(e){const n=(function(i,o,a){if(i.startAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new hr(o,a)})(e._query,this._field,this._direction);return new Ut(e.firestore,e.converter,(function(i,o){const a=i.explicitOrderBy.concat([o]);return new yn(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)})(e._query,n))}};function lT(t,e="asc"){const n=e,r=ts("orderBy",t);return zI._create(r,n)}var HI=class Rf extends fa{constructor(e,n,r){super(),this.type=e,this._limit=n,this._limitType=r}static _create(e,n,r){return new Rf(e,n,r)}_apply(e){return new Ut(e.firestore,e.converter,wi(e._query,this._limit,this._limitType))}};function hT(t){return by("limit",t),HI._create("limit",t,"F")}function el(t,e,n){if(typeof(n=ne(n))=="string"){if(n==="")throw new V(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!nd(e)&&n.indexOf("/")!==-1)throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Z.fromString(n));if(!L.isDocumentKey(r))throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return pu(t,new L(r))}if(n instanceof le)return pu(t,n._key);throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Fi(n)}.`)}function tl(t,e){if(!Array.isArray(t)||t.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Pf(t,e){const n=(function(i,o){for(const a of i)for(const u of a.getFlattenedFilters())if(o.indexOf(u.op)>=0)return u.op;return null})(t.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(n!==null)throw n===e.op?new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}var GI=class{convertValue(t,e="none"){switch(mt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return J(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Xe(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw x(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Et(t,((r,i)=>{n[r]=this.convertValue(i,e)})),n}convertVectorValue(t){const e=t.fields?.[ln].arrayValue?.values?.map((n=>J(n.doubleValue)));return new on(e)}convertGeoPoint(t){return new sn(J(t.latitude),J(t.longitude))}convertArray(t,e){return(t.values||[]).map((n=>this.convertValue(n,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=qi(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(ur(t));default:return null}}convertTimestamp(t){const e=Ye(t);return new ue(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Z.fromString(t);K(Vd(n),9688,{name:t});const r=new zh(n.get(1),n.get(3)),i=new L(n.popFirst(5));return r.isEqual(e)||Qe(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}};/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function Sf(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}var Qn=class{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}},nr=class Cf extends vf{constructor(e,n,r,i,o,a){super(e,n,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new fi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(ts("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=Cf._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}};nr._jsonSchemaVersion="firestore/documentSnapshot/1.0",nr._jsonSchema={type:te("string",nr._jsonSchemaVersion),bundleSource:te("string","DocumentSnapshot"),bundleName:te("string"),bundle:te("string")};var fi=class extends nr{data(t={}){return super.data(t)}},rr=class bf{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new Qn(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach((n=>e.push(n))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach((r=>{e.call(n,new fi(this._firestore,this._userDataWriter,r.key,r,new Qn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new V(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=(function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map((u=>{const h=new fi(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Qn(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}}))}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((u=>o||u.type!==3)).map((u=>{const h=new fi(i._firestore,i._userDataWriter,u.doc.key,u.doc,new Qn(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,p=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),p=a.indexOf(u.doc.key)),{type:WI(u.type),doc:h,oldIndex:d,newIndex:p}}))}})(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=bf._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Fo.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],i=[];return this.docs.forEach((o=>{o._document!==null&&(n.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),i.push(o.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function WI(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x(61501,{type:t})}}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/function dT(t){t=Re(t,le);const e=Re(t.firestore,yt);return SI(Ji(e),t._key).then((n=>Vf(e,t,n)))}rr._jsonSchemaVersion="firestore/querySnapshot/1.0",rr._jsonSchema={type:te("string",rr._jsonSchemaVersion),bundleSource:te("string","QuerySnapshot"),bundleName:te("string"),bundle:te("string")};var pa=class extends GI{constructor(t){super(),this.firestore=t}convertBytes(t){return new rn(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new le(this.firestore,null,e)}};function fT(t){t=Re(t,Ut);const e=Re(t.firestore,yt),n=Ji(e),r=new pa(e);return Ef(t._query),CI(n,t._query).then((i=>new rr(e,r,t,i)))}function pT(t,e,n){t=Re(t,le);const r=Re(t.firestore,yt),i=Sf(t.converter,e,n);return ma(r,[df(es(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,kt.none())])}function mT(t,e,n,...r){t=Re(t,le);const i=Re(t.firestore,yt),o=es(i);let a;return a=typeof(e=ne(e))=="string"||e instanceof $i?FI(o,"updateDoc",t._key,e,n,r):xI(o,"updateDoc",t._key,e),ma(i,[a.toMutation(t._key,kt.exists(!0))])}function gT(t,e){const n=Re(t.firestore,yt),r=VI(t),i=Sf(t.converter,e);return ma(n,[df(es(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,kt.exists(!1))]).then((()=>r))}function _T(t,...e){t=ne(t);let n={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Zu(e[r])||(n=e[r++]);const i={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(Zu(e[r])){const h=e[r];e[r]=h.next?.bind(h),e[r+1]=h.error?.bind(h),e[r+2]=h.complete?.bind(h)}let o,a,u;if(t instanceof le)a=Re(t.firestore,yt),u=ji(t._key.path),o={next:h=>{e[r]&&e[r](Vf(a,t,h))},error:e[r+1],complete:e[r+2]};else{const h=Re(t,Ut);a=Re(h.firestore,yt),u=h._query;const d=new pa(a);o={next:p=>{e[r]&&e[r](new rr(a,d,h,p))},error:e[r+1],complete:e[r+2]},Ef(t._query)}return(function(d,p,y,R){const C=new ua(R),N=new oa(p,C,y);return d.asyncQueue.enqueueAndForget((async()=>ra(await bi(d),N))),()=>{C.Nu(),d.asyncQueue.enqueueAndForget((async()=>ia(await bi(d),N)))}})(Ji(a),u,i,o)}function ma(t,e){return(function(r,i){const o=new Ge;return r.asyncQueue.enqueueAndForget((async()=>mI(await PI(r),i,o))),o.promise})(Ji(t),e)}function Vf(t,e,n){const r=n.docs.get(e._key),i=new pa(t);return new nr(t,i,e._key,r,new Qn(n.hasPendingWrites,n.fromCache),e.converter)}function yT(){return new LI("serverTimestamp")}(function(e,n=!0){(function(i){mn=i})(pn),an(new Nt("firestore",((r,{instanceIdentifier:i,options:o})=>{const a=r.getProvider("app").getImmediate(),u=new yt(new Ey(r.getProvider("auth-internal")),new wy(a,r.getProvider("app-check-internal")),(function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new V(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new zh(d.options.projectId,p)})(a,i),a);return o={useFetchStreams:n,...o},u._setSettings(o),u}),"PUBLIC").setMultipleInstances(!0)),dt(tu,nu,e),dt(tu,nu,"esm2020")})();export{XI as _,fT as a,Mm as b,_T as c,yT as d,pT as f,eT as g,QI as h,dT as i,lT as l,uT as m,oT as n,aT as o,mT as p,VI as r,hT as s,gT as t,cT as u,YI as v,JI as y};
