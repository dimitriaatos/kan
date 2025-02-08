export * from "./about";
export * from "./archive";
export * from "./common";
export * from "./typology";

import type { About } from "./about";
import type { Archive } from "./archive";

export type Schema = {
  archive: Archive;
  about: About;
};
