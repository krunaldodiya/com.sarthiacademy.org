import AsyncStorage from '@react-native-community/async-storage';
import {useStoreActions} from 'easy-peasy';
import React, {memo} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {useTheme} from 'styled-components';
import styled from 'styled-components/native';
import {color, space} from 'styled-system';
import {screens} from '../libs/screens';
import {Box} from '../styled/Box';
import {Container} from '../styled/Container';
import {Title} from '../styled/Title';

function InvalidDevice({navigation}: any) {
  const theme: any = useTheme();

  const {setInitialScreen} = useStoreActions((actions) => actions.home);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('token');

    setInitialScreen(screens.RequestOtp.name);

    navigation.replace(screens.RequestOtp.name);
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
          <Box>
            <Title
              textAlign="center"
              color="white"
              fontSize={theme.fontSize.sm}
              textTransform={theme.textTransform.uppercase}>
              Device is already registered
            </Title>

            <LogoutButton
              p={10}
              mt={30}
              backgroundColor="red"
              onPress={handleSignOut}>
              <Title
                textAlign="center"
                fontSize={20}
                color={theme.color.primary}>
                Sign Out
              </Title>
            </LogoutButton>
          </Box>
        </Container>
      </SafeAreaView>
    </>
  );
}

const LogoutButton = styled.TouchableOpacity`
  ${space}
  ${color}

  border-radius: 10px;
  width: 120px;
  align-self: center;
`;

export default memo(InvalidDevice);
