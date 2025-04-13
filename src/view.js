/* guim v1.0.0
 * 
 * Guim is a JS library for creating simple
 * desktop-like GUIs.
 *
 * This software is free and anybody can
 * use it with no restrictions
 * 
 * view.js
 * Contains view classes
 */

// base view class
class View {
    constructor(element) {
        this.element = element;

        // this is fired when a child is inserted
        // at a specific index,
        // so we need to add it to the correct parent
        this.element.listen('run-add-child', (child, index) => {
            // get the child *after* this child
            // so we can use insertBefore
            let after = this.element.children[index+1];

            if (after) {
                // if there is a child after child,
                // add the child *before* after
                this.bottom.insertBefore(child.view.top, after.view.top);
            } else {
                // otherwise,
                // just append it to the end
                this.bottom.appendChild(child.view.top);
            }
        });

        // this is fired
        // when a child is removed
        this.element.listen('run-remove-child', child => {
            // simple, just call
            // removeChild to automatically
            // remove it. But check if it is a child
            // first or else an error will happen
            // (however this edge case shouldn't occurr);
            if (this.bottom.contains(child.view.top))
                // if so, remove it
                this.bottom.removeChild(child.view.top);
            else {
                // otherwise log to the console
                // that something unexpected happened
                // (nice for debugging)
                console.warn('Removed a child from the DOM that wasn\'t added first');
            }
        });

        this.element.listen('run-add-class', cls => {
            this.top.classList.add(cls);
        });

        this.element.listen('run-remove-class', cls => {
            this.top.classList.remove(cls);
        });

        this.element.listen('set-id', id => {
            this.top.id = id;
        });
    }
}

// basic container
class ContainerView extends View {
    constructor(element) {
        super(element);

        this.top = document.createElement('div');
        this.element.addClass('gui-container');
        this.bottom = this.top;
    }
}

// allows adding Guim to DOM elements
class WrapperView extends View {
    constructor(element) {
        super(element);

        this.top = document.createElement('div');
        this.element.addClass('gui-wrapper');
        this.bottom = this.top;

        this.element.listen('set-parent', () => {
            console.warn('Set the parent of a WrapperView, this is not reccomended');
        });

        this.element.listen('set-element', element => {
            element.appendChild(this.top);
        });
    }
}

// displys plain text
class TextView extends View {
    constructor(element) {
        super(element);

        this.top = document.createElement('span');
        this.element.addClass('gui-text');
        this.bottom = this.top;

        this.element.listen('set-text', text => {
            this.top.textContent = text;
        })
    }
}

// image
class ImageView extends View {
    constructor(element) {
        super(element);

        this.top = document.createElement('img');
        this.element.addClass('gui-image');
        this.bottom = this.top;

        this.element.listen('set-src', src => {
            this.top.src = src;
        });

        this.element.listen('set-alt', alt => {
            this.top.alt = alt;
        });
    }
}

// generic button
class ButtonView extends View {
    constructor(element) {
        super(element);

        this.top = document.createElement('button');
        this.element.addClass('gui-button');
        this.bottom = this.top;

        this.top.addEventListener('click', () => {
            this.element.click();
        });
    }
}

// text button
class TextButtonView extends ButtonView {
    constructor(element) {
        super(element);

        this.element.addClass('gui-text-button');

        this.element.listen('set-text', text => {
            this.top.textContent = text;
        })
    }
}

module.exports = { View, ContainerView, WrapperView, TextView, ImageView, ButtonView, TextButtonView };