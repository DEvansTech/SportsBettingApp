// export type Props = {
//   navigation: any;
//   route: {
//     key: string;
//     name: string;
//     params: {
//       isUserOpen?: boolean;
//     };
//   };
// };
export type CarosuelProps = {
  nextPage: () => void;
  prevPage: () => void;
  closePage: () => void;
};

export type UserType = {
  introPage?: boolean;
};
