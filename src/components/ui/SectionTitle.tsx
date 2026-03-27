type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={[
        align === "center" ? "space-y-4 text-center" : "space-y-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-primary sm:text-[11px] sm:tracking-[0.32em]">
        {eyebrow}
      </p>
      ) : null}
      <h2 className="max-w-4xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-[2.8rem]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
