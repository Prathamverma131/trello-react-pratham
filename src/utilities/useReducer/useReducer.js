const cardReducer = (state, action) => {
  switch (action.type) {
    case "fetchdata":
      return action.payload.cardData;
    case "addcard":
      return [...state, action.payload.newCard];
    default:
      return state;
  }
};

const ListReducer = (state, action) => {
  switch (action.type) {
    case "apicall":
      return action.payload.listData;
    case "addlist":
      return [...state, action.payload.addedList];
    case "deletelist":
      return action.payload.deletedList;
    default:
      return state;
  }
};

const cardListReducer = (state, action) => {
  switch (action.type) {
    case "apicall":
      return action.payload.cardData;
    case "newcard":
      return [...state, action.payload.newCardData];
    case "deletecard":
      return action.payload.filteredCard;
    default:
      return state;
  }
};

const checkListReducer = (state, action) => {
  switch (action.type) {
    case "apicall":
      return action.payload.checkListData;
    case "newlist":
      return [...state, action.payload.newlist];
    case "filteredlist":
      return action.payload.filteredlist;
    default:
      return state;
  }
};

const checkItemReducer = (state, action) => {
  switch (action.type) {
    case "apicall":
      return action.payload.itemdata;
    case "additem":
      return [...state, action.payload.newitem];
    case "filterData":
      return action.payload.filterData;
    case "checkData":
      return action.payload.checkData;
    default:
      return state;
  }
};

export {
  cardReducer,
  ListReducer,
  cardListReducer,
  checkListReducer,
  checkItemReducer,
};
