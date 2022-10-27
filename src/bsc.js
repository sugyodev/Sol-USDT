import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'
import { Parallax } from "react-parallax";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useContract } from 'wagmi'
import wealthMountainABI from './contracts/WealthMountainBSC.json';
import styled from "styled-components";
import SelectObject from "./components/SelectCoin";
import { FaCopy, FaWallet, FaUserShield, FaSearchDollar } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi"
import Web3 from "web3";
import banner_demountain from "./assets/demountain.mp4";
import abiDecoder from "abi-decoder";
import {
  Button,
  Card,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardDeck,
  Container,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Label,
  Table,
  Row
} from "reactstrap";
import { ethers, Contract } from 'ethers';

AOS.init({ duration: 2000 });

const Item = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '5px 20px',
  margin: '0px 20px',
  textAlign: 'center',
  fontSize: "20px",
  color: 'white',
  borderRadius: "1.25rem",
  background: "#000000b8",
  minWidth: '150px',
  alignSelf: 'center',
  fontFamily: 'Roboto',
}));

let contractAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amtx",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "ref",
        type: "address"
      }
    ],
    name: "stakeStablecoins",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawDivs",
    outputs: [
      {
        internalType: "uint256",
        name: "withdrawAmount",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
];

console.log(abiDecoder, contractAbi);

// abiDecoder.addABI(contractAbi);
const abiCoder = require("web3-eth-abi");
console.log(abiCoder);

const inputs = [
  {
    "internalType": "uint256",
    "name": "amtx",
    "type": "uint256"
  },
  {
    "internalType": "address",
    "name": "ref",
    "type": "address"
  }
];


function WealthMountain() {
  const [sliderValue, setSliderValue] = useState('50');
  const [dropdownOpen, setOpen] = React.useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [calcTotalDividends, setCalcTotalDividends] = useState("")
  const [initalStakeAfterFees, setInitalStakeAfterFees] = useState("")
  const [dailyPercent, setDailyPercent] = useState("");
  const [dailyValue, setDailyValue] = useState("");
  const [stakingAmount, setStakingAmount] = useState("");
  const [calculatedDividends, setCalculatedDividends] = useState(0);
  const [contractBalance, setContractBalance] = useState("");
  const [referralAccrued, setReferralAccrued] = useState("");
  const [totalUsers, setTotalUsers] = useState("");
  const [dayValue10, setDayValue10] = useState("864000");
  const [dayValue20, setDayValue20] = useState("1728000");
  const [dayValue30, setDayValue30] = useState("2592000");
  const [dayValue40, setDayValue40] = useState("3456000");
  const [dayValue50, setDayValue50] = useState("4320000");
  const [contract, setContract] = useState(undefined)
  const [signer, setSigner] = useState(undefined)
  const [userWalletAddress, setUserWalletAddress] = useState('none');
  const [userStablecoinBalance, setUserStablecoinBalance] = useState(0);
  const [stablecoinAllowanceAmount, setStablecoinAllowanceAmount] = useState(0);
  const stableCoin = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
  const wealthContract = '0xbcae54cdf6a1b1c60ec3d44114b452179a96c1e3'
  const [refBonusLoading, setRefBonusLoading] = useState(false);
  const [connectButtonText, setConnectButtonText] = useState('CONNECT')
  const videoRef = useRef();

  const [mobile, setMobile] = useState(false);

  const [auditNo, setAuditNo] = useState('https://georgestamp.xyz/2022/09/wc-miner-busd/');
  const [cnt, setCnt] = useState(0);

  const audits = [
    { link: 'https://georgestamp.xyz/2022/09/wc-miner-busd/', label: 'Audit 1' },
    { link: '/audit.pdf', label: 'Audit 2' },
  ];
  const onChangeAuditNo = (value) => {
    console.log("onChangeAuditNo value=", value); //, " : ", audits[value].link);
    setCnt((cnt + 1) % 2);
    setAuditNo(audits[(cnt + 1) % 2].link);
  }


  useEffect(() => {
    const init = async () => {
      var provider = new ethers.providers.Web3Provider(window.ethereum)
      var signer = provider.getSigner()
      setSigner(signer)
      var contract = new Contract(
        wealthContract,
        wealthMountainABI,
        signer
      )
      setContract(contract)
      setUserWalletAddress(provider.provider.selectedAddress);
      getAllBuyAndSellReceipts(wealthContract, userWalletAddress);
      videoRef.current.play().catch(error => {
        console.log("Play error = ", error);
      });
    };
    init();
  }, []);

  window.addEventListener("focus", function () {
    recalculateInfo();
  })

  const getAllBuyAndSellReceipts = async (address, userAddress) => {
    const totalBuyAndSell = { totalBuy: 0.0, totalSell: 0.0 };
    const returnedData = await fetch(
      `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=21869046&endblock=99999999&apikey=YGKJFMK5FW1H9T9GR9VTGIT2UC5PXUTDTB`
    );
    const parsedData = await returnedData.json();
    if (parsedData.status === "1") {
      const transactions = parsedData.result;
      let count = 0;
      let accounts = [];
      let investInfo = [
        {
          from: '',
          amountBought: 0,
          investTime: 0,
          hash: 0,
          award: '$1500',
        },
        {
          from: '',
          amountBought: 0,
          investTime: 0,
          hash: 0,
          award: '$1000',
        },
        {
          from: '',
          amountBought: 0,
          investTime: 0,
          hash: 0,
          award: '$500',
        },
        {
          from: '',
          amountBought: 0,
          investTime: 0,
          hash: 0,
          award: '',
        },
        {
          from: '',
          amountBought: 0,
          investTime: 0,
          hash: 0,
          award: '',
        }
      ];
      console.log('transactions => ', transactions, investInfo.length, investInfo[0].amountBought);
      for (const tx of transactions) {
        if (accounts.indexOf(tx.from) == -1) {
          accounts.push(tx.from);
          count++
        }
      }
      setTotalUsers(count);
      console.log("count = ", count);
    }
    return totalBuyAndSell;
  };

  async function recalcAllowance() {
    if (contract === undefined || contract === null) {
      return;
    }
    const userAllowance = await stablecoinAllowance.allowance(userWalletAddress, contract.address);
    setStablecoinAllowanceAmount(Number(ethers.utils.formatEther(userAllowance)));
  }

  async function recalculateInfo() {
    if (contract === undefined || contract === null) {
      return;
    }

    contract.userInfo().then(value => {
      setUserInfo(value)
    })
    contract.calcdiv(userWalletAddress).then(value => {
      setCalculatedDividends(Number(ethers.utils.formatEther(value)));
    })
    const balance = await stablecoinBalance.balanceOf(contract.address);
    setContractBalance(Number(ethers.utils.formatEther(balance)));

    const userBalance = await stablecoinBalance.balanceOf(userWalletAddress);
    setUserStablecoinBalance(Number(ethers.utils.formatEther(userBalance)))

    const userAllowance = await stablecoinAllowance.allowance(userWalletAddress, contract.address);
    setStablecoinAllowanceAmount(Number(ethers.utils.formatEther(userAllowance)))

    contract.UsersKey(String(userWalletAddress)).then(value => {
      setReferralAccrued(Number(ethers.utils.formatEther(value.refBonus)).toFixed(2));
    })
    contract.PercsKey(10).then(value => {
      setDayValue10(Number(value.daysInSeconds))
    })
    contract.PercsKey(20).then(value => {
      setDayValue20(Number(value.daysInSeconds))
    })
    contract.PercsKey(30).then(value => {
      setDayValue30(Number(value.daysInSeconds))
    })
    contract.PercsKey(40).then(value => {
      setDayValue40(Number(value.daysInSeconds))
    })
    contract.PercsKey(50).then(value => {
      setDayValue50(Number(value.daysInSeconds))
    })

  }
  const updateCalc = event => {
    setInitalStakeAfterFees(Number(event.target.value * 0.9).toFixed(2));
  }
  const updateStakingAmount = event => {
    setStakingAmount(event.target.value);
  }

  function calculate(v) {
    setSliderValue(v)
    if (Number(sliderValue) <= "20") {
      const totalReturn = (initalStakeAfterFees * 0.035) * sliderValue
      setCalcTotalDividends(totalReturn.toFixed(2));
      setDailyPercent(3.5);
      setDailyValue(Number(initalStakeAfterFees * .035).toFixed(2))
    }
    else if ("20" < Number(sliderValue) && Number(sliderValue) <= "30") {
      const totalReturn = (initalStakeAfterFees * 0.045) * sliderValue
      setCalcTotalDividends(totalReturn.toFixed(2));
      setDailyPercent(4.5);
      setDailyValue(Number(initalStakeAfterFees * .045).toFixed(2))
    }
    else if ("30" < Number(sliderValue) && Number(sliderValue) <= "40") {
      const totalReturn = (initalStakeAfterFees * 0.055) * sliderValue
      setCalcTotalDividends(totalReturn.toFixed(2));
      setDailyPercent(5.5);
      setDailyValue(Number(initalStakeAfterFees * .055).toFixed(2))
    }
    else if ("40" < Number(sliderValue) && Number(sliderValue) <= "50") {
      const totalReturn = (initalStakeAfterFees * 0.065) * sliderValue
      setCalcTotalDividends(totalReturn.toFixed(2));
      setDailyPercent(6.5);
      setDailyValue(Number(initalStakeAfterFees * .065).toFixed(2))
    }
    else if ("50" <= Number(sliderValue)) {
      const totalReturn = (initalStakeAfterFees * 0.085) * sliderValue
      setCalcTotalDividends(totalReturn.toFixed(2));
      setDailyPercent(8.5);
      setDailyValue(Number(initalStakeAfterFees * .085).toFixed(2))
    }
  }

  async function approveButton() {
    const tx = stablecoinContract.approve(contract.address, String(ethers.utils.parseEther(stakingAmount)));
    tx.wait().then(() => {
      recalcAllowance();
    })
  }
  async function stakeAmount() {
    if (Number(stakingAmount) < Number(50)) {
      alert('Minimum stake amount not met.')
    }

    const ref = window.location.search;
    const referralAddress = String(ref.replace('?ref=', ''))
    console.log("referralAddress: ", referralAddress);
    if (referralAddress === 'null' || referralAddress.includes("0x") === false) {
      const tx = await contract.stakeStablecoins(
        String(ethers.utils.parseEther(stakingAmount)), String("0x0000000000000000000000000000000000000000"));
      tx.wait();
    } else {
      const tx = await contract.stakeStablecoins(
        String(ethers.utils.parseEther(stakingAmount)), String(referralAddress));
      tx.wait();
    }
  }
  async function stakeRefBonus() {
    const tx = await contract.stakeRefBonus();
    tx.wait().then(() => {
      recalculateInfo();
    })
  }
  async function withdrawRefBonus() {
    const tx = await contract.withdrawRefBonus();
    tx.wait().then(() => {
      recalculateInfo();
    })
  }
  async function compound() {
    const tx = await contract.compound()
    tx.wait().then(() => {
      recalculateInfo();
    })
  }
  async function withdrawDivs() {
    const tx = await contract.withdrawDivs()
    tx.wait().then(() => {
      recalculateInfo();
    })
  }
  const stablecoinContract = useContract({
    addressOrName: stableCoin,
    contractInterface: ['function approve(address spender, uint amount) public returns(bool)'],
    signerOrProvider: signer,
  })
  const stablecoinBalance = useContract({
    addressOrName: stableCoin,
    contractInterface: ['function balanceOf(address account) external view returns (uint256)'],
    signerOrProvider: signer,
  })
  const stablecoinAllowance = useContract({
    addressOrName: stableCoin,
    contractInterface: ['function allowance(address _owner, address spender) external view returns (uint256)'],
    signerOrProvider: signer,
  })

  async function withdrawInitial(value) {
    const tx = await contract.withdrawInitial(value);
    tx.wait().then(() => {
      recalculateInfo();
    })
  }
  function TotalStakedValue() {
    var total = 0;
    for (var i = 0; i < userInfo.length; i++) {
      total += Number(ethers.utils.formatEther(userInfo[i].amt))
    }
    return (<>{total.toFixed(2)}</>)
  }
  function TotalEarnedValue() {
    var value = calculatedDividends;

    return (<>{value.toFixed(3)}</>)
  }

  function TotalEarnedPercent() {
    var total = 0;
    for (var i = 0; i < userInfo.length; i++) {
      total += Number(ethers.utils.formatEther(userInfo[i].amt))
    }
    const value = calculatedDividends
    var totalEarnedPercent = Number((value / total) * 100).toFixed(3) + "%";
    if (totalEarnedPercent === "NaN%") {
      totalEarnedPercent = 0
    }
    return (<>{totalEarnedPercent}</>)
  }

  function ListOfUserStakes() {
    if (userInfo.length === 0) {
      return (
        <>
          <small className="font-weight-bold source text-lightblue">Nothing to show here.</small>
        </>
      )
    }
    const listElements = userInfo.map(
      (element) => {
        const depoStart = Number(element.depoTime)
        const depoAmount = Number(ethers.utils.formatEther(element.amt))
        const initialWithdrawn = element.initialWithdrawn;
        var dailyPercent = '';
        var unstakeFee = '';
        const elapsedTime = (Date.now() / 1000 - (depoStart));
        var totalEarned = '0';
        var daysToMax = Number((dayValue50 - elapsedTime) / 86400).toFixed(1)
        if (elapsedTime <= dayValue10) {
          dailyPercent = '3.5'
          unstakeFee = '20%'
          totalEarned = (depoAmount * (dailyPercent / 100)) * (elapsedTime / dayValue10 / 10)

        } else if (elapsedTime > dayValue10 && elapsedTime <= dayValue20) {
          dailyPercent = '3.5'
          unstakeFee = '18%'
          totalEarned = (depoAmount * (dailyPercent / 100)) * (elapsedTime / dayValue10 / 10)

        } else if (elapsedTime > dayValue20 && elapsedTime <= dayValue30) {
          dailyPercent = '4.5'
          unstakeFee = '15%'
          totalEarned = (depoAmount * (dailyPercent / 100)) * (elapsedTime / dayValue10 / 10)

        } else if (elapsedTime > dayValue30 && elapsedTime <= dayValue40) {
          dailyPercent = '5.5'
          unstakeFee = '12%'
          totalEarned = (depoAmount * (dailyPercent / 100)) * (elapsedTime / dayValue10 / 10)

        } else if (elapsedTime > dayValue40 && elapsedTime <= dayValue50) {
          dailyPercent = '6.5'
          unstakeFee = '12%'
          totalEarned = (depoAmount * (dailyPercent / 100)) * (elapsedTime / dayValue10 / 10)

        } else if (elapsedTime > dayValue50) {
          dailyPercent = '8.5'
          unstakeFee = '12%'
          totalEarned = depoAmount * (dailyPercent / 100) * (elapsedTime / dayValue10 / 10)
          daysToMax = 'Max'
        }
        var daysStaked = Number(elapsedTime / 86400).toFixed(2);
        if (daysStaked < 1) {
          daysStaked = "<1"
        }

        if (initialWithdrawn == false) {
          return (
            <>
              <tr>
                <td>${depoAmount.toFixed(2)}</td>
                <td>{daysStaked}</td>
                <td>{dailyPercent}%</td>
                <td>{daysToMax}</td>
                <td style={{ fontStyle: 'italic' }}>{unstakeFee}</td>
              </tr>
            </>
          )
        }
      }
    )
    return (
      <>
        <Table striped>
          <thead>
            <tr className="text-lightblue calvino">
              <th>Amount</th>
              <th>Days staked</th>
              <th>Daily (%)</th>
              <th>Days to Max</th>
              <th>Unstake fee</th>
            </tr>
          </thead>
          <tbody className="source text-white">
            {listElements}
          </tbody>
        </Table>
      </>
    )
  }

  function UnstakeOptions() {
    if (userInfo.length == 0) {
      return (
        <>
          <Button outline className="custom-button mt-3 source">Start a stake to see your info</Button>
        </>
      )
    }
    const listElements = userInfo.map(
      (element) => {
        const depoStart = new Date(Number(element.depoTime) * 1000).toDateString()
        const depoAmount = Number(ethers.utils.formatEther(element.amt)).toFixed(2)
        const initialWithdrawn = element.initialWithdrawn;
        const key = Number(element.key);
        if (initialWithdrawn == false) {
          return (
            <>
              <DropdownItem onClick={() => {
                withdrawInitial(key)
              }}>
                <Col className="text-center">
                  <Row>${depoAmount}</Row>
                  <Row><small className="text-muted">{depoStart}</small></Row>
                </Col>
              </DropdownItem>
              <div></div>
            </>
          )
        }
      }
    )
    return (
      <>
        <ButtonDropdown className="custom-button source mt-4" toggle={() => { setOpen(!dropdownOpen) }}
          isOpen={dropdownOpen}>
          <DropdownToggle outline caret className="font-weight-bold source">
            Unstake
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header style={{ color: 'black' }}>Your current stakes
            </DropdownItem>
            {listElements}
          </DropdownMenu>
        </ButtonDropdown>
      </>
    )
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //    RENDER
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {mobile === true ? (
        <div className="mobile_head">
          <div className="mobile_herader_content">
            <div style={{ alignSelf: "center", marginBottom: "30px" }}>
              <img src="./favicon.png" alt="ETH Snowball" height="64px" />
            </div>
            <div className="mobile_four_btn">
              <div onClick={() => {
                setMobile(true)
              }}>
                <SelectObject value={auditNo} onChangeAuditNo={onChangeAuditNo} />
              </div>
              <div onClick={() => {
                setMobile(true)
              }}>
                <a href="https://bscscan.com/address/0xbcae54cdf6a1b1c60ec3d44114b452179a96c1e3" target="_blank" rel="noreferrer"
                  className="swap_btn"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: "bolder",
                    fontFamily: 'Roboto'
                  }}
                >
                  Contract
                </a>
              </div>
              <div onClick={() => {
                setMobile(true)
              }}>
                <a href="/whitepaper.pdf" target="_blank" rel="noreferrer"
                  className="stable_btn"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: "bolder",
                    fontFamily: 'Roboto'
                  }}
                >
                  <span> Whitepaper </span>
                </a>
              </div>
              <div onClick={() => {
                setMobile(true)
              }}>
                <a href="https://lottery.wcminer.finance/" target="__blank"
                  className="bridge_btn"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: "bolder",
                    fontFamily: 'Roboto'
                  }}
                >
                  Lottery
                </a>
              </div>
            </div>
            <div style={{ flex: 1 }}></div>
            <div
              className="mobile_connect"
            >
              <Button
                className='custom-button'
                style={{ maxHeight: "43px", backgroundColor: '#000000b8', color: '#ffbb00' }}
              >
                {connectButtonText}
              </Button>
            </div>
          </div>
          <div
            className="empty_mobile"
            onClick={() => {
              setMobile(false)
            }}
          ></div>
        </div>
      )
        : null}
      <div className="custom-header">
        <img
          alt="..."
          src="./favicon.png"
          style={{ width: 'auto', height: '96px' }}
        />
        <div className="header_menu">
          <Item>

            <SelectObject value={auditNo} onChangeAuditNo={onChangeAuditNo} color='#ffbb00' />
          </Item>
          <Item>
            <a href="https://bscscan.com/address/0xbcae54cdf6a1b1c60ec3d44114b452179a96c1e3" target="_blank" rel="noreferrer"
              style={{
                textDecoration: 'none',
                fontWeight: "bolder",
                color: "#ffbb00"
              }}
            >
              <span>Contract </span>
            </a>
          </Item>
          <Item>
            <a href="/whitepaper.pdf" target="_blank"
              style={{
                textDecoration: 'none',
                fontWeight: "bolder",
                color: "#ffbb00"
              }}
            >
              <span>Whitepaper</span>
            </a>
          </Item>
          <Item style={{ border: "solid #ffbb00 4px" }}>
            <a href="https://lottery.wcminer.com/" target="__blank"
              style={{
                textDecoration: 'none',
                fontWeight: "bolder",
                color: "#ffbb00"
              }}
            >
              <span>Lottery </span>
            </a>
          </Item>
        </div>

        <Button
          className='custom-button desktop-button'
          style={{ maxHeight: "43px", backgroundColor: '#000000b8', color: '#ffbb00' }}>
          {connectButtonText}
        </Button>
        <div
          className='mobile_btn'
          onClick={() => {
            setMobile(true)
          }}
        >
          <GiHamburgerMenu />
        </div>
      </div>
      <div className='main-content'>
        <Container>
          <div
            style={{ width: '100%', padding: '10px 15px' }}
          >
            <a href="https://busd.demountain.finance/auction/?ref=0x5886b6b942f8dab2488961f603a4be8c3015a1a9" target="_blank">
              <video src={banner_demountain} playsInline loop={true} muted="unmuted" width="100%" style={{ cursor: 'pointer' }} ref={videoRef}></video>
            </a>
          </div>
        </Container>
      </div>

      <div className='main-content'>
        <Container className="pt-3">
          <Container>
            <CardDeck>
              <Card body className="text-center text-lightblue">
                <h5 className="calvino text-lightblue">TVL</h5>
                <h5 className="source font-weight-bold text-white">
                  {Number(contractBalance) === 0 ? <>?</> : <>${Number(contractBalance).toFixed(0)}</>}
                </h5>
              </Card>
              <Card body className="text-center text-lightblue">
                <h5 className="calvino text-lightblue">Users</h5>
                <h5 className="source font-weight-bold text-white">
                  {Number(totalUsers) === 0 ? <>?</> : <>{Number(totalUsers)}</>}
                </h5>
              </Card>
              <Card body className="text-center text-lightblue">
                <h5 className="calvino text-lightblue">Stake Fee</h5>
                <h5 className="source font-weight-bold text-white">
                  10%
                </h5>
              </Card>
              <Card body className="text-center text-lightblue">
                <h5 className="calvino text-lightblue">Collection Fee</h5>
                <h5 className="source font-weight-bold text-white">
                  10%
                </h5>
              </Card>
            </CardDeck>
          </Container>
          <div>
            <CardDeck className="p-3">
              <Card body className="text-center text-lightblue">
                <h4 className="calvino text-lightblue">Total Staked Value</h4>
                <h1 className="source font-weight-bold text-white">$<TotalStakedValue /></h1>
                <UnstakeOptions />
              </Card>
              <Card body className="text-center text-lightblue">
                <h4 className="calvino text-lightblue">Total Earnings</h4>
                <CardDeck>
                  <Card style={{ background: "transparent" }}>
                    <h4 className="source font-weight-bold text-white"><TotalEarnedPercent /></h4>
                  </Card>
                  <Card style={{ background: "transparent" }}>
                    <h4 className="source font-weight-bold text-white">$<TotalEarnedValue /></h4>
                  </Card>
                </CardDeck>
                <Row>
                  <Col>
                    <Button className="custom-button source mt-3" outline onClick={compound}>compound</Button>
                    <Button className="custom-button source mt-3" outline onClick={withdrawDivs}>collect</Button>
                  </Col>
                </Row>
                <small className="pt-2 source">Note: Collecting will reset all stakes to 3.5% daily. Compound will add to your stakes while doing the same.</small>
              </Card>
            </CardDeck>
            <CardDeck className="pl-3 pr-3 pb-3">
              <Card body className="text-center text-lightblue">
                <h5 className="calvino text-lightblue">Referrals Earned</h5>
                {refBonusLoading ? <></> :
                  <>
                    <h4 className="source font-weight-bold text-white">${referralAccrued}</h4>
                    <Row>
                      <Col>
                        <Button className="custom-button source mt-2" outline onClick={stakeRefBonus}>STAKE</Button>
                        <Button className="custom-button source mt-2" outline onClick={withdrawRefBonus}>COLLECT</Button>
                      </Col>
                    </Row>
                  </>}

              </Card>
              <Card body className="text-center text-lightblue">
                <h5 className="calvino text-lightblue">Referral Link</h5>
                <h3 type="button" onClick={() => navigator.clipboard.writeText("https://busd.wcminer.com?ref=" + userWalletAddress)} className="referralButton source font-weight-bold"><FaCopy size="1.6em" className="pr-3" />COPY LINK</h3>
                <small className="source text-lightblue">Earn 10% when someone uses your referral link.</small>
              </Card>
            </CardDeck>
            <CardDeck className="pt-2 pr-3 pl-3 pb-3">
              <Card body className="text-center text-lightblue">
                <h4 className="calvino text-lightblue" style={{ lineHeight: "10px" }}>CURRENT STAKES</h4>
                <small className="pt-0 pb-4 source">Here's a list of all of your current stakes.</small>
                <ListOfUserStakes />
              </Card>
              <Card hidden body className="text-center text-lightblue">
                <h4 className="calvino text-lightblue">Days Staked</h4>
                <h3 className="source font-weight-bold text-white">2 days</h3>
              </Card>
              <Card hidden body className="text-center text-lightblue">
                <h4 className="calvino text-lightblue">Time to Max</h4>
                <CardDeck>
                  <Card>
                    <h4 className="source font-weight-bold text-white">?</h4>
                    <small className="source">days until max</small>
                  </Card>
                  <Card>
                    <h4 className="source font-weight-bold text-white">$</h4>
                    <small className="source">max per day</small>
                  </Card>
                </CardDeck>
              </Card>
              <Card hidden body className="text-center text-lightblue">
                <h4 className="calvino text-lightblue">Current Unstake Fee</h4>
                <h3 className="source font-weight-bold text-white">20%</h3>
                <small className="source text-lightblue">days until decrease to 12%</small>
              </Card>
            </CardDeck>
          </div>
        </Container>
      </div>
      <div>
        <Container className="pt-3">
          <Card body>
            <h2 className="calvino text-center text-lightblue">Earnings Calculator</h2>
            <CardDeck>
              <Card body className="text-center">
                <h3 className="calvino font-weight-bold text-lightblue">Staking</h3>
                <Form>
                  <FormGroup>
                    <Label className="source font-weight-bold text-lightblue">Stake Amount</Label>
                    <InputGroup>
                      <Input
                        className="custom-input text-center source"
                        placeholder="Minimum 50 BUSD"
                        // onChange={(e) => this.setCalcAmount(`${e.target.value}`)}
                        onChange={updateCalc}
                      ></Input>
                    </InputGroup>
                  </FormGroup>
                </Form>
                <Label className="source font-weight-bold text-lightblue">Days Staked</Label>
                <Col className="text-center">
                  <Box>
                    <Slider
                      defaultValue={50}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      color='primary'
                      onChange={(_, v) => calculate(v)} />
                  </Box>
                </Col>
              </Card>
              <Card body className="text-center">
                <h3 className="calvino font-weight-bold text-lightblue">Earnings</h3>
                <CardDeck>
                  <Card style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                    <h3 className="calvino text-white">${calcTotalDividends}</h3>
                    <small className="source text-white">total dividends earned</small>
                  </Card>
                  <Card style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                    <h3 className="calvino text-white">${initalStakeAfterFees}</h3>
                    <small className="source text-white">initial stake after fees</small>
                  </Card>
                </CardDeck>
                <CardDeck className="pt-3">
                  <Card style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                    <h3 className="calvino text-white">{dailyPercent}%</h3>
                    <small className="source text-white">earning daily (%)</small>
                  </Card>
                  <Card style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                    <h3 className="calvino text-white">${dailyValue}</h3>
                    <small className="source text-white">earning daily ($)</small>
                  </Card>
                </CardDeck>
              </Card>
            </CardDeck>
          </Card>
        </Container>
      </div>
      <div className='enter-stake main-content'>
        <Container className="pt-3">
          <CardDeck className="p-3">
            <Card body className="text-center text-lightblue">
              <h4 className="calvino text-lightblue">Enter Stake</h4>
              <p className="source text-center">Approve and stake your BUSD here. You can view your ongoing stakes in the <span className="font-weight-bold">Current Stakes & Yield</span> tab.</p>
              <Form>
                <FormGroup>
                  <Label className="source font-weight-bold text-lightblue">Stake Amount</Label>
                  <InputGroup>
                    <Input
                      className="custom-input text-center source"
                      placeholder="Minimum 50 BUSD"
                      onChange={updateStakingAmount}
                    ></Input>
                  </InputGroup>
                  <Button onClick={approveButton} className="custom-button mt-4 source font-weight-bold">APPROVE</Button>
                  <Button onClick={stakeAmount} className="custom-button mt-4 source font-weight-bold">STAKE</Button>
                </FormGroup>
              </Form>
              <small className="source text-lightblue">Note: Stakes are not locked. You can unstake at any time.</small><br />
              <small className="source text-lightblue text-left"><FaWallet size="1.7em" className="pr-2" />Your wallet: <span className="text-white font-weight-bold">{userStablecoinBalance.toFixed(2)} BUSD</span></small>
              <small className="source text-lightblue text-left"><FaUserShield size="1.7em" className="pr-2" />Approved amount: <span className="text-white font-weight-bold">{stablecoinAllowanceAmount.toFixed(2)} BUSD</span></small>
              <a className="source text-left text-underline text-lightblue" href="https://pancakeswap.finance/swap" target="_blank" rel="noreferrer"><small className="source text-lightblue text-left"><FaSearchDollar size="1.7em" className="pr-2" />Swap your tokens for BUSD here. </small></a>
            </Card>
            <Card body className="source text-center">
              <h4 className="calvino text-lightblue">Important Information</h4>
              <p className="text-left text-white"> <span className="font-weight-bold">Stake or unstake at any time. </span>When a new stake is made, overall yield accrual is set to 3.5% until day 20.</p>
              <p className="text-left text-white"><span className="font-weight-bold">Approval is required </span>prior to staking your BUSD. The protocol will only request approval for the amount entered.</p>
              <p className="text-left text-white"><span className="font-weight-bold">Staking fee is a flat 10%. </span>Use the Earnings Calculator to determine how much a stake will earn daily. All Fee’s will be used to invest in other Dapp’s across the Defi Market, returns will be deposited in the contract automatically.</p>
              <small className="text-left text-white">Disclaimer: Dividend payouts will take place at a flat rate. Payouts continue contingent on Smart Contract health and liquidity. <Link className="text-lightblue text-white font-weight-bold" to="/faq">For further questions, please read our DOCS</Link></small>
            </Card>
          </CardDeck>

          <Parallax strength={500}>
            <div>
              <Container className="pb-3 pt-3 calvino text-center">
                <CardDeck>
                  <Card className="p-3">
                    <h3>Dividends</h3>

                    <table className="source" border="2">
                      <tbody>
                        <tr>
                          <td className="font-weight-bold">Level</td>
                          <td className="font-weight-bold">Stake Length</td>
                          <td className="font-weight-bold">Earnings</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>Day 1 - 20</td>
                          <td>3.5% daily</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Day 20 - 30</td>
                          <td>4.5% daily</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Day 30 - 40</td>
                          <td>5.5% daily</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Day 40 - 50</td>
                          <td>6.5% daily</td>
                        </tr>
                        <tr>
                          <td>♛ 5 </td>
                          <td>Day 50 - ∞</td>
                          <td>8.5% daily</td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <small className="source">Compounding and collecting earnings from dividends reset all stakes to level 1. Creating new stakes has no effect on existing stakes.</small>
                    <br />

                    <small className="source">Disclaimer: Dividend payouts are fixed and the TVL fluctuations do not effect the daily yield like in traditional miners.</small>
                  </Card>
                  <Card className="p-3">
                    <h3>Unstake Fees</h3>
                    <table className="source" border="2">
                      <tbody>
                        <tr>
                          <td className="font-weight-bold">Stake Length</td>
                          <td className="font-weight-bold">Unstake Fee</td>
                        </tr>
                        <tr>
                          <td>Day 1 - 10</td>
                          <td>20%</td>
                        </tr>
                        <tr>
                          <td>Day 10 - 20</td>
                          <td>18%</td>
                        </tr>
                        <tr>
                          <td>Day 20 - 30</td>
                          <td>15%</td>
                        </tr>
                        <tr>
                          <td>Day 30 - ∞</td>
                          <td>12%</td>
                        </tr>
                      </tbody>
                    </table>
                    <br /><small className="source">Dividends earned are also paid out when unstakes take place.</small>
                    <br /><small className="source">Volume in and out of the protocol help the platform thrive. Fees are diversified across different asset classes and diversification vehicles.</small>
                  </Card>
                  <Card className="p-3">
                    <h3>Staking</h3>
                    <span className="source text-center pl-2 pb-2 pr-3">
                      10% fee on intial stakes<br /><br />
                      Stakes immediately start earning 3.5% daily<br /><br />
                      Unstake at any time (earnings included)<br /><br />
                      Unstake fees start at 20% and decrease to 12%<br /><br />
                      10% fee on dividend collections<br /><br />
                      No fees on compounds
                    </span>
                  </Card>
                </CardDeck>
              </Container>
            </div>
          </Parallax>
        </Container>
      </div>

      <div style={{ margin: "50px 20px", textAlign: 'center', alignItems: 'center', color: 'white' }}>
        <h2 className='text-white' style={{ fontWeight: 'bold', margin: '80px 0px 50px 0px' }}>EARN 3.3% DAILY REWARDS ON WC MINER BNB</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'black', border: 'solid 3px #fa9a00', borderRadius: '20px', padding: '50px 80px ' }}>
            <h2 className='text-white' style={{ fontWeight: 'bold', marginBottom: '30px' }}>MINER</h2>
            <a href="https://wcminer.com/" target="_blank" style={{ fontSize: '20px', fontWeight: '600', background: '#ffbb00', padding: '10px 50px', borderRadius: '10px' }}>
              <span className='source'>INVEST</span>
            </a>
          </div>
        </div>
      </div>
      <div className="pt-5 text-center calvino text-lightblue">
        <Card style={{ borderRadius: '0px', padding: '70px 10px 50px 10px' }}>
          <CardDeck className="custom-footer">
            <SelectObject value={auditNo} onChangeAuditNo={onChangeAuditNo} />
            <a href="https://bscscan.com/address/0xbcae54cdf6a1b1c60ec3d44114b452179a96c1e3" target="_blank" rel="noreferrer"> CONTRACT </a>
            <a href="/whitepaper.pdf" target="_blank" rel="noreferrer"> DOCS </a>
            <a href="https://twitter.com/WolfOfCrypto885" target="_blank" rel="noreferrer"> TWITTER </a>
            <a href="https://t.me/WCMinerBUSD" target="_blank" rel="noreferrer"> TELEGRAM </a>
          </CardDeck>
          <p style={{ fontSize: '20px', color: 'white', paddingTop: '30px', fontWeight: 'bold' }}>© Wolf of Crypto Team , All Rights Reserved</p>
        </Card>
      </div>
    </>

  )
}
export default WealthMountain;