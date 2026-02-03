export type RootDrawerParamsList = {
  index: undefined;
  recipes: {
    screens: ["new-recipe-batch"];
    params: { id: number; startTime?: number; endTime?: number };
  };
  "new-item": undefined;
  "new-purchase": undefined;
  cultures: undefined;
  tasks: { params: { id: any; startTime: any; endTime: any } };
  inventory: undefined;
  purchases: undefined;
  usage: undefined;
  "DB Management": undefined;
};


export type InventoryItemParamList = {
  "New Item": {msg: string, msg2: string};
  "New Purchase Log": undefined;
};