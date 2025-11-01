// Mathematical Love Story - Interactive JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCharts();
    initializeHeroBackground();
    initializeParticles();
    
    // Initialize MathJax rendering with proper timing
    initializeMathJax();
    initializeMusic();
});

// Initialize and ensure MathJax renders properly
function initializeMathJax() {
    function renderMath() {
        if (window.MathJax && window.MathJax.Hub) {
            console.log('Rendering MathJax 2.7...');
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            MathJax.Hub.Queue(function() {
                console.log('MathJax 2.7 rendering complete!');
            });
        } else {
            console.log('MathJax 2.7 not ready, retrying...');
            setTimeout(renderMath, 500);
        }
    }
    
    // Try to render immediately if MathJax is already loaded
    if (window.MathJax && window.MathJax.Hub) {
        renderMath();
    } else {
        // Wait for MathJax to load
        window.addEventListener('load', () => {
            setTimeout(renderMath, 1000);
        });
    }
    
    // Also re-render when sections become visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    if (window.MathJax && window.MathJax.Hub) {
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub, entry.target]);
                    }
                }, 100);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.math-formula, .final-title, .final-text').forEach(el => {
        observer.observe(el);
    });
    
    // Add debug functionality
    const refreshButton = document.getElementById('refresh-math');
    if (refreshButton) {
        // Show button if MathJax has issues
        setTimeout(() => {
            const mathElements = document.querySelectorAll('.math-formula');
            let hasUnrenderedMath = false;
            mathElements.forEach(el => {
                if (el.innerHTML.includes('$$') && !el.querySelector('.MathJax_Display')) {
                    hasUnrenderedMath = true;
                }
            });
            
            if (hasUnrenderedMath) {
                refreshButton.style.display = 'inline-block';
            }
        }, 3000);
        
        refreshButton.addEventListener('click', () => {
            console.log('Manual MathJax 2.7 refresh triggered');
            if (window.MathJax && window.MathJax.Hub) {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                MathJax.Hub.Queue(function() {
                    console.log('Manual MathJax 2.7 refresh complete');
                    refreshButton.style.display = 'none';
                });
            }
        });
    }
}

// Function to handle background music
function initializeMusic() {
    const music = document.getElementById('bg-music');
    const muteBtn = document.getElementById('mute-btn');
    let isMusicPlaying = false;

    if (!music || !muteBtn) return;

    const playMusic = () => {
        if (!isMusicPlaying) {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isMusicPlaying = true;
                    muteBtn.textContent = '🎵';
                    // Remove event listener after first interaction
                    document.body.removeEventListener('click', playMusic);
                    document.body.removeEventListener('scroll', playMusic);
                }).catch(error => {
                    console.log('Autoplay was prevented. User interaction is needed.');
                    isMusicPlaying = false;
                });
            }
        }
    };

    // Browsers require user interaction to play audio
    document.body.addEventListener('click', playMusic);
    document.body.addEventListener('scroll', playMusic, { once: true });

    muteBtn.addEventListener('click', () => {
        if (music.muted) {
            music.muted = false;
            muteBtn.textContent = '🎵';
        } else {
            music.muted = true;
            muteBtn.textContent = '🔇';
        }
    });
}


// Initialize scroll-based animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-wrapper').forEach(el => {
        observer.observe(el);
    });
}

// Initialize mathematical visualizations
function initializeCharts() {
    // Chart 1: Simple Function (Linear)
    createSimpleFunctionChart();
    
    // Chart 2: Iterative Method
    createIterationChart();
    
    // Chart 3: Complex Function with Local Minima
    createComplexFunctionChart();
    
    // Chart 4: Optimization Process
    createOptimizationChart();
    
    // Chart 5: Gradient Descent
    createGradientDescentChart();
    
    // Chart 6: Convergence
    createConvergenceChart();
    
    // Chart 7: Love Function
    createLoveFunctionChart();
}

// Simple linear function
function createSimpleFunctionChart() {
    const ctx = document.getElementById('simple-function-chart');
    if (!ctx) return;
    
    const x = Array.from({length: 100}, (_, i) => (i - 50) / 10);
    const y = x.map(val => 2 * val + 1);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x.map(val => val.toFixed(1)),
            datasets: [{
                label: 'f(x) = 2x + 1',
                data: y,
                borderColor: '#ffd700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderWidth: 3,
                tension: 0.1,
                pointRadius: 0,
            }]
        },
        options: getChartOptions('Hàm tuyến tính - Nghiệm duy nhất')
    });
}

