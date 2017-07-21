import ee from './event';

class Reactive{
    constructor(config){
        this.parseConfig(config)
    }
    parseConfig(config){
        for(let x in config){
            if(config.hasOwnProperty(x)){
                let val = config[x];
                if (typeof val === 'object'){
                    Object.defineProperty(this, `${x}`, {
                        enumerable: true,
                        writable: true,
                        value: new Reactive(val)
                    })
                } else {
                    this.setProperties(x, val);
                }
            }
        }
    }
    setProperties(prop, val){

        Object.defineProperty(this, `_${prop}`, {
            value: val,
            enumerable: false,
            writable: true
        })

        Object.defineProperty(this, `${prop}`, {
            enumerable: true,
            get() {
                return this[`_${prop}`];
            },
            set(newVal) {
                this[`_${prop}`] = newVal;
                ee.emit(`${prop}`, this[`_${prop}`])
            }
        })
    }

    bindToComponent(component, layer){
        console.log(Object.getOwnPropertyDescriptor(this, 'game'))
        for (let prop in this[layer]){
            console.log(prop)
            console.log(this[layer].hasOwnProperty(prop))
            if (this[layer].hasOwnProperty(prop)){
                ee.on(`${prop}`, (args) => {
                    console.log(1, args)
                    let val = args
                    component[prop] = val;
                });
            }
        }
    }
}

export default Reactive;