import { z } from "zod";
import { collaboratorSchema } from "./common";
import { gql } from "~/assets/common";

const aboutRecordSchema = z.object({
  title: z.string().nullable(),
  year: z.number().nullable(),
  type: z.string().nullable(),
  link: z.string().nullable(),
});

export type AboutRecord = z.infer<typeof aboutRecordSchema>;

export const aboutSchema = z.object({
  about: z.string().nullable(),
  news: z.string().nullable(),
  awards: aboutRecordSchema.array(),
  publications: aboutRecordSchema.array(),
  contact: z.string().nullable(),
  collaborators: z.array(z.object({ collaborators_id: collaboratorSchema })),
});

export type About = z.infer<typeof aboutSchema>;

export const aboutQuery = gql`
  query About {
    about {
      about
      news
      awards
      publications
      contact
      collaborators {
        collaborators_id {
          id
          name
          link
          image {
            id
          }
        }
      }
    }
  }
`;
