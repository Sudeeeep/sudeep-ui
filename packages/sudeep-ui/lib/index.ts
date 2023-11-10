import {
  Props,
  VNode,
  VNodeData,
  classModule,
  eventListenersModule,
  h,
  init,
  propsModule,
  styleModule,
} from "snabbdom";

interface Event {
  type?: string;
  handler?: () => void;
}

type Listener<T> = (this: VNode, ev: T, vnode: VNode) => void;

interface Elements {
  tag: string;
  text?: string;
  props?: Props;
  state?: {};
  event?: Event;
}

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

let vnodes: VNode[] = [];

export function createElement(
  tag: string,
  text?: string,
  props?: VNodeData,
  state?: {},
  event?: Event
) {
  const vnode = h(
    tag,
    {
      ...props,
      on: { [event?.type as string]: event?.handler as Listener<any> },
    },
    text
  );

  vnodes.push(vnode);

  return vnode;
}

export function render(rootElement: HTMLElement) {
  const vnodesContainer = h("div", vnodes);
  if (rootElement) {
    patch(rootElement, vnodesContainer);
  }
}
