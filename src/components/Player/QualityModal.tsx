import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components';

const QualityModal = ({videoQualities}: any) => {
  const theme = useTheme();

  const {quality} = useStoreState((state) => state.player);

  const {setQuality, setShowOptions}: any = useStoreActions(
    (actions) => actions.player,
  );

  return (
    <View>
      <View style={{padding: 10, backgroundColor: '#ddd'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: '#000',
              fontFamily: theme.fontFamily.QuicksandSemiBold,
              fontSize: 17,
              textTransform: 'uppercase',
            }}>
            Select quality
          </Text>

          <TouchableOpacity onPress={() => setShowOptions(null)}>
            <Text
              style={{
                color: '#f00',
                fontFamily: theme.fontFamily.QuicksandSemiBold,
                fontSize: 17,
                textTransform: 'uppercase',
              }}>
              cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{padding: 5}}>
        {videoQualities.map((videoQuality: any) => {
          return (
            <View key={videoQuality.id}>
              <TouchableOpacity
                style={{paddingHorizontal: 5, paddingTop: 10, paddingBottom: 5}}
                onPress={() => {
                  setQuality(videoQuality);
                  setShowOptions(null);
                }}>
                <Text
                  style={{
                    color: quality.id === videoQuality.id ? '#f00' : '#000',
                    fontFamily:
                      quality.id === videoQuality.id
                        ? theme.fontFamily.QuicksandBold
                        : theme.fontFamily.QuicksandRegular,
                    fontSize: 18,
                  }}>
                  {videoQuality.quality}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default memo(QualityModal);
