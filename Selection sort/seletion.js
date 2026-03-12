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


async function selectionSort() {
    let bars = document.getElementsByClassName("bar");
    let n = array.length;

    
    sortBtn.disabled = true;
    generateBtn.disabled = true;

    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        bars[min_idx].style.backgroundColor = "red"; 

        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = "yellow"; 
            await sleep(300); 

            if (array[j] < array[min_idx]) {
                
                if (min_idx !== i) {
                    bars[min_idx].style.backgroundColor = "#3498db"; 
                }
                min_idx = j;
                bars[min_idx].style.backgroundColor = "red"; 
            } else {
                
                bars[j].style.backgroundColor = "#3498db";
            }
        }

        
        let temp = array[i];
        array[i] = array[min_idx];
        array[min_idx] = temp;

        
        let tempHeight = bars[i].style.height;
        bars[i].style.height = bars[min_idx].style.height;
        bars[min_idx].style.height = tempHeight;

        let tempText = bars[i].innerText;
        bars[i].innerText = bars[min_idx].innerText;
        bars[min_idx].innerText = tempText;

        
        if (min_idx !== i) {
            bars[min_idx].style.backgroundColor = "#3498db";
        }
        bars[i].style.backgroundColor = "#2ecc71"; 
        await sleep(300);
    }
    
    bars[n - 1].style.backgroundColor = "#2ecc71";

    
    sortBtn.disabled = false;
    generateBtn.disabled = false;
}


generateArray();


generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", selectionSort);