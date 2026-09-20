// JavaScript untuk Website SMAN 1 Yogyakarta

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const navList = document.querySelector('.nav-list');

mobileMenuBtn.addEventListener('click', function() {
    navList.classList.toggle('active');
    mobileMenuBtn.innerHTML = navList.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Dropdown Menu untuk Mobile
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.classList.toggle('active');
        }
    });
});

// Hero Slider
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    if (!slides.length) return;

    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.querySelector('.slide-video')?.pause();
    });
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    const activeSlide = slides[currentSlide];
    activeSlide.classList.add('active');
    activeSlide.querySelector('.slide-video')?.play().catch(() => {});
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Event Listeners untuk Slider
nextBtn?.addEventListener('click', function() {
    nextSlide();
    resetAutoSlide();
});

prevBtn?.addEventListener('click', function() {
    prevSlide();
    resetAutoSlide();
});

// Auto Slide
function startAutoSlide() {
    if (!slides.length) return;

    slideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Start Auto Slide
startAutoSlide();

// Pause Auto Slide on Hover
const heroSlider = document.querySelector('.hero-slider');

heroSlider?.addEventListener('mouseenter', function() {
    clearInterval(slideInterval);
});

heroSlider?.addEventListener('mouseleave', function() {
    startAutoSlide();
});

// Keyboard Navigation untuk Slider
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
    }
});

// Smooth Scroll untuk Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
const newsletterRecipient = 'your-email@gmail.com'; // Ganti dengan email tujuan Anda

if (newsletterForm) {
    newsletterForm.action = `https://formsubmit.co/${newsletterRecipient}`;
    newsletterForm.setAttribute('accept-charset', 'UTF-8');

    const hiddenSubject = document.createElement('input');
    hiddenSubject.type = 'hidden';
    hiddenSubject.name = '_subject';
    hiddenSubject.value = 'Newsletter SMA Garuda Bhakti Pertiwi';
    newsletterForm.appendChild(hiddenSubject);

    const hiddenCaptcha = document.createElement('input');
    hiddenCaptcha.type = 'hidden';
    hiddenCaptcha.name = '_captcha';
    hiddenCaptcha.value = 'false';
    newsletterForm.appendChild(hiddenCaptcha);

    const hiddenTemplate = document.createElement('input');
    hiddenTemplate.type = 'hidden';
    hiddenTemplate.name = '_template';
    hiddenTemplate.value = 'table';
    newsletterForm.appendChild(hiddenTemplate);

    newsletterForm.addEventListener('submit', function(e) {
        if (newsletterRecipient === 'your-email@gmail.com') {
            e.preventDefault();
            alert('Silakan ganti email penerima di script.js agar newsletter bisa dikirim ke alamat Anda.');
        }
    });
}

// Website Rating
const ratingForm = document.getElementById('ratingForm');
const ratingMessage = document.getElementById('ratingMessage');
const cancelRating = document.getElementById('cancelRating');
const savedRating = localStorage.getItem('websiteRating');

if (ratingForm) {
    if (savedRating) {
        const savedInput = ratingForm.querySelector(`input[value="${savedRating}"]`);
        if (savedInput) savedInput.checked = true;
    }

    ratingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const selectedRating = ratingForm.querySelector('input[name="rating"]:checked');
        if (!selectedRating) {
            ratingMessage.textContent = 'Silakan pilih jumlah bintang terlebih dahulu.';
            ratingMessage.style.color = '#c0392b';
            return;
        }

        localStorage.setItem('websiteRating', selectedRating.value);
        ratingMessage.style.color = '#218838';
        ratingMessage.textContent = `Terima kasih! Anda memberikan rating ${selectedRating.value} dari 5 bintang.`;
    });

    cancelRating?.addEventListener('click', function() {
        ratingForm.querySelectorAll('input[name="rating"]').forEach(input => {
            input.checked = false;
        });
        localStorage.removeItem('websiteRating');
        ratingMessage.style.color = '#666';
        ratingMessage.textContent = 'Penilaian dibatalkan.';
    });
}

// Scroll Animations menggunakan Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Menambahkan animasi scroll ke elemen
const animatedElements = document.querySelectorAll('.info-card, .news-card, .announcement-box, .agenda-box');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Sticky Navigation Background Change
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navigation');
    
    if (window.scrollY > 100) {
        nav.style.backgroundColor = '#2c3e50';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        nav.style.backgroundColor = '';
        nav.style.boxShadow = '';
    }
});

// Active Navigation Link berdasarkan Scroll Position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list > li > a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Update active link on scroll (hanya jika ada section dengan id)
if (document.querySelector('section[id]')) {
    window.addEventListener('scroll', updateActiveNavLink);
}

// Gallery Lightbox (jika ada elemen galeri)
const galleryImages = document.querySelectorAll('.gallery-item img');
if (galleryImages.length > 0) {
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${this.src}" alt="${this.alt}">
                    <button class="close-lightbox">&times;</button>
                </div>
            `;
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === this || e.target.className === 'close-lightbox') {
                    this.remove();
                }
            });
        });
    });
}

// Counter Animation untuk Quick Info
function animateCounters() {
    const counters = document.querySelectorAll('.info-card h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        let current = 0;
        const increment = target / 30;
        const duration = 1000;
        const stepTime = duration / 30;
        
        function updateCounter() {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current).toLocaleString() + '+';
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = target.toLocaleString() + '+';
            }
        }
        
        updateCounter();
    });
}

// Jalankan counter animation saat halaman dimuat
window.addEventListener('load', function() {
    setTimeout(animateCounters, 1000);
});

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTop';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});