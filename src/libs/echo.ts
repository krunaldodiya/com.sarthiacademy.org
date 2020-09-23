import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';

export const PusherClient = new Pusher('myAppKey');

export const echo = new Echo({
  broadcaster: 'pusher',
  client: PusherClient,
  key: 'myAppKey',
  wsHost: 'api.sarthiacademy.in',
  wsPort: 6001,
  cluster: 'mt1',
  forceTLS: false,
  disableStats: true,
  encrypted: false,
  logToConsole: true,
});
