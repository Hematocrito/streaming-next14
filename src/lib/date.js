import moment from 'moment';
export function formatDate(date, format) {
    if (format === void 0) { format = 'DD/MM/YYYY HH:mm:ss'; }
    return moment(date).format(format);
}
export function formatDateNoTime(date, format) {
    if (format === void 0) { format = 'DD/MM/YYYY'; }
    return moment(date).format(format);
}
export function getDiffDate(date, type) {
    if (type === void 0) { type = 'years'; }
    return moment().diff(date, type);
}
export function formatDateFromnow(date) {
    return moment(date).fromNow();
}
