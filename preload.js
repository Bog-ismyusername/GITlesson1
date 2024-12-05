document.addEventListener('DOMContentLoaded', function() {
    fetch('settings.json')
      .then(response => response.json())
      .then(settings => {
        const { speed, color, backgroundColor, size, duration, borderWidth, displayTime } = settings;
  
        const style = document.createElement('style');
        style.innerHTML = `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          body {
            margin: 0;
          }
        `;
        document.head.appendChild(style);
  
        const background = document.createElement('div');
        background.style.position = 'fixed';
        background.style.top = '0';
        background.style.left = '0';
        background.style.width = '100%';
        background.style.height = '100%';
        background.style.backgroundColor = backgroundColor;
        background.style.zIndex = '9998';
        document.body.appendChild(background);
  
        const preloader = document.createElement('div');
        preloader.style.width = `${size}px`;
        preloader.style.height = `${size}px`;
        preloader.style.border = `${borderWidth}px solid ${color}`;
        preloader.style.borderTop = `${borderWidth}px solid transparent`;
        preloader.style.borderRadius = '50%';
        preloader.style.animation = `spin ${speed}s linear infinite`;
        preloader.style.position = 'fixed';
        preloader.style.top = '50%';
        preloader.style.left = '50%';
        preloader.style.transform = 'translate(-50%, -50%)';
        preloader.style.zIndex = '9999';
  
        document.body.appendChild(preloader);
  
        setTimeout(() => {
          document.body.removeChild(preloader);
          document.body.removeChild(background);
        }, displayTime);
      })
      .catch(error => console.error('Error loading settings:', error));
  });