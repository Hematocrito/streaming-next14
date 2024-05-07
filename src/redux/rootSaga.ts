import { all, fork } from "redux-saga/effects";
import { watchLogin } from "@redux/auth/authSaga";
import { watchCurrentUser } from "@redux/user/userSaga";


const rootSaga = function* () {
    yield all([
      fork(watchLogin),
      fork(watchCurrentUser),
      // Other forks
    ]);
  };
  
  export default rootSaga;