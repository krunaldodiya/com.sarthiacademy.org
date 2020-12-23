import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo, useEffect, useRef, useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PlayerOptions from '../../components/Player/PlayerOptions';
import PlayerOptionsModal from '../../components/Player/PlayerOptionsModal';
import {useTheme} from 'styled-components';
import Player from '../../components/Player/Player';
import {getVideos} from '../../libs/getVideos';
import {downloadPath} from '../../libs/vars';
import {screens} from '../../libs/screens';

const VideoPlayer = ({route, navigation}: any) => {
  const theme = useTheme();

  const {selectedQuality, video, chapter} = route.params;

  const [link, setLink] = useState<any>(null);

  const {currentVideo} = getVideos(video, chapter.videos);

  const {
    isFinished,
    isPaused,
    isFullScreen,
    showOptions,
    quality,
    files,
  } = useStoreState((state) => state.player);

  const {setIsPaused, setQuality} = useStoreActions(
    (actions) => actions.player,
  );

  useEffect(() => {
    setQuality(selectedQuality);
  }, []);

  useEffect(() => {
    const getCachedVideoLink = async () => {
      const task = files && quality && files[quality.id];

      const destination =
        task && task.state === 'DONE'
          ? `${downloadPath}/${quality.id}.mp4`
          : quality.link;

      setLink(destination);
    };

    getCachedVideoLink();
  }, [files, quality]);

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
          <Player navigation={navigation} live={false} link={link} />

          {!isFullScreen && <PlayerOptions />}

          {showOptions !== null && (
            <PlayerOptionsModal
              navigation={navigation}
              videoQualities={currentVideo.qualities}
              rates={['0.25', '0.50', '1.00', '1.25', '1.50', '2.00']}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default memo(VideoPlayer);
