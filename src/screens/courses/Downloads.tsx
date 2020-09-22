import {useStoreActions, useStoreState} from 'easy-peasy';
import React from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {useTheme} from 'styled-components';
import {screens} from '../../libs/screens';

export default function Downloads({route, navigation}: any) {
  const theme: any = useTheme();

  const {files}: any = useStoreState((state) => state.download);

  const {
    pauseDownloadAction,
    resumeDownloadAction,
    stopDownloadAction,
  }: any = useStoreActions((actions) => actions.download);

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
            data={Object.values(files)}
            renderItem={({item}: any) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item.task.state === 'DOWNLOADING') {
                      return Alert.alert(
                        'Oops...',
                        'Video is still downloading',
                      );
                    }

                    navigation.push(screens.VideoPlayer.name, {
                      quality: item.quality,
                      video: item.video,
                      chapter: item.chapter,
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
                            Quality: {item.quality.quality}
                          </Text>
                        </View>

                        <View style={{marginVertical: 2}}>
                          <Text
                            style={{
                              fontFamily: theme.fontFamily.QuicksandSemiBold,
                              fontSize: 14,
                            }}>
                            Progress: {(item.task.percent * 100).toFixed(2)}%
                          </Text>
                        </View>

                        <View style={{marginVertical: 2}}>
                          <Text
                            style={{
                              fontFamily: theme.fontFamily.QuicksandSemiBold,
                              fontSize: 14,
                            }}>
                            Size: {item.quality.size} MB
                          </Text>
                        </View>

                        <View style={{marginVertical: 2}}>
                          <Text
                            style={{
                              fontFamily: theme.fontFamily.QuicksandSemiBold,
                              fontSize: 14,
                            }}>
                            Status: {item.task.state}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {item.task.state === 'DOWNLOADING' && (
                          <View style={{margin: 5}}>
                            <Icon
                              type="AntDesign"
                              name={
                                item.task.state === 'PAUSED'
                                  ? 'playcircleo'
                                  : 'pausecircleo'
                              }
                              color="#000"
                              size={26}
                              onPress={() => {
                                item.task.state === 'PAUSED'
                                  ? resumeDownloadAction({task: item.task})
                                  : pauseDownloadAction({task: item.task});
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
                            onPress={() =>
                              stopDownloadAction({task: item.task})
                            }
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
