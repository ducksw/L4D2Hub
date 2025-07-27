$(function () {
  var data = {
    teams: [
      ["conmigo basta y sobra", "Sabri Mil Poses"],
      ["ducksbot", "Equipo D"],
      ["Equipo E", "Equipo F"],
      ["Equipo G", "Equipo H"],
      ["Equipo I", "Equipo J"],
      ["Equipo K", "Equipo L"],
      ["Equipo M", "Equipo N"],
      ["Equipo O", "Equipo P"]
    ],
    results: [
      [ [1, 0], [1, 0], [2, 0], [3, 0] ],  // Octavos
      [ [2, 0], [2, 0] ],                  // Cuartos
      [ [2, 1] ],                          // Semifinal
      [ ]                                  // Final (vacío)
    ]
  };

  $('#bracket').bracket({
    init: data,
    skipConsolationRound: true,
    teamWidth: 200,
    matchMargin: 55,
    roundMargin: 60,
    centerConnectors: true
  });
});
