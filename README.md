# Deployments

- No `builds` : https://now-basic-auth-9yiiw5xyq.now.sh/
- Build step for `index.js` : https://now-basic-auth-h9017xgch.now.sh/
  - Return HTML on credentials OK : https://now-basic-auth-ma95w48hr.now.sh/ &rarr; returns Now's 404 page for everything that is not `/`, including `/about` page, icon & css.
- Build step for everything : https://now-basic-auth-ptd44y87i.now.sh/ &rarr; every page and file loading fine; displays `index.html` by default, no auth needed except when manually navigating to `index.js`.
  - Redirect `/` requests to `index.js` : https://now-basic-auth-jjq0vmn1l.now.sh/ &rarr; `/` prompts for authentication; can be bypassed by manually typing the file name in the URL (e.g. `index.html`, `/about.html` etc.).
  - Redirect all requests to `index.js` : https://now-basic-auth-hbodt8abi.now.sh/ &rarr; prompts for authentication on all URLs; always return `index.html`'s content, not requested file's.
  - Handle HTTP requests in `index.js` : https://now-basic-auth-5y6k4adpk.now.sh/ &rarr; Everything OK!
  - Return HTML file on authentication failed : https://now-basic-auth-66yyiknhp.now.sh &rarr; Everything OK!
