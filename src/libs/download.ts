export const startDownload = (task: any, downloadActions: any) => {
  const {startDownloadAction} = downloadActions;

  task.begin(() => {
    startDownloadAction({task});
  });

  return updateDownload(task, downloadActions);
};

export const updateDownload = (task: any, downloadActions: any) => {
  const {updateDownloadAction} = downloadActions;

  return task
    .progress(() => {
      updateDownloadAction({task});
    })
    .done(() => {
      updateDownloadAction({
        task: {...task, percent: 1, bytesWritten: task.totalBytes},
      });
    })
    .error((error: any) => {
      console.log('Download canceled due to error: ', error);
    });
};
