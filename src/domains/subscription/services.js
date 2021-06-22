import firestore from '@react-native-firebase/firestore';

export const subscribeUser = async uid => {
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .update({userHasActivatedSubscription: true});
  } catch (e) {
    console.error(e);
    debugger;
  }
};
