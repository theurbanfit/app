import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const uploadImageOnFirestorage = async (
  uri,
  name,
  firebasePath = '',
) => {
  const imageRef = storage().ref(`${firebasePath}/${name}`);
  await imageRef.putFile(uri, {contentType: 'image/jpg'}).catch(error => {
    throw error;
  });

  return await imageRef.getDownloadURL().catch(error => {
    throw error;
  });
};

export const updateUserProfilePhoto = async (uid, photoURL) => {
  await firestore().collection('users').doc(uid).update({photoURL: photoURL});
};
