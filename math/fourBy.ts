export type FourBy = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
];

export const FOUR_BY_IDENTITY: FourBy = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
];

export const fourByMult = (
    a: FourBy,
    b: FourBy,
): FourBy => {
    const b00 = b[0 * 4 + 0];
    const b01 = b[0 * 4 + 1];
    const b02 = b[0 * 4 + 2];
    const b03 = b[0 * 4 + 3];
    const b10 = b[1 * 4 + 0];
    const b11 = b[1 * 4 + 1];
    const b12 = b[1 * 4 + 2];
    const b13 = b[1 * 4 + 3];
    const b20 = b[2 * 4 + 0];
    const b21 = b[2 * 4 + 1];
    const b22 = b[2 * 4 + 2];
    const b23 = b[2 * 4 + 3];
    const b30 = b[3 * 4 + 0];
    const b31 = b[3 * 4 + 1];
    const b32 = b[3 * 4 + 2];
    const b33 = b[3 * 4 + 3];
    const a00 = a[0 * 4 + 0];
    const a01 = a[0 * 4 + 1];
    const a02 = a[0 * 4 + 2];
    const a03 = a[0 * 4 + 3];
    const a10 = a[1 * 4 + 0];
    const a11 = a[1 * 4 + 1];
    const a12 = a[1 * 4 + 2];
    const a13 = a[1 * 4 + 3];
    const a20 = a[2 * 4 + 0];
    const a21 = a[2 * 4 + 1];
    const a22 = a[2 * 4 + 2];
    const a23 = a[2 * 4 + 3];
    const a30 = a[3 * 4 + 0];
    const a31 = a[3 * 4 + 1];
    const a32 = a[3 * 4 + 2];
    const a33 = a[3 * 4 + 3];

    return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
};

export const fourByTranslation = (
    x: number,
    y: number,
    z: number,
): FourBy => [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1,
    ];

export const fourByRotationX = (
    radians: number,
): FourBy => {
    const c = Math.cos(radians);
    const s = Math.sin(radians);

    return [
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1,
    ];
};

export const fourByRotationY = (
    radians: number,
): FourBy => {
    const c = Math.cos(radians);
    const s = Math.sin(radians);

    return [
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1,
    ];
};

export const fourByRotationZ = (
    radians: number,
): FourBy => {
    const c = Math.cos(radians);
    const s = Math.sin(radians);

    return [
        c, s, 0, 0,
        -s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
};

export const fourByScale = (
    x: number,
    y: number,
    z: number,
): FourBy => [
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1,
    ];

export const fourByOrthographicProjection = (
    width: number,
    height: number,
    depth: number,
): FourBy => [
        2 / width, 0, 0, 0,
        0, -2 / height, 0, 0,
        0, 2 / depth, 0, 0,
        -1, 1, 0, 1,
    ];

export const fourByPerspective = (
    fieldOfViewInRadians: number,
    width: number,
    height: number,
    near: number,
    far: number,
): FourBy => {
    const aspect = width / height;
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    const rangeInv = 1.0 / (near - far);

    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
    ];
};

export const fourByAxisAngleRotation = (
    x: number,
    y: number,
    z: number,
    theta: number,
): FourBy => {
    const magnitude = Math.sqrt(
        Math.pow(x, 2) +
        Math.pow(y, 2) +
        Math.pow(z, 2),
    );
    const sx = x / magnitude;
    const sy = y / magnitude;
    const sz = z / magnitude;
    const cos = Math.cos(theta);
    const omc = 1 - cos;
    const sin = Math.sin(theta);

    /* I think this needs swizzled */
    return [
        cos + sx * sx * omc, sx * sy * omc - sz * sin, sx * sz * omc + sy * sin, 0,
        sy * sx * omc + sz * sin, cos + sy * sy * omc, sy * sz * omc - sx * sin, 0,
        sz * sx * omc - sy * sin, sz * sy * omc + sx * sin, cos + sz * sz * omc, 0,
        0, 0, 0, 1,
    ];

}
