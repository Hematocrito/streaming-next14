import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { setUpdating } from "@redux/user/userSlice";
import { userService } from "@services/user.service";
import { updateUserSuccess } from "@redux/user/userSlice";
import { updateUserFail } from "@redux/user/userSlice";

function* workCurrentUser(action:any):any{
  try {  
    yield put(setUpdating(true));
    const updated = yield userService.updateMe(action.payload);
    yield put(updateUserSuccess(updated.data));
  } catch (e) {
    const error = yield Promise.resolve(e);
    yield put(updateUserFail(error));
  } finally {
    yield put(setUpdating(false));
  }
}

export function* watchCurrentUser(){
    yield takeEvery('user/updateCurrentUser', workCurrentUser);
 }