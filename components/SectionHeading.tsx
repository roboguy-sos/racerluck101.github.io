import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="eyebrow">
        <span className="text-accent">{"// "}</span>
        {eyebrow}
      </p>
      <h2 className="heading mt-3">{title}</h2>
      {description ? (
        <p className="mt-4 text-pretty text-sm leading-relaxed text-white/80 sm:text-base">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
