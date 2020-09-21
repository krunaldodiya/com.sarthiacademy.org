import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo} from 'react';
import {Alert, Text, View} from 'react-native';
import RNBackgroundDownloader from 'react-native-background-downloader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components';
import {startDownload} from '../../libs/download';
import {downloadPath} from '../../libs/vars';

const DownloadModal = ({qualities}: any) => {
  const theme = useTheme();

  const {setShowOptions}: any = useStoreActions((actions) => actions.player);
  const downloadActions: any = useStoreActions((actions) => actions.download);

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
            Download video
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
        {qualities.map((quality: any) => {
          return (
            <View key={quality.id}>
              <TouchableOpacity
                style={{paddingHorizontal: 5, paddingTop: 10, paddingBottom: 5}}
                onPress={async () => {
                  const task = await RNBackgroundDownloader.download({
                    id: quality.id,
                    url: quality.link,
                    destination: `${downloadPath}/${quality.id}.mp4`,
                  });

                  await startDownload(
                    task,
                    quality.id,
                    downloadActions,
                    quality,
                  );

                  setShowOptions(null);

                  Alert.alert(
                    'Download Started',
                    'You can view progress in Downloads dection',
                  );
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: theme.fontFamily.QuicksandRegular,
                    fontSize: 18,
                  }}>
                  {quality.quality}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default memo(DownloadModal);
