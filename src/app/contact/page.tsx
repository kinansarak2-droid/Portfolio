/**
 * /contact — default contact form (general enquiry).
 *
 * Specific forms (request-quote, product-inquiry, upload-plans) are
 * served at /contact/[form] using the same `ContactFormTemplate`.
 */

import ContactFormTemplate from "@/templates/ContactFormTemplate";
import { getDefaultContactForm } from "@/data/contactForms";

const PARENT_LABEL = { en: "Contact", fr: "Contact", ar: "اتصل بنا" };

export default function ContactDefaultPage() {
  return (
    <ContactFormTemplate
      form={getDefaultContactForm()}
      parentHref="/contact"
      parentLabel={PARENT_LABEL}
    />
  );
}
