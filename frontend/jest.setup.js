// frontend/jest.setup.js
require("@testing-library/jest-dom");

console.log("jest.setup.js loaded");

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

// Enhanced ResizeObserver mock
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
    this.observations = [];
  }

  observe(target) {
    this.observations.push(target);
    if (this.callback) {
      this.callback(
        [
          {
            target,
            contentRect: {
              x: 0,
              y: 0,
              width: 800,
              height: 400,
              top: 0,
              bottom: 400,
              left: 0,
              right: 800,
            },
            borderBoxSize: [{ inlineSize: 800, blockSize: 400 }],
            contentBoxSize: [{ inlineSize: 800, blockSize: 400 }],
            devicePixelContentBoxSize: [{ inlineSize: 800, blockSize: 400 }],
          },
        ],
        this
      );
    }
  }

  unobserve(target) {
    this.observations = this.observations.filter((obs) => obs !== target);
  }

  disconnect() {
    this.observations = [];
  }
};
