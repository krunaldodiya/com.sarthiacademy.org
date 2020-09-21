import {useStoreState} from 'easy-peasy';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from 'styled-components';
import {screens} from '../../libs/screens';

export default function Downloads({route, navigation}: any) {
  const theme: any = useTheme();

  const {files}: any = useStoreState((state) => state.download);

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
                onPress={() => {
                  if (file.status !== 'done') {
                    return Alert.alert('Oops...', 'Video is still downloading');
                  }

                  navigation.push(screens.VideoPlayer.name, {
                    quality: file.quality,
                    video: file.video,
                    chapter: file.chapter,
                  });
                }}>
                <View
                  key={file.id}
                  style={{margin: 5, backgroundColor: '#fff', padding: 10}}>
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
                          Progress: {file.progress}%
                        </Text>
                      </View>
                    </View>

                    <View style={{justifyContent: 'center'}}>
                      <Text>hello</Text>
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
