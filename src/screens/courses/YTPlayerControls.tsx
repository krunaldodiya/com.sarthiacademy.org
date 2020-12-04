import {useStoreActions, useStoreState} from 'easy-peasy';
import moment from 'moment';
import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import Slider from 'react-native-slider';

const YTPlayerControls = (props: any) => {
  const {navigation, playerRef, toggleFullScreen, progress} = props;

  const secondsToHms = (d) => {
    return moment.utc(d * 1000).format('mm:ss');
  };

  const {
    duration,
    isFinished,
    speed,
    quality,
    showControls,
    showOptions,
    isFullScreen,
    isBuffering,
    isMuted,
    isPaused,
    isSliding,
  } = useStoreState((state) => state.player);

  const {setIsPaused, setShowOptions, setIsSliding} = useStoreActions(
    (actions) => actions.player,
  );

  const skip = (time: number) => {
    setIsPaused(true);
    playerRef.current.seek(progress + time);
    setIsPaused(false);
  };

  return (
    <View style={styles.overlay}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}} />

        <View
          style={{
            flex: 5,
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              type="MaterialCommunityIcons"
              name="rewind-10"
              size={26}
              color="#fff"
              style={styles.icon}
              onPress={() => skip(-10)}
            />

            {isBuffering ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <Icon
                type="MaterialCommunityIcons"
                name={isFinished ? 'replay' : isPaused ? 'play' : 'pause'}
                size={36}
                color="#fff"
                style={styles.icon}
                onPress={() => {
                  //
                }}
              />
            )}

            <Icon
              type="MaterialCommunityIcons"
              name="fast-forward-10"
              size={26}
              color="#fff"
              style={styles.icon}
              onPress={() => skip(10)}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 5,
              }}>
              <Text style={{color: '#fff'}}>
                {secondsToHms(progress)} / {secondsToHms(duration)}
              </Text>
            </View>

            <View style={{flex: 1}}>
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
                onSlidingStart={() => setIsSliding(true)}
                onSlidingComplete={() => setIsSliding(false)}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 3,
              }}>
              <Icon
                type="MaterialCommunityIcons"
                name="quality-high"
                size={26}
                color="#fff"
                onPress={() => setShowOptions('quality')}
                style={{
                  marginLeft: 3,
                  marginRight: 3,
                }}
              />

              <Icon
                type="MaterialCommunityIcons"
                name="play-speed"
                size={26}
                color="#fff"
                onPress={() => setShowOptions('speed')}
                style={{
                  marginLeft: 3,
                  marginRight: 3,
                }}
              />

              <Icon
                type="MaterialCommunityIcons"
                name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'}
                size={26}
                color="#fff"
                onPress={() => toggleFullScreen(false)}
                style={{
                  marginLeft: 3,
                  marginRight: 3,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
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

export default memo(YTPlayerControls);
