import Reconciler, {
  HostConfig as HostConfigInterface
} from "react-reconciler";

import { debug } from "./logger";

type Type = string;
type Props = {
  [key: string]: any;
};

export type Container = {
  name: "container";
  logs: any[];
};

type Children = Instance | TextInstance;

// An instance type for your host environment
type Instance = {
  type: Type;
  props: Props;
  children: Children[];
  rootContainerInstance: Container;
};

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

// An text instance type for your host environment
type TextInstance = string;

// This type is expose to users
// react-dom's one is a HTMLElement
export type PublicInstance = Instance | TextInstance;

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
    return instance;
  },
  getRootHostContext(rootContainerInstance: Container): HostContext {
    return context;
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainerInstance: Container
  ): HostContext {
    return context;
  },
  prepareForCommit(containerInfo: Container): void {
    debug("prepareForCommit", { containerInfo });
  },
  resetAfterCommit(containerInfo: Container): void {
    debug("resetAfterCommit", { containerInfo });
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
      hostContext,
      children: props.children
    });
    return {
      type,
      props,
      rootContainerInstance,
      children: []
    };
  },
  appendChild(parentInstance: Instance, child: Instance) {
    debug("appendChild", { parentInstance, child });
    parentInstance.children.push(child);
  },
  appendChildToContainer(container: Container, child: Instance) {
    debug("appendChildToContainer", { container, child });
  },
  commitMount(
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
  },
  appendInitialChild(
    parentInstance: Instance,
    child: Instance | TextInstance
  ): void {
    debug("appendInitialChild", { parentInstance, child });
    parentInstance.children.push(child);
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
  // we use the native implementation
  setTimeout,
  clearTimeout,
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
