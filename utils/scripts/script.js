function sharePage(isRecipe) {
    if (window.location) {
        var pageUrl = window.location.href;
    }
    var pageTitle = document.title;

    if (isRecipe) {
        var recipeName = document.querySelector(".presentation h3").textContent;
        var recipeCalories = document.querySelector("#calories p").textContent;
        var recipeTime = document.querySelector("#prepare-time p").textContent;
        var message = `Veja essa receita incrível no Pedro Receitas! ${recipeName} --- ${recipeCalories} --- ${recipeTime}`;

        const data = {
            title: pageTitle,
            text: message,
            url: pageUrl
        };
    } else {
        var message = `Receitas simples e fáceis!`
        const data = {
            title: pageTitle,
            text: message,
            url: pageUrl
        };
    }

    if (navigator.share) {
        navigator.share(data).catch(err => {
            alert(
                "Error while using Web share API:" + err);
            console.log(err);
        });
    } else {
        navigator.clipboard.writeText(message + " --> " + pageUrl);

        var copyModal = document.querySelector("#copyModal");
        copyModal.style.display = "flex";

        window.setTimeout(() => {
            copyModal.style.display = "none";
        }, 3000)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("mobile-open-menu").addEventListener("click", function () {
        document.querySelector(".nav-menu").classList.toggle("visible");
        document.querySelector("#mobile-open-menu").classList.toggle("visible");
    });

    document.querySelector("#close").addEventListener("click", function () {
        document.querySelector(".nav-menu").classList.toggle("visible");
        document.querySelector("#mobile-open-menu").classList.toggle("visible");
    });

    var share_btns = document.querySelectorAll(".share");
    share_btns.forEach(share_btn => {
        share_btn.addEventListener("click", (e) => {
            if (e.target.classList.contains('recipe-link')) {
                sharePage(true);
            } else {
                sharePage(false);
            }
        })
    });

    var selectors = document.querySelectorAll(".recipe-type");
    selectors.forEach(selector => {
        selector.addEventListener('click', (e) => {
            if (selector.classList.contains("selected")) {
                document.querySelector(".selected").classList.toggle("selected")
                document.querySelector("#all").classList.toggle("selected")

                var cards = document.querySelectorAll(".recipes-list .recipe-card");
                if (cards.length === 0) {
                    var empty_message = document.querySelector("#empty")
                    if (!empty_message.classList.contains("visible")) {
                        empty_message.classList.toggle("visible")
                    }
                } else {
                    cards.forEach(card => {
                        card.style.display = "flex";
                    })
                }
            }
            else {
                document.querySelector(".selected").classList.toggle("selected");

                var target_id = e.currentTarget.id;
                document.querySelector(`#${target_id}`).classList.toggle("selected");

                var cards_category = document.querySelectorAll(`.${target_id}`);
                if (cards_category.length === 0) {
                    var empty_message = document.querySelector("#empty")
                    if (!empty_message.classList.contains("visible")) {
                        empty_message.classList.toggle("visible")
                    }
                }

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

    var closeModal = document.querySelectorAll(".close");
    closeModal.forEach(closeBtn => {
        closeBtn.addEventListener("click", (e) => {
            var modals = document.querySelectorAll(".modal");
            modals.forEach(modal => {
                modal.style.display = "none";
            })
        })
    });

});
