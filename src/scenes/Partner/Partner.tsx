import React from 'react';
import { Container, Content, Text, Button, View } from 'native-base';

import { MainHeader } from '@Components';

import styles from './styles';

const Partner: React.FC = () => {
  return (
    <Container style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerText}>We're working on it.</Text>
      </View>
      <Content contentContainerStyle={styles.contentView}></Content>
    </Container>
  );
};

export default Partner;