// Iterative method visualization
function createIterationChart() {
    const ctx = document.getElementById('iteration-chart');
    if (!ctx) return;
    
    // Newton-Raphson method example
    const iterations = [];
    let x = 3; // Starting point
    const target = Math.sqrt(2); // Finding sqrt(2)
    
    for (let i = 0; i <= 10; i++) {
        iterations.push({
            x: i,
            y: Math.abs(x - target),
            actual: x
        });
        if (i < 10) {
            x = 0.5 * (x + 2/x); // Newton's method for sqrt(2)
        }
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: iterations.map(p => p.x),
            datasets: [{
                label: 'Sai số |x - √2|',
                data: iterations.map(p => p.y),
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#ffd700',
                pointBorderColor: '#ff6b6b',
                pointRadius: 6,
                tension: 0.3
            }]
        },
        options: getChartOptions('Phương pháp Newton - Hội tụ nhanh')
    });
}

// Complex function with multiple local minima
function createComplexFunctionChart() {
    const ctx = document.getElementById('complex-function-chart');
    if (!ctx) return;
    
    const x = Array.from({length: 200}, (_, i) => (i - 100) / 20);
    const y = x.map(val => {
        // Complex function with multiple local minima
        return Math.sin(val) + 0.5 * Math.sin(3 * val) + 0.1 * val * val;
    });
    
    // Mark local minima
    const localMinima = [-2.8, 0.5, 3.2].map(xVal => ({
        x: xVal,
        y: Math.sin(xVal) + 0.5 * Math.sin(3 * xVal) + 0.1 * xVal * xVal
    }));
    
    // Mark global minimum
    const globalMin = { x: -2.8, y: -1.5 };
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: x.map(val => val.toFixed(1)),
            datasets: [
                {
                    label: 'f(x) = sin(x) + 0.5sin(3x) + 0.1x²',
                    data: y,
                    borderColor: '#4ecdc4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    borderWidth: 3,
                    pointRadius: 0,
                    tension: 0.2
                },
                {
                    label: 'Cực trị cục bộ',
                    data: Array(x.length).fill(null),
                    borderColor: '#ff8a8a',
                    backgroundColor: '#ff8a8a',
                    pointRadius: x.map((xVal, i) => 
                        localMinima.some(min => Math.abs(xVal - min.x) < 0.1) ? 8 : 0
                    ),
                    showLine: false
                },
                {
                    label: 'Cực trị toàn cục',
                    data: Array(x.length).fill(null),
                    borderColor: '#e85a71',
                    backgroundColor: '#e85a71',
                    pointRadius: x.map(xVal => Math.abs(xVal - globalMin.x) < 0.1 ? 10 : 0),
                    showLine: false
                }
            ]
        },
        options: getChartOptions('Hàm phức tạp - Nhiều cực trị')
    });
}

// Optimization process
function createOptimizationChart() {
    const ctx = document.getElementById('optimization-chart');
    if (!ctx) return;
    
    // Simulated loss function over epochs
    const epochs = Array.from({length: 50}, (_, i) => i);
    const loss = epochs.map(epoch => {
        // Exponential decay with noise
        const base = Math.exp(-epoch / 15) + 0.1;
        const noise = 0.05 * Math.random() * Math.sin(epoch / 3);
        return base + noise;
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: epochs,
            datasets: [{
                label: 'Hàm mất mát',
                data: loss,
                borderColor: '#a37fbf',
                backgroundColor: 'rgba(163, 127, 191, 0.1)',
                borderWidth: 3,
                pointRadius: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            ...getChartOptions('Quá trình học - Loss giảm dần'),
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: { color: '#4a4a4a' },
                    title: {
                        display: true,
                        text: 'Loss',
                        color: '#e85a71'
                    }
                },
                x: {
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: { color: '#4a4a4a' },
                    title: {
                        display: true,
                        text: 'Epochs',
                        color: '#e85a71'
                    }
                }
            }
        }
    });
}

// Gradient descent visualization
function createGradientDescentChart() {
    const ctx = document.getElementById('gradient-descent-chart');
    if (!ctx) return;
    
    // Multiple gradient descent paths
    const steps = 20;
    const paths = [
        { name: 'Learning rate cao', color: '#ff8a8a', lr: 0.3 },
        { name: 'Learning rate vừa', color: '#f7b977', lr: 0.1 },
        { name: 'Learning rate thấp', color: '#7aa5d2', lr: 0.05 }
    ];
    
    const datasets = paths.map(path => {
        const points = [];
        let x = 2.5; // Starting point
        
        for (let i = 0; i <= steps; i++) {
            const y = x * x - 4 * x + 3; // Quadratic function
            points.push({ x: i, y: y });
            
            if (i < steps) {
                const gradient = 2 * x - 4;
                x = x - path.lr * gradient;
            }
        }
        
        return {
            label: path.name,
            data: points.map(p => p.y),
            borderColor: path.color,
            backgroundColor: path.color + '20',
            borderWidth: 3,
            pointRadius: 4,
            tension: 0.3
        };
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: steps + 1}, (_, i) => i),
            datasets: datasets
        },
        options: getChartOptions('Gradient Descent - Tác động của learning rate')
    });
}

