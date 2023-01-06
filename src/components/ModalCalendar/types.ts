export type Props = {
  isModalVisible: boolean;
  selectDate: (value: string) => void;
  selectedDate: string;
  toggleModal: () => void;
  maxDate?: string;
};

export type CalendarDateType = {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
};
