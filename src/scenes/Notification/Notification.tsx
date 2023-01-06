import React, { useEffect, useState, useContext } from 'react';
import { Container, Content, Text, View, Switch } from 'native-base';
import firestore from '@react-native-firebase/firestore';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { UserHeader } from '@Components';
import styles from './styles';

const Notification: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  const [notifications, setNotifications] = useState({
    pushNotification: false,
    startGame: false,
    closeGame: false,
    prediction: false,
    fiveStarBet: false
  });

  const getPreferencesData = async () => {
    if (user) {
      const docRef = await firestore()
        .collection('notifications')
        .doc(user.uid);
      docRef.get().then((doc: any) => {
        if (doc.exists) {
          const result = doc.data();
          setNotifications({
            ...notifications,
            pushNotification: result.pushNotification,
            startGame: result.startGame,
            closeGame: result.closeGame,
            prediction: result.prediction,
            fiveStarBet: result.fiveStarBet
          });
        } else {
          docRef.set({
            uid: user.uid,
            ...notifications
          });
        }
      });
    }
  };

  const savePreferencesData = async () => {
    if (user) {
      const docRef = await firestore()
        .collection('notifications')
        .doc(user.uid);
      docRef.get().then((doc: any) => {
        if (doc.exists) {
          docRef.update({
            uid: user.uid,
            ...notifications
          });
        } else {
          docRef.set({
            uid: user.uid,
            ...notifications
          });
        }
      });
    }
  };

  useEffect(() => {
    savePreferencesData();
  }, [notifications]);

  useEffect(() => {
    getPreferencesData();
  }, []);

  return (
    <Container style={styles.background}>
      <UserHeader
        type="icon"
        iconType="Ionicons"
        iconName="notifications-outline"
        name="Notification Preferences"
      />
      <Content contentContainerStyle={styles.contentView}>
        <View style={styles.notificationView}>
          <View style={styles.mainView}>
            <Text style={styles.title}>Push notifications</Text>
            <Switch
              value={notifications.pushNotification}
              style={styles.switch}
              onValueChange={value =>
                setNotifications({ ...notifications, pushNotification: value })
              }
            />
          </View>
          <Text style={styles.details}>Notifications</Text>
        </View>
        <View style={styles.notificationView}>
          <View style={styles.mainView}>
            <Text style={styles.title}>Game is ready to start</Text>
            <Switch
              value={notifications.startGame}
              style={styles.switch}
              onValueChange={value =>
                setNotifications({ ...notifications, startGame: value })
              }
            />
          </View>
          <Text style={styles.details}>
            Game you're watching is ready to start
          </Text>
        </View>
        <View style={styles.notificationView}>
          <View style={styles.mainView}>
            <Text style={styles.title}>Close game</Text>
            <Switch
              value={notifications.closeGame}
              style={styles.switch}
              onValueChange={value =>
                setNotifications({ ...notifications, closeGame: value })
              }
            />
          </View>
          <Text style={styles.details}>
            Game you're watching is close toward end
          </Text>
        </View>
        <View style={styles.notificationView}>
          <View style={styles.mainView}>
            <Text style={styles.title}>
              Completed & win / close to prediction
            </Text>
            <Switch
              value={notifications.prediction}
              style={styles.switch}
              onValueChange={value =>
                setNotifications({ ...notifications, prediction: value })
              }
            />
          </View>
          <Text style={styles.details}>
            Game you're watching ends in a win or close to prediction
          </Text>
        </View>
        <View style={styles.notificationView}>
          <View style={styles.mainView}>
            <Text style={styles.title}>New Value bet</Text>
            <Switch
              value={notifications.fiveStarBet}
              style={styles.switch}
              onValueChange={value =>
                setNotifications({ ...notifications, fiveStarBet: value })
              }
            />
          </View>
          <Text style={styles.details}>
            Odds change and bet improves to Value bet
          </Text>
        </View>
      </Content>
    </Container>
  );
};

export default Notification;
