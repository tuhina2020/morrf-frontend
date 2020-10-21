import React, { useState, useEffect } from 'react';
// import Gradient from 'Assets/images/gradient.png';
const placeHolder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC0CAAAAABA/J3eAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkChQBOBmm/FVRAAABiElEQVR42u3Wx3EEMQxFwc0/rpX33nvvV2buKvwUdBgW1S+ELhDgZDqdS/PVQlqsltJytZJWq7W0Xm2kzWorbVc7abfaS/vVQTqsjtJxdZJOq7N0Xl2ky+oqXVc36ba6S/fVQ3qsntJz9ZJeq7f0nj6qWfWZvtJ39ZOGYZj8R44ZDhwei+nAgQMHDhw4cLTF4RuGA4fdgQMHDhw4HNrxOUwHDo/FdODAgQOHy4JjfA6PxXSYDhw4cOBwWUwHjvE5PBbTgQMHDhwuCw6PBQcOHDhw4OiAw78Dh8eCAwcOHDhw+HfgaIzDY8GBAwcOHDj8O0wHDhw4cODAgaM3Dt8w04EDBw4cOHD4d+DA0RiH3YEDBw4cOBxaHDjsDhw4cODA0QGHQ4sDh92BAwcOHDgcWhw4WuawO3DgwIEDh0OLA4fdgQMHDhw4OuBwaHHgsDtw4MCBA4dDiwNHyxx2Bw4cOHDgcGhx4LA7cODAgQNHBxwOLQ4cdgcOHDhw4HBoceBomcPuwIHjzxy/RpOlgLtM91cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMTAtMjBUMDE6NTY6MjUtMDQ6MDBVPpRjAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTEwLTIwVDAxOjU2OjI1LTA0OjAwJGMs3wAAAABJRU5ErkJggg==';
const LazyImage = ({ src, alt, placeHolderClass, imgClass }) => {
  const [imageSrc, setImageSrc] = useState();
  const [imageRef, setImageRef] = useState();
  const [ph, setph] = useState(true);

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          },
        );
        observer.observe(imageRef);
      } else {
        // Old browsers fallback
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      // on component unmount, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  const onLoad = event => {
    event.target.classList.add('loaded');
  };

  const onError = event => {
    event.target.classList.add('has-error');
  };

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      data-src={imageSrc}
      alt={alt}
      className={`${imageSrc !== src ? 'placeholder' : ''} ${imgClass}`}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default LazyImage;
