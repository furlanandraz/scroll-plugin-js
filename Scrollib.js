function cubicBezier([x1, y1, x2, y2], t) {
    t /= 100;
    const c1 = 3 * t * ((1 - t) * (1 - t));
    const c2 =  3 * (t * t) * (1 - t);
    const c3 =  t * t * t;
    const x =  c1 * x1 + c2 * x2 + c3;
    const y = c1 * y1 + c2 * y2 + c3;
    return {x, y}
}

const cssPrefix = /(?<prefix>#|rgba?\(|scale\(|rotate\(|translate\()/gm;
const cssValue = /(?<value>(?<=\()[0-9.]*(?=\))|(?<=#)[a-zA-Z0-9]+|[0-9.-]+)/gm;
const cssUnit = /(?<suffix>px|%|r?em|deg)/gm;
const cssSuffix = /(?<suffix>\))/gm;
function cssProperty(string) {
    let cssFormatted = {};
    cssFormatted.prefix = string.match(cssPrefix) !== null && string.match(cssPrefix) !== '' ? Object.values(string.match(cssPrefix)).at(0) : '';
    cssFormatted.value = Array.from(string.match(cssValue)).map(el => Number(el)) || '';
    cssFormatted.unit = string.match(cssUnit) !== null && string.match(cssUnit) !== '' ? Object.values(string.match(cssUnit)).at(0) : '';
    cssFormatted.suffix = string.match(cssSuffix) !== null && string.match(cssSuffix) !== '' ? Object.values(string.match(cssSuffix)).at(0) : '';
    return cssFormatted;
}

function scalar(arr, scalar) {
    for (const [i, _] of Object.entries(arr)) {
        arr[i] *= scalar;
    }
    return arr;
}

function subtract(arr1, arr2) {
    let arr = [];
    for (const [i, _] of Object.entries(arr1)) {
        arr[i] = arr2[i] - arr1[i];
    }
    return arr;
}
function addition(arr1, arr2) {
    let arr = [];
    for (const [i, _] of Object.entries(arr1)) {
        arr[i] = arr1[i] + arr2[i];
    }
    return arr;
}


export default class Scrollib {

    constructor(trigger, target) {
        this.data = {
            trigger,
            target,
        };
        this.observerOptions = {
            root: null,
            threshold: 0.0,
        }
        this.triggerBox = {
            elementTop:  trigger.offsetTop,
            elementHeight: trigger.offsetHeight,
            elementBottom: trigger.offsetTop + trigger.offsetHeight,
        }
        this.lastChild = (document.body.scrollHeight === this.triggerBox.elementBottom); 
    }

    static setup(trigger, target) {  
        return new Scrollib(trigger, target);
    }

    from(options) {
        this.data.start = Object.fromEntries(Object.entries(options).map(([property, value]) => [property, cssProperty(value)]));;
        // console.log(scalar(this.data.start.color.value, 5));
        return this;
    }

    to(options) {
        this.data.end = Object.fromEntries(Object.entries(options).map(([property, value]) => [property, cssProperty(value)]));
        return this;
    }

    go() { 
        this.observer = new IntersectionObserver(this.#callback, this.observerOptions);
        this.observer.observe(this.data.trigger);
        console.log(this);
    }

    #callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.addEventListener('scroll', this.#log);
                this.#log(); // Call it once to set initial state
            } else {
                window.removeEventListener('scroll', this.#log);
            }
        });
    };

    #log = () => {
        const windowTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const windowBottom = windowTop + windowHeight;

        // Calculate start and end points for scroll percentage
        let start = this.triggerBox.elementTop - windowHeight; // When the bottom of the viewport reaches the top of the element
        let end = this.triggerBox.elementBottom - (this.lastChild? windowHeight : 0); // When the top of the viewport reaches the bottom of the element
        
        const totalScrollableDistance = end - start;
        const scrolledDistance = windowTop - start;
        
        let scrolled = (scrolledDistance / totalScrollableDistance);
        scrolled= Math.min(Math.max(scrolled, 0), 1); // Clamp between 0 and 100

        for (const [property, formatted] of Object.entries(this.data.start)) {
    
            let start = this.data.start[property].value;
            let end = this.data.end[property].value;
            let diff = subtract(start, end);
            let scale = scalar(diff, scrolled);
            let res = addition(start, scale);
            
            this.data.target.style[property] = `${formatted.prefix}${res.join(',')}${formatted.unit}${formatted.suffix}`;
            console.log(`${formatted.prefix}${res.join(', ')}${formatted.unit}${formatted.suffix}`);
        }
    }
}