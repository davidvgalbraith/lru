'use strict';

var _ = require('underscore');

class NastyListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.parent = null;
        this.child = null;
    }
}

class NastyList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addToEnd(newNode) {
        this.head = this.head || newNode;
       
        if (this.tail) {
            this.tail.child = newNode;
        }
        
        newNode.parent = this.tail;
        this.tail = newNode;
    }

    remove(node) {
        if (node === this.head) {
            this.head = node.child;
        }

        if (node === this.tail) {
            this.tail = node.parent;
        }

        if (node.parent) {
            node.parent.child = node.child;
        }
        
        if (node.child) {
            node.child.parent = node.parent;
        }
    }
}

class LRUCache {
    constructor(size) {
        this.size = size;
        this.list = new NastyList();
        this.nastyNodes = {};
    }

    get(key) {
        if (_.has(this.nastyNodes, key)) {
            var node = this.nastyNodes[key];
            this.list.remove(node);
            this.list.addToEnd(node);
            return node.value;
        } else {
            return null;
        }
    }

    set(key, value) {
        var newNode = new NastyListNode(key, value);
        this.list.addToEnd(newNode);
        this.nastyNodes[key] = newNode;
        if (_.size(this.nastyNodes) > this.size) {
            var lru = this.pop_least_recently_used_element();
            delete this.nastyNodes[lru];
        }
    }

    pop_least_recently_used_element() {
        var head = this.list.head;
        if (head) {
            this.list.remove(head);
            return head.key;
        }
    }
}

module.exports = LRUCache;
