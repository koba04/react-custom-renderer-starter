import React from "react";
import { DebugRenderer } from "./debug-renderer";
import { Container, Instance, TextInstance } from "./debug-renderer-types";
import ReactReconciler from "react-reconciler";

export type RootContainer = {
  fiberRoot?: ReactReconciler.FiberRoot;
  container?: Container;
};

const getComponentName = (type: Type): string => {
  if (typeof type === "string") return type;
  if (typeof type === "function") {
    return (type as any).displayName || (type as any).name || null;
  }
  return getComponentName((type as any).type);
};

const toJSON = (instance: Instance | TextInstance): object | string | null => {
  if (instance.tag === "TEXT") {
    return instance.text;
  }
  // ignore children in props, we use children in the instance.
  const { children, ...props } = instance.props;
  return {
    type: getComponentName(instance.type),
    props,
    // child might include ReactElement so this is a type mismatch
    children: Array.isArray(instance.children)
      ? instance.children.map((child: any) => toJSON(child))
      : toJSON(instance.children)
  };
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
      rootContainer = {
        name: "container",
        logs: [],
        children: []
      };
      container.container = rootContainer;
    }
    if (typeof container.fiberRoot === "undefined") {
      container.fiberRoot = DebugRenderer.createContainer(
        rootContainer,
        false,
        false
      );
    }
    DebugRenderer.updateContainer(element, container.fiberRoot, null, () => {
      if (rootContainer.children.length === 1) {
        console.log(JSON.stringify(toJSON(rootContainer.children[0]), null, 2));
      } else {
        rootContainer.children.forEach(child => {
          console.log(JSON.stringify(toJSON(child), null, 2));
        });
      }
      callback();
    });
  },
  getLogs(container: RootContainer): any[] {
    return container.container ? container.container.logs : [];
  }
};
