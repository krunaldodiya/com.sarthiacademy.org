import {useStoreState} from 'easy-peasy';
import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PlayerControls = () => {
  const {isBuffering}: any = useStoreState((state) => state.player);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <TouchableOpacity onPress={() => null}>
        <Text style={{color: '#fff'}}>hello</Text>
        {isBuffering && <ActivityIndicator color="#fff" />}
      </TouchableOpacity>
    </View>
  );
};

export default memo(PlayerControls);
