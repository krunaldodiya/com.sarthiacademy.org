import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {useTheme} from 'styled-components';
import {Title} from '../../styled/Title';

export default function AccessDenied({route, navigation}: any) {
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
          <Title fontSize="28px" textAlign="center" color="black" mb="30px">
            Access Denied
          </Title>

          <Title fontSize="18px" textAlign="center" color="#fff">
            Only premium members can view this live streaming
          </Title>
        </View>
      </SafeAreaView>
    </>
  );
}
