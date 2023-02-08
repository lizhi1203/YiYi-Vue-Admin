export interface ThemeConfigProps {
  layout: string;
}

export interface GlobalState {
  token: string;
  userInfo: any;
  assemblySize: string;
  language: string;
  themeConfig: ThemeConfigProps
}

export interface AuthState {
  routeName: string;
  authButtonList: {
    [key: string]: string[]
  },
  authMenuList: Menu.MenuOptions[]
}