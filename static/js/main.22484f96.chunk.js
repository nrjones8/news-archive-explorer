(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,t,a){e.exports=a(39)},28:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(8),c=a.n(r),o=(a(28),a(13)),i=a(14),h=a(17),l=a(15),m=a(16),u=a(4),d=a(19),b=(a(35),["nytimes.com","washingtonpost.com","cnn.com","wsj.com","foxnews.com"]),y=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(h.a)(this,Object(l.a)(t).call(this,e))).handleDayChange=a.handleDayChange.bind(Object(u.a)(Object(u.a)(a))),a.handleHourChange=a.handleHourChange.bind(Object(u.a)(Object(u.a)(a)));var n=new Date(2019,3,18);return a.state={leftWebsite:"nytimes.com",rightWebsite:"foxnews.com",year:2019,month:4,day:18,yearMonthDay:n,hour:12},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"handleDayChange",value:function(e){this.setState({yearMonthDay:e})}},{key:"handleHourChange",value:function(e){this.setState({hour:e.target.value})}},{key:"render",value:function(){return s.a.createElement("div",{className:"container mt-5"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("div",{className:"card-deck"},s.a.createElement(g,{website:this.state.leftWebsite,year:this.state.yearMonthDay.getFullYear(),month:this.state.yearMonthDay.getMonth()+1,day:this.state.yearMonthDay.getDate(),hour:this.state.hour}),s.a.createElement(g,{website:this.state.rightWebsite,year:this.state.yearMonthDay.getFullYear(),month:this.state.yearMonthDay.getMonth()+1,day:this.state.yearMonthDay.getDate(),hour:this.state.hour})))),s.a.createElement("div",{className:"row justify-content-md-center"},s.a.createElement("div",{className:"col col-md-auto"},s.a.createElement("h5",null,"Day"),s.a.createElement(d.a,{selected:this.state.yearMonthDay,onChange:this.handleDayChange,minDate:new Date(2019,0,0),maxDate:new Date}),s.a.createElement("div",{id:"hourPicker"},s.a.createElement("input",{type:"range",min:"0",max:"23",value:this.state.hour,onChange:this.handleHourChange,step:"1"}),this.state.hour))))}}]),t}(n.Component);var g=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(h.a)(this,Object(l.a)(t).call(this,e))).handleWebsiteChange=a.handleWebsiteChange.bind(Object(u.a)(Object(u.a)(a))),a.state={websiteName:e.website},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"handleWebsiteChange",value:function(e){this.setState({websiteName:e})}},{key:"render",value:function(){return s.a.createElement("div",{className:"card"},s.a.createElement("img",{className:"card-img-top",src:(e=this.state.websiteName,t=this.props.year,a=this.props.month,n=this.props.day,r=this.props.hour,"https://d1k37mkoj29puy.cloudfront.net/".concat(e,"/").concat(t,"/").concat(a,"/").concat(n,"/").concat(r,"/2/screenshot.png")),alt:"Card cap"}),s.a.createElement("div",{className:"card-body"},s.a.createElement("h5",{className:"card-title"},s.a.createElement(p,{website:this.state.websiteName,onWebsiteChange:this.handleWebsiteChange})),s.a.createElement("p",{className:"card-text"},s.a.createElement("small",{className:"text-muted"},"something here?"))));var e,t,a,n,r}}]),t}(n.Component),p=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(h.a)(this,Object(l.a)(t).call(this,e))).handleChange=a.handleChange.bind(Object(u.a)(Object(u.a)(a))),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){this.props.onWebsiteChange(e.target.value)}},{key:"render",value:function(){return s.a.createElement("form",null,s.a.createElement("label",null,"Select website:",s.a.createElement("select",{value:this.props.website,onChange:this.handleChange},b.map(function(e){return s.a.createElement("option",{value:e,key:e},e)}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(36),a(37);c.a.render(s.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[23,1,2]]]);
//# sourceMappingURL=main.22484f96.chunk.js.map