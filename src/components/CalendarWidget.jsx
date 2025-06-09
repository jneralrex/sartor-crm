// components/CalendarWidget.jsx
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US' // ✅ ESM import
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [
  {
    title: 'Board Meeting',
    allDay: false,
    start: new Date(2025, 4, 15, 10, 0),
    end: new Date(2025, 4, 15, 12, 30),
  },
  {
    title: 'Vacation',
    start: new Date(2025, 4, 20),
    end: new Date(2025, 4, 25),
  },
]

const CalendarWidget = () => {
  const [view, setView] = useState(Views.MONTH)

  return (
    <div className="h-[600px] bg-white p-4 rounded-md shadow">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={(newView) => setView(newView)}
        selectable
        popup
        style={{ height: 500 }}
      />
    </div>
  )
}

export default CalendarWidget
