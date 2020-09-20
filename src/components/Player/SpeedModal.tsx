import {useStoreActions} from 'easy-peasy';
import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const SpeedModal = (props: any) => {
  const rates = ['0.25', '0.50', '1.00', '1.50', '2.00'];

  const {setQuality, setShowOptions}: any = useStoreActions(
    (actions) => actions.player,
  );

  return (
    <View>
      {rates.map((rate: any) => {
        return (
          <View key={rate}>
            <TouchableOpacity
              onPress={() => {
                setQuality(rate);
                setShowOptions(null);
              }}>
              <Text>{rate}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default memo(SpeedModal);
