import {useStoreActions, useStoreState} from 'easy-peasy';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {useQuery} from 'react-query';
import {useTheme} from 'styled-components';
import {getQualityByIds} from '../../api/getQualityByIds';
import {screens} from '../../libs/screens';

export default function Downloads({navigation}: any) {
  const theme: any = useTheme();

  const {files}: any = useStoreState((state) => state.download);

  const {
    pauseDownloadAction,
    resumeDownloadAction,
    stopDownloadAction,
  }: any = useStoreActions((actions) => actions.download);

  const {data: qualities, isLoading} = useQuery(
    ['qualities', Object.keys(files)],
    getQualityByIds,
  );

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.backgroundColor.primary}
      />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.backgroundColor.primary,
        }}>
        <View style={{flex: 1}}>
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            data={qualities}
            renderItem={({item}: any) => {
              const task = files[item.id];

              return (
                <TouchableOpacity
                  onPress={() => {
                    if (task.state !== 'DONE') {
                      return Alert.alert(
                        'Oops...',
                        'Video is not downloaded yet',
                      );
                    }

                    navigation.push(screens.VideoPlayer.name, {
                      quality: item,
                      video: item.video,
                      chapter: item.video.chapter,
                    });
                  }}>
                  <View style={{margin: 5, backgroundColor: '#fff'}}>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: '#eee',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: theme.fontFamily.QuicksandBold,
                          fontSize: 18,
                        }}>
                        {item.video.title}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', padding: 5}}>
                      <View style={{flex: 1, justifyContent: 'center'}}>
                        <View style={{marginVertical: 2}}>
                          <Text
                            style={{
                              fontFamily: theme.fontFamily.QuicksandSemiBold,
                              fontSize: 14,
                            }}>
                            Quality: {item.quality}
                          </Text>
                        </View>

                        <View style={{marginVertical: 2}}>
                          <Text
                            style={{
                              fontFamily: theme.fontFamily.QuicksandSemiBold,
                              fontSize: 14,
                            }}>
                            Progress: {(task.percent * 100).toFixed(2)}%
                          </Text>
                        </View>

                        <View style={{marginVertical: 2}}>
                          <Text
                            style={{
                              fontFamily: theme.fontFamily.QuicksandSemiBold,
                              fontSize: 14,
                            }}>
                            Size: {item.size} MB
                          </Text>
                        </View>

                        <View style={{marginVertical: 2}}>
                          <Text
                            style={{
                              fontFamily: theme.fontFamily.QuicksandSemiBold,
                              fontSize: 14,
                            }}>
                            Status: {task.state}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {task.state !== 'DONE' && (
                          <View style={{margin: 5}}>
                            <Icon
                              type="AntDesign"
                              name={
                                task.state === 'PAUSED'
                                  ? 'playcircleo'
                                  : 'pausecircleo'
                              }
                              color="#000"
                              size={26}
                              onPress={() => {
                                task.state === 'PAUSED'
                                  ? resumeDownloadAction(task)
                                  : pauseDownloadAction(task);
                              }}
                            />
                          </View>
                        )}

                        <View style={{margin: 5}}>
                          <Icon
                            type="AntDesign"
                            name="delete"
                            color="#f00"
                            size={26}
                            onPress={() => {
                              Alert.alert(
                                'Delete Download',
                                'Are you sure ?',
                                [
                                  {
                                    text: 'OK',
                                    onPress: () => {
                                      stopDownloadAction(task);
                                    },
                                  },

                                  {
                                    text: 'Cancel',
                                  },
                                ],
                                {cancelable: false},
                              );
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
