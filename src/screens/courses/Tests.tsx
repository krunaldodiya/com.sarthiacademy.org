import {useStoreState} from 'easy-peasy';
import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';
import {useTheme} from 'styled-components';
import {testsApi} from '../../api/testsApi';
import {screens} from '../../libs/screens';
import {Title} from '../../styled/Title';

export default function Tests(props: any) {
  const theme: any = useTheme();

  const [selectedDate, setSelectedDate] = useState(null);

  const [date, setDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);

  const {selectedCourseId} = useStoreState((state) => state.home);

  const {data: tests, isLoading}: any = useQuery(
    ['tests', selectedCourseId, selectedDate],
    testsApi,
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
          <>
            <>
              {showDatePicker && (
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 5,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    top: 100,
                    bottom: 100,
                    left: 30,
                    right: 30,
                    borderRadius: 10,
                  }}>
                  <DatePicker date={date} onDateChange={setDate} mode="date" />
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#000',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      setSelectedDate(date);
                      setShowDatePicker(false);
                    }}>
                    <Text style={{color: '#fff'}}>OKAY</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{marginTop: 10, marginBottom: 20, marginLeft: 10}}
                onPress={() => setShowDatePicker(true)}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlignVertical: 'center',
                    textTransform: 'uppercase',
                  }}>
                  {selectedDate
                    ? moment(selectedDate).format('LL')
                    : 'Select a Date'}
                </Text>
              </TouchableOpacity>

              {selectedDate && (
                <TouchableOpacity
                  style={{marginTop: 10, marginBottom: 20, marginRight: 10}}
                  onPress={() => setSelectedDate(null)}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 'bold',
                      textAlignVertical: 'center',
                      textTransform: 'uppercase',
                    }}>
                    clear
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>

          <FlatList
            keyExtractor={(_, index) => index.toString()}
            data={tests}
            ListEmptyComponent={() => (
              <Title color="#fff" pl="10px" fontSize="18px">
                No Tests yet.
              </Title>
            )}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#eee',
                    margin: 5,
                    padding: 10,
                    elevation: 5,
                    borderRadius: 5,
                  }}>
                  <View style={{flex: 1}}>
                    <Title color="#000" fontSize={18} numberOfLines={1}>
                      {item.title}
                    </Title>

                    <Title color="green" fontSize={14} numberOfLines={1}>
                      {item.total_questions} Question(s)
                    </Title>
                  </View>

                  <StartTestButton {...props} test={item} />
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export function StartTestButton({test, navigation}: any) {
  const onClick = (status: string) => {
    if (status === 'pending') {
      return navigation.push(screens.StartTest.name, {
        test,
      });
    }

    return navigation.push(screens.ViewTestNavigator.name, {
      test,
    });
  };

  return (
    <View style={{alignSelf: 'center'}}>
      <TouchableHighlight
        style={{
          backgroundColor: test.status === 'finished' ? 'green' : 'red',
          paddingVertical: 7,
          paddingHorizontal: 14,
          borderRadius: 5,
        }}
        onPress={() => onClick(test.status)}>
        <Text style={{color: '#fff'}}>
          {test.status === 'finished' ? 'View' : 'Start'}
        </Text>
      </TouchableHighlight>
    </View>
  );
}
