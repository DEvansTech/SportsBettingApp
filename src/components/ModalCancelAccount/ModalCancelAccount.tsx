import React, { useContext, useState } from 'react';
import { Icon, View, Text } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ToastMessage } from '@Lib/function';
import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Props } from './types';
import styles, { scale } from './styles';
import { Routes } from '@Navigators/routes';
import { Svgs } from '@Theme';

const ModalCancelAccount: React.FC<Props> = ({
  isModalVisible,
  toggleModal
}) => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const { user, setUser } = useContext(AuthContext) as AuthContextType;

  const [isLoading, setIsLoading] = useState(false);

  const cancelAccount = async () => {
    if (user) {
      try {
        setIsLoading(true);
        const docRef = await firestore().collection('users').doc(user.uid);
        // const personalData = (await docRef.get()).data();
        const userData = {
          cancellationDate: Date.now()
        };
        await docRef.get().then(thisDoc => {
          if (thisDoc.exists) {
            docRef.update(userData);
          }
        });
        await user?.delete();
        // if (personalData?.subscription) {
        //   const { subscription } = personalData;
        //   if (Platform.OS === 'android') {
        //     Linking.openURL(
        //       `https://play.google.com/store/account/subscriptions?package=com.pss.oddsr&sku=${subscription.productItem}`
        //     );
        //   } else {
        //     Linking.openURL('https://apps.apple.com/account/subscriptions');
        //   }
        // }
        await logOut();
      } catch (error: any) {
        if (error.code == 'auth/requires-recent-login') {
          setIsLoading(false);
          toggleModal();
          ToastMessage(
            'Your credential is too old. Please sign in again and cancel account',
            'warning',
            'bottom'
          );
          auth().signOut();
          logOut();
        }
      }
    }
  };

  const logOut = () => {
    setUser(null);
    toggleModal();
    setIsLoading(false);
    navigation.navigate(Routes.Splash);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      animationInTiming={300}
      animationOutTiming={300}>
      <Spinner
        visible={isLoading}
        textContent={'Please wait...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.modalContainer}>
        <Icon
          type="AntDesign"
          name="closecircleo"
          onPress={toggleModal}
          style={styles.modalCloseIcon}
        />
        <SvgXml xml={Svgs.obiIcon} width={90 * scale} height={90 * scale} />
        <Text style={styles.bodyText}>
          We are sorry to see you go. It was a pleasure meeting you and wish you
          well. OBI is always Logout improving his algorithm, so please check
          back when the time is right.
        </Text>
        <TouchableOpacity style={styles.modalBtn} onPress={cancelAccount}>
          <Text style={styles.cancelText}>Cancel Account</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalCancelAccount;
