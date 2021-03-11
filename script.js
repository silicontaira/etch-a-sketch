    /***************Main Code***************/
    let numColumns = 16; //set default  grid
    let numRows = 16; //set default grid
    let pxColor = 'black' //set default pixel color
    let gridContainer = document.querySelector('.gridContainer');
    let clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', clear);
    let colorButton = document.querySelector('.buttonContainer');
    colorButton.addEventListener('click', selectColor);
    
    createGrid();
    
    /***************Functions***************/
    //Creates grid based on default or user inputs
    function createGrid() {
        gridContainer.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
        for (i = 0; i < numColumns*numRows; i++) {
            let div = document.createElement('div');
            div.setAttribute('id', 'item');
            gridContainer.appendChild(div);
        }
        let items = Array.from(document.querySelectorAll('#item'));
        items.forEach(item => item.addEventListener('mouseenter', changeColor));
    }
    
    function removeGrid() {
        for (i = 0; i < numColumns*numRows; i++) {
            let div = document.querySelector('#item');
            gridContainer.removeChild(div);
        }
    }
    //Removes current divs and creates new grid/divs based on users answer to prompt
    function clear(e) {
        removeGrid();
        numColumns = numRows = prompt('How big would you like your new grid?');
        while (isNaN(numColumns) || numColumns < 1 || numColumns > 100) {
            if (isNaN(numColumns)) {
                numColumns=numRows = prompt('Please enter a number');
            }
            else if (numColumns == null || numColumns == 0) {
                return;
            }
            else {
                numColumns = numRows = prompt('Please enter a number between 1-100');
            }
        }    
        createGrid();
    }
    
    function changeColor(e) {
        if (pxColor == 'black') {
            this.style.backgroundColor = '#000000';
        }
        if (pxColor == 'random') {
            let rngColor = Math.floor(Math.random()*16777215).toString(16); //generates random rgb value
            let newColor = '#' + rngColor;
            this.style.backgroundColor = newColor;
        }
        if (pxColor == 'gradient') {
            let testColor = this.style.backgroundColor;
            let testLength = testColor.split(',');
            
            if (testLength.length < 4 && this.style.backgroundColor != 'rgb(0, 0, 0)') {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }
            else if(this.style.backgroundColor == 'rgb(0, 0, 0)') {
                return;
            }
            else {
                let a = parseFloat(testLength[3].substring(0, testLength[3].length - 1));
                a += .1;
                this.style.backgroundColor = `rgba(0, 0, 0, ${a})`;        
            }
        } 
        if (pxColor == 'erase') {
            this.style.backgroundColor = '#ffffff';
        }
        
    }
    
    //sets variable so changeColor function knows which code to use
    function selectColor(e) {
        if (e.target.id.toLowerCase() == 'black') {
            pxColor = 'black';
        }
        if (e.target.id.toLowerCase() == 'random') {
            pxColor = 'random';
        }
        if (e.target.id.toLowerCase() == 'gradient') {
            pxColor = 'gradient';
        }
        if (e.target.id.toLowerCase() == 'erase') {
            pxColor = 'erase';
        }
    }