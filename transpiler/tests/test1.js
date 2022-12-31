let test = {
    a: 1 + 2,
    b: 1 * 2,
    c: 1 / 2,
    d: 1 - 2,
    e: 1 ** 2,
    f: 2 === 3,
    g: 2 == 3,
    h: 2 !== 2,
    i: 2 != 2,
    j: 2 < 3,
    k: 2 <= 3,
    l: 2 > 3,
    m: 2 >= 3,
    n: 1 + 2 + 3,
    o: -1,
    p: +2,
    q: 1&2,
    r: 1|2,
    s: 1^2,
    t: !false,
    u: !true,
    v: !!false,                 //not doesn't work for non-booleans
    w : Math.sqrt(36),
    x: Math.sqrt(-36),          //give zero
    y: Math.abs(-5),
    z: Math.abs(12),
    a1: Math.log(Math.exp(4)),           //this is log base e
    b1: Math.exp(2),
    c1: Math.round(1.2),
    d1: Math.round (1.7),
    e1: Math.round(1.5),
    f1: Math.ceil(1.1),
    g1: Math.ceil(1),
    h1: Math.ceil(-1.3),
    i1: Math.floor(1.1),
    j1: Math.floor(1),
    k1: Math.floor(-1.3),
    l1: Math.sin(90),
    m1: Math.cos(90),
    n1: Math.tan(45),
    o1: Math.acos(0),
    p1: Math.asin(0),
    q1: Math.atan(1),
    r1: Math.atan2(-1,-1),
    s1: Math.random(),
    t1: Math.min(-1,2,25),
    u1: Math.max(-2,34,2),
    v1: Math.range(1,5),
    w1: Math.mod(9,2),
    x1: Math.quot(9,2),
    y1: Math.toDegrees(3.14),
    z1: Math.toRadians(90)
}

button1.addEventListener(
    "click",
    function () {
        textbox.text = test
    }
)