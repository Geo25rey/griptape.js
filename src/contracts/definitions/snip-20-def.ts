import { Amount } from '../../modules/types';
import {
  BaseContract,
  Context,
  ContractDefinition,
  ContractQueryRequest,
  ContractMessageResponse,
} from '../types';

export const snip20Def: ContractDefinition = {
  queries: {
    getBalance({ address, key }: Context): ContractQueryRequest {
      return { balance: { address, key } };
    },

    getTokenInfo(): ContractQueryRequest {
      return { token_info: {} };
    },

    getTransferHistory(
      { address, key }: Context,
      page_size: number,
      page?: number
    ): ContractQueryRequest {
      return { transfer_history: { address, key, page_size, page } };
    },

    getMinters(): ContractQueryRequest {
      return { minters: {} };
    },

    getAllowance(
      _: Context,
      owner: string,
      spender: string,
      key: string
    ): ContractQueryRequest {
      return { allowance: { owner, spender, key } };
    },

    getExchangeRate(): ContractQueryRequest {
      return { exchange_rate: {} };
    },
  },

  messages: {
    transfer({ padding }: Context, recipient: string, amount: string) {
      const handleMsg = {
        transfer: { recipient, amount, padding },
      };
      return { handleMsg };
    },

    send(
      { padding }: Context,
      recipient: string,
      amount: string,
      msg?: string
    ) {
      const handleMsg = {
        send: { recipient, amount, msg, padding },
      };
      return { handleMsg };
    },

    registerReceive({ padding }: Context, code_hash: string) {
      const handleMsg = {
        register_receive: { code_hash, padding },
      };
      return { handleMsg };
    },

    createViewingKey({ padding, entropy }: Context) {
      const handleMsg = {
        create_viewing_key: { entropy, padding },
      };
      return { handleMsg };
    },

    setViewingKey({ padding }: Context, key: string) {
      const handleMsg = {
        set_viewing_key: { key, padding },
      };
      return { handleMsg };
    },

    increaseAllowances(
      { padding }: Context,
      spender: string,
      amount: string,
      expiration?: number
    ) {
      const handleMsg = {
        increase_allowance: { spender, amount, expiration, padding },
      };
      return { handleMsg };
    },

    decreaseAllowance(
      { padding }: Context,
      spender: string,
      amount: string,
      expiration?: number
    ) {
      const handleMsg = {
        decrease_allowance: { spender, amount, expiration, padding },
      };
      return { handleMsg };
    },

    transferFrom(
      { padding }: Context,
      owner: string,
      recipient: string,
      amount: string
    ) {
      const handleMsg = {
        transfer_from: { owner, recipient, amount, padding },
      };
      return { handleMsg };
    },

    sendFrom(
      { padding }: Context,
      owner: string,
      recipient: string,
      amount: string,
      msg?: string
    ) {
      const handleMsg = {
        send_from: { owner, recipient, amount, msg, padding },
      };
      return { handleMsg };
    },

    mint({ padding }: Context, recipient: string, amount: string) {
      const handleMsg = {
        mint: { recipient, amount, padding },
      };
      return { handleMsg };
    },

    setMinters({ padding }: Context, minters: string[]) {
      const handleMsg = {
        set_minters: { minters, padding },
      };
      return { handleMsg };
    },

    burn({ padding }: Context, amount: string) {
      const handleMsg = {
        burn: { amount, padding },
      };
      return { handleMsg };
    },

    burnFrom({ padding }: Context, owner: string, amount: string) {
      const handleMsg = {
        burn_from: { owner, amount, padding },
      };
      return { handleMsg };
    },

    deposit({ padding }: Context) {
      const handleMsg = {
        deposit: { padding },
      };
      return { handleMsg };
    },

    redeem({ padding }: Context, amount: string, denom?: string) {
      const handleMsg = {
        redeem: { amount, denom, padding },
      };
      return { handleMsg };
    },
  },
};

export interface MessageResponse {
  status: string;
}
export interface Snip20Contract extends BaseContract {
  getBalance(): Promise<{ balance: { amount: string } }>;
  getTokenInfo(): Promise<{
    name: string;
    symbol: string;
    decimals: number;
    total_supply: string;
  }>;
  getTransferHistory(
    page_size: number,
    page?: number
  ): Promise<{
    transfer_history: {
      txs: [
        {
          id: string;
          from: string;
          sender: string;
          receiver: string;
        }
      ];
      coins: {
        amount: string;
        denom: string;
      };
    };
  }>;
  getMinters(): Promise<{ minters: { minters: string[] } }>;
  getAllowance(
    owner: string,
    spender: string,
    key: string
  ): Promise<{
    allowance: {
      spender: string;
      owner: string;
      allowance: string;
      expiration: number;
    };
  }>;
  getExchangeRate(): Promise<{
    exchange_rate: { rate: string; denom: string };
  }>;
  transfer(
    recipient: string,
    amount: string
  ): Promise<ContractMessageResponse<{ transfer: MessageResponse }>>;
  send(
    recipient: string,
    amount: string,
    msg?: string
  ): Promise<ContractMessageResponse<{ send: MessageResponse }>>;
  registerReceived(
    code_hash: string
  ): Promise<ContractMessageResponse<{ register_receive: MessageResponse }>>;
  createViewingKey(): Promise<
    ContractMessageResponse<{ create_viewing_key: { key: string } }>
  >;
  setViewingKey(
    key: string
  ): Promise<ContractMessageResponse<{ set_viewing_key: MessageResponse }>>;
  increaseAllowances(
    spender: string,
    amount: string,
    expiration?: number
  ): Promise<
    ContractMessageResponse<{
      increase_allowance: {
        spender: string;
        owner: string;
        allowance: string;
      };
    }>
  >;
  decreaseAllowance(
    spender: string,
    amount: string,
    expiration?: number
  ): Promise<
    ContractMessageResponse<{
      decrease_allowance: {
        spender: string;
        owner: string;
        allowance: string;
      };
    }>
  >;
  transferFrom(
    owner: string,
    recipient: string,
    amount: string
  ): Promise<ContractMessageResponse<{ transfer_from: MessageResponse }>>;
  sendFrom(
    owner: string,
    recipient: string,
    amount: string,
    msg?: string
  ): Promise<ContractMessageResponse<{ send_from: { status: string } }>>;
  mint(
    recipient: string,
    amount: string
  ): Promise<ContractMessageResponse<{ mint: { status: string } }>>;
  setMinters(
    minters: string[]
  ): Promise<ContractMessageResponse<{ set_minters: { status: string } }>>;
  burn(
    amount: string
  ): Promise<ContractMessageResponse<{ burn: { status: string } }>>;
  burnFrom(
    owner: string,
    amount: string
  ): Promise<ContractMessageResponse<{ burn_from: { status: string } }>>;
  deposit(): Promise<ContractMessageResponse<{ deposit: { status: string } }>>;
  redeem(
    amount: string,
    denom?: string
  ): Promise<ContractMessageResponse<{ redeem: { status: string } }>>;
}