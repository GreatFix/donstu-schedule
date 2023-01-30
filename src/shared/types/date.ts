export type Year = `${number}${number}${number}${number}`
export type Month = `${0}${number}` | `${1}${0 | 1 | 2}`
export type Day = `${0 | 1 | 2}${number}` | `${3}${0 | 1}`
export type AcademicYear = `${Year}-${Year}$`
export type ISODate = `${Year}-${Month}-${Day}`
