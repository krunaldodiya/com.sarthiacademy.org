export const startDownload = (
  task: any,
  taskId: any,
  downloadActions: any,
  quality: any,
) => {
  const {startDownloadAction} = downloadActions;

  task.begin(() => {
    startDownloadAction({
      id: taskId,
      progress: 0,
      status: 'downloading',
      quality,
    });
  });

  return updateDownload(task, taskId, downloadActions);
};

export const updateDownload = (
  task: any,
  taskId: any,
  downloadActions: any,
) => {
  const {updateDownloadAction} = downloadActions;

  return task
    .progress((percent: number) => {
      updateDownloadAction({
        id: taskId,
        progress: percent * 100,
        status: percent === 1 ? 'done' : 'downloading',
      });
    })
    .done(() => {
      updateDownloadAction({
        id: taskId,
        progress: 100,
        status: 'done',
      });
    })
    .error((error: any) => {
      console.log('Download canceled due to error: ', error);
    });
};

// check Root.tsx for resuming downloads on startup

// // Pause the task
// task.pause();

// // Resume after pause
// task.resume();

// // Cancel the task
// task.stop();
