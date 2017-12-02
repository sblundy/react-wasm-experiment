import wasm from './main.rs';import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/App.js';

wasm.initialize({noExitRuntime: true}).then(function(module) {
  // Create a Javascript wrapper around our Rust function
  const create_list         = module.cwrap('create_list',         'number', []);
  const add_item            = module.cwrap('add_item',            'number', ['number', 'string']);
  const list_length         = module.cwrap('list_length',         'number', ['number']);
  const get_item_id         = module.cwrap('get_item_id',         'number', ['number', 'number']);
  const get_item_completed  = module.cwrap('get_item_completed',  'number', ['number', 'number']);
  const get_item_msg        = module.cwrap('get_item_msg',        'string', ['number', 'number']);
  const destroy_list        = module.cwrap('destroy_list',        '',       ['number']);

  let list = create_list();

  ReactDOM.render(<App list={new TodoListWrapper(list, add_item, list_length, get_item_id, get_item_completed, get_item_msg)}
                       onDestroy={() => destroy_list(list)}
  />, document.getElementById('container'));
});

class TodoListWrapper {
  constructor(list_ptr, add_item, list_length, get_item_id, get_item_completed, get_item_msg) {
    this.list = list_ptr;
    this.add_item = add_item;
    this.list_length = list_length;
    this.get_item_id = get_item_id;
    this.get_item_completed = get_item_completed;
    this.get_item_msg = get_item_msg;
  }

  addItem(msg) {
    this.add_item(this.list, msg);
  }

  getItem(index) {
    return {
      id: this.get_item_id(this.list, index),
      completed: this.get_item_completed(this.list, index) === 0,
      message: this.get_item_msg(this.list, index)
    };
  }

  getNumItems() {
    return this.list_length(this.list);
  }
}