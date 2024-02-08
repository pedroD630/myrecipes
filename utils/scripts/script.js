document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("mobile-open-menu").addEventListener("click", function () {
        document.querySelector(".nav-menu").classList.toggle("visible");
        document.querySelector("#mobile-open-menu").classList.toggle("visible");
    });

    document.querySelector("#close").addEventListener("click", function () {
        document.querySelector(".nav-menu").classList.toggle("visible");
        document.querySelector("#mobile-open-menu").classList.toggle("visible");
    });

    // quando clicar em um seletor
    // receber id do seletor
    // sumir todos os cards
    // exibir cards com a classe do id do seletor
    var selectors = document.querySelectorAll(".recipe-type");
    selectors.forEach(selector => {
        selector.addEventListener('click', (e) => {
            if (selector.classList.contains("selected")) {
                document.querySelector(".selected").classList.toggle("selected")
                document.querySelector("#all").classList.toggle("selected")

                var cards = document.querySelectorAll(".recipes-list .recipe-card");
                cards.forEach(card => {
                    card.style.display = "flex";
                })
            }
            else {
                document.querySelector(".selected").classList.toggle("selected");

                var target_id = e.currentTarget.id;
                document.querySelector(`#${target_id}`).classList.toggle("selected");

                var cards = document.querySelectorAll(".recipes-list .recipe-card");
                cards.forEach(card => {
                    if (card.classList.contains(`${target_id}`)) {
                        card.style.display = "flex";
                    }
                    else {
                        card.style.display = "none";
                    }
                })
            }

        })
    });

});
