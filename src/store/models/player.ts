import {action} from 'easy-peasy';

export const playerModel = {
  videoList: [],
  currentVideo: null,
  previousVideo: null,
  nextVideo: null,
  isFinished: false,
  isPaused: false,
  isFullScreen: false,
  showOverlay: false,
  progress: 0,
  duration: 0,
  speed: 1,
  quality: null,
  showModal: false,
  isReady: false,

  setIsReady: action((state: any, isReady: any) => {
    state.isReady = isReady;
  }),

  setVideoList: action((state: any, videoList: any) => {
    state.videoList = videoList;
  }),

  setCurrentVideo: action((state: any, currentVideo: any) => {
    if (currentVideo === null) {
      return;
    }

    const totalVideos: number = state.videoList.length;

    const currentVideoIndex = state.videoList.findIndex(
      (list: any) => list.id === currentVideo.id,
    );

    const nextVideo =
      currentVideoIndex + 1 < totalVideos
        ? state.videoList[currentVideoIndex + 1]
        : null;

    const previousVideo =
      currentVideoIndex - 1 > 0 ? state.videoList[currentVideoIndex - 1] : null;

    state.progress = 0;
    state.duration = 0;
    state.isFinished = false;
    state.isPaused = false;
    state.currentVideo = currentVideo;
    state.nextVideo = nextVideo;
    state.previousVideo = previousVideo;
  }),

  setIsFullScreen: action((state: any, fullScreen: any) => {
    state.isFullScreen = fullScreen;
  }),

  setShowOverlay: action((state: any, showOverlay: any) => {
    state.showOverlay = showOverlay;
  }),

  setShowModal: action((state: any, payload: any) => {
    state.showModal = payload;
    state.isPaused = payload;
  }),

  setIsPaused: action((state: any, isPaused: any) => {
    state.isPaused = isPaused;
  }),

  setIsFinished: action((state: any, isFinished: any) => {
    state.finished = isFinished;
    state.isPaused = true;
  }),

  setProgress: action((state: any, progress: any) => {
    state.progress = progress;
  }),

  setDuration: action((state: any, duration: any) => {
    state.duration = duration;
  }),

  setQuality: action((state: any, quality: any) => {
    state.quality = quality;
  }),

  setSpeed: action((state: any, speed: any) => {
    state.speed = speed;
  }),
};
