import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import TodoList from './TodoList';

class AppImpl extends React.Component {

  render() {
    const {items, onNewTodo} = this.props;

    const handleAdd = () => {
      onNewTodo(this.newTodoMessage.value);
    };

    return (
      <div style={{textAlign: 'center'}}>
        <h1>To-Dos</h1>
        <Grid><Row><Col md={6}>
        <TodoList items={items}/>
        </Col></Row>
          <Row><Col md={6}><InputGroup>
            <FormControl type="text" inputRef={e => {this.newTodoMessage = e;}}/>
            <InputGroup.Button><Button onClick={handleAdd}><Glyphicon glyph="plus" /></Button></InputGroup.Button>
          </InputGroup></Col></Row>
        </Grid>
      </div>);
  }
}

AppImpl.propTypes = {
  items: PropTypes.array.isRequired,
  onNewTodo: PropTypes.func.isRequired
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
    return <AppImpl onNewTodo={handleNewTodo} items={this.state.items}/>;
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