import {useStoreState} from 'easy-peasy';
import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {useTheme} from 'styled-components';

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
          {Object.values(files).map((quality: any) => {
            return (
              <View
                key={quality.id}
                style={{margin: 5, backgroundColor: '#fff', padding: 10}}>
                <Text
                  style={{
                    fontFamily: theme.fontFamily.QuicksandBold,
                    fontSize: 14,
                  }}>
                  {quality.id}
                </Text>

                <Text
                  style={{
                    fontFamily: theme.fontFamily.QuicksandBold,
                    fontSize: 14,
                  }}>
                  Progress: {quality.progress}%
                </Text>

                <Text
                  style={{
                    fontFamily: theme.fontFamily.QuicksandBold,
                    fontSize: 14,
                  }}>
                  Status: {quality.status}
                </Text>
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    </>
  );
}
