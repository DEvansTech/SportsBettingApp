import React, { useContext } from 'react';
import { Icon, View, Text } from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import { TouchableOpacity, Linking, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Props } from './types';
import styles, { scale } from './styles';
import { Svgs } from '@Theme';

const ModalCancelAccount: React.FC<Props> = ({
  isModalVisible,
  toggleModal
}) => {
  const { logout } = useContext(AuthContext) as AuthContextType;

  const cancelAccount = async () => {
    let user = auth().currentUser;
    if (user) {
      const docRef = await firestore().collection('users').doc(user.uid);
      const personalData = (await docRef.get()).data();

      const userData = {
        cancellationDate: Date.now()
      };
      await docRef.get().then(thisDoc => {
        if (thisDoc.exists) {
          docRef.update(userData);
        }
      });
      await user.delete();
      if (personalData?.subscription) {
        const { subscription } = personalData;
        if (Platform.OS === 'android') {
          Linking.openURL(
            `https://play.google.com/store/account/subscriptions?package=com.pss.oddsr&sku=${subscription.productItem}`
          );
        } else {
          Linking.openURL('https://apps.apple.com/account/subscriptions');
        }
      }

      await logout();
    }
  };

  return (
    <Modal
      isVisible={isModalVisible}
      animationInTiming={300}
      animationOutTiming={300}>
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
