import {useStoreState} from 'easy-peasy';
import React from 'react';
import {Dimensions, Text, View} from 'react-native';

const {width, height} = Dimensions.get('window');

const PlayerOptionsModal = () => {
  const {showOptions}: any = useStoreState((state) => state.player);

  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          borderRadius: 10,
          elevation: 10,
          width: width - 40,
          height: width - 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {showOptions === 'download' && <Text>download</Text>}
        {showOptions === 'quality' && <Text>quality</Text>}
        {showOptions === 'speed' && <Text>speed</Text>}
      </View>
    </View>
  );
};

export default PlayerOptionsModal;
