import React, { Fragment } from 'react'
import moment from 'moment'

export default ({month, className}) => {
  const daysOfWeek = moment.weekdaysMin()
  const su = daysOfWeek.shift()
  daysOfWeek.push(su)

  const daysOfWeekShort = moment.weekdaysShort()
  const sun = daysOfWeekShort.shift()
  daysOfWeekShort.push(sun)
  return (
    <Fragment>
      <h3 className={`Grid-cell s-7of7 Calendar-header ${className}`}>&mdash; {month} 2018</h3>
        {daysOfWeek.map((day, i) => (
          <span key={day} className="Grid-cell s-1of7 Calendar-day-of-week">
            <span className='day-min'>{day}</span>
            <span className='day-short'>{daysOfWeekShort[i]}</span>
          </span>
        ))}
    </Fragment>
  )
}
