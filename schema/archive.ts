import { z } from "zod";
import { typologySchema, collaboratorSchema, fileSchema } from "./common";
import { gql } from "~/assets/common";

export const archiveElementNoImageSchema = z.object({
  title: z.string().nullable(),
  slug: z.string(),
  description: z.string().nullable(),
  location: z.string().nullable(),
  year: z.number().nullable(),
  typology: z.array(z.object({ typology_id: typologySchema })),
  team: z.array(z.object({ collaborators_id: collaboratorSchema })),
});

export type ArchiveElementNoImage = z.infer<typeof archiveElementNoImageSchema>;

export const archiveElementSchema = archiveElementNoImageSchema.merge(
  z.object({
    images: z.array(fileSchema),
    drawings: z.array(fileSchema),
  })
);

export type ArchiveElement = z.infer<typeof archiveElementNoImageSchema>;

export const archiveSchema = z.array(archiveElementSchema);

export type Archive = z.infer<typeof archiveSchema>;

export const archiveQuery = gql`
  query Archive {
    archive {
      title
      description
      slug
      location
      year
      images {
        directus_files_id {
          id
        }
      }
      drawings {
        directus_files_id {
          id
        }
      }
      typology {
        typology_id {
          title
        }
      }
      team {
        collaborators_id {
          id
          name
          image {
            id
          }
          link
        }
      }
    }
  }
`;

export const archiveBySlugQuery = gql`
  query ArchiveBySlug($slug: ID!) {
    archive_by_id(id: $slug) {
      title
      description
      slug
      location
      year
      images {
        directus_files_id {
          id
        }
      }
      drawings {
        directus_files_id {
          id
        }
      }
      typology {
        typology_id {
          title
        }
      }
      team {
        collaborators_id {
          id
          name
          image {
            id
          }
          link
        }
      }
    }
  }
`;
