import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

const PlayerOptions = ({qualities, speeds}: any) => {
  const {speed, quality, showModal} = useStoreState((state) => state.player);

  const {setSpeed, setQuality, setShowModal} = useStoreActions(
    (actions) => actions.player,
  );

  return (
    <View>
      <Modal isVisible={showModal} style={styles.bottomModal}>
        <View style={styles.modalContent}>
          <View>
            <View style={{marginBottom: 15, marginTop: 10}}>
              <View style={{marginBottom: 10}}>
                <Text style={styles.key}>Speed</Text>
              </View>

              <View style={styles.keyWrapper}>
                {speeds.map((speedData: any) => {
                  return (
                    <TouchableOpacity
                      key={speedData}
                      onPress={() => {
                        setSpeed(speedData);
                        setShowModal(false);
                      }}
                      style={[
                        styles.valueWrapper,
                        speed === speedData && styles.selectedValueWrapper,
                      ]}>
                      <Text
                        style={[
                          styles.value,
                          speed === speedData && styles.selectedValue,
                        ]}>
                        {speedData}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={{marginBottom: 10, marginTop: 15}}>
              <View style={{marginBottom: 10}}>
                <Text style={styles.key}>Quality</Text>
              </View>

              <View style={styles.keyWrapper}>
                {qualities.map((qualityData: any) => {
                  return (
                    <TouchableOpacity
                      key={qualityData.id}
                      onPress={() => {
                        if (qualities.length > 1) {
                          setQuality(qualityData);
                        }
                        setShowModal(false);
                      }}
                      style={[
                        styles.valueWrapper,
                        quality.link === qualityData.link &&
                          styles.selectedValueWrapper,
                      ]}>
                      <Text
                        style={[
                          styles.value,
                          quality.link === qualityData.link &&
                            styles.selectedValue,
                        ]}>
                        {qualityData.quality}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomModal: {justifyContent: 'flex-end', margin: 0},
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  key: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  keyWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  value: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'normal',
  },
  valueWrapper: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    flex: 1,
    margin: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  selectedValue: {
    color: '#fff',
  },
  selectedValueWrapper: {
    borderColor: '#000',
    backgroundColor: '#000',
  },
});

export default memo(PlayerOptions);
