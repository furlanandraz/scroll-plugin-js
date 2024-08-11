// import scroller from "./scroller.js";
import Scrollib from "./scrollib.js";

const trigger = document.getElementById("trigger");
const target = document.getElementById("target");

// scroller(trigger);
// console.log(Scrollib.setup(trigger, target));
// console.log(Scrollib.setup(document.getElementById('five'), document.getElementById('target5')));
// Scrollib.setup(trigger, target).from({
//     left: '5px',
//     top: '10%',
//     transform: 'rotate(60deg)',
//     backgroundColor: 'rgb(0, 110, 10)',
//     borderRadius: '0px'
// }).to({
//     left: '500px',
//     top: '135%',
//     transform: 'rotate(360deg)',
//     backgroundColor: 'rgb(100, 0, 0)',
//     borderRadius: '100px'
// }).go();

Scrollib.setup(trigger, target).from({
    top: '25%',
}).to({
    top: '-25%',
}).go();

Scrollib.setup(document.getElementById('five'), document.getElementById('target5')).from({
    // opacity: '1',
    height: '100%',
    backgroundColor: 'rgba(165, 100, 80, 1)',
    // borderRadius: '0px'
}).to({
    // opacity: '0.9',
    height: '300%',
    backgroundColor: 'rgba(100, 130, 250, 1)',
    // borderRadius: '100px'
}).go();

Scrollib.setup(document.getElementById('five'), document.getElementById('target6')).from({
    // opacity: '1',
    height: '100%',
    backgroundColor: 'rgba(255, 100, 50, 1)',
    // borderRadius: '0px'
}).to({
    // opacity: '0.9',
    height: '200%',
    backgroundColor: 'rgba(100, 130, 250, 1)',
    // borderRadius: '100px'
}).go();

Scrollib.setup(document.getElementById('five'), document.getElementById('target7')).from({
    // opacity: '1',
    height: '100%',
    backgroundColor: 'rgba(80, 100, 80, 1)',
    // borderRadius: '0px'
}).to({
    // opacity: '0.9',
    height: '160%',
    backgroundColor: 'rgba(100, 130, 250, 1)',
    // borderRadius: '100px'
}).go();

Scrollib.setup(document.getElementById('five'), document.getElementById('target8')).from({
    // opacity: '1',
    height: '100%',
    backgroundColor: 'rgba(20, 100, 50, 1)',
    // borderRadius: '0px'
}).to({
    // opacity: '0.9',
    height: '250%',
    backgroundColor: 'rgba(100, 130, 250, 1)',
    // borderRadius: '100px'
}).go();

Scrollib.setup(document.getElementById('four'), document.getElementById('target42')).from({
    // opacity: '0',
    top: '100%',
    
}).to({
    // opacity: '1',
    top: '0%'
    
}).go();

// console.log(window.getComputedStyle(target).getPropertyValue('background-color'));




