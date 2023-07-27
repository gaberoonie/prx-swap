// scroll bar
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
// Providers
import { SearchProvider } from "./contexts/SearchContext";
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Provider as ReduxProvider } from "react-redux";

import {
  ChainId,
  DAppProvider,
  useEtherBalance,
  useEthers,
} from "@usedapp/core";

import { store } from "redux/store";
import { BrowserRouter } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const config = {
  // readOnlyChainId: ChainId.BSCTestnet,
};

ReactDOM.render(
  <StrictMode>
    <DAppProvider config={config}>
      <SearchProvider>
        <ReduxProvider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CollapseDrawerProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CollapseDrawerProvider>
          </LocalizationProvider>
        </ReduxProvider>
      </SearchProvider>
    </DAppProvider>
  </StrictMode>,
  document.getElementById("root")
);
