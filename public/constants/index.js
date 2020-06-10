export const keys = [
  '1NPRUSRW9SUDESWQ',
  'OTF3Q8BLOVNOFA0A',
  '8Q133ANRR1SAMC72',
  '5C7VFB9FRAI8BJ3A',
  'R0C510MH6QVXW6U6',
  'GXQSJYQV0HUC8K36',
  'PQEC9C7770HVOE2N',
  'RTWOC6TOAJZ0V4IK',
  'FSTBF9VCIJBINAW4',
  'V8IF0IE0PXKD2RCI',
  'NUO5GSC6P498HMSR',
  'VQ71NAMSTEA6O070',
  'RMZ79NV7NLDIW9E9'
]

// used for API calls yyyy-mm-dd
export const formatDate = function() {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

// mm-dd-yyyy @ hh-mm
export const formatTime = function() {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    min = d.getMinutes()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  const date = [month, day, year].join('-')
  const time = [hour, min].join(':')
  return [date, time].join(' @ ')
}
