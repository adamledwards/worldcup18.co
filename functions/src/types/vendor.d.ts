declare namespace SportmonksResponse {
  export namespace FixturesResponse {
    export interface Formations {
      localteam_formation?: any
      visitorteam_formation?: any
    }

    export interface Scores {
      localteam_score: number
      visitorteam_score: number
      localteam_pen_score: number
      visitorteam_pen_score: number
      ht_score: string
      ft_score?: any
      et_score?: any
    }

    export interface StartingAt {
      date_time: string
      date: string
      time: string
      timestamp: number
      timezone: string
    }

    export interface Time {
      status: string
      starting_at: StartingAt
      minute?: any
      second?: any
      added_time?: any
      extra_minute?: any
      injury_time?: any
    }

    export interface Coaches {
      localteam_coach_id?: any
      visitorteam_coach_id?: any
    }

    export interface Standings {
      localteam_position?: any
      visitorteam_position?: any
    }

    export interface Data {
      id: number
      legacy_id: number
      name: string
      twitter?: any
      country_id: number
      national_team: boolean
      founded: number
      logo_path: string
      venue_id: number
      short_code: string
    }

    export interface LocalTeam {
      data: Data
    }

    export interface Data2 {
      id: number
      legacy_id: number
      name: string
      twitter?: any
      country_id: number
      national_team: boolean
      founded: number
      logo_path: string
      venue_id: number
      short_code: string
    }

    export interface VisitorTeam {
      data: Data2
    }

    export interface Data3 {
      id: number
      name: string
      league_id: number
      season_id: number
    }

    export interface Stage {
      data: Data3
    }
    export interface Group {
      data: {
        name: string
      }
    }
    export interface Data4 {
      id: number
      name: string
      surface: string
      address: string
      city: string
      capacity: number
      image_path: string
      coordinates: string
    }

    export interface Venue {
      data: Data4
    }

    export interface Datum {
      id: number
      league_id: number
      season_id: number
      stage_id: number
      round_id: number
      group_id: number
      aggregate_id?: any
      venue_id: number
      referee_id?: any
      localteam_id: number
      visitorteam_id: number
      weather_report?: any
      commentaries: boolean
      attendance?: any
      pitch?: any
      winning_odds_calculated: boolean
      formations: Formations
      scores: Scores
      time: Time
      coaches: Coaches
      standings: Standings
      deleted: boolean
      localTeam: LocalTeam
      visitorTeam: VisitorTeam
      stage: Stage
      group: Group
      venue: Venue
    }

    export interface StartedAt {
      date: string
      timezone_type: number
      timezone: string
    }

    export interface TrialEndsAt {
      date: string
      timezone_type: number
      timezone: string
    }

    export interface Subscription {
      started_at: StartedAt
      trial_ends_at: TrialEndsAt
      ends_at?: any
    }

    export interface Plan {
      name: string
      price: string
      request_limit: string
    }

    export interface Sport {
      id: number
      name: string
      current: boolean
    }

    export interface Pagination {
      total: number
      count: number
      per_page: number
      current_page: number
      total_pages: number
      links: any[]
    }

    export interface Meta {
      subscription: Subscription
      plan: Plan
      sports: Sport[]
      pagination: Pagination
    }

    export interface Fixtures {
      data: Datum[]
      meta: Meta
    }
  }

  export namespace TeamsResponse {
    export interface Squad {
      data: any[]
    }

    export interface Data {
      coach_id: number
      team_id?: number
      country_id: number
      common_name: string
      fullname: string
      firstname: string
      lastname: string
      nationality: string
      birthdate: string
      birthcountry: string
      birthplace: string
      image_path: string
    }

    export interface Coach {
      data: Data
    }

    export interface Data2 {
      team_id: number
      points: number
      position: number
      position_status: string
      position_won_or_lost: number
    }

    export interface Fifaranking {
      data: Data2
    }

    export interface Datum {
      id: number
      legacy_id: number
      name: string
      short_code: string
      twitter?: any
      country_id: number
      national_team: boolean
      founded: number
      logo_path: string
      venue_id: number
      squad: Squad
      coach: Coach
      fifaranking: Fifaranking
    }

    export interface StartedAt {
      date: string
      timezone_type: number
      timezone: string
    }

    export interface TrialEndsAt {
      date: string
      timezone_type: number
      timezone: string
    }

    export interface Subscription {
      started_at: StartedAt
      trial_ends_at: TrialEndsAt
      ends_at?: any
    }

    export interface Plan {
      name: string
      price: string
      request_limit: string
    }

    export interface Sport {
      id: number
      name: string
      current: boolean
    }

    export interface Meta {
      subscription: Subscription
      plan: Plan
      sports: Sport[]
    }

    export interface Teams {
      data: Datum[]
      meta: Meta
    }
  }

  export namespace SquadResponse {
    export interface Data {
      player_id: number
      team_id: number
      country_id: number
      position_id: number
      common_name: string
      fullname: string
      firstname: string
      lastname: string
      nationality: string
      birthdate: string
      birthcountry: string
      birthplace: string
      height: string
      weight: string
      image_path: string
    }

    export interface Player {
      data: Data
    }

    export interface Data2 {
      id: number
      name: string
    }

    export interface Position {
      data: Data2
    }

    export interface Datum {
      player_id: number
      position_id: number
      number?: any
      injured: boolean
      minutes: number
      appearences: number
      lineups: number
      substitute_in: number
      substitute_out: number
      substitutes_on_bench: number
      goals: number
      assists: number
      yellowcards: number
      yellowred: number
      redcards: number
      player: Player
      position: Position
    }

    export interface Squad {
      data: Datum[]
    }
  }

  export namespace FixturesDetail {
    export interface Temperature {
      temp: number
      unit: string
    }

    export interface Wind {
      speed: string
      degree: number
    }

    export interface WeatherReport {
      code: string
      type: string
      icon: string
      temperature: Temperature
      clouds: string
      humidity: string
      wind: Wind
    }

    export interface Formations {
      localteam_formation: string
      visitorteam_formation: string
    }

    export interface Scores {
      localteam_score: number
      visitorteam_score: number
      localteam_pen_score?: any
      visitorteam_pen_score?: any
      ht_score: string
      ft_score: string
      et_score?: any
    }

    export interface StartingAt {
      date_time: string
      date: string
      time: string
      timestamp: number
      timezone: string
    }

    export interface Time {
      status: string
      starting_at: StartingAt
      minute: number
      second?: any
      added_time: number
      extra_minute?: any
      injury_time: number
    }

    export interface Coaches {
      localteam_coach_id: number
      visitorteam_coach_id: number
    }

    export interface Standings {
      localteam_position: number
      visitorteam_position: number
    }

    export interface Data {
      id: number
      legacy_id: number
      name: string
      short_code: string
      twitter?: any
      country_id: number
      national_team: boolean
      founded: number
      logo_path: string
      venue_id: number
    }

    export interface LocalTeam {
      data: Data
    }

    export interface Data2 {
      id: number
      legacy_id: number
      name: string
      short_code: string
      twitter?: any
      country_id: number
      national_team: boolean
      founded: number
      logo_path: string
      venue_id: number
    }

    export interface VisitorTeam {
      data: Data2
    }

    export interface Datum2 {
      id: number
      team_id: string
      type: string
      fixture_id: number
      player_in_id: number
      player_in_name: string
      player_out_id: number
      player_out_name: string
      minute: number
      extra_minute?: any
      injuried?: any
    }

    export interface Substitutions {
      data: Datum2[]
    }

    export interface Datum3 {
      id: number
      team_id: string
      type: string
      fixture_id: number
      player_id: number
      player_name: string
      player_assist_id?: number
      player_assist_name: string
      minute: number
      extra_minute?: number
      result?: any
    }

    export interface Goals {
      data: Datum3[]
    }

    export interface Shots {
      shots_total: number
      shots_on_goal: number
    }

    export interface Goals2 {
      scored: number
      conceded: number
    }

    export interface Fouls {
      drawn: number
      committed: number
    }

    export interface Cards {
      yellowcards: number
      redcards: number
    }

    export interface Passing {
      total_crosses: number
      crosses_accuracy: number
      passes: number
      passes_accuracy: number
    }

    export interface Other {
      assists: number
      offsides: number
      saves: number
      pen_scored: number
      pen_missed: number
      pen_saved: number
      pen_committed: number
      pen_won: number
      hit_woodwork: number
      tackles: number
      blocks: number
      interceptions: number
      clearances: number
      minutes_played: number
    }

    export interface Stats {
      shots: Shots
      goals: Goals2
      fouls: Fouls
      cards: Cards
      passing: Passing
      other: Other
    }

    export interface Datum4 {
      team_id: number
      fixture_id: number
      player_id: number
      player_name: string
      number: number
      position: string
      additional_position?: any
      formation_position: number
      posx?: any
      posy?: any
      stats: Stats
    }

    export interface Lineup {
      data: Datum4[]
    }

    export interface Shots2 {
      shots_total?: number
      shots_on_goal?: number
    }

    export interface Goals3 {
      scored?: number
      conceded?: number
    }

    export interface Fouls2 {
      drawn?: number
      committed?: number
    }

    export interface Cards2 {
      yellowcards?: number
      redcards?: number
    }

    export interface Passing2 {
      total_crosses?: number
      crosses_accuracy?: number
      passes?: number
      passes_accuracy?: number
    }

    export interface Other2 {
      assists?: number
      offsides?: number
      saves?: number
      pen_scored?: number
      pen_missed?: number
      pen_saved?: number
      pen_committed?: number
      pen_won?: number
      hit_woodwork?: number
      tackles?: number
      blocks?: number
      interceptions?: number
      clearances?: number
      minutes_played?: number
    }

    export interface Stats2 {
      shots: Shots2
      goals: Goals3
      fouls: Fouls2
      cards: Cards2
      passing: Passing2
      other: Other2
    }

    export interface Datum5 {
      team_id: number
      fixture_id: number
      player_id: number
      player_name: string
      number: number
      position: string
      additional_position?: any
      formation_position?: any
      posx?: any
      posy?: any
      stats: Stats2
    }

    export interface Bench {
      data: Datum5[]
    }

    export interface Sidelined {
      data: any[]
    }

    export interface Shots3 {
      total: number
      ongoal: number
      offgoal: number
      blocked: number
      insidebox: number
      outsidebox: number
    }

    export interface Passes {
      total: number
      accurate: number
      percentage: number
    }

    export interface Attacks {
      attacks: number
      dangerous_attacks: number
    }

    export interface Datum6 {
      team_id: number
      fixture_id: number
      shots: Shots3
      passes: Passes
      attacks: Attacks
      fouls: number
      corners: number
      offsides: number
      possessiontime: number
      yellowcards: number
      redcards: number
      saves?: number
      substitutions: number
      goal_kick: number
      goal_attempts: number
      free_kick: number
      throw_in: number
      ball_safe: number
    }

    export interface Stats3 {
      data: Datum6[]
    }

    export interface Data3 {
      id: number
      name: string
      surface: string
      address: string
      city: string
      capacity?: any
      image_path?: any
      coordinates?: any
    }

    export interface Venue {
      data: Data3
    }

    export interface Datum {
      id: number
      league_id: number
      season_id: number
      stage_id: number
      round_id: number
      group_id: number
      aggregate_id?: any
      venue_id: number
      referee_id: number
      localteam_id: number
      visitorteam_id: number
      weather_report: WeatherReport
      commentaries: boolean
      attendance: number
      pitch: string
      winning_odds_calculated: boolean
      formations: Formations
      scores: Scores
      time: Time
      coaches: Coaches
      standings: Standings
      deleted: boolean
      localTeam: LocalTeam
      visitorTeam: VisitorTeam
      substitutions: Substitutions
      goals: Goals
      lineup: Lineup
      bench: Bench
      sidelined: Sidelined
      stats: Stats3
      venue: Venue
    }

    export interface StartedAt {
      date: string
      timezone_type: number
      timezone: string
    }

    export interface TrialEndsAt {
      date: string
      timezone_type: number
      timezone: string
    }

    export interface Subscription {
      started_at: StartedAt
      trial_ends_at: TrialEndsAt
      ends_at?: any
    }

    export interface Plan {
      name: string
      price: string
      request_limit: string
    }

    export interface Sport {
      id: number
      name: string
      current: boolean
    }

    export interface Meta {
      subscription: Subscription
      plan: Plan
      sports: Sport[]
    }

    export interface RootObject {
      data: Datum[]
      meta: Meta
    }
  }
}
