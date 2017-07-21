import {Subject} from 'rxjs';

export class Model {

    constructor(config) {
        console.log(config)
        this.parseConfig(config);
    }

    bindToComponent(component, map = {}) {
        console.log(component)
        for (let prop in this) {
            if (this.hasOwnProperty(prop)) {
                prop = (map[prop]) ? map[prop] : prop;
                this[`${prop}$`]
                    .startWith(this[prop])
                    .subscribe(next => component[prop] = next);
                this[`${prop}_bind$`]
                    .subscribe(next => component[prop] = next);
            }
        }
    }

    parseConfig(config) {
        for (let prop in config) {
            if (config.hasOwnProperty(prop)) {
                let value = config[prop];
                if (typeof value !== 'object') {
                    this.createModelProperty(prop, value);
                } else {
                    Object.defineProperty(this, `${prop}`, {
                        value: new Model(value),
                        enumerable: false
                    });
                }
                
            }
        }
    }

    bindProps([
        [ context1, prop1 ],
        [ context2, prop2 ]
    ]) {
        context1[`${prop1}$`]
            .subscribe(value => {
                context2[`${prop2}_bind$`].next(value);
            });
        context2[`${prop2}$`]
            .subscribe(value => {
                context1[`${prop1}_bind$`].next(value);
            });
    }

    createModelProperty(prop, value) {

        Object.defineProperty(this, `_${prop}`, {
           value,
           enumerable: false,
           writable: true,
        });

        Object.defineProperty(this, `${prop}$`, {
           value: new Subject(),
           enumerable: false
        });

        Object.defineProperty(this, `${prop}_bind$`, {
           value: new Subject(),
           enumerable: false
        });

        Object.defineProperty(this, `${prop}`, {
            enumerable: true,
            get() { return this[`_${prop}`] },
            set(newValue) {
                this[`_${prop}`] = newValue;
                this[`${prop}$`].next(newValue);
            }
        });

        this[`${prop}_bind$`]
            .subscribe(next => {
                this[`_${prop}`] = next;
            });
    
    }

}