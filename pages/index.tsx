import React, {useState} from 'react'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'

import { useEagerConnect, useInactiveListener } from '../hooks'
import {
  injected
} from '../connectors'
import { Spinner } from '../components/Spinner'
import logo from '/home/boray/palpay/assets/palpay_logo.png';


enum ConnectorNames {
  Injected = 'Wallet'
}

let acc;


const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected
}
const txfee = 0.2; // should be adjusted to average tx fee of bitcichain

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export default function() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  )
}

const GenerateOrder = ({ amount }) => {

  var qrcodelink = "https://www.bitcoinqrcodemaker.com/api/?style=ethereum&amount=" + amount + "&fiat=USD&address="+ acc;
return(<>
  <img src={qrcodelink} height="150" width="150" alt="QR Code" />
</>)
}

const QRbox = ({ amount,msg }) => {
  return (<>
    <div
     style={{
             display: 'flex',
             flexDirection: 'column',
             top: '0',
             left: '0',
             height: '18rem',
             marginTop: '2rem',
             marginLeft: '6rem',
             marginRight: '6rem',
             width:'18rem',
             alignItems: 'center',
             justifyContent: 'center',
             borderRadius:'0.7rem',
             color: 'white',
             backgroundColor: "white"}}>
    <h2>{amount}$</h2>
    <GenerateOrder amount="10"/>
    <h1>{msg}</h1>
    </div>
  </>)

}


var qr1 =<QRbox amount="0" msg=""/>;
var qr2 =<QRbox amount="0" msg=""/>;
var qr3 =<QRbox amount="0" msg=""/>;
var qr4 =<QRbox amount="0" msg=""/>;
var qr5 =<QRbox amount="0" msg=""/>;
var qr6 =<QRbox amount="0" msg=""/>;
function Submit() {

    const [inputField , setInputField] = useState({
        amount: '',
        payers: ''
    })

    const inputsHandler = (e) =>{
    const { name, value } = e.target;
   setInputField((prevState) => ({
     ...prevState,
     [name]: value,
   }));
}
    const submitButton = () =>{
        var amount = inputField.amount;
        var payers = inputField.payers;

        var dividend = amount/payers + txfee;
        qr1 =<QRbox amount={dividend} msg="waiting for payment"/>;
        qr2 =<QRbox amount={dividend} msg="waiting for payment"/>;
        qr3 =<QRbox amount={dividend} msg="waiting for payment"/>;
        qr4 =<QRbox amount={dividend} msg="waiting for payment"/>;
        qr5 =<QRbox amount={dividend} msg="waiting for payment"/>;
        qr6 =<QRbox amount={dividend} msg="waiting for payment"/>;
    }

    return (
        <div style={{
        display: 'flex',
        flexDirection: 'row',
        top: '0',
        left: '0',
        height: '8rem',
        marginTop: '1rem',
        width:'78rem',
        alignItems: 'center',
        justifyContent: 'right',
        borderRadius:'0.7rem',
        color: 'white',
        backgroundColor: "white"}}
        >
            <input
            style={{width:'15rem',
                    height:'5rem',
                    fontSize:'3rem',
                    marginLeft:'2rem',
                    marginRight:'2rem',
                    borderWidth:'0.3rem',
                    borderRadius:'0.5rem',
                    borderColor:'black',
                    textAlign: 'center',
                    color:'white'}}
            type="text"
            name="amount"
            onChange={inputsHandler}
            placeholder="Amount"
            value={inputField.amount}/>

            <br/>

            <input
            style={{width:'15rem',
                    height:'5rem',
                    fontSize:'3rem',
                    marginLeft:'2rem',
                    marginRight:'20rem',
                    borderWidth:'0.3rem',
                    borderRadius:'0.5rem',
                    borderColor:'black',
                    textAlign: 'center',
                    color:'white'}}
            type="text"
            name="payers"
            onChange={inputsHandler}
            placeholder="Payers"
            value={inputField.payers}/>

            <br/>

            <button    onClick={submitButton}
            style={{width:'15rem',
                                height:'5.8rem',
                                fontSize:'2rem',
                                marginLeft:'2rem',
                                marginRight:'2rem',
                                borderWidth:'0.3rem',
                                borderRadius:'0.5rem',
                                borderColor:'black',
                                color:'white'}}>Generate QR</button>
        </div>
    )
}

