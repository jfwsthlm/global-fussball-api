const savedGames = require('./matcher.json');

handleGetSeason = (req, res, db)  => {
    const { name, year } = req.params;
    var games = [];
    db.select('*').from('games')/*.where({id})*/
    /*.then(
        res.json(savedGames)
    )*/
    .then(fetchedGames => {
        fetchedGames.forEach(game => {
            games.push({
                    id: game.id, 
                    time: game.time,
                    round: game.round,
                    homeTeam: game.hometeam,
                    awayTeam: game.awayteam,
                    homeGoals: game.homegoals,
                    awayGoals: game.awaygoals,
                    isPlayed: game.isplayed,
                    index: game.seasonindex
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
    savedGames.games.forEach((game, index) => {
        console.log(game.homeTeam + " vs. " + game.awayTeam);
        db.transaction(trx => {
            trx.insert({
                id : game.id,
                time : game.time,
                round : game.round,
                hometeam : game.homeTeam,
                awayteam : game.awayTeam,
                homegoals : game.homeGoals,
                awaygoals : game.awayGoals,
                isplayed : game.isPlayed,
                seasonindex : game.index
            })
            .into('games')
            .then(trx.commit)
            })
        })
    res.json('OK');
}

handleUpdate = (req, res, db)  => {
    const { homeTeam, awayTeam, homeGoals, awayGoals, isPlayed } = req.body;
    if (isPlayed) {
        db('games')
            .where('hometeam', '=', homeTeam)
            .where('awayteam', '=', awayTeam)
            .update('isplayed', isPlayed)
            .catch((err) => console.log(err));
    }
    var returnValue = db('games')
        .where('hometeam', '=', homeTeam)
        .where('awayteam', '=', awayTeam)
        .update('homegoals', homeGoals)
        .update('awaygoals', awayGoals)
        .catch((err) => console.log(err));
        res.json('OK' + returnValue);
}

module.exports = {
    handleGetSeason : handleGetSeason,
    handleBootstrap : handleBootstrap,
    handleUpdate : handleUpdate
}