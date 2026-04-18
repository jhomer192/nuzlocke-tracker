interface TypeBadgeProps {
  type: string;
  small?: boolean;
}

export function TypeBadge({ type, small }: TypeBadgeProps) {
  return (
    <span
      className={`type-${type} inline-block rounded-full font-semibold uppercase tracking-wider text-white ${
        small ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
      }`}
    >
      {type}
    </span>
  );
}
