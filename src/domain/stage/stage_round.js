import Stage from './stage_base.js';

export default class Round extends Stage
{
  constructor(type)
  {
    super();
    console.log('created round with type', type);
    this.type = type;
  }

  execute()
  {
    console('round started');
  }

  handle_card_click()
  {

  }
}
