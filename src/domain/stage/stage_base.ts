export default interface Stage
{
  execute() : void;
  finished() : void;

  handle_card_click() : void;
  handle_vote_submit() : void;
}
