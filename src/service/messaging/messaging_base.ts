import * as Card from '../../domain/card.js';

type Action = string;
type Callback = (...args: any[]) => void;

type GameUpdateType = 'open' | 'give';
type GameUpdate = Record<GameUpdateType, [ClientID, Card.Name]>;

interface MessagingBase
{
  // Client connection
  subscribe(action: Action, cb: Callback): void;
  establish(game_id: string, host: boolean): void;
  revoke(): void;

  // Client updates
  update_presence(players: Record<string, any>): void;
  update_data(cid: ClientID, data: any): void;

  // Host actions
  start_game(): void;
  update_game(update: GameUpdate): void;
}

export
{
  type Action, type Callback,
  type GameUpdate, type MessagingBase
};
