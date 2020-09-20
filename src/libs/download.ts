export const restartDownload = (task: any, id: string, setFiles: Function) => {
  return startDownload(task, id, setFiles);
};

export const startDownload = (task: any, id: string, setFiles: Function) => {
  return task
    .begin((expectedBytes: number) => {
      console.log(`Going to download ${expectedBytes} bytes!`);
    })
    .progress((percent: number) => {
      setFiles({
        id,
        progress: percent * 100,
      });
    })
    .done(() => {
      setFiles({id, progress: 100});
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
