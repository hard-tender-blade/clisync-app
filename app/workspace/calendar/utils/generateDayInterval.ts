import moment from 'moment'

const generateDayInterval = (date?: moment.Moment) => {
    const time = date || moment()

    return {
        start: time.clone().startOf('day'),
        end: time.clone().endOf('day'),
    }
}
export default generateDayInterval
