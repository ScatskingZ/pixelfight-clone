const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let size = window.innerWidth / 1.5;
let gridsize = 100;

const randint = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const t1c = [randint(100, 255), randint(100, 255), randint(100, 255)]

const t1 = `rgb(${t1c[0]}, ${t1c[1]}, ${t1c[2]})`;
const t2 = `rgb(${255 - t1c[0]}, ${255 - t1c[1]}, ${255 - t1c[2]})`;

const reset = () =>
{
    grid = [];
    for (let i = 0; i < gridsize; i++)
    {
        grid.push([])
        for (let j = 0; j < gridsize; j++)
        {
            grid[i].push(i < gridsize / 2 ? t1 : t2);
        }
    }
}

let grid = [];
reset();

let loopSpeed = 60;

const adjustContainer = () => {
    const element = document.getElementById("container");
    size = window.innerWidth / 1.5;
    if (size > window.innerHeight / 1.5)
        size = window.innerHeight / 1.5;
    element.style.width = size + "px";
    element.style.height = size + "px";

    canvas.width = size;
    canvas.height = size;

    loopSpeed = document.getElementById("speed").value;
}

const update = () => {
    
    if (randint(1, 2) != 1) return;

    let x = randint(1, gridsize - 2);
    let y = randint(1, gridsize - 2);

    grid[x + randint(-1, 1)][y + randint(-1, 1)] = grid[x][y];
}

const loop = () => {
    adjustContainer();
    canvas.width = canvas.width;

    for (let i = 0; i < gridsize; i++)
        for (let j = 0; j < gridsize; j++)
        {
            if (i == 0 || j == 0 || i == gridsize - 1 || j == gridsize - 1) continue;
            update();
            ctx.fillStyle = grid[i][j];
            ctx.fillRect(i * (size / gridsize), j * (size / gridsize), size / gridsize, size / gridsize);
        }

    setTimeout(loop, 1000 / loopSpeed);

    if (gridsize != document.getElementById("gridsize").value)
    {
        gridsize = document.getElementById("gridsize").value;
        reset();
    }
}

loop();