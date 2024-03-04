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
        alert(data)
        navigator.share(data).catch(err => {
            console.log(
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

function getRecipeCards() {
    var cards = document.querySelectorAll(".recipes-list .recipe-card");
    return cards;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getDailyRecipe() {
    var cards = getRecipeCards();

    var lastUpdateDate = localStorage.getItem('lastUpdateDate');
    var currentDate = (new Date()).toISOString().slice(0, 10);

    if (lastUpdateDate !== currentDate) {
        randomIndex = getRandomInt(cards.length)

        localStorage.setItem('lastUpdateDate', currentDate);
        localStorage.setItem('cardIndex', randomIndex);
    }

    var savedIndex = localStorage.getItem('cardIndex');

    var dailyContainer = document.querySelector("#daily-recipe");
    var sortedCard = cards[savedIndex];

    var inlineStyle = sortedCard.getAttribute('style');
    dailyContainer.setAttribute('style', inlineStyle);

    var cardBackDiv = sortedCard.children[0];
    const cloneCard = cardBackDiv.cloneNode(true);
    dailyContainer.appendChild(cloneCard);
}

getDailyRecipe();

document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        body.classList.add('darkmode');
    }

    const themeSwitcher = document.getElementById('set-theme');
    const body = document.body;

    themeSwitcher.addEventListener('click', () => {
        body.classList.toggle('darkmode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

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

                var cards = getRecipeCards();
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

                var cards = getRecipeCards();

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
