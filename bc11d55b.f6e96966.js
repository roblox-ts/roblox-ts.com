(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{100:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var b=r.a.createContext({}),s=function(e){var t=r.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return r.a.createElement(b.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,l=e.parentName,b=o(e,["components","mdxType","originalType","parentName"]),p=s(n),u=a,m=p["".concat(l,".").concat(u)]||p[u]||d[u]||c;return n?r.a.createElement(m,i(i({ref:t},b),{},{components:n})):r.a.createElement(m,i({ref:t},b))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,l=new Array(c);l[0]=u;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var b=2;b<c;b++)l[b]=n[b];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},88:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return o})),n.d(t,"default",(function(){return s}));var a=n(3),r=n(7),c=(n(0),n(100)),l={id:"utility-types",title:"Utility Types"},i={unversionedId:"api/utility-types",id:"api/utility-types",isDocsHomePage:!1,title:"Utility Types",description:"_",source:"@site/docs/api/utility-types.mdx",slug:"/api/utility-types",permalink:"/docs/api/utility-types",editUrl:"https://github.com/roblox-ts/roblox-ts.github.io/blob/master/docs/api/utility-types.mdx",version:"current",sidebar:"docs",previous:{title:"Functions",permalink:"/docs/api/functions"},next:{title:"Callbacks vs Methods",permalink:"/docs/guides/callbacks-vs-methods"}},o=[{value:"<code>_&lt;T&gt;</code>",id:"_t",children:[]},{value:"<code>Partial&lt;T&gt;</code>",id:"partialt",children:[]},{value:"<code>Required&lt;T&gt;</code>",id:"requiredt",children:[]},{value:"<code>Readonly&lt;T&gt;</code>",id:"readonlyt",children:[]},{value:"<code>Writable&lt;T&gt;</code>",id:"writablet",children:[]},{value:"<code>Pick&lt;T, K&gt;</code>",id:"pickt-k",children:[]},{value:"<code>Omit&lt;T, K&gt;</code>",id:"omitt-k",children:[]},{value:"<code>Record&lt;K, T&gt;</code>",id:"recordk-t",children:[]},{value:"<code>Exclude&lt;T, U&gt;</code>",id:"excludet-u",children:[]},{value:"<code>Extract&lt;T, U&gt;</code>",id:"extractt-u",children:[]},{value:"<code>ExtractKeys&lt;T, U&gt;</code>",id:"extractkeyst-u",children:[]},{value:"<code>ExtractMembers&lt;T, U&gt;</code>",id:"extractmemberst-u",children:[]},{value:"<code>ExcludeKeys&lt;T, U&gt;</code>",id:"excludekeyst-u",children:[]},{value:"<code>ExcludeMembers&lt;T, U&gt;</code>",id:"excludememberst-u",children:[]},{value:"<code>NonNullable&lt;T&gt;</code>",id:"nonnullablet",children:[]},{value:"<code>Parameters&lt;T&gt;</code>",id:"parameterst",children:[]},{value:"<code>ConstructorParameters&lt;T&gt;</code>",id:"constructorparameterst",children:[]},{value:"<code>ReturnType&lt;T&gt;</code>",id:"returntypet",children:[]},{value:"<code>InstanceType&lt;T&gt;</code>",id:"instancetypet",children:[]},{value:"<code>Reconstruct&lt;T&gt;</code>",id:"reconstructt",children:[]},{value:"<code>UnionToIntersection&lt;T&gt;</code>",id:"uniontointersectiont",children:[]},{value:"<code>ThisParameterType&lt;T&gt;</code>",id:"thisparametertypet",children:[]},{value:"<code>OmitThisParameter&lt;T&gt;</code>",id:"omitthisparametert",children:[]},{value:"<code>WritablePropertyNames&lt;T&gt;</code>",id:"writablepropertynamest",children:[]},{value:"<code>WritableProperties&lt;T&gt;</code>",id:"writablepropertiest",children:[]},{value:"<code>InstancePropertyNames&lt;T&gt;</code>",id:"instancepropertynamest",children:[]},{value:"<code>InstanceMethodNames&lt;T&gt;</code>",id:"instancemethodnamest",children:[]},{value:"<code>InstanceEventNames&lt;T&gt;</code>",id:"instanceeventnamest",children:[]},{value:"<code>InstanceProperties&lt;T&gt;</code>",id:"instancepropertiest",children:[]},{value:"<code>InstanceMethods&lt;T&gt;</code>",id:"instancemethodst",children:[]},{value:"<code>InstanceEvents&lt;T&gt;</code>",id:"instanceeventst",children:[]},{value:"<code>WritableInstanceProperties&lt;T&gt;</code>",id:"writableinstancepropertiest",children:[]},{value:"<code>ExcludeNominalMembers&lt;T&gt;</code>",id:"excludenominalmemberst",children:[]}],b={toc:o};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(a.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h3",{id:"_t"},Object(c.b)("inlineCode",{parentName:"h3"},"_<T>")),Object(c.b)("p",null,"Placeholder that sometimes helps force TS to display what you want it to."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type _<T> = T;\n")),Object(c.b)("h3",{id:"partialt"},Object(c.b)("inlineCode",{parentName:"h3"},"Partial<T>")),Object(c.b)("p",null,"Make all properties in T optional"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Partial<T> = { [P in keyof T]?: T[P] };\n")),Object(c.b)("h3",{id:"requiredt"},Object(c.b)("inlineCode",{parentName:"h3"},"Required<T>")),Object(c.b)("p",null,"Make all properties in T required"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Required<T> = { [P in keyof T]-?: T[P] };\n")),Object(c.b)("h3",{id:"readonlyt"},Object(c.b)("inlineCode",{parentName:"h3"},"Readonly<T>")),Object(c.b)("p",null,"Make all properties in T readonly"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Readonly<T> = { readonly [P in keyof T]: T[P] };\n")),Object(c.b)("h3",{id:"writablet"},Object(c.b)("inlineCode",{parentName:"h3"},"Writable<T>")),Object(c.b)("p",null,"Make all properties in T non-readonly."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Writable<T> = { -readonly [P in keyof T]: T[P] };\n")),Object(c.b)("h3",{id:"pickt-k"},Object(c.b)("inlineCode",{parentName:"h3"},"Pick<T, K>")),Object(c.b)("p",null,"From T pick a set of properties K"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Pick<T, K extends keyof T> = { [P in K]: T[P] };\n")),Object(c.b)("h3",{id:"omitt-k"},Object(c.b)("inlineCode",{parentName:"h3"},"Omit<T, K>")),Object(c.b)("p",null,"Returns a subset of type T which excludes properties K"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;\n")),Object(c.b)("h3",{id:"recordk-t"},Object(c.b)("inlineCode",{parentName:"h3"},"Record<K, T>")),Object(c.b)("p",null,"Construct a type with a set of properties K of type T"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Record<K extends keyof any, T> = { [P in K]: T };\n")),Object(c.b)("h3",{id:"excludet-u"},Object(c.b)("inlineCode",{parentName:"h3"},"Exclude<T, U>")),Object(c.b)("p",null,"Exclude from T those types that are assignable to U"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Exclude<T, U> = T extends U ? never : T;\n")),Object(c.b)("h3",{id:"extractt-u"},Object(c.b)("inlineCode",{parentName:"h3"},"Extract<T, U>")),Object(c.b)("p",null,"Extract from T those types that are assignable to U"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Extract<T, U> = T extends U ? T : never;\n")),Object(c.b)("h3",{id:"extractkeyst-u"},Object(c.b)("inlineCode",{parentName:"h3"},"ExtractKeys<T, U>")),Object(c.b)("p",null,"Returns a union of all the keys of T whose values extend from U"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type ExtractKeys<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];\n")),Object(c.b)("h3",{id:"extractmemberst-u"},Object(c.b)("inlineCode",{parentName:"h3"},"ExtractMembers<T, U>")),Object(c.b)("p",null,"Returns a new object type of all the keys of T whose values extend from U"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type ExtractMembers<T, U> = Pick<T, ExtractKeys<T, U>>;\n")),Object(c.b)("h3",{id:"excludekeyst-u"},Object(c.b)("inlineCode",{parentName:"h3"},"ExcludeKeys<T, U>")),Object(c.b)("p",null,"Returns a union of all the keys of T whose values do not extend from U"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type ExcludeKeys<T, U> = { [K in keyof T]: T[K] extends U ? never : K }[keyof T];\n")),Object(c.b)("h3",{id:"excludememberst-u"},Object(c.b)("inlineCode",{parentName:"h3"},"ExcludeMembers<T, U>")),Object(c.b)("p",null,"Returns a new object type of all the keys of T whose values do not extend from U"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type ExcludeMembers<T, U> = Pick<T, ExcludeKeys<T, U>>;\n")),Object(c.b)("h3",{id:"nonnullablet"},Object(c.b)("inlineCode",{parentName:"h3"},"NonNullable<T>")),Object(c.b)("p",null,"Exclude null and undefined from T"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type NonNullable<T> = unknown extends T ? defined : T extends null | undefined ? never : T;\n")),Object(c.b)("h3",{id:"parameterst"},Object(c.b)("inlineCode",{parentName:"h3"},"Parameters<T>")),Object(c.b)("p",null,"Obtain the parameters of a function type in a ",Object(c.b)("inlineCode",{parentName:"p"},"tuple | never"),"."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;\n")),Object(c.b)("h3",{id:"constructorparameterst"},Object(c.b)("inlineCode",{parentName:"h3"},"ConstructorParameters<T>")),Object(c.b)("p",null,"Obtain the parameters of a constructor function type in a ",Object(c.b)("inlineCode",{parentName:"p"},"tuple | never")),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;\n")),Object(c.b)("h3",{id:"returntypet"},Object(c.b)("inlineCode",{parentName:"h3"},"ReturnType<T>")),Object(c.b)("p",null,"Obtain the return type of a function type"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type ReturnType<T extends (...args: Array<any>) => any> = T extends (...args: Array<any>) => infer R ? R : any;\n")),Object(c.b)("h3",{id:"instancetypet"},Object(c.b)("inlineCode",{parentName:"h3"},"InstanceType<T>")),Object(c.b)("p",null,"Obtain the return type of a constructor function type"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type InstanceType<T extends new (...args: Array<any>) => any> = T extends new (...args: Array<any>) => infer R\n    ? R\n    : any;\n")),Object(c.b)("h3",{id:"reconstructt"},Object(c.b)("inlineCode",{parentName:"h3"},"Reconstruct<T>")),Object(c.b)("p",null,"Combines a series of intersections into one object, e.g. { x: number } & { y: number } becomes { x: number, y: number }"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type Reconstruct<T> = _<{ [K in keyof T]: T[K] }>;\n")),Object(c.b)("h3",{id:"uniontointersectiont"},Object(c.b)("inlineCode",{parentName:"h3"},"UnionToIntersection<T>")),Object(c.b)("p",null,"Converts a series of object unions to a series of intersections, e.g. A | B becomes A & B"),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type UnionToIntersection<T> = (T extends object ? (k: T) => void : never) extends (k: infer U) => void ? U : never;\n")),Object(c.b)("h3",{id:"thisparametertypet"},Object(c.b)("inlineCode",{parentName:"h3"},"ThisParameterType<T>")),Object(c.b)("p",null,"Extracts the type of the 'this' parameter of a function type, or 'unknown' if the function type has no 'this' parameter."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type ThisParameterType<T> = T extends (this: infer U, ...args: Array<any>) => any ? U : unknown;\n")),Object(c.b)("h3",{id:"omitthisparametert"},Object(c.b)("inlineCode",{parentName:"h3"},"OmitThisParameter<T>")),Object(c.b)("p",null,"Removes the 'this' parameter from a function type."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type OmitThisParameter<T> = unknown extends ThisParameterType<T>\n    ? T\n    : T extends (...args: infer A) => infer R\n    ? (...args: A) => R\n    : T;\n")),Object(c.b)("h3",{id:"writablepropertynamest"},Object(c.b)("inlineCode",{parentName:"h3"},"WritablePropertyNames<T>")),Object(c.b)("p",null,"Given an object ",Object(c.b)("inlineCode",{parentName:"p"},"T"),", returns a unioned type of all non-readonly property names."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type WritablePropertyNames<T> = {\n    [K in keyof T]-?: T[K] extends Callback\n        ? never\n        : (<F>() => F extends { [Q in K]: T[K] } ? 1 : 2) extends <F>() => F extends {\n                -readonly [Q in K]: T[K];\n          }\n                ? 1\n                : 2\n        ? K\n        : never;\n}[keyof T];\n")),Object(c.b)("h3",{id:"writablepropertiest"},Object(c.b)("inlineCode",{parentName:"h3"},"WritableProperties<T>")),Object(c.b)("p",null,"Given an object ",Object(c.b)("inlineCode",{parentName:"p"},"T"),", returns an object with readonly fields filtered out."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type WritableProperties<T> = Pick<T, WritablePropertyNames<T>>;\n")),Object(c.b)("h3",{id:"instancepropertynamest"},Object(c.b)("inlineCode",{parentName:"h3"},"InstancePropertyNames<T>")),Object(c.b)("p",null,"Given an Instance ",Object(c.b)("inlineCode",{parentName:"p"},"T"),", returns a unioned type of all property names."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type InstancePropertyNames<T extends Instance> = ExcludeKeys<T, RBXScriptSignal | Callback | symbol>;\n")),Object(c.b)("h3",{id:"instancemethodnamest"},Object(c.b)("inlineCode",{parentName:"h3"},"InstanceMethodNames<T>")),Object(c.b)("p",null,"Given an Instance ",Object(c.b)("inlineCode",{parentName:"p"},"T"),", returns a unioned type of all method names."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type InstanceMethodNames<T extends Instance> = ExtractKeys<T, Callback>;\n")),Object(c.b)("h3",{id:"instanceeventnamest"},Object(c.b)("inlineCode",{parentName:"h3"},"InstanceEventNames<T>")),Object(c.b)("p",null,"Given an Instance ",Object(c.b)("inlineCode",{parentName:"p"},"T"),", returns a unioned type of all event names."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type InstanceEventNames<T extends Instance> = ExtractKeys<T, RBXScriptSignal>;\n")),Object(c.b)("h3",{id:"instancepropertiest"},Object(c.b)("inlineCode",{parentName:"h3"},"InstanceProperties<T>")),Object(c.b)("p",null,"Given an Instance ",Object(c.b)("inlineCode",{parentName:"p"},"T"),", returns an object with only properties."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type InstanceProperties<T extends Instance> = Pick<T, InstancePropertyNames<T>>;\n")),Object(c.b)("h3",{id:"instancemethodst"},Object(c.b)("inlineCode",{parentName:"h3"},"InstanceMethods<T>")),Object(c.b)("p",null,"Given an Instance ",Object(c.b)("inlineCode",{parentName:"p"},"T"),", returns an object with only methods."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type InstanceMethods<T extends Instance> = Pick<T, InstanceMethodNames<T>>;\n")),Object(c.b)("h3",{id:"instanceeventst"},Object(c.b)("inlineCode",{parentName:"h3"},"InstanceEvents<T>")),Object(c.b)("p",null,"Given an Instance ",Object(c.b)("inlineCode",{parentName:"p"},"T"),", returns an object with only events."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type InstanceEvents<T extends Instance> = Pick<T, InstanceEventNames<T>>;\n")),Object(c.b)("h3",{id:"writableinstancepropertiest"},Object(c.b)("inlineCode",{parentName:"h3"},"WritableInstanceProperties<T>")),Object(c.b)("p",null,"Given an Instance ",Object(c.b)("inlineCode",{parentName:"p"},"T"),", returns an object with readonly fields, methods, and events filtered out."),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type WritableInstanceProperties<T extends Instance> = WritableProperties<InstanceProperties<T>>;\n")),Object(c.b)("h3",{id:"excludenominalmemberst"},Object(c.b)("inlineCode",{parentName:"h3"},"ExcludeNominalMembers<T>")),Object(c.b)("p",null,"Returns a new object type of all the keys of T which do not start with ",Object(c.b)("inlineCode",{parentName:"p"},"_nominal_")),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"type ExcludeNominalMembers<T> = Pick<T, ExcludeNominalKeys<T>>;\n")))}s.isMDXComponent=!0}}]);