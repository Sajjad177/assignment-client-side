import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes.tsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.tsx";
import { PersistGate } from "redux-persist/integration/react";
import ContextProvider from "./context/context.tsx";
import SocketProvider from "./provider/socketProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          {/* Ensures Socket.io is connected globally */}
          <RouterProvider router={router} />
        </SocketProvider>
      </PersistGate>
    </Provider>
    <Toaster position="top-right" />
  </ContextProvider>
);
