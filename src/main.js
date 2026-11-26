const start_button = document.getElementById("start_button");
const rolling_page = document.getElementById("rolling");
const homepage = document.getElementById("homepage");
const time_header = document.getElementById("time_header");

start_button.addEventListener("click", function() {
    homepage.style.display = "none";
    rolling_page.style.display = "block";
    roll();
})

