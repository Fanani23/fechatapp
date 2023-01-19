import { applyMiddleware, createStore } from "redux";
import rootReducers from "../Reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import io from "socket.io-client";
import socketIO from "socket.io-redux";

const store = createStore(
  rootReducers,
  applyMiddleware(thunk, logger, socketIO(io.connect("http://localhost:3003")))
);

export default store;
