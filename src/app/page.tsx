/**
 * Home page — content driven by src/data/home.ts.
 * Sections are rendered by `<HomeSectionRenderer />`.
 * Server component: it just composes a client renderer and layout.
 */

import Layout from "@/components/layout/Layout";
import HomeSectionRenderer from "@/components/home/HomeSectionRenderer";
import { homeSections } from "@/data/home";

export default function HomePage() {
  return (
    <Layout>
      <HomeSectionRenderer sections={homeSections} />
    </Layout>
  );
}
