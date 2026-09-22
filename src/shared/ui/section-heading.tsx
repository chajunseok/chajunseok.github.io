type SectionHeadingProps = {
  title: string;
  /** 섹션 순번 등 제목 위의 작은 라벨 */
  eyebrow?: string;
  description?: string;
  id?: string;
  as?: 'h1' | 'h2';
};

export function SectionHeading({ title, eyebrow, description, id, as: Heading = 'h2' }: SectionHeadingProps) {
  return (
    <header className="mb-10">
      {eyebrow && <p className="text-primary font-mono text-sm tracking-widest">{eyebrow}</p>}
      <Heading id={id} className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
        {title}
      </Heading>
      {description && <p className="text-muted-foreground mt-4 max-w-2xl">{description}</p>}
    </header>
  );
}
