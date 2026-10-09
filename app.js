/**
 * Mohammed Shuhaib — Dedicated Portfolio Hero Page
 * Clean, solid, premium page feel with zero tilt/video motion.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. High-Resolution Branded Poster Canvas Exporter
  // =========================================================================
  const downloadBtn = document.getElementById('download-poster-btn');
  const canvas = document.getElementById('poster-export-canvas');

  if (downloadBtn && canvas) {
    downloadBtn.addEventListener('click', async () => {
      const origText = downloadBtn.innerHTML;
      downloadBtn.innerHTML = `<span>Exporting 4K Poster...</span>`;
      downloadBtn.disabled = true;

      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = 'assets/hero-clean.jpg';

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        // 2x Retina supersampling (2048 x 1152)
        const scale = 2;
        const width = img.naturalWidth * scale;
        const height = img.naturalHeight * scale;

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Draw Base Clean Image
        ctx.drawImage(img, 0, 0, width, height);

        // Styling definitions matching original typography
        const redColor = '#D3121A';
        const darkPrimary = '#0E0E11';
        const darkSecondary = '#3F3F46';
        const darkRedAccent = '#7A0F14';

        // 1. Top-Left: Role & Quote
        ctx.font = `800 ${28 * scale}px "Plus Jakarta Sans", sans-serif`;
        ctx.fillStyle = redColor;
        ctx.fillText('AI CONTENT CREATOR', 48 * scale, 115 * scale);

        ctx.font = `800 ${32 * scale}px "Bebas Neue", "Impact", sans-serif`;
        ctx.fillStyle = darkSecondary;
        ctx.fillText('"CRAFTING CINEMATIC REALITIES', 48 * scale, 145 * scale);

        ctx.font = `900 ${32 * scale}px "Bebas Neue", "Impact", sans-serif`;
        ctx.fillStyle = darkPrimary;
        ctx.fillText('POWERED BY ARTIFICIAL INTELLIGENCE"', 48 * scale, 175 * scale);

        // 2. Bottom-Left: Specializations
        ctx.font = `900 ${28 * scale}px "Plus Jakarta Sans", sans-serif`;
        ctx.fillStyle = darkRedAccent;
        ctx.fillText('PROMPT ARCHITECT', 48 * scale, 385 * scale);
        ctx.fillText('GEN-AI ARTIST', 48 * scale, 412 * scale);

        // 3. Top-Right: Name
        ctx.textAlign = 'right';
        ctx.font = `800 ${28 * scale}px "Plus Jakarta Sans", sans-serif`;
        ctx.fillStyle = redColor;
        ctx.fillText('MOHAMMED SHUHAIB', (img.naturalWidth - 48) * scale, 125 * scale);

        // Export to Downloadable PNG
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = 'Mohammed_Shuhaib_AI_Creator_Official.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Official Branded Poster downloaded in high resolution (4K)!');
      } catch (err) {
        console.error('Poster export error:', err);
        showToast('Download started using direct asset.');
        const fallback = document.createElement('a');
        fallback.download = 'Mohammed_Shuhaib_Hero.jpg';
        fallback.href = 'assets/hero-clean.jpg';
        fallback.click();
      } finally {
        downloadBtn.innerHTML = origText;
        downloadBtn.disabled = false;
      }
    });
  }

  // =========================================================================
  // 2. Toast Notification & Copy Email
  // =========================================================================
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-msg');
    if (msgEl && message) msgEl.textContent = message;

    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  const copyButtons = document.querySelectorAll('.copy-btn, #copy-email-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const email = btn.getAttribute('data-email') || 'mohamedshuhaib233@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  // Universal Smooth scroll for internal hash links (Nav, Hero buttons, etc.)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // =========================================================================
  // 3. Featured Commercial AI Video Showcase Player Management
  // =========================================================================
  const projectVideos = document.querySelectorAll('.project-video');

  projectVideos.forEach(video => {
    const wrap = video.closest('.project-video-wrap');

    video.addEventListener('play', () => {
      // Mutual exclusion: pause any other playing video so sound never overlaps
      projectVideos.forEach(other => {
        if (other !== video && !other.paused) {
          other.pause();
        }
      });

      if (wrap) {
        wrap.classList.add('is-playing');
      }
    });

    video.addEventListener('pause', () => {
      if (wrap) {
        wrap.classList.remove('is-playing');
      }
    });

    video.addEventListener('ended', () => {
      if (wrap) {
        wrap.classList.remove('is-playing');
      }
    });
  });

});

