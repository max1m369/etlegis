import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock gsap ScrollTrigger to prevent unhandled background timers
vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    register: vi.fn(),
    create: vi.fn(() => ({ kill: vi.fn() })),
    getAll: vi.fn(() => []),
    killAll: vi.fn(),
  },
  default: {
    register: vi.fn(),
    create: vi.fn(() => ({ kill: vi.fn() })),
    getAll: vi.fn(() => []),
    killAll: vi.fn(),
  },
}));

// Mock matchMedia for window
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock scrollTo
window.scrollTo = (() => {}) as any;

// Mock getContext for canvas
HTMLCanvasElement.prototype.getContext = vi.fn();

// Mock requestAnimationFrame and cancelAnimationFrame
const mockRaf = (callback: FrameRequestCallback) => setTimeout(callback, 0) as unknown as number;
const mockCaf = (id: number) => clearTimeout(id as unknown as NodeJS.Timeout);

globalThis.requestAnimationFrame = mockRaf;
globalThis.cancelAnimationFrame = mockCaf;
window.requestAnimationFrame = mockRaf;
window.cancelAnimationFrame = mockCaf;
