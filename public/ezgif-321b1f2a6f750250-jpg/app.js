// ==========================================================================
// Scroll Motion Engine Configuration
// ==========================================================================
const frameCount = 217;
const images = [];
let currentFrame = 0;
let targetFrame = 0;
let isPreloaded = false;

// Easing/Interpolation settings
let easingEnabled = true;
const easeFactor = 0.08; // Buttery smooth interpolation speed

// Playback settings
let isAutoplayActive = false;
const autoplaySpeed = 1.8; // Scroll speed in pixels per animation frame

// Display state
let displayMode = 'cover'; // 'cover' or 'contain'
let activeFilter = 'none';

// Dom Elements
const canvas = document.getElementById('scroll-canvas');
const ctx = canvas.getContext('2d');
const preloader = document.getElementById('preloader');
const loadPct = document.getElementById('load-pct');
const progressRingBar = document.getElementById('progress-ring-bar');
const loadingStatus = document.getElementById('loading-status');
const enterBtn = document.getElementById('enter-btn');
const hudPanel = document.getElementById('hud-panel');
const frameCounter = document.getElementById('frame-counter');
const frameScrubber = document.getElementById('frame-scrubber');

const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const filterBtn = document.getElementById('filter-btn');
const filterMenu = document.getElementById('filter-menu');
const modeBtn = document.getElementById('mode-btn');
const modeMenu = document.getElementById('mode-menu');
const easingBtn = document.getElementById('easing-btn');
const easingIndicator = document.getElementById('easing-indicator');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const slides = document.querySelectorAll('.slide');

// SVG Ring Circumference: 2 * PI * r (r=52) = 326.7
const ringCircumference = 326.7;

// Set up range on scrubber
frameScrubber.max = frameCount;

// ==========================================================================
// Preloading Engine
// ==========================================================================
function preloadImages() {
    let loadedCount = 0;
    
    // Generate image URLs: ezgif-frame-001.jpg to ezgif-frame-217.jpg
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const paddedIndex = String(i).padStart(3, '0');
        img.src = `ezgif-frame-${paddedIndex}.jpg`;
        
        img.onload = () => {
            loadedCount++;
            updateProgress(loadedCount);
        };
        
        img.onerror = () => {
            console.error(`Failed to load frame ${paddedIndex}`);
            // Count it as loaded to avoid blocking the preloader on network hiccups
            loadedCount++;
            updateProgress(loadedCount);
        };
        
        images.push(img);
    }
}

function updateProgress(loaded) {
    const percentage = Math.round((loaded / frameCount) * 100);
    loadPct.innerText = percentage;
    
    // Update SVG Stroke dash offset
    const offset = ringCircumference - (percentage / 100) * ringCircumference;
    progressRingBar.style.strokeDashoffset = offset;
    
    // Update text prompts dynamically
    if (percentage < 30) {
        loadingStatus.innerText = 'Initializing assets...';
    } else if (percentage < 60) {
        loadingStatus.innerText = 'Pre-rendering canvas layout...';
    } else if (percentage < 90) {
        loadingStatus.innerText = 'Syncing timeline frames...';
    } else if (percentage < 100) {
        loadingStatus.innerText = 'Finalizing presentation...';
    } else {
        loadingStatus.innerText = 'Assets ready.';
        revealEnterButton();
    }
}

function revealEnterButton() {
    isPreloaded = true;
    // Hide spinner rings, show button
    document.querySelector('.progress-ring-container').style.display = 'none';
    loadingStatus.style.display = 'none';
    enterBtn.classList.remove('hidden');
}

// Enter button handler
enterBtn.addEventListener('click', () => {
    // Fade out preloader overlay
    preloader.style.opacity = 0;
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 800);
    
    // Show UI elements
    hudPanel.classList.add('visible');
    
    // Enable page scrolling (was disabled by default via overflow in body on css if desired,
    // but here we just let scroll behavior execute).
    initApp();
});

// Start preloading immediately
preloadImages();

// ==========================================================================
// Main Canvas & Scroll Operations
// ==========================================================================
function initApp() {
    // Canvas Resizing
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Animation loop (handles easing)
    requestAnimationFrame(renderLoop);
    
    // Sync triggers for slides and HUD
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    // Set display size matching the window
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    
    // Set buffer size backed by device pixels for high-DPI displays
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    ctx.scale(dpr, dpr);
    
    // Redraw immediately
    if (images[Math.round(currentFrame)]) {
        drawFrame(images[Math.round(currentFrame)]);
    }
}

function drawFrame(img) {
    if (!img || !img.complete) return;
    
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;
    
    let drawWidth, drawHeight, x, y;
    
    if (displayMode === 'cover') {
        // Cover view crop calculation
        if (canvasRatio > imgRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            x = 0;
            y = (canvasHeight - drawHeight) / 2;
        } else {
            drawWidth = canvasHeight * imgRatio;
            drawHeight = canvasHeight;
            x = (canvasWidth - drawWidth) / 2;
            y = 0;
        }
    } else {
        // Fit/contain view letterbox calculation
        if (canvasRatio > imgRatio) {
            drawWidth = canvasHeight * imgRatio;
            drawHeight = canvasHeight;
            x = (canvasWidth - drawWidth) / 2;
            y = 0;
        } else {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            x = 0;
            y = (canvasHeight - drawHeight) / 2;
        }
    }
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
}

