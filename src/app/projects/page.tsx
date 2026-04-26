/**
 * /projects — default project view (all projects).
 *
 * Saved views (premium, archive, etc.) are rendered at /projects/[view]
 * using the same `ProjectListTemplate`. New views are added to
 * src/data/projectViews.ts and to the nav config.
 */

import ProjectListTemplate from "@/templates/ProjectListTemplate";
import { getDefaultProjectView } from "@/data/projectViews";

const PARENT_LABEL = { en: "Projects", fr: "Projets", ar: "المشاريع" };

export default function ProjectsDefaultPage() {
  return (
    <ProjectListTemplate
      view={getDefaultProjectView()}
      parentHref="/projects"
      parentLabel={PARENT_LABEL}
    />
  );
}
