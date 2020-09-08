import {yupResolver} from '@hookform/resolvers';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {memo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ActivityIndicator, SafeAreaView, StatusBar} from 'react-native';
import {queryCache, useMutation} from 'react-query';
import styled, {useTheme} from 'styled-components/native';
import * as yup from 'yup';
import {setDeviceTokenApi} from '../api/setDeviceTokenApi';
import {verifyOtpApi} from '../api/verifyOtpApi';
import {getInitialScreen} from '../libs/initialScreen';
import {Box} from '../styled/Box';
import {Container} from '../styled/Container';
import {TextInputBox} from '../styled/TextInputBox';
import {Title} from '../styled/Title';

const schema = yup.object({
  otp: yup
    .string()
    .required('Otp is required')
    .length(4, 'Otp must be 4 digits long'),
});

function VerifyOtp({navigation, route}: any) {
  const theme: any = useTheme();
  const {control, handleSubmit, setError, errors} = useForm({
    resolver: yupResolver(schema),
  });

  const [verifyOtp, {status: verifyStatus}] = useMutation(verifyOtpApi);
  const [setDeviceToken] = useMutation(setDeviceTokenApi);

  const {setInitialScreen} = useStoreActions((actions) => actions.home);
  const {unique_id} = useStoreState((actions) => actions.home);

  const onSubmit = async (credentials) => {
    const {otp} = credentials;
    const {mobile} = route.params;

    verifyOtp(
      {otp, mobile, unique_id},
      {
        onSuccess: async (data) => {
          await AsyncStorage.setItem('token', data.token);
          queryCache.setQueryData('auth_user', data.user);

          const fcmToken = await messaging().getToken();
          setDeviceToken({token: fcmToken});

          const initialScreen = getInitialScreen(data.user);
          setInitialScreen(initialScreen);

          navigation.replace(initialScreen);
        },
        onError: (error) => {
          if (error.response.status === 422) {
            const validationErrors = error.response.data.errors;
            Object.keys(validationErrors).forEach((key: string) => {
              setError(key, {
                message: validationErrors[key][0],
                type: 'manual',
              });
            });
          }
        },
        throwOnError: true,
      },
    );
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
          <Box mb={30} ml={30} mr={30}>
            <Title
              color="#fff"
              textAlign="center"
              fontSize={theme.fontSize.base}
              textTransform={theme.textTransform.uppercase}>
              Verify Otp
            </Title>
          </Box>

          <Box mb={50} ml={30} mr={30}>
            <Title color="#fff" textAlign="center">
              Please enter verification code send to
            </Title>

            <Title color="#fff" textAlign="center" fs="18px">
              {route.params.mobile}
            </Title>
          </Box>

          <Box mb={10} ml={30} mr={30}>
            <Controller
              name="otp"
              control={control}
              render={(props) => (
                <TextInputBox
                  {...props}
                  maxLength={4}
                  placeholder="OTP"
                  keyboardType="numeric"
                  onChangeText={(value) => props.onChange(value)}
                />
              )}
            />
            {errors.otp && <Error>{errors.otp.message}</Error>}
          </Box>

          <Box mb={10} ml={30} mr={30}>
            <SubmitButton onPress={handleSubmit(onSubmit)}>
              {verifyStatus === 'loading' ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Title
                  textAlign="center"
                  fontSize={20}
                  color={theme.color.primary}>
                  VERIFY OTP
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

export default memo(VerifyOtp);
