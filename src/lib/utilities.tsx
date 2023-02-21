import moment from 'moment';
import ImageColors from 'react-native-image-colors';

export const convertEST = (date: string) => {
  const offset = moment().utcOffset();
  const localText = moment.utc(date).utcOffset(offset).format('LT');
  return localText;
};

export const dateFormat = (date: number) => {
  const dateTime = moment(date).format('YYYY-MM-DD');
  return dateTime;
};

export const timeStamptoDate = (date: string) => {
  const dateTime = moment(date).format('LL');
  return dateTime;
};

export const timeStamptoDateTime = (date: number) => {
  const dateTime = moment(date).format('lll');
  return dateTime;
};

export const calendarDate = (date: string) => {
  const dateTime = moment(date).format('ll');
  const dateArray = dateTime.split(/[.,\/ -]/);
  return dateArray;
};

export const ordinalSuffixOf = (i: string | number | undefined) => {
  if (!undefined) {
    let j = Number(i) % 10,
      k = Number(i) % 100;
    if (j === 1 && k !== 11) {
      return i + 'st';
    }
    if (j === 2 && k !== 12) {
      return i + 'nd';
    }
    if (j === 3 && k !== 13) {
      return i + 'rd';
    }
    return i + 'th';
  }
};

export const getPreviousDate = (date: string) => {
  const previousDay = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
  return previousDay;
};

export const getNextDate = (date: string) => {
  const nextDay = moment(date).add(1, 'days').format('YYYY-MM-DD');
  return nextDay;
};

export const dateCompare = (selectedDate: string) => {
  return moment(selectedDate).isAfter(dateFormat(Date.now()), 'day');
};

export const getTeamLogoColor = async (uri: any) => {
  const result = await ImageColors.getColors(uri, {
    fallback: '#000000',
    quality: 'low',
    pixelSpacing: 10,
    cache: true
  });
  switch (result.platform) {
    case 'android':
      return result.average !== '#FFFFFF' ? result.average : result.dominant;
    case 'ios':
      return result.background !== '#FFFFFF'
        ? result.background
        : result.detail;
    default:
      throw new Error('Unexpected platform key');
  }
};
