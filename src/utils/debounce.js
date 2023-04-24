const debounce = (func, wait) => {
  let timeout;

  return function (...args) {
    const context = this;

    const later = () => {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default debounce;