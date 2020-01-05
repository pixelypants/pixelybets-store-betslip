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
    super({ trackStateHistory: true, logStateChanges: true, includeStateChangesOnSubscribe: false });
    const initialState: StoreState = {
      bets: [],
    };
    this.setState(initialState, betslipStoreActions.InitBetsState);
  }

  getBets() {
    return of(this.getState().bets);
  }

  addBet(bet: Bet) {
    let bets = this.getState().bets;
    let isInBetSlip = bets.findIndex(b => {
      return b.id === bet.id
    })
    if(isInBetSlip >= 0)
    {
      this.deleteBet(bet.id)
    }
    else
    {
      let addBets = [...bets, bet];
      this.setState({ bets: addBets }, betslipStoreActions.AddBet);
    }
  }

  deleteBet(id: number) {
    let bets = this.getState().bets;
    let index = bets.findIndex(bet => bet.id == id);
    bets.splice(index, 1);
    this.setState({ bets: bets }, betslipStoreActions.DeleteBet);
  }
}

export const betslipStoreActions = {
  GetBets: 'GET_BETS',
  AddBet: 'ADD_BET',
  DeleteBet: 'DELETE_BET',
  InitBetsState: 'INIT_BETS_STATE',
};

export default new BetslipStore();
