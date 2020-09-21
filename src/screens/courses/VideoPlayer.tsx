import {useStoreState} from 'easy-peasy';
import React, {memo, useRef} from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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

  const {isFullScreen} = useStoreState((state) => state.player);

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
            videoQuality={quality}
            progress={progress}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default memo(VideoPlayer);
