## Goal

This repo contains examples of how to add *Basic Authentication* to a Vercel deployment using various languages / frameworks, along with some numbers that show the differences between each method.

Each example contains its own README file with some additional information.

## Adding basic auth to SSR / API routes

All the examples in this repo only show how to add basic auth to **static pages**. If you want to add basic auth to SSR or API routes, you'll have to do it manually or use a package specifically designed for the framework you're using, like [nextjs-basic-auth-middleware](https://www.npmjs.com/package/nextjs-basic-auth-middleware) if your project uses Next.js.

## Structure

- The `_static` directory contains the source code for the "website" that each implementation serves for demonstration purposes : HTML, CSS, images ... <sup>1</sup>
- All the other directories are the different ways you can add Basic Authentication to a Vercel deployment. Checkout their code to see how to implement it in your project

<sup>1</sup> The demo website has a public area and a restricted `/admin` area **(username / pass : `admin` / `admin`)**.

## Comparison

| Example          | 📦 Lambda size | 🔗 Deployment URL                                             | 👨‍💻 Ease of implementation |
| ---------------- | -------------- | -------------------------------------------------------------- | ----------------------------- |
| node             | 0.08 MB        | [Link](https://vercel-basic-auth-node.vercel.app/)             | ⭐                            |
| node-express     | 0.38 MB        | [Link](https://vercel-basic-auth-node-express.vercel.app/)     | ⭐⭐                         |
| node-static-auth | 0.08 MB        | [Link](https://vercel-basic-auth-node-static-auth.vercel.app/) | ⭐⭐⭐                       |

## Contributing

Issues and PR are welcome!

- 🔀 Fork and clone the project
- 🆕 Create a directory named after the language / framework you want to add (for example `php` or `node-polka`)
- 👨‍💻 Add the implementation
- 🎉 Submit your PR

## How to run the tests against one example project

First, install the required dependencies for all of the example projects by running `yarn` at the repository's root directory. Then :

- In a first window, run `yarn run <example-project-name>` (e.g. `yarn run node-static-auth`)
- Answer "Yes" when Vercel CLI asks you if you want to "Set up and develop" the project, and follow the instructions
- Vercel CLI should now display `> Ready! Available at http://localhost:3000`
- In a second window, run `yarn test` to execute the tests against the example project that is being served
  - Be patient if you don't see anything appear right away, each test can take ~15 seconds to complete
- That's it! You should see Jest print test results progressively as each test variant gets executed.

If you want to test another example project, stop Vercel CLI's server and repeat these steps.
