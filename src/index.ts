import React from "react";
import { DebugRenderer } from "./debug-renderer";
import ReactReconciler from "react-reconciler";

type Container = {
  fiberRoot?: ReactReconciler.FiberRoot;
};

export const ReactDebug = {
  render(element: React.ReactNode, container: Container, callback?: () => {}) {
    if (typeof container.fiberRoot === "undefined") {
      container.fiberRoot = DebugRenderer.createContainer({}, false, false);
    }
    DebugRenderer.updateContainer(
      element,
      container.fiberRoot,
      null,
      () => null
    );
  }
};
