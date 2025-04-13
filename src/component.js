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

const { ContainerModel, TextModel, ImageModel, WrapperModel, ButtonModel, TextButtonModel } = require('./model.js');
const { ContainerView, TextView, ImageView, WrapperView, ButtonView, TextButtonView } = require('./view.js');

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

// image
class Image extends ImageModel {
    constructor(src, alt, parent) {
        super();

        this.view = new ImageView(this);

        this.src = src;
        this.alt = alt;
        this.parent = parent;
    }
}

// button that can have anything in it
class Button extends ButtonModel {
    constructor(parent) {
        super();

        this.view = new ButtonView(this);

        this.parent = parent;
    }
}

// button that can have text in it
class TextButton extends TextButtonModel {
    constructor(text, parent) {
        super();

        this.view = new TextButtonView(this);

        this.text = text;
        this.parent = parent;
    }
}

module.exports = { Container, Wrapper, Text, Image, Button, TextButton };