const root = document.createElement('div');
root.className = 'root';

const canvas = document.createElement('canvas');
root.appendChild(canvas);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.body.appendChild(root);
