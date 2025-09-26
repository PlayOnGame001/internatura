declare module "virtual:ads/Banner" {
  import type { FC } from "react";
  import type { Bidder } from "/src/utilits/ad";

  const Banner: FC<{ id: string; sizes: number[][]; bidders?: Bidder[] }>;
  export default Banner;
}
