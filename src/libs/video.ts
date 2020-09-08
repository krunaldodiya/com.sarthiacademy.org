export const getVideoUrl = (authUser, currentVideo) => {
  const setting = authUser.setting;
  const url = setting?.video_url;

  const subscription = authUser.subscriptions.find((subscription) => {
    return subscription.plan.category_id === currentVideo.category_id;
  });

  if (subscription) {
    if (subscription.status === 'Active') {
      return `${url}${currentVideo?.url}`;
    }

    if (subscription.status === 'Expired') {
      return `${url}${setting?.expire_subscription_url}`;
    }
  }

  return `${url}${setting?.no_subscription_url}`;
};
