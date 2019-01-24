class App {
  constructor(rootDir) {
    this.fallbackHandler = (req, res) => {
      // Return a 404 and display '404 Not Found' on the page
      res.writeHead(404);
      res.end('404 Not Found');
    }
    this.rootDir = rootDir;
    this.routes = [];
  }

  get(pattern, ...handlers) {
    this.routes.push({ pattern, handlers });
  }

  process(req, res) {
    // Allow middlewares to access app related variables like its 'rootDir'
    req.app = this;

    // Search for a matching route
    let match;
    for (const route of this.routes) {
      // Replace occurrences of '*' by '(.*)'
      const regexpPattern = route.pattern
        .replace(/\*/g, '(.*)');
      const regexp = new RegExp(`^${regexpPattern}$`);

      // Check if the route matches
      if (regexp.test(req.url)) {
        match = route;
        break;
      }
    }

    // If no route to handle this request
    if (!match) {
      // return a 404 and display '404 Not Found' on the page
      res.writeHead(404);
      res.end('404 Not Found');
    }
    // Else, call each middleware one by one
    else {
      const callHandler = (index) => {
        const isLastHandler = (index == match.handlers.length - 1);

        if (isLastHandler)
          match.handlers[index](req, res, () => this.fallbackHandler(req, res));
        else
          match.handlers[index](req, res, () => callHandler(index + 1));
      }

      // starting with the 1st
      callHandler(0);
    }
  }
}

/*
 *
 */

module.exports = App;
