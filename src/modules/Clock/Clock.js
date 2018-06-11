import React, { Component } from 'react'
import moment from 'moment'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hour: parseInt(moment().format('h'), 0) / 12,
      minute: parseInt(moment().format('m'), 0) / 60,
    }
  }
  render() {
    const { hour, minute } = this.state
    const hourHand = hour * 360
    const minuterHand = minute * 360
    const toNextHour = minute * 30

    return (
      <svg
        width={416}
        height={416}
        version={1}
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path id="a" d="M0 416V0h416v416z" />
        </defs>
        <g fill="none" fillRule="evenodd">
          <g>
            <mask id="b" fill="#fff">
              <use xlinkHref="#a" />
            </mask>
            <path
              d="M208 0v32m-104-4l16 27m-92 49l28 16M0 208h32m-4 104l27-16m49 92l16-28m88 56v-32m104 4l-16-27m92-49l-28-16m56-88h-32m4-104l-27 16m-49-92l-16 28"
              stroke="#FFFFFE"
              strokeWidth={3}
              mask="url(#b)"
            />
            <path
              d="M187 1l2 20M165 4l4 20m-25-14l6 19m-26-11l8 18m-46 4l12 15m-29-2l13 15m-28 1l14 13m-28 3l16 12m-38 26l18 8m-26 12l19 6M5 164l19 4M1 186l20 2M1 229l20-2M4 251l20-4m-14 25l19-6m-11 26l18-8m4 46l15-12m-2 29l15-13m1 28l13-14m3 28l12-16m26 38l8-18m12 26l6-19m15 24l4-19m18 23l2-20m41 20l-2-20m24 17l-4-20m25 14l-6-19m26 11l-8-18m46-4l-12-15m29 2l-13-15m28-1l-14-13m28-3l-16-12m38-26l-18-8m26-12l-19-6m24-15l-19-4m23-18l-20-2m20-41l-20 2m17-24l-20 4m14-25l-19 6m11-26l-18 8m-4-46l-15 12m2-29l-15 13m-1-28l-13 14m-3-28l-12 16m-26-38l-8 18m-12-26l-6 19M252 5l-4 19M230 1l-2 20"
              stroke="#91928E"
              strokeWidth={2}
              mask="url(#b)"
            />
          </g>
          <path
            fill="#FFFFFE"
            d="M204 60h-2V48l-4 1v-2l6-2v15M220 61h-11v-2l5-5a21 21 0 0 0 2-3l1-1a3 3 0 0 0 0-1l-1-1-1-1h-1-1l-1 1v2h-3v-2a5 5 0 0 1 3-3h5l1 1 1 2a5 5 0 0 1 0 3l-1 1-1 2-1 1-3 4h7v2M289 82h-2V70l-4 1v-2l6-2v15M126 82h-2V70l-4 1v-2l6-2v15M135 82h-2V70l-4 1v-2l6-2v15M347 135h-11v-2l5-5a21 21 0 0 0 2-3l1-1a3 3 0 0 0 0-1l-1-1-1-1h-1-1a2 2 0 0 0-1 2v1h-3v-2a5 5 0 0 1 3-3h5l1 1 1 2a5 5 0 0 1 0 3l-1 1-1 2-1 1-3 4h7v2M75 134h-2v-12l-4 1v-2l6-2v15M86 125v-2-1l-1-1h-1-1l-1 1v10a2 2 0 0 0 2 1h1l1-1v-1-6zm3 3v3l-1 2-2 2h-4l-2-2-1-2v-5-3l1-2 2-2h4l2 2 1 2v5zM340 289h4v-7l-1 1-3 6zm6 0h2v2h-2v3h-2v-3h-7v-2l7-10h2v10zM75 282v-1l-1-1h-1l-2 1v3l1 1h2l1-1v-1-1zm0 7v-1l-1-1h-1-1a2 2 0 0 0-1 1v3l1 1h1l2-1v-2zm3-7l-1 2-1 2h1a4 4 0 0 1 1 2v3l-1 2-2 1h-4l-2-1-1-2a5 5 0 0 1 1-4v-1h1l-1-2-1-2 1-2a4 4 0 0 1 2-2h4l1 1 1 1 1 2zM282 342l1-8h9v2h-7v4h1l1-1 2 1 2 1 1 2a7 7 0 0 1 0 4l-1 1-2 2h-4l-1-1-2-2v-1h2l1 1 2 1h1l1-1v-1a5 5 0 0 0 0-3v-1h-1-2a2 2 0 0 0-1 0h-3M135 335l-6 14h-3l6-13h-8v-2h11v1M208 362l-1 1a3 3 0 0 0-1 1v4l1 1h1a2 2 0 0 0 2-1v-1l1-1-1-2v-1h-1l-1-1zm3-7v2l-3 1a4 4 0 0 0-2 2v2l1-1 2-1 2 1 1 1 1 2a7 7 0 0 1 0 4l-1 1-2 2h-2a5 5 0 0 1-4-2l-1-2v-3a15 15 0 0 1 1-5l1-1a6 6 0 0 1 3-3h3zM365 207h3l1-1v-1-1-1l-2-1h-1l-1 1v1h-3a4 4 0 0 1 1-3l2-1h4l1 1 1 2 1 1a3 3 0 0 1-1 2 4 4 0 0 1-2 2h2a3 3 0 0 1 1 2v3l-1 2-2 1a6 6 0 0 1-4 0l-2-1a4 4 0 0 1-1-3h3v1a2 2 0 0 0 1 1h1l2-1v-2-1a2 2 0 0 0-1-1h-3v-2M49 209h1a3 3 0 0 0 1-1v-2-2-1l-1-1h-1-1l-1 1v1a5 5 0 0 0 0 3v1h1l1 1zm-3 5l3-1h1l1-2v-2l-1 1-2 1-2-1-1-1-1-2a7 7 0 0 1 0-4l1-1 2-2h2l2 1 2 1 1 2v3a17 17 0 0 1-1 5l-1 1-1 2-2 1h-3v-2z"
          />
          <path
            d="M208 208V78"
            stroke="#797A76"
            strokeWidth={4}
            strokeLinecap="round"
            transform={`rotate(${minuterHand} 208 208)`}
          />
          <path
            d="M208 208V85"
            stroke="#FFFFFE"
            strokeWidth={4}
            strokeLinecap="round"
            transform={`rotate(${hourHand + toNextHour} 208 208)`}
          />
          <path d="M210 208a2 2 0 1 1-4 0 2 2 0 0 1 4 0" fill="#ACADA9" />
        </g>
      </svg>
    )
  }
}

export default Clock
