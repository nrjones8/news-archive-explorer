(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{35:function(e,t,a){e.exports=a(64)},40:function(e,t,a){},64:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),r=a(19),s=a.n(r),o=(a(40),a(33)),i=a(11),l=a(13),h=a(14),u=a(18),m=a(15),d=a(17),b=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return c.a.createElement("h1",null,"Why would anyone be interested in this")}}]),t}(n.Component),y=a(6),g=a(29),p=a(32),v=a.n(p),j=(a(58),["nytimes.com","washingtonpost.com","cnn.com","wsj.com","foxnews.com"]),w=new Date(2019,0,0),f=new Date,E=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleDayChange=a.handleDayChange.bind(Object(y.a)(Object(y.a)(a))),a.handleHourChange=a.handleHourChange.bind(Object(y.a)(Object(y.a)(a)));var n=v.a.parse(e.location.search);return a.state=a.getInitialState(n),a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"getInitialState",value:function(e){console.log(e);var t=new Date(2019,3,18),a=e.siteOne,n=e.siteTwo;return{leftWebsite:a&&j.includes(a)?a:"nytimes.com",rightWebsite:n&&j.includes(n)?n:"cnn.com",yearMonthDay:t,hour:12}}},{key:"handleDayChange",value:function(e){this.setState({yearMonthDay:e})}},{key:"handleHourChange",value:function(e){this.setState({hour:e.target.value})}},{key:"render",value:function(){return c.a.createElement("div",{className:"container mt-5"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("div",{className:"card-deck"},c.a.createElement(O,{website:this.state.leftWebsite,year:this.state.yearMonthDay.getFullYear(),month:this.state.yearMonthDay.getMonth()+1,day:this.state.yearMonthDay.getDate(),hour:this.state.hour}),c.a.createElement(O,{website:this.state.rightWebsite,year:this.state.yearMonthDay.getFullYear(),month:this.state.yearMonthDay.getMonth()+1,day:this.state.yearMonthDay.getDate(),hour:this.state.hour})))),c.a.createElement("div",{className:"row justify-content-md-center"},c.a.createElement("div",{className:"col col-md-auto"},c.a.createElement("h5",null,"Day"),c.a.createElement(g.a,{selected:this.state.yearMonthDay,onChange:this.handleDayChange,minDate:w,maxDate:f}),c.a.createElement("div",{id:"hourPicker"},c.a.createElement("input",{type:"range",min:"0",max:"23",value:this.state.hour,onChange:this.handleHourChange,step:"1"}),this.state.hour))))}}]),t}(n.Component);var O=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleWebsiteChange=a.handleWebsiteChange.bind(Object(y.a)(Object(y.a)(a))),a.state={websiteName:e.website},a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"handleWebsiteChange",value:function(e){this.setState({websiteName:e})}},{key:"render",value:function(){return c.a.createElement("div",{className:"card"},c.a.createElement("img",{className:"card-img-top",src:(e=this.state.websiteName,t=this.props.year,a=this.props.month,n=this.props.day,r=this.props.hour,"https://d1k37mkoj29puy.cloudfront.net/".concat(e,"/").concat(t,"/").concat(a,"/").concat(n,"/").concat(r,"/2/screenshot.png")),alt:"Card cap"}),c.a.createElement("div",{className:"card-body"},c.a.createElement("h5",{className:"card-title"},c.a.createElement(C,{website:this.state.websiteName,onWebsiteChange:this.handleWebsiteChange})),c.a.createElement("p",{className:"card-text"},c.a.createElement("small",{className:"text-muted"},"something here?"))));var e,t,a,n,r}}]),t}(n.Component),C=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleChange=a.handleChange.bind(Object(y.a)(Object(y.a)(a))),a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"handleChange",value:function(e){this.props.onWebsiteChange(e.target.value)}},{key:"render",value:function(){return c.a.createElement("form",null,c.a.createElement("label",null,"Website"),c.a.createElement("select",{className:"form-control",value:this.props.website,onChange:this.handleChange},j.map(function(e){return c.a.createElement("option",{value:e,key:e},e)})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(59),a(60);var D=c.a.createElement(o.a,null,c.a.createElement("div",null,c.a.createElement(i.a,{exact:!0,path:"/",component:E}),c.a.createElement(i.a,{exact:!0,path:"/about",component:b})));s.a.render(D,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[35,1,2]]]);
//# sourceMappingURL=main.1f9e1e2e.chunk.js.map