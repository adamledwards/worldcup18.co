export const status = (mt, dateTime) => {
  switch (mt.status) {
    case 'AET':
    case 'FT_PEN': {
      return 'Full Time AET'
    }
    case 'PEN_LIVE': {
      return 'Penalties'
    }
    case 'FT': {
      return 'Full Time'
    }
    case 'HT': {
      return 'Half Time'
    }
    case 'LIVE': {
      const added = mt.added_time ? `+ ${mt.added_time}` : ''
      return `Live ${mt.minute + added} mins`
    }
    default: {
      return dateTime.format('HH:mm')
    }
  }
}

export const goalType = type => {
  switch (type) {
    case 'own-goal': {
      return ' OG'
    }
    case 'penalty': {
      return ' Pen'
    }
    default: {
      return ''
    }
  }
}

export const penalty = fixture => {
  switch (fixture.time.status) {
    case 'FT_PEN': {
      if (fixture.localTeam.pen > fixture.visitorTeam.pen) {
        return `${fixture.localTeam.team_name} win ${fixture.localTeam.pen} - ${
          fixture.visitorTeam.pen
        } on penalties`
      }
      return `${fixture.visitorTeam.team_name} win ${
        fixture.visitorTeam.pen
      } - ${fixture.localTeam.pen} on penalties`
    }
    case 'PEN_LIVE': {
      return `${fixture.localTeam.team_name} ${fixture.localTeam.pen} - ${
        fixture.visitorTeam.pen
      } ${fixture.visitorTeam.team_name} on penalties`
    }
    default: {
      return ''
    }
  }
}
