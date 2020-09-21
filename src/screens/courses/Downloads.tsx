import {useStoreActions, useStoreState} from 'easy-peasy';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
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
          {Object.values(files).map((file: any) => {
            return (
              <TouchableOpacity
                key={file.task.id}
                onPress={() => {
                  if (file.task.state === 'DOWNLOADING') {
                    return Alert.alert('Oops...', 'Video is still downloading');
                  }

                  navigation.push(screens.VideoPlayer.name, {
                    quality: file.quality,
                    video: file.video,
                    chapter: file.chapter,
                  });
                }}>
                <View style={{margin: 5, backgroundColor: '#fff', padding: 10}}>
                  <View style={{marginBottom: 10}}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontFamily: theme.fontFamily.QuicksandBold,
                        fontSize: 18,
                      }}>
                      {file.video.title}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <View style={{marginVertical: 2}}>
                        <Text
                          style={{
                            fontFamily: theme.fontFamily.QuicksandSemiBold,
                            fontSize: 14,
                          }}>
                          Quality: {file.quality.quality}
                        </Text>
                      </View>

                      <View style={{marginVertical: 2}}>
                        <Text
                          style={{
                            fontFamily: theme.fontFamily.QuicksandSemiBold,
                            fontSize: 14,
                          }}>
                          Progress: {file.task.percent.toFixed(2) * 100}%
                        </Text>
                      </View>

                      <View style={{marginVertical: 2}}>
                        <Text
                          style={{
                            fontFamily: theme.fontFamily.QuicksandSemiBold,
                            fontSize: 14,
                          }}>
                          Status: {file.task.state}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={{margin: 5}}>
                        <Icon
                          type="AntDesign"
                          name={
                            file.task.state === 'PAUSED'
                              ? 'playcircleo'
                              : 'pausecircleo'
                          }
                          color="#000"
                          size={26}
                          onPress={() => {
                            file.task.state === 'PAUSED'
                              ? resumeDownloadAction({task: file.task})
                              : pauseDownloadAction({task: file.task});
                          }}
                        />
                      </View>

                      <View style={{margin: 5}}>
                        <Icon
                          type="AntDesign"
                          name="delete"
                          color="#f00"
                          size={26}
                          onPress={() => stopDownloadAction({task: file.task})}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </>
  );
}
