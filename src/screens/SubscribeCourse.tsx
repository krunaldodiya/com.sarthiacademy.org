import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Alert,
} from 'react-native';
import {queryCache, useMutation} from 'react-query';
import {useTheme} from 'styled-components';
import {updateSubscriptionApi} from '../api/updateSubscriptionApi';
import {handleSubscription} from '../libs/payment';
import {screens} from '../libs/screens';
import {baseUrl} from '../libs/vars';
import {Box} from '../styled/Box';
import {Title} from '../styled/Title';

const {width} = Dimensions.get('window');

export default function SubscribeCourse({route, navigation}: any) {
  const theme = useTheme();
  const [subscribing, setSubscribing] = useState(false);
  const {course, authUser} = route.params;

  const [subscribe] = useMutation(updateSubscriptionApi, {
    onSuccess: (data) => {
      queryCache.setQueryData('auth_user', data.user);
      setSubscribing(false);
      navigation.replace(screens.CourseTabs.name, {course});
    },
    onError: (error) => {
      Alert.alert('Oops', error.response.data.message);
    },
  });

  const subscriptionCallback = async (
    plan_id: string,
    status: string,
    data: any,
  ) => {
    if (status === 'success') {
      await subscribe({
        plan_id,
        payment_id: data.razorpay_payment_id,
      });
    }

    setSubscribing(false);
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
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="always">
          <View style={{padding: 10}}>
            <Box>
              <Image
                style={{width: '100%', height: width}}
                resizeMode="stretch"
                source={{
                  uri: `${baseUrl}/storage/${course.image}`,
                }}
              />
            </Box>

            <Box p="5px">
              <Title
                fontWeight="bold"
                fontSize={26}
                color="#fff"
                numberOfLines={1}>
                {course.title}
              </Title>
            </Box>

            <Box p="5px">
              <Title
                fontWeight="bold"
                fontSize={16}
                color="#ddd"
                numberOfLines={1}>
                {course.description}
              </Title>
            </Box>
          </View>

          <View style={{flex: 1, padding: 5}}>
            <View style={{padding: 5}}>
              <Title fontWeight="bold" fontSize={22} color="#fff">
                Plans
              </Title>
            </View>

            <View style={{flex: 1}}>
              {course.plans.map((plan) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                    backgroundColor: '#fff',
                    margin: 5,
                    borderRadius: 5,
                  }}
                  key={plan.id}>
                  <Title color="#000" pl="5px">
                    Rs. {plan.price}
                  </Title>
                  <Title color="#000">
                    {plan.validity > 100
                      ? 'Lifetime'
                      : `${plan.validity} Months`}
                  </Title>
                  <Button
                    disabled={subscribing}
                    title={subscribing ? 'Subscribing' : 'Subscribe'}
                    onPress={() => {
                      setSubscribing(true);

                      if (plan.price > 0) {
                        return handleSubscription(
                          authUser.setting.razorpay_key,
                          {
                            plan_name: plan.name,
                            plan_description: plan.description,
                            plan_image: `${baseUrl}/storage/${plan.image}`,
                            plan_price: plan.price,
                            user_name: authUser.name,
                            user_email: authUser.email,
                            user_contact: authUser.mobile,
                          },
                          (status, data) => {
                            subscriptionCallback(plan.id, status, data);
                          },
                        );
                      }

                      subscriptionCallback(plan.id, 'success', {
                        razorpay_payment_id: Math.random()
                          .toString(36)
                          .substr(2, 8),
                      });
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
