declare module '@env' {
  export const REACT_NATIVE_APP_ENV: string;
  export const WEB_CLIENT_ID: string;
  export const API_URI: string;
  export const API_KEY: string;
  export const SUPPORT_API_URI: string;
  export const SUPPORT_API_KEY: string;
  export const TEAM_LOGO_URI: string;
  export const OBI_API_URI: string;

  export const ENV: 'dev' | 'prod';
}
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-remote-svg';
