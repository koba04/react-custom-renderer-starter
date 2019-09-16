export type Type = string;
export type Props = {
  [key: string]: any;
};

// An text instance type for your host environment
export type TextInstance = string;

// This type is expose to users
// react-dom's one is a HTMLElement
export type PublicInstance = Instance | TextInstance;

export type HostContext = {
  name: "context";
};

export type Container = {
  name: "container";
  logs: any[];
};

type Children = Instance | TextInstance;

// An instance type for your host environment
export type Instance = {
  type: Type;
  props: Props;
  children: Children[];
  rootContainerInstance: Container;
};

export type HydratableInstance = object;
export type UpdatePayload = object;
export type ChildSet = object;
export type TimeoutHandle = object;
export type NoTimeout = object;
export type OpaqueHandle = any;
