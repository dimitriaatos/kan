import { z } from "zod";
import { categorySchema, collaboratorSchema, fileSchema } from "./common";
import { gql } from "~/assets/common";

export const archiveElementNoImageSchema = z.object({
  title: z.string().nullable(),
  slug: z.string(),
  description: z.string().nullable(),
  location: z.string().nullable(),
  year: z.number().nullable(),
  categories: z.array(z.object({ categories_id: categorySchema })),
  team: z.array(z.object({ collaborators_id: collaboratorSchema })),
});

export type ArchiveElementNoImage = z.infer<typeof archiveElementNoImageSchema>;

export const archiveElementSchema = archiveElementNoImageSchema.merge(
  z.object({
    images: z.array(fileSchema),
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
      categories {
        categories_id {
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
      categories {
        categories_id {
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
