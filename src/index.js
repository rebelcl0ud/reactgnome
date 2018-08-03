import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* 
Square, Board, Game = react component class/type
component takes params, aka PROPS(properties)
returns hierarchy of views, displayed via RENDER method
render returns a 'description' of what you want to see (screen)

ex: <Square /> and the like refers to full component class/type, 
can be used independent

passing props; parents to children
*/

// Square^ renders 1 button

/*
setting state, a way to "remember" things
they are set in constructors; initializes state
considered private to React component defined in

Note: JS classes super() needs to be called when defining constructor of subclass
ALL react component classes that have constructor should start w/ super(props)
*/

/** 
constructor deleted, Square not keeping track of game's state

onClick prop fn Square can call when clicked
**/

/***
functional components: components that don't have their own state
and contain only render method

class Square, updated to be a functional component
()=> removed, needed in class to access correct 'this' value
***/
function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

// Board(below) renders 9 squares
/** 
best approach; parent Board will store game's state instead of Square
minimizes bugs, easier to refactor
**/
class Board extends React.Component {
	/**
	collecting data from multiple children or comm btwn children,
	shared state must be declared in parent component

	parent component can pass state back to children using props,
	keeping children synced with eachother and parent

	initial state below corresponds with 9 squares above
	**/
	constructor(props) {
		super(props);
		this.state = {
			value: Array(9).fill(null),
		};
	}

	handleClick(i) {
		const squares = this.state.squares.slice();
		squares[i] = 'X';
		this.setState({squares: squares});
	}

	/*
	passes data from Board to Square
	passing prop 'value' to Square
	*/
	
	/**
	`return <Square value={i} />;` to `return <Square value={this.state.squares[i]} />`
	Square no longer determined by own state,
	Board instructs each square of current val ('x', 'o', null) 

	renderSquare() method reads from constructor above where squares array defined
	
	adding onClick
	**/
	renderSquare(i) {
		return (
			<Square 
				value={this.state.squares[i]} 
				onClick={() => this.handleClick(i)} 
			/>
		);		
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
