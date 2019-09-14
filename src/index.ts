import React from "react";
import { DebugRenderer, Container } from "./debug-renderer";
import ReactReconciler from "react-reconciler";

export type RootContainer = {
  fiberRoot?: ReactReconciler.FiberRoot;
  container?: Container;
};

export const ReactDebug = {
  render(
    element: React.ReactNode,
    container: RootContainer,
    callback = () => {}
  ) {
    let rootContainer: Container;
    if (container.container) {
      rootContainer = container.container;
    } else {
      rootContainer = { name: "container", logs: [] };
      container.container = rootContainer;
    }
    if (typeof container.fiberRoot === "undefined") {
      container.fiberRoot = DebugRenderer.createContainer(
        rootContainer,
        false,
        false
      );
    }
    DebugRenderer.updateContainer(element, container.fiberRoot, null, callback);
  },
  getLogs(container: RootContainer): any[] {
    return container.container ? container.container.logs : [];
  }
};
