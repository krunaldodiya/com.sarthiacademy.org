import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {queryCache, useMutation} from 'react-query';
import {useTheme} from 'styled-components';
import {submitTestApi} from '../../api/submitTestApi';
import {screens} from '../../libs/screens';

export default function StartTest({route, navigation}: any) {
  const {test} = route.params;

  const theme = useTheme();

  const [index, setIndex] = useState(0);

  const [answers, setAnswers] = useState({});

  const questionNumber = index + 1;

  const isLastQuestion = questionNumber === test.questions.length;

  const isAnswerSelected = (question_id: any) => {
    return answers[question_id] !== undefined;
  };

  const [submitTest, {isLoading}] = useMutation(submitTestApi, {
    onSuccess: (data) => {
      const tests = queryCache.getQueryData(['tests', test.course_id, null]);

      const tests_updated = tests.map((test) => {
        return test.id === data.id ? data : test;
      });

      queryCache.setQueryData(['tests', test.course_id, null], tests_updated);

      return navigation.replace(screens.ViewTestNavigator.name, {
        test: data,
      });
    },
  });

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
        },
        {
          text: 'YES',
          onPress: () => navigation.goBack(),
        },
      ]);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const currentQuestion = test.questions[index];

  const handleSelectOption = (selected_option: any) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        question_id: currentQuestion.id,
        current_answer: selected_option,
        correct_answer: currentQuestion.answer,
        point: currentQuestion.answer === selected_option ? 1 : 0,
      },
    });
  };

  const handleSubmit = (skipped: boolean) => {
    if (!skipped && !isAnswerSelected(currentQuestion.id)) return;

    if (isLastQuestion) {
      submitTest({meta: answers, test_id: test.id});
    } else {
      setIndex(questionNumber);
    }
  };

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
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                margin: 10,
                padding: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontFamily: theme.fontFamily.QuicksandBold,
                }}>
                {questionNumber} of {test.questions.length}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                margin: 10,
                padding: 10,
                justifyContent: 'center',
              }}
              onPress={() => {
                handleSelectOption(null);
                handleSubmit(true);
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontFamily: theme.fontFamily.QuicksandBold,
                }}>
                SKIP
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              margin: 10,
              padding: 10,
              borderRadius: 5,
            }}>
            <Text style={styles.questionText(theme)}>
              {currentQuestion.question}
            </Text>
          </View>

          <View style={{flex: 1}}>
            {['option_1', 'option_2', 'option_3', 'option_4'].map(
              (option: string) => (
                <TouchableOpacity
                  key={option}
                  activeOpacity={1}
                  onPress={() => handleSelectOption(option)}
                  style={[
                    styles.question,
                    {
                      backgroundColor:
                        answers[currentQuestion.id] &&
                        answers[currentQuestion.id].current_answer === option
                          ? '#98FB98'
                          : '#ffffff',
                    },
                  ]}>
                  <Text style={styles.questionText(theme)}>
                    {currentQuestion[option]}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>

          <View>
            <TouchableOpacity
              activeOpacity={isAnswerSelected(currentQuestion.id) ? 0 : 1}
              onPress={() => handleSubmit(false)}
              style={{
                backgroundColor: isAnswerSelected(currentQuestion.id)
                  ? 'tomato'
                  : 'gray',
                marginHorizontal: 10,
                marginBottom: 15,
                borderRadius: 5,
                padding: 7,
              }}>
              {isLoading ? (
                <ActivityIndicator
                  style={{justifyContent: 'center', padding: 5}}
                  color="#fff"
                  size="small"
                />
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: theme.fontFamily.QuicksandBold,
                  }}>
                  {isLastQuestion ? 'SUBMIT' : 'NEXT'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  question: {
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
  questionText: (theme: any) => ({
    color: '#000',
    fontSize: 18,
    fontFamily: theme.fontFamily.QuicksandBold,
  }),
});
