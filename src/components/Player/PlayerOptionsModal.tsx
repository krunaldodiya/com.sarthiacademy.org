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
        backgroundColor: 'white',
        width: width - 40,
        height: width - 40,
        marginTop: 20,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {showOptions === 'download' && <Text>download</Text>}
      {showOptions === 'quality' && <Text>quality</Text>}
      {showOptions === 'speed' && <Text>speed</Text>}
    </View>
  );
};

export default PlayerOptionsModal;
