import {useStoreActions} from 'easy-peasy';
import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const QualityModal = (props: any) => {
  const {currentVideo} = props;

  const {setQuality, setShowOptions}: any = useStoreActions(
    (actions) => actions.player,
  );

  return (
    <View>
      {currentVideo.qualities.map((quality: any) => {
        return (
          <View key={quality.id}>
            <TouchableOpacity
              onPress={() => {
                setQuality(quality);
                setShowOptions(null);
              }}>
              <Text>{quality.quality}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default memo(QualityModal);
