import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {useTheme} from 'styled-components';
import {Title} from '../../styled/Title';

export default function Downloads({route, navigation}: any) {
  const theme: any = useTheme();

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
        <View style={{padding: 50}}>
          <Title fontSize="22px" textAlign="center" color="black" mb="30px">
            Coming Soon
          </Title>
        </View>
      </SafeAreaView>
    </>
  );
}
