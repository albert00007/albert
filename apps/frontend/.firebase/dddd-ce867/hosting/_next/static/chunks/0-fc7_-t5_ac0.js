(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,73627,e=>{"use strict";var s=e.i(29845),a=e.i(59199);e.s(["default",0,function(){let[e,i]=(0,a.useState)([]),[t,r]=(0,a.useState)(!0);return(0,a.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/graphql-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`
              query {
                inquiries {
                  id
                  name
                  email
                  phone
                  message
                  createdAt
                }
              }
            `})}),s=await e.json();s.data?.inquiries&&i(s.data.inquiries)}catch(e){console.error("Failed to fetch inquiries:",e)}finally{r(!1)}})()},[]),(0,s.jsxs)("div",{className:"space-y-6",children:[(0,s.jsx)("h1",{className:"text-3xl font-bold text-white mb-8",children:"Client Inquiries"}),t?(0,s.jsx)("div",{className:"text-gray-400 animate-pulse",children:"Loading inquiries..."}):0===e.length?(0,s.jsx)("div",{className:"text-gray-400",children:"No inquiries found."}):(0,s.jsx)("div",{className:"grid gap-6",children:e.map(e=>(0,s.jsxs)("div",{className:"card-base p-6",children:[(0,s.jsxs)("div",{className:"flex justify-between items-start mb-4 border-b border-white/10 pb-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"text-xl font-bold text-white",children:e.name}),(0,s.jsxs)("div",{className:"text-sm text-cyan-400 mt-1",children:[(0,s.jsx)("a",{href:`mailto:${e.email}`,className:"hover:underline mr-4",children:e.email}),(0,s.jsx)("a",{href:`tel:${e.phone}`,className:"hover:underline",children:e.phone})]})]}),(0,s.jsx)("span",{className:"text-xs text-gray-500",children:new Date(e.createdAt).toLocaleString()})]}),(0,s.jsx)("p",{className:"text-gray-300 whitespace-pre-wrap",children:e.message})]},e.id))})]})}])}]);