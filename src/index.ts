import React from "react";
import { DebugRenderer } from "./debug-renderer";

export const ReactDebug = {
  render(element: React.ReactNode /* , container, callback */) {
    const fiberRoot = {} as any;
    DebugRenderer.updateContainer(element, fiberRoot, null, () => null);
  }
};
