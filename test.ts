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
// Declarations
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

const fetch = relativeUrl => nodeFetch('http://localhost:4444' + relativeUrl, {
  headers: {
    'Authorization': 'Basic ' + Buffer.from(testVariant.credentials.username + ':' + testVariant.credentials.password).toString('base64')
  }
});

//
// Tests
//

describe(testVariant.name, () => {
  // Public area

  describe('GET /', () => {
    it('200', async () => {
      const res = await fetch('/');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /index.html', () => {
    it('200', async () => {
      const res = await fetch('/index.html');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /index.js', () => {
    it('200', async () => {
      const res = await fetch('/index.js');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /about.html', () => {
    it('200', async () => {
      const res = await fetch('/about.html');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /_assets/ic_home.svg', () => {
    it('200', async () => {
      const res = await fetch('/_assets/ic_home.svg');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /_assets/ic_about.svg', () => {
    it('200', async () => {
      const res = await fetch('/_assets/ic_about.svg');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /_styles/app.css', () => {
    it('200', async () => {
      const res = await fetch('/_styles/app.css');
      expect(res.status).toBe(200);
    });
  });

  // Admin area

  const expectedResponseCode = testVariant.expectedAdminAreaResponseCode;
  const expectedResponseCodeStr = expectedResponseCode.toString();

  describe('GET /admin', () => {
    it(expectedResponseCodeStr, async () => {
      const res = await fetch('/admin');
      expect(res.status).toBe(expectedResponseCode);

      // If not authorized, check response body too
      if (res.status === 401) {
        const body = await res.text();
        expect(body).toBe('Restricted area, please login (admin:admin).');
      }
    });
  });

  describe('GET /admin/index.html', () => {
    it(expectedResponseCodeStr, async () => {
      const res = await fetch('/admin/index.html');
      expect(res.status).toBe(expectedResponseCode);

      // If not authorized, check response body too
      if (res.status === 401) {
        const body = await res.text();
        expect(body).toBe('Restricted area, please login (admin:admin).');
      }
    });
  });

  describe('GET /admin/index.js', () => {
    it(expectedResponseCodeStr, async () => {
      const res = await fetch('/admin/index.js');
      expect(res.status).toBe(expectedResponseCode);

      // If not authorized, check response body too
      if (res.status === 401) {
        const body = await res.text();
        expect(body).toBe('Restricted area, please login (admin:admin).');
      }
    });
  });

  describe('GET /admin/users.html', () => {
    it(expectedResponseCodeStr, async () => {
      const res = await fetch('/admin/users.html');
      expect(res.status).toBe(expectedResponseCode);

      // If not authorized, check response body too
      if (res.status === 401) {
        const body = await res.text();
        expect(body).toBe('Restricted area, please login (admin:admin).');
      }
    });
  });

  describe('GET /admin/_assets/ic_dashboard.svg', () => {
    it(expectedResponseCodeStr, async () => {
      const res = await fetch('/admin/_assets/ic_dashboard.svg');
      expect(res.status).toBe(expectedResponseCode);

      // If not authorized, check response body too
      if (res.status === 401) {
        const body = await res.text();
        expect(body).toBe('Restricted area, please login (admin:admin).');
      }
    });
  });

  describe('GET /admin/_assets/ic_users.svg', () => {
    it(expectedResponseCodeStr, async () => {
      const res = await fetch('/admin/_assets/ic_users.svg');
      expect(res.status).toBe(expectedResponseCode);

      // If not authorized, check response body too
      if (res.status === 401) {
        const body = await res.text();
        expect(body).toBe('Restricted area, please login (admin:admin).');
      }
    });
  });

  describe('GET /admin/_styles/admin.css', () => {
    it(expectedResponseCodeStr, async () => {
      const res = await fetch('/admin/_styles/admin.css');
      expect(res.status).toBe(expectedResponseCode);

      // If not authorized, check response body too
      if (res.status === 401) {
        const body = await res.text();
        expect(body).toBe('Restricted area, please login (admin:admin).');
      }
    });
  });

  // Non-existent URL

  describe('GET /foo', () => {
    it('404', async () => {
      const res = await fetch('/foo');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /admin/foo', () => {
    const expectedResponseCode = testVariant.expectedAdminAreaNonExistentUrlResponseCode;

    it(expectedResponseCode.toString(), async () => {
      const res = await fetch('/admin/foo');
      expect(res.status).toBe(expectedResponseCode);

      // If not authorized, check response body too
      if (res.status === 401) {
        const body = await res.text();
        expect(body).toBe('Restricted area, please login (admin:admin).');
      }
    });
  });
});
