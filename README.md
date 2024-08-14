# Class-based Scroller plugin under development
### A lightweight scroll animation plugin with CSS property object parser

1) import Scrollib to your script
2) Call ```Scrollib.setup(target, trigger)``` first, that can be stored in a variable but currently there is no need as there is no destroy() method or similar.
3) Chain methods ```Scrollib.setup(target, trigger).from(obj).to(obj).go()``` in this exact order, where obj is a JS key-value object e.g. ```{backgroundColor: 'rgba(120, 120, 150, 0.75)'}```
4) Make sure to include all properties in both ```.from()``` and ```.to()``` methods, as no fallback is yet provided
4) Enjoy your scroll-induced animations

### Disclaimer
- Based on Intersection Observer API
- True private methods
- Only one-value CSS property accepted this far
CSS accepted values:
- all bare unit values such as ```100px```, ```50%```, ```1.4rem```,
- color values:```rgb(5, 84, 39)``` and ```rgba(5, 84, 39, 0.8)```,
- one transform value: ```scale(0.6)```, ```rotate(180deg)```,

My next goal is to add # values, linear-gradient, and make transform property accept and parse several CSS values
