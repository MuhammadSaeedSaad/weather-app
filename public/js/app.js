console.log("client side js");



const searchForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    p1.textContent = "Loading...";
    p2.textContent = "";

    fetch("http://localhost:3000/weather?address=" + searchInput.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                p1.textContent = data.error;
            } else{
                p1.textContent = data.location;
                p2.textContent = data.forecast;
            }
        })
    });
});