import { useEffect, useRef, useState } from "react";
import { ConnectButton } from "360dialog-connect-button";
import Head from "next/head";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

type CallbackObjectType = {
  client: string;
  channels: string[];
  revokedChannels?: string[];
};

const demoPartnerId = "f167CmPA";

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false)
  const [showScrollLabel, setshowScrollLabel] = useState<boolean>(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollContainerHeight, setScrollContainerHeight] = useState<number>(2000)


  const [partnerId, setPartnerId] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const [forwardState, setForwardState] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [partnerPayload, setPartnerPayload] = useState<string>("");

  useEffect(() => {
    setMounted(true)
  }, [])


  const handleCallback = (callbackObject: CallbackObjectType) => {
    /* The callback function returns the client ID as well as all channel IDs, for which you're enabled to fetch the API key via the Partner API */

    console.log("client ID: " + callbackObject.client);
    console.log("channel IDs: " + callbackObject.channels);
    if (callbackObject.revokedChannels) {
      console.log("revoked channel IDs: " + callbackObject.revokedChannels);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).scrollTop < 10) {
      setshowScrollLabel(true)
    } else {
      setshowScrollLabel(false)
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current != null) {
      setScrollContainerHeight(scrollContainerRef.current.clientHeight - 65);
    }
    
  }, []);


  return (
    <div className="w-screen h-screen overflow-hidden">
      <Head>
        <title>360dialog IO Demo</title>
        <meta
          name="description"
          content="360dialog Integrated Onboarding Demo Application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen flex flex-col overflow-hidden">
        <Header />

        <div className="flex flex-col pt-4 px-8 grow h-1/3">
          <div className="h-1/3 grow overflow-hidden flex flex-row pt-6 pb-6 gap-12">
            <div
              className="overflow-auto relative grow-0"
              onScroll={handleScroll}
              ref={scrollContainerRef}
            >
              <p className="text-md font-bold text-gray-700">Configure</p>
              <div className="relative flex flex-col px-2 py-8 gap-6 max-w-md">
                <p className="text-sm font-medium text-gray-900 mt-2">
                  General
                </p>
                <Input
                  label="Partner ID"
                  value={partnerId}
                  onChange={setPartnerId}
                  placeholder="Your Partner ID"
                  button={{
                    paddingRight: "pr-44",
                    component: (
                      <Button
                        disabled={partnerId === demoPartnerId}
                        onClick={() => setPartnerId(demoPartnerId)}
                      >
                        ← Insert Demo Partner
                      </Button>
                    ),
                  }}
                />
                <Input
                  label="Button Label"
                  value={label}
                  onChange={setLabel}
                  optional
                  placeholder="Create your WhatsApp Business Account"
                />

                <div>
                  <div className="h-px w-full bg-gray-300 mt-9 mb-6" />
                  <p className="text-sm font-medium text-gray-900">
                    Synchronization Parameters
                  </p>
                </div>

                <Input
                  label="Redirect URL"
                  value={redirectUrl}
                  onChange={setRedirectUrl}
                  optional
                />
                <Input
                  label="State"
                  value={forwardState}
                  onChange={setForwardState}
                  optional
                />

                <div className="h-px w-full bg-gray-300 mt-9 mb-6" />
                <p className="text-sm font-medium text-gray-900">Client Data</p>
                <Input
                  label="Number"
                  value={number}
                  onChange={setNumber}
                  optional
                />
                <Input
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  optional
                />
                <Input
                  label="Name"
                  value={clientName}
                  onChange={setClientName}
                  optional
                />
                <Input
                  label="Client ID (Partner Payload)"
                  value={partnerPayload}
                  onChange={setPartnerPayload}
                  optional
                />

                {showScrollLabel && (
                  <div
                    style={{ top: scrollContainerHeight + "px" }}
                    className="absolute z-20 left-1/2 -translate-x-1/2 flex flex-row gap-1 text-white bg-gray-800 rounded rounded-2xl pl-2 pr-4 py-1 text-xs drop-shadow-md whitespace-nowrap"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Scroll to reveal all parameters
                  </div>
                )}
                {/* <div
                  style={{ top: scrollContainerHeight + 115 + "px" }}
                  className="fixed z-10 bg-gradient-to-b from-transparent to-white h-12 w-1/2 max-w-md"
                /> */}
              </div>
            </div>

            <div className="flex flex-col grow">
              <p className="text-md font-bold text-gray-700 flex-none">
                Preview
              </p>
              <div className="mt-2 p-6 bg-gray-100 rounded-md grow">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  {mounted && (
                    <ConnectButton
                      partnerId={partnerId}
                      className="bg-gray-800 text-white hover:bg-gray-900 drop-shadow-xl rounded-md px-4 py-3 outline-none focus:ring focus:ring-gray-900 focus:ring-offset-2"
                      label={
                        label ? label : "Create your WhatsApp Business Account"
                      }
                      callback={handleCallback}
                      env={partnerId === demoPartnerId ? "staging" : "prod"}
                      requestedNumber={number}
                      queryParameters={{
                        redirect_url: redirectUrl ? redirectUrl : window.origin,
                        ...(forwardState && { state: forwardState }),
                        ...(email && { email: email }),
                        ...(clientName && { name: clientName }),
                        ...(partnerPayload && { partner: partnerPayload }),
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col w-1/4">
              <p className="text-md font-bold text-gray-700 flex-none">
                Console
              </p>
              <div className="mt-2 p-6 bg-gray-800 rounded-md grow">
                {`>`}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
