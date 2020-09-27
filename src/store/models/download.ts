import {action} from 'easy-peasy';

export const downloadModel = {
  files: {},

  updateDownloadAction: action((state: any, payload: any) => {
    const {task} = payload;

    state.files[task.id] = payload;
  }),

  pauseDownloadAction: action((state: any, taskId: any) => {
    const currentTask = state.files[taskId];

    currentTask.taskInfo.state = 'PAUSED';

    currentTask.task.pause();
  }),

  resumeDownloadAction: action((state: any, taskId: any) => {
    const currentTask = state.files[taskId];

    currentTask.taskInfo.state = 'DOWNLOADING';

    currentTask.task.resume();
  }),

  stopDownloadAction: action((state: any, taskId: any) => {
    const currentTask = state.files[taskId];

    if (currentTask.taskInfo.state === 'DOWNLOADING') {
      currentTask.task.stop();
    }

    delete state.files[taskId];
  }),
};
