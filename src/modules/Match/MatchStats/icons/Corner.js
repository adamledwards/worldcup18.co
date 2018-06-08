import React from 'react'

const Corner = props => (
  <svg
    width={114}
    height={70}
    viewBox="0 0 114 70"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="b">
        <stop stopColor="#047309" offset="0%" />
        <stop stopColor="#FFF" offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        d="M55.684 57.324v9.846l-16.468-7.855c4.826-1.243 10.569-1.937 16.468-1.99zm20.21-46.885l-18.377 8.443V1.994l18.378 8.445zM74.008 59.42l-16.49 7.758V57.33c5.94.08 11.684.807 16.49 2.09zm39.355-17.492a.914.914 0 0 0-1.217-.45L76.503 58.248c-.047-.025-.085-.06-.138-.076-5.305-1.66-11.963-2.602-18.848-2.694V20.839a.897.897 0 0 0 .331-.074l20.64-9.483a.925.925 0 0 0 .539-.843.927.927 0 0 0-.539-.843L57.848.112a.888.888 0 0 0-.789.03A.886.886 0 0 0 56.6 0a.922.922 0 0 0-.916.928V55.47c-6.885.062-13.583.978-18.933 2.612-.02.006-.036.023-.055.03L1.307 41.233a.916.916 0 0 0-1.22.444.932.932 0 0 0 .44 1.233L56.21 69.47c.004.003.01.001.017.004.115.053.24.085.373.085a.906.906 0 0 0 .373-.083c.005-.003.009-.002.014-.004l55.93-26.311a.932.932 0 0 0 .445-1.232z"
        fill="url(#b)"
      />
    </g>
  </svg>
)

export default Corner
