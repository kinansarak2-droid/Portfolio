/**
 * /projects/[view] — alternate project view (e.g. premium, archive).
 *
 * The default view (`all`) is served at /projects directly; this dynamic
 * segment renders any non-default view defined in projectViews.ts.
 */

import { notFound, redirect } from "next/navigation";
import ProjectListTemplate from "@/templates/ProjectListTemplate";
import { findProjectView, projectViewsConfig, getDefaultProjectView } from "@/data/projectViews";

const PARENT_LABEL = { en: "Projects", fr: "Projets", ar: "المشاريع" };

interface PageProps {
  params: Promise<{ view: string }>;
}

export default async function ProjectsViewPage({ params }: PageProps) {
  const { view: slug } = await params;
  const view = findProjectView(slug);
  if (!view) notFound();
  // If the visitor lands on the default slug, redirect to canonical /projects.
  if (view === getDefaultProjectView()) redirect("/projects");

  return (
    <ProjectListTemplate
      view={view}
      parentHref="/projects"
      parentLabel={PARENT_LABEL}
    />
  );
}

export function generateStaticParams() {
  return projectViewsConfig
    .filter((v) => !v.isDefault)
    .map((v) => ({ view: v.slug }));
}
