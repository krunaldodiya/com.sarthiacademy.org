import {check, request, RESULTS} from 'react-native-permissions';

export function getPermission(permission: any) {
  return new Promise((resolve, reject) => {
    check(permission)
      .then((results) => {
        if (results === RESULTS.GRANTED) {
          resolve(true);
        } else {
          request(permission)
            .then(() => {
              resolve(true);
            })
            .catch(() => {
              reject(false);
            });
        }
      })
      .catch(() => {
        reject(false);
      });
  });
}
