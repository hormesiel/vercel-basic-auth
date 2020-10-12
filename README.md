## Goal

This repo contains examples of how to add *Basic Authentication* to a Vercel deployment using various languages / frameworks, along with some numbers that show the differences between each method.

Each example contains its own README file with some additional information.

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
