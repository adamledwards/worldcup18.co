import React from 'react'

const Offside = props => (
  <svg width={95} height={65} viewBox="0 0 95 65" {...props}>
    <defs>
      <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="a">
        <stop stopColor="#047309" offset="0%" />
        <stop stopColor="#FFF" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M85.031 6.41h68.131V3.28H85.031v3.13zm26.832 56.755h38.916V8.311h-38.916v54.854zM61.838 7.854h21.346v-6.02H61.838v6.02zm92.243-6.41H85.02V.918A.92.92 0 0 0 84.103 0H60.918A.919.919 0 0 0 60 .918v7.854c0 .506.411.917.918.917h23.184c.508 0 .92-.41.92-.917v-.528h25.004v55.84c0 .505.412.916.919.916h40.753c.508 0 .92-.41.92-.917V8.244h1.463c.508 0 .92-.41.92-.917V2.362a.918.918 0 0 0-.92-.918z"
      transform="translate(-60)"
      fill="url(#a)"
      fillRule="evenodd"
    />
  </svg>
)

export default Offside
