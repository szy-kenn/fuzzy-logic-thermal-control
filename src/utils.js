export const Point = (x, y) => ({x, y});
export const getSlope = (p1, p2) => (p2.y - p1.y) / (p2.x - p1.x);
export const getIntercept = (p1, p2) => p1.y - (getSlope(p1, p2) * p1.x);

