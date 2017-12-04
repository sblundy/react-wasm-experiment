import React from 'react';
import PropTypes from 'prop-types';

const Row = ({id, completed, message, onRemove}) => <tr>
  <td><a href="javascript:void(0)" onClick={() => onRemove(id)}><i className="fa fa-trash" aria-hidden="true"/></a></td>
  <td><input type="checkbox" value="" checked={completed} readOnly/></td>
  <td>{message}</td>
</tr>;

export default class TodoList extends React.Component {
  render() {
    const {items, onRemove} = this.props;
    let rows = items.map(({id, completed, message}) => <Row key={id} id={id} completed={completed} message={message} onRemove={onRemove}/>);
    return <table className="table table-sm">
      <thead>
      <tr>
        <th><i className="fa fa-trash invisible" aria-hidden="true"/></th>
        <th>Completed</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>;
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