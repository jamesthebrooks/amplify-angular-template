import {defineAuth, secret} from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */

/***
 *
 *   npx ampx sandbox secret set <secret id>
 *   npx ampx sandbox secret set <secret value>
 *   npx ampx sandbox secret list // to test
 *
 */

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['email'],
      },
      callbackUrls: [
        'http://localhost:8101/',
        'https://www.badowltool.com',
        'https://dev.d14w5lfir87n91.amplifyapp.com/',
        'https://main.d14w5lfir87n91.amplifyapp.com/',
        'https://dev.d3s4aytbb75ebg.amplifyapp.com/',
        'https://main.d3s4aytbb75ebg.amplifyapp.com/'
      ],
      logoutUrls: [
        'http://localhost:8101/',
        'https://www.badowltool.com',
        'https://dev.d14w5lfir87n91.amplifyapp.com/',
        'https://main.d14w5lfir87n91.amplifyapp.com/',
        'https://dev.d3s4aytbb75ebg.amplifyapp.com/',
        'https://main.d3s4aytbb75ebg.amplifyapp.com/'
      ],
    }
  },
});
