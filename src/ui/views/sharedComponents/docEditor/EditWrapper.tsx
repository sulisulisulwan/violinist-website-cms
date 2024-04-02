import * as React from 'react'
import { useContext } from 'react'
import { useWorkflowManager } from './hooks/useWorkflowManager'
import { saveDocument } from '../../../../crud/save'

import BioEditForm from '../../biography/BioEditForm'
import CalendarEditForm from '../../calendar/CalendarEditForm'

import ListButton from '../ListButton'
import ModalWrapper from '../modals/ModalWrapper'
import SaveModal from '../modals/SaveModal'
import DeleteModal from '../modals/DeleteModal'
import { GlobalAppStateManagement } from '../../../../Cms'
import BlogEditForm from '../../blog/BlogEditForm'
import PhotosEditForm from '../../photos/PhotosEditForm'
import VideosEditForm from '../../videos/VideosEditForm'
import AudioEditForm from '../../audio/AudioEditForm'
import { useFormInitializer } from './hooks/useFormInitializer'
import PlaylistsEditForm from '../../playlists/PlaylistsEditForm'
import { audioFormFieldStateIF, bioFormFieldStateIF, blogFormFieldStateIF, calendarFormFieldStateIF, formTypes, initStateIF, photosFormFieldStateIF, playlistFormFieldStateIF, videosFormFieldStateIF } from 'suli-violin-website-types/src'

const EditorWrapper = () => {
  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ globalAppState, setGlobalAppState ] = appStateManagement
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
        height: 'calc(100% - 30px)'
      }}
    >
      <div 
        className="edit-display-header"
        style={{
          background: 'white',
          display: 'flex',
          marginRight: 20,
          height: 62
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
              text={'SAVE'}
              onClickHandler={ () => saveDocument(globalAppState, setGlobalAppState, formFieldValues) }
              isDisabled= { globalAppState.editFieldsEnabled ? false : true }
            />
            <ListButton
              text={'CLOSE'}
              onClickHandler={ () => setGlobalAppState((pS: initStateIF) => ({ ...pS, editDocId: null, currWorkflow: '', editFieldsEnabled: false, displayDocId: null })) }
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
      <div 
        className="edit-main"
        style={{
          height: '100%'
        }}
      >
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