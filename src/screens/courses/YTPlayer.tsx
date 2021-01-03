import {useStoreState} from 'easy-peasy';
import moment from 'moment';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import ytdl from 'react-native-ytdl';
import {queryCache, useMutation, useQuery} from 'react-query';
import {useTheme} from 'styled-components';
import {authUserApi} from '../../api/authUserApi';
import {getMessagesApi} from '../../api/getMessagesApi';
import {sendMessageApi} from '../../api/sendMessageApi';
import Player from '../../components/Player/Player';
// import {echo} from '../../libs/echo';

export default function YTPlayer({route, navigation}: any) {
  const {video} = route.params;

  const theme: any = useTheme();

  const {isFullScreen} = useStoreState((state) => state.player);

  const {data: authUser}: any = useQuery('auth_user', authUserApi, {
    retry: false,
  });

  const [link, setLink] = useState<any>();

  const updateMessages = useCallback(() => {
    queryCache.invalidateQueries(['getMessages', video.video_id]);
  }, [video.video_id]);

  // useEffect(() => {
  //   echo
  //     .channel(`channel-${video.video_id}`)
  //     .listen('MessageReceived', (data: any) => {
  //       if (data.message && data.message.sender_id !== authUser.id) {
  //         updateMessages();
  //       }
  //     });
  // }, [video.video_id, authUser, updateMessages]);

  useEffect(() => {
    const youtube_url = `https://www.youtube.com/watch?v=${video.video_id}`;

    ytdl(youtube_url)
      .then((data: any) => {
        setLink(data[0].url);
      })
      .catch((error: any) => {
        console.log(error, 'error');
      });
  }, [video]);

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
          <Player navigation={navigation} link={link} onFinish={() => null} />

          {isFullScreen === false && (
            <Chat channel_id={video.video_id} updateMessages={updateMessages} />
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
            borderColor: '#333',
            borderRadius: 5,
            padding: 5,
            paddingLeft: 10,
          }}
          onChangeText={(value: string) => setMessage(value)}
        />
        <TouchableOpacity
          onPress={onSubmit}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: '#333',
            borderRadius: 5,
            marginLeft: 5,
          }}>
          <Text style={{textAlignVertical: 'center', color: '#333'}}>send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
