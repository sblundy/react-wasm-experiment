import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const Row = ({id, completed, message, onRemove}) => <tr>
  <td><Button onClick={() => onRemove(id)}><Glyphicon glyph="trash"/></Button></td>
  <td><Checkbox checked={completed} readOnly/></td>
  <td>{message}</td>
</tr>;

export default class TodoList extends React.Component {
  render() {
    const {items, onRemove} = this.props;
    let rows = items.map(({id, completed, message}) => <Row key={id} id={id} completed={completed} message={message} onRemove={onRemove}/>);
    return <Table condensed>
      <thead>
      <tr>
        <th>Completed</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>;
  }
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
  })).isRequired,
  onRemove: PropTypes.func.isRequired
};