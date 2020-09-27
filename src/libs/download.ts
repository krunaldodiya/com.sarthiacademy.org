export const updateDownload = (task: any, downloadActions: any) => {
  const {updateDownloadAction} = downloadActions;

  return task
    .begin(() => {
      updateDownloadAction({
        task,
        taskInfo: {
          ...task,
          percent: 0,
        },
      });
    })
    .progress((percent: number) => {
      updateDownloadAction({
        task,
        taskInfo: {
          ...task,
          percent,
        },
      });
    })
    .done(() => {
      updateDownloadAction({
        task,
        taskInfo: {
          ...task,
          percent: 1,
        },
      });
    })
    .error((error: any) => {
      console.log('Download canceled due to error: ', error);
    });
};
