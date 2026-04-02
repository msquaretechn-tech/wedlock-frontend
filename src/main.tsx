import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { PersistGate } from 'redux-persist/integration/react';
import { store,persistor } from "./Redux/store.ts";
import { Toaster } from "sonner";



import "./index.css";


createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <Toaster position="top-right" richColors />
      <div className="overflow-x-hidden">
      <App />


      </div>
      </PersistGate>
    </Provider>
);
