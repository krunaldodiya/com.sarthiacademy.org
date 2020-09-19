import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, Dimensions, NativeModules, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import {checkSimulater} from '../../libs/check';
import PlayerControls from './PlayerControls';
import PlayerOptions from './PlayerOptions';

const {width, height} = Dimensions.get('window');

const Player = (props: any) => {
  const {navigation, currentVideo, nextVideo, previousVideo, chapter} = props;

  const playerRef = useRef(null);

  const [timerId, setTimerId] = useState();

  const [isSimEmu, setIsSimEmu] = useState(null);

  const {
    loadPlayer,
    setIsBuffering,
    setShowControls,
    setIsReady,
    setProgress,
    setDuration,
    setIsFinished,
    setIsFullScreen,
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

  const toggleFullScreen = useCallback(
    (backButtonPressed: boolean) => {
      if (isFullScreen) {
        Orientation.lockToPortrait();
        setIsFullScreen(false);
        return true;
      }

      if (!backButtonPressed) {
        Orientation.lockToLandscape();
        setIsFullScreen(true);
        return true;
      }

      navigation.goBack();
      return true;
    },
    [navigation, isFullScreen, setIsFullScreen],
  );

  useEffect(() => {
    loadPlayer();
  }, [loadPlayer]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return toggleFullScreen(true);
    });
  }, [toggleFullScreen]);

  useEffect(() => {
    checkSimulater(NativeModules, (status: any) => {
      setIsSimEmu(status);
    });
  }, []);

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

  if (isSimEmu) {
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 22}}>
          Not Allowed in Simulator/Emulator
        </Text>
      </View>
    );
  }

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
          style={{
            width: isFullScreen ? '100%' : width,
            height: isFullScreen ? width : (width * 9) / 16,
          }}
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

        {showControls && (
          <PlayerControls
            {...props}
            currentVideo={currentVideo}
            nextVideo={nextVideo}
            previousVideo={previousVideo}
            chapter={chapter}
            playerRef={playerRef}
            toggleFullScreen={toggleFullScreen}
          />
        )}
      </TouchableOpacity>

      {!isFullScreen && (
        <PlayerOptions
          {...props}
          currentVideo={currentVideo}
          nextVideo={nextVideo}
          previousVideo={previousVideo}
          chapter={chapter}
        />
      )}
    </View>
  );
};

export default memo(Player);
