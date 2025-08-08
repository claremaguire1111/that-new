# Dark Liquid Glass Effect Implementation for Squarespace

This guide outlines how to implement a dark-themed liquid glass effect with purple accents throughout your Squarespace site, matching the updated design in the latest commit.

## Visual Elements of the Dark Liquid Glass Theme

1. **Dark Background** with subtle purple gradients
2. **Translucent Glass Panels** behind content sections
3. **Animated Liquid Bubbles** that float gently across the screen
4. **Twinkling Stars** in the background
5. **Purple Glow Effects** on text and interactive elements
6. **Mouse-Responsive Gradients** that subtly shift with cursor movement

## Implementation Steps

### Step 1: Change Squarespace Base Theme

1. Go to **Design** > **Site Styles**
2. Set the site background color to a dark color: `#050510`
3. Set text colors to white and light grays

### Step 2: Add Required HTML Elements

Go to **Settings** > **Advanced** > **Code Injection** and add this to the **Header**:

```html
<!-- Dark Liquid Glass Elements -->
<div class="liquid-bubble bubble-1"></div>
<div class="liquid-bubble bubble-2"></div>
<div class="liquid-bubble bubble-3"></div>
<div class="liquid-bubble bubble-4"></div>
<div class="liquid-bubble bubble-5"></div>

<!-- Stars Container -->
<div id="stars-container"></div>
```

### Step 3: Add CSS

Go to **Design** > **Custom CSS** and paste the entire contents of `dark_liquid_glass_effect.css`

### Step 4: Add JavaScript for Interactive Elements

Add this to the **Footer** section of **Code Injection**:

```html
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Create star elements
    const starsContainer = document.getElementById('stars-container');
    const numStars = 100;
    
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.opacity = Math.random() * 0.8;
      star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite ease-in-out`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      starsContainer.appendChild(star);
    }
    
    // Track mouse movement for gradient effects
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
      
      // Move bubbles slightly with mouse
      document.querySelectorAll('.liquid-bubble').forEach((bubble, index) => {
        const offsetX = (mouseX - 0.5) * (index + 1) * 15;
        const offsetY = (mouseY - 0.5) * (index + 1) * 10;
        const currentTransform = window.getComputedStyle(bubble).getPropertyValue('transform');
        
        if (currentTransform && currentTransform !== 'none') {
          bubble.style.transform = `${currentTransform} translate(${offsetX}px, ${offsetY}px)`;
        } else {
          bubble.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
      });
    });
    
    // Add subtle parallax scrolling effect
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      
      document.querySelectorAll('.liquid-bubble').forEach((bubble, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrollY * speed);
        bubble.style.marginTop = `${yPos}px`;
      });
    });
  });
</script>
```

## Customizing for Specific Sections

### Hero Section

For an enhanced hero section with extra glass effect:

```css
/* Add to Custom CSS */
.sqs-block-html:first-child {
  position: relative;
  padding: 100px 50px;
  border-radius: 16px;
  overflow: hidden;
}

.sqs-block-html:first-child::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  background: rgba(20, 20, 35, 0.4);
  border: 1px solid rgba(138, 43, 226, 0.3);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  z-index: -1;
}

.sqs-block-html:first-child h1 {
  font-size: 4rem;
  letter-spacing: -0.03em;
  line-height: 1.1;
  text-shadow: 0 0 30px rgba(138, 43, 226, 0.6) !important;
  margin-bottom: 25px;
}

.sqs-block-html:first-child p {
  font-size: 1.4rem;
  max-width: 650px;
  margin: 0 auto;
}
```

### Speaker Cards

For speaker cards with the translucent glass effect:

```css
/* Add to Custom CSS */
.summary-item-list .summary-item {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(20, 20, 35, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(138, 43, 226, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
}

.summary-item-list .summary-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(138, 43, 226, 0.2);
}

.summary-item-list .summary-item .summary-title {
  font-size: 1.375rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: white;
  text-shadow: 0 0 10px rgba(138, 43, 226, 0.3);
}

.summary-item-list .summary-item .summary-metadata-item {
  color: rgba(255, 255, 255, 0.7);
}
```

## Troubleshooting

### If Backdrop Filter Doesn't Work

Some browsers don't support backdrop-filter. Add this fallback:

```css
@supports not (backdrop-filter: blur(10px)) {
  .page-section::before,
  .header-wrapper::before,
  .footer-wrapper::before,
  .summary-item,
  .sqs-block-image .design-layout-card,
  .sqs-block-gallery .slide {
    background: rgba(20, 20, 35, 0.85) !important;
  }
}
```

### If Animations Are Too Resource-Intensive

For better performance on slower devices:

```css
@media (prefers-reduced-motion: reduce) {
  .liquid-bubble, .star {
    animation: none !important;
    transition: none !important;
  }
}
```

### Mobile Optimization

The CSS already includes mobile optimizations, but you can further adjust:

```css
@media screen and (max-width: 480px) {
  .sqs-block-html:first-child h1 {
    font-size: 2.5rem;
  }
  
  .sqs-block-html:first-child p {
    font-size: 1.1rem;
  }
  
  .star {
    display: none; /* Remove stars on smallest screens */
  }
}
```

## Final Notes

- The dark liquid glass effect works best with high-contrast, minimal imagery
- Consider using images with transparent backgrounds for a more integrated look
- Test on multiple devices to ensure the animations don't affect performance
- The purple accent color (`rgba(138, 43, 226, 0.3)`) can be adjusted to match your brand