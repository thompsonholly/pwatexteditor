const butInstall = document.getElementById('buttonInstall');

/* how to install the PWA.  */


window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

// fires when the user clicks the "install" button.
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();


  window.deferredPrompt = null;

  butInstall.classList.toggle('hidden', true);

});

window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});
