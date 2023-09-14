import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { Root } from 'native-base';
import {Text} from 'react-native'

import configureStore from '@Store/store';
import { AuthProvider } from '@Context/AuthContext';
import { MainProvider } from '@Context/MainContext';
import { AppContainer } from '@Navigators/AppContainer';

const store = configureStore();

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}

((Text as unknown) as TextWithDefaultProps).defaultProps =
  ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;

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

export default App;
