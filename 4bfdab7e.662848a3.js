(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{100:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),u=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),p=u(n),b=r,d=p["".concat(l,".").concat(b)]||p[b]||f[b]||a;return n?o.a.createElement(d,i(i({ref:t},s),{},{components:n})):o.a.createElement(d,i({ref:t},s))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,l=new Array(a);l[0]=b;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var s=2;s<a;s++)l[s]=n[s];return o.a.createElement.apply(null,l)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},78:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return u}));var r=n(3),o=n(7),a=(n(0),n(100)),l={id:"usage",title:"Usage"},i={unversionedId:"usage",id:"usage",isDocsHomePage:!1,title:"Usage",description:"The following is a reference for how to use the roblox-ts command line interface.",source:"@site/docs/usage.mdx",slug:"/usage",permalink:"/docs/usage",editUrl:"https://github.com/roblox-ts/roblox-ts.github.io/blob/master/docs/usage.mdx",version:"current",sidebar:"docs",previous:{title:"Quick Start",permalink:"/docs/quick-start"},next:{title:"Setup Guide",permalink:"/docs/setup-guide"}},c=[],s={toc:c};function u(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"The following is a reference for how to use the roblox-ts command line interface."),Object(a.b)("p",null,"This can be displayed with ",Object(a.b)("inlineCode",{parentName:"p"},"rbxtsc --help"),"."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{}),'roblox-ts - A TypeScript-to-Luau Compiler for Roblox\n\nCommands:\n  rbxtsc build  Build a project  [default]\n  rbxtsc init   Create a project from a template\n\nOptions:\n  -p, --project           project path  [string] [default: "."]\n  -w, --watch             enable watch mode  [boolean] [default: false]\n      --usePolling        use polling for watch mode  [boolean] [default: false]\n      --verbose           enable verbose logs  [boolean] [default: false]\n      --noInclude         do not copy include files  [boolean] [default: false]\n      --logStringChanges  logs changes to legacy string argument offsets  [boolean] [default: false]\n      --logTruthyChanges  logs changes to truthiness evaluation from Lua truthiness rules  [boolean] [default: false]\n      --writeOnlyChanged  [boolean] [default: false]\n      --type              override project type  [choices: "game", "model", "package"]\n  -i, --includePath       folder to copy runtime files to  [string]\n      --rojo              manually select Rojo project file  [string]\n  -h, --help              show help information  [boolean]\n  -v, --version           show version information  [boolean]\n')))}u.isMDXComponent=!0}}]);