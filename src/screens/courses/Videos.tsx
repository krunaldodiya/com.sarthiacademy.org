import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo, useCallback, useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  NativeModules,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNBackgroundDownloader from 'react-native-background-downloader';
import Icon from 'react-native-dynamic-vector-icons';
import Orientation from 'react-native-orientation-locker';
import {useTheme} from 'styled-components';
import Player from '../../components/Player';
import PlayerOptions from '../../components/PlayerOptions';
import {checkSimulater} from '../../libs/check';
import {startDownload} from '../../libs/download';
import {baseUrl, downloadPath} from '../../libs/vars';

const {width} = Dimensions.get('window');

function Videos({navigation, route}: any) {
  const theme: any = useTheme();

  const playerRef = useRef(null);

  const [isSimEmu, setIsSimEmu] = useState(null);

  const {
    isReady,
    currentVideo,
    isFullScreen,
    videoList,
    quality,
  } = useStoreState((state) => state.player);

  const {files}: any = useStoreState((state) => state.download);

  const {
    setVideoList,
    setCurrentVideo,
    setQuality,
    setIsFullScreen,
    setIsReady,
  }: any = useStoreActions((actions) => actions.player);

  const {setFiles}: any = useStoreActions((actions) => actions.download);

  const {chapter} = route.params;

  useEffect(() => {
    checkSimulater(NativeModules, (status) => {
      setIsSimEmu(status);
    });
  }, []);

  useEffect(() => {
    setVideoList(chapter?.videos);
    setCurrentVideo(chapter?.videos[0]);
    setQuality(chapter?.videos[0].qualities[0]);
  }, [setVideoList, setCurrentVideo, setQuality, chapter]);

  const changeVideo = (item) => {
    setIsReady(false);
    setCurrentVideo(item);
    setQuality(item.qualities[0]);
    setIsReady(true);

    playerRef.current.seek(0);
  };

  const toggleFullScreen = useCallback(
    (backButtonPressed: boolean) => {
      if (isFullScreen) {
        Orientation.lockToPortrait();
        setIsFullScreen(false);
        return true;
      }

      if (!backButtonPressed) {
        Orientation.lockToLandscape();
        setIsFullScreen(true);
        return true;
      }

      navigation.goBack();
      return true;
    },
    [isFullScreen, navigation, setIsFullScreen],
  );

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return toggleFullScreen(true);
    });
  }, [isFullScreen, setIsFullScreen, navigation, toggleFullScreen]);

  if (currentVideo === null) {
    return <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} />;
  }

  return (
    <>
      <StatusBar
        hidden={isFullScreen}
        barStyle="light-content"
        backgroundColor={theme.backgroundColor.primary}
      />

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: theme.backgroundColor.primary,
        }}>
        <View style={{flex: 1}}>
          {isSimEmu ? (
            <View>
              <Text style={{textAlign: 'center', fontSize: 22}}>
                Not Allowed
              </Text>
            </View>
          ) : (
            <View>
              {currentVideo && chapter.videos?.length && (
                <>
                  <Player
                    playerRef={playerRef}
                    width={isFullScreen ? '100%' : width}
                    height={isFullScreen ? width : (width * 9) / 16}
                    toggleFullScreen={toggleFullScreen}
                  />

                  <PlayerOptions
                    qualities={currentVideo.qualities}
                    speeds={[0.25, 0.5, 1.0, 1.5, 2.0]}
                    changeVideo={changeVideo}
                  />
                </>
              )}
            </View>
          )}

          <View style={{backgroundColor: 'transparent'}}>
            {!chapter.videos?.length && (
              <View>
                <Text style={{color: '#fff', fontSize: 14}}>
                  No Videos added
                </Text>
              </View>
            )}

            {!isFullScreen && (
              <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={videoList}
                style={{margin: 10}}
                renderItem={({item}) => {
                  const isDownloaded: boolean =
                    files[quality.id] && files[quality.id].status === 'done';

                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#fff',
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 5,
                      }}
                      activeOpacity={0.7}
                      onPress={() => changeVideo(item)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{
                              uri: `${baseUrl}/storage/${item.thumbnail}`,
                            }}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 40,
                              backgroundColor: theme.backgroundColor.primary,
                            }}
                          />
                        </View>
                        <View style={{flex: 1, marginHorizontal: 10}}>
                          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                            {item.title}
                          </Text>
                          <Text
                            style={{fontSize: 14, fontWeight: 'normal'}}
                            numberOfLines={1}>
                            {item.description}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {isReady &&
                            (files[quality.id]?.status === 'downloading' ? (
                              <ActivityIndicator
                                color="#000"
                                style={{marginRight: 10}}
                              />
                            ) : (
                              <Icon
                                type="MaterialCommunityIcons"
                                name={
                                  isDownloaded
                                    ? 'check-circle-outline'
                                    : 'download-box'
                                }
                                size={40}
                                color="#000"
                                style={{marginRight: 5}}
                                onPress={async () => {
                                  if (isDownloaded) {
                                    return false;
                                  }

                                  setFiles({id: quality.id, progress: 0});

                                  const task = await RNBackgroundDownloader.download(
                                    {
                                      id: quality.id,
                                      url: quality.link,
                                      destination: `${downloadPath}/${quality.id}.mp4`,
                                    },
                                  );

                                  startDownload(task, quality.id, setFiles);
                                }}
                              />
                            ))}
                          <Icon
                            type="MaterialIcons"
                            name={
                              item.id === currentVideo.id
                                ? 'pause-circle-filled'
                                : 'play-circle-filled'
                            }
                            size={40}
                            color={
                              item.id === currentVideo.id ? 'green' : 'gray'
                            }
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default memo(Videos);
