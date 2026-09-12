// Returns the next 3 open appointment slots as JSON.
//
// If CAL_API_KEY and CAL_EVENT_TYPE_ID are set in the Netlify environment,
// this calls the real Cal.com v1 slots API for that event type. Otherwise
// it falls back to computing slots from the practice's published business
// hours below, so the availability strip always has something honest to
// show. Once the real Cal.com account exists, set the two env vars in the
// Netlify dashboard (Site settings -> Environment variables) and this
// function switches to live data automatically, no code changes needed.

const TIME_ZONE = 'America/New_York';

// 0 = Sunday ... 6 = Saturday
const BUSINESS_HOURS = {
  0: null,
  1: { open: 8, close: 17 },
  2: { open: 8, close: 17 },
  3: { open: 8, close: 17 },
  4: { open: 8, close: 17 },
  5: { open: 8, close: 13 },
  6: null,
};

const SLOT_MINUTES = 30;
const BOOKING_LEAD_MINUTES = 60;

function zonedParts(date) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
  });
  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
  const weekdayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour === '24' ? '0' : parts.hour),
    minute: Number(parts.minute),
    weekdayIndex,
  };
}

function addDays(date, days) {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function fallbackSlots(count) {
  const now = new Date();
  const slots = [];

  for (let dayOffset = 0; dayOffset < 14 && slots.length < count; dayOffset++) {
    const candidateDate = addDays(now, dayOffset);
    const parts = zonedParts(candidateDate);
    const hours = BUSINESS_HOURS[parts.weekdayIndex];
    if (!hours) continue;

    const isToday = dayOffset === 0;
    const todayParts = isToday ? zonedParts(now) : null;

    for (let hour = hours.open; hour < hours.close; hour++) {
      for (let minute = 0; minute < 60; minute += SLOT_MINUTES) {
        if (hour === hours.close - 1 && minute + SLOT_MINUTES > 60) continue;

        if (isToday && todayParts) {
          const slotMinutesFromMidnight = hour * 60 + minute;
          const nowMinutesFromMidnight = todayParts.hour * 60 + todayParts.minute;
          if (slotMinutesFromMidnight < nowMinutesFromMidnight + BOOKING_LEAD_MINUTES) continue;
        }

        slots.push({
          year: parts.year,
          month: parts.month,
          day: parts.day,
          hour,
          minute,
        });
        if (slots.length >= count) break;
      }
      if (slots.length >= count) break;
    }
  }

  return slots.map((slot) => {
    const label = new Date(Date.UTC(slot.year, slot.month - 1, slot.day, 12, 0));
    const weekday = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', weekday: 'short' }).format(label);
    const monthDay = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' }).format(label);
    const hour12 = slot.hour % 12 === 0 ? 12 : slot.hour % 12;
    const ampm = slot.hour < 12 ? 'am' : 'pm';
    const minuteStr = slot.minute === 0 ? '' : `:${String(slot.minute).padStart(2, '0')}`;
    return {
      dateLabel: `${weekday}, ${monthDay}`,
      timeLabel: `${hour12}${minuteStr}${ampm}`,
      isoDate: `${slot.year}-${String(slot.month).padStart(2, '0')}-${String(slot.day).padStart(2, '0')}`,
    };
  });
}

async function liveSlots(count) {
  const apiKey = process.env.CAL_API_KEY;
  const eventTypeId = process.env.CAL_EVENT_TYPE_ID;
  if (!apiKey || !eventTypeId) return null;

  const start = new Date();
  const end = addDays(start, 14);
  const url = `https://api.cal.com/v1/slots?apiKey=${encodeURIComponent(apiKey)}&eventTypeId=${encodeURIComponent(eventTypeId)}&startTime=${start.toISOString()}&endTime=${end.toISOString()}&timeZone=${encodeURIComponent(TIME_ZONE)}`;

  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const flat = Object.values(data.slots || {})
    .flat()
    .map((s) => new Date(s.time))
    .sort((a, b) => a.getTime() - b.getTime())
    .slice(0, count);

  return flat.map((date) => {
    const weekday = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, weekday: 'short' }).format(date);
    const monthDay = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, month: 'short', day: 'numeric' }).format(date);
    const time = new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, hour: 'numeric', minute: '2-digit' })
      .format(date)
      .toLowerCase()
      .replace(' ', '');
    const isoDate = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(date);
    return { dateLabel: `${weekday}, ${monthDay}`, timeLabel: time, isoDate };
  });
}

export default async function handler() {
  const count = 3;
  let slots = null;
  let source = 'fallback';

  try {
    slots = await liveSlots(count);
    if (slots && slots.length === count) source = 'live';
  } catch (err) {
    slots = null;
  }

  if (!slots || slots.length < count) {
    slots = fallbackSlots(count);
  }

  return new Response(JSON.stringify({ slots, source }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=120',
    },
  });
}

export const config = { path: '/api/availability' };
