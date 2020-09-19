import React, {memo} from 'react';
import {View, Text} from 'react-native';

const QualityModal = (props: any) => {
  const {currentVideo} = props;

  return (
    <View>
      {currentVideo.qualities.map((quality: any) => {
        return (
          <View key={quality.id}>
            <Text>{quality.quality}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default memo(QualityModal);
