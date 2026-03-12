const stackContainer = document.getElementById("stack-container");
const pushBtn = document.getElementById("push-btn");
const popBtn = document.getElementById("pop-btn");
const stackInput = document.getElementById("stack-input");

let stackArray = [];
const MAX_SIZE = 8; 


function pushElement() {
    const value = stackInput.value;

    if (value === "") {
        alert("Bhai, pehle koi number toh daalo!");
        return;
    }

    if (stackArray.length >= MAX_SIZE) {
        alert("Stack Overflow! Dibba bhar chuka hai.");
        return;
    }

    
    stackArray.push(value);
    stackInput.value = ""; 

    
    const item = document.createElement("div");
    item.classList.add("stack-item");
    item.innerText = value;
    
    
    stackContainer.appendChild(item);

    
    setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
    }, 50);
}


function popElement() {
    if (stackArray.length === 0) {
        alert("Stack Underflow! Dibba pehle se hi khali hai.");
        return;
    }

    
    stackArray.pop();

    
    const topItem = stackContainer.lastElementChild;


    topItem.style.opacity = "0";
    topItem.style.transform = "translateY(-50px)"; 

    
    setTimeout(() => {
        stackContainer.removeChild(topItem);
    }, 300);
}


pushBtn.addEventListener("click", pushElement);
popBtn.addEventListener("click", popElement);


stackInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        pushElement();
    }
});