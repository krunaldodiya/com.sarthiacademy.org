import React, {memo} from 'react';
import {View, Text} from 'react-native';

const SpeedModal = (props: any) => {
  const rates = ['0.25', '0.50', '1.00', '1.50', '2.00'];

  return (
    <View>
      {rates.map((rate: any) => {
        return (
          <View key={rate}>
            <Text>{rate}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default memo(SpeedModal);
