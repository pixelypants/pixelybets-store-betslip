import { Observable, of } from 'rxjs';
import { ObservableStore } from '@codewithdan/observable-store';
import { ReduxDevToolsExtension } from '@codewithdan/observable-store-extensions';

export interface Bet {
  id: number,
  name: string,
  amount: number
}

export interface StoreState {
  bets: Bet[];
}

ObservableStore.addExtension(new ReduxDevToolsExtension({ reactRouterHistory: history }))

class BetslipStore extends ObservableStore<StoreState> {
  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
    const initialState: StoreState = {
      bets: [
        {
          id: 1234,
          name: 'Bet One',
          amount: 6
        },
        {
          id: 2345,
          name: 'Bet Two',
          amount: 2
        }
      ],
    };
    this.setState(initialState, betslipStoreActions.InitBetsState);
  }

  addBet(bet: Bet) {
    let bets = [...this.getState().bets, bet];
    this.setState({ bets: bets }, betslipStoreActions.AddBet);
  }

  deleteBet(id: number) {
    let bets = this.getState().bets;
    let index = bets.findIndex(bet => bet.id == id);
    bets.splice(index, 1);
    this.setState({ bets: bets }, betslipStoreActions.DeleteBet);
  }
}

export const betslipStoreActions = {
  AddBet: 'ADD_BET',
  DeleteBet: 'DELETE_BET',
  InitBetsState: 'INIT_BETS_STATE',
};

export default new BetslipStore();
