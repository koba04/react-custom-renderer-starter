import Reconciler, {
  HostConfig as HostConfigInterface
} from "react-reconciler";

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
    return {};
  },
  getRootHostContext(rootContainerInstance: Container): HostContext {
    return {};
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainerInstance: Container
  ): HostContext {
    return {};
  },
  prepareForCommit(containerInfo: Container): void {
    // noop
  },
  resetAfterCommit(containerInfo: Container): void {
    // noop
  },
  createInstance(
    type: Type,
    props: Props,
    rootContainerInstance: Container,
    hostContext: HostContext,
    internalInstanceHandle: OpaqueHandle
  ): Instance {
    return {};
  },
  appendChild() {
    // noop
  },
  appendChildToContainer() {
    // noop
  },
  commitMount() {
    // noop
  },
  appendInitialChild(
    parentInstance: Instance,
    child: Instance | TextInstance
  ): void {
    // noop
  },
  finalizeInitialChildren(
    parentInstance: Instance,
    type: Type,
    props: Props,
    rootContainerInstance: Container,
    hostContext: HostContext
  ): boolean {
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
    return {};
  },
  shouldSetTextContent(type: Type, props: Props): boolean {
    return true;
  },
  shouldDeprioritizeSubtree(type: Type, props: Props): boolean {
    return false;
  },
  createTextInstance(
    text: string,
    rootContainerInstance: Container,
    hostContext: HostContext,
    internalInstanceHandle: OpaqueHandle
  ): TextInstance {
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
