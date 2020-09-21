import {action} from 'easy-peasy';

export const downloadModel = {
  files: {},

  startDownloadAction: action((state: any, payload: any) => {
    const {task} = payload;
    state.files[task.id] = payload;
  }),

  updateDownloadAction: action((state: any, payload: any) => {
    const {task} = payload;
    state.files[task.id] = {...state.files[task.id], ...payload};
  }),

  pauseDownloadAction: action((state: any, payload: any) => {
    const {task} = payload;

    task.pause();
  }),

  resumeDownloadAction: action((state: any, payload: any) => {
    const {task} = payload;

    task.resume();
  }),

  stopDownloadAction: action((state: any, payload: any) => {
    const {task} = payload;

    task.stop();
  }),
};
