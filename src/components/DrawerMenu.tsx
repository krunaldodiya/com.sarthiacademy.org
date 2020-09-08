import analytics from '@react-native-firebase/analytics';
import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import Share from 'react-native-share';
import {useTheme} from 'styled-components';
import {getMediaFile} from '../libs/media';
import {screens} from '../libs/screens';
import {webUrl} from '../libs/vars';
import {Title} from '../styled/Title';

export default function DrawerMenu({authUser, navigation}) {
  const theme = useTheme();

  const appId =
    'https://play.google.com/store/apps/details?id=com.sarthiacademy.org&hl=en_IN';

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="always">
      <View style={{justifyContent: 'center', padding: 10}}>
        <Image
          style={{width: 100, height: 100, borderRadius: 100}}
          source={{uri: getMediaFile('avatar', authUser?.avatar)}}
        />

        <View style={{marginHorizontal: 10, marginTop: 10, marginBottom: 0}}>
          <Title color="#000" fontSize={18} numberOfLines={1}>
            {authUser?.name}
          </Title>
        </View>

        <View style={{marginHorizontal: 10, marginTop: 5, marginBottom: 0}}>
          <Title color="#999" fontSize={16} numberOfLines={1}>
            {authUser?.email}
          </Title>
        </View>
      </View>

      <View style={{flex: 1, backgroundColor: theme.backgroundColor.primary}}>
        <DrawerItem
          iconType="Entypo"
          iconName="home"
          title="Sarthi Academy"
          separator={true}
          onPress={() => null}
        />

        <DrawerItem
          iconType="Ionicons"
          iconName="notifications-sharp"
          title="Notifications"
          separator={true}
          onPress={() => navigation.push(screens.Notifications.name)}
        />

        <DrawerItem
          iconType="Entypo"
          iconName="info-with-circle"
          title="About"
          separator={false}
          onPress={() => {
            return Linking.openURL(webUrl);
          }}
        />

        <DrawerItem
          iconType="MaterialIcons"
          iconName="feedback"
          title="Feedback"
          separator={false}
          onPress={() => navigation.push(screens.Feedback.name)}
        />

        <DrawerItem
          iconType="FontAwesome"
          iconName="share-alt-square"
          title="Share"
          separator={false}
          onPress={() => {
            Share.open({title: 'Download Now', message: appId});
          }}
        />

        <DrawerItem
          iconType="Entypo"
          iconName="star"
          title="Rate Us"
          separator={true}
          onPress={() => {
            return Linking.openURL(appId);
          }}
        />

        <DrawerItem
          iconType="Entypo"
          iconName="facebook"
          title="Facebook"
          separator={false}
          onPress={() => {
            return Linking.openURL(authUser.setting.facebook);
          }}
        />

        <DrawerItem
          iconType="Entypo"
          iconName="instagram"
          title="Instagram"
          separator={false}
          onPress={() => {
            return Linking.openURL(authUser.setting.instagram);
          }}
        />

        <DrawerItem
          iconType="Entypo"
          iconName="youtube"
          title="YouTube"
          separator={true}
          onPress={() => {
            return Linking.openURL(authUser.setting.youtube);
          }}
        />

        <DrawerItem
          iconType="Entypo"
          iconName="open-book"
          title="Terms & Conditions"
          separator={false}
          onPress={() => {
            return Linking.openURL(authUser.setting.terms);
          }}
        />

        <DrawerItem
          iconType="Entypo"
          iconName="lock"
          title="Privacy Policy"
          separator={false}
          onPress={() => {
            return Linking.openURL(authUser.setting.privacy);
          }}
        />

        <DrawerItem
          iconType="FontAwesome"
          iconName="legal"
          title="Legal Notice"
          separator={false}
          onPress={() => {
            return Linking.openURL(authUser.setting.legal);
          }}
        />

        <DrawerItem
          iconType="Entypo"
          iconName="hand"
          title="Disclaimer"
          separator={true}
          onPress={() => {
            return Linking.openURL(authUser.setting.disclaimer);
          }}
        />

        <DrawerItem
          iconType="FontAwesome"
          iconName="copyright"
          title="All Rights Reserved."
          separator={false}
          onPress={() => {
            analytics().logEvent('general', {
              id: 3745092,
              item: 'hello',
            });
          }}
        />
      </View>
    </ScrollView>
  );
}

const DrawerItem = ({iconType, iconName, title, separator, onPress}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontFamily: theme.fontFamily.QuicksandBold,
          }}>
          {title}
        </Text>
        <Icon type={iconType} name={iconName} color="#fff" size={22} />
      </View>

      {separator && (
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#fff',
            marginVertical: 5,
          }}
        />
      )}
    </TouchableOpacity>
  );
};
