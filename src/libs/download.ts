export const updateDownload = (task: any, downloadActions: any) => {
  const {updateDownloadAction} = downloadActions;

  return task
    .begin(() => {
      updateDownloadAction({...task, percent: 0});
    })
    .progress((percent: number) => {
      updateDownloadAction({...task, percent});
    })
    .done(() => {
      updateDownloadAction({...task, percent: 1});
    })
    .error((error: any) => {
      console.log('Download canceled due to error: ', error);
    });
};
