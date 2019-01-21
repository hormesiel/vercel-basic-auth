# Deployments

- No `builds` : https://now-basic-auth-9yiiw5xyq.now.sh/
- Build step for `index.js` : https://now-basic-auth-9yiiw5xyq.now.sh/
  - Return HTML on credentials OK : https://now-basic-auth-ma95w48hr.now.sh/ &rarr; returns Now's 404 page for everything that is not `/`, including `/about` page, icon & css.
- Build step for everything : https://now-basic-auth-ptd44y87i.now.sh/ &rarr; every page and file loading fine; displays `index.html` by default, no auth needed except when manually navigating to `index.js`.
