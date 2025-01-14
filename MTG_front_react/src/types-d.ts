export interface UserInterface {
  id?: number;
  name?: string;
  email: string;
  password: string;
}
export type registredUser = {
  email: string;
  password: string;
};

export type myUserContext = {
  id: string;
  name: string;
  email: string;
  role: string;
  isLogged: boolean;
  avatar: string;
};

export type Params = {
  params: {
    userId: string;
  };
};

export interface UserContextType {
  user: myUserContext;
  defaultUser: myUserContext;
  setUser: React.Dispatch<React.SetStateAction<myUserContext>>;
}

export interface CardPromise {
  data: CardInterface[];
  total: number;
  page: number;
  pageCount: number;
}

export interface ExtensionInterface {
  name: string;
  value: string;
}

export interface CardInterface {
  card_id: string;
  name: string;
  image_uris: {
    normal: string;
  };
}

export interface DeckInterface {
  id: string;
  name: string;
  description: string;
  cardStacks: cardStackInterface[];
}

export interface cardStackInterface {
  card: CardInterface;
  quantity: number;
}

export interface cardQueryInterface {
  colors: string;
  rarity: string;
  size: number;
  currentPage: number;
  set: string;
  type: string;
}
