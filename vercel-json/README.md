`vercel.json`
===

With a few lines in your project's `vercel.json` you can enable Basic
Auth username/password authentication to your deployments. The `routes`
property can return custom response headers and codes based on the
presense or abscence of any request headers you like. You can combine
this approach with other `routes` for more complex behaviors.

The example `vercel.json` in this directory will trigger your browser's
built-in Basic Auth dialogue box. If you enter the correct username
and password, it will skip past the `routes` block and return the usual
response.

Username: `admin`
Password: `admin`

You can choose your own username and password by base64 encoding it e.g.

```bash
$ echo -n "admin:admin" | base64
YWRtaW46YWRtaW4=
```

*NOTE*: Make sure to use `echo -n` to not accidently encode a newline
`\n` character and be incorrect! You can always check your browser's
`Developer Mode -> Network Tab -> Request Headers -> authorization`
field to confirm the exact header being sent matches the `vercel.json`.

Basic Auth + HTTPS is sufficient for protecting many common use cases
like staging deployments etc. You can set a custom 401 Unauthorized page
in the `"dest"` field if you like.

It is also possible to use GH Actions to modify the `vercel.json` before
deploying for more advanced behaviors.

## References
* [vercel.json routes](https://vercel.com/docs/concepts/projects/project-configuration#routes)
* [Basic Auth Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization#basic)
* [vercel.json `missing` and `has` documentation](https://github.com/orgs/vercel/discussions/2920)
