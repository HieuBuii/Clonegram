export interface IContext {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: URL | string;
  bio: string;
  followed: string[];
  following: string[];
  conversations: string[];
  imageId: string;
};

export interface IUserUpdate extends IUser {
  file: File[];
  $id?: string;
}

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export interface IUserDB {
  accountId: string;
  name: string;
  email: string;
  username: string;
  imageUrl: URL;
}

export interface IPost {
  caption: string;
  tags: string[];
  imageUrl: string;
  imageId: string;
  location: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  creator: IUser;
  likes: IUser;
  $databaseId: string;
  $collectionId: string;
}
