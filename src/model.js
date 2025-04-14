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
        this._id = null;
        this._classes = new Set();
        this._children = [];
    }

    // parent model data,
    // makes sure the Guim
    // children and parent 
    // properties are updated
    set parent(parent) {
        // first make sure the parent is different
        if (parent == this._parent) return;

        // if we have an old parent, remove it first
        if (this._parent) this._parent.removeChild(this);

        // set the internal parent
        this._parent = parent;

        // if the new parent is defined, add us as a child
        if (this._parent) this._parent.addChild(this);

        // parent was set guys
        this.dispatch('set-parent', this.parent);
    }
    get parent() {
        return this._parent;
    }

    // children model data
    set children(children) {
        // remove old children
        this._children.forEach(c => {
            this.removeChild(c);
        })
        this._children = [];

        // add new children
        children.forEach(c => {
            this.addChild(c);
        })
    }
    get children() {
        // return a copy
        return this._children.slice();
    }

    // children model methods
    addChild(child, index = this.children.length) {
        // if child is already a child, remove it first
        if (this._children.includes(child)) this.removeChild(child);

        // if the child has an other parent, remove it from its old parent
        if (child._parent) child._parent.removeChild(child);

        // add to internal children array
        // this might add it to the wrong spot
        // but just do the removing urself if u care
        // why do ppl expect libs to do everything?!?
        this._children.splice(index, 0, child);

        // send the dispatch
        this.dispatch('run-add-child', child, index);
    }
    removeChild(child) {
        // get index of child & make sure child is a child
        let index = this._children.indexOf(child);
        if (index == -1) return;

        // delete it from the children array
        this._children.splice(index, 1);

        // child now has no parent
        child._parent = null;

        // send the dispatch
        this.dispatch('run-remove-child', child);
    }
    setChildAt(index, child) {
        // get the old child at the index and remove it if it exists
        let old = this._children[index];
        if (old) this.removeChild(old);

        // add the new child to the index
        this.addChild(child, index);
    }
    getChildAt(index) {
        return this._children[index];
    }
    indexOfChild(child) {
        return this._children.indexOf(child);
    }

    // id model data
    set id(id) {
        this._id = id;
        this.dispatch('set-id', this.id);
    }
    get id() {
        return this._id;
    }

    // classes model data  
    set classes(classes) {
        // remove old classes
        this._classes.forEach(c => {
            this.removeClass(c);
        })
        this._classes = [];

        // add new classes
        classes.forEach(c => {
            this.addClass(c);
        })
    }
    get classes() {
        // return a copy
        return new Set(this._classes);
    }

    // classes model methods
    addClass(cls) {
        this._classes.add(cls);
        this.dispatch('run-add-class', cls);
    }
    removeClass(cls) {
        this._classes.delete(cls);
        this.dispatch('run-remove-class', cls);
    }
    hasClass(cls) {
        return this._classes.has(cls);
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

// basic container
class ContainerModel extends Model {
    constructor() {
        super();
    }
}


// allows appending Guim componenets to DOM elements
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

// simple text
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

// image
class ImageModel extends Model {
    constructor() {
        super();
    }

    // src model data
    set src(src) {
        this._src = src;
        this.dispatch('set-src', this.src);
    }
    get src() {
        return this._src;
    }

    // alt model data
    set alt(alt) {
        this._alt = alt;
        this.dispatch('set-alt', this.alt);
    }
    get alt() {
        return this._alt;
    }
}

// generic button
class ButtonModel extends Model {
    constructor() {
        super();
    }

    click() {
        this.dispatch('click');
    }
}

// text button
class TextButtonModel extends ButtonModel {
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

// image button
class ImageButtonModel extends ButtonModel {
    constructor() {
        super();
    }

    // src model data
    set src(src) {
        this._src = src;
        this.dispatch('set-src', this.src);
    }
    get src() {
        return this._src;
    }

    // alt model data
    set alt(alt) {
        this._alt = alt;
        this.dispatch('set-alt', this.alt);
    }
    get alt() {
        return this._alt;
    }
}

// text input
class TextInputModel extends Model {
    constructor() {
        super();
    }

    // value model data
    set value(value) {
        this._value = value;
        this.dispatch('set-value', this.value);
    }
    get value() {
        return this._value;
    }
}
module.exports = { 
    Model, ContainerModel, TextModel, ImageModel, WrapperModel, ButtonModel, TextButtonModel, ImageButtonModel,
    TextInputModel
};