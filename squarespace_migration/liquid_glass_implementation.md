# Implementing Liquid Glass Effect in Squarespace

This guide explains how to add a liquid glass effect behind all content on your Squarespace site.

## What You'll Need

1. Access to your Squarespace site's design settings
2. The custom CSS file (`liquid_glass_effect.css`)
3. Access to add custom code injection

## Step 1: Add HTML for Bubble Elements

First, you need to add HTML elements for the floating bubbles. In Squarespace:

1. Go to **Settings** > **Advanced** > **Code Injection**
2. In the **Header** section, add the following code:

```html
<!-- Liquid Glass Bubbles -->
<div class="liquid-bubble bubble-1"></div>
<div class="liquid-bubble bubble-2"></div>
<div class="liquid-bubble bubble-3"></div>
<div class="liquid-bubble bubble-4"></div>
<div class="liquid-bubble bubble-5"></div>
```

## Step 2: Add the CSS

1. Go to **Design** > **Custom CSS**
2. Copy and paste the entire contents of the `liquid_glass_effect.css` file

## Step 3: Add JavaScript Animation

Add this JavaScript to enhance the bubble movements:

1. Go to **Settings** > **Advanced** > **Code Injection**
2. In the **Footer** section, add:

```html
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Randomly reposition bubbles on scroll
    window.addEventListener('scroll', function() {
      const scrollPos = window.scrollY;
      const bubbles = document.querySelectorAll('.liquid-bubble');
      
      bubbles.forEach((bubble, index) => {
        const randomX = Math.sin(scrollPos * 0.001 + index) * 20;
        const randomY = Math.cos(scrollPos * 0.002 + index) * 10;
        bubble.style.transform = `translate(${randomX}px, ${randomY}px)`;
      });
    });
    
    // Add slight movement on mouse movement
    document.addEventListener('mousemove', function(event) {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      const bubbles = document.querySelectorAll('.liquid-bubble');
      
      bubbles.forEach((bubble, index) => {
        const offsetX = (x - 0.5) * (index + 1) * 10;
        const offsetY = (y - 0.5) * (index + 1) * 5;
        bubble.style.marginLeft = `${offsetX}px`;
        bubble.style.marginTop = `${offsetY}px`;
      });
    });
  });
</script>
```

## Step 4: Add Background Gradient

To enhance the liquid glass effect, add a subtle background gradient:

1. Go to **Design** > **Site Styles**
2. Find the **Background** settings (this location varies by template)
3. Change the background to a subtle gradient:
   - From: rgba(245, 245, 245, 1)
   - To: rgba(255, 255, 255, 1)
   - Angle: 135 degrees

## Step 5: Adjust Section Background Opacity

For each section in your page editor:

1. Edit a section
2. Navigate to the **Background** tab
3. Set the opacity to around 80-90%
4. Enable the "blur" effect if available in your template

## Fine-Tuning the Effect

You can adjust these properties in the CSS to customize the look:

### For a more pronounced effect:
- Increase the blur value: `backdrop-filter: blur(15px);`
- Increase bubble size and animation distance
- Add more opacity to the glass: `background: rgba(255, 255, 255, 0.4);`

### For a more subtle effect:
- Reduce the blur value: `backdrop-filter: blur(5px);`
- Reduce bubble size and count
- Decrease opacity: `background: rgba(255, 255, 255, 0.15);`

## Troubleshooting

If the effect doesn't appear:

1. **Browser Support**: Check if your browser supports backdrop-filter
2. **Template Conflicts**: Some Squarespace templates may override these styles
3. **Z-index Issues**: Adjust z-index values if content appears behind the glass

## Adding Glass Effect to Specific Elements

If you want to target specific elements instead of all sections:

```css
/* Target specific blocks by their ID */
#block-xxxxx::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: -1;
}
```

Replace `#block-xxxxx` with the specific block ID from your Squarespace editor.

## Performance Considerations

The liquid glass effect uses CSS that may affect performance on older devices:
- backdrop-filter
- Multiple animated elements
- Complex shadows and gradients

For better performance on mobile, the CSS automatically reduces the effect on smaller screens.