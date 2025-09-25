declare module "virtual:ads/Banner" {
  import type { FC } from "react";

  export interface Bidder {
    bidder: string;
    params: Record<string, any>;
  }

  const Banner: FC<{
    id: string;
    sizes: number[][];
    bidders?: Bidder[];
  }>;

  export default Banner;
}
