import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';

class AppImpl extends React.Component {

  render() {
    const {items, onNewTodo, onRemoveTodo} = this.props;

    const handleAdd = () => {
      onNewTodo(this.newTodoMessage.value);
    };

    return (
      <div className="container">
        <h1 className="row">To-Dos</h1>
        <div className="row">
          <div className="col-md-6">
            <TodoList items={items} onRemove={onRemoveTodo}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <input type="text" className="form-control" aria-label="Description for new ToDo" ref={e => {this.newTodoMessage = e;}}/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={handleAdd}><i className="fa fa-plus" aria-hidden="true"/></button>
              </span>
            </div>
          </div>
        </div>
      </div>);
  }
}

AppImpl.propTypes = {
  items: PropTypes.array.isRequired,
  onNewTodo: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {items: App.createItemsList(props.list)};
  }

  componentWillUnmount() {
    this.props.onDestroy();
  }

  render() {
    const {list} = this.props;
    const handleNewTodo = (msg) => {
      list.addItem(msg);
      this.setState({items:App.createItemsList(list)})
    };
    const handleRemoveTodo = (id) => {
      list.removeItem(id);
      this.setState({items:App.createItemsList(list)})
    };
    return <AppImpl onNewTodo={handleNewTodo} items={this.state.items} onRemoveTodo={handleRemoveTodo}/>;
  }

  static createItemsList(list) {
    let items = [];
    for (let i = 0; i < list.getNumItems(); i++) {
      items.push(list.getItem(i));
    }
    return items;
  }
}

App.propTypes = {
  list: PropTypes.object.isRequired,
  onDestroy: PropTypes.func.isRequired
};