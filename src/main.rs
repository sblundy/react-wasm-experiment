use std::os::raw::c_char;
use std::ffi::{CStr, CString};
use todo::{TodoList};
mod todo;

fn main() {

}



// The C API for using the Counter struct.
#[no_mangle]
pub extern "C" fn create_list() -> *mut TodoList {
    // Allocate a Counter struct on the heap and convert it into a mutable pointer.
    Box::into_raw(Box::new(TodoList::new()))
}

#[no_mangle]
pub unsafe extern "C" fn add_item(ptr: *mut TodoList, c_msg: *mut c_char) -> u32 {
    let list = &mut *ptr;
    let msg = CStr::from_ptr(c_msg).to_string_lossy().into_owned();
    return list.add_item(msg);
}

#[no_mangle]
pub unsafe extern "C" fn list_length(ptr: *mut TodoList) -> i32 {
    let list = &mut *ptr;
    return list.num_items() as i32;
}

#[no_mangle]
pub unsafe extern "C" fn get_item_id(ptr: *mut TodoList, index: i32) -> i32 {
    let list = &mut *ptr;
    match list.get_item(index as usize) {
        Some(item) => item.id as i32,
        None => -1 as i32
    }
}

#[no_mangle]
pub unsafe extern "C" fn get_item_completed(ptr: *mut TodoList, index: i32) -> i32 {
    let pist = &mut *ptr;
    match pist.get_item(index as usize) {
        Some(item) => if item.complete { 0 } else { 1 },
        None => -1 as i32
    }
}

#[no_mangle]
pub unsafe extern "C" fn get_item_msg(ptr: *mut TodoList, index: i32) -> *mut c_char {
    let list = &mut *ptr;
    let cstring = match list.get_item(index as usize) {
        Some(item) => CString::new(item.message.as_str()),
        None => CString::new("")
    };

    cstring.unwrap().into_raw()
}

#[no_mangle]
pub unsafe extern "C" fn destroy_list(list: *mut TodoList) {
    // Convert the mutable pointer back to a box and let it fall out of scope.
    Box::from_raw(list);
}

#[cfg(test)]
mod tests {
    use super::{create_list, list_length, add_item, get_item_msg};
    use std::ffi::{CStr, CString};

    #[test]
    fn round_trip() {
        let ptr = create_list();
        let output = unsafe { list_length(ptr) };

        assert_eq!(0, output);
    }

    #[test]
    fn add_test() {
        let ptr = create_list();
        unsafe { add_item(ptr, CString::new("Test").unwrap().into_raw()); }
        let output = unsafe { list_length(ptr) };

        assert_eq!(1, output);
    }

    #[test]
    fn add_test_message() {
        let ptr = create_list();
        unsafe { add_item(ptr, CString::new("Test").unwrap().into_raw()); }
        let output = unsafe {
            let msg = get_item_msg(ptr, 0);
            CStr::from_ptr(msg).to_string_lossy().into_owned()
        };

        assert_eq!("Test", output);
    }
}