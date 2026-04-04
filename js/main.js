// Portfolio JavaScript - TODY Eugène Romario
// Version avec chargement des sections

$(document).ready(function() {
    // Charger toutes les sections
    function loadSections() {
        const sections = [
            { id: 'header', url: 'sections/header.html' },
            { id: 'hero', url: 'sections/hero.html' },
            { id: 'about', url: 'sections/about.html' },
            { id: 'skills', url: 'sections/skills.html' },
            { id: 'projects', url: 'sections/projects.html' },
            { id: 'contact', url: 'sections/contact.html' },
            { id: 'footer', url: 'sections/footer.html' }
        ];
        
        let loadedCount = 0;
        
        sections.forEach(section => {
            $(`#${section.id}`).load(section.url, function() {
                loadedCount++;
                if (loadedCount === sections.length) {
                    // Toutes les sections sont chargées, initialiser les fonctionnalités
                    initializeAll();
                }
            });
        });
    }
    
    function initializeAll() {
        // Navigation scroll effect
        function handleNavbarScroll() {
            const navbar = document.querySelector('.navbar');
            const scrollTop = document.getElementById('scrollTop');
            
            if (window.scrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
            
            if (window.scrollY > 300) {
                scrollTop?.classList.add('active');
            } else {
                scrollTop?.classList.remove('active');
            }
            
            // Update active nav link
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 100)) {
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
        
        // Scroll to top functionality
        const scrollTopBtn = document.getElementById('scrollTop');
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Animation on scroll
        function checkVisibility() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
        
        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const submitBtn = document.getElementById('submitBtn');
                const originalBtnText = submitBtn.innerHTML;
                
                // Validation
                let isValid = true;
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const subjectInput = document.getElementById('subject');
                const messageInput = document.getElementById('message');
                
                if (nameInput && !nameInput.value.trim()) { isValid = false; nameInput.classList.add('is-invalid'); }
                else if (nameInput) nameInput.classList.remove('is-invalid');
                
                if (emailInput && !validateEmail(emailInput.value)) { isValid = false; emailInput.classList.add('is-invalid'); }
                else if (emailInput) emailInput.classList.remove('is-invalid');
                
                if (subjectInput && !subjectInput.value.trim()) { isValid = false; subjectInput.classList.add('is-invalid'); }
                else if (subjectInput) subjectInput.classList.remove('is-invalid');
                
                if (messageInput && !messageInput.value.trim()) { isValid = false; messageInput.classList.add('is-invalid'); }
                else if (messageInput) messageInput.classList.remove('is-invalid');
                
                if (!isValid) {
                    showAlert('Veuillez remplir tous les champs correctement.', 'danger');
                    return;
                }
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
                
                // Simuler l'envoi (vous pouvez remplacer par un vrai fetch)
                setTimeout(() => {
                    showAlert('Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    contactForm.reset();
                }, 1500);
            });
        }
        
        function validateEmail(email) {
            return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
        }
        
        function showAlert(message, type = 'success') {
            const oldAlerts = document.querySelectorAll('.alert-message');
            oldAlerts.forEach(alert => alert.remove());
            
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert-message alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
            alertDiv.innerHTML = `
                <strong>${type === 'success' ? '✓ Succès!' : '⚠ Erreur!'}</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            document.body.appendChild(alertDiv);
            
            setTimeout(() => {
                if (alertDiv.parentNode) alertDiv.remove();
            }, 3000);
        }
        
        // Toggle project details
        const toggleButton = document.getElementById('toggleProjectDetails');
        const projectDetails = document.getElementById('projectDetails');
        
        if (toggleButton && projectDetails) {
            toggleButton.addEventListener('click', function() {
                if (projectDetails.style.display === 'none' || projectDetails.style.display === '') {
                    projectDetails.style.display = 'block';
                    toggleButton.innerHTML = '<i class="fas fa-chevron-up me-2"></i>Voir moins de détails';
                    projectDetails.style.opacity = '0';
                    projectDetails.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => { projectDetails.style.opacity = '1'; }, 10);
                    projectDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    projectDetails.style.opacity = '0';
                    setTimeout(() => {
                        projectDetails.style.display = 'none';
                        toggleButton.innerHTML = '<i class="fas fa-chevron-down me-2"></i>Voir plus de détails';
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 500);
                }
            });
        }
        
        // Toggle secondary project details
        document.querySelectorAll('.toggle-project-details').forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
                
                if (targetElement.style.display === 'none' || targetElement.style.display === '') {
                    targetElement.style.display = 'block';
                    this.innerHTML = '<i class="fas fa-chevron-up me-2"></i>Masquer les détails';
                    targetElement.style.opacity = '0';
                    targetElement.style.transform = 'translateY(20px)';
                    targetElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    setTimeout(() => {
                        targetElement.style.opacity = '1';
                        targetElement.style.transform = 'translateY(0)';
                    }, 10);
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    targetElement.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-chevron-down me-2"></i>Voir plus de détails';
                }
            });
        });
        
        // Modals
        const showAllBtn = document.getElementById('showAllScreenshots');
        if (showAllBtn && typeof bootstrap !== 'undefined') {
            showAllBtn.addEventListener('click', () => new bootstrap.Modal(document.getElementById('screenshotsModal')).show());
        }
        
        const showVoitureBtn = document.getElementById('showVoitureScreenshots');
        if (showVoitureBtn && typeof bootstrap !== 'undefined') {
            showVoitureBtn.addEventListener('click', () => new bootstrap.Modal(document.getElementById('voitureScreenshotsModal')).show());
        }
        
        // Image error handling
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                if (!this.hasAttribute('data-error-handled')) {
                    this.setAttribute('data-error-handled', 'true');
                    this.src = 'https://placehold.co/800x500/e2e8f0/3b82f6?text=Image+non+disponible';
                }
            });
        });
        
        // Event listeners
        window.addEventListener('scroll', handleNavbarScroll);
        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('load', checkVisibility);
        
        // Initial calls
        handleNavbarScroll();
        checkVisibility();
        
        console.log(`
         Portfolio de TODY Eugène Romario
         Contact: romarioeugene4@gmail.com
         Étudiant Master Professionnel - ENI
         Développé avec JavaScript & Bootstrap
        `);
    }
    
    // Démarrer le chargement
    loadSections();
});