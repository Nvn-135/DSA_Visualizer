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

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    let n = array.length;

    sortBtn.disabled = true;
    generateBtn.disabled = true;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {

            bars[j].style.backgroundColor = "yellow";
            bars[j + 1].style.backgroundColor = "yellow";
            
            await sleep(300); 

            if (array[j] > array[j + 1]) {
                
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                
                let tempHeight = bars[j].style.height;
                bars[j].style.height = bars[j + 1].style.height;
                bars[j + 1].style.height = tempHeight;

                let tempText = bars[j].innerText;
                bars[j].innerText = bars[j + 1].innerText;
                bars[j + 1].innerText = tempText;
            }

            
            bars[j].style.backgroundColor = "#3498db";
            bars[j + 1].style.backgroundColor = "#3498db";
        }
        
        bars[n - 1 - i].style.backgroundColor = "#2ecc71";
    }
    
    bars[0].style.backgroundColor = "#2ecc71";

    
    sortBtn.disabled = false;
    generateBtn.disabled = false;
}


generateArray();

generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", bubbleSort);