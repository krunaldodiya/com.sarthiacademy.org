import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo} from 'react';
import {Alert, Text, View} from 'react-native';
import RNBackgroundDownloader from 'react-native-background-downloader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components';
import {startDownload} from '../../libs/download';
import {downloadPath} from '../../libs/vars';

const DownloadModal = ({currentVideo, chapter}: any) => {
  const theme = useTheme();

  const {files}: any = useStoreState((state) => state.download);

  const {setShowOptions}: any = useStoreActions((actions) => actions.player);
  const downloadActions: any = useStoreActions((actions) => actions.download);

  const manageDownload = async (quality: any) => {
    const task = await RNBackgroundDownloader.download({
      id: quality.id,
      url: quality.link,
      destination: `${downloadPath}/${quality.id}.mp4`,
    });

    startDownload(task, downloadActions, quality, currentVideo, chapter);

    Alert.alert(
      'Download Started',
      'You can view progress in Downloads section',
    );
  };

  const fileExists = (quality: any) => {
    return files[quality.id] !== undefined ? files[quality.id] : null;
  };

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
        {currentVideo.qualities.map((quality: any) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}
              key={quality.id}>
              <View>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: theme.fontFamily.QuicksandRegular,
                    fontSize: 22,
                  }}>
                  {quality.quality}
                </Text>
              </View>

              <TouchableOpacity
                disabled={fileExists(quality)}
                style={{
                  width: 130,
                  backgroundColor: fileExists(quality) ? '#cccccc' : '#008000',
                  paddingVertical: 8,
                  borderRadius: 5,
                  alignItems: 'center',
                }}
                onPress={() => manageDownload(quality) !== null}>
                <Text
                  style={{
                    color: fileExists(quality) ? '#666666' : '#ffffff',
                    fontFamily: theme.fontFamily.QuicksandSemiBold,
                    fontSize: 14,
                    textTransform: 'uppercase',
                  }}>
                  {fileExists(quality)
                    ? fileExists(quality).task.state
                    : 'Download'}
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
