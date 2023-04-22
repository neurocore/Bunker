(function(){"use strict";var e={581:function(e,t,n){var a=n(9242),s=n(2483),i=n(3396);const c=e=>((0,i.dD)("data-v-b664d740"),e=e(),(0,i.Cn)(),e),o={class:"screen screen-main"},r=c((()=>(0,i._)("div",{class:"caption big"},"Bunker",-1))),l=c((()=>(0,i._)("div",{class:"settings"},[(0,i._)("div",{class:"caption"},"Настройки")],-1))),d=c((()=>(0,i._)("br",null,null,-1)));function u(e,t,n,a,s,c){return(0,i.wg)(),(0,i.iD)("div",o,[r,l,(0,i._)("div",{onClick:t[0]||(t[0]=(...e)=>c.create_host&&c.create_host(...e)),class:"btn create_host"},"Создать хост"),d,(0,i.WI)(e.$slots,"default",{},void 0,!0)])}n(7658);var h=n(691),m=n(4870),p=n(4747);const _=(0,m.qj)({phase:"home",name:"",game_id:null,client_id:null,channel:null,players:{},deck:[],is_host(){return this.client_id==this.game_id},is_player(){return console.log("this.game_id",this.game_id,typeof this.game_id),this.game_id&&""!=this.game_id},set_cid(e){this.client_id=e},set_name(e){this.name=e,this.channel&&this.channel.presence.updateClient(this.client_id,{name:e})},connect(e){const t="get_api_key_from_ably",n="cbl_bunker";if(this.game_id=e,this.client_id||(this.client_id=sessionStorage.getItem(`${n}_cid`)||(0,h.x0)(16)),sessionStorage.setItem(`${n}_cid`,this.client_id),this.channel||!this.game_id)return!1;const a=`cbl_bunker_${this.game_id}`,s=new p.Realtime({key:t});this.channel=s.channels.get(a);const i=this.channel.presence;return this.is_host()&&i.subscribe((e=>{console.log(`Client ${e.clientId} is ${e.action}`),"present"!=e.action&&"enter"!=e.action&&"update"!=e.action||(console.log(e.data),"name"in e.data&&(this.players[e.clientId]={name:e.data.name}),this.update_presence()),"leave"==e.action&&e.clientId in this.players&&(delete this.players[e.clientId],this.update_presence())})),this.channel.subscribe((e=>{switch(console.log(`Action ${e.name} with`,e.data),e.name){case"players":this.is_host()||(this.players=e.data);break;case"start_game":this.phase="game";break}})),!0},disconnect(){this.channel.detach()},update_presence(){this.channel.publish("players",this.players)},start_game(){this.channel.publish("start_game",{})}});var g={name:"App",methods:{create_host(){const e=(0,h.x0)(12);_.set_cid(e),this.$router.push(`/lobby/${e}`)}}},v=n(89);const f=(0,v.Z)(g,[["render",u],["__scopeId","data-v-b664d740"]]);var b=f,y=n(7139);const w={class:"screen screen-main"},k=(0,i._)("div",{class:"caption big"},"Bunker",-1),$={class:"block"},I={class:"block"},O={class:"block"},C={key:0,class:"block"};function D(e,t,n,a,s,c){const o=(0,i.up)("enter-name");return(0,i.wg)(),(0,i.iD)("div",w,[k,(0,i._)("div",$,[(0,i._)("div",null,"Lobby for game with id = "+(0,y.zw)(n.game_id),1),(0,i._)("div",null,"I am a client with id = "+(0,y.zw)(s.state.client_id),1)]),(0,i._)("div",I,[(0,i.Wm)(o,{onChangedName:e.change_name,value:s.state.name},null,8,["onChangedName","value"])]),(0,i._)("div",O,[(0,i._)("div",null,"Players count "+(0,y.zw)(c.players_count),1),(0,i._)("ul",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.state.players,(e=>((0,i.wg)(),(0,i.iD)("li",{key:e.clientId},(0,y.zw)(e.name),1)))),128))])]),s.state.is_host()?((0,i.wg)(),(0,i.iD)("div",C,[(0,i._)("div",{onClick:t[0]||(t[0]=(...e)=>c.start_game&&c.start_game(...e)),class:"btn"},"Начать игру")])):(0,i.kq)("",!0)])}const j=(0,i._)("span",null,"Введите имя: ",-1);function x(e,t,n,s,c,o){return(0,i.wg)(),(0,i.iD)("label",null,[j,(0,i.wy)((0,i._)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>c.name=e)},null,512),[[a.nr,c.name,void 0,{trim:!0}]])])}var Z={name:"EnterName",props:["value"],data(){const e="cbl_bunker",t=localStorage.getItem(`${e}_name`);return{name:t||""}},watch:{name:{immediate:!0,handler(e){const t="cbl_bunker";localStorage.setItem(`${t}_name`,e),console.log("changed-name",e),this.$emit("changed-name",e)}}}};const z=(0,v.Z)(Z,[["render",x]]);var P=z,S=n(7823),W={name:"Lobby",props:["game_id"],components:{EnterName:P},data(){return{state:_}},watch:{"state.phase"(e,t){console.log(`Phase: ${t} -> ${e}`),"game"==e&&this.$router.push("/game")}},mounted:function(){this.state.connect(this.game_id)},unmounted:function(){this.state.disconnect()},methods:{start_game(){this.state.start_game()}},created(){this.change_name=(0,S.debounce)((e=>{console.log("name",e),this.state.set_name(e)}),500)},computed:{players_count(){return _.players?Object.keys(_.players).length:0}}};const N=(0,v.Z)(W,[["render",D]]);var U=N;const A={key:0,class:"screen"},E={class:"block"},q={class:"title"},B={class:"block"},G={class:"container"},L={key:1,class:"screen"};function M(e,t,n,a,s,c){const o=(0,i.up)("Card");return s.state.is_player()?((0,i.wg)(),(0,i.iD)("div",A,[(0,i._)("div",E,[(0,i._)("div",q,(0,y.zw)(s.state.name),1)]),(0,i._)("div",B,[(0,i._)("div",null,'Game with id = "'+(0,y.zw)(s.state.game_id)+'"',1)]),(0,i._)("div",G,[(0,i.Wm)(o,{code:"code",type:"none"},{default:(0,i.w5)((()=>[(0,i.Uk)("Просто")])),_:1}),(0,i.Wm)(o,{code:"code",type:"type"},{default:(0,i.w5)((()=>[(0,i.Uk)("Я карта")])),_:1}),(0,i.Wm)(o,{code:"code",type:"type"},{default:(0,i.w5)((()=>[(0,i.Uk)("Я карта")])),_:1})])])):((0,i.wg)(),(0,i.iD)("div",L," Комната не найдена "))}const T={class:"title"};function F(e,t,n,a,s,c){return(0,i.wg)(),(0,i.iD)("div",{class:(0,y.C_)(["card",n.type]),"data-code":"{{ code }}"},[(0,i._)("div",T,[(0,i.WI)(e.$slots,"default",{},void 0,!0)])],2)}var H={name:"card",props:{type:String,code:String},computed:{img(){return this.image||this.code+".jpg"}}};const K=(0,v.Z)(H,[["render",F],["__scopeId","data-v-0c90f360"]]);var R=K,V={name:"Game",components:{Card:R},props:["game_id"],data(){return{state:_}}};const Y=(0,v.Z)(V,[["render",M]]);var J=Y;function Q(e,t){return(0,i.wg)(),(0,i.iD)("div",null,"Page not found")}const X={},ee=(0,v.Z)(X,[["render",Q]]);var te=ee;function ne(e,t,n,a,s,c){const o=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(o)}var ae={name:"App",components:{}};const se=(0,v.Z)(ae,[["render",ne]]);var ie=se;const ce=(0,s.p7)({history:(0,s.PO)(),routes:[{path:"/",component:b},{path:"/lobby/:game_id",component:U,props:!0},{path:"/game/",component:J},{path:"/:pathMatch(.*)*",component:te}]}),oe=(0,a.ri)(ie);oe.use(ce),oe.mount("#app")}},t={};function n(a){var s=t[a];if(void 0!==s)return s.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,a,s,i){if(!a){var c=1/0;for(d=0;d<e.length;d++){a=e[d][0],s=e[d][1],i=e[d][2];for(var o=!0,r=0;r<a.length;r++)(!1&i||c>=i)&&Object.keys(n.O).every((function(e){return n.O[e](a[r])}))?a.splice(r--,1):(o=!1,i<c&&(c=i));if(o){e.splice(d--,1);var l=s();void 0!==l&&(t=l)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[a,s,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var s,i,c=a[0],o=a[1],r=a[2],l=0;if(c.some((function(t){return 0!==e[t]}))){for(s in o)n.o(o,s)&&(n.m[s]=o[s]);if(r)var d=r(n)}for(t&&t(a);l<c.length;l++)i=c[l],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(d)},a=self["webpackChunkbunker"]=self["webpackChunkbunker"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(581)}));a=n.O(a)})();
//# sourceMappingURL=app.b4753d08.js.map