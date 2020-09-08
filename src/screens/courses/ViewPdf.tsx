import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Linking,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {useTheme} from 'styled-components';
import {baseUrl} from '../../libs/vars';

export default function ViewPdf({route}: any) {
  const theme: any = useTheme();

  const {source} = route.params;

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
        <View style={styles.container}>
          <Pdf
            onPressLink={(uri) => Linking.openURL(uri)}
            source={{
              uri: `${baseUrl}/storage/${source}`,
              cache: true,
            }}
            style={styles.pdf}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
