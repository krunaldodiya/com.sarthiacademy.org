import RazorpayCheckout from 'react-native-razorpay';

type SubscriptionInfo = {
  user_email: string;
  user_contact: string;
  user_name: string;
  plan_name: string;
  plan_description: string;
  plan_price: number;
  plan_image: string;
};

export const handleSubscription = (
  api_key: string,
  info: SubscriptionInfo,
  callback: (status: 'success' | 'error', data: any) => any,
) => {
  const {
    user_email,
    user_contact,
    user_name,
    plan_name,
    plan_description,
    plan_price,
    plan_image,
  } = info;

  var options = {
    name: plan_name,
    description: plan_description,
    amount: plan_price * 100,
    image: plan_image,
    currency: 'INR',
    key: api_key,
    prefill: {
      email: user_email,
      contact: user_contact,
      name: user_name,
    },
    theme: {color: '#F37254'},
  };

  RazorpayCheckout.open(options)
    .then((data: any) => callback('success', data))
    .catch((error: any) => callback('error', error));
};
