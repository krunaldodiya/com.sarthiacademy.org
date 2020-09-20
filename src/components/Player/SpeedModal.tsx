import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components';

const SpeedModal = ({rates}: any) => {
  const theme = useTheme();

  const {speed}: any = useStoreState((state) => state.player);

  const {setSpeed, setShowOptions}: any = useStoreActions(
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
            Select speed
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
        {rates.map((rate: any) => {
          return (
            <View key={rate}>
              <TouchableOpacity
                style={{paddingHorizontal: 5, paddingTop: 10, paddingBottom: 5}}
                onPress={() => {
                  setSpeed(rate);
                  setShowOptions(null);
                }}>
                <Text
                  style={{
                    color: rate === speed ? '#f00' : '#000',
                    fontFamily:
                      rate === speed
                        ? theme.fontFamily.QuicksandBold
                        : theme.fontFamily.QuicksandRegular,
                    fontSize: 18,
                  }}>
                  {rate}x
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default memo(SpeedModal);
