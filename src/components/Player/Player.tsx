import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, Dimensions, NativeModules, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import {checkSimulator} from '../../libs/check';
import PlayerControls from './PlayerControls';
import PlayerOptions from './PlayerOptions';
import PlayerOptionsModal from './PlayerOptionsModal';

const {width, height} = Dimensions.get('window');

const Player = (props: any) => {
  const {navigation, currentVideo, nextVideo, previousVideo, chapter} = props;

  const playerRef = useRef(null);

  const [timerId, setTimerId] = useState();

  const [isSimEmu, setIsSimEmu] = useState(null);

  const [progress, setProgress] = useState(0);

  const [link, setLink] = useState('');

  const {
    resetPlayer,
    setIsBuffering,
    setShowControls,
    setDuration,
    setIsFinished,
    setIsFullScreen,
  }: any = useStoreActions((actions) => actions.player);

  const {
    speed,
    quality,
    showControls,
    showOptions,
    isFullScreen,
    isBuffering,
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
    return () => {
      resetPlayer();
    };
  }, [resetPlayer]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return toggleFullScreen(true);
    });
  }, [toggleFullScreen]);

  useEffect(() => {
    checkSimulator(NativeModules, (status: any) => {
      setIsSimEmu(status);
    });
  }, []);

  useEffect(() => {
    const getCachedVideoLink = async () => {
      const localProxiedURL = await convertToProxyURL(selectedQuality.link);

      setLink(localProxiedURL);
    };

    getCachedVideoLink();
  }, [selectedQuality]);

  const manageOverlay = () => {
    if (showControls) {
      return;
    }

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

  if (!link.length) {
    return null;
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
          posterResizeMode="cover"
          resizeMode="cover"
          style={{
            width: isFullScreen ? '100%' : width,
            height: isFullScreen ? width : (width * 9) / 16,
          }}
          source={{uri: link}}
          onProgress={(data: any) => {
            setProgress(data.currentTime);
          }}
          onLoadStart={() => {
            setIsBuffering(true);
          }}
          onLoad={(data: any) => {
            setProgress(data.currentTime);
            setDuration(data.duration);
            setIsBuffering(false);
          }}
          onEnd={() => {
            setIsFinished(true);
          }}
          onSeek={() => {
            setIsBuffering(true);
          }}
          onReadyForDisplay={() => {
            setIsBuffering(false);
          }}
        />

        {(isBuffering || showControls) && (
          <PlayerControls
            {...props}
            currentVideo={currentVideo}
            nextVideo={nextVideo}
            previousVideo={previousVideo}
            chapter={chapter}
            playerRef={playerRef}
            toggleFullScreen={toggleFullScreen}
            progress={progress}
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

      {showOptions !== null && (
        <PlayerOptionsModal
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
