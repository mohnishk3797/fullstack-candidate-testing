export const parseFilterName = (filter) => {
    return filter.toUpperCase().replace('_', ' ')
}

export const thousandsFormatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const get2CapitalLetters = (string) => {
    return string.substr(0, 2).toUpperCase();
}

const getDiffWeeks = (stringDate) => {
    const date_f = Date.parse(stringDate)
    const MILISEC_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
    return Math.round((Date.now() - date_f) / MILISEC_PER_WEEK);
}

export const formatDiffWeekName = (date) => {
    const weeksAgo = getDiffWeeks(date)
    return weeksAgo + ' week' + ((weeksAgo > 1) ? 's' : '') + ' ago'
}

export const formatCurrency = (number) => {
    return `$${thousandsFormatNumber(number)}`
}