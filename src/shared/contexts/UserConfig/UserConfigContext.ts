import { createContext, useContext } from 'react'

import { IUserConfigContext } from './types'

export const INITIAL_STATE: IUserConfigContext = {
  data: {
    groupId: null,
    groupName: null,
    faculty: null,
    theme: 'light',
    platform: null,
    post: 'group',
    teacherId: null,
    teacherName: null,
    classroomId: null,
    classroomName: null,
    helpers: null,
  },
  bridgeSupport: false,
  inited: false,
  setGroup: () => {},
  setPost: () => {},
  setTheme: () => {},
  setTeacher: () => {},
  setClassroom: () => {},
}

export const UserConfigContext = createContext<IUserConfigContext>(INITIAL_STATE)

export const useUserConfig = () => useContext(UserConfigContext)
