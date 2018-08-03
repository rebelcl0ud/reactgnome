import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/** 
Square, Board, Game = react component class/type
component takes params, aka PROPS(properties)
returns hierarchy of views, displayed via RENDER method
render returns a 'description' of what you want to see (screen)

ex: <Square /> and the like refers to full component class/type, 
can be used independent

passing props; parents to children
**/

// Square^ renders 1 button
class Square extends React.Component {
	// setting state, a way to "remember" things
	// they are set in constructors; initializes state
	// considered private to React component defined in

	// JS classes super() needs to be called when defining constructor of subclass
	// ALL react component classes that have constructor should start w/ super(props)
	constructor(props) {
		super(props);
		this.state = {
			value: null,
		};
	}

	render() {
		// 
		return (
			<button 
				className="square"
				// passing function as onClick prop
				// fires after click, else would fire on re-render 

				// each time clicked Square re-rendered
				// on update 'X' will display and this.state.value will be 'X'
				// calling 'setState' in component will auto update child components inside
				onClick={() => this.setState({value: 'X'})}>
				{this.state.value}
			</button>
		);
	}
}

// Board(below) renders 9 squares
class Board extends React.Component {
	renderSquare(i) {
		// passes data from Board to Square
		// passing prop 'value' to Square
		return <Square value={i} />;
	}

	render() {
		const status = "Next player: X";

		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

// Game component renders board renders board
class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ================================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);
