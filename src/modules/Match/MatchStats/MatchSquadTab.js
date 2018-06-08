import React from 'react'
import MatchStats from './MatchStats'

const MatchStatsTab = ({ match }) => {
  return (
    <div className="MatchStats-items">
      <MatchStats
        localTeam={match.localTeam}
        visitorTeam={match.visitorTeam}
        type="goals"
        localTeamValue={match.localTeam.score}
        visitorTeamValue={match.visitorTeam.score}
      />
      <MatchStats
        localTeam={match.localTeam}
        visitorTeam={match.visitorTeam}
        type="ballPossession"
        localTeamValue={match.localTeam.score}
        visitorTeamValue={match.visitorTeam.score}
      />
      <MatchStats
        localTeam={match.localTeam}
        visitorTeam={match.visitorTeam}
        type="shotOnGoal"
        localTeamValue={match.localTeam.score}
        visitorTeamValue={match.visitorTeam.score}
      />
      <MatchStats
        localTeam={match.localTeam}
        visitorTeam={match.visitorTeam}
        type="shotsOnTarget"
        localTeamValue={match.localTeam.score}
        visitorTeamValue={match.visitorTeam.score}
      />
      <MatchStats
        localTeam={match.localTeam}
        visitorTeam={match.visitorTeam}
        type="shotsOffTarget"
        localTeamValue={match.localTeam.score}
        visitorTeamValue={match.visitorTeam.score}
      />
      <MatchStats
        localTeam={match.localTeam}
        visitorTeam={match.visitorTeam}
        type="corner"
        localTeamValue={match.localTeam.score}
        visitorTeamValue={match.visitorTeam.score}
      />
      <MatchStats
        localTeam={match.localTeam}
        visitorTeam={match.visitorTeam}
        type="offside"
        localTeamValue={match.localTeam.score}
        visitorTeamValue={match.visitorTeam.score}
      />
      <MatchStats
        localTeam={match.localTeam}
        visitorTeam={match.visitorTeam}
        type="fouls"
        localTeamValue={match.localTeam.score}
        visitorTeamValue={match.visitorTeam.score}
      />
    </div>
  )
}

export default MatchStatsTab
