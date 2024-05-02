export type Indexed<T = unknown> = {
  [key in string]: T;
};

export type PageProps = Indexed & {
  routeHandlers: Record<string, () => void>
};

export interface UserState {
  id: number,
  login: string,
  first_name: string,
  second_name: string,
  avatar: string,
  email: string,
  phone: string,
}

export interface BadgeState {
  message: string,
  isError: boolean,
}

export interface ChatState {
  avatar: string;
  title: string;
  last_message: {
    time: string,
    content: string,
  };
  id: number,
  unread_count: number;
}

export interface MessageState {
  content: string,
  time: string,
  user_id: number,
}
