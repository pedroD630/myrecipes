document.addEventListener('DOMContentLoaded',() => {
    document.getElementById("mobile-open-menu").addEventListener("click", function () {
        document.querySelector(".nav-menu").classList.toggle("visible");
        document.querySelector("#mobile-open-menu").classList.toggle("visible");
    });
    
    document.querySelector("#close").addEventListener("click", function () {
        document.querySelector(".nav-menu").classList.toggle("visible");
        document.querySelector("#mobile-open-menu").classList.toggle("visible");
    })
});
