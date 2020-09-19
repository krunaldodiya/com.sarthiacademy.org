import {useStoreActions} from 'easy-peasy';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from 'styled-components';

const PlayerOptions = () => {
  const theme = useTheme();

  const {setShowOptions} = useStoreActions((actions) => actions.player);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 2,
        }}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => setShowOptions('download')}>
          <Text
            style={[
              styles.optionText,
              {fontFamily: theme.fontFamily.QuicksandBold},
            ]}>
            Download
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => null}>
          <Text
            style={[
              styles.optionText,
              {fontFamily: theme.fontFamily.QuicksandBold},
            ]}>
            Add To Favorite
          </Text>
        </TouchableOpacity>
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
