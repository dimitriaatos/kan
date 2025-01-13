import { z } from "zod";
import { collaboratorSchema } from "./common";
import { gql } from "~/assets/common";

const recordSchema = z.object({
  title: z.string().nullable(),
  year: z.string().nullable(),
  type: z.string().nullable(),
  link: z.string().nullable(),
});

export const aboutSchema = z.object({
  about: z.string().nullable(),
  news: z.string().nullable(),
  awards: recordSchema.array(),
  publications: recordSchema.array(),
  contact: z.string().nullable(),
  collaborators: z.array(z.object({ collaborators_id: collaboratorSchema })),
});

export type About = z.infer<typeof aboutSchema>;

export const aboutQuery = gql`
  query About {
    about {
      about
      news
      awards {
        title
        year
        type
        link
      }
      publications {
        title
        year
        type
        link
      }
      contact
      collaborators {
        name
        link
        image {
          directus_files_id
        }
      }
    }
  }
`;
