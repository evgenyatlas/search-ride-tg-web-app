function padZero(num) {
    return num.toString().padStart(2, '0')
}

function ddmmyy(date: Date) {
    return [
        padZero(date.getDate()),
        padZero(date.getMonth() + 1),
        padZero(date.getFullYear()),
    ].join('-')
}

function yymmdd(date: Date) {
    return [
        padZero(date.getFullYear()),
        padZero(date.getMonth() + 1),
        padZero(date.getDate())
    ].join('-')
}


const months = {
    ru: {
        0: 'января',
        1: 'февраля',
        2: 'марта',
        3: 'апреля',
        4: 'мая',
        5: 'июня',
        6: 'июля',
        7: 'августа',
        8: 'сентября',
        9: 'октября',
        10: 'ноября',
        11: 'декабря'
    }
}
/**
 * Display the date in the following format
 * Завтра
 * 27 октября 2022
 */
function formatDate(date: Date) {
    const now = new Date()
    return `${date.getDate()} ${months.ru[date.getMonth()]}, ${date.getFullYear()}`
}

function dateTimeLocal(date: Date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    return date.toISOString().slice(0, 16)
}

function dateLocal(date: Date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    return date.toISOString().slice(0, 10)
}

function msToHours(ms: number) {
    return ms * 1000 * 60 * 60 * ms
}

export const datetime = {
    ddmmyy,
    yymmdd,
    dateTimeLocal,
    dateLocal,
    msToHours,
    formatDate
}