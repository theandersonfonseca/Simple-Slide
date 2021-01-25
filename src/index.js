const slider = () => {
  const controls = document.querySelectorAll('[data-control]');
  const arrows = document.querySelectorAll('[data-arrow]');
  const imgs = document.querySelectorAll('[data-img]');

  const controlActiveClass = 'slider__control--active';
  const imgActiveClass = 'slider__img--active';

  let currentControl = controls[0];
  let currentImg = imgs[0];
  let timerToSwitchImgs = 6000;

  let nextControl, nextImg, previousControl, previousImg;

  const setCurrentStates = (directionOrFirstOrControl, control, img) => {
    switch (directionOrFirstOrControl) {
      case 'next':
        currentControl = nextControl || currentControl.nextElementSibling;
        currentImg = nextImg || currentImg.nextElementSibling;
        break;

      case 'previous':
        currentControl = previousControl;
        currentImg = previousImg;
        break;

      case 'first':
        currentControl = controls[0];
        currentImg = imgs[0];
        break;

      default:
        currentControl = control;
        currentImg = img;
        break;
    }
  };

  const handleFirstAndLastImgs = (firstOrLast) => {
    if (firstOrLast === 'last') {
      nextControl = controls[0];
      nextImg = imgs[0];
    } else {
      setCurrentStates('first');
    }

    previousControl = controls[controls.length - 1];
    previousImg = imgs[imgs.length - 1];
  };

  const updateNextAndPreviousStates = () => {
    nextControl = currentControl.nextElementSibling;
    nextImg = currentImg.nextElementSibling;
    previousControl = currentControl.previousElementSibling;
    previousImg = currentImg.previousElementSibling;
  };

  const handleArrowDirection = (direction) => {
    if (direction === 'next') {
      if (currentImg.dataset.img === '6') handleFirstAndLastImgs('last');
    } else {
      if (currentImg.dataset.img === '1') handleFirstAndLastImgs('first');
    }

    setCurrentStates(direction === 'next' ? 'next' : 'previous');

    updateNextAndPreviousStates();
  };

  const cleanImgs = () => {
    controls.forEach((c) => c.classList.remove(controlActiveClass));
    imgs.forEach((i) => i.classList.remove(imgActiveClass));
  };

  const handleTimeInterval = () => {
    cleanImgs();

    if (currentImg.dataset.img === '6') handleFirstAndLastImgs('last');

    setCurrentStates('next');

    currentControl.classList.add(controlActiveClass);
    currentImg.classList.add(imgActiveClass);

    updateNextAndPreviousStates();
  };

  let refreshTimeInterval = setInterval(handleTimeInterval, timerToSwitchImgs);

  const HandleArrows = (e) => {
    const arrowTarget = e.target;

    cleanImgs();
    clearInterval(refreshTimeInterval);

    arrowTarget.dataset.arrow === 'next'
      ? handleArrowDirection('next')
      : handleArrowDirection('previous');

    currentControl.classList.add(controlActiveClass);
    currentImg.classList.add(imgActiveClass);

    refreshTimeInterval = setInterval(handleTimeInterval, timerToSwitchImgs);
  };

  const handleControls = (e) => {
    const controlTarget = e.target;

    cleanImgs();
    clearInterval(refreshTimeInterval);

    const getImg = [...imgs].find(
      (img) => img.dataset.img === controlTarget.dataset.control
    );

    controlTarget.classList.add(controlActiveClass);
    getImg.classList.add(imgActiveClass);

    setCurrentStates('control', controlTarget, getImg);
    updateNextAndPreviousStates();

    refreshTimeInterval = setInterval(handleTimeInterval, timerToSwitchImgs);
  };

  const initGame = () => {
    controls.forEach((control) =>
      control.addEventListener('click', handleControls)
    );

    arrows.forEach((arrow) => arrow.addEventListener('click', HandleArrows));
  };

  initGame();
};

window.addEventListener('DOMContentLoaded', slider);
