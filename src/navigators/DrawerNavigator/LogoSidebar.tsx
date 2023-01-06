import React, { useContext } from 'react';
import { View, Image, Text } from 'react-native';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { Images } from '@Theme';
import styles from './styles';

const LogoSidebar: React.FC = () => {
  const { displayName } = useContext(AuthContext) as AuthContextType;

  return (
    <View>
      <Image source={Images.logo} style={styles.logo} />
      <Text style={styles.userName}>{displayName}</Text>
      <View style={styles.separator} />
    </View>
  );
};

export default LogoSidebar;
