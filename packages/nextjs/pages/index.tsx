import Head from "next/head";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address } = useAccount();

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

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-4xl font-bold text-center">Stupid Staker</h1>
          <Address address={address} />

          <div className="text-center">Time Staked: {timeStaked?.toNumber()}s</div>
          <button className="btn btn-primary" onClick={doStake}>
            STAKE
          </button>
          <button className="btn btn-primary" onClick={undoStake}>
            UNSTAKE
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
