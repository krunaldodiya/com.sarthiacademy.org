import {useStoreActions} from 'easy-peasy';
import React, {memo} from 'react';
import {Text, View} from 'react-native';
import RNBackgroundDownloader from 'react-native-background-downloader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {startDownload} from 'src/libs/download';
import {useTheme} from 'styled-components';
import {downloadPath} from '../../libs/vars';

const DownloadModal = ({selectedQuality, qualities}: any) => {
  const theme = useTheme();

  const {setFiles, setShowOptions}: any = useStoreActions(
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

                  await startDownload(task, quality.id, setFiles);

                  setShowOptions(null);
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
