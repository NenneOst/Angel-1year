// 1. CINEMATIC LOADING SCREEN
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1500); 
    }, 2500); 
});

// 2. BACKGROUND MUSIC LOGIC
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '🎵 Play Our Song';
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '⏸ Pause Music';
    }
    isPlaying = !isPlaying;
});

// 3. LIVE TIME TOGETHER COUNTER
// Locked to June 13, 2025 at 21:57 Swedish time (UTC+2)
const startDate = new Date('2025-06-13T21:57:00+02:00');

function updateCounter() {
    const now = new Date();
    const difference = now - startDate;

    if (difference < 0) return; 

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}
updateCounter();
setInterval(updateCounter, 1000);


// 4. TRIVIA QUIZ PROGRESSION SYSTEM
function checkAnswer(button, isCorrect, sectionsToUnlock) {
    const card = button.closest('.quiz-card');
    const feedback = card.querySelector('.quiz-feedback');
    const allButtons = card.querySelectorAll('.choice-btn');

    if (card.classList.contains('passed')) return;

    if (isCorrect) {
        card.classList.add('passed');
        button.classList.add('correct');
        feedback.innerHTML = "Correct! Such a good girl! ❤️";
        
        allButtons.forEach(btn => btn.disabled = true);

        // Burst of hearts
        for(let i=0; i<15; i++) {
            setTimeout(createParticle, i * 80);
        }

        // Split the comma-separated list of IDs and unlock all of them
        const nextSectionIds = sectionsToUnlock.split(',');
        
        nextSectionIds.forEach(id => {
            const section = document.getElementById(id.trim());
            if (section) {
                section.classList.add('unlocked-animation');
            }
        });

        // Smoothly scroll down to the first newly unlocked section
        setTimeout(() => {
            const firstUnlockedId = nextSectionIds[0].trim();
            document.getElementById(firstUnlockedId).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1200);

    } else {
        button.classList.add('wrong');
        card.classList.add('shake');
        
        const wrongMessages = [
            "Hmm... are you sure? Guess again, my Puppy!",
            "Wrong answer! We are playing dbd for 1h for every wrong u get from now on.",
            "Think harder u cutie!",
            "Incorrect!"
        ];
        feedback.innerHTML = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];

        setTimeout(() => {
            card.classList.remove('shake');
            button.classList.remove('wrong');
        }, 800);
    }
}

// 5. INTERACTIVE LOVE LETTER TOGGLE
function toggleLetter() {
    const envelope = document.getElementById('envelope');
    envelope.classList.toggle('open');
}

// 6. SMOOTH SCROLL REVEAL ANIMATIONS
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 120; 

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); 

// 7. CINEMATIC SLIDESHOW
let slideIndex = 0;
let slideInterval;
const slides = document.getElementsByClassName("slide");

function showSlides(n) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    if (n >= slides.length) { slideIndex = 0; }    
    if (n < 0) { slideIndex = slides.length - 1; }
    if(slides.length > 0) slides[slideIndex].style.display = "block";  
}

function changeSlide(n) {
    clearInterval(slideInterval); 
    slideIndex += n;
    showSlides(slideIndex);
    startAutoplay(); 
}

function startAutoplay() {
    slideInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000); 
}

if (slides.length > 0) {
    showSlides(slideIndex);
    startAutoplay();
}

// 8. ADVANCED FLOATING PARTICLES
const particlesContainer = document.getElementById('particles-container');

function createParticle() {
    if (!particlesContainer) return;
    const particle = document.createElement('div');
    particle.classList.add('floating-heart');
    
    const isHeart = Math.random() > 0.3; 
    particle.innerHTML = isHeart ? '❤️' : '✨';
    
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = Math.random() * 5 + 5 + 's'; 
    particle.style.fontSize = Math.random() * 15 + 10 + 'px'; 
    
    if (parseFloat(particle.style.fontSize) < 15) {
        particle.style.filter = 'blur(2px)';
        particle.style.opacity = '0.4';
    }

    particlesContainer.appendChild(particle);
    setTimeout(() => { particle.remove(); }, 10000); 
}

setInterval(createParticle, 300);