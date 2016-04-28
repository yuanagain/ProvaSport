


var default_player = {
    "name" : {
      "first": "Loading",
      "last": "Loading",
      "full": "Loading",
  },
  "userid" : -1,
  "prof_pic": "Loading",
  "elo": 0.0,
  "earnings": [ {"sport" :
  {
      "cash": 0,
      "xp": 0,
      "trophies": [-1]
  }} ],
  "home": "LOADING",
  "sports": "LOADING",
  "imageURL": "Loading",
  "friends": [],
  "teams": [],
  "matches": [],
  "tournaments": []
};

var default_match = {
    "datetime": 0,
    "sport": "LOADING",
    "scores": [["0","1"],["0","1"],["0","1"],["0","1"]],
    "tournamentid": -1,
    "winner": 1,
    "data": {},
    "teams": [0,0],
    "payoutdata": {
      "xp": -1,
      "cash": -1
  },
  "status": {
      '0': 0,
      '1': 1
  },
  "name": "matchesHaveNames?",
  "location": "LOADING"
};

const defaults = {
    default_player: {
        "name" : {
          "first": "Loading",
          "last": "Loading",
          "full": "Loading",
        },
        "userid" : -1,
        "prof_pic": "Loading",
        "elo": 0.0,
        "earnings": [ {"sport" :
        {
          "cash": 0,
          "xp": 0,
          "trophies": [-1]
        }} ],
        "home": "LOADING",
        "sports": "LOADING",
        "imageURL": "Loading",
        "friends": [],
        "teams": [],
        "matches": [],
        "tournaments": []
    },

    default_match: {
            "datetime": 0,
            "sport": "LOADING",
            "scores": [["0","1"],["0","1"],["0","1"],["0","1"]],
            "tournamentid": -1,
            "winner": 1,
            "data": {},
            "teams": [0,0],
            "payoutdata": {
              "xp": -1,
              "cash": -1
            },
            "status": {
              '0': 0,
              '1': 1
            },
            "name": "matchesHaveNames?",
            "location": "LOADING"
    },

    default_team: {
        "name": "Fale Yales",
        "players": [default_player],
        "matches": [default_match],
        "thumbnail": "http://cdn.xl.thumbs.canstockphoto.com/canstock16117908.jpg"
    },
}

export default defaults;