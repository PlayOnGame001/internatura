export interface Bidder {
  bidder: string;
  params: Record<string, any>;
}

export function initBannerAd(
  id: string,
  sizes: number[][] = [[300, 250]],
  bidders: Bidder[] = [{ bidder: "adtelligent", params: { aid: 350975 } }]
) {
  if (!window.pbjs) return;

  const events = ["BID_REQUESTED", "BID_RESPONSE", "BID_WON", "AUCTION_END", "BID_TIMEOUT"];
  events.forEach((event) => {
    window.pbjs.onEvent(event, (data: any) => console.log(`[Prebid Event] ${event}:`, data));
  });

  window.pbjs.setBidderConfig?.({
    config: {
      adtelligent: { chunkSize: 1 },
    },
  });

  const adUnit = {
    code: id,
    mediaTypes: { banner: { sizes } },
    bids: bidders,
    deferRendering: false,
  };

  window.pbjs.que = window.pbjs.que || [];
  window.pbjs.que.push(() => {
    window.pbjs.addAdUnits(adUnit);
    window.pbjs.requestBids({
      bidsBackHandler: () => {
        const bids = window.pbjs.getHighestCpmBids(id);
        const container = document.getElementById(id);
        if (!container) return;

        if (bids.length > 0) {
          container.innerHTML = bids[0].ad || "";
          console.log(`✅ Advertisement rendered for ${id}`, bids[0]);
        } else {
          container.innerHTML = `<div style="width:${sizes[0][0]}px;height:${sizes[0][1]}px;background:#f9f9f9;display:flex;align-items:center;justify-content:center;color:#666;">No bids</div>`;
          console.log(`⚠️ No bids for ${id}`);
        }
      },
    });
  });
}
