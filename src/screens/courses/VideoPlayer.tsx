import React, {memo} from 'react';
import {View} from 'react-native';
import Player from '../../components/Player/Player';
import {getVideos} from '../../libs/getVideos';

const VideoPlayer = ({navigation, route}: any) => {
  const {video, chapter} = route.params;

  const {currentVideo, nextVideo, previousVideo} = getVideos(
    video,
    chapter.videos,
  );

  return (
    <View style={{flex: 1}}>
      <Player
        currentVideo={currentVideo}
        nextVideo={nextVideo}
        previousVideo={previousVideo}
      />
    </View>
  );
};

export default memo(VideoPlayer);
