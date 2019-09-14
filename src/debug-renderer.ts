import Reconciler, {
  HostConfig as HostConfigInterface
} from "react-reconciler";

import { debug } from "./logger";

type Type = string;
type Props = object;
type Container = {
  name: "container";
};

type Instance = {
  type: Type;
  props: Props;
  children: Instance[];
};

type TextInstance = string;

export type PublicInstance = {
  inst: Instance | TextInstance;
};
type HostContext = {
  name: "context";
};

type HydratableInstance = object;
type UpdatePayload = object;
type ChildSet = object;
type TimeoutHandle = object;
type NoTimeout = object;
type OpaqueHandle = any;

const context: HostContext = {
  name: "context"
};

const HostConfig: HostConfigInterface<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
> = {
  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    debug("getPublicInstance");
    return {
      inst: instance
    };
  },
  getRootHostContext(rootContainerInstance: Container): HostContext {
    debug("getRootHostContext");
    return context;
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainerInstance: Container
  ): HostContext {
    debug("getChildHostContext");
    return context;
  },
  prepareForCommit(containerInfo: Container): void {
    debug("prepareForCommit", containerInfo);
  },
  resetAfterCommit(containerInfo: Container): void {
    debug("resetAfterCommit", containerInfo);
  },
  createInstance(
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
      hostContext
    });
    return {
      type,
      props,
      children: []
    };
  },
  appendChild(parentInstance: Instance, child: Instance) {
    debug("appendChild", parentInstance, child);
    parentInstance.children.push(child);
  },
  appendChildToContainer(container: Container, child: Instance) {
    debug("appendChild", container, child);
  },
  commitMount(
    instance: Instance,
    type: Type,
    newProps: Props,
    internalInstanceHandle: Reconciler.Fiber
  ) {
    debug(
      "commitMount",
      instance,
      type,
      newProps /* , internalInstanceHandle */
    );
  },
  commitUpdate(
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
    instance.props = newProps;
    // TODO: diff oldProps and newProps
    console.log(oldProps, newProps);
  },
  appendInitialChild(
    parentInstance: Instance,
    child: Instance | TextInstance
  ): void {
    debug("appendInitialChild", parentInstance, child);
  },
  finalizeInitialChildren(
    parentInstance: Instance,
    type: Type,
    props: Props,
    rootContainerInstance: Container,
    hostContext: HostContext
  ): boolean {
    debug("finalizeInitialChildren");
    return true;
  },
  removeChildFromContainer() {
    debug("removeChildFromContainer");
  },
  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainerInstance: Container,
    hostContext: HostContext
  ): null | UpdatePayload {
    debug("prepareUpdate");
    return {};
  },
  shouldSetTextContent(type: Type, props: Props): boolean {
    debug("shouldSetTextContent");
    return true;
  },
  shouldDeprioritizeSubtree(type: Type, props: Props): boolean {
    debug("shouldDeprioritizeSubtree");
    return false;
  },
  createTextInstance(
    text: string,
    rootContainerInstance: Container,
    hostContext: HostContext,
    internalInstanceHandle: OpaqueHandle
  ): TextInstance {
    debug("createTextInstance");
    return text;
  },
  scheduleDeferredCallback(
    callback: () => any,
    options?: { timeout: number }
  ): any {
    // noop
  },
  cancelDeferredCallback(callbackID: any): void {
    // noop
  },
  setTimeout(
    handler: (...args: any[]) => void,
    timeout: number
  ): TimeoutHandle | NoTimeout {
    return {};
  },
  clearTimeout(handle: TimeoutHandle | NoTimeout): void {
    // noop
  },
  noTimeout: {},
  now: Date.now,
  // Temporary workaround for scenario where multiple renderers concurrently
  // render using the same context objects. E.g. React DOM and React ART on the
  // same page. DOM is the primary renderer; ART is the secondary renderer.
  isPrimaryRenderer: true,
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false
};

// eslint-disable-next-line new-cap
export const DebugRenderer = Reconciler(HostConfig);
