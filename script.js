//Navigation bar Code
function toggleMenu() {
    var navLinks = document.querySelector('.nav-links');
    navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
}

//Navigation Bar Scroll Code
function smoothScroll(target) {
    var navLinks = document.querySelector('.nav-links');
    var menuIcon = document.querySelector('.menu-icon');

    if( "flex" === window.getComputedStyle(menuIcon).display ){
        navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
    }

    const targetElement = document.querySelector(target);
    let targetPosition = targetElement.offsetTop;

    if( target !== "#courses-section"){
        targetPosition -= 80;
    }
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Text Typing Animation Code Starts Here
function typeWithDelay(container, textToType) {
    return new Promise(resolve => {
        container.textContent = ''; // Clear existing text
        container.classList.add('typing');

        let index = 0;

        function typeCharacter() {
            container.textContent += textToType[index];
            index++;

            if (index < textToType.length) {
                setTimeout(typeCharacter, Math.random() * 200 + 50); // Adjust the speed here
            } else {
                container.classList.remove('typing');
                resolve(); // Resolve the promise when typing is complete
            }
        }

        typeCharacter();
    });
}

function typeName() {
    const textNameContainer = document.getElementById('name-text-container');
    const nameTextToType = "Mohit Parmar";

    return typeWithDelay(textNameContainer, nameTextToType);
}

function typeTitle() {
    const textTitleContainer = document.getElementById('title-text-container');
    const titleTextToType = "Software Engineer";

    return typeWithDelay(textTitleContainer, titleTextToType);
}

// Call typeName function first, then chain the typeTitle function
typeName().then(typeTitle);


// About Section text slide in code start here
document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
      const aboutMeSection = document.getElementById("about-me-section");
      const aboutMe = document.getElementById("about-me");
      const profilePicture = document.getElementById("profile-picture");

      // Check if the about me section is in the viewport
      const rect = aboutMeSection.getBoundingClientRect();
      const isInViewport = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;

      if (isInViewport) {
        aboutMe.style.opacity = 1;
        aboutMe.style.transform = "translateX(0)";
        profilePicture.style.transform = "translateX(0)";
      } else {
        aboutMe.style.opacity = 0;
        aboutMe.style.transform = "translateX(-500px)";
        profilePicture.style.transform = "translateX(300px)";
      }
    });
  });