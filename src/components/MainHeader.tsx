import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import styled from 'styled-components/native';
import {getMediaFile} from '../libs/media';
import {screens} from '../libs/screens';
import {Box} from '../styled/Box';
import {Title} from '../styled/Title';

function MainHeader({navigation, authUser, title}: any) {
  return (
    <Container>
      <Box>
        <Icon
          type="MaterialCommunity"
          name="menu"
          color="#fff"
          size={22}
          onPress={() => navigation.openDrawer()}
        />
      </Box>

      <Box>
        <Title
          fontWeight="bold"
          fontSize={18}
          color="#fff"
          textAlign="center"
          numberOfLines={1}>
          {title}
        </Title>
      </Box>

      <Box style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginLeft: 20}}
          onPress={() => navigation.push(screens.EditProfile.name)}>
          <Image
            style={{width: 25, height: 25, borderRadius: 25}}
            source={{uri: getMediaFile('avatar', authUser.avatar)}}
          />
        </TouchableOpacity>
      </Box>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  padding: 15px;
  justify-content: space-between;
  align-items: baseline;
  color: ${(props: any) => props.theme.color.primary};
`;

export default MainHeader;
