export const getVideos = (currentVideo: any, videos: []) => {
  const totalVideos: number = videos.length;

  const currentVideoIndex = videos.findIndex(
    (list: any) => list.id === currentVideo.id,
  );

  const nextVideo =
    currentVideoIndex + 1 < totalVideos ? videos[currentVideoIndex + 1] : null;

  const previousVideo =
    currentVideoIndex !== 0 ? videos[currentVideoIndex - 1] : null;

  return {currentVideo, nextVideo, previousVideo};
};
