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
    constructor(model) {
        this.model = model;

        // this is fired when a child is inserted
        // at a specific index,
        // so we need to add it to the correct parent
        this.model.listen('run-add-child', (child, index) => {
            // get the child *after* this child
            // so we can use insertBefore
            let after = this.model.children[index+1];

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
        this.model.listen('run-remove-child', child => {
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

        this.model.listen('run-add-class', cls => {
            this.top.classList.add(cls);
        });

        this.model.listen('run-remove-class', cls => {
            this.top.classList.remove(cls);
        });

        this.model.listen('set-id', id => {
            this.top.id = id;
        });
    }
}

// basic container
class ContainerView extends View {
    constructor(model) {
        super(model);

        this.top = document.createElement('div');
        this.model.addClass('gui-container');
        this.bottom = this.top;
    }
}

// allows adding Guim to DOM elements
class WrapperView extends View {
    constructor(model) {
        super(model);

        this.top = document.createElement('div');
        this.model.addClass('gui-wrapper');
        this.bottom = this.top;

        this.model.listen('set-parent', () => {
            console.warn('Set the parent of a WrapperView, this is not reccomended');
        });

        this.model.listen('set-element', element => {
            element.appendChild(this.top);
        });
    }
}

// displys plain text
class TextView extends View {
    constructor(model) {
        super(model);

        this.top = document.createElement('span');
        this.model.addClass('gui-text');
        this.bottom = this.top;

        this.model.listen('set-text', text => {
            this.top.textContent = text;
        })
    }
}

// image
class ImageView extends View {
    constructor(model) {
        super(model);

        this.top = document.createElement('img');
        this.model.addClass('gui-image');
        this.bottom = this.top;

        this.model.listen('set-src', src => {
            this.top.src = src;
        });

        this.model.listen('set-alt', alt => {
            this.top.alt = alt;
        });
    }
}

// generic button
class ButtonView extends View {
    constructor(model) {
        super(model);

        this.top = document.createElement('button');
        this.model.addClass('gui-button');
        this.bottom = this.top;

        this.top.addEventListener('run-click', () => {
            this.model.click();
        });
    }
}

// text button
class TextButtonView extends ButtonView {
    constructor(model) {
        super(model);

        this.model.addClass('gui-text-button');

        this.model.listen('set-text', text => {
            this.top.textContent = text;
        })
    }
}

// image button
class ImageButtonView extends ButtonView {
    constructor(model) {
        super(model);

        this.model.addClass('gui-image-button');
        this.image = document.createElement('img');
        this.image.classList.add('gui-image-button-image');
        this.top.appendChild(this.image);

        this.model.listen('set-src', src => {
            this.image.src = src;
        });

        this.model.listen('set-alt', alt => {
            this.image.alt = alt;
        });
    }
}

// text input
class TextInputView extends View {
    constructor(model) {
        super(model);

        this.top = document.createElement('input');
        this.top.type = 'text';
        this.model.addClass('gui-text-input');
        this.bottom = this.top;

        this.model.listen('set-value', value => {
            this.top.value = value;
        });

        this.top.addEventListener('input', () => {
            this.model.value = this.top.value;
        });
    }
}

module.exports = { 
    View, ContainerView, WrapperView, TextView, ImageView, ButtonView, TextButtonView, ImageButtonView,
    TextInputView
};