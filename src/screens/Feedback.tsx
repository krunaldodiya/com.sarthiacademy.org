import {yupResolver} from '@hookform/resolvers';
import React, {memo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ActivityIndicator, Alert, SafeAreaView, StatusBar} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import styled, {useTheme} from 'styled-components/native';
import * as yup from 'yup';
import {authUserApi} from '../api/authUserApi';
import {sendFeedbackApi} from '../api/sendFeedbackApi';
import {Box} from '../styled/Box';
import {Container} from '../styled/Container';
import {TextInputBox} from '../styled/TextInputBox';
import {Title} from '../styled/Title';

const schema = yup.object().shape({
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

function Feedback({navigation}: any) {
  const theme: any = useTheme();

  const {data: authUser}: any = useQuery('auth_user', authUserApi, {
    retry: false,
  });

  const {control, handleSubmit, errors, reset} = useForm({
    resolver: yupResolver(schema),
  });

  const [sendFeedback, {status}] = useMutation(sendFeedbackApi, {
    onSuccess: () => {
      Alert.alert(
        'Thank You',
        'Your Feedback has been submitted successfully.',
      );

      reset();
    },
  });

  const onSubmit = async (credentials: any) => {
    const data = {...credentials, user_id: authUser.id};
    console.log(data);

    sendFeedback(data);
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
        <Container>
          <Box mb={10} ml={30} mr={30}>
            <Controller
              name="subject"
              control={control}
              render={(props) => (
                <TextInputBox
                  {...props}
                  maxLength={10}
                  placeholder="Subject"
                  onChangeText={(value) => props.onChange(value)}
                  style={{borderRadius: 5}}
                />
              )}
            />
            {errors.subject && <Error>{errors.subject.message}</Error>}
          </Box>

          <Box mb={10} ml={30} mr={30}>
            <Controller
              name="message"
              control={control}
              render={(props) => (
                <TextInputBox
                  {...props}
                  multiline={true}
                  placeholder="Write a message"
                  onChangeText={(value) => props.onChange(value)}
                  textAlignVertical="top"
                  style={{height: 200, borderRadius: 5}}
                />
              )}
            />
            {errors.message && <Error>{errors.message.message}</Error>}
          </Box>

          <Box mb={10} ml={30} mr={30}>
            <SubmitButton
              onPress={handleSubmit(onSubmit)}
              style={{borderRadius: 5}}>
              {status === 'loading' ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Title
                  textAlign="center"
                  fontSize={20}
                  color={theme.color.primary}>
                  SEND
                </Title>
              )}
            </SubmitButton>
          </Box>
        </Container>
      </SafeAreaView>
    </>
  );
}

const Error = styled.Text`
  color: pink;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 14px;
  font-family: ${(props: any) => {
    return props.theme.fontFamily.QuicksandBold;
  }};
`;

const SubmitButton: any = styled.TouchableOpacity`
  background-color: ${(props: any) => (props.disabled ? '#bbb' : '#ff6347')};
  padding: 10px;
  border-radius: 50px;
`;

export default memo(Feedback);