// Convergence visualization
function createConvergenceChart() {
    const ctx = document.getElementById('convergence-chart');
    if (!ctx) return;
    
    const time = Array.from({length: 100}, (_, i) => i / 10);
    
    const datasets = [
        {
            label: 'Khoảng cách tới em',
            data: time.map(t => Math.exp(-t/3) * Math.cos(t) + 0.1 + 0.05 * Math.random()),
            borderColor: '#e85a71',
            backgroundColor: 'rgba(232, 90, 113, 0.1)',
            borderWidth: 3
        },
        {
            label: 'Tình yêu tích lũy',
            data: time.map(t => 1 - Math.exp(-t/5) + 0.02 * Math.sin(t)),
            borderColor: '#f7b977',
            backgroundColor: 'rgba(247, 185, 119, 0.1)',
            borderWidth: 3
        }
    ];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: time.map(t => t.toFixed(1)),
            datasets: datasets
        },
        options: {
            ...getChartOptions('Hội tụ về tình yêu đích thực'),
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.2,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: { color: '#4a4a4a' }
                },
                x: {
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: { color: '#4a4a4a' },
                    title: {
                        display: true,
                        text: 'Thời gian (năm)',
                        color: '#e85a71'
                    }
                }
            }
        }
    });
}

// Love function - final chart
function createLoveFunctionChart() {
    const ctx = document.getElementById('love-function-chart');
    if (!ctx) return;
    
    const t = Array.from({length: 200}, (_, i) => i / 10);
    
    // Love function that grows over time
    const love = t.map(time => {
        const base = Math.log(time + 1) + 1;
        const growth = time / (time + 2);
        const heartbeat = 0.1 * Math.sin(8 * time);
        return base + growth + heartbeat;
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: t.map(time => time.toFixed(1)),
            datasets: [{
                label: 'f(t) = log(t+1) + t/(t+2) + 0.1sin(8t)',
                data: love,
                borderColor: '#e85a71',
                backgroundColor: 'rgba(232, 90, 113, 0.2)',
                borderWidth: 4,
                pointRadius: 0,
                tension: 0.2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#e85a71',
                        font: { size: 14 }
                    }
                },
                title: {
                    display: true,
                    text: 'Tình yêu theo thời gian ❤️',
                    color: '#e85a71',
                    font: { size: 18, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: { color: '#4a4a4a' },
                    title: {
                        display: true,
                        text: 'Mức độ yêu thương',
                        color: '#e85a71'
                    }
                },
                x: {
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: { color: '#4a4a4a' },
                    title: {
                        display: true,
                        text: 'Thời gian bên em',
                        color: '#e85a71'
                    }
                }
            },
            animation: {
                duration: 3000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // Re-run MathJax on this section to fix rendering issues after chart is drawn
    setTimeout(() => {
        if (window.MathJax && window.MathJax.Hub) {
            const finalSection = document.getElementById('final');
            if (finalSection) {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, finalSection]);
                console.log('Re-rendering MathJax for the final section.');
            }
        }
    }, 500); // Delay to allow chart to initialize
}

// Common chart options
function getChartOptions(title) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#4a4a4a',
                    font: { size: 12 }
                }
            },
            title: {
                display: true,
                text: title,
                color: '#e85a71',
                font: { size: 16, weight: 'bold' }
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: { color: '#4a4a4a' }
            },
            x: {
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: { color: '#4a4a4a' }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutCubic'
        }
    };
}

// Hero background animation
function initializeHeroBackground() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mathematical equation particles
    const equations = [
        'f(x) = ax² + bx + c',
        '∫f(x)dx',
        'lim x→∞',
        '∂f/∂x',
        'Σ(xi)',
        '√(x² + y²)',
        'e^(iπ) + 1 = 0',
        '∇f = 0'
    ];
    
    const particles = [];
    
    // Create particles
    for (let i = 0; i < 15; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            text: equations[Math.floor(Math.random() * equations.length)],
            opacity: Math.random() * 0.3 + 0.1,
            size: Math.random() * 20 + 15
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
            
            // Draw equation
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = '#e85a71';
            ctx.font = `${particle.size}px 'Lora', serif`;
            ctx.fillText(particle.text, particle.x, particle.y);
            ctx.restore();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize floating particles
function initializeParticles() {
    const particleContainer = document.body;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = Math.random() * 4 + 6 + 's';
        
        particleContainer.appendChild(particle);
    }
}

// Smooth scrolling for navigation
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add some interactivity to mathematical formulas
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('math-formula')) {
        e.target.style.transform = 'scale(1.05)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 200);
    }
});

// Easter egg: Konami code for special animation
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Special love animation
        createHeartRain();
        konamiCode = [];
    }
});

function createHeartRain() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = Math.random() * 30 + 20 + 'px';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

// Add fall animation for heart rain
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
