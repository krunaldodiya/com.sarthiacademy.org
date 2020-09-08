import {useStoreActions, useStoreState} from 'easy-peasy';
import moment from 'moment';
import React, {memo} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import Slider from 'react-native-slider';
import Video from 'react-native-video';
import {downloadPath} from '../libs/vars';

const Player = ({
  toggleFullScreen,
  width,
  height,
  playerRef,
  changeVideo,
}: any) => {
  const {
    currentVideo,
    nextVideo,
    previousVideo,
    progress,
    duration,
    isPaused,
    isFinished,
    showOverlay,
    isFullScreen,
    speed,
    quality,
    isReady,
  } = useStoreState((state) => state.player);

  const {
    setIsReady,
    setProgress,
    setDuration,
    setIsPaused,
    setIsFinished,
    setShowOverlay,
    setCurrentVideo,
    setShowModal,
  } = useStoreActions((actions) => actions.player);

  const {files} = useStoreState((state) => state.download);

  const secondsToHms = (d) => {
    return moment.utc(d * 1000).format('mm:ss');
  };

  const destination =
    files[quality.id] && files[quality.id]?.status === 'done'
      ? `${downloadPath}/${quality.id}.mp4`
      : quality.link;

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setTimeout(() => {
            setShowOverlay(false);
          }, 3000);

          setShowOverlay(true);
        }}
        style={{width, height}}>
        <Video
          ref={playerRef}
          rate={speed}
          source={{uri: destination}}
          style={{...styles.overlaySet}}
          muted={false}
          controls={false}
          repeat={false}
          paused={isPaused}
          posterResizeMode="stretch"
          resizeMode="stretch"
          onProgress={(data) => {
            setProgress(data.currentTime);
          }}
          onLoad={(data) => {
            setIsReady(false);
            setProgress(data.currentTime);
            setDuration(data.duration);
          }}
          onEnd={() => {
            setIsFinished(true);
          }}
          onReadyForDisplay={() => {
            setIsReady(true);
          }}
        />

        {!isReady && (
          <ActivityIndicator
            color="#fff"
            size="large"
            style={{
              position: 'absolute',
              top: height / 2 - 20,
              left: 0,
              right: 0,
            }}
          />
        )}

        <View style={styles.overlay}>
          {showOverlay && (
            <View style={{...styles.overlaySet, backgroundColor: '#0009'}}>
              <View style={{position: 'absolute', top: 5, right: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type="MaterialIcons"
                    name="more-vert"
                    size={26}
                    color="#fff"
                    style={styles.icon}
                    onPress={() => setShowModal(true)}
                  />
                </View>
              </View>

              <View
                style={{
                  position: 'absolute',
                  top: height / 2 - 20,
                  left: 0,
                  right: 0,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type="AntDesign"
                    name="stepbackward"
                    size={26}
                    color={previousVideo ? '#fff' : '#333'}
                    style={styles.icon}
                    onPress={() => previousVideo && changeVideo(previousVideo)}
                  />
                  <Icon
                    type="MaterialCommunityIcons"
                    name={isFinished ? 'replay' : isPaused ? 'play' : 'pause'}
                    size={36}
                    color="#fff"
                    style={styles.icon}
                    onPress={() => {
                      if (isFinished) {
                        playerRef.current.seek(0);
                        setCurrentVideo(currentVideo);
                      } else {
                        setIsPaused(!isPaused);
                      }
                    }}
                  />
                  <Icon
                    type="AntDesign"
                    name="stepforward"
                    size={26}
                    color={nextVideo ? '#fff' : '#333'}
                    style={styles.icon}
                    onPress={() => nextVideo && changeVideo(nextVideo)}
                  />
                </View>
              </View>

              <View style={{position: 'absolute', bottom: 0}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: 110,
                      alignItems: 'center',
                      justifyContent: 'center',
                      bottom: 0,
                    }}>
                    <Text style={{color: '#fff'}}>
                      {secondsToHms(progress)} / {secondsToHms(duration)}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: Dimensions.get('window').width - 150,
                    }}>
                    <Slider
                      minimumValue={0}
                      maximumValue={duration}
                      value={progress}
                      minimumTrackTintColor="#fff"
                      maximumTrackTintColor="#bbb"
                      onValueChange={(data) => {
                        playerRef.current.seek(data);
                      }}
                      thumbTintColor="white"
                    />
                  </View>

                  <View style={{width: 40, alignItems: 'center', bottom: -5}}>
                    <Icon
                      type="MaterialIcons"
                      name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'}
                      size={26}
                      color="#fff"
                      onPress={() => toggleFullScreen(false)}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlaySet: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  timer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
});

export default memo(Player);
