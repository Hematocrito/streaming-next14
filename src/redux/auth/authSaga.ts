import { ILogin } from "@interfaces/auth";
import { authService } from "@services/auth.service";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { loginSuccess } from "./authSlice";
import { userService } from "@services/user.service";
import { updateCurrentUser } from "@redux/user/userSlice";
import { useRouter } from "next/router";


function* workLogin(action:any):any{
  console.log('Holis');
  try{ 
  const { payload } = action;
  const resp = (yield authService.login(payload)).data;
  yield put(loginSuccess(resp));
  yield authService.setToken(resp.token, payload.remember);
  const userResp = (yield userService.me()).data;
  yield put(updateCurrentUser(userResp));
  }catch(error) {
    console.log('Saga error ', error);
  }
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
