"use client";

import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

interface PendingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren { }

export default function PendingButton({ children, disabled, ...props }: PendingButtonProps) {
  const { pending } = useFormStatus();
  return <button
    disabled={pending || disabled}
    {...props}
  >{children}</button>
}
