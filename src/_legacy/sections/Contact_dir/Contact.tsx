"use client";

/**
 * Contact Section
 * 
 * TODO: Build out this section with your design.
 * Reference assets from:
 *   - Graphics:      /assets/graphics/sections/
 *   - Illustrations: /assets/illustrations/scenes/
 */

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        paddingTop: "var(--spacing-section-y)",
        paddingBottom: "var(--spacing-section-y)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--spacing-container)",
          margin: "0 auto",
          paddingLeft: "var(--spacing-gutter)",
          paddingRight: "var(--spacing-gutter)",
        }}
      >
        {/* TODO: Contact content goes here */}
        <p style={{ color: "var(--color-text-muted)" }}>Contact — placeholder</p>
      </div>
    </section>
  );
}
