import Head from "next/head";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();

  const { data: whenStaked } = useScaffoldContractRead({
    contractName: "StupidStaker",
    functionName: "whenStaked",
    args: [address],
  });

  const { writeAsync: doStake } = useScaffoldContractWrite({
    contractName: "StupidStaker",
    functionName: "stake",
    value: "0.01",
  });

  const { writeAsync: undoStake } = useScaffoldContractWrite({
    contractName: "StupidStaker",
    functionName: "withdraw",
  });

  const { data: timeStaked } = useScaffoldContractRead({
    contractName: "StupidStaker",
    functionName: "timeStaked",
    args: [address],
  });

  return (
    <>
      <Head>
        <title>Scaffold-ETH 2 App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10 gap-2">
        <h1 className="text-4xl font-bold text-center">Stupid Staker</h1>
        {isConnected ? (
          <>
            <Address address={address} />
            {!whenStaked?.eq(0) ? (
              <>
                <div className="text-center p-8">Time Staked: {timeStaked?.toString()}s</div>
                <div className="flex  gap-2">
                  <button className="btn btn-primary" onClick={undoStake}>
                    UNSTAKE
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex  gap-2">
                  <button className="btn btn-primary" onClick={doStake}>
                    STAKE
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <RainbowKitCustomConnectButton />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
