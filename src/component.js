/* guim v1.0.0
 * 
 * Guim is a JS library for creating simple
 * desktop-like GUIs.
 *
 * This software is free and anybody can
 * use it with no restrictions
 * 
 * component.js
 * Contains component classes
 */

const { ContainerModel, TextModel, WrapperModel } = require('./model.js');
const { ContainerView, TextView, WrapperView } = require('./view.js');

// container
class Container extends ContainerModel {
    constructor(parent) {
        super();

        this.view = new ContainerView(this);

        this.parent = parent;
    }
}

// wrapper componenet
// allows adding Guim components to DOM elements
class Wrapper extends WrapperModel {
    constructor(element) {
        super();

        this.view = new WrapperView(this);

        this.element = element;
    }
}

// text componenet
class Text extends TextModel {
    constructor(text, parent) {
        super();

        this.view = new TextView(this);

        this.text = text;
        this.parent = parent;
    }
}

module.exports = { Container, Wrapper, Text };