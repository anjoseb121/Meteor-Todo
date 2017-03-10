import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

// App component - represents the whole app
class App extends Component {

	handleSubmit(event) {
		event.preventDefault();

		// Find the text field via react ref
		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		Tasks.insert({
			text,
			createdAt: new Date(), // current time
		});

		// Clear form
		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

	renderTasks() {
		// Return objects from props
		return this.props.tasks.map((task) => (
			<Task key={task._id} task={task} />
		));
	}
	// Render method to client
	render() {
		return (
			<div className="container">
				<header>
					<h1>Todo List</h1>
					<form onSubmit={this.handleSubmit.bind(this)} className="new-task">
						<input type="text" ref="textInput" placeholder="Type to add new tasks"/>
					</form>
				</header>

				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
}

App.propTypes = {
	// Props said is an array
	tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
	return {
		tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
	};
}, App);