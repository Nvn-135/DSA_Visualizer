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


async function partition(arr, low, high) {
    let bars = document.getElementsByClassName("bar");
    let pivot = arr[high]; 
    bars[high].style.backgroundColor = "orange"; 
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = "yellow"; 
        await sleep(300);
        
        if (arr[j] < pivot) {
            i++;
            
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            
            
            let tempHeight = bars[i].style.height;
            bars[i].style.height = bars[j].style.height;
            bars[j].style.height = tempHeight;
            
            let tempText = bars[i].innerText;
            bars[i].innerText = bars[j].innerText;
            bars[j].innerText = tempText;
            
            bars[i].style.backgroundColor = "purple"; 
            if(i !== j) {
                bars[j].style.backgroundColor = "#3498db"; 
            }
        } else {
            bars[j].style.backgroundColor = "#3498db"; 
        }
    }
    
    
    i++;
    let temp = arr[i];
    arr[i] = arr[high];
    arr[high] = temp;
    
    let tempHeight = bars[i].style.height;
    bars[i].style.height = bars[high].style.height;
    bars[high].style.height = tempHeight;
    
    let tempText = bars[i].innerText;
    bars[i].innerText = bars[high].innerText;
    bars[high].innerText = tempText;
    
    
    bars[high].style.backgroundColor = "#3498db"; 
    bars[i].style.backgroundColor = "#2ecc71"; 
    
    
    for(let k = low; k < i; k++){
        bars[k].style.backgroundColor = "#3498db";
    }
    
    await sleep(300);
    return i;
}


async function quickSortHelper(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        
        
        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
    } else if (low >= 0 && high >= 0 && low === high) {
       
        let bars = document.getElementsByClassName("bar");
        bars[low].style.backgroundColor = "#2ecc71";
    }
}


async function startQuickSort() {
    sortBtn.disabled = true;
    generateBtn.disabled = true;
    
    await quickSortHelper(array, 0, array.length - 1);
    
    sortBtn.disabled = false;
    generateBtn.disabled = false;
}


generateArray();

generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", startQuickSort);