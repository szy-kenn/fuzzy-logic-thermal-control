import { getIntercept, getSlope } from "./utils";

export default class Trimf {

    constructor(p1, p2, p3) {
        
        // vertices of the triangle
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;

    };

    calculate = (x) => {

        // x <= a
        if (x <= this.p1.x) return 0;

        // a <= x <= b
        if (this.p1.x <= x && x <= this.p2.x) {
            const m = getSlope(this.p1, this.p2);
            const b = getIntercept(this.p1, this.p2);
            return (m * x + b).toFixed(2);
        };

        // b <= x <= c
        if (this.p2.x <= x && x <= this.p3.x) {
            const m = getSlope(this.p2, this.p3);
            const b = getIntercept(this.p2, this.p3);
            return (m * x + b).toFixed(2);
        } 

        // x >= c
        if (x >= this.p3.x) return 0;

    };
};