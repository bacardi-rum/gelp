import ControlledModal from "@components/ControlledModal"
import Message from "@components/Message"
import Uploader from "@components/Uploader"
import { getLevel } from "@config/level"
import {
  DefaultButton,
  FontWeights,
  Label,
  mergeStyleSets,
  MessageBarType, MotionAnimations,
  MotionDurations,
  NeutralColors,
  Persona,
  PersonaSize,
  PrimaryButton,
  Stack,
  Text,
  TextField
} from '@fluentui/react'
import { useAppDispatch, useAppSelector } from "@hooks"
import cloud from "@laf"
import { APPID } from "@laf/config"
import { uploadCover } from "@redux/slices/courseSlice"
import { changeUserInfo, getUserByUserId } from "@redux/slices/userSlice"
import { CSSProperties, FormEventHandler, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

type ProfileItemProps = {
  label: string,
  text?: string | number,
  multiline?: boolean
}

const ProfileItem: React.FC<ProfileItemProps> = (props) => {
  const style = mergeStyleSets({
    body: {
      position: 'relative',
      padding: 16,
      border: '1px solid #edebe9',
      '&:hover': {
        borderColor: '#c8c6c4',
        '&::after': {
          content: "",
          position: 'absolute',
          inset: 0,
          border: '1px solid #c8c6c4'
        }
      }
    }
  })

  return (
    <div className={style.body}>
      <Label>{props.label}</Label>
      {props.multiline && props.text && (
        <Text styles={{ root: { fontWeight: FontWeights.regular, color: NeutralColors.gray160 } }}>{props.text || '无数据'}</Text>
      )}
      {(!props.multiline || !props.text) && (
        <Text variant="xxLarge" styles={{ root: { fontWeight: FontWeights.regular, color: NeutralColors.gray160 } }}>{props.text || '无数据'}</Text>
      )}
    </div>
  )
}

const ProfileView = () => {
  const { _id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [otherUser, setOtherUser] = useState<UserInfo>()
  const user = useAppSelector(state => state.user)
  const [level] = getLevel(_id ? (otherUser?.score ?? 0) : (user.score ?? 0))
  const [modalOpen, setModalOpen] = useState(false)

  const getFileKey = (url: string) => {
    const splits = url.split('/')
    return splits[splits.length - 1]
  }

  useEffect(() => {
    if (_id && user._id && _id === user._id) { navigate('/profile', { replace: true }) }
    if (_id && user._id && _id !== user._id) {
      dispatch(getUserByUserId({ user_id: _id, token: '' }))
        .then(({ payload }) => {
          if (payload) setOtherUser(payload)
          else navigate('/profile', { replace: true })
        })
    }
  }, [_id, user._id])

  useEffect(() => {
    if (user.avatarUrl) {
      fetch(user.avatarUrl)
        .then(async res => [await res.blob(), res.headers.get('content-type')])
        .then(([blob, type]) => new File([blob as Blob], getFileKey(user.avatarUrl!), { type: type as string }))
        .then(file => setAvatar([file]))
    }
  }, [user.avatarUrl])

  const subtitleStyle: CSSProperties = useMemo(() => {
    return {
      fontWeight: FontWeights.regular,
      color: NeutralColors.gray120,
      marginLeft: '10px'
    }
  }, [])

  const stackItemStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: '#fff',
      padding: 16
    }
  }, [])

  const [modifiedUser, setModifiedUser] = useState<Partial<UserInfo>>()
  const [avatar, setAvatar] = useState<File[]>([])
  const [submitDisabled, setSubmitDisabled] = useState(false)

  useEffect(() => { setModifiedUser(user) }, [user])

  const handleModify = function <T extends keyof UserInfo>(field: T, value: UserInfo[T]) {
    const newUser = { ...modifiedUser }
    newUser[field] = value
    setModifiedUser(newUser)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault()
    setSubmitDisabled(true)
    if (user.avatarUrl) {
      await cloud.delete(getFileKey(user.avatarUrl) as string)
    }

    if (avatar.length > 0 && (_id || user._id)) {
      await dispatch(uploadCover([
        `${user._id}_${avatar[0].name}` as string,
        avatar[0],
        avatar[0].type
      ]))
    }

    dispatch(changeUserInfo(Object.assign({
      _id: user._id,
      intro: modifiedUser?.intro,
      token: user.token,
      email: modifiedUser?.email,
      phone: modifiedUser?.phone,
      avatarUrl: `https://${APPID}-public.oss.laf.run/${user._id}_${avatar[0].name}`
    },
      user.identity === 0 ? {
        grade: modifiedUser?.grade,
        class: modifiedUser?.class,
        age: modifiedUser?.age
      } : {})))
      .then(() => {
        setModalOpen(false)
        setSubmitDisabled(false)
        return Message.show(MessageBarType.success, '修改成功。')
      })
      .catch(() => {
        Message.show(MessageBarType.error, '修改失败。')
      })
  }

  return (
    <section style={{ padding: 40, animation: MotionAnimations.slideUpIn, animationDuration: MotionDurations.duration4 }}>
      <ControlledModal header="修改资料" isOpen={modalOpen} isBlocking handleDismiss={setModalOpen} footer={(
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <PrimaryButton form="gelp-modify-user-form" type="submit" disabled={submitDisabled}>确定</PrimaryButton>
          <DefaultButton onClick={() => setModalOpen(false)}>取消</DefaultButton>
        </div>
      )} body={(
        <form id="gelp-modify-user-form" onSubmit={handleSubmit}>
          <Stack tokens={{ childrenGap: 10 }}>
            <Stack.Item>
              <TextField multiline autoAdjustHeight name="intro" label="个人简介" value={modifiedUser?.intro} onChange={(_, newVal) => handleModify('intro', newVal)} />
            </Stack.Item>
            <Stack.Item>
              {modifiedUser?.identity === 0 && (
                <Stack horizontal tokens={{ childrenGap: 10 }}>
                  <Stack.Item grow={1}>
                    <TextField name="grade" label="年级" type="number" min={1} max={5} value={modifiedUser?.grade?.toString()} onChange={(_, newVal) => handleModify('grade', Number(newVal))} />
                  </Stack.Item>
                  <Stack.Item grow={1}>
                    <TextField name="class" label="班级" value={modifiedUser?.class?.toString()} onChange={(_, newVal) => handleModify('class', newVal)} />
                  </Stack.Item>
                  <Stack.Item grow={1}>
                    <TextField name="age" label="年龄" type="number" min={1} max={120} value={modifiedUser?.age?.toString()} onChange={(_, newVal) => handleModify('age', Number(newVal))} />
                  </Stack.Item>
                </Stack>
              )}
              <Stack styles={{ root: { marginTop: 10 } }} tokens={{ childrenGap: 10 }}>
                <Stack.Item>
                  <TextField name="email" label="邮箱" value={modifiedUser?.email} onChange={(_, newVal) => handleModify('email', newVal as string)} />
                </Stack.Item>
                <Stack.Item>
                  <TextField name="phone" label="电话" pattern="1\d{10}" value={modifiedUser?.phone} onChange={(_, newVal) => handleModify('phone', newVal as string)} />
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item>
              <Uploader files={avatar} onChange={setAvatar} label="头像" bodyStyle={{ backgroundColor: '#fff' }} />
            </Stack.Item>
          </Stack>
        </form>
      )} />
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack.Item>
          <Text variant="xxLarge" style={{ fontWeight: FontWeights.regular }}>{_id ? '他人资料' : '个人资料'}</Text>
          <Text variant="large" style={subtitleStyle}>Profile</Text>
        </Stack.Item>
        {_id && (
          <Stack.Item style={stackItemStyle}>
            <Persona text={otherUser?.name} secondaryText={otherUser?.identity === 0 ? '学生/Student' : '教师/Professor'} size={PersonaSize.size72}
              imageUrl={otherUser?.avatarUrl} imageAlt={otherUser?.nickname} />
          </Stack.Item>
        )}
        {!_id && (
          <Stack.Item style={stackItemStyle}>
            <Stack horizontal>
              <Stack.Item grow={1}>
                <Persona text={user.name} secondaryText={user.identity === 0 ? '学生/Student' : '教师/Professor'} size={PersonaSize.size72}
                  imageUrl={user.avatarUrl} imageAlt={user.nickname} key={user.avatarUrl} />
              </Stack.Item>
              {user.identity === 0 && (
                <Stack.Item align="center">
                  <Text variant="xxLargePlus" styles={{ root: { fontWeight: FontWeights.regular, color: NeutralColors.gray160 } }}>Lv.{level}</Text>
                </Stack.Item>
              )}
            </Stack>
          </Stack.Item>
        )}
        {_id && (
          <Stack.Item style={stackItemStyle}>
            <Stack>
              <Stack.Item>
                <ProfileItem label="个人简介" text={otherUser?.intro} multiline />
              </Stack.Item>
            </Stack>
            <Stack horizontal>
              <Stack.Item grow={1}>
                <ProfileItem label="邮箱" text={otherUser?.email} />
              </Stack.Item>
              <Stack.Item grow={1}>
                <ProfileItem label="电话" text={otherUser?.phone} />
              </Stack.Item>
            </Stack>
          </Stack.Item>
        )}
        {!_id && (
          <Stack.Item style={stackItemStyle}>
            <Stack>
              <Stack.Item>
                <ProfileItem label="个人简介" text={user.intro} multiline />
              </Stack.Item>
            </Stack>
            {user.identity === 0 && (
              <Stack horizontal>
                <Stack.Item grow={1}>
                  <ProfileItem label="年级" text={user.grade} />
                </Stack.Item>
                <Stack.Item grow={1}>
                  <ProfileItem label="班级" text={user.class} />
                </Stack.Item>
                <Stack.Item grow={1}>
                  <ProfileItem label="年龄" text={user.age} />
                </Stack.Item>
              </Stack>
            )}
            <Stack horizontal>
              <Stack.Item grow={1}>
                <ProfileItem label="邮箱" text={user.email} />
              </Stack.Item>
              <Stack.Item grow={1}>
                <ProfileItem label="电话" text={user.phone} />
              </Stack.Item>
            </Stack>
            <Stack styles={{ root: { marginTop: 16 } }}>
              <Stack.Item>
                <PrimaryButton onClick={() => setModalOpen(true)}>修改资料</PrimaryButton>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        )}
      </Stack>
    </section>
  )
}

export default ProfileView
