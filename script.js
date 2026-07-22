/* ============================================ */
/* PRELOADER - شاشة التحميل */
/* ============================================ */
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hide');
    }
});

/* ============================================ */
/* TYPED TEXT EFFECT - تأثير الكتابة التلقائية */
/* ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    const typedTextElement = document.getElementById('typedText');
    if (!typedTextElement) return;

    const phrases = [
        'AI & Machine Learning Student',
        'Data Analyst in the Making',
        'Passionate About Data & Insights',
        'Building Intelligent Solutions'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function typeEffect() {
        const fullText = phrases[phraseIndex];

        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        typedTextElement.textContent = currentText;

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === fullText.length) {
            typingSpeed = 2000; // وقفة قبل المسح
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // وقفة قبل كتابة الجملة الجديدة
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
});

/* ============================================ */
/* DARK / LIGHT MODE TOGGLE - تبديل الوضع المظلم */
/* ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    if (!themeToggle || !themeIcon) return;

    // التحقق من الوضع المخزن في localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    }

    function updateIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    themeToggle.addEventListener('click', function () {
        const currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme;

        if (currentTheme === 'dark') {
            newTheme = 'light';
        } else {
            newTheme = 'dark';
        }

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
});

/* ============================================ */
/* NAVBAR SCROLL EFFECT - تأثير التمرير */
/* ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

/* ============================================ */
/* MOBILE HAMBURGER MENU - قائمة الهاتف */
/* ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // إغلاق القائمة عند الضغط على أي رابط
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

/* ============================================ */
/* SCROLL TO TOP BUTTON - زر العودة للأعلى */
/* ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    const scrollTopBtn = document.getElementById('scrollTop');

    if (!scrollTopBtn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

/* ============================================ */
/* SKILLS ANIMATION ON SCROLL - تحريك المهارات */
/* ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    const skillBars = document.querySelectorAll('.skill-progress');

    if (!skillBars.length) return;

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const bar = entry.target;
                // نأخذ العرض من الـ inline style اللي موجود فعلاً
                const width = bar.style.width;
                // نخليه 0% ثم نرجعه للعرض الأصلي بعد قليل
                bar.style.width = '0%';
                setTimeout(function () {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    skillBars.forEach(function (bar) {
        observer.observe(bar);
    });
});

/* ============================================ */
/* STATS COUNTER ANIMATION - عد الأرقام */
/* ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    const statNumbers = document.querySelectorAll('.stat-number');

    if (!statNumbers.length) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                if (isNaN(target)) return;

                let current = 0;
                const increment = Math.ceil(target / 50);
                const duration = 1500;
                const stepTime = Math.floor(duration / 50);

                const timer = setInterval(function () {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target;
                        clearInterval(timer);
                    } else {
                        element.textContent = current;
                    }
                }, stepTime);

                observer.unobserve(element);
            }
        });
    }, observerOptions);

    statNumbers.forEach(function (num) {
        observer.observe(num);
    });
});

/* ============================================ */
/* SMOOTH SCROLL FOR ANCHOR LINKS - تمرير سلس */
/* ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

/* ============================================ */
/* ACTIVE NAV LINK ON SCROLL - تفعيل الرابط النشط */
/* ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        threshold: 0.4,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(function (section) {
        observer.observe(section);
    });
});

/* ============================================ */
/* CONSOLE WELCOME - ترحيب في الـ Console */
/* ============================================ */
console.log('%c Mohamed Ramy Portfolio ', 'background: #1e3a5f; color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
console.log('%c AI & Machine Learning Student | Beni Suef National University ', 'color: #4a7ab5; font-size: 14px;');
console.log('%c Thanks for visiting! 🚀', 'color: #8888aa; font-size: 12px;');