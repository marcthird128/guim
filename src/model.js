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

        this.children = [];
    }

    // Semi-internal parent,
    // removes from old Guim parent
    // NOT for use externally, use parent
    set _parent(_parent) {
        // remove from old parent if necessary
        if (this._parent && this.parent != _parent && this._parent.indexOfChild(this) != -1) this._parent.removeChild(this);

        // set internal parent
        this.__parent = _parent;

        // get the DOM to update
        this.dispatch('set-parent', this._parent);
    }
    get _parent() {
        return this.__parent;
    }

    // parent model data,
    // makes sure the Guim
    // children and parent properties are
    // updated, and sets _parent
    // USE THIS, not _parent or __parent
    set parent(parent) {
        // set semi-internal parent
        this._parent = parent;

        // add to new parent if neccessary,
        // addChild will automatically send
        // the events to update the DOM
        if (this._parent && this._parent.indexOfChild(this) == -1) this._parent.addChild(this);
    }
    get parent() {
        return this._parent;
    }

    // children model data
    addChild(child, index = this.children.length) {
        // set the childs internal parent FIRST,
        // otherwise it will remove it from our children array.
        // dont use parent because it will add the child
        // to the end of our children.
        // this will make sure it removes it
        // from its old parent if it exists
        child._parent = this;

        // add to internal children array
        this.children.splice(index, 0, child);

        // get the DOM to update
        this.dispatch('run-add-child', child, index);
    }
    removeChild(child) {
        // get the index of the child, return if this isnt a child
        let index = this.children.indexOf(child);
        if (index == -1) return;

        // add it to the children array
        this.children.splice(index, 1);

        // set the child's internal parent to undefined
        // this will remove it from its old parent
        // if it has one
        child._parent = undefined;

        // make sure the DOM knows
        this.dispatch('run-remove-child', child);
    }
    setChildAt(index, child) {
        // get the old child at the index and remove it if needed
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

    // stopl listenening for an event
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