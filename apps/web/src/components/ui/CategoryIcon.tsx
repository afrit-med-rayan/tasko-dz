import {
  Palette,
  Video,
  Languages,
  Code2,
  Share2,
  PenLine,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  palette: Palette,
  video: Video,
  languages: Languages,
  code: Code2,
  share: Share2,
  pen: PenLine,
};

interface CategoryIconProps {
  icon: string;
  className?: string;
}

export function CategoryIcon({ icon, className = "" }: CategoryIconProps) {
  const Icon = iconMap[icon] || LayoutGrid;
  return (
    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-teal-wash text-teal ${className}`}>
      <Icon size={22} strokeWidth={1.75} />
    </div>
  );
}
