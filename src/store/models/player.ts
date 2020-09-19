import {action} from 'easy-peasy';

const initialState = {
  isFinished: false,
  isMuted: false,
  isPaused: false,
  isFullScreen: false,
  isReady: false,
  isBuffering: false,
  progress: 0,
  duration: 0,
  speed: 1,
  quality: null,
  showControls: false,
  showOptions: null,
};

export const playerModel = {
  ...initialState,

  loadPlayer: action((state) => {
    return {...state, ...initialState};
  }),

  setIsBuffering: action((state: any, isBuffering: any) => {
    state.isBuffering = isBuffering;
  }),

  setIsReady: action((state: any, isReady: any) => {
    state.isReady = isReady;
  }),

  setIsFullScreen: action((state: any, fullScreen: any) => {
    state.isFullScreen = fullScreen;
  }),

  setShowControls: action((state: any, showControls: any) => {
    state.showControls = showControls;
  }),

  setShowOptions: action((state: any, showOptions: any) => {
    state.showOptions = showOptions;
  }),

  setIsPaused: action((state: any, isPaused: any) => {
    state.isPaused = isPaused;
  }),

  setIsFinished: action((state: any) => {
    state.finished = true;
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
