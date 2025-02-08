import { z } from "zod";
import { gql } from "~/assets/common";

export const typologySchema = z.object({ title: z.string(), id: z.string() });

export type Typology = z.infer<typeof typologySchema>;

export const typologyQuery = gql`
  query Typology {
    typology {
      title
      id
    }
  }
`;
