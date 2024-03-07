const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const menu_items = document.querySelectorAll('.mainMenu a');

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
    mainMenu.style.top = '-120%';
}

/*Breakpoints*/

document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('section');
    const menuItems = document.querySelectorAll('.mainMenu a');
  
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          menuItems.forEach(item => {
            if (item.getAttribute('href').slice(1) === sectionId) {
              menuItems.forEach(item => {
                item.classList.remove('active');
              });
              item.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
  
    sections.forEach(section => {
      observer.observe(section);
    });
  });


