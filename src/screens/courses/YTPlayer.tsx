import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Button,
  Dimensions,
  FlatList,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import YouTube from 'react-native-youtube';
import {queryCache, useMutation, useQuery} from 'react-query';
import {useTheme} from 'styled-components';
import {getMessagesApi} from '../../api/getMessagesApi';
import {sendMessageApi} from '../../api/sendMessageApi';
import {echo} from '../../libs/echo';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

export default function YTPlayer({route, navigation}: any) {
  const {video} = route.params;

  const theme: any = useTheme();

  const [isFullScreen, setIsFullScreen] = useState(false);

  const player = useRef(null);

  const handleReady = () => {
    console.log('player', player);
  };

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
    echo
      .channel(`channel-${video.video_id}`)
      .listen('MessageReceived', (e: any) => {
        console.log('event', e);
      });
  }, [video]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return toggleFullScreen(true);
    });
  }, [toggleFullScreen]);

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
          <YouTube
            ref={player}
            apiKey="AIzaSyCD4OkzcsuvbaMZeFrT_cS_EcqlAXPJZSg"
            videoId={video.video_id}
            style={{
              width: isFullScreen ? '100%' : width,
              height: isFullScreen ? width : (width * 9) / 16,
            }}
            posterResizeMode="cover"
            resizeMode="cover"
            onReady={handleReady}
            play={true}
            controls={2}
            fullscreen={false}
          />

          {isFullScreen === false && (
            <>
              <Button
                title="Toggle fullscreen"
                onPress={() => toggleFullScreen(false)}
              />

              <Chat channel_id={video.video_id} />
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const Chat = ({channel_id}: any) => {
  const [message, setMessage] = useState('');

  const [sendMessage] = useMutation(sendMessageApi, {
    onSuccess: (data) => {
      setMessage('');

      const allMessages: any = queryCache.getQueryData([
        'getMessages',
        channel_id,
      ]);

      queryCache.setQueryData(
        ['getMessages', channel_id],
        [...allMessages, data],
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {data: messages, isLoading}: any = useQuery(
    ['getMessages', channel_id],
    getMessagesApi,
    {
      retry: false,
    },
  );

  const onSubmit = async () => {
    await sendMessage({message, channel_id});
    Keyboard.dismiss();
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 5}}>
      <View style={{flex: 1, backgroundColor: '#fff', padding: 5}}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={messages.sort((a: any, b: any) => {
            return moment(b.created_at) - moment(a.created_at);
          })}
          renderItem={({item}) => {
            return (
              <View key={item.id}>
                <Text>{item.message}</Text>
              </View>
            );
          }}
        />
      </View>

      <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
        <TextInput
          value={message}
          placeholder="type a message..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ddd',
            paddingLeft: 10,
          }}
          onChangeText={(value: string) => setMessage(value)}
        />
        <Button onPress={onSubmit} title="Send" />
      </View>
    </View>
  );
};
