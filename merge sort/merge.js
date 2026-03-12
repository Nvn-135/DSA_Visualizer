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


async function merge(arr, l, m, r) {
    let bars = document.getElementsByClassName("bar");
    let n1 = m - l + 1;
    let n2 = r - m;

    let left = new Array(n1);
    let right = new Array(n2);

    
    for (let i = 0; i < n1; i++) {
        left[i] = arr[l + i];
        bars[l + i].style.backgroundColor = "orange"; 
    }
    for (let j = 0; j < n2; j++) {
        right[j] = arr[m + 1 + j];
        bars[m + 1 + j].style.backgroundColor = "yellow"; 
    }
    await sleep(300);

    let i = 0, j = 0, k = l;

    
    while (i < n1 && j < n2) {
        bars[k].style.backgroundColor = "red"; 
        await sleep(300);

        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        
        
        bars[k].style.height = `${arr[k] * 3}px`;
        bars[k].innerText = arr[k];
        bars[k].style.backgroundColor = "#2ecc71"; 
        k++;
    }

    
    while (i < n1) {
        bars[k].style.backgroundColor = "red";
        await sleep(300);
        arr[k] = left[i];
        bars[k].style.height = `${arr[k] * 3}px`;
        bars[k].innerText = arr[k];
        bars[k].style.backgroundColor = "#2ecc71";
        i++;
        k++;
    }

    
    while (j < n2) {
        bars[k].style.backgroundColor = "red";
        await sleep(300);
        arr[k] = right[j];
        bars[k].style.height = `${arr[k] * 3}px`;
        bars[k].innerText = arr[k];
        bars[k].style.backgroundColor = "#2ecc71";
        j++;
        k++;
    }
}


async function mergeSortHelper(arr, l, r) {
    if (l >= r) {
        return;
    }
    let m = l + Math.floor((r - l) / 2);
    
    await mergeSortHelper(arr, l, m);
    await mergeSortHelper(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function startMergeSort() {
    sortBtn.disabled = true;
    generateBtn.disabled = true;
    
    await mergeSortHelper(array, 0, array.length - 1);
    
    sortBtn.disabled = false;
    generateBtn.disabled = false;
}


generateArray();

generateBtn.addEventListener("click", generateArray);
sortBtn.addEventListener("click", startMergeSort);