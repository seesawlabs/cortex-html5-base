/* eslint-disable */

const TEST_DATA = [
  {
    "_index": "WS408",
    "details": {
      "CurSpeedKMH": "140.0",
      "Type": "S",       // <---- Filter on this value here. "S" means Singles, and "D" means Doubles. We don't want Doubles matches.
      "LineNumber": "8",
      "ID": "WS408",
      "CurSpeedMPH": "87",
      "Event": "Women's Singles",  // <---- Here is the event name
      "IsMatchPoint": "false",
      "RoundName": "4th Round",
      "MaxSets": "3",
      "IsBreakPoint": "false",
      "Server": "",
      "IsSetPoint": "false",
      "IsTiebreak": "false",
      "Winner": "2",
      "CurrentSet": "2",
      "Status": "C"
    },
    "team1_players": [
      {
        "Nationality": "CZE",
        "Position": "A",
        "ShortName": "P. Kvitova",
        "ID": "WTA314206",
        "LastName": "Kvitova",
        "FirstName": "Petra"
      }
    ],
    "team1_scores": [      // <--- Score array is sorted in order by set (sets start at 1)
      {
        "Minutes": "31",
        "Set": "1",
        "Score": "3",
        "SetWinner": "2",
        "TB": "0"
      },
      {
        "Minutes": "57",
        "Set": "2",
        "Score": "5",
        "SetWinner": "2",
        "TB": "0"
      }
    ],
    "team2_players": [
      {
        "Nationality": "GER",
        "Position": "A",
        "ShortName": "A. Kerber",
        "ID": "WTA311470",
        "LastName": "Kerber",
        "FirstName": "Angelique"
      }
    ],
    "team2_scores": [
      {
        "Minutes": "31",
        "Set": "1",
        "Score": "6",
        "SetWinner": "2",
        "TB": "0"
      },
      {
        "Minutes": "57",
        "Set": "2",
        "Score": "7",
        "SetWinner": "2",
        "TB": "0"
      }
    ]
  },

  // ---- The entry below is a doubles match, so we shouldn't show it
  {
    "_index": "ZD201",
    "details": {
      "CurSpeedKMH": "138.4",
      "Type": "D",
      "LineNumber": "1",
      "ID": "ZD201",
      "CurSpeedMPH": "86",
      "Event": "Men's Champions Doubles",
      "IsMatchPoint": "false",
      "RoundName": "Final",
      "MaxSets": "3",
      "IsBreakPoint": "false",
      "Server": "",
      "IsSetPoint": "false",
      "IsTiebreak": "false",
      "Winner": "1",
      "CurrentSet": "2",
      "Status": "C"
    },
    "team1_players": [
      {
        "Nationality": "AUS",
        "Position": "A",
        "ShortName": "P. Cash",
        "ID": "ATPC023",
        "LastName": "Cash",
        "FirstName": "Pat"
      },
      {
        "Nationality": "AUS",
        "Position": "B",
        "ShortName": "M. Philippoussis",
        "ID": "ATPP338",
        "LastName": "Philippoussis",
        "FirstName": "Mark"
      }
    ],
    "team1_scores": [
      {
        "Minutes": "34",
        "Set": "1",
        "Score": "6",
        "SetWinner": "1",
        "TB": "0"
      },
      {
        "Minutes": "33",
        "Set": "2",
        "Score": "6",
        "SetWinner": "1",
        "TB": "0"
      }
    ],
    "team2_players": [
      {
        "Nationality": "USA",
        "Position": "A",
        "ShortName": "J. McEnroe",
        "ID": "ATPM047",
        "LastName": "McEnroe",
        "FirstName": "John"
      },
      {
        "Nationality": "USA",
        "Position": "B",
        "ShortName": "P. McEnroe",
        "ID": "ATPM048",
        "LastName": "McEnroe",
        "FirstName": "Patrick"
      }
    ],
    "team2_scores": [
      {
        "Minutes": "34",
        "Set": "1",
        "Score": "4",
        "SetWinner": "1",
        "TB": "0"
      },
      {
        "Minutes": "33",
        "Set": "2",
        "Score": "3",
        "SetWinner": "1",
        "TB": "0"
      }
    ]
  }
];

module.exports = TEST_DATA;
