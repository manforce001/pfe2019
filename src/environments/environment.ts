// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
      apiKey: 'AIzaSyDPd8P_Mw8JbSSt6SkYUrh2dgDPxn1lGJ8',
      authDomain: 'smart-ruche.firebaseapp.com',
      databaseURL: 'https://smart-ruche.firebaseio.com',
      projectId: 'smart-ruche',
      storageBucket: 'smart-ruche.appspot.com',
      messagingSenderId: '443407868089'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
