import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import {useTheme} from 'styled-components';

export default function TestResults({route, navigation}: any) {
  const theme = useTheme();

  const {test} = route.params;

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
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="always">
          <View
            style={{
              backgroundColor: '#fff',
              margin: 10,
              padding: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <Text style={{color: '#000', fontSize: 18}}>Total Questions</Text>
              <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                {test.total_questions}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <Text style={{color: '#000', fontSize: 18}}>Right Answers</Text>
              <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                {
                  test.answers.filter(
                    (answer) =>
                      answer.current_answer !== null &&
                      parseInt(answer.point) === 1,
                  ).length
                }
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <Text style={{color: '#000', fontSize: 18}}>Wrong Answers</Text>
              <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                {
                  test.answers.filter(
                    (answer) =>
                      answer.current_answer !== null &&
                      parseInt(answer.point) === 0,
                  ).length
                }
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <Text style={{color: '#000', fontSize: 18}}>Skipped Answers</Text>
              <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                {
                  test.answers.filter(
                    (answer) => answer.current_answer === null,
                  ).length
                }
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
            }}>
            {test.answers.map((answer) => (
              <View
                key={answer.id}
                style={{
                  padding: 10,
                  marginHorizontal: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                }}>
                <View>
                  <Text
                    style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                    {answer.question.question}
                  </Text>
                </View>

                <View style={{marginTop: 10}}>
                  {['option_1', 'option_2', 'option_3', 'option_4'].map(
                    (option) => {
                      const isRight = answer.question.answer === option;

                      return (
                        <View key={option} style={{marginBottom: 5}}>
                          <Text
                            style={{
                              color: isRight ? 'green' : '#000',
                              fontWeight: isRight ? 'bold' : 'normal',
                              fontSize: 18,
                            }}>
                            {answer.question[option]}
                          </Text>
                        </View>
                      );
                    },
                  )}

                  <Info answer={answer} />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const Info = ({answer}: any) => {
  const isRight = answer.current_answer === answer.correct_answer;

  if (answer.current_answer === null) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
          padding: 10,
          borderWidth: 1,
          borderColor: '#808000',
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: '#808000',
            fontWeight: 'normal',
            fontSize: 16,
          }}>
          You have skipped this question
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: isRight ? 'green' : 'tomato',
        borderRadius: 10,
      }}>
      <Text
        style={{
          color: '#000',
          fontWeight: 'normal',
          fontSize: 16,
        }}>
        Your answer
      </Text>

      <Text
        style={{
          color: isRight ? 'green' : 'tomato',
          fontWeight: 'bold',
          fontSize: 18,
          marginHorizontal: 5,
        }}>
        {answer.question[answer.current_answer]}
      </Text>

      <Text
        style={{
          color: '#000',
          fontWeight: 'normal',
          fontSize: 16,
        }}>
        is {isRight ? 'right' : 'wrong'}
      </Text>
    </View>
  );
};
