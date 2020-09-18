import React, {memo} from 'react';
import {Text, View} from 'react-native';

const PlayerOptions = () => {
  return (
    <View style={{padding: 10}}>
      <Text style={{color: '#000'}}>options</Text>
    </View>
  );
};

export default memo(PlayerOptions);
