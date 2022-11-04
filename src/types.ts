import React from "react";

export interface ButtonProps {
  name?: string;
  background?: string;
  borderColor?: string;
  color?: string;
}

export interface SectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}
