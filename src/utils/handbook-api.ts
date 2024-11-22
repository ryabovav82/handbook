import { setCookie, getCookie } from './cookie';
import { TUser } from '@utils-types';

// const URL = process.env.BURGER_API_URL;
const URLDB = 'http://localhost:3001';
const URL = 'https://norma.nomoreparties.space/api';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export type TServerResponseStatus = { success: boolean };

type TServerResponse<T> = TServerResponseStatus & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      return refreshData;
    });

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};
//Получаем все menuItem c cards
// export const getMenuItemsApi = () =>
//   fetch(`${URLDB}/menuItem`)
//     .then((res) => checkResponse<any>(res))
//     .then((data) => {
//       if (data?.success) return data.data;
//       return Promise.reject(data);
//     });

export const getMenuItemsApi = () =>
  fetch(`${URLDB}/menuitem`)
    .then((res) => res.json())
    .then((data) => data);

export const getCardsApi = (id: string) =>
  fetch(`${URLDB}/menuitem/card/${id}`)
    .then((res) => res.json())
    .then((data) => data);

//Получаем все faqItem
export const getFaqItemsApi = () =>
  fetch(`${URLDB}/faqitem`)
    .then((res) => checkResponse<any>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

//Добавление menuItem
export const addMenuItemApi = (data: any) =>
  fetch(`${URLDB}/menuitem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<any>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

//Добавление card
export const addCardApi = (data: any) =>
  fetch(`${URLDB}/menuitem/card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<any>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

//Добавление faqItem
export const AddFaqItemApi = (data: any) =>
  fetch(`${URLDB}/menuitem/card`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<any>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

//Изменяем MenuItem
export const changeMenuItemApi = (data: any) =>
  fetch(`${URLDB}/menuitem:${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<any>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

//Изменяем Card
export const changeCardApi = (data: any) =>
  fetch(`${URLDB}/menuitem/card:${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<any>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

//Изменяем faqItem
export const changeFaqItemApi = (data: any) =>
  fetch(`${URLDB}/faqitem:${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<any>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

//Удаляем MenuItems
export const delMenuItemApi = (data: any) =>
  fetch(`${URLDB}/menuitem:${data.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then((res) => checkResponse<any>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

//Удаляем MenuItems
export const delCardApi = (data: any) =>
  fetch(`${URLDB}/menuitem/card:${data.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then((res) => checkResponse<any>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

//Удаляем faqItem
export const delFaqItemApi = (data: any) =>
  fetch(`${URLDB}/faqitem:${data.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then((res) => checkResponse<any>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export type TLoginData = {
  email: string;
  password: string;
};

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData) =>
  fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

//Логинимся
export const loginUserApi = (data: TLoginData) =>
  fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<any>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const getUserApi = () =>
  fetchWithRefresh<any>(`${URL}/auth/user`, {
    headers: {
      authorization: getCookie('accessToken')
    } as HeadersInit
  });

export const logoutApi = () =>
  fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((res) => checkResponse<TServerResponse<{}>>(res));
