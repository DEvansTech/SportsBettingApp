export type Props = {
  isModalVisible: boolean;
  toggleModal: () => void;
};

export type CalendarDateType = {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
};
