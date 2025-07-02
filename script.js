// const BASE_URL = "https://api.exchangerate.host/convert?access_key=27980e00f2f963a457c57b5c73311ba6&from=USD&to=PKR&amount=1";
const BASE_URL = "https://api.exchangerate.host/convert";
const ACCESS_KEY = "27980e00f2f963a457c57b5c73311ba6";


const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const  fromCurr = document.querySelector(".from select");
const  toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapBtn = document.querySelector(".swap-icon");

const themeBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");





for(let select of dropDowns){
    
for(let currCode in countryList){
  
    let newOption = document.createElement("option");
     newOption.innerText = currCode;
     newOption.value = currCode;
     if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
     }else if(select.name === "to" && currCode === "PKR"){
        newOption.selected = "selected";
     }
     select.append(newOption);
}

select.addEventListener("change",(evt)=>{
         updateFlag(evt.target);
});
}


const updateFlag = (element)=>{
      let currCode = element.value;
      let countryCode = countryList[currCode];
      let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
      let img = element.parentElement.querySelector("img");
      img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);
    if (isNaN(amtVal) || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}?access_key=${ACCESS_KEY}&from=${fromCurr.value}&to=${toCurr.value}&amount=${amtVal}`;

    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data.result;
        let finalAmount = rate.toFixed(4);
        msg.innerHTML = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    } catch (error) {
        console.error("API error:", error);
    }
});


swapBtn.addEventListener("click", () => {

    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);

    btn.click();
});


// this for light/dark mode

function setTheme(dark) {
  if (dark) {
    document.body.classList.add("dark");
    themeIcon.textContent = "🌞";
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark");
    themeIcon.textContent = "🌙";
    localStorage.setItem("darkMode", "disabled");
  }
}

// Load on page
setTheme(localStorage.getItem("darkMode") === "enabled");

themeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(!isDark);
});

