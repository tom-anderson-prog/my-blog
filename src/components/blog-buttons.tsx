import { tv } from "tailwind-variants";

const buttonStyles = tv({
  base: "rounded-lg hover:cursor-pointer",
  variants: {
    action: {
      add: "inline-flex items-center justify-center mb-4 px-4 py-2 text-sm font-medium text-white bg-slate-900 transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 active:scale-95 group",
      edit: "px-3 py-1.5 text-xs font-medium text-slate-500 transition-all duration-200 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200",
      del: "px-3 py-1.5 text-xs font-medium text-red-400 opacity-60 transition-all duration-200 hover:opacity-100 hover:text-red-600 active:scale-95",
      publish:
        "px-3 py-1.5 text-xs font-medium border border-slate-200 transition-all duration-200 active:scale-95 hover:bg-slate-900 hover:text-white hover:border-slate-900",
    },
  },
});

type BlogButtonProps = {
  action: "add" | "edit" | "del" | "publish";
  name: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
};

export default function BlogButton({
  action,
  name,
  type = "button",
  icon,
}: BlogButtonProps) {
  return (
    <button type={type} className={buttonStyles({ action })}>
      {icon}
      {name}
    </button>
  );
}
