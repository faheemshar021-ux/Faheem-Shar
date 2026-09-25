document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? '×' : '☰';
    });
  }

  const filterButtons = document.querySelectorAll('.filter-button');
  const destinationCards = document.querySelectorAll('.destination-card[data-category]');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const selected = button.dataset.filter;
      destinationCards.forEach((card) => {
        card.classList.toggle('is-hidden', selected !== 'all' && card.dataset.category !== selected);
      });
    });
  });

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox img');
  const closeLightbox = () => lightbox?.classList.remove('open');
  document.querySelectorAll('.gallery-item img').forEach((image) => {
    image.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('open');
    });
  });
  document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });

  const bookingForm = document.querySelector('#booking-form');
  const successMessage = document.querySelector('.success-message');
  if (bookingForm && successMessage) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const requiredFields = bookingForm.querySelectorAll('[required]');
      let isValid = true;
      requiredFields.forEach((field) => {
        const error = field.parentElement.querySelector('.error');
        if (!field.value.trim() || (field.type === 'email' && !field.validity.valid)) {
          isValid = false;
          if (error) error.textContent = field.type === 'email' ? 'Please enter a valid email.' : 'This field is required.';
        } else if (error) {
          error.textContent = '';
        }
      });
      if (isValid) {
        const orderDetails = [
          `Name: ${bookingForm.elements.name.value}`,
          `Email: ${bookingForm.elements.email.value}`,
          `Phone: ${bookingForm.elements.phone.value}`,
          `Destination: ${bookingForm.elements.destination.value}`,
          `Travel date: ${bookingForm.elements.date.value}`,
          `Travellers: ${bookingForm.elements.travelers.value}`,
          `Message: ${bookingForm.elements.message.value || 'No message provided.'}`
        ].join('\n');
        window.location.href = `mailto:faheemshar021@gmail.com?subject=New%20trip%20booking%20request&body=${encodeURIComponent(orderDetails)}`;
        successMessage.classList.add('show');
        successMessage.textContent = 'Your email app is opening with the booking details addressed to us.';
        bookingForm.reset();
      }
    });
  }
});
