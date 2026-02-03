document.addEventListener("DOMContentLoaded", function () {
    const roles = ["Student", "Web Developer", "Software Engineer", "Backend Developer"];
    let currentIndex = 0;
    let currentText = "";
    let isDeleting = false;
    const speed = 200;
    const typeDelay = 2000;

    function type() {
        const role = roles[currentIndex];
        if (isDeleting) {
            currentText = role.substring(0, currentText.length - 1);
        } else {
            currentText = role.substring(0, currentText.length + 1);
        }

        document.getElementById("changing-text").textContent = currentText;

        if (!isDeleting && currentText === role) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, typeDelay);
        } else if (isDeleting && currentText === "") {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % roles.length; 
            type();
        } else {
            setTimeout(type, isDeleting ? speed / 2 : speed);
        }
    }

    const sections = document.querySelectorAll('.header, .about, .projects, .contact');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible'); 
        }
      });
    }, options);

    sections.forEach(section => {
      section.classList.add('fade-in'); 
      observer.observe(section);
    });

    type(); 
  });

  function showTab(tabName) {
  const tabContents = document.querySelectorAll('.tab-content');
  const tabButtons = document.querySelectorAll('.tab-button');

  tabContents.forEach(content => {
    if (content.id === tabName + '-content') {
      content.style.display = 'block';
      setTimeout(() => content.classList.add('active')); 
    } else {
      content.classList.remove('active');
      setTimeout(() => content.style.display = 'none');
    }
  });

  tabButtons.forEach(button => button.classList.remove('active'));
  document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => showTab('about'));

function toggleDropdown(sectionId) {
  const section = document.getElementById(sectionId);
  const isCollapsed = section.style.display === "none";

  section.style.display = isCollapsed ? "block" : "none";
  
  const arrowIcon = section.previousElementSibling.querySelector('.arrow-icon');
  arrowIcon.style.transform = isCollapsed ? "rotate(90deg)" : "rotate(0deg)";
}

let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 13000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}

let runTimeOut;

let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)

function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

const form = document.getElementById("contact-form");
const responseMessage = document.getElementById("response-message");

const scriptURL = "https://script.google.com/macros/s/AKfycbyG3d4gImGOMeIxyBdLljDGCDnPL1YcHomBLneKEhJF_m2iCIEDS1e-2koOO5yhDk8/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.result === "success") {
      responseMessage.textContent = "Message sent successfully!";
      responseMessage.style.color = "green";
      form.reset();
    } else {
      throw new Error(result.error || "Something went wrong");
    }
  } catch (error) {
    responseMessage.textContent =
      "Failed to send the message. Please try again later.";
    responseMessage.style.color = "red";
    console.error("Error:", error);
  }
});

 document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true
        });
      }
    });
  });

  document.querySelector('.navbar-toggler').addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: true
      });
    }
  });

  window.addEventListener('scroll', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: true
      });
    }
  });

  const cursorDot = document.createElement('div');
  cursorDot.classList.add('cursor-dot');
  document.body.appendChild(cursorDot);
  document.addEventListener('mousemove', (event) => {
    requestAnimationFrame(() => {
      cursorDot.style.top = `${event.clientY}px`;
      cursorDot.style.left = `${event.clientX}px`;
    });
  });