$(document).ready(function() {
  const sectionsData = [
    {
      title: 'Redefining',
      highlight: 'UX Strategy',
      subtitle: 'and UI design',
      company: 'ABC 456',
      description: 'We are the best web development company in the world',
      linkText: 'View Case Study',
      images: [
        { src: './assets/pizza_box.png', class: 'image1' },
        { src: './assets/domi-img1.png', class: 'image2' },
        { src: './assets/ux-strategy-for-mobile-app-devlopment.png', class: 'image3' },
        { src: './assets/dominos-bread.png', class: 'image4' },
        { src: './assets/dominos-bread1.png', class: 'image5' }
      ],
      cssClass: 'section1'
    },
    {
      title: 'Powered By advance',
      highlight: '',
      subtitle: 'algorithms',
      company: 'ABC 345',
      description: 'We are the best web development company in the world',
      linkText: 'Coming Soon',
      images: [
        { src: './assets/nasa-fitness-tracking-mobile-app.png', class: 'image1' },
        { src: './assets/nasa-mobile-app.png', class: 'image2' },
        { src: './assets/measure-total-body-weight-through-fitness-app.png', class: 'image3' }
      ],
      cssClass: 'section2'
    },
    {
      title: 'The Next Big',
      highlight: 'Blockchain',
      subtitle: 'Revolution',
      company: 'ABC 234',
      description: 'We will be the best web development company in the world',
      linkText: 'Coming Soon',
      images: [
        { src: './assets/veme-blockchain-app-developed.png', class: 'image1' },
        { src: './assets/veme-app-ui-design.png', class: 'image2' }
      ],
      cssClass: 'section3'
    },
    {
      title: '',
      highlight: '25M+ Downloads',
      subtitle: 'an appstore & google playstore',
      company: 'ABC 123',
      description: 'We are the best web development company in the world',
      linkText: 'View Case Study',
      images: [
        { src: './assets/nexgtv-entertainment-mobile-app-development.png', class: 'image1' },
        { src: './assets/nexgtv-mobile-app-ui-design.png', class: 'image2' }
      ],
      cssClass: 'section4'
    },
    {
      title: 'Text Headline',
      highlight: 'Text Headline',
      subtitle: 'Footer Headline',
      company: 'ABC 123',
      description: 'We are the best web development company in the world',
      linkText: 'View Case Study',
      images: [
        { src: './assets/nexgtv-entertainment-mobile-app-development.png', class: 'image1' },
        { src: './assets/nexgtv-mobile-app-ui-design.png', class: 'image2' }
      ],
      cssClass: 'section5'
    },
    {
      title: 'Developing ERP Solution for',
      highlight: 'Text Headline',
      subtitle: 'in furniture industry',
      company: 'ABC 678',
      description: 'Best since 2017 We offer wide range of web and app development',
      linkText: 'View Case Study',
      images: [
        { src: './assets/erp-app-development-service.png', class: 'image1' }
      ],
      cssClass: 'section6'
    },
    {
      title: 'Biggest Classifieds',
      highlight: 'East Asia',
      subtitle: 'countries',
      company: 'ABC 23478',
      description: 'We are the best web development company in the world',
      linkText: 'Coming Soon',
      images: [
        { src: './assets/melltoo-img2.png', class: 'image1' },
        { src: './assets/melltoo-img1.png', class: 'image2' }
      ],
      cssClass: 'section7'
    }
  ];

  const container = document.getElementById('sections-container');
  const template = document.getElementById('section-template').content;

  sectionsData.forEach((section, index) => {
    const clone = document.importNode(template, true);
    clone.querySelector('.section').classList.add(section.cssClass);
    clone.querySelector('.section').id = `section${index + 1}`;
    clone.querySelector('h3').textContent = section.title;
    clone.querySelector('.highlight').textContent = section.highlight;
    clone.querySelector('h4').textContent = section.subtitle;
    clone.querySelector('.company-info h2').textContent = section.company;
    clone.querySelector('.company-info p').textContent = section.description;
    clone.querySelector('.case-study-link').textContent = section.linkText;

    const imageSection = clone.querySelector('.image-section');
    section.images.forEach(imageData => {
      const img = document.createElement('img');
      img.src = imageData.src;
      img.classList.add(imageData.class);
      imageSection.appendChild(img);
    });

    container.appendChild(clone);
  });

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const sections = gsap.utils.toArray('.section');
    const totalSections = sections.length;

    // Hide all sections except the first one initially
    gsap.set(sections, { opacity: 0 });
    gsap.set(sections[0], { opacity: 1 });

    // Function to handle section visibility based on scroll position
    function updateSectionVisibility() {
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const scrollY = window.scrollY || window.pageYOffset;
            const offset = window.innerHeight * 0.6; // Adjust this offset as needed

            if (scrollY >= sectionTop - offset && scrollY < sectionTop + section.clientHeight - offset) {
                gsap.to(section, { opacity: 1, duration: 0.5 });
            } else {
                gsap.to(section, { opacity: 0, duration: 0.5 });
            }
        });
    }

    // Initial check on page load
    updateSectionVisibility();

    // Update section visibility on scroll
    window.addEventListener('scroll', updateSectionVisibility);

    // Smooth scroll for anchor links
    $('.nav a').click(function(e) {
        e.preventDefault();
        const targetId = $(this).attr('href').substring(1);
        const targetSection = document.getElementById(targetId);
        gsap.to(window, { scrollTo: { y: targetSection, autoKill: false }, duration: 1 });
    });

  // Dot animation setup
  gsap.utils.toArray('.section').forEach((section, index) => {
    gsap.fromTo(section, {}, {
      scrollTrigger: {
        trigger: section,
        start: 'top center+=100',
        end: 'bottom center-=100',
        scrub: true,
        onEnter: () => updateProgress(index),
        onEnterBack: () => updateProgress(index)
      }
    });
  });

  // Progress bar and dots animation
  function updateProgress(index) {
    const progress = (index + 1) / sectionsData.length;
    const dashArray = progress * 1000;
    gsap.to('#Opaque_Ring', { strokeDasharray: `${dashArray}, 1000`, duration: 1 });

    // Update dots color
    gsap.to(`.dotsfill${index + 1}`, { fill: 'blue', duration: 1 });
  }

  // Initialize Owl Carousel for smaller screens
  function initializeOwl() {
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      margin: 10,
      nav: true,
      dots: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 1
        },
        1024: {
          items: 1
        }
      }
    });
  }

  // Destroy Owl Carousel on larger screens
  function destroyOwl() {
    const owl = $(".owl-carousel");
    owl.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
    owl.find('.owl-stage-outer').children().unwrap();
  }

  // Check screen size and initialize/destroy Owl Carousel
  function checkScreenSize() {
    if (window.innerWidth >= 768) {
      destroyOwl();
    } else {
      initializeOwl();
    }
  }

  // Initial check on page load
  checkScreenSize();
  // Check screen size on window resize
  $(window).resize(checkScreenSize);

  // Initial progress update to fill the first dot only
  updateProgress(0);
});