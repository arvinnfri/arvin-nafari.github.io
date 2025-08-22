// منوی موبایل
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// اسلایدر
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  let currentSlide = 0;

  // ایجاد نقاط برای اسلایدر
  const createDots = () => {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dot" data-slide="${i}"></button>`
      );
    });
  };

  // فعال کردن اسلاید
  const activateSlide = (slide) => {
    slides.forEach((s) => s.classList.remove('active'));
    slides[slide].classList.add('active');

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot) => dot.classList.remove('active'));
    dots[slide].classList.add('active');
  };

  // اسلاید بعدی
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    activateSlide(currentSlide);
  };

  // اسلاید قبلی
  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    activateSlide(currentSlide);
  };

  // شروع اسلایدر
  const init = () => {
    createDots();
    activateSlide(0);

    // اتوماتیک چرخیدن اسلایدر
    let sliderInterval = setInterval(nextSlide, 5000);

    // توقف اسلایدر هنگام هاور
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(sliderInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
      sliderInterval = setInterval(nextSlide, 5000);
    });

    // کنترل‌های اسلایدر
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // کلیک روی نقاط
    dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('dot')) {
        currentSlide = +e.target.dataset.slide;
        activateSlide(currentSlide);
      }
    });
  };

  init();
};

// شمارنده آمار
const counter = () => {
  const counters = document.querySelectorAll('.count');
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
};

// دکمه بازگشت به بالا
const backToTop = () => {
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// اجرای تمام توابع پس از لود صفحه
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.hero-slider')) {
    slider();
  }

  if (document.querySelector('.count')) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.count').forEach((counter) => {
      observer.observe(counter);
    });
  }

  backToTop();
});