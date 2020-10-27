window.addEventListener("DOMContentLoaded",() => {
    let range1 = new rSlider({
        element: "#range1",
        tick: 10
    })
});


let rows = 50
function addTable() {
    var body = document.getElementById("table"),
        width = rows*10,
        height = rows*10,
        columns = rows,
        tr = "",
        td = "";

    table = document.createElement("table");
    table.setAttribute("border", "1px");
    table.setAttribute("border-spacing", "1px")
    table.setAttribute("width", width);
    table.setAttribute("height", height);
    for (let i = 0; i < rows; i++) {
        tr = document.createElement("tr");
        for (let j = 0; j < columns; j++) {
            td = document.createElement("td");
            text = document.createTextNode("   ");
            td.setAttribute("id", i + "." + j);
            td.setAttribute("onclick", "content(this)");
            td.setAttribute("style", "background-color: white;")
            td.appendChild(text);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return body.appendChild(table);
}

function deleteTable(){
    var elem = document.getElementById("table");
    if(elem!=null)
        while(elem.firstChild){
            elem.removeChild(elem.firstChild);
        }
}

addTable();
let cells = [];
let IsArrayCreated = false;
let IsStarted = false;

function content(elem) {
    if (elem.style.backgroundColor == "white")
        elem.style.backgroundColor = "black";
    else
        elem.style.backgroundColor = "white";
    IsArrayCreated = false;
}

function CreateArray() {
    for (let i = 0; i < rows; i++) {
        cells[i] = [];
        for (let j = 0; j < rows; j++) {
            let elem = document.getElementById(i + "." + j);
            if (elem.style.backgroundColor == "white")
                cells[i][j] = 0;
            else {
                cells[i][j] = 1;
                //console.log(i + "." + j + "alive")
            }
        }
    }
    IsArrayCreated = true;
}

function MakeMove() {
    let next = [];
    for (let i = 0; i < rows; i++) {
        next[i] = [];
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < rows; j++) {
            let neighbors = CountNeighbors(cells, i, j);
            let cell = cells[i][j]
            if (cell == 0 && neighbors == 3) {
                next[i][j] = 1;
                //console.log(i + "." + j + "is reborn")
            }
            else if (cell == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
                //console.log(i + "." + j + "has died")
            }
            else
                next[i][j] = cell;
        }
    }
    cells = next;
}

function CountNeighbors(array, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + rows) % rows;
            let row = (y + j + rows) % rows;
            sum += array[col][row];
        }
    }
    sum -= array[x][y];
    return sum;
}

function Draw(array) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < rows; j++) {
            let elem = document.getElementById(i + "." + j);
            if (array[i][j] == 0)
                elem.style.backgroundColor = "white";
            else
                elem.style.backgroundColor = "black";
        }
    }
}

let timer;
function Start() {
    if (!IsStarted) {
        console.log("start")
        if (!IsArrayCreated)
            CreateArray();

        timer = setInterval(() => { MakeMove(); Draw(cells); }, 150)
        IsStarted = true;
    }
}

function Stop() {
    clearInterval(timer);
    IsStarted = false;
}

function Move() {
    if (!IsArrayCreated)
        CreateArray();
    MakeMove();
    Draw(cells);
    console.log("moved")
}

function CreateGlider() {
    document.getElementById("27.42").style.backgroundColor = "black";
    document.getElementById("27.43").style.backgroundColor = "black";
    document.getElementById("27.44").style.backgroundColor = "black";
    document.getElementById("26.44").style.backgroundColor = "black";
    document.getElementById("25.43").style.backgroundColor = "black";
    IsArrayCreated = false;
}

function CreateOPentamino() {
    document.getElementById("27.42").style.backgroundColor = "black";
    document.getElementById("27.43").style.backgroundColor = "black";
    document.getElementById("27.44").style.backgroundColor = "black";
    document.getElementById("27.45").style.backgroundColor = "black";
    document.getElementById("27.46").style.backgroundColor = "black";
    IsArrayCreated = false;
}

function CreateThunderbird() {
    document.getElementById("27.42").style.backgroundColor = "black";
    document.getElementById("27.43").style.backgroundColor = "black";
    document.getElementById("27.44").style.backgroundColor = "black";
    document.getElementById("29.43").style.backgroundColor = "black";
    document.getElementById("30.43").style.backgroundColor = "black";
    document.getElementById("31.43").style.backgroundColor = "black";
    IsArrayCreated = false;
}