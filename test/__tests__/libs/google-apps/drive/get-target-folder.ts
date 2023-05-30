import { describe, expect, it } from '@jest/globals'
import getTargetFolder from '../../../../../src/libs/google-apps/drive/get-target-folder'

describe('getTargetFolder', () => {
  it('should call console log with correct message if successful', async () => {
    const targetFolderName = '#RL - Agent Paperwork'

    const folder = await getTargetFolder({
      folderToSearch: DriveApp.getFolderById('asdfasdfasdf'),
      targetFolderName,
    })
    expect(folder?.getName()).toEqual('#RL - Agent Paperwork')
  })
})
