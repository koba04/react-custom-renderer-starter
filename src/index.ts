import React from "react";
import { DebugRenderer } from "./debug-renderer";

export const ReactDebug = {
  render(element: React.ReactNode /* , container, callback */) {
    const fiberRoot = DebugRenderer.createContainer({}, false, false);
    DebugRenderer.updateContainer(element, fiberRoot, null, () => null);
  }
};
