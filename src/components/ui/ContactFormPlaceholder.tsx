"use client";

/**
 * ContactFormPlaceholder — renders a contact form from config.
 *
 * No backend wiring — submission is a noop today. The point is that
 * forms can be added/removed/reordered in src/data/contactForms.ts
 * without touching this component.
 */

import { useState } from "react";
import { useLocale, localise } from "@/context/LocaleContext";
import type { ContactForm } from "@/data/contactForms";
import { cn } from "@/lib/utils";

interface Props {
  form: ContactForm;
}

export default function ContactFormPlaceholder({ form }: Props) {
  const { locale, t } = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Backend integration happens later.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-md border border-border bg-surface p-6">
        <p className="text-sm">{t.form.success}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 max-w-2xl"
      noValidate
    >
      {form.fields.map((field) => {
        const label = localise(field.label, locale);
        const placeholder = field.placeholder
          ? localise(field.placeholder, locale)
          : "";
        const required = field.required;
        const id = `field-${field.id}`;

        const labelEl = (
          <label htmlFor={id} className="text-xs uppercase tracking-wider text-text-subtle">
            {label}
            {required ? (
              <span aria-hidden="true" className="ms-1 text-text">{t.form.requiredMark}</span>
            ) : (
              <span className="ms-1 text-text-subtle">{t.form.optionalLabel}</span>
            )}
          </label>
        );

        const inputClass = "w-full bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-text/30";

        switch (field.type) {
          case "textarea":
            return (
              <div key={field.id} className="grid gap-1.5">
                {labelEl}
                <textarea
                  id={id}
                  name={field.id}
                  required={required}
                  placeholder={placeholder}
                  rows={5}
                  className={cn(inputClass, "resize-y")}
                />
              </div>
            );

          case "select":
            return (
              <div key={field.id} className="grid gap-1.5">
                {labelEl}
                <select id={id} name={field.id} required={required} className={inputClass} defaultValue="">
                  <option value="" disabled>
                    {t.form.selectOption}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {localise(opt.label, locale)}
                    </option>
                  ))}
                </select>
              </div>
            );

          case "file":
            return (
              <div key={field.id} className="grid gap-1.5">
                {labelEl}
                <input
                  id={id}
                  name={field.id}
                  type="file"
                  required={required}
                  className={inputClass}
                  multiple
                />
                <p className="text-xs text-text-subtle">{t.form.fileHint}</p>
              </div>
            );

          case "checkbox":
            return (
              <div key={field.id} className="flex items-center gap-2">
                <input id={id} name={field.id} type="checkbox" required={required} />
                <label htmlFor={id} className="text-sm">{label}</label>
              </div>
            );

          default:
            return (
              <div key={field.id} className="grid gap-1.5">
                {labelEl}
                <input
                  id={id}
                  name={field.id}
                  type={field.type === "phone" ? "tel" : field.type}
                  required={required}
                  placeholder={placeholder}
                  className={inputClass}
                />
              </div>
            );
        }
      })}

      <button
        type="submit"
        className="justify-self-start px-5 py-3 rounded-full bg-accent text-accent-fg text-sm uppercase tracking-wider hover:opacity-90 transition-opacity duration-base"
      >
        {localise(form.submitLabel, locale)}
      </button>
    </form>
  );
}
