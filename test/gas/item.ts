type IItem = RosterMechanics.Test.Item.IItem

export default class Item implements IItem {
  private readonly title
  constructor({ title }: { title: string }) {
    this.title = title
  }

  //   asCheckboxGridItem(): CheckboxGridItem {}
  //   asCheckboxItem(): CheckboxItem {}
  //   asDateItem(): DateItem {}
  //   asDateTimeItem(): DateTimeItem {}
  //   asDurationItem(): DurationItem {}
  //   asGridItem(): GridItem {}
  //   asImageItem(): ImageItem {}
  //   asListItem(): ListItem {}
  //   asMultipleChoiceItem(): MultipleChoiceItem {}
  //   asPageBreakItem(): PageBreakItem {}
  //   asParagraphTextItem(): ParagraphTextItem {}
  //   asScaleItem(): ScaleItem {}
  //   asSectionHeaderItem(): SectionHeaderItem {}
  //   asTextItem(): TextItem {}
  //   asTimeItem(): TimeItem {}
  //   asVideoItem(): VideoItem {}
  //   duplicate(): Item {}
  //   getHelpText(): string {}
  //   getId(): Integer {}
  //   getIndex(): Integer {}

  getTitle(): string {
    return this.title
  }

  //   getType(): ItemType {}
  //   setHelpText(text: string): Item {}
  //   setTitle(title: string): Item {}
}
