import {createStore, persist} from 'easy-peasy';
import {storage} from '../libs/storage';
import {downloadModel} from './models/download';
import {homeModel} from './models/home';
import {playerModel} from './models/player';

export const store = createStore(
  persist(
    {
      player: playerModel,
      home: homeModel,
      download: downloadModel,
    },
    {
      storage,
    },
  ),
);
