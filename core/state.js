import {EVENTS, GAME_STATUSES, MOVING_DIRECTIONS} from "./constants.js";

const _state = {
    game_status: GAME_STATUSES.SETTINGS,
    settings: {
        /**
         * in milliseconds
         */
        googleJumpInterval: 40000,
        grid: {
            rowsCount: 5,
            columnCount: 5
        },
        pointsToWin: 5,
        pointsToLoose: 4,
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

const _notifyObservers = (name, payload = {}) => {
    const event = {
        name,
        payload
    }

    _observers.forEach(o => {
        try {
            o(event);
        } catch (error) {
            console.log(error);
        }
    })
}

//
const _getPlayerIndex = (playerNumber) => {
    const playerIndex = playerNumber - 1;

    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
        throw new Error('Incorrect player number');
    }

    return playerIndex;
}


const _generateNewPosition = () => {
    const x = Math.ceil((Math.random() * _state.settings.grid.rowsCount)) - 1;
    const y = Math.ceil((Math.random() * _state.settings.grid.columnCount)) - 1;

    return {x, y};
}

const _jumpCheese = () => {
    let newPosition = {};

    do {
        newPosition = _generateNewPosition();
    } while (
        _checkPositionMatchesWithPlayer1Position(newPosition)
        || _checkPositionMatchesWithPlayer2Position(newPosition)
        || _checkPositionMatchesWithCheesePosition(newPosition)
        )

    _state.positions.cheesePosition = newPosition;
}

let cheeseJumpInterval;

const _checkValidPosition = (position) => {
    return (position.x >= 0 && position.x < _state.settings.grid.columnCount) && (position.y >= 0 && position.y < _state.settings.grid.rowsCount);
}

const _checkPositionMatchesWithPlayer1Position = (position) => {
    return position.x === _state.positions.playersPosition[0].x && position.y === _state.positions.playersPosition[0].y;
}

const _checkPositionMatchesWithPlayer2Position = (position) => {
    return position.x === _state.positions.playersPosition[1].x && position.y === _state.positions.playersPosition[1].y;
}

const _checkPositionMatchesWithCheesePosition = (position) => {
    return position.x === _state.positions.cheesePosition.x && position.y === _state.positions.cheesePosition.y;
}

const _catchCheese = (playerNumber) => {
    const playerIndex = _getPlayerIndex(playerNumber);

    _state.points.players[playerIndex]++;
    _notifyObservers(EVENTS.SCORES_CHANGED);
    _notifyObservers(EVENTS.CHEESE_CAUGHT);

    if (_state.points.players[playerIndex] === _state.settings.pointsToWin) {
        _state.game_status = GAME_STATUSES.WIN;
        _notifyObservers(EVENTS.STATUS_CHANGED);
        clearInterval(cheeseJumpInterval);
    } else {
        const prevPosition = _state.positions.cheesePosition;
        _jumpCheese();
        _notifyObservers(EVENTS.CHEESE_JUMPED, {
            prevPosition,
            position: _state.positions.cheesePosition
        })
    }
}


//INTERFACE

//GETTERS

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

//COMMANDS

export const setSettings = async (title, value) => {
    switch (title) {
        case 'Grid options':
            const newSize = {..._state.settings.grid};
            const options = value.match(/\d+/g);
            newSize.rowsCount = options[0];
            newSize.columnCount = options[1];
            console.log(newSize);
            _state.settings.grid = {...newSize};
            break;
        case 'Points to win':
            _state.settings.pointsToWin = value;
            break;
        case 'Points to loose':
            _state.settings.pointsToLoose = value;
            break;
        default: return;
    }
}

export const start = async () => {
    if (_state.game_status !== GAME_STATUSES.SETTINGS) throw new Error('Incorrect transition');

    _state.points.cheese = 0;
    _state.points.players = [0, 0];

    _state.positions.playersPosition[0] = {x: 0, y: 0};
    _state.positions.playersPosition[1] = {
        x: _state.settings.grid.rowsCount - 1,
        y: _state.settings.grid.columnCount - 1
    };
    _jumpCheese();

    cheeseJumpInterval = setInterval(() => {

        const prevPosition = {..._state.positions.cheesePosition};

        _jumpCheese();
        _notifyObservers(EVENTS.CHEESE_JUMPED, {
            prevPosition,
            position: {..._state.positions.cheesePosition},
        });

        _state.points.cheese++;
        _notifyObservers(EVENTS.SCORES_CHANGED);

        if (_state.points.cheese === _state.settings.pointsToLoose) {
            clearInterval(cheeseJumpInterval);
            _state.game_status = GAME_STATUSES.LOOSE;
            _notifyObservers(EVENTS.STATUS_CHANGED);
        }

    }, _state.settings.googleJumpInterval);

    _state.game_status = GAME_STATUSES.IN_PROGRESS;
    _notifyObservers(EVENTS.GAME_STARTED);
    _notifyObservers(EVENTS.STATUS_CHANGED);
}

export const playAgain = async () => {
    _state.game_status = GAME_STATUSES.SETTINGS;
    _notifyObservers(EVENTS.STATUS_CHANGED);
}

export const movePlayer = async (playerNumber, direction) => {
    if (_state.game_status !== GAME_STATUSES.IN_PROGRESS) return;

    const playerIndex = _getPlayerIndex(playerNumber);
    const prevPosition = {..._state.positions.playersPosition[playerIndex]};
    const newPosition = {..._state.positions.playersPosition[playerIndex]};

    switch (direction) {

        case MOVING_DIRECTIONS.UP:
            newPosition.x--
            break
        case MOVING_DIRECTIONS.DOWN:
            newPosition.x++
            break
        case MOVING_DIRECTIONS.RIGHT:
            newPosition.y++
            break
        case MOVING_DIRECTIONS.LEFT:
            newPosition.y--
            break
    }

    const validPosition = _checkValidPosition(newPosition);
    if (!validPosition) return;

    const isPlayer1MatchesPlayer2 = _checkPositionMatchesWithPlayer2Position(newPosition);
    if (isPlayer1MatchesPlayer2) return;

    const isPlayer2MatchesPlayer1 = _checkPositionMatchesWithPlayer1Position(newPosition);
    if (isPlayer2MatchesPlayer1) return;

    const cheeseCaught = _checkPositionMatchesWithCheesePosition(newPosition);
    if (cheeseCaught) {
        _catchCheese(playerNumber);
    }

    _state.positions.playersPosition[playerIndex] = newPosition;
    _notifyObservers(EVENTS[`PLAYER${playerNumber}_MOVED`], {
        prevPosition: prevPosition,
        position: newPosition
    });

    console.log(`player ${playerNumber} moved! newPosition is X:${newPosition.x}, Y:${newPosition.y}`)
}


