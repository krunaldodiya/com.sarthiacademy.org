import {action} from 'easy-peasy';

export const downloadModel = {
  files: {},

  startDownloadAction: action((state: any, payload: any) => {
    const {task} = payload;

    state.files[task.id] = {...state.files[task.id], ...payload};
  }),

  updateDownloadAction: action((state: any, payload: any) => {
    const {task} = payload;

    state.files[task.id] = {...state.files[task.id], ...payload};
  }),

  pauseDownloadAction: action((state: any, payload: any) => {
    const {task} = payload;

    state.files[task.id] = {...state.files[task.id], ...payload};

    task.pause();
  }),

  resumeDownloadAction: action((state: any, payload: any) => {
    const {task} = payload;

    state.files[task.id] = {...state.files[task.id], ...payload};

    task.resume();
  }),

  stopDownloadAction: action((state: any, payload: any) => {
    const {task} = payload;

    if (task.state === 'DOWNLOADING') {
      task.stop();
    }

    delete state.files[task.id];
  }),
};
