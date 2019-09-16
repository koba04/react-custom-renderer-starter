import Reconciler, { OpaqueHandle } from "react-reconciler";

import {
  Type,
  Instance,
  TextInstance,
  HostContext,
  PublicInstance,
  Props,
  TimeoutHandle,
  NoTimeout,
  UpdatePayload,
  Container
} from "./debug-renderer-types";
import { debug } from "../logger";

const getComponentName = (type: Type): string => {
  if (typeof type === "string") return type;
  if (typeof type === "function") {
    return (type as any).displayName || (type as any).name || null;
  }
  return getComponentName((type as any).type);
};

const toJSON = (instance: Instance | TextInstance): object | string | null => {
  if (typeof instance === "string") return instance;
  if (typeof instance === "undefined") return null;
  const { children, ...props } = instance.props;
  return {
    type: getComponentName(instance.type),
    props,
    // child might include ReactElement so this is a type mismatch
    children: Array.isArray(children)
      ? children.map((child: any) => toJSON(child))
      : toJSON(children)
  };
};

const context: HostContext = {
  name: "context"
};

export function getPublicInstance(
  instance: Instance | TextInstance
): PublicInstance {
  return instance;
}

export function getRootHostContext(
  rootContainerInstance: Container
): HostContext {
  return context;
}

export function getChildHostContext(
  parentHostContext: HostContext,
  type: Type,
  rootContainerInstance: Container
): HostContext {
  return context;
}

export function prepareForCommit(containerInfo: Container): void {
  debug("prepareForCommit", { containerInfo });
}

export function resetAfterCommit(containerInfo: Container): void {
  debug("resetAfterCommit", { containerInfo });
}

export function createInstance(
  type: Type,
  props: Props,
  rootContainerInstance: Container,
  hostContext: HostContext,
  internalInstanceHandle: OpaqueHandle
): Instance {
  debug("createInstance", {
    type,
    props,
    rootContainerInstance,
    hostContext,
    children: props.children
  });
  return {
    type,
    props,
    rootContainerInstance,
    children: []
  };
}

export function appendChild(parentInstance: Instance, child: Instance) {
  debug("appendChild", { parentInstance, child });
  parentInstance.children.push(child);
}

export function appendChildToContainer(container: Container, child: Instance) {
  debug("appendChildToContainer", { container, child });
}

export function commitMount(
  instance: Instance,
  type: Type,
  newProps: Props,
  internalInstanceHandle: Reconciler.Fiber
) {
  debug("commitMount", {
    instance,
    type,
    newProps /* , internalInstanceHandle */
  });
  debug(JSON.stringify(toJSON(instance), null, 2));
  instance.rootContainerInstance.logs.push([
    "commitMount",
    {
      instance,
      type,
      newProps
    }
  ]);
}

export function commitUpdate(
  instance: Instance,
  updatePayload: object,
  type: string,
  oldProps: object,
  newProps: object,
  internalInstanceHandle: Reconciler.Fiber
) {
  debug("commitUpdate", {
    instance,
    updatePayload,
    type,
    oldProps,
    newProps
  });
  instance.rootContainerInstance.logs.push([
    "commitUpdate",
    {
      instance,
      updatePayload,
      type,
      oldProps,
      newProps
    }
  ]);
  // TODO: diff oldProps and newProps
  instance.props = newProps;
  debug(JSON.stringify(toJSON(instance), null, 2));
}

export function commitTextUpdate(
  textInstance: TextInstance,
  oldText: string,
  newText: string
) {
  // noop
}

export function appendInitialChild(
  parentInstance: Instance,
  child: Instance | TextInstance
): void {
  debug("appendInitialChild", { parentInstance, child });
  parentInstance.children.push(child);
}

export function insertBefore(
  parentInstance: Instance,
  child: Instance | TextInstance,
  beforeChild: Instance | TextInstance
): void {
  debug("insertBefore", { parentInstance, child, beforeChild });
}

export function finalizeInitialChildren(
  parentInstance: Instance,
  type: Type,
  props: Props,
  rootContainerInstance: Container,
  hostContext: HostContext
): boolean {
  debug("finalizeInitialChildren");
  return true;
}

export function removeChildFromContainer() {
  debug("removeChildFromContainer");
}

export function prepareUpdate(
  instance: Instance,
  type: Type,
  oldProps: Props,
  newProps: Props,
  rootContainerInstance: Container,
  hostContext: HostContext
): null | UpdatePayload {
  debug("prepareUpdate");
  return {};
}

export function shouldSetTextContent(type: Type, props: Props): boolean {
  debug("shouldSetTextContent");
  return false;
}

export function shouldDeprioritizeSubtree(type: Type, props: Props): boolean {
  debug("shouldDeprioritizeSubtree");
  return false;
}

export function createTextInstance(
  text: string,
  rootContainerInstance: Container,
  hostContext: HostContext,
  internalInstanceHandle: OpaqueHandle
): TextInstance {
  debug("createTextInstance");
  return text;
}

export function scheduleDeferredCallback(
  callback: () => any,
  options?: { timeout: number }
): any {
  // noop
}

export function cancelDeferredCallback(callbackID: any): void {
  // noop
}
// we use the native implementation
export function setTimeout(
  handler: (...args: any[]) => void,
  timeout: number
): TimeoutHandle | NoTimeout {
  return setTimeout(handler, timeout);
}
export function clearTimeout(handle: TimeoutHandle | NoTimeout): void {
  clearTimeout(handle);
}
export const noTimeout = {};

export const now = Date.now;
// Temporary workaround for scenario where multiple renderers concurrently
// render using the same context objects. E.g. React DOM and React ART on the
// same page. DOM is the primary renderer; ART is the secondary renderer.
export const isPrimaryRenderer = false;
export const supportsMutation = true;
export const supportsPersistence = false;
export const supportsHydration = false;
