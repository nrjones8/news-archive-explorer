(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{38:function(e,t,a){e.exports=a(71)},43:function(e,t,a){},66:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(19),i=a.n(s),o=(a(43),a(36)),c=a(16),l=a(11),h=a(12),m=a(15),u=a(13),b=a(14),d=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("h1",null,"Why would anyone be interested in this")}}]),t}(n.Component),y=a(6),p=a(30),g=a(33),v=a.n(g),f=a(34),w=a.n(f),j=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-primary"},r.a.createElement("a",{className:"navbar-brand",href:"#"},"News Homepage Archive"))}}]),t}(n.Component),O=a(35),E="washingtonpost.com",D=["nytimes.com",E,"cnn.com","wsj.com","foxnews.com"];a(64),a(65),a(66);var k=new Date(2019,0,0),N=new Date(2019,3,21),C=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleDayChange=a.handleDayChange.bind(Object(y.a)(Object(y.a)(a))),a.handleAnimationToggle=a.handleAnimationToggle.bind(Object(y.a)(Object(y.a)(a)));var n=v.a.parse(e.location.search);return a.state=a.getInitialState(n),a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"getInitialState",value:function(e){var t=e.siteOne,a=e.siteTwo,n=t&&D.includes(t)?t:"nytimes.com",r=a&&D.includes(a)?a:"cnn.com",s=parseInt(e.year),i=parseInt(e.month)-1,o=parseInt(e.day),c=parseInt(e.hour),l=new Date(s||2019,i||2,o||26,c||13);return{leftWebsite:n,rightWebsite:r,yearMonthDay:l&&l>k&&l<=N?l:new Date(2019,2,26,13),isAnimating:!1,animationButtonText:"Animate",timer:null}}},{key:"handleDayChange",value:function(e){this.setState({yearMonthDay:e})}},{key:"handleAnimationToggle",value:function(e){var t=this;if(this.state.isAnimating)this.setState({isAnimating:!1,animationButtonText:"Animate"}),clearInterval(this.state.timer);else{var a=setInterval(function(){return t.incrementTime()},1500);this.setState({isAnimating:!0,animationButtonText:"Pause",timer:a})}}},{key:"incrementTime",value:function(){var e=w()(this.state.yearMonthDay).add(1,"days").toDate();this.setState({yearMonthDay:e})}},{key:"generateDeeplink",value:function(){}},{key:"render",value:function(){return r.a.createElement("div",{className:"App-wrapper"},r.a.createElement(j,null),r.a.createElement("div",{className:"container mt-5"},r.a.createElement("div",{className:"form-row justify-content-md-center"},r.a.createElement(p.a,{selected:this.state.yearMonthDay,onChange:this.handleDayChange,showTimeSelect:!0,dateFormat:"MMMM d, yyyy ha",timeFormat:"HH",timeIntervals:60,minDate:k,maxDate:N,className:"form-control"}),r.a.createElement("div",{className:"px-2"},r.a.createElement("button",{onClick:this.handleAnimationToggle,type:"button",className:"btn btn-primary"},this.state.animationButtonText))),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"card-deck"},r.a.createElement(M,{website:this.state.leftWebsite,year:this.state.yearMonthDay.getFullYear(),month:this.state.yearMonthDay.getMonth()+1,day:this.state.yearMonthDay.getDate(),hour:this.state.yearMonthDay.getHours()}),r.a.createElement(M,{website:this.state.rightWebsite,year:this.state.yearMonthDay.getFullYear(),month:this.state.yearMonthDay.getMonth()+1,day:this.state.yearMonthDay.getDate(),hour:this.state.yearMonthDay.getHours()}))))))}}]),t}(n.Component);var M=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleWebsiteChange=a.handleWebsiteChange.bind(Object(y.a)(Object(y.a)(a))),a.state={websiteName:e.website},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"handleWebsiteChange",value:function(e){this.setState({websiteName:e})}},{key:"render",value:function(){return r.a.createElement("div",{className:"card App-card"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},r.a.createElement(x,{website:this.state.websiteName,onWebsiteChange:this.handleWebsiteChange})),r.a.createElement("p",{className:"card-text"},r.a.createElement("small",{className:"text-muted"},(i=this.state.websiteName,Object(O.a)({},E,"For large parts of January and February 2019, screenshots failed only for washingtonpost.com. You may see a higher rate of blank screenshots during this period.")[i])))),r.a.createElement("img",{className:"card-img-top",src:(e=this.state.websiteName,t=this.props.year,a=this.props.month,n=this.props.day,s=this.props.hour,"https://d1k37mkoj29puy.cloudfront.net/".concat(e,"/").concat(t,"/").concat(a,"/").concat(n,"/").concat(s,"/2/screenshot.jpeg")),alt:"Screenshot of ".concat(this.state.websiteName," taken on ").concat(this.props.year,"-").concat(this.props.month,"-").concat(this.props.day,", ").concat(this.props.hour," hours")}));var e,t,a,n,s,i}}]),t}(n.Component),x=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleChange=a.handleChange.bind(Object(y.a)(Object(y.a)(a))),a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"handleChange",value:function(e){this.props.onWebsiteChange(e.target.value)}},{key:"render",value:function(){return r.a.createElement("form",null,r.a.createElement("label",null,"Website"),r.a.createElement("select",{className:"form-control",value:this.props.website,onChange:this.handleChange},D.map(function(e){return r.a.createElement("option",{value:e,key:e},e)})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(67);var W=r.a.createElement(o.a,{basename:"/news-archive-explorer"},r.a.createElement("div",null,r.a.createElement(c.a,{exact:!0,path:"/",component:C}),r.a.createElement(c.a,{exact:!0,path:"/about",component:d})));i.a.render(W,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[38,1,2]]]);
//# sourceMappingURL=main.5268729c.chunk.js.map