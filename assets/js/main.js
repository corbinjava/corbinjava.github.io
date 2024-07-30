/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== REVIEW FORM FUNCTIONALITY =====*/
document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');
    let submitButton = reviewForm.querySelector('button[type="submit"]');
    submitButton.disabled = false;

    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('reviewerName').value.trim();
        const reason = document.getElementById('reviewReason').value.trim();
        const rating = document.getElementById('reviewRating').value;

        if (!name || !reason || !rating) {
            alert('Please fill out all fields.');
            return;
        }

        addReview(name, reason, rating);
        reviewForm.reset();

        submitButton.disabled = true;
        setTimeout(() => {
            submitButton.disabled = false;
        }, 30000); // 30 seconds cooldown
    });

    function addReview(name, reason, rating) {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review__item';

        const reviewName = document.createElement('p');
        reviewName.className = 'review__name';
        reviewName.textContent = name;

        const reviewText = document.createElement('p');
        reviewText.className = 'review__text';
        reviewText.textContent = reason;

        const reviewRating = document.createElement('p');
        reviewRating.className = 'review__rating';
        reviewRating.innerHTML = 'Rating: ' + getStars(rating);

        reviewItem.appendChild(reviewName);
        reviewItem.appendChild(reviewText);
        reviewItem.appendChild(reviewRating);

        reviewsList.insertBefore(reviewItem, reviewsList.firstChild);
    }

    function getStars(rating) {
        let stars = '';
        for (let i = 0; i < rating; i++) {
            stars += '★';
        }
        for (let i = rating; i < 5; i++) {
            stars += '☆';
        }
        return stars;
    }
});

/*===== ADMIN PANEL PROTECTION =====*/
if (window.location.pathname.includes('adminpanel')) {
    const username = prompt('Enter Username:');
    const password = prompt('Enter Password:');
    if (username !== 'corbin' || password !== 'Corbinjames$11') {
        alert('Access Denied');
        window.location.href = '/';
    }
}
