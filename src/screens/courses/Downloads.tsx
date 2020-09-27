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
              const {taskInfo} = files[item.id];

              return (
                <TouchableOpacity
                  onPress={() => {
                    if (taskInfo.state === 'DOWNLOADING') {
                      return Alert.alert(
                        'Oops...',
                        'Video is still downloading',
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
                            Progress: {(taskInfo.percent * 100).toFixed(2)}%
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
                            Status: {taskInfo.state}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {taskInfo.state !== 'DONE' && (
                          <View style={{margin: 5}}>
                            <Icon
                              type="AntDesign"
                              name={
                                taskInfo.state === 'PAUSED'
                                  ? 'playcircleo'
                                  : 'pausecircleo'
                              }
                              color="#000"
                              size={26}
                              onPress={() => {
                                taskInfo.state === 'PAUSED'
                                  ? resumeDownloadAction(taskInfo.id)
                                  : pauseDownloadAction(taskInfo.id);
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
                                      stopDownloadAction(taskInfo.id);
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
