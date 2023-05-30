import Item from './item'

type IItemResponse = RosterMechanics.Test.ItemResponse.IItemResponse

export default class ItemResponse implements IItemResponse {
  private readonly title
  private readonly response
  constructor({ title, response }: { title: string; response: string[][] | string[] | string }) {
    this.title = title
    this.response = response
  }

  //   getFeedback(): QuizFeedback {}

  getItem(): RosterMechanics.Test.Item.IItem {
    return new Item({ title: this.title })
  }

  getResponse(): string[][] | string[] | string {
    return this.response
  }
  //   getScore(): number {}
  //   setFeedback(feedback: any): ItemResponse {}
  //   setScore(score: any): ItemResponse {}
}
