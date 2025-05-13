// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ========== EVENT HANDLING SECTION ==========

    // Button click event
    const changeButton = document.getElementById('change-button');
    const statusDisplay = document.getElementById('status-display');
    const statusMessages = ['STANDBY', 'LAUNCHING', 'IN ORBIT', 'MISSION COMPLETE'];
    let statusIndex = 0;
    
    changeButton.addEventListener('click', function() {
        statusIndex = (statusIndex + 1) % statusMessages.length;
        statusDisplay.textContent = `Mission Status: ${statusMessages[statusIndex]}`;
        
        // Change background color based on status
        const colors = ['#f0f0f0', '#ffedd8', '#d0f0e0', '#d8e8ff'];
        statusDisplay.style.backgroundColor = colors[statusIndex];
    });

    // Hover effect
    const hoverArea = document.getElementById('hover-area');
    
    hoverArea.addEventListener('mouseenter', function() {
        this.textContent = '🚀 Rocket boosters engaged!';
        this.classList.add('glow-effect');
    });
    
    hoverArea.addEventListener('mouseleave', function() {
        this.textContent = 'Hover over me for a surprise!';
        this.classList.remove('glow-effect');
    });

    // Keypress detection
    const keypressDisplay = document.getElementById('keypress-display');
    
    document.addEventListener('keydown', function(event) {
        keypressDisplay.textContent = `Key Pressed: ${event.key} (Code: ${event.code})`;
        keypressDisplay.style.backgroundColor = getRandomColor();
        
        // Easter egg: Konami code starter
        if (event.code === 'ArrowUp') {
            keypressDisplay.textContent += ' - Konami code starting?';
        }
    });

    // Bonus: Secret action (double-click)
    const secretButton = document.getElementById('secret-button');
    
    secretButton.addEventListener('dblclick', function() {
        // Toggle dark mode
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            this.textContent = 'Secret Command: Return to Light Mode';
            
            // Add shooting stars animation to the background
            createShootingStars();
        } else {
            this.textContent = 'Secret Command (Double-Click Me)';
            
            // Remove shooting stars
            removeShootingStars();
        }
    });

    // ========== INTERACTIVE ELEMENTS SECTION ==========

    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show the corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Image Slideshow
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    let currentSlide = 0;
    
    // Initialize the first slide
    slides[currentSlide].classList.add('active');
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Show the selected slide
        slides[index].classList.add('active');
    }
    
    prevButton.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    
    nextButton.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    // Auto-advance slides every 3 seconds
    setInterval(function() {
        if (!document.hidden) { // Only advance if the page is visible
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
    }, 3000);

    // ========== FORM VALIDATION SECTION ==========

    const spaceForm = document.getElementById('space-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const missionInput = document.getElementById('mission');
    
    const nameValidation = document.getElementById('name-validation');
    const emailValidation = document.getElementById('email-validation');
    const passwordValidation = document.getElementById('password-validation');
    const missionValidation = document.getElementById('mission-validation');
    
    // Real-time validation for name
    nameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            nameValidation.textContent = 'Name is required';
            nameValidation.className = 'validation-message error';
        } else if (this.value.trim().length < 2) {
            nameValidation.textContent = 'Name must be at least 2 characters';
            nameValidation.className = 'validation-message error';
        } else {
            nameValidation.textContent = '✓ Looks good!';
            nameValidation.className = 'validation-message success';
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value.trim() === '') {
            emailValidation.textContent = 'Email is required';
            emailValidation.className = 'validation-message error';
        } else if (!emailRegex.test(this.value)) {
            emailValidation.textContent = 'Please enter a valid email address';
            emailValidation.className = 'validation-message error';
        } else {
            emailValidation.textContent = '✓ Valid email format';
            emailValidation.className = 'validation-message success';
        }
    });
    
    // Real-time validation for password
    passwordInput.addEventListener('input', function() {
        if (this.value === '') {
            passwordValidation.textContent = 'Password is required';
            passwordValidation.className = 'validation-message error';
        } else if (this.value.length < 8) {
            passwordValidation.textContent = 'Password must be at least 8 characters';
            passwordValidation.className = 'validation-message error';
        } else if (!/[A-Z]/.test(this.value)) {
            passwordValidation.textContent = 'Password must contain at least one uppercase letter';
            passwordValidation.className = 'validation-message error';
        } else if (!/[0-9]/.test(this.value)) {
            passwordValidation.textContent = 'Password must contain at least one number';
            passwordValidation.className = 'validation-message error';
        } else {
            passwordValidation.textContent = '✓ Strong password';
            passwordValidation.className = 'validation-message success';
        }
    });
    
    // Real-time validation for mission selection
    missionInput.addEventListener('change', function() {
        if (this.value === '') {
            missionValidation.textContent = 'Please select a mission';
            missionValidation.className = 'validation-message error';
        } else {
            missionValidation.textContent = `✓ ${this.options[this.selectedIndex].text} selected`;
            missionValidation.className = 'validation-message success';
        }
    });
    
    // Form submission
    spaceForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Check if all validations pass
        const isNameValid = nameInput.value.trim() !== '' && nameInput.value.trim().length >= 2;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        const isPasswordValid = passwordInput.value.length >= 8 && 
                               /[A-Z]/.test(passwordInput.value) && 
                               /[0-9]/.test(passwordInput.value);
        const isMissionValid = missionInput.value !== '';
        
        if (isNameValid && isEmailValid && isPasswordValid && isMissionValid) {
            // Show success message
            document.getElementById('form-success').classList.remove('hidden');
            spaceForm.classList.add('hidden');
            
            // Simulate sending data to server
            console.log('Form submitted with:', {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                mission: missionInput.value
            });
        } else {
            // Trigger validation on all fields
            nameInput.dispatchEvent(new Event('input'));
            emailInput.dispatchEvent(new Event('input'));
            passwordInput.dispatchEvent(new Event('input'));
            missionInput.dispatchEvent(new Event('change'));
        }
    });

    // ========== HELPER FUNCTIONS ==========

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function createShootingStars() {
        // Create a container for shooting stars
        const starsContainer = document.createElement('div');
        starsContainer.id = 'shooting-stars';
        starsContainer.style.position = 'fixed';
        starsContainer.style.top = '0';
        starsContainer.style.left = '0';
        starsContainer.style.width = '100%';
        starsContainer.style.height = '100%';
        starsContainer.style.pointerEvents = 'none';
        starsContainer.style.zIndex = '-1';
        document.body.appendChild(starsContainer);
        
        // Create 5 shooting stars
        for (let i = 0; i < 5; i++) {
            createStar(starsContainer);
        }
        
        // Create a new star every 2 seconds
        window.shootingStarsInterval = setInterval(() => {
            createStar(starsContainer);
        }, 2000);
    }

    function createStar(container) {
        const star = document.createElement('div');
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight / 3; // Start in top third
        const size = Math.random() * 3 + 1;
        
        star.style.position = 'absolute';
        star.style.left = startX + 'px';
        star.style.top = startY + 'px';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.boxShadow = '0 0 ' + size*2 + 'px white';
        
        container.appendChild(star);
        
        // Animate the star
        const duration = Math.random() * 3000 + 2000; // 2-5 seconds
        const endX = startX + (Math.random() * 300 - 150);
        const endY = startY + Math.random() * window.innerHeight; // Move downward
        
        star.animate([
            { left: startX + 'px', top: startY + 'px', opacity: 1 },
            { left: endX + 'px', top: endY + 'px', opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear',
            fill: 'forwards'
        }).onfinish = () => {
            star.remove();
        };
    }

    function removeShootingStars() {
        clearInterval(window.shootingStarsInterval);
        const starsContainer = document.getElementById('shooting-stars');
        if (starsContainer) {
            starsContainer.remove();
        }
    }
});