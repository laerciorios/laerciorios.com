"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "@/app/components/icons";
import Typography from "@/app/components/Typography";
import styles from "./styles.module.css";

interface TalkCardProps {
  link: string;
  date: string;
  title: string;
  event: string;
  localization: string;
  description: string;
}

const CLOSE_DURATION = 150;

function extractYouTubeId(embedUrl: string): string {
  return embedUrl.split("/embed/")[1]?.split("?")[0] ?? "";
}

export default function TalkCard({
  link,
  date,
  title,
  event,
  localization,
  description,
}: TalkCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const videoId = extractYouTubeId(link);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  function close() {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, CLOSE_DURATION);
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) close();
  }

  return (
    <>
      <button
        className={styles.card}
        onClick={() => setIsOpen(true)}
        aria-label={title}
      >
        <div className={styles.thumbnailWrapper}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className={styles.thumbnail}
          />
          <span className={styles.playOverlay}>
            <Play className={styles.playIcon} />
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.metaRow}>
            <Typography variant="body1" className={styles.event}>
              {event}
            </Typography>
            <Typography variant="caption2" className={styles.date}>
              {date}
            </Typography>
          </div>
          <Typography variant="h4" as="h3" className={styles.title}>
            {title}
          </Typography>
          <Typography variant="caption1" className={styles.localization}>
            {localization}
          </Typography>
          <Typography variant="body2" className={styles.description}>
            {description}
          </Typography>
        </div>
      </button>

      {isOpen && (
        <div
          className={`${styles.backdrop} ${isClosing ? styles.backdropClosing : ""}`}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div
            ref={modalRef}
            className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
          >
            <div className={styles.closeRow}>
              <button
                className={styles.closeButton}
                onClick={close}
                aria-label="Close"
              >
                <X className={styles.closeIcon} />
              </button>
            </div>

            <div className={styles.iframeWrapper}>
              <iframe
                src={link}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.iframe}
              />
            </div>

            <div className={styles.modalContent}>
              <Typography variant="h2" as="h2" className={styles.modalTitle}>
                {title}
              </Typography>
              <div className={styles.metaRow}>
                <Typography variant="h4" as="p" className={styles.modalEvent}>
                  {event}
                </Typography>
                <Typography variant="body2" className={styles.date}>
                  {date}
                </Typography>
              </div>
              <Typography variant="body3" className={styles.localization}>
                {localization}
              </Typography>
              <Typography variant="body2" className={styles.description}>
                {description}
              </Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
