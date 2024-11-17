import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { vi } from "vitest";

const actualReactDom = await vi.importActual<typeof ReactDOM>("react-dom");

module.exports = {
  ...actualReactDom,
  // no need for container to exist in DOM
  createPortal: (children: ReactNode) => children,
};
