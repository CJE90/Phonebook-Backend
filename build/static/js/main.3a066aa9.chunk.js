(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,n,t){"use strict";t.r(n);var c=t(16),r=t.n(c),a=t(4),o=t(2),i=t(3),u=t.n(i),l=t(0),s=function(e){var n=e.handleChange;return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{children:["search by: ",Object(l.jsx)("input",{onChange:n})]})})},h=function(e){var n=e.handleSubmit,t=e.handleNumberChange,c=e.handleNameChange,r=e.newName,a=e.newNumber;return Object(l.jsxs)("form",{onSubmit:n,children:[Object(l.jsxs)("div",{children:["name: ",Object(l.jsx)("input",{onChange:c,value:r})]}),Object(l.jsxs)("div",{children:["number: ",Object(l.jsx)("input",{onChange:t,value:a})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.handleClick,t=e.person;return Object(l.jsx)("div",{children:Object(l.jsxs)("p",{children:[t.name," ",t.number," ",Object(l.jsx)("button",{onClick:function(){return n(t.name,t.id)},children:"Delete"})]})})},d=function(e){var n=e.persons,t=e.listFilter,c=e.handleClick;return n.filter((function(e){return e.name.toUpperCase().startsWith(t.toUpperCase())})).map((function(e){return Object(l.jsx)(b,{person:e,handleClick:c},e.name)}))},j="/api/people",f=function(){return u.a.get(j).then((function(e){return e.data}))},m=function(e){return u.a.post(j,e).then((function(e){return e.data}))},O=function(e,n){return u.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return u.a.delete("".concat(j,"/").concat(e)).then((function(e){return e.data}))},g=function(){var e=Object(o.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],r=Object(o.useState)(""),i=Object(a.a)(r,2),u=i[0],b=i[1],j=Object(o.useState)(""),g=Object(a.a)(j,2),v=g[0],x=g[1],C=Object(o.useState)(""),w=Object(a.a)(C,2),k=w[0],N=w[1];Object(o.useEffect)((function(){console.log("effect"),f().then((function(e){console.log("Promise fulfilled"),c(e)}))}),[]);return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Phonebook"}),Object(l.jsx)(s,{handleChange:function(e){console.log(e.target.value),N(e.target.value)}}),Object(l.jsx)("h2",{children:"Add a new entry"}),Object(l.jsx)(h,{handleSubmit:function(e){e.preventDefault();var n={name:u,number:v},r=t.find((function(e){return e.name===n.name}));r?window.confirm("".concat(n.name,"'s number is already in the phonebook. Do you want to replace this number?'"))&&O(r.id,n).then((function(e){c(t.map((function(n){return n.id!==r.id?n:e})))})):m(n).then((function(e){c(e)}));b(""),x("")},handleNameChange:function(e){console.log(e.target.value),b(e.target.value)},handleNumberChange:function(e){console.log(e.target.value),x(e.target.value)},newName:u,newNumber:v}),Object(l.jsx)("h2",{children:"Numbers"}),Object(l.jsx)(d,{persons:t,listFilter:k,handleClick:function(e,n){window.confirm("Delete ".concat(e,"?"))&&p(n).then((function(e){c(t.filter((function(e){return e.id!==n})))}))}})]})};r.a.render(Object(l.jsx)(g,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.3a066aa9.chunk.js.map