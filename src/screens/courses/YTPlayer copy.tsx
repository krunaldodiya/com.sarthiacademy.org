import moment from 'moment';
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import ytdl from 'react-native-ytdl';
import {useMutation, useQuery} from 'react-query';
import {useTheme} from 'styled-components';
import {getMessagesApi} from '../../api/getMessagesApi';
import {sendMessageApi} from '../../api/sendMessageApi';

const {width, height} = Dimensions.get('window');

export default function YTPlayer({route, navigation}: any) {
  const {video_id} = route.params;

  const theme: any = useTheme();

  const [link, setLink] = useState<any>();
  const [isFullScreen, setIsFullScreen] = useState<any>(false);

  const playerRef = useRef(null);

  useEffect(() => {
    ytdl(`https://www.youtube.com/watch?v=${video_id}`).then((data: any) => {
      setLink(data[0].url);
    });
  }, [video_id]);

  if (link === undefined) {
    return <ActivityIndicator />;
  }

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
        <Video
          ref={playerRef}
          muted={false}
          paused={false}
          controls={false}
          repeat={false}
          posterResizeMode="cover"
          resizeMode="cover"
          style={{
            width: isFullScreen ? '100%' : width,
            height: isFullScreen ? width : (width * 9) / 16,
          }}
          source={{uri: link}}
        />
      </SafeAreaView>
    </>
  );
}
