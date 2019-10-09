# react-custom-renderer-starter
[![CircleCI](https://circleci.com/gh/koba04/react-custom-renderer-starter.svg?style=svg)](https://circleci.com/gh/koba04/react-custom-renderer-starter)

An implementation for a custom renderer for React

## How to create your custom renderer

In order to create a custom renderer, you have to define a HostConfig, see the HostConfig Interface below.

For your references, these are HostConfigs of custom renderers

- react-dom
    - https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMHostConfig.js
- react-native
    - https://github.com/facebook/react/blob/master/packages/react-native-renderer/src/ReactNativeHostConfig.js
    - https://github.com/facebook/react/blob/master/packages/react-native-renderer/src/ReactFabricHostConfig.js (Fabric)
- react-test-renderer
    - https://github.com/facebook/react/blob/master/packages/react-test-renderer/src/ReactTestHostConfig.js
- react-konva
    - https://github.com/konvajs/react-konva/blob/master/src/ReactKonvaHostConfig.js


## HostConfig Interface

### getPublicInstance(instance: Instance | TextInstance): PublicInstance;

Return a public instance of Host component.

`react-dom` returns a DOM element because it is a public instance that you can get through `ref`.

### getRootHostContext(rootContainerInstance: Container): HostContext;

### getChildHostContext(parentHostContext: HostContext, type: Type, rootContainerInstance: Container): HostContext

### prepareForCommit(containerInfo: Container): void;

### resetAfterCommit(containerInfo: Container): void;

### createInstance(type: Type, props: Props, rootContainerInstance: Container, hostContext: HostContext, internalInstanceHandle: OpaqueHandle): Instance;

Return an instance.

`react-dom` returns a DOM element.

### appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void;

Append an instance into a parent instance.

`react-dom` calls `parentInstance.appendChild(child)`.
This is called in the render phase but it's ok because a DOM tree hasn't been mounted yet.

### finalizeInitialChildren(parentInstance: Instance, type: Type, props: Props, rootContainerInstance: Container, hostContext: HostContext): boolean;

Set initial properties and return whether `commitMount` should be called in later or not.

`react-dom` set DOM properties and return a boolean that indicates whether `dom.focus()` should be called in `commitMount` or not.

### prepareUpdate(instance: Instance, type: Type, oldProps: Props, newProps: Props, rootContainerInstance: Container, hostContext: HostContext): null | UpdatePayload;

Return `updatePayload` includes properties for diffs

`react-dom` returns a props list has to be applied.

### shouldSetTextContent(type: Type, props: Props): boolean;

Return whether its content is a textContext or not.

### shouldDeprioritizeSubtree(type: Type, props: Props): boolean;

Return whether updating its subtree is deprioritized or not.

`react-dom` return a flag whether `hidden` prop is `true` or not.

### createTextInstance(text: string, rootContainerInstance: Container, hostContext: HostContext, internalInstanceHandle: OpaqueHandle): TextInstance;

Return an text instance.

`react-dom` return a textNode.

### scheduleDeferredCallback(callback: () => any, options?: { timeout: number }): any;

### cancelDeferredCallback(callbackID: any): void;

### setTimeout(handler: (...args: any[]) => void, timeout: number): TimeoutHandle | NoTimeout;

### clearTimeout(handle: TimeoutHandle | NoTimeout): void;

### noTimeout: NoTimeout;

### now(): number;

### isPrimaryRenderer: boolean;

```
// Temporary workaround for scenario where multiple renderers concurrently
// render using the same context objects. E.g. React DOM and React ART on the
// same page. DOM is the primary renderer; ART is the secondary renderer.
```

### supportsMutation: boolean;

### supportsPersistence: boolean;

### supportsHydration: boolean;

-----------------------------

### Mutation (optional)


### appendChild?(parentInstance: Instance, child: Instance | TextInstance): void;

### appendChildToContainer?(container: Container, child: Instance | TextInstance): void;

### commitTextUpdate?(textInstance: TextInstance, oldText: string, newText: string): void;

### commitMount?(instance: Instance, type: Type, newProps: Props, internalInstanceHandle: OpaqueHandle): void;

### commitUpdate?(instance: Instance, updatePayload: UpdatePayload, type: Type, oldProps: Props, newProps: Props, internalInstanceHandle: OpaqueHandle): void;

### insertBefore?(parentInstance: Instance, child: Instance | TextInstance, beforeChild: Instance | TextInstance): void;

### insertInContainerBefore?(container: Container, child: Instance | TextInstance, beforeChild: Instance | TextInstance): void;

### removeChild?(parentInstance: Instance, child: Instance | TextInstance): void;

### removeChildFromContainer?(container: Container, child: Instance | TextInstance): void;

### resetTextContent?(instance: Instance): void;

---------------------------

### Persistence (optional)

### cloneInstance?(instance: Instance, updatePayload: null | UpdatePayload, type: Type, oldProps: Props, newProps: Props, internalInstanceHandle: OpaqueHandle, keepChildren: boolean, recyclableInstance: Instance): Instance;

### createContainerChildSet?(container: Container): ChildSet;

### appendChildToContainerChildSet?(childSet: ChildSet, child: Instance | TextInstance): void;

### finalizeContainerChildren?(container: Container, newChildren: ChildSet): void;

### replaceContainerChildren?(container: Container, newChildren: ChildSet): void;

--------------------------

### Hydration (optional)


### canHydrateInstance?(instance: HydratableInstance, type: Type, props: Props): null | Instance;

### canHydrateTextInstance?(instance: HydratableInstance, text: string): null | TextInstance;

### getNextHydratableSibling?(instance: Instance | TextInstance | HydratableInstance): null | HydratableInstance;

### getFirstHydratableChild?(parentInstance: Instance | Container): null | HydratableInstance;

### hydrateInstance?(instance: Instance, type: Type, props: Props, rootContainerInstance: Container, hostContext: HostContext, internalInstanceHandle: OpaqueHandle): null | UpdatePayload;

### hydrateTextInstance?(textInstance: TextInstance, text: string, internalInstanceHandle: OpaqueHandle): boolean;

### didNotMatchHydratedContainerTextInstance?(parentContainer: Container, textInstance: TextInstance, text: string): void;

### didNotMatchHydratedTextInstance?(parentType: Type, parentProps: Props, parentInstance: Instance, textInstance: TextInstance, text: string): void;

### didNotHydrateContainerInstance?(parentContainer: Container, instance: Instance | TextInstance): void;

### didNotHydrateInstance?(parentType: Type, parentProps: Props, parentInstance: Instance, instance: Instance | TextInstance): void;

### didNotFindHydratableContainerInstance?(parentContainer: Container, type: Type, props: Props): void;

### didNotFindHydratableContainerTextInstance?(parentContainer: Container, text: string): void;

### didNotFindHydratableInstance?(parentType: Type, parentProps: Props, parentInstance: Instance, type: Type, props: Props): void;

### didNotFindHydratableTextInstance?(parentType: Type, parentProps: Props, parentInstance: Instance, text: string): void;
