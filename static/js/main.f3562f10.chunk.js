(this["webpackJsonpexcel-discrepancies"]=this["webpackJsonpexcel-discrepancies"]||[]).push([[0],[,,,,,,,function(e,t){},,function(e,t,n){e.exports=n(23)},,,,,function(e,t,n){},,,,,,function(e,t){},function(e,t){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(8),i=n.n(r),o=(n(14),n(2)),s=n(1),c=n.n(s),u=(n(22),function(e){var t=/(\w+(?:,)? \w+).*/.exec(e);if(t)return t[1].trim()}),m=function(){var e=Object(a.useState)(null),t=Object(o.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)(null),s=Object(o.a)(i,2),m=s[0],f=s[1],d=Object(a.useState)(null),p=Object(o.a)(d,2),h=p[0],v=p[1],S=Object(a.useState)(null),b=Object(o.a)(S,2),E=b[0],w=b[1];return Object(a.useEffect)((function(){n&&m&&function(e,t){var n=t.filter((function(t){return!e.find((function(e){return null!=e.name&&t.name.includes(e.name)}))})),a=e.filter((function(e){return!t.find((function(t){return null!=t.name&&e.name.includes(t.name)}))})),l=t.map((function(t){var n=e.find((function(e){return null!=e.name&&t.name.includes(e.name.trim())}));return n&&n.total!==t.total?{name:t.name,qbTotal:n.total,srsTotal:t.total}:(n&&(n.total,t.total),null)})).filter(Boolean),r=c.a.utils.book_new(),i=c.a.utils.json_to_sheet(n),o=c.a.utils.json_to_sheet(a),s=c.a.utils.json_to_sheet(l);r.SheetNames=["Missing in QB","Missing in SRS","Same Name Different Total"],r.Sheets["Missing in QB"]=i,r.Sheets["Missing in SRS"]=o,r.Sheets["Same Name Different Total"]=s,c.a.writeFile(r,"out.xls")}(n,m)})),l.a.createElement("div",{className:"App"},l.a.createElement("header",{className:"App-header"},l.a.createElement("h1",null,"Difference Finder")),l.a.createElement("form",{onReset:function(){v(null),w(null),f(null),r(null)}},l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"cursor-pointer label-button",htmlFor:"srs-input"},"Select SRS Report",l.a.createElement("input",{id:"srs-input",type:"file",accept:"application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xls",className:"file-hidden",onChange:function(e){var t=e.target.files,n=new FileReader;n.addEventListener("load",(function(e){var t=new Uint8Array(e.target.result),n=c.a.read(t,{type:"array"}),a=c.a.utils.sheet_to_json(n.Sheets.Sheet1);a.pop(),f(a.map((function(e){var t;return{name:null===(t=e["Deceased Name"])||void 0===t?void 0:t.trim(),total:e["Total Due"]}})).filter((function(e){return null!=e.name})))})),v(t[0]),n.readAsArrayBuffer(t[0])}}))),l.a.createElement("div",{className:"field"},l.a.createElement("label",{className:"cursor-pointer label-button",htmlFor:"qb-input"},"Select QB Report",l.a.createElement("input",{id:"qb-input",type:"file",accept:"application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xls",className:"file-hidden",onChange:function(e){var t=e.target.files,n=new FileReader;n.addEventListener("load",(function(e){var t=new Uint8Array(e.target.result),n=c.a.read(t,{type:"array"}),a=c.a.utils.sheet_to_json(n.Sheets.Sheet1).map((function(e){return{name:u(e.__EMPTY_1),total:e.TOTAL}})).filter((function(e){return null!=e.name}));r(a)})),w(t[0]),n.readAsArrayBuffer(t[0])}}))),(h||E)&&l.a.createElement("button",{className:"btn-reset",type:"reset"},"Clear Files")),h&&l.a.createElement("p",null,"Loaded SRS Report: ".concat(h.name)),E&&l.a.createElement("p",null,"Loaded QB Report: ".concat(E.name)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(m,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.f3562f10.chunk.js.map