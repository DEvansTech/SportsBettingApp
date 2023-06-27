export type Props = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      isUpdate: boolean;
      selectedItem?: string;
    };
  };
};
