import { getGame } from "./game";
import { getDraw } from "./poles";

export function initialize(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        console.error("WebGL2 not supported");
        return;
    }

    const polesDraw = getDraw(gl);
    const game = getGame();

    const start = performance.now();

    // Clear + draw
    const draw = () => {
        // Make the canvas crisp on HiDPI screens and match its CSS size
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = Math.floor(canvas.clientWidth * dpr) || canvas.width || 300;
        const displayHeight = Math.floor(canvas.clientHeight * dpr) || canvas.height || 150;
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
        gl.viewport(0, 0, canvas.width, canvas.height);

        gl.clearColor(0.08, 0.08, 0.1, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const now = performance.now();
        const seconds = (now - start) / 700;

        const gameState = game();

        polesDraw(seconds, gameState.poles);

        window.requestAnimationFrame(draw);
    };
    draw();
}