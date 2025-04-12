/* guim v1.0.0
 * 
 * Guim is a JS library for creating simple
 * desktop-like GUIs.
 *
 * This software is free and anybody can
 * use it with no restrictions
 * 
 * model.js
 * Contains model classes */

// base model class
class Model {
    constructor() {
        this.events = {};

        this._parent = null;
        this.children = [];
    }

    // parent model data,
    // makes sure the Guim
    // children and parent properties are
    // updated, and sets _parent
    // USE THIS, not _parent
    set parent(parent) {
        // first make sure the parent is different
        if (parent == this._parent) return;

        // if we have an old parent, remove it first
        if (this._parent) this._parent.removeChild(this);

        // set the internal parent
        this._parent = parent;

        // if the new parent is defined, add us as a child
        this._parent.addChild(this);

        // parent was set guys
        this.dispatch('set-parent', this.parent);
    }
    get parent() {
        return this._parent;
    }

    // children model methods
    addChild(child, index = this.children.length) {
        // if child is already a child, remove it first
        if (this.children.includes(child)) this.removeChild(child);

        // if the child has an other parent, remove it from its old parent
        if (child._parent) child._parent.removeChild(child);

        // add to internal children array
        // this might add it to the wrong spot
        // but just do the removing urself if u care
        // why do ppl expect libs to do everything?!?
        this.children.splice(index, 0, child);

        // send the dispatch
        this.dispatch('run-add-child', child, index);
    }
    removeChild(child) {
        // get index of child & make sure child is a child
        let index = this.children.indexOf(child);
        if (index == -1) return;

        // delete it from the children array
        this.children.splice(index, 1);

        // child now has no parent
        child._parent = null;

        // send the dispatch
        this.dispatch('run-remove-child', child);
    }
    setChildAt(index, child) {
        // get the old child at the index and remove it if it exists
        let old = this.children[index];
        if (old) this.removeChild(old);

        // add the new child to the index
        this.addChild(child, index);
    }
    getChildAt(index) {
        return this.children[index];
    }
    indexOfChild(child) {
        return this.children.indexOf(child);
    }
    
    // listen for an event
    listen(event, listener) {
        if (!this.events[event]) this.events[event] = new Set();
        this.events[event].add(listener);
    }

    // stop listenening for an event
    unlisten(event, listener) {
        if (!this.events[event]) return;
        this.events[event].delete(listener);
    }

    // dispatch an event
    dispatch(event, ...data) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => {
            listener(...data);
        })
    }

    // dispatch an event later after
    // current code finishes
    dispatchLater(event, ...data) {
        setTimeout(() => this.dispatch(event, ...data), 0);
    }
}

class TextModel extends Model {
    constructor() {
        super();
    }
    
    // text model data
    set text(text) {
        this._text = text;
        this.dispatch('set-text', this.text);
    }
    get text() {
        return this._text;
    }
}

class WrapperModel extends Model {
    constructor() {
        super();
    }

    // element model data
    set element(element) {
        this._element = element;
        this.dispatch('set-element', this.element);
    }
    get element() {
        return this._element;
    }
}

module.exports = { Model, TextModel, WrapperModel };