import {GAME_STATUSES} from "./constants.js";

const _state = {
    game_status: GAME_STATUSES.SETTINGS,
    settings: {
        /**
         * in milliseconds
         */
        googleJumpInterval: 1000,
        grid: {
            rowsCount: 5,
            columnCount: 5
        },
        pointsToWin: 5,
        pointsToLoose: 4
    },
    positions: {
        cheesePosition: {x: 1, y: 1},
        playersPosition: [{x: 2, y: 2}, {x: 3, y: 3}]
    },
    points: {
        cheese: 0,
        players: [0, 0]
    }
}

//OBSERVER
let _observers = [];

export const subscribe = (observer) => {
    _observers.push(observer);
}

export const unsubscribe = (observer) => {
    _observers = _observers.filter(o => o !== observer);
}

const _notifyObservers = () => {
    _observers.forEach(o => {
        try {
            o();
        } catch (error) {
            console.log(error);
        }
    })
}

const _generateNewPosition = () => {
    const x = Math.ceil((Math.random() * _state.settings.grid.rowsCount - 1));
    const y = Math.ceil((Math.random() * _state.settings.grid.columnCount - 1));

    return {x, y};
}

const _jumpCheese = () => {
    let newPosition = {};

    do {
        newPosition = _generateNewPosition();

        var isMatchPrevCheesePosition = newPosition.x === _state.positions.cheesePosition.x && newPosition.y === _state.positions.cheesePosition.y;
        var isMatchPrevPlayer1Position = newPosition.x === _state.positions.playersPosition[0].x && newPosition.y === _state.positions.playersPosition[0].y;
        var isMatchPrevPlayer2Position = newPosition.x === _state.positions.playersPosition[1].x && newPosition.y === _state.positions.playersPosition[1].y;
    } while (isMatchPrevCheesePosition || isMatchPrevPlayer1Position || isMatchPrevPlayer2Position)

    _state.positions.cheesePosition = newPosition;
}

let cheeseJumpInterval;

const _getPlayerIndex = (playerNumber) => {
    const playerIndex = playerNumber - 1;

    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
        throw new Error('Incorrect player number');
    }

    return playerIndex;
}

//INTERFACE

export const getGameStatus = async () => _state.game_status;

export const getCheesePoints = async () => _state.points.cheese;

/**
 *
 * @param playerNumber one-based index of player
 * @returns {Promise<number>} number of points
 */

export const getPlayerPoints = async (playerNumber) => {
    const playerIndex = _getPlayerIndex(playerNumber);

    return _state.points.players[playerIndex]
};

export const getGridSettings = async () => {
    return {..._state.settings.grid}
}

export const getCheesePosition = async () => {
    return {..._state.positions.cheesePosition}
}

export const getPlayerPosition = async (playerNumber) => {
    const playerIndex = _getPlayerIndex(playerNumber);

    return {..._state.positions.playersPosition[playerIndex]}
}

export const start = async () => {
    if(_state.game_status !== GAME_STATUSES.SETTINGS) throw new Error('Incorrect transition');

    _state.points.cheese = 0;
    _state.points.players = [0,0];

    _state.positions.playersPosition[0] = {x: 0, y: 0};
    _state.positions.playersPosition[1] = {
        x: _state.settings.grid.rowsCount - 1,
        y: _state.settings.grid.columnCount - 1
    };
    _jumpCheese();

    cheeseJumpInterval = setInterval(() => {
        _jumpCheese();
        _state.points.cheese++;

        if (_state.points.cheese === _state.settings.pointsToLoose) {
            clearInterval(cheeseJumpInterval);
            _state.game_status = GAME_STATUSES.LOOSE;
        }

        _notifyObservers();
    }, _state.settings.googleJumpInterval);

    _state.game_status = GAME_STATUSES.IN_PROGRESS;
    _notifyObservers();
}

export const playAgain = async () => {
    _state.game_status = GAME_STATUSES.SETTINGS;
    _notifyObservers();
}


