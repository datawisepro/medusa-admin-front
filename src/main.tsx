import { MedusaProvider } from "medusa-react"
import type { PropsWithChildren } from "react"
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./assets/styles/global.css"
import { LayeredModalProvider } from "./components/molecules/modal/layered-modal"
import { SteppedProvider } from "./components/molecules/modal/stepped-modal"
import { FeatureFlagProvider } from "./context/feature-flag"
import { baseApiUrl } from "./services/config"
import queryClient from "./services/queryClient"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const Page = ({ children }: PropsWithChildren) => {
  console.log(baseApiUrl)
  return (
    <MedusaProvider
      baseUrl={baseApiUrl}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <FeatureFlagProvider>
        <SteppedProvider>
          <LayeredModalProvider>{children}</LayeredModalProvider>
          <ReactQueryDevtools />
        </SteppedProvider>
      </FeatureFlagProvider>
    </MedusaProvider>
  )
}

const root = createRoot(document.getElementById("root")!)
root.render(
  <React.StrictMode>
    <Page>
      <App />
    </Page>
  </React.StrictMode>
)
