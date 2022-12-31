import { useOutletContext } from 'react-router-dom'
import React, { ChangeEventHandler, Dispatch, DragEventHandler, SetStateAction, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DefaultButton, FontSizes, getTheme, Icon, Image, ImageFit, Label, mergeStyleSets, NeutralColors, PrimaryButton, Text } from '@fluentui/react'
import { useId } from '@fluentui/react-hooks'
import styles from './index.module.scss'


type Props = {
  files: File[],
  label?: string,
  reqiured?: boolean,
  multiple?: boolean,
  name?: string,
  tip?: string,
  accept?: string,
  onChange?: (files: File[]) => void,
  disabled?: boolean
}

const getSize = (size: number) => {
  const symbols = ['B', 'KB', 'MB', 'GB']
  for (let i = 0; i < symbols.length; i++) {
    if (size < 1024) {
      return `${size.toFixed(2)}${symbols[i]}`
    }
    else size /= 1024
  }
  return `${size}B`
}

const className = 'gelp-uploader'
const theme = getTheme()
const Uploader: React.FC<Props> = (props) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const id = useId('gelp-uploader')
  // const [files, setFiles] = useState<File[]>([])

  const mergedStyleSet = mergeStyleSets({
    body: {
      cursor: props.disabled ? 'default' : 'pointer',
      display: props.multiple ? 'block' : 'flex',
      '&:hover': {
        border: props.disabled ? '' : `2px solid ${theme.palette.themePrimary}`,
        color: props.disabled ? '' : theme.palette.themePrimary
      }
    }
  })

  const handleClick = () => {
    !props.disabled && fileInput.current?.click()
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const newFiles = fileInput.current!.files as FileList
    if (newFiles.length > 0) {
      const res = props.multiple ? [...newFiles, ...props.files] : [newFiles[0]]
      props.onChange?.(res)
    }
  }

  const handleDragOver: DragEventHandler<HTMLDivElement> = useCallback((ev) => {
    ev.preventDefault()
    const target = ev.target as HTMLDivElement
    target.style.border = `2px solid ${theme.palette.themePrimary}`
    target.style.color = theme.palette.themePrimary
  }, [])

  const handleDragLeave: DragEventHandler<HTMLDivElement> = useCallback((ev) => {
    const target = ev.target as HTMLDivElement
    target.style.border = ''
    target.style.color = ''
  }, [])

  const handleDrop: DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault()
    const target = ev.target as HTMLDivElement
    target.style.border = ''
    target.style.color = ''

    const newFiles = [...ev.dataTransfer.files].filter(file => !props.accept || props.accept.includes(file.type))
    const res = props.multiple ? [...newFiles, ...props.files] : (newFiles[0] ? [newFiles[0]] : [...props.files])
    props.onChange?.(res)
  }

  const handleDelete = (index: number) => {
    const newFiles = [...props.files]
    newFiles.splice(index, 1)
    props.onChange?.(newFiles)
  }

  const FileItem = (file: File, index?: number, key?: string) => {
    const isImage = file.type.toLowerCase().includes('image')
    const mergedStyles = mergeStyleSets({
      'file-item': {
        outline: `1px solid ${NeutralColors.gray40}`,
        cursor: 'default'
      }
    })

    return (
      <div style={{
        display: 'flex',
        marginBottom: 8
      }} className={mergedStyles['file-item']} key={key}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', backgroundColor: NeutralColors.gray10 }}>
          {isImage && (
            <Image src={URL.createObjectURL(file)} imageFit={ImageFit.centerCover} width={60} height={60} />
          )}
          {!isImage && (
            <Icon iconName="FileCode" styles={{ root: { fontSize: FontSizes.size32 } }} />
          )}
        </div>
        <div style={{ flex: 1, padding: '0 8px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', lineHeight: '60px' }}>{file.name}</div>
        <div style={{ padding: '0 8px', lineHeight: '60px' }}>{getSize(file.size)}</div>
        {typeof index !== 'undefined' && !props.disabled && (
          <div style={{ padding: '0 8px', lineHeight: '60px' }}>
            <PrimaryButton onClick={(ev) => {
              ev.stopPropagation()
              handleDelete(index)
            }}>删除</PrimaryButton>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={styles[className]}>
      {props.label && (
        <Label required={props.reqiured} className={styles[`${className}__label`]}>{props.label}</Label>
      )}
      <div className={styles[`${className}__body`] + ` ${mergedStyleSet.body}`} onClick={handleClick} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
        {(props.files.length === 0) && (
          <div className={styles[`${className}__body-icon`]}>
            <Icon iconName="Add" />
            {props.tip && (
              <Text styles={{ root: { color: 'inherit', marginTop: '10px' } }}>{props.tip}</Text>
            )}
          </div>
        )}
        {props.files.length !== 0 && props.multiple && (
          <div className={styles[`${className}__body-list`]}>
            {props.files.map((file, i) => FileItem(file, i, file.name + i))}
          </div>
        )}
        {props.files.length !== 0 && !props.multiple && (
          <>
            {props.files[0].type.toLowerCase().includes('image') ? (
              <Image src={URL.createObjectURL(props.files[0])} height={400} imageFit={ImageFit.centerContain} />
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#323130'
              }}>
                <Icon iconName="FileCode" styles={{ root: { fontSize: FontSizes.size32 } }} />
                <Text styles={{ root: { color: 'inherit', marginTop: '10px', fontSize: FontSizes.size20 } }}>{props.files[0].name}</Text>
              </div>
            )}
          </>)}
      </div>
      <input type="file" ref={fileInput} id={id} multiple={props.multiple} name={props.name} hidden required={props.reqiured} accept={props.accept} onChange={handleChange} />
    </div>
  )
}

export default Uploader
