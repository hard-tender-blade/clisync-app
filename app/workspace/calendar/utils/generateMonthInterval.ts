import { MONTH_CALENDAR_DAYS_INTERVAL } from '@/modules/shared/constants/constants'
import moment from 'moment'

const generateMonthInterval = (date?: moment.Moment) => {
    const time = date || moment()
    const startOfMonth = time.startOf('month')

    let start = startOfMonth.clone()
    while (start.weekday() !== 1) {
        start = start.subtract(1, 'days')
    }
    start.startOf('day')
    const end = startOfMonth.clone().add(MONTH_CALENDAR_DAYS_INTERVAL, 'days').endOf('day')

    return {
        start,
        end,
    }
}
export default generateMonthInterval
