//global variable
let grid; //grid board
let w = 4; //width of grain
let cols, rows; //numbers of cols and rows
let hueValue = 200; //add color to sand

//create the grid
function make2DArray(cols, rows) {
     let arr = new Array(cols);
     for (let i = 0; i < arr.length; i++) {
          arr[i] = new Array(rows);
          for (let j = 0; j < arr[i].length; j++) {
               arr[i][j] = 0
          }
     }
     return arr;
}

//check if the mouse be in the board
function withinBoard(col, row) {
     return col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1;
}

//create a canvas, dinamyc color
function setup() {
     createCanvas(600, 640);
     colorMode(HSB, 360, 255, 255);
     cols = width / w;
     rows = height / w;
     grid = make2DArray(cols, rows);

     //set state 0 to all grid board
     for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
               grid[i][j] = 0;
          }
     }
}

//mouse when dragged make the sand
function mouseDragged() {
     let mouseCol = floor(mouseX / w);
     let mouseRow = floor(mouseY / w);

     //create more of 1 grain of sand
     let matrix = 10;
     let extend = floor(matrix / 2);
     for (let i = -extend; i <= extend; i++) {
          for (let j = -extend; j <= extend; j++) {
               if (random(1) < 0.75) {
                    let col = mouseCol + i;
                    let row = mouseRow + j;
                    if (withinBoard(col, row)) {
                         grid[col][row] = hueValue;
                    }
               }
          }
     }
     //change color
     hueValue++;
     if (hueValue > 360) {
          hueValue = 0;
     }
}

function draw() {
     //draw the grains of sand
     background(0);
     for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
               noStroke();
               if (grid[i][j] > 0) {
                    fill(grid[i][j], 255, 255);
                    let x = i * w;
                    let y = j * w;
                    square(x, y, w);
               }
          }
     }

     //physics of grains
     let nextGrid = make2DArray(cols, rows);
     for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
               let state = grid[i][j];
               if (state > 0) {
                    let below = grid[i][j + 1];

                    let dir = 1;
                    if (random(1) < 0.5) dir *= -1;

                    let belowA, belowB;
                    if (i + dir >= 0 && i + dir <= cols - 1) {
                         belowA = grid[i + dir][j + 1];
                    } if (i - dir >= 0 && i - dir <= cols - 1) {
                         belowB = grid[i - dir][j + 1];
                    }

                    if (below === 0) {
                         nextGrid[i][j + 1] = grid[i][j];
                    } else if (belowA === 0) {
                         nextGrid[i + dir][j + 1] = grid[i][j];
                    } else if (belowB === 0) {
                         nextGrid[i - dir][j + 1] = grid[i][j];
                    } else {
                         nextGrid[i][j] = grid[i][j];
                    }

               }
          }
     }

     grid = nextGrid;
}