import GasDate from './date'
import Form from './form'
import FormResponse from './form-response'
import ItemResponse from './item-response'

type IFormApp = RosterMechanics.Test.FormApp.IFormApp

export default class FormApp implements IFormApp {
  //   Alignment: typeof Alignment
  //   DestinationType: typeof DestinationType
  //   FeedbackType: typeof FeedbackType
  //   ItemType: typeof ItemType
  //   PageNavigationType: typeof PageNavigationType
  //   create(title: string): Form {}
  //   createCheckboxGridValidation(): CheckboxGridValidationBuilder {}
  //   createCheckboxValidation(): CheckboxValidationBuilder {}
  //   createFeedback(): QuizFeedbackBuilder {}
  //   createGridValidation(): GridValidationBuilder {}
  //   createParagraphTextValidation(): ParagraphTextValidationBuilder {}
  //   createTextValidation(): TextValidationBuilder {}
  //   getActiveForm(): Form {}
  //   getUi(): Base.Ui {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars, class-methods-use-this
  openById(id: string): RosterMechanics.Test.Form.IForm {
    return new Form([
      new FormResponse({
        id,
        editResponseUrl:
          'https://docs.google.com/forms/d/e/1FAIpQLSfcw0zYx2SRFolsdfkpIIffHRpeCsS28ZkxKPmS05KJvQafIg/viewform?edit2=2_ABaOnufRVmu4NgYYmbrfjJJipEiRG9UosdfMRqWySNC3Ahue95a9fGdz8qoW6x0gze9HBwA',
        itemResponses: [
          new ItemResponse({ title: 'Hire Date', response: '2023-03-12' }),
          new ItemResponse({ title: 'First Name', response: 'Mocha' }),
          new ItemResponse({ title: 'Preferred Name', response: 'Mocha' }),
          new ItemResponse({ title: 'Last Name', response: 'Banjo' }),
          new ItemResponse({ title: 'Email', response: 'mocha.banjo@russlyon.com' }),
          new ItemResponse({ title: 'Role', response: ['Sales Associate', 'Relocation'] }),
          new ItemResponse({ title: 'Office', response: 'Carefree' }),
          new ItemResponse({ title: 'Critical New Hire Form', response: ['asdflkjasdlfkjdsfjwoiefjr83924835'] }),
          new ItemResponse({ title: 'Phone', response: '480-000-0000' }),
          new ItemResponse({ title: 'License Number', response: '23424525' }),
          new ItemResponse({ title: 'ADRE Link', response: 'https://www.google.com' }),
          new ItemResponse({ title: 'Date Licensed', response: '2020-03-12' }),
          new ItemResponse({ title: 'License Expiration Date', response: '2025-03-12' }),
          new ItemResponse({ title: 'Board', response: 'CAAR' }),
          new ItemResponse({ title: 'MLS ID', response: '2134234' }),
          new ItemResponse({ title: 'Board 2', response: 'GVSAR' }),
          new ItemResponse({ title: 'MLS ID 2', response: '234235' }),
          new ItemResponse({ title: 'Board 3', response: 'NAAR' }),
          new ItemResponse({ title: 'MLS ID 3', response: '234234' }),
          new ItemResponse({ title: 'Ninja', response: 'Ninja' }),
          new ItemResponse({ title: 'Ninja Audit', response: '2025-03-12' }),
          new ItemResponse({ title: 'Lone Wolf Number', response: '235245' }),
          new ItemResponse({ title: 'PC or PLLC', response: 'Yes' }),
          new ItemResponse({ title: 'Re-Hire', response: 'No' }),
          new ItemResponse({ title: 'Recruited From', response: 'Coldwell Banker' }),
          new ItemResponse({ title: 'Status Type', response: 'Husband/Wife' }),
          new ItemResponse({ title: 'Charge $395', response: 'Yes' }),
          new ItemResponse({ title: 'Monthly Fees', response: 'Full Month' }),
          new ItemResponse({ title: 'Date Fees to Start', response: '2023-03-12' }),
          new ItemResponse({ title: 'Notes', response: 'Some Notes' }),
          new ItemResponse({ title: 'Show on Roster', response: 'Yes' }),
          // delete
          // --> email already covered
          new ItemResponse({ title: 'Delete', response: 'Delete' }),
          // suspend
          // --> email already covered
          new ItemResponse({ title: 'Suspend', response: 'Suspend' }),
          new ItemResponse({ title: 'Sever Date', response: '2025-03-12' }),
          new ItemResponse({ title: 'Inactive Reason', response: 'Inactive' }),
          new ItemResponse({ title: 'New Brokerage', response: 'Coldwell Banker' }),
        ],
        timestamp: new GasDate(new Date(Date.now())),
      }),
      new FormResponse({
        id: 'asdUfu9l_Cjsxp7ic7345uUwmzytZ-2kHjeifqrYDibM',
        editResponseUrl:
          'https://docs.google.com/forms/d/e/1FAIpQasdfcw0zYx2SRFolsdfkpIIffHRpeCsS28ZkxKPmS05KJvQafIg/viewform?edit2=2_ABaOnufRVmu4NgYYmbrfjJJipEiRG9UoasdMRqWySNC3Ahue95a9fGdz8qoW6x0gze9HBwA',
        itemResponses: [
          new ItemResponse({ title: 'Hire Date', response: '2023-05-24' }),
          new ItemResponse({ title: 'First Name', response: 'Allison' }),
          new ItemResponse({ title: 'Preferred Name', response: 'Allison' }),
          new ItemResponse({ title: 'Last Name', response: 'Banker' }),
          new ItemResponse({ title: 'Email', response: 'banjoo.mochaa@russlyon.com' }),
          new ItemResponse({ title: 'Role', response: ['Sales Associate', 'Relocation'] }),
          new ItemResponse({ title: 'Office', response: 'Pinnacle Peak' }),
          new ItemResponse({ title: 'Critical New Hire Form', response: ['asdflkjasdlfkjdsfjwoiefjr83924835'] }),
          new ItemResponse({ title: 'Phone', response: '480-000-0000' }),
          new ItemResponse({ title: 'License Number', response: '23424525' }),
          new ItemResponse({ title: 'ADRE Link', response: 'https://www.google.com' }),
          new ItemResponse({ title: 'Date Licensed', response: '2020-02-24' }),
          new ItemResponse({ title: 'License Expiration Date', response: '2025-05-23' }),
          new ItemResponse({ title: 'Board', response: 'CAAR' }),
          new ItemResponse({ title: 'MLS ID', response: '2134234' }),
          new ItemResponse({ title: 'Board 2', response: 'GVSAR' }),
          new ItemResponse({ title: 'MLS ID 2', response: '234235' }),
          new ItemResponse({ title: 'Board 3', response: 'NAAR' }),
          new ItemResponse({ title: 'MLS ID 3', response: '234234' }),
          new ItemResponse({ title: 'Ninja', response: 'Ninja' }),
          new ItemResponse({ title: 'Ninja Audit', response: '2025-03-12' }),
          new ItemResponse({ title: 'Lone Wolf Number', response: '235245' }),
          new ItemResponse({ title: 'PC or PLLC', response: 'Yes' }),
          new ItemResponse({ title: 'Re-Hire', response: 'No' }),
          new ItemResponse({ title: 'Recruited From', response: 'Realty One' }),
          new ItemResponse({ title: 'Status Type', response: 'Husband/Wife' }),
          new ItemResponse({ title: 'Charge $395', response: 'Yes' }),
          new ItemResponse({ title: 'Monthly Fees', response: 'Full Month' }),
          new ItemResponse({ title: 'Date Fees to Start', response: '2023-03-12' }),
          new ItemResponse({ title: 'Notes', response: 'Some Notes' }),
          new ItemResponse({ title: 'Show on Roster', response: 'Yes' }),
          // delete
          // --> email already covered
          new ItemResponse({ title: 'Delete', response: 'Delete' }),
          // suspend
          // --> email already covered
          new ItemResponse({ title: 'Suspend', response: 'Suspend' }),
          new ItemResponse({ title: 'Sever Date', response: '2025-03-12' }),
          new ItemResponse({ title: 'Inactive Reason', response: 'Inactive' }),
          new ItemResponse({ title: 'New Brokerage', response: 'ColdWell Banker' }),
        ],
        timestamp: new GasDate(new Date(Date.now() - 1000 * 60)),
      }),
    ])
  }

  //   openByUrl(url: string): Form {}
}
