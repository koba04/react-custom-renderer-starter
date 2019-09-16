import Reconciler from "react-reconciler";
import * as HostConfig from "./debug-renderer-host-config";
import {
  Type,
  Props,
  Instance,
  TextInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout,
  Container
} from "./debug-renderer-types";

// eslint-disable-next-line new-cap
export const DebugRenderer = Reconciler<
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
>(HostConfig);
