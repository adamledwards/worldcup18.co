import React, { Component } from 'react'
import './Share.css'

export default class Share extends Component {
  render() {
    return (
      <section className="Share">
        <ul>
          <li>
            <a
              className="facebook"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A//worldcup18.co"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="twitter"
              href="https://twitter.com/home?status=Two%20Thousand%20%26%20Eighteen%20FIFA%20World%20Cup%0Ahttps%3A//worldcup18.co"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="googleplus"
              href="https://plus.google.com/share?url=https%3A//worldcup18.co"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="email"
              href="mailto:?&subject=Two%20Thousand%20%26%20Eighteen%20FIFA%20World%20Cup&body=Two%20Thousand%20%26%20Eighteen%20FIFA%20World%20Cup%0Ahttps%3A//worldcup18.co"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
                />
              </svg>
            </a>
          </li>
        </ul>
      </section>
    )
  }
}
