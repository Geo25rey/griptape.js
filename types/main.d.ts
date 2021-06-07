import { SigningCosmWasmClient } from 'secretjs';
import { Wallet } from './wallet';
export * from './utils/scrt';
export interface Griptape {
    wallet: Wallet;
    scrtClient: SigningCosmWasmClient;
}
export interface Contract {
    createViewingKey(): Promise<string>;
    setAddress(address: string): void;
    setScrtClient(scrtClient: SigningCosmWasmClient): void;
}
export interface ContractConfig {
    address: string;
    instance: Contract;
}
export interface GriptapeConfig {
    restUrl: string;
    contract: ContractConfig;
}
export declare function grip(conf: GriptapeConfig): Promise<Griptape>;
