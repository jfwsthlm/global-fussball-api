const savedGames = require('./matcher.json');

handleGetSeason = (req, res, db)  => {
    const { name, year } = req.params;
    var games = [];
    db.select('*').from('Games')/*.where({id})*/
    /*.then(
        res.json(savedGames)
    )*/
    .then(fetchedGames => {
        fetchedGames.forEach(game => {
            games.push({
                    id: game.Id, 
                    time: game.Time,
                    round: game.Round,
                    homeTeam: game.HomeTeam,
                    awayTeam: game.AwayTeam,
                    homeGoals: game.HomeGoals,
                    awayGoals: game.AwayGoals,
                    isPlayed: game.IsPlayed,
                    index: game.SeasonIndex
                })
        })
        res.contentType('application/json');
        res.send(JSON.stringify({games: games}));
    })
}


handleBootstrap = (req, res, db)  => {
    /*db.select('*').from('Games')
    .then(game => {
        console.log("Game: " + game.HomeTeam + " vs. " + game.AwayTeam);
        console.log("Games: " + game[0].AwayTeam);
    })*/
    games.games.forEach((game, index) => {
        console.log(game.homeTeam + " vs. " + game.awayTeam);
        db.transaction(trx => {
            trx.insert({
                Id : game.id,
                Time : game.time,
                Round : game.round,
                HomeTeam : game.homeTeam,
                AwayTeam : game.awayTeam,
                HomeGoals : game.homeGoals,
                AwayGoals : game.awayGoals,
                IsPlayed : game.isPlayed,
                SeasonIndex : game.index
            })
            .into('Games')
            .then(trx.commit)
            })
        })
    res.json('OK');
}

handleUpdate = (req, res, db)  => {
    const { homeTeam, awayTeam, homeGoals, awayGoals, isPlayed } = req.body;
    if (isPlayed) {
        db('Games')
            .where('HomeTeam', '=', homeTeam)
            .where('AwayTeam', '=', awayTeam)
            .update('IsPlayed', isPlayed)
            .catch((err) => console.log(err));
    }
    var returnValue = db('Games')
        .where('HomeTeam', '=', homeTeam)
        .where('AwayTeam', '=', awayTeam)
        .update('HomeGoals', homeGoals)
        .update('AwayGoals', awayGoals)
        .catch((err) => console.log(err));
        res.json('OK' + returnValue);
}

module.exports = {
    handleGetSeason : handleGetSeason,
    handleBootstrap : handleBootstrap,
    handleUpdate : handleUpdate
}