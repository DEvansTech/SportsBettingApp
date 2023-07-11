import React from 'react';
import { Icon, View, Text } from 'native-base';
import { Linking } from 'react-native';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Props } from './types';
import styles, { scale } from './styles';
import { Svgs } from '@Theme';

const ModalDeleteAccount: React.FC<Props> = ({
  isModalVisible,
  toggleModal
}) => {
  const deleteAccount = async () => {
    Linking.openURL('https://odds-r.pro/contacts.html');
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
          well. Roi is always improving his algorithm, so please check back when
          the time is right. Click the button below to contact us to remove your
          account.
        </Text>
        <TouchableOpacity style={styles.modalBtn} onPress={deleteAccount}>
          <Text style={styles.cancelText}>Delete account</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalDeleteAccount;
