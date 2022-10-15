import { reactive } from 'vue';

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/GroupMembership.js').GroupMemberShip[]} */
  myGroupMemberShips: [],

  /** @type {import('./models/Group.js').Group[]} */
  groups: [],

  /** @type {import('./models/GroupMembership.js').GroupMemberShip | null} */
  activeGroup: null,

  /** @type {import('./models/Account.js').Account[]} */
  groupMembers: [],

  /** @type {import('./models/BoardGame/BGList.js').BGList[]} */
  bgLists: [],
  /** @type {import('./models/BoardGame/BoardGame.js').BoardGame[]} */
  boardgames: [],

  /** @type {import('./models/BoardGame/BoardGame.js').BoardGame[]} */
  scrollBoardGames: [],

  /** @type {import('./models/BoardGame/BoardGame.js').BoardGame | null} */
  activeBoardGame: null,

  activeImage: null,

  /** @type {import('./models/BoardGame/ActiveBoardGameImage.js').ActiveBoardGameImage[]} */
  activeBoardGameImages: [],

  /** @type {import('./models/BoardGame/ActiveBoardGameVideo.js').ActiveBoardGameVideo[]} */
  activeBoardGameVideos: [],

  /** @type {import('./models/BoardGame/ActiveBoardGamePrice.js').ActiveBoardGamePrice[]} */
  activeBoardGamePrices: [],

  /** @type {import('./models/BoardGame/ABGReviews.js').ABGReviews[]} */
  activeBoardGameReviews: [],

  activeCategoryFilters: [],
  categories: [
    { name: 'CardGame', id: 'eX8uuNlQkQ' },
    { name: 'Fantasy', id: 'ZTneo8TaIO' },
    { name: 'Economic', id: 'N0TkEGfEsF' },
    { name: 'Scifi', id: '3B3QpKvXD3' },
    { name: 'City Building', id: 'ODWOjWAJj3' },
    { name: 'Party Game', id: 'X8J7RM6dxX' },
    { name: 'Adventure', id: 'KUBCKBkGxV' },
    { name: 'Bluffing', id: 'PinhJrhnxU' },
    { name: 'Dice', id: 'mavSOM8vjH' },
    { name: 'Horror', id: 'cAIkk5aLdQ' },
    { name: 'Puzzle', id: 'WVMOS3s2pb' },
    { name: 'Cooperative', id: 'ge8pIhEUGE' },
    { name: 'Wargame', id: 'jX8asGGR6o' },
    { name: 'Word game', id: 'rHvAx4hH2f' },
  ],
  skip: 0,
});
