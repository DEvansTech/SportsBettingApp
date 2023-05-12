import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction
} from 'react';
import { Toast } from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export type AuthContextType = {
  user: any;
  displayName: string;
  setUser: Dispatch<SetStateAction<any>>;
  setDisplayName: Dispatch<SetStateAction<any>>;
  emailLogin: (email: string, password: string) => void;
  emailRegister: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => void;
  logout: () => void;
  checkExpireTime: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const emailLogin = async (email: string, password: string) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (e: any) {
    switch (e.code) {
      case 'auth/wrong-password':
        Toast.show({
          text: 'The email or password entered is incorrect. Please try again',
          buttonText: 'Close',
          type: 'danger',
          duration: 3000
        });
        break;
      case 'auth/invalid-email':
        Toast.show({
          text: 'The email address entered is not valid.  Please try again.',
          buttonText: 'Close',
          type: 'danger',
          duration: 3000
        });
        break;
      case 'auth/user-not-found':
        Toast.show({
          text: 'The email address entered does not match an account in the system.  Please try again.',
          buttonText: 'Close',
          type: 'danger',
          duration: 3000
        });
        break;
    }
  }
};
const emailRegister = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    if (response.user.uid) {
      const user = {
        uid: response.user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        registerType: 'email',
        introPage: true,
        registerDate: Date.now()
      };
      firestore().collection('users').doc(response.user.uid).set(user);
    }
  } catch (e: any) {
    switch (e.code) {
      case 'auth/email-already-in-use':
        Toast.show({
          text: 'The email address is already in use by another account',
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000
        });
        break;
      case 'auth/invalid-email':
        Toast.show({
          text: 'The email address is badly formatted.',
          buttonText: 'Okay',
          type: 'danger',
          duration: 3000
        });
        break;
      default:
        break;
    }
  }
};

const checkExpireTime = async () => {
  return await auth().currentUser?.getIdTokenResult();
};

const logout = async () => {
  try {
    await auth().signOut();
  } catch (e) {
    console.error(e);
  }
};

export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        displayName,
        setDisplayName,
        emailLogin,
        emailRegister,
        logout,
        checkExpireTime
      }}>
      {children}
    </AuthContext.Provider>
  );
};
