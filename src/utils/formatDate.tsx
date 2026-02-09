export function formatDate(
  date: string | Date,
  locale: string = "pt-BR"
): string {
  return new Intl.DateTimeFormat(locale).format(
    typeof date === "string" ? new Date(date) : date
  )
}
