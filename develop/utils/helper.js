import moment from 'moment';

export const filterByTime = (item, timeFilter) => {
    const keys = Object.keys(timeFilter);
    if (keys.length) {
        return keys.some(key => moment(key, 'HH:mm').isBetween(moment(item.start24, 'HH:mm'), moment(item.end24, 'HH:mm'), null, '[)'));
    } else {
        return true;
    }
};
