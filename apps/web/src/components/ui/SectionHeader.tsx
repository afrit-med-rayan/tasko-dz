interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, align = "center", action }: SectionHeaderProps) {
  return (
    <div
      className={`mb-10 flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "items-start"} ${action ? "sm:flex-row sm:items-end sm:justify-between" : ""}`}
    >
      <div className={align === "center" ? "max-w-2xl" : ""}>
        <h2 className="text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-base text-mid-gray">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
