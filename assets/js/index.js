const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const menu_items = document.querySelectorAll('nav .mainMenu li a');

openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

// close menu when you click on a menu item 
menu_items.forEach(item => {
    item.addEventListener('click',function(){
        close();
    })
})

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-100%';
}

/*Card slider*/

const cardContainer = document.querySelector(".card-container");
const prevBtn = document.querySelector("#left");
const nextBtn = document.querySelector("#right");
const cards = [...cardContainer.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the slider at once
let cardsPerView = Math.round(cardContainer.offsetWidth / cards[0].offsetWidth);

// Insert copies of the last few cards to the beginning of the container for infinite scrolling
cards.slice(-cardsPerView).reverse().forEach(card => {
    cardContainer.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to the end of the container for infinite scrolling
cards.slice(0, cardsPerView).forEach(card => {
    cardContainer.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the container at the appropriate position to hide the first few duplicate cards on Firefox
cardContainer.classList.add("no-transition");
cardContainer.scrollLeft = cardContainer.offsetWidth;
cardContainer.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the container left and right
prevBtn.addEventListener("click", () => {
    cardContainer.scrollLeft -= cards[0].offsetWidth;
});

nextBtn.addEventListener("click", () => {
    cardContainer.scrollLeft += cards[0].offsetWidth;
});

const dragStart = (e) => {
    isDragging = true;
    cardContainer.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = cardContainer.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    cardContainer.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    cardContainer.classList.remove("dragging");
}

const infiniteScroll = () => {
    if (cardContainer.scrollLeft === 0) {
        cardContainer.classList.add("no-transition");
        cardContainer.scrollLeft = cardContainer.scrollWidth - (2 * cardContainer.offsetWidth);
        cardContainer.classList.remove("no-transition");
    } else if (Math.ceil(cardContainer.scrollLeft) === cardContainer.scrollWidth - cardContainer.offsetWidth) {
        cardContainer.classList.add("no-transition");
        cardContainer.scrollLeft = cardContainer.offsetWidth;
        cardContainer.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!cardContainer.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;
    timeoutId = setTimeout(() => cardContainer.scrollLeft += cards[0].offsetWidth, 2500);
}
autoPlay();

cardContainer.addEventListener("mousedown", dragStart);
cardContainer.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
cardContainer.addEventListener("scroll", infiniteScroll);
cardContainer.addEventListener("mouseenter", () => clearTimeout(timeoutId));
cardContainer.addEventListener("mouseleave", autoPlay);