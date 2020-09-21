import {action} from 'easy-peasy';

export const downloadModel = {
  files: {},

  startDownloadAction: action((state: any, payload: any) => {
    const {id} = payload;
    state.files[id] = payload;
  }),

  updateDownloadAction: action((state: any, payload: any) => {
    const {id} = payload;
    state.files[id] = {...state.files[id], ...payload};
  }),

  pauseDownloadAction: action((state: any, {id, progress}: any) => {
    //
  }),

  resumeDownloadAction: action((state: any, {id, progress}: any) => {
    //
  }),

  stopDownloadAction: action((state: any, {id, progress}: any) => {
    //
  }),
};
