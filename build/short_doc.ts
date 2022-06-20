export const doc = {
  ...el(document),
  geid: document.getElementById.bind(document),
  gen: document.getElementsByName.bind(document),
  ce: document.createElement.bind(document),
  get b() {
    return document.body;
  },
  get h() {
    return document.head;
  },
  get l() {
    return document.location;
  },
};

export function el(e: HTMLElement | Document) {
  return {
    gecn: e.getElementsByClassName.bind(e),
    getn: e.getElementsByTagName.bind(e),
    qs: e.querySelector.bind(e),
    qsa: e.querySelectorAll.bind(e),
    ac: (child: HTMLElement) => e.appendChild(child),
    rc: (child: HTMLElement) => e.removeChild(child),
    ael: (
      eventName: string,
      handler: (event: Event) => void,
      useCapture = false
    ) => e.addEventListener(eventName, handler, useCapture),
    rel: (
      eventName: string,
      handler: (event: Event) => void,
      useCapture = false
    ) => e.removeEventListener(eventName, handler, useCapture),
  };
}
