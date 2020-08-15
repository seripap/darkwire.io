/**
 * Handle localStorage persistence
 */

import { debounce } from 'lodash';
import { getTranslations } from 'i18n';

export const loadPersistedState = () => {
  const state = {};
  const language = localStorage.getItem('language');
  const username = localStorage.getItem('username');
  const soundIsEnabled = localStorage.getItem('soundIsEnabled');
  const notificationIsEnabled = localStorage.getItem('notificationIsEnabled');

  state.app = {};
  if (language) {
    state.app.language = language;
    state.app.translations = getTranslations(language);
  }
  state.user = {};
  if (username) {
    state.user.username = username;
  }
  state.app.soundIsEnabled = soundIsEnabled !== 'n';
  state.app.notificationIsEnabled = notificationIsEnabled !== 'n';
  return state;
};

let prevState;

export const persistState = debounce(async store => {
  const state = store.getState();

  // We need prev state to compare
  if (prevState) {
    const {
      user: { username },
      app: { notificationIsEnabled, soundIsEnabled, language },
      room: { id: roomId },
    } = state;

    if (prevState.room.id !== roomId && roomId) {
      if (!prevState) console.log('room id set');
    }

    if (prevState.user.notificationIsEnabled !== notificationIsEnabled) {
      localStorage.setItem('notificationIsEnabled', notificationIsEnabled ? 'y' : 'n');
    }
    if (prevState.app.soundIsEnabled !== soundIsEnabled) {
      localStorage.setItem('soundIsEnabled', soundIsEnabled ? 'y' : 'n');
    }
    if (prevState.user.username !== username && username) {
      localStorage.setItem('username', username);
    }
    if (prevState.app.language !== language && language) {
      localStorage.setItem('language', language);
    }
  }
  prevState = JSON.parse(JSON.stringify(state));
}, 1000);
