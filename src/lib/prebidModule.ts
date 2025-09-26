declare global {
  interface Window {
    pbjs: any;
  }
}

export function initPrebid(adUnits: any[]) {
  if (!window.pbjs) {
    window.pbjs = window.pbjs || {};
    window.pbjs.que = window.pbjs.que || [];
  }

  window.pbjs.que.push(() => {
    window.pbjs.addAdUnits(adUnits);

    window.pbjs.requestBids({
      bidsBackHandler: () => {
        window.pbjs.setTargetingForGPTAsync?.();
      },
    });
  });
}