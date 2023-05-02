import React, { useState, useContext, useEffect } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useKeyboard } from '@react-native-community/hooks';
import {
  Container,
  Content,
  View,
  Text,
  Textarea,
  Form,
  Button
} from 'native-base';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';

import { AuthContext, AuthContextType } from '@Context/AuthContext';
import { UserHeader, LogoSpinner } from '@Components';

import { ToastMessage } from '@Lib/function';
import { submitFeedback, handleLoading } from '@Store/feedback/actions';
import { RootState } from '@Store/store';
import { Images } from '@Theme';
import { UserType } from './types';
import styles, { deviceHeight } from './styles';
import { Routes } from '@Navigators/routes';

const Feedback: React.FC = () => {
  const keyBoard = useKeyboard();

  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const dispatch = useDispatch();

  const { displayName, user } = useContext(AuthContext) as AuthContextType;
  const { states, loading } = useSelector((state: RootState) => state.feedback);

  const [userInfo, setUserInfo] = useState<UserType>();
  const [isSendFeedback, setIsSendFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitData, setSubmitData] = useState({});

  const sendFeedback = async () => {
    Keyboard.dismiss();
    await dispatch(handleLoading(true));
    const feedback = {
      uid: userInfo?.uid,
      email: userInfo?.email,
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      comments: feedbackText
    };
    setSubmitData(feedback);
    await dispatch(submitFeedback(feedback));
    Keyboard.dismiss();
  };

  const getUserData = () => {
    if (user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((doc: any) => {
          setUserInfo(doc.data());
        });
    }
  };

  useEffect(() => {
    (async () => {
      if (states?.status === 'OK') {
        setIsSendFeedback(true);
        await firestore().collection('feedbacks').doc(user.uid).set(submitData);
      } else if (states?.status === 'FAILED') {
        ToastMessage('Please send feedback again.', 'danger', 'bottom');
      }
    })();
  }, [states]);

  useEffect(() => {
    getUserData();
    setIsSendFeedback(false);
    dispatch(handleLoading(false));
    setFeedbackText('');

    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
      setIsSendFeedback(false);
      dispatch(handleLoading(false));
      setFeedbackText('');
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Container style={styles.background}>
      <UserHeader name="Feedback" to={Routes.Schedule} />
      {loading ? (
        <View style={styles.loadingView}>
          <LogoSpinner />
        </View>
      ) : isSendFeedback ? (
        <View style={styles.thanksView}>
          <Image source={Images.check} style={styles.checkImg} />
          <Text style={styles.thankText}>Thank You</Text>
          <Text style={styles.messageText}>
            Your message has been successfully sent.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.titleView}>
            <Text style={styles.title}>
              We welcome your questions or commments on how to improe the{' '}
              <Text style={styles.boldTitle}>ODDS-R </Text>
              BetIndex applicaton experience. Please drop us a note below and we
              hope all your bets are winners!
            </Text>
          </View>
          <Content contentContainerStyle={styles.contentView} scrollEnabled>
            <View style={styles.content}>
              <View style={styles.feedbackContent}>
                <View style={styles.feedbackHeader}>
                  <View style={styles.toView}>
                    <Text style={styles.subjectBoldText}>TO: </Text>
                    <Text style={styles.subjectText}>ODDS-R Support Team</Text>
                  </View>
                  <View style={styles.subjectView}>
                    <Text style={styles.subjectBoldText}>SUBJECT: </Text>
                    <Text style={styles.subjectText}>
                      Feedback from {displayName}
                    </Text>
                  </View>
                </View>
                <View style={styles.msgContent}>
                  <Form>
                    <Textarea
                      bordered
                      placeholder="Type your message here..."
                      style={[
                        styles.textArea,
                        {
                          height: !keyBoard.keyboardShown
                            ? deviceHeight * 0.4
                            : Platform.OS === 'android'
                            ? deviceHeight * 0.06
                            : deviceHeight * 0.15
                        }
                      ]}
                      value={feedbackText}
                      onChangeText={text => setFeedbackText(text)}
                    />
                  </Form>
                </View>
              </View>
            </View>
          </Content>
        </>
      )}

      {!loading && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.sendBtnView}>
          <Button
            full
            rounded
            style={[
              feedbackText === '' ? styles.sendDisBtn : styles.sendActiveBtn
            ]}
            disabled={feedbackText === ''}
            onPress={sendFeedback}>
            <Text style={styles.sendBtnText}>Send</Text>
          </Button>
        </KeyboardAvoidingView>
      )}
    </Container>
  );
};

export default Feedback;
