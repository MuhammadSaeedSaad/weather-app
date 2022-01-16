const searchForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const iconImg = document.querySelector("#Image");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    p1.textContent = "Loading...";
    p2.textContent = "";

    fetch("/weather?address=" + searchInput.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                p1.textContent = data.error;
                p2.textContent = "";
                iconImg.src = "";
            } else{
                p1.textContent = data.location;
                p2.textContent = data.forecast;
                iconImg.src = data.imageurl;
            }
        })
    });
});