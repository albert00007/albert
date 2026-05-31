module.exports=[97821,a=>{"use strict";var b=a.i(86531),c=a.i(9644);a.s(["default",0,function(){let[a,d]=(0,c.useState)([]),[e,f]=(0,c.useState)(!0);return(0,c.useEffect)(()=>{(async()=>{try{let a=await fetch("/api/graphql-proxy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`
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
            `})}),b=await a.json();b.data?.inquiries&&d(b.data.inquiries)}catch(a){console.error("Failed to fetch inquiries:",a)}finally{f(!1)}})()},[]),(0,b.jsxs)("div",{className:"space-y-6",children:[(0,b.jsx)("h1",{className:"text-3xl font-bold text-white mb-8",children:"Client Inquiries"}),e?(0,b.jsx)("div",{className:"text-gray-400 animate-pulse",children:"Loading inquiries..."}):0===a.length?(0,b.jsx)("div",{className:"text-gray-400",children:"No inquiries found."}):(0,b.jsx)("div",{className:"grid gap-6",children:a.map(a=>(0,b.jsxs)("div",{className:"card-base p-6",children:[(0,b.jsxs)("div",{className:"flex justify-between items-start mb-4 border-b border-white/10 pb-4",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"text-xl font-bold text-white",children:a.name}),(0,b.jsxs)("div",{className:"text-sm text-cyan-400 mt-1",children:[(0,b.jsx)("a",{href:`mailto:${a.email}`,className:"hover:underline mr-4",children:a.email}),(0,b.jsx)("a",{href:`tel:${a.phone}`,className:"hover:underline",children:a.phone})]})]}),(0,b.jsx)("span",{className:"text-xs text-gray-500",children:new Date(a.createdAt).toLocaleString()})]}),(0,b.jsx)("p",{className:"text-gray-300 whitespace-pre-wrap",children:a.message})]},a.id))})]})}])}];

//# sourceMappingURL=apps_frontend_src_app_admin_%28protected%29_inquiries_page_tsx_0nas1e7._.js.map