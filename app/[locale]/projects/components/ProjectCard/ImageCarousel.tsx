"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "@/app/components/icons";
import styles from "./styles.module.css";

interface ImageCarouselProps {
  images: string[];
  projectTitle: string;
}

export default function ImageCarousel({ images, projectTitle }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <div className={styles.carouselWrapper}>
        <Image
          src={`/images/projects/${projectTitle}/${images[0]}`}
          alt={projectTitle}
          fill
          sizes="(max-width: 640px) 100vw, 260px"
          className={styles.carouselImage}
        />
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className={styles.carouselWrapper}>
      <Image
        src={`/images/projects/${projectTitle}/${images[index]}`}
        alt={`${projectTitle} screenshot ${index + 1}`}
        fill
        sizes="(max-width: 640px) 100vw, 260px"
        className={styles.carouselImage}
      />
      <button className={`${styles.carouselBtn} ${styles.carouselBtnLeft}`} onClick={prev} aria-label="Previous image">
        <ChevronLeft />
      </button>
      <button className={`${styles.carouselBtn} ${styles.carouselBtnRight}`} onClick={next} aria-label="Next image">
        <ChevronRight />
      </button>
    </div>
  );
}
