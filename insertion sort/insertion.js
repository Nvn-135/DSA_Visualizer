const container = document.getElementById("array-container");
const sortBtn = document.getElementById("sort-btn");
const generateBtn = document.getElementById("generate-btn");

const sizeSlider = document.getElementById("size-slider");
const sizeValue = document.getElementById("size-value");

let array = [];

function generateArray() {
    container.innerHTML = "";
    array = [];

    let currentSize = parseInt(sizeSlider.value);
    let dynamicWidth = Math.floor(600/currentSize);

    for (let i = 0; i < currentSize; i++) {
        const value = Math.floor(Math.random() * 80) + 20;
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`; 
        bar.style.width = `${dynamicWidth}px`;
        bar.innerText = currentSize<=25 ? value : "";
        container.appendChild(bar);
    }
}

sizeSlider.addEventListener("input",function()
{
    sizeValue.innerText = sizeSlider.value;
    generateArray();
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function insertionSort() {
    let bars = document.getElementsByClassName("bar");
    let n = array.length;

    
    sortBtn.disabled = true;
    generateBtn.disabled = true;

    
    bars[0].style.backgroundColor = "#2ecc71";

    for (let i = 1; i < n; i++) {
        let key = array[i];
        
        
        let keyHeight = bars[i].style.height;
        let keyText = bars[i].innerText;

        
        bars[i].style.backgroundColor = "red";
        await sleep(300);

        let j = i - 1;

        
        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = "yellow"; 
            await sleep(300);

            
            array[j + 1] = array[j];
            bars[j + 1].style.height = bars[j].style.height;
            bars[j + 1].innerText = bars[j].innerText;

            
            bars[j].style.backgroundColor = "#2ecc71";
            j--;
        }

        
        array[j + 1] = key;
        bars[j + 1].style.height = keyHeight;
        bars[j + 1].innerText = keyText;

        
        for (let k = 0; k <= i; k++) {
            bars[k].style.backgroundColor = "#2ecc71";
        }
    }

    
    sortBtn.disabled = false;
    generateBtn.disabled = false;
}


generateArray();

generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", insertionSort);