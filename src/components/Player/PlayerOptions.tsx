import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'styled-components';

const PlayerOptions = () => {
  const theme = useTheme();

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 2,
        }}>
        <View style={styles.option}>
          <Text
            style={[
              styles.optionText,
              {fontFamily: theme.fontFamily.QuicksandBold},
            ]}>
            Download
          </Text>
        </View>

        <View style={styles.option}>
          <Text
            style={[
              styles.optionText,
              {fontFamily: theme.fontFamily.QuicksandBold},
            ]}>
            240p
          </Text>
        </View>

        <View style={styles.option}>
          <Text
            style={[
              styles.optionText,
              {fontFamily: theme.fontFamily.QuicksandBold},
            ]}>
            1.0x
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(PlayerOptions);

const styles = StyleSheet.create({
  option: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    margin: 2,
  },
  optionText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
