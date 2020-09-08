import {useStoreState} from 'easy-peasy';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {useQuery} from 'react-query';
import {useTheme} from 'styled-components';
import {attachmentsApi} from '../../api/attachmentsApi';
import {screens} from '../../libs/screens';
import {baseUrl} from '../../libs/vars';
import {Title} from '../../styled/Title';

export default function Attachments({navigation}: any) {
  const theme: any = useTheme();

  const {selectedCourseId} = useStoreState((state) => state.home);

  const {data: attachments, isLoading}: any = useQuery(
    ['attachments', selectedCourseId],
    attachmentsApi,
    {
      retry: false,
    },
  );

  if (isLoading) {
    return <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} />;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.backgroundColor.primary}
      />

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: theme.backgroundColor.primary,
        }}>
        <View style={{flex: 1, padding: 5}}>
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            data={attachments}
            ListEmptyComponent={() => (
              <Title color="#fff" pl="10px" fontSize="18px">
                No Attachments yet.
              </Title>
            )}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#eee',
                    margin: 5,
                    padding: 10,
                    elevation: 5,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    navigation.push(screens.ViewPdf.name, {source: item.link});
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flex: 1}}>
                      <Title color="#000" fontSize={18} numberOfLines={1}>
                        {item.title}
                      </Title>
                    </View>

                    <View>
                      <Icon
                        type="MaterialCommunityIcons"
                        name="file-pdf"
                        color="#000"
                        size={22}
                        onPress={async () => {
                          await Linking.openURL(
                            `${baseUrl}/storage/${item.link}`,
                          );
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
