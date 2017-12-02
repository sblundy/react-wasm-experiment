


pub struct TodoList {
    next_id: u32,
    items: Vec<Todo>,
}

impl TodoList {
    pub fn new() -> TodoList {
        TodoList { next_id: 0, items: Vec::new() }
    }

    pub fn num_items(&self) -> usize {
        return self.items.len();
    }

    pub fn add_item(&mut self, msg: String) -> u32 {
        let id = self.next_id;
        self.next_id = id + 1;
        let item = Todo {
            id,
            complete: false,
            message: msg
        };

        self.items.push(item);

        return id;
    }

    pub fn get_item(&self, idx: usize) -> Option<&Todo> {
        self.items.get(idx)
    }

    pub fn get_item_by_id(&self, id: u32) -> Option<&Todo> {
        for idx in 0..self.items.len() {
            let item_option = self.items.get(idx);
            if let Some(item) = item_option {
                if item.id == id {
                    return item_option;
                }
            }
        }
        None
    }

    pub fn complete(&mut self, id: u32) {
        for item in self.items.iter_mut() {
            if item.id == id {
                item.complete = true;
            }
        }
    }
}

pub struct Todo {
    pub id: u32,
    pub complete: bool,
    pub message: String
}