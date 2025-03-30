import moment from 'moment'

const generateWeekInterval = (date?: moment.Moment) => {
    const time = date || moment()
    const start = time.clone().subtract(1, 'days').startOf('day')
    const end = time.clone().add(7, 'days').endOf('day')

    return {
        start,
        end,
    }
}
export default generateWeekInterval
