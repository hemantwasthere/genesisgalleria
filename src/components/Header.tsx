import {
  DynamicWidget,
  useDynamicContext,
  useIsLoggedIn,
} from "@dynamic-labs/sdk-react-core";

export default function Header() {
  const isLoggedIn = useIsLoggedIn();
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <div>
      {isLoggedIn && <DynamicWidget />}

      {!isLoggedIn && (
        <div className="h-10 w-full flex justify-end items-center py-1 pr-4 text-xs">
          <button onClick={() => setShowAuthFlow(true)}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
}
