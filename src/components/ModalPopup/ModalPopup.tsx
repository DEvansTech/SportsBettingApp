import React, { useEffect } from 'react';
import { Icon, View, Text } from 'native-base';
import Modal from 'react-native-modal';

import { Props } from './types';
import styles from './styles';

const ModalPopup: React.FC<Props> = ({ isModalVisible, setIsVisible }) => {
  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, 2500);
    }
  }, [isModalVisible]);

  return (
    <Modal isVisible={isModalVisible} backdropOpacity={0.2}>
      <View style={styles.modalContainer}>
        <Icon type="Feather" name="check" style={styles.checkIcon} />
        <Text style={styles.checkText}>Added to Watching</Text>
      </View>
    </Modal>
  );
};

export default ModalPopup;
