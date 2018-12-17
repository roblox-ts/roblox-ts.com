---
title: Installing from GitHub
order: 5
category: guides
description: Learn how to install roblox-ts from GitHub instead of NPM to be on the bleeding edge of new features and fixes.
---

If you'd like to use the latest features of **roblox-ts** before they get published to npm or you'd like to set up **roblox-ts** for local development, this guide can help.

1. `cd` into a directory where you'd like to keep your copy of **roblox-ts**<br>
`cd /path/to/dir`

2. Clone the **roblox-ts** git repo<br>
`git clone https://github.com/roblox-ts/roblox-ts.git`

3. `cd` into the cloned repo<br>
`cd roblox-ts`

4. Install TypeScript<br>
`npm install -g typescript`<br>
(use `sudo` if needed)

5. Install project dependencies<br>
`npm install`

6. Compile
`tsc`

7. Link to npm
`npm link`<br>
(use `sudo` if needed)

8. You can now run `rbxtsc` anywhere!

9. In order to update to the latest version<br>
`git pull` and then `tsc`