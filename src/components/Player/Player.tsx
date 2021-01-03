import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, Dimensions, NativeModules, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import {checkSimulator} from '../../libs/check';
import PlayerControls from './PlayerControls';

const {width} = Dimensions.get('window');

const Player = (props: any) => {
  const {navigation, link, onFinish, onPrevious, onNext} = props;

  const playerRef = useRef<any>(null);

  const [timerId, setTimerId] = useState<any>();

  const [isSimEmu, setIsSimEmu] = useState<any>(null);

  const [progress, setProgress] = useState<any>(0);
  const [duration, setDuration] = useState<any>(0);

  const {
    resetPlayer,
    setIsBuffering,
    setShowControls,
    setIsFinished,
    setIsFullScreen,
  }: any = useStoreActions((actions) => actions.player);

  const {
    showControls,
    isFullScreen,
    isBuffering,
    isMuted,
    isPaused,
    isSliding,
  }: any = useStoreState((state) => state.player);

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

  if (!link) {
    return null;
  }

  return (
    <TouchableOpacity onPress={manageOverlay} activeOpacity={0.8}>
      <Video
        ref={playerRef}
        muted={isMuted}
        paused={isPaused}
        controls={false}
        repeat={false}
        posterResizeMode="cover"
        resizeMode="cover"
        style={{
          width: isFullScreen ? '100%' : width,
          height: isFullScreen ? '100%' : (width * 9) / 16,
        }}
        source={{uri: link}}
        onProgress={(data: any) => {
          setProgress(data.currentTime);
          if (isBuffering) {
            setIsBuffering(false);
          }
        }}
        onLoadStart={() => {
          isSliding === false && setIsBuffering(true);
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
          isSliding === false && setIsBuffering(true);
        }}
        onReadyForDisplay={() => {
          setIsBuffering(false);
        }}
      />

      {(isBuffering || showControls) && (
        <PlayerControls
          {...props}
          onFinish={onFinish}
          playerRef={playerRef}
          toggleFullScreen={toggleFullScreen}
          progress={progress}
          duration={duration}
          onPrevious={onPrevious}
          onNext={onNext}
          live={duration < 0}
        />
      )}
    </TouchableOpacity>
  );
};

export default memo(Player);
