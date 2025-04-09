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

const { TextModel, WrapperModel } = require('./model.js');
const { TextView, WrapperView } = require('./view.js');

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

module.exports = { Text, Wrapper };