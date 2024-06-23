const {
    Account,
    json,
    num,
    RpcProvider,
  } = require("starknet");
  const fs = require("fs");
  require("dotenv").config();

  async function main() {
    const sepoliaRpc = process.env.SEPOLIA_RPC
    const provider = new RpcProvider({ nodeUrl: sepoliaRpc });
    const privateKey = process.env.privateKey1;
    const accountAddress = process.env.accountAddress;
    const account = new Account(provider, accountAddress, privateKey);
    let genesis_address = await declareAndDeployGenesis(account);
    console.log("GenesisGalleria :: ",genesis_address);
  }

  main();

async function declareAndDeployGenesis(account) {
  console.log("declareAndDeployGenesis start")
  const compiledGenesisSierra = json.parse(
    fs.readFileSync("./target/dev/contracts_GenesisGalleria.contract_class.json").toString("ascii")
  );
  const compiledGenesisCasm = json.parse(
    fs.readFileSync("./target/dev/contracts_GenesisGalleria.compiled_contract_class.json").toString("ascii")
  );

  // const { suggestedMaxFee: fee1 } = await account.estimateDeclareFee({ contract: compiledGenesisSierra, casm: compiledGenesisCasm });
  // console.log("suggestedMaxFee =", fee1.toString(), "wei");
  // working till above
  // const declareResponse = await account.declare({ contract: compiledGenesisSierra, casm: compiledGenesisCasm }, { maxFee: fee1 * 11n / 10n });

  // console.log('Contract Class Hash =', declareResponse.class_hash);
  // await provider.waitForTransaction(declareResponse.transaction_hash);


  const deployResponse = await account.declareAndDeploy({
    contract: compiledGenesisSierra,
    casm: compiledGenesisCasm,
    // constructorCalldata: [num.hexToDecimalString(account.address)],
    constructorCalldata: [account.address],
  });
  console.log("------- declareAndDeployGenesis completed -------");
  return deployResponse.deploy.contract_address;
}


// async function main() {

//   const provider = new RpcProvider({ nodeUrl: `` }); 
//      console.log("Provider connected");
 
//      // initialize existing predeployed account 0 of Devnet
//      const privateKey = process.env.PRIVATE_KEY ?? "";
//      const accountAddress: string = process.env.ACCOUNT_ADDRESS ?? "";
//      const account = new Account(provider, accountAddress, privateKey, '1');
//      console.log("Account connected.\n");
 
//      // Declare Test contract in specified network (Sepolia)
//      const testSierra = json.parse(fs.readFileSync("./target/dev/contract.contract_class.json").toString("ascii"));
//      const testCasm = json.parse(fs.readFileSync("./target/dev/contract.compiled_contract_class.json").toString("ascii"));
//      const { suggestedMaxFee: fee1 } = await account.estimateDeclareFee({ contract: testSierra, casm: testCasm });
//      console.log("suggestedMaxFee =", fee1.toString(), "wei");
//      const declareResponse = await account.declare({ contract: testSierra, casm: testCasm }, { maxFee: fee1 * 11n / 10n });
 
//      console.log('Contract Class Hash =', declareResponse.class_hash);
//      await provider.waitForTransaction(declareResponse.transaction_hash);
//      console.log(':white_check_mark: Contract Class Hash completed.');
 
//      // Deploy Test contract in specified network (Sepolia)
//      // ClassHash of the already declared contract
//      const testClassHash = declareResponse.class_hash;
 
//      const deployResponse = await account.deployContract({ classHash: testClassHash });
//      await provider.waitForTransaction(deployResponse.transaction_hash);
 
 
//  }