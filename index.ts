import { createSmartAccountClient, getRequiredPrefund } from 'permissionless'
import { toSimpleSmartAccount } from 'permissionless/accounts'
import { createPimlicoClient } from 'permissionless/clients/pimlico'
import {
  createPublicClient,
  getContract,
  getAddress,
  http,
  parseEther,
  parseGwei,
  type Hex,
  formatEther,
  formatUnits,
  parseAbiItem,
  parseAbi,
  encodeFunctionData,
  maxUint256,
} from 'viem'
import {
  entryPoint07Address,
  createBundlerClient,
} from 'viem/account-abstraction'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import * as dotenv from 'dotenv'
dotenv.config()

const signingKey = process.env.SIGNINGKEY as Hex //EOA signingkey
const eoaAccount = (process.env.EOA_WALLET || '') as `0x${string}` //EOA address
const rpcUrl = process.env.RPC_URL || '' //ethereum-sepolia test network rpc url
const bundlerRpc = process.env.BUNDLER_URL || '' //Pimlico bundler and paymaster url

async function main() {
  console.log(eoaAccount)
  console.log(rpcUrl)
  console.log(bundlerRpc)

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
  })

  console.log(1)

  const simpleAccount = await toSimpleSmartAccount({
    client: publicClient,
    owner: privateKeyToAccount(signingKey),
    entryPoint: {
      address: entryPoint07Address,
      version: '0.7',
    },
  })

  console.log(2)

  const accountAddress = await simpleAccount.address
  console.log('Smart Account address:', accountAddress)

  console.log(3)

  const balance = await publicClient.getBalance({
    address: accountAddress,
  })

  console.log(4)

  console.log('Current balance:', formatEther(balance), 'ETH')

}

export default main()