function Card() {
  return (<>
    <div
     style={{
             display: 'flex',
             flexDirection: 'row',
             top: '0',
             left: '0',
             height: '6rem',
             marginTop: '2rem',
             width:'27.8rem',
             alignItems: 'center',
             justifyContent: 'center',
             borderRadius:'0.7rem',
             color: 'white',
             backgroundColor: "white"}}>
    <h2>0x1f16e8b...</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <h2>📩</h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <h1>29$</h1>
    </div>
  </>)
}
function PayCard() {
  return (<>
    <div
     style={{
             display: 'flex',
             flexDirection: 'row',
             top: '0',
             left: '0',
             height: '8rem',
             marginTop: '1rem',
             width:'80rem',
             alignItems: 'center',
             justifyContent: 'center',
             borderRadius:'0.7rem',
             color: 'white',
             backgroundColor: "white"}}>
             <form onSubmit={this.handleSubmit}>
                    <label>
                      Amount:
                      <input type="text" value={this.state.value}/>//TODO onchange
                      Amount:
                      <input type="text" value={this.state.value}/>
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
    </div>
  </>)
}

function Account() {
  const { account } = useWeb3React()
   acc=account;
  return (
    <>&nbsp;&nbsp;
      <h1 role="img" aria-label="robot">
        @ &nbsp;
      </h1>
      <h1>
        {account === null
          ? '-'
          : account
          ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
          : ''}
      </h1>
    </>
  )
}

function Balance() {
  const { account, library, chainId } = useWeb3React()

  const [balance, setBalance] = React.useState()
  React.useEffect((): any => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <h1>{balance === null ? 'Error' : balance ? `₿${formatEther(balance)}` : ''}</h1>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </>
  )
}


function App() {
  const context = useWeb3React<Web3Provider>()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  return (
    <>


    <div
      style={{
        display: 'flex',
        flex:'1',
        flexDirection: 'row',
        top: '0',
        left: '0',
        height: '4rem',
        width:'100%',
        alignItems: 'center',
        justifyContent: 'right',
        margin: '0 0 0 0 rem',
        backgroundColor: "powderblue"
      }}
    >
      <h1><b>PalPay</b></h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Account/>
      <Balance/>
      {Object.keys(connectorsByName).map(name => {
        const currentConnector = connectorsByName[name]
        const activating = currentConnector === activatingConnector
        const connected = currentConnector === connector
        const disabled = !triedEager || !!activatingConnector || connected || !!error

        return (

          <button
            style={{
              height: '3rem',
              width:'6rem',
              borderRadius: '1rem',
              borderWidth: '0.5rem',
              borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
              cursor: disabled ? 'unset' : 'pointer',
              position: 'relative',textAlign: 'center'
            }}
            disabled={disabled}
            key={name}
            onClick={() => {
              setActivatingConnector(currentConnector)
              activate(connectorsByName[name])
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                color: 'black',
                margin: '0 0 0 1rem',
                textAlign: 'center'
              }}
            >
              {activating && <Spinner color={'black'} style={{ height: '25%', marginLeft: '-1rem' }} />}
              <h2>
              {name}
              </h2>
            </div>

          </button>
        )
      })}
      </div>
      <div
        style={{
          display:'flex',
          flexDirection: 'row',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'right',
          color: 'black',
          margin: '0 0 0 0rem',
          backgroundColor: "gray"
        }}
      >
<div   style={{
    display:'flex',
    flexDirection: 'column',
    height: '50rem',
    width: '90rem',
    alignItems: 'center',
    justifyContent: 'top',
    color: 'black',
    margin: '0 0 0 0rem',
    backgroundColor: "blue"
  }}>
<Submit/>
<div   style={{
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'top'
  }}>
<QRbox amount="11"/>
<QRbox amount="11"/>
<QRbox amount="11"/>
</div>
<div   style={{
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'top'
  }}>
<QRbox amount="11"/>
<QRbox amount="11"/>
<QRbox amount="11"/>
</div>
</div>
<div   style={{
    display:'flex',
    flexDirection: 'column',
    height: '50rem',
    width: '30rem',
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: "orange"
  }}>
  <h1>Payment History</h1>
  <Card/>
  <Card/>
  <Card/>
  <Card/>
</div>
      </div>





    </>
  )
}
