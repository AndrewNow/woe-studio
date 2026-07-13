import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./MotionFilterBar.module.scss";

const FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "commercials", label: "Commercials" },
  { id: "music-videos", label: "Music Videos" },
] as const;

type Shape = "idle" | "active";
type Pt = [number, number];

const VB_W = 200;
const VB_H = 40;

const FILL_IDLE = "rgba(70, 70, 70, 0.22)";
const FILL_SOLID = "rgb(239, 237, 237)";

function sub(a: Pt, b: Pt): Pt {
  return [a[0] - b[0], a[1] - b[1]];
}

function add(a: Pt, b: Pt): Pt {
  return [a[0] + b[0], a[1] + b[1]];
}

function scale(a: Pt, s: number): Pt {
  return [a[0] * s, a[1] * s];
}

function dist(a: Pt, b: Pt): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.hypot(dx, dy);
}

function normalize(a: Pt): Pt {
  const len = Math.hypot(a[0], a[1]) || 1;
  return [a[0] / len, a[1] / len];
}

/** Full clockwise ring from a left-cap polyline (top → bottom), mirrored on x. */
function ringFromLeftCap(leftCap: Pt[]): Pt[] {
  const n = leftCap.length;
  const points: Pt[] = [];

  points.push(leftCap[0]);
  points.push([VB_W - leftCap[0][0], leftCap[0][1]]);

  for (let i = 1; i < n; i += 1) {
    points.push([VB_W - leftCap[i][0], leftCap[i][1]]);
  }

  points.push(leftCap[n - 1]);

  for (let i = n - 2; i >= 1; i -= 1) {
    points.push(leftCap[i]);
  }

  return points;
}

/**
 * Round every vertex with a quadratic fillet.
 * Same command structure for every shape so Framer Motion can morph `d`.
 */
function filletedPath(points: Pt[], radius: number): string {
  const n = points.length;
  let d = "";

  for (let i = 0; i < n; i += 1) {
    const prev = points[(i - 1 + n) % n];
    const curr = points[i];
    const next = points[(i + 1) % n];

    const toPrev = normalize(sub(prev, curr));
    const toNext = normalize(sub(next, curr));
    const r = Math.min(radius, dist(prev, curr) / 2.2, dist(curr, next) / 2.2);

    const start = add(curr, scale(toPrev, r));
    const end = add(curr, scale(toNext, r));

    if (i === 0) {
      d += `M${start[0].toFixed(2)} ${start[1].toFixed(2)}`;
    } else {
      d += `L${start[0].toFixed(2)} ${start[1].toFixed(2)}`;
    }
    d += `Q${curr[0].toFixed(2)} ${curr[1].toFixed(2)} ${end[0].toFixed(2)} ${end[1].toFixed(2)}`;
  }

  return `${d}Z`;
}

function shapePath(leftCap: Pt[], radius: number): string {
  return filletedPath(ringFromLeftCap(leftCap), radius);
}

/**
 * idle   — soft chamfered rect (unselected + hover share this silhouette)
 * active — soft pointed hexagon on press/selection
 */
const PATHS: Record<Shape, string> = {
  idle: shapePath(
    [
      [11, 0],
      [0, 11],
      [0, 20],
      [0, 29],
      [11, VB_H],
    ],
    3.5
  ),
  active: shapePath(
    [
      [14, 0],
      [5, 12],
      [0, 20],
      [5, 28],
      [14, VB_H],
    ],
    4
  ),
};

const morphTransition = {
  type: "tween" as const,
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

function FilterButton({
  label,
  isActive,
  onSelect,
}: {
  label: string;
  isActive: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const shape: Shape = isActive || pressed ? "active" : "idle";
  const solid = isActive || pressed || hovered;

  return (
    <button
      type="button"
      className={`${styles.btn} ${isActive ? styles.btnActive : ""} ${
        solid ? styles.btnSolid : ""
      }`}
      aria-pressed={isActive}
      onClick={onSelect}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
    >
      <span className={styles.frost} aria-hidden="true" />
      <svg
        className={styles.shape}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d={PATHS[shape]}
          animate={{
            d: PATHS[shape],
            fill: solid ? FILL_SOLID : FILL_IDLE,
          }}
          initial={false}
          transition={morphTransition}
          className={styles.path}
        />
      </svg>
      <span className={styles.label}>{label}</span>
    </button>
  );
}

export default function MotionFilterBar() {
  const [activeId, setActiveId] = useState<string>("all");

  const selectFilter = (id: string) => {
    setActiveId(id);
    window.dispatchEvent(
      new CustomEvent("woe:motion-filter", { detail: { filterId: id } })
    );
  };

  return (
    <nav className={styles.root} aria-label="Filter projects">
      <ul className={styles.list}>
        {FILTERS.map((filter) => (
          <li key={filter.id} className={styles.item}>
            <FilterButton
              label={filter.label}
              isActive={activeId === filter.id}
              onSelect={() => selectFilter(filter.id)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
