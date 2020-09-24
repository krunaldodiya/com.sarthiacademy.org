import Echo from 'laravel-echo';
import PusherNative from 'pusher-js/react-native';

const options = {
  cluster: 'mt1',
  key: 'myAppKey',
  wsHost: 'api.sarthiacademy.in',
  wsPort: 6001,
  wssHost: 'api.sarthiacademy.in',
  wssPort: 6001,
  // auth: {
  //   headers: {
  //     Authorization:
  //       'Bearer 590|iT8cqO0rMYSU68TBlPdRgOOc0ZamaoPQ8AT0upmgISK5ONuDEvmmI1ahtaUPcSSBtIbvBA3MiIG8T6Fm',
  //     Accept: 'application/json',
  //   },
  // },
};

const PusherClient = new PusherNative(options.key, options);

export const echo = new Echo({
  broadcaster: 'pusher',
  client: PusherClient,
});
