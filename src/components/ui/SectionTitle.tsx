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
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.8rem]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
