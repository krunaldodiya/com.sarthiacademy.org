export const startDownload = (task: any, id: string, setFiles: Function) => {
  return task
    .progress((percent: number) => {
      setFiles({
        id,
        progress: percent * 100,
      });
    })
    .done(() => {
      setFiles({id, progress: 100});
    })
    .error((error) => {
      console.log('Download canceled due to error: ', error);
    });
};
