import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, Dimensions, NativeModules, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import {checkSimulator} from '../../libs/check';
import {downloadPath} from '../../libs/vars';
import PlayerControls from './PlayerControls';
import PlayerOptions from './PlayerOptions';
import PlayerOptionsModal from './PlayerOptionsModal';

const {width, height} = Dimensions.get('window');

const Player = (props: any) => {
  const {
    navigation,
    videoQuality,
    currentVideo,
    nextVideo,
    previousVideo,
    chapter,
    progress,
  } = props;

  const playerRef = useRef(null);

  const [timerId, setTimerId] = useState<any>();

  const [isSimEmu, setIsSimEmu] = useState<any>(null);

  const [link, setLink] = useState<any>('');

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
    isSliding,
  }: any = useStoreState((state) => state.player);

  const {files}: any = useStoreState((state) => state.download);

  const selectedQuality = quality ? quality : videoQuality;

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
      const localProxyURL = await convertToProxyURL(selectedQuality.link);

      const destination =
        files[selectedQuality.id] &&
        files[selectedQuality.id].task.state === 'DONE'
          ? `${downloadPath}/${selectedQuality.id}.mp4`
          : localProxyURL;

      setLink(destination);
    };

    getCachedVideoLink();
  }, [selectedQuality, files]);

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
          rate={parseFloat(speed)}
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
            progress.current = data.currentTime;

            if (isBuffering) {
              setIsBuffering(false);
            }
          }}
          onLoadStart={() => {
            isSliding === false && setIsBuffering(true);
          }}
          onLoad={(data: any) => {
            progress.current = data.currentTime;

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
            currentVideo={currentVideo}
            nextVideo={nextVideo}
            previousVideo={previousVideo}
            chapter={chapter}
            playerRef={playerRef}
            toggleFullScreen={toggleFullScreen}
            progress={progress.current}
          />
        )}
      </TouchableOpacity>

      {!isFullScreen && (
        <PlayerOptions
          {...props}
          chapter={chapter}
          currentVideo={currentVideo}
          nextVideo={nextVideo}
          previousVideo={previousVideo}
        />
      )}

      {showOptions !== null && (
        <PlayerOptionsModal
          {...props}
          chapter={chapter}
          currentVideo={currentVideo}
          selectedQuality={selectedQuality}
          rates={['0.25', '0.50', '1.00', '1.25', '1.50', '2.00']}
        />
      )}
    </View>
  );
};

export default memo(Player);
