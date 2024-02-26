import * as React from 'react'
import { useContext } from 'react'
import { useWorkflowManager } from './hooks/useWorkflowManager'
import { saveDocument } from '../../../crud/save'
import { createNewDocument } from '../../../crud/create'

import BioEditForm from '../../views/biography/BioEditForm'
import CalendarEditForm from '../../views/calendar/CalendarEditForm'

import ListButton from '../ListButton'
import ModalWrapper from '../modals/ModalWrapper'
import SaveModal from '../modals/SaveModal'
import DeleteModal from '../modals/DeleteModal'
import { GlobalAppStateManagement } from '../../../Cms'
import BlogEditForm from '../../views/blog/BlogEditForm'
import PhotosEditForm from '../../views/photos/PhotosEditForm'
import VideosEditForm from '../../views/videos/VideosEditForm'
import AudioEditForm from '../../views/audio/AudioEditForm'
import { useFormInitializer } from './hooks/useFormInitializer'
import PlaylistsEditForm from '../../views/playlists/PlaylistsEditForm'
import { audioFormFieldStateIF, bioFormFieldStateIF, blogFormFieldStateIF, calendarFormFieldStateIF, formTypes, photosFormFieldStateIF, playlistFormFieldStateIF, videosFormFieldStateIF } from 'suli-violin-website-types/src'

const EditorWrapper = () => {
  const [ globalAppState, setGlobalAppState ] = useContext(GlobalAppStateManagement)
  const { currentTab } = globalAppState
  
  const [ currFormType, formFieldValues, setFormFieldValues ] = useFormInitializer(currentTab as formTypes)
  useWorkflowManager(globalAppState, setGlobalAppState)

  return (
    <div 
      className="edit-wrapper"
      style={{
        background: 'white',
        outline: '2px gainsboro outset',
        margin: '10px',
        padding: '5px',
      }}
    >
      <div 
        className="edit-display-header"
        style={{
          background: 'white',
          display: 'flex',
          marginRight: '20px'
        }}
      >
        <nav>
          <ul
            id="edit-nav-list"
            style={{
              display: 'flex',
              listStyleType: 'none',
              padding: 0
            }}
          >
            <ListButton
              text={'NEW'}
              onClickHandler={ () => createNewDocument(globalAppState, setGlobalAppState) }
              isDisabled={false}
            />
            <ListButton
              text={'SAVE'}
              onClickHandler={ () => saveDocument(globalAppState, setGlobalAppState, formFieldValues) }
              isDisabled= { globalAppState.editFieldsEnabled ? false : true }
            />
            <div
              id="edit-nav-saved-message"
              style={{
                display: 'none',
                marginLeft: '20px',
                fontWeight: 900,
                fontFamily: 'arial',
                background: 'lightgreen',
                padding: 5,
                alignItems: 'center'
              }}
            >SAVED!</div>
          </ul>
        </nav>
      </div>
      <div className="edit-main">
        { 
          currFormType !== currentTab ? null
            : currentTab === 'audio' ? <AudioEditForm formFieldValues={formFieldValues as audioFormFieldStateIF} setFormFieldValues={setFormFieldValues}/>
            : currentTab === 'bio' ? <BioEditForm formFieldValues={formFieldValues as bioFormFieldStateIF} setFormFieldValues={setFormFieldValues}/>
            : currentTab === 'blog' ? <BlogEditForm formFieldValues={formFieldValues as blogFormFieldStateIF} setFormFieldValues={setFormFieldValues}/>
            : currentTab === 'calendar' ? <CalendarEditForm formFieldValues={formFieldValues as calendarFormFieldStateIF} setFormFieldValues={setFormFieldValues}/>
            : currentTab === 'photos' ? <PhotosEditForm formFieldValues={formFieldValues as photosFormFieldStateIF} setFormFieldValues={setFormFieldValues}/>
            : currentTab === 'playlists' ? <PlaylistsEditForm formFieldValues={formFieldValues as playlistFormFieldStateIF} setFormFieldValues={setFormFieldValues}/>
            : currentTab === 'videos' ? <VideosEditForm formFieldValues={formFieldValues as videosFormFieldStateIF} setFormFieldValues={setFormFieldValues}/>
            : null
        }
      </div>
      <div>
        <ModalWrapper isOpen={globalAppState.modal.isOpen}>
          {
            globalAppState.modal.type === '' ? null 
              : globalAppState.modal.type === 'save' ? <SaveModal formFieldValues={formFieldValues}/> 
              : globalAppState.modal.type === 'delete' ? <DeleteModal/> 
              : null
          }
        </ModalWrapper>
      </div>
    </div>
  )
}




export default EditorWrapper