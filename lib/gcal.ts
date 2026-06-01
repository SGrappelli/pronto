/** Build a Google Calendar "Add to Calendar" URL from local date/time strings. */
export function buildGCalUrl(opts: {
  businessName: string
  serviceName: string
  employeeName?: string | null
  date: string        // YYYY-MM-DD
  time: string        // HH:mm
  durationMin: number
  timezone?: string | null
  address?: string | null
}): string {
  const [year, month, day] = opts.date.split('-')
  const [hour, minute] = opts.time.split(':')

  const pad2 = (n: number) => String(n).padStart(2, '0')
  const startStr = `${year}${month}${day}T${hour}${minute}00`

  const startMins = parseInt(hour) * 60 + parseInt(minute)
  const endMins = startMins + opts.durationMin
  const endHour = Math.floor(endMins / 60) % 24
  const endMinute = endMins % 60
  const dayOverflow = Math.floor(endMins / (24 * 60))
  const endDay = parseInt(day) + dayOverflow
  const endStr = `${year}${month}${String(endDay).padStart(2, '0')}T${pad2(endHour)}${pad2(endMinute)}00`

  return assembleGCalUrl(opts.businessName, opts.serviceName, opts.employeeName, startStr, endStr, opts.timezone ?? null, opts.address ?? null)
}

/** Build a Google Calendar URL from an ISO timestamp (server-side, with real timezone conversion). */
export function buildGCalUrlFromISO(opts: {
  businessName: string
  serviceName: string
  employeeName?: string | null
  startsAt: string    // ISO datetime
  durationMin: number
  timezone: string
  address?: string | null
}): string {
  const toGCalDate = (iso: string, tz: string): string => {
    const d = new Date(iso)
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(d)
    const get = (type: string) => parts.find(p => p.type === type)?.value ?? '00'
    const h = get('hour').replace('24', '00')
    return `${get('year')}${get('month')}${get('day')}T${h}${get('minute')}${get('second')}`
  }

  const endDate = new Date(new Date(opts.startsAt).getTime() + opts.durationMin * 60_000)
  const startStr = toGCalDate(opts.startsAt, opts.timezone)
  const endStr = toGCalDate(endDate.toISOString(), opts.timezone)

  return assembleGCalUrl(opts.businessName, opts.serviceName, opts.employeeName, startStr, endStr, opts.timezone, opts.address ?? null)
}

function assembleGCalUrl(
  businessName: string,
  serviceName: string,
  employeeName: string | null | undefined,
  startStr: string,
  endStr: string,
  timezone: string | null,
  address: string | null,
): string {
  const details = [
    `Service: ${serviceName}`,
    ...(employeeName ? [`With: ${employeeName}`] : []),
    `Booked via Pronto`,
  ].join('\n')

  const parts = [
    `action=TEMPLATE`,
    `text=${encodeURIComponent(`Appointment at ${businessName}`)}`,
    `dates=${startStr}/${endStr}`,
    `details=${encodeURIComponent(details)}`,
    ...(timezone ? [`ctz=${encodeURIComponent(timezone)}`] : []),
    ...(address ? [`location=${encodeURIComponent(address)}`] : []),
  ]

  return `https://calendar.google.com/calendar/render?${parts.join('&')}`
}
