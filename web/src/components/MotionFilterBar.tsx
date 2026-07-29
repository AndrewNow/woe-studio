import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import styles from "./MotionFilterBar.module.scss";

export type FilterOption = {
  id: string;
  label: string;
};

type Shape = "idle" | "active";

declare global {
  interface Window {
    lenis?: { scrollTo: (target: number | string, options?: object) => void };
  }
}

function scrollPageToTop() {
  if (window.lenis) {
    window.lenis.scrollTo(0, { immediate: false });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
type Pt = [number, number];

const VB_W = 200;
const VB_H = 40;
const MOBILE_MQ = "(max-width: 992px)";

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

const IDLE_CAP: Pt[] = [
  [11, 0],
  [0, 11],
  [0, 20],
  [0, 29],
  [11, VB_H],
];

const ACTIVE_CAP: Pt[] = [
  [14, 0],
  [5, 12],
  [0, 20],
  [5, 28],
  [14, VB_H],
];

/**
 * idle   — soft chamfered rect (unselected + hover share this silhouette)
 * active — soft pointed hexagon on press/selection
 */
const PATHS = {
  idle: shapePath(IDLE_CAP, 3.5),
  idleMobile: shapePath(IDLE_CAP, 1.6),
  active: shapePath(ACTIVE_CAP, 4),
} as const;

const morphTransition = {
  type: "tween" as const,
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

function FilterButton({
  label,
  isActive,
  onSelect,
  isMobile,
}: {
  label: string;
  isActive: boolean;
  onSelect: () => void;
  isMobile: boolean;
}) {
  const clipId = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const shape: Shape = isActive || pressed ? "active" : "idle";
  const solid = isActive || pressed || hovered;
  const idlePath = isMobile ? PATHS.idleMobile : PATHS.idle;
  const pathD = shape === "active" ? PATHS.active : idlePath;
  const frostClip = `url(#${clipId})`;

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
      <svg width={0} height={0} aria-hidden="true" className={styles.clipSvg}>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path
              d={idlePath}
              transform={`scale(${1 / VB_W} ${1 / VB_H})`}
            />
          </clipPath>
        </defs>
      </svg>
      <span
        className={styles.frost}
        aria-hidden="true"
        style={{ clipPath: frostClip, WebkitClipPath: frostClip }}
      />
      <svg
        className={styles.shape}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d={pathD}
          animate={{
            d: pathD,
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

type MotionFilterBarProps = {
  filters?: FilterOption[];
  eventName?: string;
};

export default function MotionFilterBar({
  filters = [],
  eventName = "woe:project-filter",
}: MotionFilterBarProps) {
  const [activeId, setActiveId] = useState<string>("all");
  const isMobile = useIsMobile();

  const categories = filters.filter((filter) => filter.id && filter.id !== "all");

  // All Projects is only useful when there are categories to toggle between.
  if (categories.length === 0) return null;

  const chips: FilterOption[] = [
    { id: "all", label: "All Projects" },
    ...categories,
  ];
  const isCompact = chips.length <= 2;

  const selectFilter = (id: string) => {
    setActiveId(id);
    scrollPageToTop();
    window.dispatchEvent(
      new CustomEvent(eventName, { detail: { filterId: id } })
    );
  };

  return (
    <nav className={styles.root} aria-label="Filter projects">
      <ul
        className={`${styles.list}${isCompact ? ` ${styles.listCompact}` : ""}`}
      >
        {chips.map((filter) => (
          <li key={filter.id} className={styles.item}>
            <FilterButton
              label={filter.label}
              isActive={activeId === filter.id}
              onSelect={() => selectFilter(filter.id)}
              isMobile={isMobile}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
