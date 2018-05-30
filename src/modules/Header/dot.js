import React from 'react'

export default ({ dots, onForward, onBack }) => (
  <div className="LiveScoresHeader-navigation">
    <button onClick={onBack}>
      <i className="material-icons">arrow_back</i>
    </button>
    <ul className="LiveScoresHeader-dots">{dots}</ul>
    <button onClick={onForward}>
      <i className="material-icons">arrow_forward</i>
    </button>
  </div>
)

export const dot = idx => (
  <div className="LiveScoresHeader-dot">
    <span>{idx}</span>
  </div>
)
