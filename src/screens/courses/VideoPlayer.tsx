import {useStoreState} from 'easy-peasy';
import React, {memo, useRef} from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PlayerOptions from '../../components/Player/PlayerOptions';
import PlayerOptionsModal from '../../components/Player/PlayerOptionsModal';
import {useTheme} from 'styled-components';
import Player from '../../components/Player/Player';
import {getVideos} from '../../libs/getVideos';

const VideoPlayer = (props: any) => {
  const theme = useTheme();

  const {route} = props;
  const {quality, video, chapter} = route.params;

  const {currentVideo, nextVideo, previousVideo} = getVideos(
    video,
    chapter.videos,
  );

  const {isFullScreen, showOptions, videoQuality} = useStoreState(
    (state) => state.player,
  );

  const progress = useRef(0);

  return (
    <>
      <StatusBar
        hidden={isFullScreen}
        barStyle="light-content"
        backgroundColor={theme.backgroundColor.primary}
      />

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: theme.backgroundColor.primary,
        }}>
        <View style={{flex: 1}}>
          <Player
            {...props}
            chapter={chapter}
            currentVideo={currentVideo}
            nextVideo={nextVideo}
            previousVideo={previousVideo}
            selectedQuality={quality ?? videoQuality}
            progress={progress}
          />

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
              selectedQuality={quality ?? videoQuality}
              rates={['0.25', '0.50', '1.00', '1.25', '1.50', '2.00']}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default memo(VideoPlayer);
