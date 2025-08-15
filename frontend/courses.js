// Course tab functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const courseSections = document.querySelectorAll('.courses-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Remove active class from all tabs and sections
            tabBtns.forEach(b => b.classList.remove('active'));
            courseSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            
            // Show corresponding section
            const targetSection = document.getElementById(`${category}-courses`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Course card hover effects
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate course cards on scroll
    const courseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    courseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        courseObserver.observe(card);
    });

    // Price animation
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        const originalText = price.textContent;
        price.addEventListener('mouseenter', () => {
            price.style.transform = 'scale(1.1)';
            price.style.color = '#c0392b';
        });
        
        price.addEventListener('mouseleave', () => {
            price.style.transform = 'scale(1)';
            price.style.color = '#e74c3c';
        });
    });

    // Featured badge animation
    const featuredBadges = document.querySelectorAll('.featured-badge');
    featuredBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'rotate(5deg) scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'rotate(0deg) scale(1)';
        });
    });

    // Course level badges
    const courseLevels = document.querySelectorAll('.course-level');
    courseLevels.forEach(level => {
        level.addEventListener('mouseenter', () => {
            level.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        
        level.addEventListener('mouseleave', () => {
            level.style.background = 'rgba(255, 255, 255, 0.2)';
        });
    });

    // Smooth scroll to course sections
    const courseLinks = document.querySelectorAll('a[href^="#"]');
    courseLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Course search functionality (if needed)
    const searchInput = document.querySelector('.course-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const courseCards = document.querySelectorAll('.course-card');
            
            courseCards.forEach(card => {
                const courseTitle = card.querySelector('h3').textContent.toLowerCase();
                const courseDescription = card.querySelector('p').textContent.toLowerCase();
                
                if (courseTitle.includes(searchTerm) || courseDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Course filtering by price
    const priceFilter = document.querySelector('.price-filter');
    if (priceFilter) {
        priceFilter.addEventListener('change', (e) => {
            const selectedPrice = e.target.value;
            const courseCards = document.querySelectorAll('.course-card');
            
            courseCards.forEach(card => {
                const priceElement = card.querySelector('.price');
                const price = parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
                
                switch(selectedPrice) {
                    case 'low':
                        card.style.display = price <= 3000 ? 'block' : 'none';
                        break;
                    case 'medium':
                        card.style.display = price > 3000 && price <= 6000 ? 'block' : 'none';
                        break;
                    case 'high':
                        card.style.display = price > 6000 ? 'block' : 'none';
                        break;
                    default:
                        card.style.display = 'block';
                }
            });
        });
    }

    // Course enrollment modal (if needed)
    const enrollButtons = document.querySelectorAll('.btn-primary');
    enrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.textContent.includes('Start Learning') || button.textContent.includes('Join Club') || button.textContent.includes('Book Session')) {
                e.preventDefault();
                
                // Show enrollment modal or redirect to trial page
                const courseTitle = button.closest('.course-card').querySelector('h3').textContent;
                const coursePrice = button.closest('.course-card').querySelector('.price').textContent;
                
                // You can implement a modal here or redirect to trial page
                window.location.href = 'trial.html';
            }
        });
    });

    // Course comparison functionality
    const compareCheckboxes = document.querySelectorAll('.compare-checkbox');
    if (compareCheckboxes.length > 0) {
        compareCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const checkedBoxes = document.querySelectorAll('.compare-checkbox:checked');
                
                if (checkedBoxes.length > 3) {
                    checkbox.checked = false;
                    alert('You can only compare up to 3 courses at a time.');
                }
            });
        });
    }

    // Course rating system
    const ratingStars = document.querySelectorAll('.rating-star');
    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            const courseCard = star.closest('.course-card');
            
            // Update rating display
            const ratingDisplay = courseCard.querySelector('.course-rating');
            if (ratingDisplay) {
                ratingDisplay.textContent = rating + '/5';
            }
            
            // Visual feedback
            ratingStars.forEach(s => {
                if (s.getAttribute('data-rating') <= rating) {
                    s.style.color = '#ffc107';
                } else {
                    s.style.color = '#e4e5e9';
                }
            });
        });
    });

    // Course progress tracking (for enrolled students)
    const progressBars = document.querySelectorAll('.course-progress');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
        
        // Animate progress bar
        setTimeout(() => {
            bar.style.transition = 'width 1s ease';
            bar.style.width = progress + '%';
        }, 500);
    });

    // Course schedule display
    const scheduleButtons = document.querySelectorAll('.schedule-btn');
    scheduleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const courseCard = button.closest('.course-card');
            const scheduleInfo = courseCard.querySelector('.schedule-info');
            
            if (scheduleInfo) {
                scheduleInfo.style.display = scheduleInfo.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    // Course testimonials carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }

    // Auto-rotate testimonials
    if (testimonialCards.length > 0) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Course FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('open');
                faq.querySelector('.faq-answer').style.maxHeight = '0';
            });
            
            // Open clicked item if it wasn't open
            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
