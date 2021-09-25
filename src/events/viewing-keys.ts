import { subscribeEvent, Callback } from './index';

/**
 * This event gets emitted when a viewing key is created.
 */
export function onViewingKeyCreated(callback: Callback) {
  subscribeEvent('viewing-key-created', callback);
}

export function onViewingKeyReady(callback: Callback) {
  subscribeEvent('viewing-key-ready', callback);
}