import React, {memo} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {screens} from '../../libs/screens';
import {useTheme} from 'styled-components';
import {baseUrl} from '../../libs/vars';

const {width} = Dimensions.get('window');

function Videos({navigation, route}: any) {
  const theme: any = useTheme();

  const {chapter} = route.params;

  return (
    <>
      <StatusBar
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
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            data={chapter.videos}
            style={{margin: 5}}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.push(screens.VideoPlayer.name, {
                    quality: item.qualities[0],
                    video: item,
                    chapter,
                  });
                }}>
                <ImageBackground
                  imageStyle={{opacity: 0.7}}
                  resizeMode="contain"
                  source={{uri: `${baseUrl}/storage/${item.thumbnail}`}}
                  style={{
                    width,
                    height: (width * 9) / 16,
                    backgroundColor: theme.backgroundColor.secondary,
                    marginBottom: 10,
                  }}>
                  <View style={{padding: 10}}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontFamily: theme.fontFamily.QuicksandBold,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export default memo(Videos);
