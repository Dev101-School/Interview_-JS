function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function LinkedList() {
  this._length = 0;
  this.head = null;
  this.tail = null;
}

LinkedList.prototype.getNode = function (idx) {
  let curr = this.head;
  while (idx-- > 0) {
    curr = curr.next;
  }
  return curr;
};

LinkedList.prototype.addFrist = function (val) {
  let node = new ListNode(val);
  if (this._length == 0) {
    this.head = node;
    this.tail = node;
  } else {
    node.next = this.head;
    this.head = node;
  }
  this._length = this._length + 1;
};

LinkedList.prototype.addLast = function (val) {
  let node = new ListNode(val);
  if (this._length == 0) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }
  this._length++;
};

LinkedList.prototype.addAt = function (idx, val) {
  try {
    if (idx < 0 || idx > this._length) throw "NULLPointer";
    else {
      if (idx == 0) {
        this.addFrist(val);
      } else if (idx === this._length) {
        this.addLast(val);
      } else {
        let prev = this.getNode(idx - 1);
        let forw = prev.next;
        let node = new ListNode(val);
        prev.next = node;
        node.next = forw;
        this._length++;
      }
    }
  } catch (err) {
    return err;
  }
};

LinkedList.prototype.getFrist = function () {
  try {
    if (this._length == 0) throw "EmptyList";
    return this.head.val;
  } catch (err) {
    return err;
  }
};

LinkedList.prototype.getLast = function () {
  try {
    if (this._length == 0) throw "EmptyList";
    return this.tail.val;
  } catch (err) {
    return err;
  }
};

LinkedList.prototype.getAt = function (idx) {
  try {
    if (idx < 0 || idx >= this._length) throw "NULLPointer";
    else {
      let count = idx;
      let curr = this.head;
      while (count-- > 0) {
        curr = curr.next;
      }
      return curr.val;
    }
  } catch (err) {
    return err;
  }
};

LinkedList.prototype.removeFrist = function () {
  try {
    if (this._length == 0) throw "EmptyList";
    else {
      let rnode = this.head;
      if (this._length == 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
      }
      rnode.next = null;
      this._length--;
      return rnode;
    }
  } catch (err) {
    return err;
  }
};

LinkedList.prototype.removeLast = function () {
  try {
    if (this._length == 0) throw "EmptyList";
    else {
      let rnode = this.tail;
      if (this._length == 1) {
        this.head = null;
        this.tail = null;
      } else {
        let snode = this.getNode(this._length - 2);
        snode.next = null;
        this.tail = snode;
      }
      rnode.next = null;
      this._length--;
      return rnode;
    }
  } catch (err) {
    return err;
  }
};

LinkedList.prototype.removeAt = function (idx) {
  try {
    if (idx < 0 || idx >= this._length) throw "NullPointer";
    else {
      if (idx === 0) return this.removeFrist();
      else if (idx === this._length - 1) return this.removeLast();
      else {
        let prev = this.getNode(idx - 1);
        let rnode = prev.next;
        prev.next = rnode.next;
        rnode.next = null;
        this._length--;
        return rnode;
      }
    }
  } catch (err) {
    return err;
  }
};

LinkedList.prototype.toString=function(){
    let list=[];
    let curr=this.head;
    while(curr!=null){
        list.push(curr.val)
        curr=curr.next;
    }
    return list.join(",");
}

let sll = new LinkedList();
for (let idx = 0; idx < 10; idx++) {
  sll.addLast(idx);
}

console.log(sll.toString());
