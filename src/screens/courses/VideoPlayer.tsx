import {useStoreState} from 'easy-peasy';
import React, {memo, useEffect, useRef, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PlayerOptions from '../../components/Player/PlayerOptions';
import PlayerOptionsModal from '../../components/Player/PlayerOptionsModal';
import {useTheme} from 'styled-components';
import Player from '../../components/Player/Player';
import {getVideos} from '../../libs/getVideos';
import {downloadPath} from '../../libs/vars';

const VideoPlayer = ({route, navigation}: any) => {
  const theme = useTheme();

  const {quality, video, chapter} = route.params;

  const [link, setLink] = useState<any>(null);

  const progress = useRef(0);

  const {currentVideo, nextVideo, previousVideo} = getVideos(
    video,
    chapter.videos,
  );

  const {isFullScreen, showOptions, videoQuality, files} = useStoreState(
    (state) => state.player,
  );

  const selectedQuality = quality ?? videoQuality;

  useEffect(() => {
    const getCachedVideoLink = async () => {
      const task = files && files[selectedQuality.id];

      const destination =
        task && task.state === 'DONE'
          ? `${downloadPath}/${selectedQuality.id}.mp4`
          : selectedQuality.link;

      setLink(destination);
    };

    getCachedVideoLink();
  }, [selectedQuality, files]);

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
            navigation={navigation}
            link={link}
            onFinish={() => null}
            progress={progress}
            onPrevious={{onPress: () => null, hasMore: previousVideo !== null}}
            onNext={{onPress: () => null, hasMore: nextVideo !== null}}
          />

          {!isFullScreen && <PlayerOptions />}

          {showOptions !== null && (
            <PlayerOptionsModal
              navigation={navigation}
              chapter={chapter}
              currentVideo={currentVideo}
              selectedQuality={quality}
              rates={['0.25', '0.50', '1.00', '1.25', '1.50', '2.00']}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default memo(VideoPlayer);
