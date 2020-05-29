export function scrollIt(element) {
  element.scrollIntoView({ behavior: 'smooth' });
}

export function scrollTo({ top = 0, left = 0 }) {
  window.scrollTo({
    top,
    left,
    behavior: 'smooth',
  });
}
