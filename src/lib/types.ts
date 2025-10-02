export type User = {
  username: string;
  profileUrl: string;
};

export type Snapshot = {
  date: string;
  followers: User[];
  following: User[];
};
