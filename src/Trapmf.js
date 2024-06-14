import { getIntercept, getSlope } from "./utils";

export default class Trapmf {

    constructor(p1, p2, p3, p4) {
        
        // vertices of the trapezoid
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    };

    calculate = (x) => {

        // x <= a
        if (x <= this.p1.x) {
            if (this.p1.x === this.p2.x) return 1;
            else return 0;
        };

        // a <= x <= b
        if (this.p1.x <= x && x <= this.p2.x) {
            const m = getSlope(this.p1, this.p2);
            const b = getIntercept(this.p1, this.p2);
            return (m * x + b).toFixed(2);
        };

        // b <= x <= c
        if (this.p2.x <= x && x <= this.p3.x) return 1;

        // c <= x <= d
        if (this.p3.x <= x && x <= this.p4.x) {
            const m = getSlope(this.p3, this.p4);
            const b = getIntercept(this.p3, this.p4);
            return (m * x + b).toFixed(2);
        };

        // x >= d
        if (x >= this.p4.x) {
            if (this.p3.x === this.p4.x) return 1;
            else return 0;
        };
    };
};
