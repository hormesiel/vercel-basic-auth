/*

Behaviors to test :

|                                     | No credentials                                         | Invalid credentials                                    | Valid credentials |
|-------------------------------------|--------------------------------------------------------|--------------------------------------------------------|-------------------|
| GET /                               | 200                                                    | 200                                                    | 200               |
| GET /index.html                     | 200                                                    | 200                                                    | 200               |
| GET /index.js                       | 200                                                    | 200                                                    | 200               |
| GET /about.html                     | 200                                                    | 200                                                    | 200               |
| GET /_assets/ic_home.svg            | 200                                                    | 200                                                    | 200               |
| GET /_assets/ic_about.svg           | 200                                                    | 200                                                    | 200               |
| GET /_styles/app.css                | 200                                                    | 200                                                    | 200               |
|                                     |                                                        |                                                        |                   |
| GET /admin                          | 401, body=Restricted area, please login (admin:admin). | 401, body=Restricted area, please login (admin:admin). | 200               |
| GET /admin/index.html               | 401, body=Restricted area, please login (admin:admin). | 401, body=Restricted area, please login (admin:admin). | 200               |
| GET /admin/index.js                 | 401, body=Restricted area, please login (admin:admin). | 401, body=Restricted area, please login (admin:admin). | 200               |
| GET /admin/users.html               | 401, body=Restricted area, please login (admin:admin). | 401, body=Restricted area, please login (admin:admin). | 200               |
| GET /admin/_assets/ic_dashboard.svg | 401, body=Restricted area, please login (admin:admin). | 401, body=Restricted area, please login (admin:admin). | 200               |
| GET /admin/_assets/ic_users.svg     | 401, body=Restricted area, please login (admin:admin). | 401, body=Restricted area, please login (admin:admin). | 200               |
| GET /admin/_styles/admin.css        | 401, body=Restricted area, please login (admin:admin). | 401, body=Restricted area, please login (admin:admin). | 200               |
|                                     |                                                        |                                                        |                   |
| GET /foo                            | 404                                                    | 404                                                    | 404               |
| GET /admin/foo                      | 401, body=Restricted area, please login (admin:admin). | 401, body=Restricted area, please login (admin:admin). | 404               |

*/

if (!process.env.TEST_VARIANT)
  throw 'The env variable `TEST_VARIANT` must be set to one of the following: no-credentials, invalid-credentials, valid-credentials';

//
// Imports
//

import nodeFetch from 'node-fetch';

//
// Test variants
//

const testVariants = {
  'no-credentials': {
    name: 'No credentials',
    credentials: {
      username: null,
      password: null,
    },
    expectedAdminAreaResponseCode: 401,
    expectedAdminAreaNonExistentUrlResponseCode: 401,
  },
  'invalid-credentials': {
    name: 'Invalid credentials',
    credentials: {
      username: 'foo',
      password: 'bar',
    },
    expectedAdminAreaResponseCode: 401,
    expectedAdminAreaNonExistentUrlResponseCode: 401,
  },
  'valid-credentials': {
    name: 'Valid credentials',
    credentials: {
      username: 'admin',
      password: 'admin',
    },
    expectedAdminAreaResponseCode: 200,
    expectedAdminAreaNonExistentUrlResponseCode: 404,
  },
};

const testVariant = testVariants[process.env.TEST_VARIANT];

//
// Helpers
//

function adminAreaTest(url: string, expectedResponseCode: number) {
  describe('GET ' + url, () => {
    it(expectedResponseCode.toString(), async () => {
      const res = await fetch(url);
      expect(res.status).toBe(expectedResponseCode);

      // If not authorized, check response body and realm too
      if (res.status === 401) {
        const body = await res.text();
        expect(body).toBe('Restricted area, please login (admin:admin).');
        expect(res.headers.get('www-authenticate')).toMatch(/Basic realm="vercel-basic-auth\.[a-z-]+"/);
      }
    });
  });
}

function fetch(relativeUrl: string) {
  return nodeFetch('http://localhost:3000' + relativeUrl, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(testVariant.credentials.username + ':' + testVariant.credentials.password).toString('base64')
    }
  });
}

function publicAreaTest(url: string, expectedResponseCode: number) {
  describe('GET ' + url, () => {
    it(expectedResponseCode.toString(), async () => {
      const res = await fetch(url);
      expect(res.status).toBe(expectedResponseCode);
    });
  });
}

//
// Tests
//

describe(testVariant.name, () => {
  // Public area

  publicAreaTest('/', 200);
  publicAreaTest('/index.html', 200);
  publicAreaTest('/index.js', 200);
  publicAreaTest('/about.html', 200);
  publicAreaTest('/_assets/ic_home.svg', 200);
  publicAreaTest('/_assets/ic_about.svg', 200);
  publicAreaTest('/_styles/app.css', 200);

  // Admin area

  const expectedResponseCode = testVariant.expectedAdminAreaResponseCode;

  adminAreaTest('/admin', expectedResponseCode);
  adminAreaTest('/admin/index.html', expectedResponseCode);
  adminAreaTest('/admin/index.js', expectedResponseCode);
  adminAreaTest('/admin/users.html', expectedResponseCode);
  adminAreaTest('/admin/_assets/ic_dashboard.svg', expectedResponseCode);
  adminAreaTest('/admin/_assets/ic_users.svg', expectedResponseCode);
  adminAreaTest('/admin/_styles/admin.css', expectedResponseCode);

  // Non-existent URL

  publicAreaTest('/foo', 404);
  adminAreaTest('/admin/foo', testVariant.expectedAdminAreaNonExistentUrlResponseCode);
});
