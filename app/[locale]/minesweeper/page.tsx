"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Flag, Mine, Skull, Smile, Trophy } from "@/app/components/icons";
import styles from "./page.module.css";

// ── Types ──────────────────────────────────────────────────────────────────

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
  isTriggered: boolean;
};

type GameStatus = "idle" | "playing" | "won" | "lost";

type Difficulty = { label: string; rows: number; cols: number; mines: number };

// ── Constants ──────────────────────────────────────────────────────────────

const DIFFICULTIES: Difficulty[] = [
  { label: "easy", rows: 9, cols: 9, mines: 10 },
  { label: "medium", rows: 16, cols: 16, mines: 40 },
];

// ── Pure game logic ────────────────────────────────────────────────────────

function emptyBoard(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
      isTriggered: false,
    }))
  );
}

function buildBoard(
  rows: number,
  cols: number,
  mines: number,
  safeR: number,
  safeC: number
): Cell[][] {
  const board = emptyBoard(rows, cols);

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (board[r][c].isMine) continue;
    if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
    board[r][c].isMine = true;
    placed++;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine)
            count++;
        }
      }
      board[r][c].adjacentMines = count;
    }
  }

  return board;
}

function floodReveal(
  board: Cell[][],
  rows: number,
  cols: number,
  startR: number,
  startC: number
): Cell[][] {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack = [[startR, startC]];

  while (stack.length > 0) {
    const [r, c] = stack.pop()!;
    if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
    const cell = next[r][c];
    if (cell.isRevealed || cell.isFlagged || cell.isMine) continue;
    cell.isRevealed = true;
    if (cell.adjacentMines === 0) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          if (dr !== 0 || dc !== 0) stack.push([r + dr, c + dc]);
    }
  }

  return next;
}

function isWon(board: Cell[][], rows: number, cols: number, mines: number): boolean {
  let revealed = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (board[r][c].isRevealed) revealed++;
  return revealed === rows * cols - mines;
}

// ── Component ──────────────────────────────────────────────────────────────

export default function MinesweeperPage() {
  const locale = useLocale();
  const t = useTranslations("minesweeper");
  const [diffIdx, setDiffIdx] = useState(0);
  const diff = DIFFICULTIES[diffIdx];

  const [board, setBoard] = useState<Cell[][]>(() => emptyBoard(diff.rows, diff.cols));
  const [status, setStatus] = useState<GameStatus>("idle");
  const [flagCount, setFlagCount] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => setTime((t) => Math.min(t + 1, 999)), 1000);
  }, [stopTimer]);

  useEffect(() => () => stopTimer(), [stopTimer]);

  const reset = useCallback(
    (d: Difficulty = diff) => {
      stopTimer();
      setBoard(emptyBoard(d.rows, d.cols));
      setStatus("idle");
      setFlagCount(0);
      setTime(0);
    },
    [diff, stopTimer]
  );

  function pickDifficulty(idx: number) {
    setDiffIdx(idx);
    reset(DIFFICULTIES[idx]);
  }

  const reveal = useCallback(
    (r: number, c: number) => {
      if (status === "won" || status === "lost") return;
      const cell = board[r][c];
      if (cell.isRevealed || cell.isFlagged) return;

      let current = board;

      if (status === "idle") {
        current = buildBoard(diff.rows, diff.cols, diff.mines, r, c);
        startTimer();
      }

      if (current[r][c].isMine) {
        const lost = current.map((row, ri) =>
          row.map((cell, ci) => ({
            ...cell,
            isRevealed: cell.isMine ? true : cell.isRevealed,
            isTriggered: ri === r && ci === c,
          }))
        );
        setBoard(lost);
        setStatus("lost");
        stopTimer();
        return;
      }

      const revealed = floodReveal(current, diff.rows, diff.cols, r, c);

      if (isWon(revealed, diff.rows, diff.cols, diff.mines)) {
        setBoard(revealed);
        setStatus("won");
        stopTimer();
      } else {
        setBoard(revealed);
        if (status === "idle") setStatus("playing");
      }
    },
    [board, status, diff, startTimer, stopTimer]
  );

  const flag = useCallback(
    (e: React.MouseEvent, r: number, c: number) => {
      e.preventDefault();
      if (status !== "playing") return;
      const cell = board[r][c];
      if (cell.isRevealed) return;
      const next = board.map((row) => row.map((c) => ({ ...c })));
      next[r][c].isFlagged = !next[r][c].isFlagged;
      setBoard(next);
      setFlagCount((fc) => (next[r][c].isFlagged ? fc + 1 : fc - 1));
    },
    [board, status]
  );

  const remaining = diff.mines - flagCount;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link href={`/${locale}`} className={styles.backLink}>
          {t("back")}
        </Link>
        <h1 className={styles.pageTitle}>{t("pageTitle")}</h1>
      </div>

      <div className={styles.game}>
        <div className={styles.statsBar}>
          <span className={styles.counter}>
            {String(Math.max(remaining, 0)).padStart(3, "0")}
          </span>
          <button className={styles.resetBtn} onClick={() => reset()} aria-label={t("reset")}>
            {status === "won" ? (
              <Trophy width={20} height={20} />
            ) : status === "lost" ? (
              <Skull width={20} height={20} />
            ) : (
              <Smile width={20} height={20} />
            )}
          </button>
          <span className={styles.counter}>{String(time).padStart(3, "0")}</span>
        </div>

        <div
          className={styles.grid}
          style={{ "--cols": diff.cols, "--rows": diff.rows } as React.CSSProperties}
        >
          {board.map((row, r) =>
            row.map((cell, c) => {
              const cls = [
                styles.cell,
                cell.isRevealed
                  ? cell.isMine
                    ? cell.isTriggered
                      ? styles.cellTriggered
                      : styles.cellMine
                    : styles.cellRevealed
                  : styles.cellHidden,
              ].join(" ");

              return (
                <button
                  key={`${r}-${c}`}
                  className={cls}
                  data-num={
                    cell.isRevealed && !cell.isMine && cell.adjacentMines > 0
                      ? cell.adjacentMines
                      : undefined
                  }
                  onClick={() => reveal(r, c)}
                  onContextMenu={(e) => flag(e, r, c)}
                >
                  {cell.isFlagged && !cell.isRevealed ? (
                    <Flag style={{ width: "55%", height: "55%" }} />
                  ) : cell.isRevealed && cell.isMine ? (
                    <Mine style={{ width: "65%", height: "65%" }} />
                  ) : cell.isRevealed && cell.adjacentMines > 0 ? (
                    cell.adjacentMines
                  ) : null}
                </button>
              );
            })
          )}
        </div>

        <div className={styles.difficulties}>
          {DIFFICULTIES.map((d, i) => (
            <button
              key={d.label}
              className={`${styles.diffBtn} ${i === diffIdx ? styles.diffActive : ""}`}
              onClick={() => pickDifficulty(i)}
            >
              {t(`difficulties.${d.label}`)}
            </button>
          ))}
        </div>

        {(status === "won" || status === "lost") && (
          <p className={`${styles.statusMsg} ${status === "won" ? styles.statusWon : styles.statusLost}`}>
            {status === "won" ? t("won") : t("lost")}
          </p>
        )}

        <p className={styles.hint}>{t("hint")}</p>
      </div>
    </div>
  );
}
