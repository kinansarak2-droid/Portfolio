export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "icon";
export type ButtonSize    = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  loading?:  boolean;
  icon?:     React.ReactNode;
  iconPosition?: "left" | "right";
  asChild?:  boolean; // render as <a> or other element
}
