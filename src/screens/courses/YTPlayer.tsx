import React, {useRef} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import YouTube from 'react-native-youtube';
import {useTheme} from 'styled-components';

export default function YTPlayer({route, navigation}: any) {
  const {videoId} = route.params;

  const player = useRef(null);

  const theme: any = useTheme();

  const handleReady = () => {
    console.log('player', player);
  };

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
          <YouTube
            ref={player}
            apiKey="AIzaSyCD4OkzcsuvbaMZeFrT_cS_EcqlAXPJZSg"
            videoId={videoId}
            style={{
              alignSelf: 'stretch',
              width: '100%',
              height: 300,
            }}
            onChangeFullscreen={() => console.log('changed fullscreen mode')}
            onReady={handleReady}
            play={true}
            controls={0}
            fullscreen={true}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
