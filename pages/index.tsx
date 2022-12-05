import { useEffect, useRef, useState } from "react";
import { ConnectButton } from "360dialog-connect-button";
import Head from "next/head";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism";
import { dedent } from "ts-dedent";

SyntaxHighlighter.registerLanguage("jsx", jsx);

type CallbackObjectType = {
  client: string;
  channels: string[];
  revokedChannels?: string[];
};

type QueryParametersType = {
  email: string;
  clientName: string;
  partnerPayload: string;
  redirectUrl: string;
  forwardState: string;
};

const demoPartnerId = "f167CmPA";

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [showScrollLabel, setshowScrollLabel] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollContainerHeight, setScrollContainerHeight] =
    useState<number>(2000);

  const [partnerId, setPartnerId] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [queryParametersState, setQueryParamatersState] =
    useState<QueryParametersType>({
      email: "",
      clientName: "",
      partnerPayload: "",
      redirectUrl: "",
      forwardState: "",
    });
  const [callbackObject, setcallbackObject] = useState<CallbackObjectType>();

  const handleQueryParameterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setQueryParamatersState((queryParametersState) => ({
      ...queryParametersState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCallback = (callbackObject: CallbackObjectType) => {
    /* The callback function returns the client ID as well as all channel IDs, for which you're enabled to fetch the API key via the Partner API */

    if (mounted) {
      setcallbackObject(callbackObject);

      console.log("Client ID: " + callbackObject.client);
      console.log("Channel IDs: " + callbackObject.channels);
      if (callbackObject.revokedChannels) {
        console.log("Revoked Channel IDs: " + callbackObject.revokedChannels);
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).scrollTop < 10) {
      setshowScrollLabel(true);
    } else {
      setshowScrollLabel(false);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current != null) {
      setScrollContainerHeight(scrollContainerRef.current.clientHeight - 65);
    }
  }, []);


  const returnQueryParameterLiteral = () => {
  
    const parameters = [
      { stateVar: "email", queryParam: "email" },
      { stateVar: "clientName", queryParam: "name" },
      { stateVar: "partnerPayload", queryParam: "partner" },
      { stateVar: "forwardState", queryParam: "state" },
      { stateVar: "redirectUrl", queryParam: "redirect_url" },
    ];

    var literalStringArr: string[] = [];

    parameters.forEach((v, idx) => {
      if (
        queryParametersState[v.stateVar as keyof QueryParametersType] !== ""
      ) {
        literalStringArr.push(
          `${v.queryParam}: "${
            queryParametersState[v.stateVar as keyof QueryParametersType]
          }"`
        );
      }
    });

    if (literalStringArr.length > 0) {
      return (`queryParameters={{\n\t${literalStringArr.join(",\n\t")}\n}}`);
    } else {
      return ``
    }
    
  };


  const generateCodeSnippet = ():string => {
    let textBase = dedent(
      `<ConnectButton
        partnerId={${partnerId}}
        callback={() => {
          console.log("Client ID: " + callbackObject.client);
          console.log("Channel IDs: " + callbackObject.channels);
          if (callbackObject.revokedChannels) {
            console.log("Revoked Channel IDs: " + callbackObject.revokedChannels);
          }
        }}
        className="" // <-- Insert your own styles via className definition or through inline styling
        label={${label ? label : "Create your WhatsApp Business Account"}}
        `
    );

    if (number) {
      textBase = textBase.concat(`\nrequestedNumber="${number}"`)
    }

    const parameters = [
      { stateVar: "email", queryParam: "email" },
      { stateVar: "clientName", queryParam: "name" },
      { stateVar: "partnerPayload", queryParam: "partner" },
      { stateVar: "forwardState", queryParam: "state" },
      { stateVar: "redirectUrl", queryParam: "redirect_url" },
    ];

    var literalStringArr: string[] = [];

    parameters.forEach((v) => {
      if (
        queryParametersState[v.stateVar as keyof QueryParametersType] !== ""
      ) {
        literalStringArr.push(
          `${v.queryParam}: "${
            queryParametersState[v.stateVar as keyof QueryParametersType]
          }",`
        );
      }
    });

    let queryParams = returnQueryParameterLiteral();
    if (queryParams !== ``) {
      textBase = textBase.concat("\n", queryParams)
    }
  
    return textBase.concat( "\n/>")
  }

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
          <div className="h-1/3 grow overflow-hidden flex flex-row pt-6 pb-6 gap-6 min-w-fit">
            <div
              className="overflow-auto relative grow-0 pr-6 min-w-fit"
              onScroll={handleScroll}
              ref={scrollContainerRef}
            >
              <p className="text-md font-bold text-gray-700">Configure</p>
              <div className="relative flex flex-col px-2 py-8 gap-6 min-w-fit max-w-md">
                <p className="text-sm font-medium text-gray-900 mt-2">
                  General
                </p>
                <Input
                  label="Partner ID"
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
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
                  onChange={(e) => setLabel(e.target.value)}
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
                  name="redirectUrl"
                  value={queryParametersState.redirectUrl}
                  onChange={handleQueryParameterChange}
                  optional
                />
                <Input
                  label="State"
                  name="forwardState"
                  value={queryParametersState.forwardState}
                  onChange={handleQueryParameterChange}
                  optional
                />

                <div className="h-px w-full bg-gray-300 mt-9 mb-6" />
                <p className="text-sm font-medium text-gray-900">Client Data</p>
                <Input
                  label="Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  optional
                />
                <Input
                  label="Email"
                  name="email"
                  value={queryParametersState.email}
                  onChange={handleQueryParameterChange}
                  optional
                />
                <Input
                  label="Name"
                  name="clientName"
                  value={queryParametersState.clientName}
                  onChange={handleQueryParameterChange}
                  optional
                />
                <Input
                  label="Client ID (Partner Payload)"
                  name="partnerPayload"
                  value={queryParametersState.partnerPayload}
                  onChange={handleQueryParameterChange}
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
                        clipRule="evenodd"
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

            <div className="flex flex-col grow pr-6">
              <div className="flex flex-col grow">
                <p className="text-md font-bold text-gray-700 flex-none">
                  Preview
                </p>
                <div className="mt-2 p-6 bg-dots rounded-md grow border border-gray-100">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    {mounted && (
                      <ConnectButton
                        partnerId={partnerId}
                        className="bg-gray-800 text-white hover:bg-gray-900 drop-shadow-xl rounded-md px-4 py-3 outline-none focus:ring focus:ring-gray-900 focus:ring-offset-2"
                        label={
                          label
                            ? label
                            : "Create your WhatsApp Business Account"
                        }
                        callback={handleCallback}
                        env={partnerId === demoPartnerId ? "staging" : "prod"}
                        requestedNumber={number}
                        queryParameters={{
                          redirect_url: queryParametersState.redirectUrl
                            ? queryParametersState.redirectUrl
                            : window.origin,
                          ...(queryParametersState.forwardState && {
                            state: queryParametersState.forwardState,
                          }),
                          ...(queryParametersState.email && {
                            email: queryParametersState.email,
                          }),
                          ...(queryParametersState.clientName && {
                            name: queryParametersState.clientName,
                          }),
                          ...(queryParametersState.partnerPayload && {
                            partner: queryParametersState.partnerPayload,
                          }),
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col grow pt-6 h-2/3">
                <p className="text-md font-bold text-gray-700 flex-none">
                  Connect Button Code
                </p>
                <div className="mt-2 bg-gray-50 rounded-md grow text text-gray-900 font-mono text-sm h-full">
                  {mounted && (
                    <SyntaxHighlighter
                      language="jsx"
                      style={prism}
                      customStyle={{ background: "transparent" }}
                      className="w-full h-full p-6 max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-full"
                    >
                      {generateCodeSnippet()}
                    </SyntaxHighlighter>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col w-1/4 max-w-xl">
              <p className="text-md font-bold text-gray-700 flex-none">
                Console
              </p>
              <div className="mt-2 p-6 bg-gray-800 rounded-md grow text text-white font-mono text-sm">
                {callbackObject ? (
                  <div className="pb-8">
                    <p>Client ID: {callbackObject.client}</p>
                    <p>Channel IDs: {callbackObject.channels}</p>
                    {callbackObject.revokedChannels && (
                      <p>
                        Revoked Channel IDs: {callbackObject.revokedChannels}
                      </p>
                    )}
                  </div>
                ) : (
                  `>_`
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
