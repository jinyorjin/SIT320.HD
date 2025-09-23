import React, { useState, useEffect } from "react";
import styles from "./Slide.module.css";

const Slide = ({ slide, index, total, onPrev, onNext }) => {
  // 단일 image 또는 images 배열 모두 지원
  const images = slide.images || (slide.image ? [slide.image] : []);
  const captions = slide.captions || (slide.caption ? [slide.caption] : []);

  // 라이트박스 상태
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = (i) => {
    setLightboxIdx(i);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextLightbox = () => setLightboxIdx((i) => (i + 1) % images.length);
  const prevLightbox = () =>
    setLightboxIdx((i) => (i - 1 + images.length) % images.length);

  // ESC/Arrow 키 + 라이트박스 열렸을 때 배경 스크롤 잠금
  useEffect(() => {
    const onKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" && images.length > 1) nextLightbox();
      if (e.key === "ArrowLeft" && images.length > 1) prevLightbox();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, images.length]);

  return (
    <div className={styles.slide}>
      <h1 className={styles.title}>{slide.title}</h1>
      <h3 className={styles.subtitle}>{slide.subtitle}</h3>

      {typeof slide.content === "string" ? (
        <p className={styles.body}>{slide.content}</p>
      ) : (
        slide.content
      )}

      {slide.code && <pre className={styles.code}>{slide.code}</pre>}

      {images.length > 0 &&
        (images.length === 1 ? (
          <div className={styles.slideImage}>
            <div className={styles.imgBox}>
              <img
                src={images[0]}
                alt={`${slide.title}-1`}
                className={styles.img}
                onClick={() => openLightbox(0)}
              />
            </div>
            {captions[0] && <div className={styles.caption}>{captions[0]}</div>}
          </div>
        ) : (
          <div className={styles.slideGallery}>
            {images.map((src, i) => (
              <figure key={i} className={styles.slideFig}>
                <div className={styles.imgBox}>
                  <img
                    src={src}
                    alt={`${slide.title}-${i + 1}`}
                    className={styles.img}
                    onClick={() => openLightbox(i)}
                  />
                </div>
                {captions[i] && (
                  <figcaption className={styles.caption}>
                    {captions[i]}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        ))}

      <div className={styles.controls}>
        <button className={styles.btn} onClick={onPrev} disabled={index === 0}>
          Previous
        </button>
        <span className={styles.pager}>
          {index + 1} / {total}
        </span>
        <button
          className={styles.btn}
          onClick={onNext}
          disabled={index === total - 1}
        >
          Next
        </button>
      </div>

      {/* 진행바(선택) */}
      <div className={styles.progress}>
        <i
          className={styles.bar}
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closeLightbox}
        >
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.lightboxClose}
              onClick={closeLightbox}
              aria-label="Close"
            >
              ×
            </button>

            {images.length > 1 && (
              <>
                <button
                  className={`${styles.lightboxNav} ${styles.prev}`}
                  onClick={prevLightbox}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  className={`${styles.lightboxNav} ${styles.next}`}
                  onClick={nextLightbox}
                  aria-label="Next"
                >
                  ›
                </button>
              </>
            )}

            <img
              src={images[lightboxIdx]}
              alt={captions[lightboxIdx] || `preview-${lightboxIdx + 1}`}
              className={styles.lightboxImg}
            />
            {captions[lightboxIdx] && (
              <div className={styles.lightboxCaption}>
                {captions[lightboxIdx]}
              </div>
            )}
            {images.length > 1 && (
              <div className={styles.lightboxCount}>
                {lightboxIdx + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slide;
