"use strict";(self.webpackChunkroblox_ts=self.webpackChunkroblox_ts||[]).push([[112],{6500:(e,o,t)=>{t.r(o),t.d(o,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>a});var n=t(7624),i=t(2172);const r={title:"Setup Guide"},s=void 0,c={id:"setup-guide",title:"Setup Guide",description:"- Familiarity with the command line. You can find tutorials on YouTube for Windows or MacOS",source:"@site/docs/setup-guide.mdx",sourceDirName:".",slug:"/setup-guide",permalink:"/docs/setup-guide",draft:!1,unlisted:!1,editUrl:"https://github.com/roblox-ts/roblox-ts.com/blob/master/docs/setup-guide.mdx",tags:[],version:"current",frontMatter:{title:"Setup Guide"},sidebar:"docs",previous:{title:"Usage",permalink:"/docs/usage"},next:{title:"FAQ",permalink:"/docs/faq"}},l={},a=[{value:"Project Setup",id:"project-setup",level:2},{value:"Running Your Code",id:"running-your-code",level:2}];function d(e){const o={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.M)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.admonition,{title:"Prerequisites",type:"info",children:(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsxs)(o.li,{children:["Familiarity with the command line. You can find tutorials on YouTube for ",(0,n.jsx)(o.a,{href:"https://www.youtube.com/watch?v=FiTZgpRpWv0",children:"Windows"})," or ",(0,n.jsx)(o.a,{href:"https://www.youtube.com/watch?v=aKRYQsKR46I",children:"MacOS"})]}),"\n",(0,n.jsx)(o.li,{children:(0,n.jsx)(o.a,{href:"https://nodejs.org/",children:"NodeJS 18+"})}),"\n",(0,n.jsxs)(o.li,{children:["A code editor such as ",(0,n.jsx)(o.a,{href:"https://code.visualstudio.com/",children:"VSCode"})]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.a,{href:"https://rojo.space/",children:"Rojo 7+"})," which can be installed through the ",(0,n.jsx)(o.a,{href:"https://marketplace.visualstudio.com/items?itemName=evaera.vscode-rojo",children:"Rojo VSCode plugin"}),"."]}),"\n"]})}),"\n",(0,n.jsxs)(o.admonition,{title:"PowerShell",type:"caution",children:[(0,n.jsx)(o.p,{children:'If you\'re using PowerShell for the first time, you may get an error about "running scripts is disabled on this system". You can fix this by running the following in PowerShell as an administrator:'}),(0,n.jsx)(o.p,{children:(0,n.jsx)(o.code,{children:"Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser"})}),(0,n.jsx)(o.p,{children:(0,n.jsx)(o.a,{href:"/docs/articles/powershell",children:"More info here"})})]}),"\n",(0,n.jsx)(o.h2,{id:"project-setup",children:"Project Setup"}),"\n",(0,n.jsx)(o.p,{children:"In this guide, we will introduce how to create a roblox-ts game."}),"\n",(0,n.jsx)(o.p,{children:"Make sure you have an up-to-date version of Node.js installed and your current working directory is an empty folder that you intend to create your project in. Run the following command in your command line:"}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-bash",metastring:'title="Terminal"',children:"npm init roblox-ts\n"})}),"\n",(0,n.jsx)(o.p,{children:"The tool will guide you through some questions to set up your project:"}),"\n",(0,n.jsxs)(o.ol,{children:["\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.code,{children:"Project directory"})," - Since you're already in the directory you want to create a project in, just enter a period (",(0,n.jsx)(o.code,{children:"."}),") to select your current directory and press ",(0,n.jsx)(o.code,{children:"Enter"}),"."]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.code,{children:"Select template"})," -  What type of roblox-ts project is this? roblox-ts can be used to build plugins and packages too, but in this case we want to make a game, so press ",(0,n.jsx)(o.code,{children:"Enter"})," once."]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.code,{children:"Configure Git"})," - Do you want to use ",(0,n.jsx)(o.a,{href:"https://git-scm.com/",children:"Git"})," for version control? Press ",(0,n.jsx)(o.code,{children:"Y"})," or ",(0,n.jsx)(o.code,{children:"N"})," to make your choise."]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.code,{children:"Configure ESLint"})," - Do you want to use ",(0,n.jsx)(o.a,{href:"https://eslint.org/",children:"ESLint"})," to check your code for correctness?"]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.code,{children:"Configure Prettier"})," - Do you want to use ",(0,n.jsx)(o.a,{href:"https://prettier.io/",children:"Prettier"})," to format your code?"]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.code,{children:"Configure VSCode Project Settings"})," - Do you want the tool to create a ",(0,n.jsx)(o.code,{children:".vscode"})," folder with settings optimized for roblox-ts development? If you're using VSCode to write code, you should use this."]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.code,{children:"Multiple package managers detected. Select package manager:"})," - Which package manager do you want to use with this project? roblox-ts works best with ",(0,n.jsx)(o.code,{children:"npm"})," and support for alternative package managers is not guaranteed. (If you don't have other package managers installed, this step won't appear!)"]}),"\n"]}),"\n",(0,n.jsxs)(o.admonition,{type:"tip",children:[(0,n.jsx)(o.p,{children:"Many of the tools used here can be directly integrated into VSCode with extensions. We highly recommend the roblox-ts extension to improve your editing experience. The roblox-ts extension not only provides extra diagnostic information, but also lets you build your code with one click."}),(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsx)(o.li,{children:(0,n.jsx)(o.a,{href:"https://marketplace.visualstudio.com/items?itemName=Roblox-TS.vscode-roblox-ts",children:"roblox-ts VSCode extension"})}),"\n",(0,n.jsx)(o.li,{children:(0,n.jsx)(o.a,{href:"https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint",children:"ESLint VSCode extension"})}),"\n",(0,n.jsx)(o.li,{children:(0,n.jsx)(o.a,{href:"https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode",children:"Prettier VSCode extension"})}),"\n",(0,n.jsx)(o.li,{children:(0,n.jsx)(o.a,{href:"https://marketplace.visualstudio.com/items?itemName=evaera.vscode-rojo",children:"Rojo VSCode extension"})}),"\n"]})]}),"\n",(0,n.jsx)(o.p,{children:"Then, open your project in your code editor of choice, such as VSCode:"}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-bash",metastring:'title="Terminal"',children:"code project-name\n"})}),"\n",(0,n.jsx)(o.h2,{id:"running-your-code",children:"Running Your Code"}),"\n",(0,n.jsxs)(o.p,{children:['roblox-ts has a feature called "watch mode" where it will continuously build your code as you write it. You can start watch mode from the ',(0,n.jsx)(o.a,{href:"https://marketplace.visualstudio.com/items?itemName=Roblox-TS.vscode-roblox-ts",children:"VSCode extension"})," or via the command line:"]}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-bash",metastring:'title="Terminal"',children:"npm run watch\n"})}),"\n",(0,n.jsxs)(o.p,{children:["Once roblox-ts is running, you need to start Rojo to start syncing your code into Roblox studio you can do this from the ",(0,n.jsx)(o.a,{href:"https://marketplace.visualstudio.com/items?itemName=evaera.vscode-rojo",children:"VSCode extension"})," or via the command line:"]}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-bash",metastring:'title="Terminal"',children:"rojo serve\n"})}),"\n",(0,n.jsxs)(o.p,{children:["You're all set up, go write some code ","\ud83c\udf89"]})]})}function h(e={}){const{wrapper:o}={...(0,i.M)(),...e.components};return o?(0,n.jsx)(o,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},2172:(e,o,t)=>{t.d(o,{I:()=>c,M:()=>s});var n=t(1504);const i={},r=n.createContext(i);function s(e){const o=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function c(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),n.createElement(r.Provider,{value:o},e.children)}}}]);