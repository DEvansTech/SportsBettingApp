export type UserType = {
  email?: string;
  firstName?: string;
  lastName?: string;
  uid?: string;
  registerType?: string;
  password?: string;
  repassword?: string;
  introPage?: boolean;
  registerDate?: number;
  subscription?: {
    expiresDate: number;
    productItem: string;
    purchaseDate: string;
  };
};
