const copyButtons = document.querySelectorAll('[data-copy]');

function fallbackCopy(text) {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.append(area);
  area.select();
  const copied = document.execCommand('copy');
  area.remove();
  if (!copied) {
    throw new Error('Copy failed');
  }
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Clipboard API can be blocked; try the legacy path below.
    }
  }
  fallbackCopy(text);
}

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await copyText(button.dataset.copy);
      button.textContent = 'Copied!';
      button.classList.add('copied');
      setTimeout(() => {
        button.textContent = 'Copy';
        button.classList.remove('copied');
      }, 1600);
    } catch {
      button.textContent = 'Select manually';
    }
  });
});
