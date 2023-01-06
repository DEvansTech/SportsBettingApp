import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Root } from 'native-base';
import { withIAPContext } from 'react-native-iap';

import configureStore from '@Store/store';
import { AuthProvider } from '@Context/AuthContext';
import { MainProvider } from '@Context/MainContext';
import { AppContainer } from '@Navigators/AppContainer';

const store = configureStore();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <Fragment>
        <Root>
          <AuthProvider>
            <MainProvider>
              <AppContainer />
            </MainProvider>
          </AuthProvider>
        </Root>
      </Fragment>
    </Provider>
  );
};

export default withIAPContext(App);
