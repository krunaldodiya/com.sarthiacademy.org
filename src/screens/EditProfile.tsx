import {yupResolver} from '@hookform/resolvers/yup';
import {useStoreActions} from 'easy-peasy';
import React, {memo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInputMask} from 'react-native-masked-text';
import {queryCache, useMutation, useQuery} from 'react-query';
import styled, {useTheme} from 'styled-components/native';
import * as yup from 'yup';
import {authUserApi} from '../api/authUserApi';
import {updateProfileApi} from '../api/updateProfileApi';
import Avatar from '../components/Avatar';
import {getInitialScreen} from '../libs/initialScreen';
import {getMediaFile} from '../libs/media';
import {apiUrl} from '../libs/vars';
import {Box} from '../styled/Box';
import {Container} from '../styled/Container';
import {TextInputBox} from '../styled/TextInputBox';
import {Title} from '../styled/Title';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required'),
  dob: yup.string().required('Date of Birth is required'),
  city: yup.string().required('City is required'),
});

function EditProfile({store, navigation}: any) {
  const theme: any = useTheme();

  const {data: authUser}: any = useQuery('auth_user', authUserApi, {
    retry: false,
  });

  const {control, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: authUser.name,
      email: authUser.email,
      dob: authUser.dob,
      gender: authUser.gender,
      city: authUser.city,
    },
  });

  const onUploadSuccess = ({filename}: {filename: string}) => {
    queryCache.setQueryData('auth_user', {...authUser, avatar: filename});
  };

  const onUploadFail = () => {
    console.log('error');
  };

  const [updateProfile, {status}] = useMutation(updateProfileApi);

  const {setInitialScreen} = useStoreActions((actions) => actions.home);

  const onSubmit = async (credentials: any) => {
    const data = updateProfile(credentials);

    const initialScreen = getInitialScreen(data.user);
    setInitialScreen(initialScreen);

    navigation.replace(initialScreen);
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
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="always">
          <View style={{flex: 1, paddingHorizontal: 50}}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 30,
              }}>
              <Avatar
                source={getMediaFile('avatar', authUser.avatar)}
                size={120}
                onUploadSuccess={onUploadSuccess}
                onUploadFail={onUploadFail}
                uploadUrl={`${apiUrl}/upload/avatar`}
              />
              <Title color={theme.color.primary} mt={20}>
                Upload Your Photo
              </Title>
            </View>

            <Container>
              <Box mb={10}>
                <Controller
                  name="name"
                  control={control}
                  render={(props) => (
                    <TextInputBox
                      {...props}
                      placeholder="Name"
                      onChangeText={(value) => props.onChange(value)}
                    />
                  )}
                />
                {errors.name && <Error>{errors.name.message}</Error>}
              </Box>

              <Box mb={10}>
                <Controller
                  name="email"
                  control={control}
                  render={(props) => (
                    <TextInputBox
                      {...props}
                      placeholder="Email Address"
                      onChangeText={(value) => props.onChange(value)}
                    />
                  )}
                />
                {errors.email && <Error>{errors.email.message}</Error>}
              </Box>

              <Box mb={10}>
                <Controller
                  name="dob"
                  control={control}
                  render={(props) => (
                    <TextInputMask
                      style={{
                        backgroundColor: 'white',
                        paddingVertical: 10,
                        paddingLeft: 20,
                        borderRadius: 50,
                        elevation: 5,
                        fontFamily: theme.fontFamily.QuicksandBold,
                      }}
                      placeholder="Date of Birth (DD/MM/YYYY)"
                      type={'datetime'}
                      options={{format: 'DD/MM/YYYY'}}
                      value={authUser.dob}
                      onChangeText={(value) => {
                        props.onChange(value);
                        queryCache.setQueryData('auth_user', {
                          ...authUser,
                          dob: value,
                        });
                      }}
                    />
                  )}
                />
                {errors.dob && <Error>{errors.dob.message}</Error>}
              </Box>

              <Box mb={10}>
                <Controller
                  name="gender"
                  control={control}
                  render={(props) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        borderRadius: 50,
                        backgroundColor: '#fff',
                        padding: 2,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          props.onChange('Male');
                          queryCache.setQueryData('auth_user', {
                            ...authUser,
                            gender: 'Male',
                          });
                        }}
                        style={{
                          flex: 1,
                          padding: 12,
                          backgroundColor:
                            authUser.gender === 'Male' ? '#ff6347' : '#fff',
                          borderRadius: 50,
                        }}>
                        <Text
                          style={{
                            fontWeight: '700',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontSize: 14,
                            color: authUser.gender === 'Male' ? '#fff' : '#000',
                          }}>
                          Male
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          props.onChange('Female');
                          queryCache.setQueryData('auth_user', {
                            ...authUser,
                            gender: 'Female',
                          });
                        }}
                        style={{
                          flex: 1,
                          padding: 12,
                          backgroundColor:
                            authUser.gender === 'Female' ? '#ff6347' : '#fff',
                          borderRadius: 50,
                        }}>
                        <Text
                          style={{
                            fontWeight: '700',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            fontSize: 14,
                            color:
                              authUser.gender === 'Female' ? '#fff' : '#000',
                          }}>
                          Female
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                {errors.gender && <Error>{errors.gender.message}</Error>}
              </Box>

              <Box mb={10}>
                <Controller
                  name="city"
                  control={control}
                  render={(props) => (
                    <TextInputBox
                      {...props}
                      placeholder="city"
                      onChangeText={(value) => props.onChange(value)}
                    />
                  )}
                />
                {errors.city && <Error>{errors.city.message}</Error>}
              </Box>

              <Box mb={10}>
                <SubmitButton onPress={handleSubmit(onSubmit)}>
                  {status === 'loading' ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Title
                      textAlign="center"
                      fontSize={20}
                      color={theme.color.primary}>
                      UPDATE
                    </Title>
                  )}
                </SubmitButton>
              </Box>
            </Container>
          </View>
        </KeyboardAwareScrollView>
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

export default memo(EditProfile);
