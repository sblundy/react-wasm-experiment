import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import Checkbox from 'react-bootstrap/lib/Checkbox';

const Row = ({completed, message}) => <tr>
  <td><Checkbox checked={completed} readOnly/></td>
  <td>{message}</td>
</tr>;

export default class TodoList extends React.Component {
  render() {
    const {items} = this.props;
    let rows = items.map(({id, completed, message}) => <Row key={id} id={id} completed={completed} message={message}/>);
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
  })).isRequired
};