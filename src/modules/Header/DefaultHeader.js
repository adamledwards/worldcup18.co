import React from 'react'

const DefaultHeader = () => {
  return (
    <React.Fragment>
      <div className="Grid">
        <h1 className="Header-intro Grid-cell lg-12of14 md-10of14">
          Two Thousand &amp; Eighteen FIFA World Cup
        </h1>
      </div>
      <div className="Grid Header-seperator">
        <div className="Grid-cell lg-2of14 md-2of14">
          <span className="bar" />
        </div>
      </div>
      <div className="Grid Header-subintro-grid ">
        <h2 className="Header-subintro Grid-cell lg-10of14 md-10of14">
          Quadrennial international football tournament
        </h2>
      </div>
      <div className="Grid">
        <h3 className="Header-date Grid-cell">14 June &mdash; 15 July 2018</h3>
      </div>
    </React.Fragment>
  )
}

export default DefaultHeader
