import { ILogin } from "@interfaces/auth";
import { authService } from "@services/auth.service";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { loginSuccess } from "./authSlice";


function* workLogin(action:any):any{
  console.log('Holita');
  const { payload } = action;
  console.log('Payload ', payload);
  const resp = yield authService.login(payload);
  //yield put(loginSuccess(resp.data));
  yield put({ type: 'auth/loginSuccess', payload: resp.data });
  console.log('REsp ', resp);
}

export function* watchLogin(){
   yield takeEvery('auth/login', workLogin);
}

/*
function* workLogin(action:any):any {
    console.log('Holita');
  try{  
    const { payload } = action;
    //const resp = (yield authService.login(payload)).action;
    const resp = yield authService.login(payload);
    //yield authService.setToken(resp.data.token, payload.remember);
    yield put(loginSuccess(resp.data));
    console.log('Resp ', resp);
    //yield authService.setToken(resp.token, payload.remember);
//    const userResp = (yield userService.me()).data;
  //  yield put(loginSuccess(userResp));
  }catch(error){

  }
}*/
