import {yupResolver} from '@hookform/resolvers/yup';
import React, {memo, useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ActivityIndicator, SafeAreaView, StatusBar} from 'react-native';
import {useMutation} from 'react-query';
import styled, {useTheme} from 'styled-components/native';
import * as yup from 'yup';
import {requestOtpApi} from '../api/requestOtpApi';
import {screens} from '../libs/screens';
import {Box} from '../styled/Box';
import {Container} from '../styled/Container';
import {TextInputBox} from '../styled/TextInputBox';
import {Title} from '../styled/Title';

const schema = yup.object().shape({
  mobile: yup
    .string()
    .required('Mobile is required')
    .min(10, 'Mobile must be 10 digits long'),
});

function RequestOtp({navigation}: any) {
  const theme: any = useTheme();
  const {control, handleSubmit, setError, errors} = useForm({
    resolver: yupResolver(schema),
  });

  const [requestOtp, {status}] = useMutation(requestOtpApi);

  const onSubmit = useCallback(
    async (credentials) => {
      const {mobile} = credentials;

      requestOtp(
        {mobile},
        {
          onSuccess: async (data) => {
            navigation.replace(screens.VerifyOtp.name, {mobile});
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
    },
    [navigation, requestOtp, setError],
  );

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
              Request Otp
            </Title>
          </Box>

          <Box mb={50} ml={30} mr={30}>
            <Title color="#fff" textAlign="center">
              Please enter your mobile to receive verification code.
            </Title>
          </Box>

          <Box mb={10} ml={30} mr={30}>
            <Controller
              name="mobile"
              control={control}
              render={(props) => (
                <TextInputBox
                  {...props}
                  maxLength={10}
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  onChangeText={(value) => props.onChange(value)}
                />
              )}
            />
            {errors.mobile && <Error>{errors.mobile.message}</Error>}
          </Box>

          <Box mb={10} ml={30} mr={30}>
            <SubmitButton onPress={handleSubmit(onSubmit)}>
              {status === 'loading' ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Title
                  textAlign="center"
                  fontSize={20}
                  color={theme.color.primary}>
                  REQUEST OTP
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

export default memo(RequestOtp);
