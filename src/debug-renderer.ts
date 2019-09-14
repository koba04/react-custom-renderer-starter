import Reconciler, {
  HostConfig as HostConfigInterface
} from "react-reconciler";

import { debug } from "./logger";

type Type = string;
type Props = object;
type Container = object;
type Instance = object;
type TextInstance = object;
type HydratableInstance = object;
type PublicInstance = object;
type HostContext = object;
type UpdatePayload = object;
type ChildSet = object;
type TimeoutHandle = object;
type NoTimeout = object;

// Fiber
type OpaqueHandle = any;

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
    return {};
  },
  getRootHostContext(rootContainerInstance: Container): HostContext {
    debug("getRootHostContext");
    return {};
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainerInstance: Container
  ): HostContext {
    debug("getChildHostContext");
    return {};
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
    debug("createInstance");
    return {};
  },
  appendChild(parentInstance: Instance, child: Instance) {
    debug("appendChild", parentInstance, child);
  },
  appendChildToContainer(parentInstance: Instance, child: Instance) {
    debug("appendChild", parentInstance, child);
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
    return {};
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
