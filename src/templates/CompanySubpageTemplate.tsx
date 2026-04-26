"use client";

/**
 * CompanySubpageTemplate — used for every Company subpage
 * (/company/about, /company/manufacturing, …).
 *
 * Currently a thin wrapper around CategoryTemplate; kept as a
 * separate file so company-specific layout decisions can diverge
 * later without affecting product / sport pages.
 */

import CategoryTemplate from "./CategoryTemplate";
import type { ContentCategory } from "@/types";
import type { LocalizedString } from "@/i18n";

interface Props {
  page:        ContentCategory;
  parentHref:  string;
  parentLabel: LocalizedString;
  cta?: {
    title:    LocalizedString;
    body?:    LocalizedString;
    label:    LocalizedString;
    href:     string;
  };
}

export default function CompanySubpageTemplate(props: Props) {
  return (
    <CategoryTemplate
      category={props.page}
      parentHref={props.parentHref}
      parentLabel={props.parentLabel}
      cta={props.cta}
    />
  );
}
