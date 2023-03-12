import { IClassroom, IGroup, ITeacher } from 'shared/types/donstu'

export interface IUserData {
  groupId: string | null
  groupName: string | null
  faculty: string | null
  theme: 'dark' | 'light'
  platform: string | null
  post: 'group' | 'teacher' | 'classroom'
  teacherId: string | null
  teacherName: string | null
  classroomId: string | null
  classroomName: string | null
  helpers: string | null
}

export interface IUserConfigContext {
  data: IUserData
  bridgeSupport: boolean
  inited: boolean
  setTeacher: (teacher: Pick<ITeacher, 'id' | 'name'>) => void
  setGroup: (group: Pick<IGroup, 'id' | 'name' | 'facul'>) => void
  setClassroom: (group: IClassroom) => void
  setPost: (post: IUserData['post']) => void
  setTheme: (theme: IUserData['theme']) => void
}
