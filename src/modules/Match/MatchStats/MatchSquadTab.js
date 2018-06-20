import React from 'react'
import MatchStats from './MatchStats'
import Fade from 'react-reveal/Fade'

const MatchStatsTab = ({ match, details }) => {
  const { localTeam, visitorTeam } = details
  return (
    <Fade>
      <div className="MatchStats-items">
        <MatchStats
          localTeam={match.localTeam}
          visitorTeam={match.visitorTeam}
          type="goals"
          localTeamValue={match.localTeam.score}
          visitorTeamValue={match.visitorTeam.score}
          active={Boolean(details)}
        />
        <MatchStats
          localTeam={match.localTeam}
          visitorTeam={match.visitorTeam}
          type="ballPossession"
          localTeamValue={localTeam.stats.ballPossession}
          visitorTeamValue={visitorTeam.stats.ballPossession}
          active={Boolean(details)}
        />
        <MatchStats
          localTeam={match.localTeam}
          visitorTeam={match.visitorTeam}
          type="shotsOnGoal"
          localTeamValue={localTeam.stats.shotsOnGoal}
          visitorTeamValue={visitorTeam.stats.shotsOnGoal}
          active={Boolean(details)}
        />
        <MatchStats
          localTeam={match.localTeam}
          visitorTeam={match.visitorTeam}
          type="shotsOnTarget"
          localTeamValue={localTeam.stats.shotsOnTarget}
          visitorTeamValue={visitorTeam.stats.shotsOnTarget}
          active={Boolean(details)}
        />
        <MatchStats
          localTeam={match.localTeam}
          visitorTeam={match.visitorTeam}
          type="shotsOffTarget"
          localTeamValue={localTeam.stats.shotsOffTarget}
          visitorTeamValue={visitorTeam.stats.shotsOffTarget}
          active={Boolean(details)}
        />
        <MatchStats
          localTeam={match.localTeam}
          visitorTeam={match.visitorTeam}
          type="corner"
          localTeamValue={localTeam.stats.corner}
          visitorTeamValue={visitorTeam.stats.corner}
          active={Boolean(details)}
        />
        <MatchStats
          localTeam={match.localTeam}
          visitorTeam={match.visitorTeam}
          type="offside"
          localTeamValue={localTeam.stats.offside}
          visitorTeamValue={visitorTeam.stats.offside}
          active={Boolean(details)}
        />
        <MatchStats
          localTeam={match.localTeam}
          visitorTeam={match.visitorTeam}
          type="fouls"
          localTeamValue={localTeam.stats.fouls}
          visitorTeamValue={visitorTeam.stats.fouls}
          active={Boolean(details)}
        />
      </div>
    </Fade>
  )
}

export default MatchStatsTab
