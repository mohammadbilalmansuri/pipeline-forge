import { cn } from "@/utils";

const Button = ({
  isLink = false,
  variant = "primary",
  disabled = false,
  className = "",
  children,
  ...props
}) => {
  const classes = cn(
    "font-medium transition-all flex items-center justify-center gap-1.5 rounded-lg h-10 py-2 px-4 cursor-pointer border-1.5",
    disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "",
    variant === "secondary"
      ? "bg-indigo-100 text-indigo-500 hover:bg-indigo-200 border-indigo-200"
      : "bg-indigo-500 text-indigo-50 hover:bg-indigo-600 border-indigo-500",
    className,
  );

  if (isLink) {
    const { href, ...linkProps } = props;
    return (
      <a
        href={!disabled ? href : undefined}
        aria-disabled={disabled}
        className={classes}
        {...linkProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
