"use strict";(self.webpackChunkroblox_ts_com=self.webpackChunkroblox_ts_com||[]).push([[847],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),f=r,m=d["".concat(l,".").concat(f)]||d[f]||u[f]||i;return n?a.createElement(m,o(o({ref:t},c),{},{components:n})):a.createElement(m,o({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},78:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return u}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],s={title:"Functions"},l=void 0,p={unversionedId:"api/functions",id:"api/functions",title:"Functions",description:"assert()",source:"@site/docs/api/functions.mdx",sourceDirName:"api",slug:"/api/functions",permalink:"/docs/api/functions",draft:!1,editUrl:"https://github.com/roblox-ts/roblox-ts.com/blob/master/docs/api/functions.mdx",tags:[],version:"current",frontMatter:{title:"Functions"},sidebar:"docs",previous:{title:"Constructors",permalink:"/docs/api/constructors"},next:{title:"Utility Types",permalink:"/docs/api/utility-types"}},c={},u=[{value:"<code>assert()</code>",id:"assert",level:3},{value:"<code>typeOf()</code>",id:"typeof",level:3},{value:"<code>typeIs()</code>",id:"typeis",level:3},{value:"<code>classIs()</code>",id:"classis",level:3},{value:"<code>identity()</code>",id:"identity",level:3}],d={toc:u};function f(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"assert"},(0,i.kt)("inlineCode",{parentName:"h3"},"assert()")),(0,i.kt)("p",null,"roblox-ts's assert uses \"JavaScript truthiness\" for it's condition. This means that ",(0,i.kt)("inlineCode",{parentName:"p"},'""')," (empty string), ",(0,i.kt)("inlineCode",{parentName:"p"},"0"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"NaN")," values will cause the assertion to fail in addition to ",(0,i.kt)("inlineCode",{parentName:"p"},"undefined")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,i.kt)("p",null,"The reason for this is so that we can take advantage of TypeScript's ",(0,i.kt)("inlineCode",{parentName:"p"},"asserts value")," predicate feature."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'function foo(instance: Instance) {\n    assert(instance.IsA("Part"));\n    print(instance.Size); // instance _must_ be a Part to reach this line\n}\n')),(0,i.kt)("p",null,"Because of this change, ",(0,i.kt)("inlineCode",{parentName:"p"},"assert(0)")," or ",(0,i.kt)("inlineCode",{parentName:"p"},'assert("")')," will cause an error in roblox-ts, but not in Luau."),(0,i.kt)("h3",{id:"typeof"},(0,i.kt)("inlineCode",{parentName:"h3"},"typeOf()")),(0,i.kt)("p",null,'Unfortunately, TypeScript already has an operator named "typeof" in the form of ',(0,i.kt)("inlineCode",{parentName:"p"},"typeof x"),". Because of this, we cannot expose the Luau ",(0,i.kt)("inlineCode",{parentName:"p"},"typeof()")," function directly. To get around this, we compile ",(0,i.kt)("inlineCode",{parentName:"p"},"typeOf(value)")," into ",(0,i.kt)("inlineCode",{parentName:"p"},"typeof(value)"),"."),(0,i.kt)("h3",{id:"typeis"},(0,i.kt)("inlineCode",{parentName:"h3"},"typeIs()")),(0,i.kt)("p",null,"Checking types with ",(0,i.kt)("inlineCode",{parentName:"p"},"typeOf")," is usually not very useful with roblox-ts unless you need the string value that is returned. This is because TypeScript cannot infer that your if-statement confirmed the value was type checked:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'function foo(value: unknown) {\n    if (typeOf(value) === "Vector3") {\n        print(value.X); // error: value is still unknown!\n    }\n}\n')),(0,i.kt)("p",null,"To get around this, ",(0,i.kt)("inlineCode",{parentName:"p"},'typeIs(value, "type")')," compiles to ",(0,i.kt)("inlineCode",{parentName:"p"},'typeof(value) == "type"')," and helps TypeScript infer the value was type checked:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'function foo(value: unknown) {\n    if (typeIs(value, "Vector3")) {\n        print(value.X); // success!\n    }\n}\n')),(0,i.kt)("h3",{id:"classis"},(0,i.kt)("inlineCode",{parentName:"h3"},"classIs()")),(0,i.kt)("p",null,"Similar to ",(0,i.kt)("inlineCode",{parentName:"p"},"typeIs"),", ",(0,i.kt)("inlineCode",{parentName:"p"},'classIs(value, "ClassName")')," compiles to ",(0,i.kt)("inlineCode",{parentName:"p"},'value.ClassName == "ClassName"'),". This is useful for cases where you might want to avoid ",(0,i.kt)("inlineCode",{parentName:"p"},"instance.IsA()"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'function foo(value: Instance) {\n    // value.IsA("Script") would return true for LocalScripts!\n    if (classIs(value, "Script")) {\n        print(value.Name);\n    }\n}\n')),(0,i.kt)("h3",{id:"identity"},(0,i.kt)("inlineCode",{parentName:"h3"},"identity()")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"identity")," macro compiles to just the inner value you pass into it, allowing for a zero-cost type constraint abstraction. This is useful for verifying that a given value is the type you expect:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'interface MyInterface {\n    a: number;\n    b: string;\n    c: boolean;\n}\n\nconst objects = {\n    abc: identity<MyInterface>({\n        a: 123,\n        b: "abc",\n        c: true,\n    }),\n};\n')))}f.isMDXComponent=!0}}]);