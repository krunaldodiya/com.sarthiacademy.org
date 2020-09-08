import {action} from 'easy-peasy';

export const downloadModel = {
  files: {},

  setFiles: action((state: any, {id, progress}: any) => {
    const isUndefined = state.files[id] === undefined;

    if (isUndefined) {
      state.files[id] = {
        progress: 0,
        status: 'downloading',
      };
    }

    if (!isUndefined) {
      state.files[id] = {
        ...state.files[id],
        progress,
        status: progress === 100 ? 'done' : 'downloading',
      };
    }
  }),
};
