import { useEffect, useState } from "react";

interface QlikTestPageProps {
    appId: string
}

function QlikSheet({ appId }: QlikTestPageProps) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const scriptTag1 = document.createElement("script");
        scriptTag1.src = "/access-token.js";
        document.body.appendChild(scriptTag1);

        const scriptTag = document.createElement("script");
        scriptTag.src = "https://cdn.jsdelivr.net/npm/@qlik/embed-web-components@1/dist/index.min.js";
        scriptTag.type = "application/javascript";
        scriptTag.crossOrigin = "anonymous";
        scriptTag.setAttribute("data-auth-type", "OAuth2");
        scriptTag.setAttribute("data-host", import.meta.env.VITE_TENANT_URI!);
        scriptTag.setAttribute("data-client-id", import.meta.env.VITE_OAUTH_CLIENT_ID!);
        scriptTag.setAttribute("data-get-access-token", "getAccessToken");
        scriptTag.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(scriptTag);
    }, []);

    useEffect(() => {
        if (!loaded) return;

    }, [loaded]);

    return (
        <div className="flex flex-col w-full">
            {/* <div className="">
                    <qlik-embed ui="analytics/selections" app-id={appId}></qlik-embed>
                </div>
                h-[calc(100vh-130px)]*/}
            <div className="h-[calc(100vh-70px)] flex-[2_0_auto] relative overflow-auto " >
                <qlik-embed ui="classic/app" app-id={appId}></qlik-embed>
            </div>
        </div >
    )
}

export default QlikSheet
