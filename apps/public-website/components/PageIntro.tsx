import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: Props) {
  return (
    <section className="page-intro">
      <div className="page-intro__inner">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p className="lede">{description}</p>
        {(primaryHref || secondaryHref) && (
          <div className="cta-row">
            {primaryHref && primaryLabel ? (
              <Link href={primaryHref} className="btn btn--primary">
                {primaryLabel}
              </Link>
            ) : null}
            {secondaryHref && secondaryLabel ? (
              <Link href={secondaryHref} className="btn btn--ghost">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
