import Echo from 'laravel-echo';
import PusherNative from 'pusher-js/react-native';

const options = {
  cluster: 'mt1',
  key: 'myAppKey',
  wsHost: 'api.sarthiacademy.in',
  wsPort: 6001,
  wssHost: 'api.sarthiacademy.in',
  wssPort: 6001,
  auth: {
    headers: {
      Authorization:
        'Bearer 852|xAhiE0oFNBZm4TZQnM4u6Avz1pxnNGeOQeBEO4kMvZMSv2768FccdpMFQqyRZn0nJKPHKSbk1qUylJ2v',
      Accept: 'application/json',
    },
  },
};

const PusherClient = new PusherNative(options.key, options);

export const echo = new Echo({
  broadcaster: 'pusher',
  client: PusherClient,
});
