import { FourBy } from "./fourBy";

export type VThree = [number, number, number];
export type VFour = [number, number, number, number];

export const vFourMatrixMult = (
    matrix: FourBy,
    vec: VThree | VFour,
): VFour => {
    const x = vec[0];
    const y = vec[1];
    const z = vec[2];
    const w = vec[3] ?? 1;

    return [
        x * matrix[0] + y * matrix[4] + z * matrix[8] + w * matrix[12],
        x * matrix[1] + y * matrix[5] + z * matrix[9] + w * matrix[13],
        x * matrix[2] + y * matrix[6] + z * matrix[10] + w * matrix[14],
        x * matrix[3] + y * matrix[7] + z * matrix[11] + w * matrix[15],
    ];
};

// https://stackoverflow.com/questions/1171849/finding-quaternion-representing-the-rotation-from-one-vector-to-another
// use this to make a quaternion to rotate the world
// export const vThreeCross = (
//     a: VThree,
//     b: VThree,
// ): number => {

// }
