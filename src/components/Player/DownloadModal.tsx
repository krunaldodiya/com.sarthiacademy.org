import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo} from 'react';
import {Alert, Text, View} from 'react-native';
import RNBackgroundDownloader from 'react-native-background-downloader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components';
import {updateDownload} from '../../libs/download';
import {downloadPath} from '../../libs/vars';

const DownloadModal = ({currentVideo}: any) => {
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

    updateDownload(task, downloadActions);
  };

  const taskExists = (taskId: any) => {
    return files[taskId] !== undefined ? files[taskId] : null;
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
              okay
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
                  {quality.quality} - {quality.size} MB
                </Text>
              </View>

              <DownloadButton
                taskExists={taskExists}
                quality={quality}
                manageDownload={manageDownload}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default memo(DownloadModal);

const DownloadButton = ({taskExists, quality, manageDownload}: any) => {
  const theme = useTheme();

  const getButtonTitle = () => {
    if (taskExists(quality.id)) {
      return taskExists(quality.id).state;
    } else {
      return 'Download';
    }
  };

  return (
    <TouchableOpacity
      disabled={taskExists(quality.id) !== null}
      style={{
        width: 130,
        backgroundColor: taskExists(quality.id) ? '#cccccc' : '#008000',
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: 'center',
      }}
      onPress={async () => {
        await manageDownload(quality);
        Alert.alert('Success', 'Download will start in a few moment');
      }}>
      <Text
        style={{
          color: taskExists(quality.id) ? '#666666' : '#ffffff',
          fontFamily: theme.fontFamily.QuicksandSemiBold,
          fontSize: 14,
          textTransform: 'uppercase',
        }}>
        {getButtonTitle()}
      </Text>
    </TouchableOpacity>
  );
};
