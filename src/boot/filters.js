export default async ({ Vue }) => {
  Vue.filter('formatted', function (value) {
    if (value instanceof Date) {
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(value)
    }

    if (typeof value === 'number') {
      return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(value)
    }

    if (typeof value === 'string') {
      const match = value.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/)

      if (match) {
        return match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4]
      }
    }

    return value
  })
  Vue.filter('datetime', function (value, delimeter) {
    if (value instanceof Date) {
      return {
        date: new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(value),
        time: new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' }).format(value),
        toString () {
          return [this.date, this.time].join(delimeter || ' ')
        }
      }
    }
    return value
  })
}
