Example project to demonstrate how to add HTTP Basic Authentication to a website hosted on Now, using *node.js*.
**See it in action here** : https://now-basic-auth-8ljo42yk5.now.sh/

This example is divided in two parts :
- Static files (HTML, CSS & PNG) accessible by anyone
- An `/admin` area which requires authentication (login = *admin*, pass = *admin*)

Because it's just an example the credentials are hard-coded, but they could be easily replaced with some database query.
