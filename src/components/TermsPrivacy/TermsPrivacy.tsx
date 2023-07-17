import React, { memo } from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { View, Text } from 'native-base';

import styles from './styles';

const TermsPrivacy: React.FC = () => {
  const handlePrivacy = () => {
    Linking.openURL('https://odds-r.pro/terms.html');
  };

  const handleTerms = () => {
    Linking.openURL(
      'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'
    );
  };

  return (
    <View style={styles.terms}>
      <TouchableOpacity onPress={handleTerms}>
        <Text style={styles.title}>Terms of use</Text>
      </TouchableOpacity>
      <Text style={styles.verticalText}> | </Text>
      <TouchableOpacity onPress={handlePrivacy}>
        <Text style={styles.title}>Privacy policy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(TermsPrivacy);
