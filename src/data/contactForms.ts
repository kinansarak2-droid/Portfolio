/**
 * CONTACT FORMS CONFIG
 * ────────────────────
 * Each entry is a contact / lead-capture page. They all use the same
 * `ContactFormTemplate`, but declare their own field set so a form
 * can be added without touching the template.
 *
 * Field types map to placeholder controls in <ContactFormPlaceholder>.
 * No backend wiring exists yet — this is purely structural.
 */

import type { LocalizedString } from "@/i18n";

export const contactIntro: LocalizedString = {
  en: "Send us a message, request a quote, or upload your project plans.",
  fr: "Envoyez-nous un message, demandez un devis ou partagez vos plans de projet.",
  ar: "أرسل لنا رسالة أو اطلب عرض سعر أو شارك مخططات مشروعك.",
};

export type ContactFieldType =
  | "text"
  | "email"
  | "phone"
  | "textarea"
  | "select"
  | "file"
  | "checkbox";

export interface ContactField {
  id:        string;
  type:      ContactFieldType;
  label:     LocalizedString;
  /** Optional placeholder copy. */
  placeholder?: LocalizedString;
  required?: boolean;
  /** Used by `select` type. */
  options?: Array<{ value: string; label: LocalizedString }>;
}

export interface ContactForm {
  id:    string;
  slug:  string;
  /** When true, this form is the canonical /contact route. */
  isDefault?: boolean;
  title: LocalizedString;
  shortDesc?: LocalizedString;
  fields: ContactField[];
  submitLabel: LocalizedString;
}

const NAME_FIELD: ContactField = {
  id: "name",
  type: "text",
  label: { en: "Full name", fr: "Nom complet", ar: "الاسم الكامل" },
  required: true,
};

const EMAIL_FIELD: ContactField = {
  id: "email",
  type: "email",
  label: { en: "Email", fr: "E-mail", ar: "البريد الإلكتروني" },
  required: true,
};

const PHONE_FIELD: ContactField = {
  id: "phone",
  type: "phone",
  label: { en: "Phone", fr: "Téléphone", ar: "الهاتف" },
};

export const contactFormsConfig: ContactForm[] = [
  {
    id: "contact-us",
    slug: "contact-us",
    isDefault: true,
    title: { en: "Contact Us", fr: "Nous contacter", ar: "تواصل معنا" },
    shortDesc: {
      en: "General enquiries — we'll get back to you shortly.",
      fr: "Demandes générales — nous reviendrons vers vous rapidement.",
      ar: "استفسارات عامة — سنعاود التواصل معك قريباً.",
    },
    fields: [
      NAME_FIELD,
      EMAIL_FIELD,
      PHONE_FIELD,
      {
        id: "subject",
        type: "text",
        label: { en: "Subject", fr: "Objet", ar: "الموضوع" },
      },
      {
        id: "message",
        type: "textarea",
        label: { en: "Message", fr: "Message", ar: "الرسالة" },
        required: true,
      },
    ],
    submitLabel: { en: "Send", fr: "Envoyer", ar: "إرسال" },
  },
  {
    id: "request-quote",
    slug: "request-quote",
    title: { en: "Request a Quote", fr: "Demander un devis", ar: "طلب عرض سعر" },
    shortDesc: {
      en: "Tell us about your project — we'll send a tailored quote.",
      fr: "Décrivez votre projet — nous vous enverrons un devis personnalisé.",
      ar: "أخبرنا عن مشروعك — وسنرسل لك عرض سعر مخصصاً.",
    },
    fields: [
      NAME_FIELD,
      EMAIL_FIELD,
      PHONE_FIELD,
      {
        id: "project-type",
        type: "select",
        label: { en: "Project type", fr: "Type de projet", ar: "نوع المشروع" },
        options: [
          { value: "facility",  label: { en: "Sports facility",     fr: "Installation sportive", ar: "منشأة رياضية" } },
          { value: "surface",   label: { en: "Flooring / surface",  fr: "Revêtement / sol",      ar: "أرضية / سطح" } },
          { value: "equipment", label: { en: "Equipment",           fr: "Équipement",            ar: "تجهيزات" } },
          { value: "other",     label: { en: "Other",               fr: "Autre",                 ar: "أخرى" } },
        ],
      },
      {
        id: "details",
        type: "textarea",
        label: { en: "Project details", fr: "Détails du projet", ar: "تفاصيل المشروع" },
        required: true,
      },
    ],
    submitLabel: { en: "Request quote", fr: "Demander un devis", ar: "اطلب عرض السعر" },
  },
  {
    id: "product-inquiry",
    slug: "product-inquiry",
    title: { en: "Product Inquiry", fr: "Demande produit", ar: "استفسار عن منتج" },
    shortDesc: {
      en: "Ask about a specific product, system or accessory.",
      fr: "Posez une question sur un produit, système ou accessoire.",
      ar: "اسألنا عن منتج أو نظام أو ملحق محدد.",
    },
    fields: [
      NAME_FIELD,
      EMAIL_FIELD,
      PHONE_FIELD,
      {
        id: "product",
        type: "text",
        label: { en: "Product / system", fr: "Produit / système", ar: "المنتج / النظام" },
        required: true,
      },
      {
        id: "quantity",
        type: "text",
        label: { en: "Quantity / area", fr: "Quantité / surface", ar: "الكمية / المساحة" },
      },
      {
        id: "message",
        type: "textarea",
        label: { en: "Message", fr: "Message", ar: "الرسالة" },
      },
    ],
    submitLabel: { en: "Send inquiry", fr: "Envoyer la demande", ar: "إرسال الاستفسار" },
  },
  {
    id: "upload-plans",
    slug: "upload-plans",
    title: { en: "Upload Project Plans", fr: "Envoyer des plans", ar: "إرفاق مخططات مشروع" },
    shortDesc: {
      en: "Share your CAD plans, briefs or reference documents.",
      fr: "Partagez vos plans CAO, briefs ou documents de référence.",
      ar: "شارك مخططات الأوتوكاد أو الموجزات أو المستندات المرجعية.",
    },
    fields: [
      NAME_FIELD,
      EMAIL_FIELD,
      PHONE_FIELD,
      {
        id: "files",
        type: "file",
        label: { en: "Project files", fr: "Fichiers du projet", ar: "ملفات المشروع" },
      },
      {
        id: "notes",
        type: "textarea",
        label: { en: "Notes", fr: "Notes", ar: "ملاحظات" },
      },
    ],
    submitLabel: { en: "Upload", fr: "Téléverser", ar: "رفع الملفات" },
  },
];

export function findContactForm(slug: string): ContactForm | undefined {
  return contactFormsConfig.find((f) => f.slug === slug);
}

export function getDefaultContactForm(): ContactForm {
  return contactFormsConfig.find((f) => f.isDefault) ?? contactFormsConfig[0];
}
