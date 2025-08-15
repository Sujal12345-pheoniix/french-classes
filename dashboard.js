// Dashboard functionality
document.addEventListener('DOMContentLoaded', () => {
    // Animate progress bars on load
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    // Animate stat numbers
    const statNumbers = document.querySelectorAll('.stat-content h3');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const isDecimal = finalValue.includes('.');
        
        let targetValue;
        if (isPercentage) {
            targetValue = parseFloat(finalValue);
        } else if (isDecimal) {
            targetValue = parseFloat(finalValue);
        } else {
            targetValue = parseInt(finalValue);
        }
        
        animateNumber(stat, 0, targetValue, 2000, isPercentage, isDecimal);
    });

    function animateNumber(element, start, end, duration, isPercentage, isDecimal) {
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * progress;
            
            if (isPercentage) {
                element.textContent = Math.round(current) + '%';
            } else if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.round(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }

    // Activity item hover effects
    const activityItems = document.querySelectorAll('.activity-item, .upcoming-item');
    activityItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Resource card interactions
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.addEventListener('click', () => {
            const link = card.querySelector('a');
            if (link) {
                // Simulate resource access
                const resourceName = card.querySelector('h3').textContent;
                alert(`Accessing ${resourceName}... This feature would open the resource in a new window.`);
            }
        });
    });

    // Course actions
    const courseActions = document.querySelectorAll('.course-actions a');
    courseActions.forEach(action => {
        action.addEventListener('click', (e) => {
            e.preventDefault();
            
            const actionText = action.textContent.trim();
            if (actionText === 'Continue Learning') {
                alert('Redirecting to the next lesson...');
            } else if (actionText === 'View Schedule') {
                alert('Opening class schedule...');
            }
        });
    });

    // Profile avatar interaction
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) {
        profileAvatar.addEventListener('click', () => {
            alert('Profile settings would open here.');
        });
        
        profileAvatar.style.cursor = 'pointer';
    }

    // Dashboard welcome animation
    const welcomeContent = document.querySelector('.welcome-content');
    const userProfile = document.querySelector('.user-profile');
    
    if (welcomeContent) {
        welcomeContent.style.opacity = '0';
        welcomeContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            welcomeContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            welcomeContent.style.opacity = '1';
            welcomeContent.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (userProfile) {
        userProfile.style.opacity = '0';
        userProfile.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            userProfile.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            userProfile.style.opacity = '1';
            userProfile.style.transform = 'translateY(0)';
        }, 400);
    }

    // Stats cards animation
    const statCards = document.querySelectorAll('.dashboard-stats .stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 600 + (index * 100));
    });

    // Course card animation
    const courseCard = document.querySelector('.course-card');
    if (courseCard) {
        courseCard.style.opacity = '0';
        courseCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            courseCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            courseCard.style.opacity = '1';
            courseCard.style.transform = 'translateY(0)';
        }, 1000);
    }

    // Real-time updates simulation
    setInterval(() => {
        // Simulate real-time activity updates
        const activityTimes = document.querySelectorAll('.activity-time');
        activityTimes.forEach(time => {
            const currentText = time.textContent;
            if (currentText.includes('hours ago')) {
                const hours = parseInt(currentText);
                if (hours < 24) {
                    time.textContent = `${hours + 1} hours ago`;
                }
            }
        });
    }, 60000); // Update every minute

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + L to continue learning
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            const continueBtn = document.querySelector('.course-actions .btn-primary');
            if (continueBtn) {
                continueBtn.click();
            }
        }
        
        // Ctrl/Cmd + S to view schedule
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            const scheduleBtn = document.querySelector('.course-actions .btn-outline');
            if (scheduleBtn) {
                scheduleBtn.click();
            }
        }
    });

    // Progress tracking
    function updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressInfo = document.querySelector('.progress-info span:first-child');
        
        if (progressFill && progressInfo) {
            const currentProgress = 75; // This would come from backend
            const newProgress = Math.min(currentProgress + Math.random() * 5, 100);
            
            progressFill.style.width = newProgress + '%';
            progressInfo.textContent = `Progress: ${Math.round(newProgress)}%`;
        }
    }

    // Simulate progress updates every 30 seconds
    setInterval(updateProgress, 30000);

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Simulate notifications
    setTimeout(() => {
        showNotification('Welcome back! Your next class is in 2 hours.', 'info');
    }, 2000);

    // Dashboard refresh functionality
    const refreshBtn = document.createElement('button');
    refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
    refreshBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    refreshBtn.addEventListener('click', () => {
        refreshBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            refreshBtn.style.transform = 'rotate(0deg)';
            showNotification('Dashboard refreshed!', 'success');
        }, 1000);
    });
    
    refreshBtn.addEventListener('mouseenter', () => {
        refreshBtn.style.transform = 'scale(1.1)';
    });
    
    refreshBtn.addEventListener('mouseleave', () => {
        refreshBtn.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(refreshBtn);
});
