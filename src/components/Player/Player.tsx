import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo, useEffect, useRef, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import PlayerControls from './PlayerControls';
import PlayerOptions from './PlayerOptions';

const {width, height} = Dimensions.get('window');

const Player = ({source, currentVideo, nextVideo, previousVideo}: any) => {
  const playerRef = useRef(null);
  const [timerId, setTimerId] = useState();

  const {
    loadPlayer,
    setIsBuffering,
    setShowControls,
    setIsReady,
    setProgress,
    setDuration,
    setIsFinished,
  }: any = useStoreActions((actions) => actions.player);

  const {
    quality,
    isFullScreen,
    showControls,
    speed,
    isMuted,
    isPaused,
  }: any = useStoreState((state) => state.player);

  const selectedQuality = quality ? quality : currentVideo.qualities[0];

  useEffect(() => {
    loadPlayer();
  }, [loadPlayer]);

  const manageOverlay = () => {
    if (timerId) {
      clearTimeout(timerId);
    }

    setShowControls(true);

    const timer = () => {
      return setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    setTimerId(timer());
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={manageOverlay} activeOpacity={0.8}>
        <Video
          ref={playerRef}
          rate={speed}
          muted={isMuted}
          paused={isPaused}
          controls={false}
          repeat={false}
          posterResizeMode="contain"
          resizeMode="contain"
          style={{width, height: (width * 9) / 16}}
          source={{uri: selectedQuality.link}}
          onProgress={(data: any) => {
            setProgress(data.currentTime);
          }}
          onLoadStart={() => {
            setIsBuffering(true);
            setShowControls(true);
          }}
          onLoad={(data: any) => {
            setIsReady(true);
            setProgress(data.currentTime);
            setDuration(data.duration);
            setIsBuffering(false);
            setShowControls(false);
          }}
          onEnd={() => {
            setIsFinished(true);
          }}
        />

        {showControls && <PlayerControls />}
      </TouchableOpacity>

      {!isFullScreen && <PlayerOptions />}
    </View>
  );
};

export default memo(Player);
