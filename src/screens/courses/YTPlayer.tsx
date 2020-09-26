import moment from 'moment';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
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
import {authUserApi} from '../../api/authUserApi';
import {getMessagesApi} from '../../api/getMessagesApi';
import {sendMessageApi} from '../../api/sendMessageApi';
import {echo} from '../../libs/echo';

const {width, height} = Dimensions.get('window');

export default function YTPlayer({route, navigation}: any) {
  const {video} = route.params;

  const theme: any = useTheme();

  const {data: authUser}: any = useQuery('auth_user', authUserApi, {
    retry: false,
  });

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

  const updateMessages = useCallback(() => {
    queryCache.invalidateQueries(['getMessages', video.video_id]);
  }, [video.video_id]);

  useEffect(() => {
    echo
      .channel(`channel-${video.video_id}`)
      .listen('MessageReceived', ({message}: any) => {
        if (message.sender_id !== authUser.id) {
          updateMessages();
        }
      });
  }, [video.video_id, authUser, updateMessages]);

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

              <Chat
                channel_id={video.video_id}
                updateMessages={updateMessages}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const Chat = memo(({channel_id, updateMessages}: any) => {
  const [message, setMessage] = useState('');

  const [sendMessage] = useMutation(sendMessageApi, {
    onSuccess: () => {
      updateMessages();
      setMessage('');
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
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={messages.sort((a: any, b: any) => {
            return moment(b.created_at) - moment(a.created_at);
          })}
          renderItem={({item}) => {
            return (
              <View
                key={item.id}
                style={{
                  borderWidth: 1,
                  borderColor: '#eee',
                  marginBottom: 2,
                  marginHorizontal: 1,
                  padding: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}>
                    {item.sender.name ?? 'Unknown'}
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    {moment(item.created_at).fromNow()}
                  </Text>
                </View>

                <View style={{marginTop: 5}}>
                  <Text style={{fontSize: 13}}>{item.message}</Text>
                </View>
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
});
