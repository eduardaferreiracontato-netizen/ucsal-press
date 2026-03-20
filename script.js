const tabs = document.querySelectorAll('[data-flow]');
const flows = document.querySelectorAll('.flow');
const forms = document.querySelectorAll('.submission-form');
const carousel = document.querySelector('.carousel');
const carouselButtons = document.querySelectorAll('[data-carousel]');
const videoModal = document.querySelector('.video-modal');
const videoOpen = document.querySelector('[data-video-open]');
const videoClose = document.querySelector('[data-video-close]');

for (const tab of tabs) {
  tab.addEventListener('click', () => {
    const selected = tab.dataset.flow;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });

    flows.forEach((flow) => {
      flow.classList.toggle('active', flow.id === selected);
    });

    document.getElementById(selected)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

for (const form of forms) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.querySelector('.form-message');

    if (!form.checkValidity()) {
      message.textContent = 'Por favor, preencha todos os campos obrigatórios e confirme o consentimento LGPD.';
      message.style.color = '#a11f1f';
      form.reportValidity();
      return;
    }

    const email = 'ucsalpress@ucsal.br';
    const type = form.dataset.formType;
    const subject = encodeURIComponent(`Submissão ${type} - UCSal Press`);
    const body = encodeURIComponent(
      'Olá, UCSal Press.%0D%0A%0D%0AEnvio meus dados iniciais por meio da landing page. Os anexos devem ser adicionados manualmente neste e-mail antes do envio final.%0D%0A'
    );

    message.textContent = 'Dados validados. Seu cliente de e-mail será aberto para envio à UCSal Press; lembre-se de anexar os arquivos.';
    message.style.color = '#0d4b8f';

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    if (window.dataLayer) {
      window.dataLayer.push({ event: 'submission_ready', submissionType: type });
    }
  });
}

for (const button of carouselButtons) {
  button.addEventListener('click', () => {
    if (!carousel) {
      return;
    }

    const direction = button.dataset.carousel === 'next' ? 1 : -1;
    carousel.scrollBy({ left: direction * 280, behavior: 'smooth' });
  });
}

if (videoOpen && videoModal) {
  videoOpen.addEventListener('click', () => {
    videoModal.showModal();
  });
}

if (videoClose && videoModal) {
  videoClose.addEventListener('click', () => {
    videoModal.close();
  });
}

if (videoModal) {
  videoModal.addEventListener('click', (event) => {
    const bounds = videoModal.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      videoModal.close();
    }
  });
}
