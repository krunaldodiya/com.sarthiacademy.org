import {action} from 'easy-peasy';
import RNBackgroundDownloader from 'react-native-background-downloader';

const getTaskById = async (taskId: any) => {
  const tasks = await RNBackgroundDownloader.checkForExistingDownloads();

  return tasks.find((task: any) => task.id === taskId);
};

export const downloadModel = {
  files: {},

  updateDownloadAction: action((state: any, task: any) => {
    state.files[task.id] = task;
  }),

  pauseDownloadAction: action((state: any, task: any) => {
    state.files[task.id].state = 'PAUSED';

    getTaskById(task.id).then((downloadTask) => {
      if (downloadTask) {
        downloadTask.pause();
      }
    });
  }),

  resumeDownloadAction: action((state: any, task: any) => {
    state.files[task.id].state = 'DOWNLOADING';

    getTaskById(task.id).then((downloadTask) => {
      if (downloadTask) {
        downloadTask.resume();
      }
    });
  }),

  stopDownloadAction: action((state: any, task: any) => {
    delete state.files[task.id];

    getTaskById(task.id).then((downloadTask) => {
      if (downloadTask) {
        downloadTask.stop();
      }
    });
  }),

  reset: action(async (state: any) => {
    state.files = {};
  }),
};
