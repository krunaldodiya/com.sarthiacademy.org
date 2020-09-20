import {useStoreState} from 'easy-peasy';
import React, {memo} from 'react';
import {Dimensions, View} from 'react-native';
import DownloadModal from './DownloadModal';
import QualityModal from './QualityModal';
import SpeedModal from './SpeedModal';

const {width, height} = Dimensions.get('window');

const PlayerOptionsModal = (props: any) => {
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
        zIndex: 1,
      }}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          borderRadius: 10,
          elevation: 10,
          width: width - 40,
          height: width - 40,
        }}>
        {showOptions === 'download' && <DownloadModal {...props} />}
        {showOptions === 'quality' && <QualityModal {...props} />}
        {showOptions === 'speed' && <SpeedModal {...props} />}
      </View>
    </View>
  );
};

export default memo(PlayerOptionsModal);
