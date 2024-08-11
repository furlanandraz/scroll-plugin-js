export default function scroller(trigger) {
    const options = {
        root: null,
        threshold: 0.0,
    };

    // Get element positions
    const elementTop = trigger.offsetTop;
    const elementHeight = trigger.offsetHeight;
    const elementBottom = elementTop + elementHeight;

    function log() {
        const windowTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const windowBottom = windowTop + windowHeight;

        // Calculate start and end points for scroll percentage
        const start = elementTop - windowHeight; // When the bottom of the viewport reaches the top of the element
        const end = elementBottom; // When the top of the viewport reaches the bottom of the element

        // Calculate the scroll percentage
        const totalScrollableDistance = end - start;
        const scrolledDistance = windowTop - start;

        let scrollPercentage = (scrolledDistance / totalScrollableDistance) * 100;
        scrollPercentage = Math.min(Math.max(scrollPercentage, 0), 100); // Clamp between 0 and 100

        let position = cubicBezier([1,0,1,0], scrollPercentage);
    
        // Calculate speed using cubic-bezier curve by comparing current and next points

        const target = document.getElementById('target');
        
        target.style.top= `${position.y * 100}%`;
        target.style.left = `${position.x * 100}%`;
        target.style.transform = `rotate(${scrollPercentage * 3.6}deg)`;
        
    }

    const callback = function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.addEventListener('scroll', log);
                log(); // Call it once to set initial state
            } else {
                window.removeEventListener('scroll', log);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(trigger);

    function cubicBezier([x1, y1, x2, y2], t) {
        t /= 100;
        const c1 = 3 * t * ((1 - t) * (1 - t));
        const c2 =  3 * (t * t) * (1 - t);
        const c3 =  t * t * t;
        const x =  c1 * x1 + c2 * x2 + c3;
        const y = c1 * y1 + c2 * y2 + c3;
        return {x, y}
    }
}



