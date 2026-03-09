import { GalleryVerticalEndIcon } from "lucide-react"

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GalleryVerticalEndIcon className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">ORBITTO</span>
        <span className="truncate text-xs">v1.0.0</span>
      </div>
    </div>
  )
}
