interface DropdownItem {
  label: string
  value: string
}

export function enumToDropdownItems(enumObject: Record<string, string>, emptyItem: DropdownItem | null = null) {
  const items: DropdownItem[] = []

  if (emptyItem) {
    items.push(emptyItem)
  }

  return [
    ...items,
    ...Object.entries(enumObject).map(([_key, value]) => ({
      label: value,
      value,
    })),
  ]
}
