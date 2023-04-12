export type OBIDetailProps = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      obiData: {
        articleId: string;
        title: string;
        subTitle: string;
        fullText: string;
        author: string;
        order: number;
        displayOffset: number;
        publishDate: string;
        tags?: string[] | undefined;
        categories?: string[] | undefined;
      };
    };
  };
};
