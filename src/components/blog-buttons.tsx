import { tv, type VariantProps } from "tailwind-variants";

const buttonStyles = tv({
  base: "rounded-lg hover:cursor-pointer",
  variants: {
    action: {
      add: "inline-flex items-center justify-center mb-4 px-4 py-2 text-sm font-medium text-white bg-slate-900 transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 active:scale-95 group",
      confirm:
        "px-4 py-2 text-sm font-medium text-white bg-slate-900 transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 active:scale-95 group",
      edit: "px-3 py-1.5 text-xs font-medium text-slate-500 transition-all duration-200 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200",
      cancel:
        "px-4 py-2 text-sm font-medium bg-slate-100 transition-all duration-200 text-slate-900 hover:bg-slate-200 active:bg-slate-300",
      del: "px-3 py-1.5 text-xs font-medium text-red-400 opacity-60 transition-all duration-200 hover:opacity-100 hover:text-red-600 active:scale-95",
      publish:
        "px-3 py-1.5 text-xs font-medium border border-slate-200 transition-all duration-200 active:scale-95 hover:bg-slate-900 hover:text-white hover:border-slate-900",
    },
  },
});

interface BlogButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  name: string;
  icon?: React.ReactNode;
}

export default function BlogButton({
  action,
  name,
  icon,
  className,
  children,
  ...props
}: BlogButtonProps) {
  return (
    <button className={buttonStyles({ action, className })} {...props}>
      {icon}
      {name || children}
    </button>
  );
}
