import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./rootReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["auth"],
  blacklist: [],
  transforms: [
    encryptTransform({ secretKey: "my-secret-key" }),
  ],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: pReducer,
  middleware: () => [thunk],
});

const persistor = persistStore(store);

export { store, persistor };