// Render loop running via requestAnimationFrame
function renderLoop() {
    // Apply interpolation/easing to target frame
    if (easingEnabled) {
        const diff = targetFrame - currentFrame;
        // Avoid infinite tiny fractions
        if (Math.abs(diff) > 0.01) {
            currentFrame += diff * easeFactor;
        } else {
            currentFrame = targetFrame;
        }
    } else {
        currentFrame = targetFrame;
    }
    
    // Clamp frame range
    const frameToDraw = Math.min(frameCount - 1, Math.max(0, Math.round(currentFrame)));
    
    // Draw on canvas
    if (images[frameToDraw]) {
        drawFrame(images[frameToDraw]);
    }
    
    // Update UI components
    updateUIElements(frameToDraw);
    
    requestAnimationFrame(renderLoop);
}

function handleScroll() {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    if (maxScroll <= 0) return;
    
    const scrollFraction = scrollTop / maxScroll;
    
    // Calculate target frame index
    targetFrame = Math.min(frameCount - 1, Math.max(0, scrollFraction * (frameCount - 1)));
    
    // Slide transition logic (check slide middle intersection)
    const triggerPoint = window.innerHeight * 0.5;
    slides.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            slide.classList.add('active-slide');
        } else {
            slide.classList.remove('active-slide');
        }
    });
}

function updateUIElements(frameIndex) {
    const frameNum = frameIndex + 1;
    // Format: e.g. "042 / 217"
    const paddedFrame = String(frameNum).padStart(3, '0');
    frameCounter.innerText = `${paddedFrame} / ${frameCount}`;
    
    // Update Scrubber slider if not actively scrubbing
    if (document.activeElement !== frameScrubber) {
        frameScrubber.value = frameNum;
    }
}

// ==========================================================================
// Interactive HUD Panel Controls
// ==========================================================================

// Autoplay Loop Function (Simulating natural scroll)
function autoplayLoop() {
    if (!isAutoplayActive) return;
    
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // Increment scroll
    window.scrollBy(0, autoplaySpeed);
    
    // Loop back to top if at end
    if (scrollTop >= maxScroll - 2) {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
    
    requestAnimationFrame(autoplayLoop);
}

// User-triggered manual scroll cancels autoplay
window.addEventListener('wheel', () => {
    if (isAutoplayActive) {
        toggleAutoplay(false);
    }
}, { passive: true });

window.addEventListener('touchmove', () => {
    if (isAutoplayActive) {
        toggleAutoplay(false);
    }
}, { passive: true });

function toggleAutoplay(shouldPlay) {
    isAutoplayActive = shouldPlay;
    if (isAutoplayActive) {
        playIcon.setAttribute('data-lucide', 'pause');
        playBtn.classList.add('active');
        lucide.createIcons(); // Redraw Lucide icon
        autoplayLoop();
    } else {
        playIcon.setAttribute('data-lucide', 'play');
        playBtn.classList.remove('active');
        lucide.createIcons(); // Redraw Lucide icon
    }
}

playBtn.addEventListener('click', () => {
    toggleAutoplay(!isAutoplayActive);
});

// Manual Scrubbing via range slider
frameScrubber.addEventListener('input', (e) => {
    // If playing, pause autoplay
    if (isAutoplayActive) {
        toggleAutoplay(false);
    }
    
    const targetVal = parseInt(e.target.value);
    const targetFraction = (targetVal - 1) / (frameCount - 1);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // Instantly scroll window to match slider
    window.scrollTo(0, targetFraction * maxScroll);
});

// Helper: scroll to top for replay button
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Dropdown utility toggles
function setupDropdown(triggerId, menuId, itemCallback) {
    const trigger = document.getElementById(triggerId);
    const menu = document.getElementById(menuId);
    
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other dropdowns first
        closeAllDropdowns();
        menu.classList.toggle('active');
    });
    
    menu.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
            item.classList.add('active');
            menu.classList.remove('active');
            
            // Fire callback
            itemCallback(item);
        });
    });
}

function closeAllDropdowns() {
    filterMenu.classList.remove('active');
    modeMenu.classList.remove('active');
}

document.addEventListener('click', closeAllDropdowns);

// Filter Selection logic
setupDropdown('filter-btn', 'filter-menu', (selectedItem) => {
    const filter = selectedItem.getAttribute('data-filter');
    const label = selectedItem.innerText;
    
    // Remove old classes, apply new
    canvas.className = '';
    canvas.classList.add(`filter-${filter}`);
    
    // Update button text
    filterBtn.querySelector('.dropdown-text').innerText = label;
});

// Display Scaling Mode logic
setupDropdown('mode-btn', 'mode-menu', (selectedItem) => {
    const mode = selectedItem.getAttribute('data-mode');
    const label = selectedItem.innerText.replace(' View', '');
    
    displayMode = mode;
    
    // Update button text and redesign
    modeBtn.querySelector('.dropdown-text').innerText = label;
    resizeCanvas();
});

// Easing Toggle logic
easingBtn.addEventListener('click', () => {
    easingEnabled = !easingEnabled;
    if (easingEnabled) {
        easingBtn.classList.add('active');
        easingIndicator.classList.add('active');
    } else {
        easingBtn.classList.remove('active');
        easingIndicator.classList.remove('active');
    }
});

// Fullscreen logic
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error enabling fullscreen: ${err.message}`);
        });
        fullscreenBtn.querySelector('i').setAttribute('data-lucide', 'shrink');
    } else {
        document.exitFullscreen();
        fullscreenBtn.querySelector('i').setAttribute('data-lucide', 'expand');
    }
    lucide.createIcons();
});

// Adjust fullscreen button icon if changed externally
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenBtn.querySelector('i').setAttribute('data-lucide', 'expand');
    } else {
        fullscreenBtn.querySelector('i').setAttribute('data-lucide', 'shrink');
    }
    lucide.createIcons();
});
