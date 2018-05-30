import React, { Component } from 'react'
import Slider from 'react-slick'
import SlickNavigation, { dot } from './dot'

const Score = () => (
  <div className="Grid LiveScoresHeader-item">
    <div className="s-5of7 Grid-cell">
      <span className="LiveScoresHeader-team">Germany</span>
      <span className="LiveScoresHeader-players">
        Draxler (56), Draxler (56)
      </span>
    </div>
    <span className="s-2of7 Grid-cell LiveScoresHeader-goals">2</span>
  </div>
)

export default class LiveScoresHeader extends Component {
  constructor(props) {
    super(props)
    this.slider = React.createRef()
  }

  goToNext = () => {
    this.slider.current.slickNext()
  }

  goToPrev = () => {
    this.slider.current.slickPrev()
  }
  render() {
    return (
      <div className="LiveScoresHeader">
        <Slider
          arrows={false}
          customPaging={dot}
          appendDots={dots => (
            <SlickNavigation
              onForward={this.goToNext}
              onBack={this.goToPrev}
              dots={dots}
            />
          )}
          dots={true}
          ref={this.slider}
        >
          {Array.from({ length: 3 }, (_, i) => (
            <div>
              <div key={i} className="LiveScoresHeader-items">
                <Score />
                <span className="LiveScoresHeader-separator">&mdash;</span>
                <Score />
              </div>
              <span className="LiveScoresHeader-stats">
                Live Scores / 82 minutes
              </span>
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}
