import React from 'react';
import { Icon, View, Text } from 'native-base';
import { Linking } from 'react-native';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Purchases from 'react-native-purchases';

import { Props } from './types';
import styles, { scale } from './styles';
import { Svgs } from '@Theme';

const ModalCancelAccount: React.FC<Props> = ({
  isModalVisible,
  toggleModal
}) => {
  const cancelAccount = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    if (customerInfo) {
      Linking.openURL(customerInfo?.managementURL || '');
      toggleModal();
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
          We are sorry to see you go. It was a pleasure How to Use meeting you
          and wish you well. OBI is always improving his algorithm, so please
          check account open until your term ends, just in Logout back when the
          time is right. We’ll keep your case you change your mind. After that,
          Cancel Account your OddsRTM access will end.
        </Text>
        <TouchableOpacity style={styles.modalBtn} onPress={cancelAccount}>
          <Text style={styles.cancelText}>Cancel Subscription</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalCancelAccount;
