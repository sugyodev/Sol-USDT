import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'
import { Parallax } from "react-parallax";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styled from "styled-components";
import SelectObject from "./components/SelectCoin";
import { FaCopy, FaWallet, FaUserShield, FaSearchDollar } from 'react-icons/fa';
import banner_demountain from "./assets/demountain.mp4";
import {
  Button,
  Card,
  CardDeck,
  Container,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Label,
  Row
} from "reactstrap";
import { ethers } from 'ethers';

AOS.init({ duration: 2000 });


function WealthMountain() {
  const [sliderValue, setSliderValue] = useState('50');
  const [calcTotalDividends, setCalcTotalDividends] = useState("")
  const [initalStakeAfterFees, setInitalStakeAfterFees] = useState("")
  const [dailyPercent, setDailyPercent] = useState("");
  const [dailyValue, setDailyValue] = useState("");
  const [userWalletAddress, setUserWalletAddress] = useState('none');
  const [userStablecoinBalance, setUserStablecoinBalance] = useState(0);
  const [stablecoinAllowanceAmount, setStablecoinAllowanceAmount] = useState(0);
  const videoRef = useRef();

  const [auditNo, setAuditNo] = useState('https://georgestamp.xyz/2022/09/wc-miner-busd/');
  const [cnt, setCnt] = useState(0);

  const audits = [
    { link: 'https://georgestamp.xyz/2022/09/wc-miner-busd/', label: 'AUDIT One' },
    { link: '/audit.pdf', label: 'AUDIT Two' },
  ];
  const onChangeAuditNo = (value) => {
    setCnt((cnt + 1) % 2);
    setAuditNo(audits[(cnt + 1) % 2].link);
  }


  useEffect(() => {
    const init = async () => {
      videoRef.current.play().catch(error => {
        console.log("Play error = ", error);
      });
    };
    init();
  }, []);

  const updateCalc = event => {
    setInitalStakeAfterFees(Number(event.target.value * 0.9).toFixed(2));
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

  return (
    <>
      <img src='sub-img-top.png' className='header-top-img' />
      <img src='sub-img-left.png' className='body-left-img' />
      <div className='main-content header'>
        <Container>
          <Row>
            <Col>
              <div className='header-logo'>
                <img src='logo-icon.png' />
                <img src='logo-icon.png' />
                <span>SOL USDT MINER</span>
              </div>
            </Col>
            <Col>
              <Button className="custom-button connect-btn mt-3 col" outline >Connect</Button>
            </Col>
          </Row>
        </Container>
      </div >
      <div className='main-content' >
        <Container>
          <div
            style={{ width: '100%', padding: '10px 15px', marginTop: '60px' }}
          >
            <a href="https://busd.demountain.finance/auction/?ref=0x5886b6b942f8dab2488961f603a4be8c3015a1a9" target="_blank">
              <video src={banner_demountain} playsInline loop={true} muted="unmuted" width="100%" style={{ cursor: 'pointer', borderRadius: '10px' }} ref={videoRef}></video>
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
                  12
                </h5>
              </Card>
              <Card body className="text-center text-lightblue">
                <h5 className="calvino text-lightblue">Users</h5>
                <h5 className="source font-weight-bold text-white">
                  387
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
                <h1 className="source font-weight-bold text-white">$0.00</h1>
                <Button outline className="custom-button mt-3 source">Start a stake to see your info</Button>
              </Card>
              <Card body className="text-center text-lightblue">
                <h4 className="calvino text-lightblue">Total Earnings</h4>
                <CardDeck>
                  <Card style={{ background: "transparent" }}>
                    <h4 className="source font-weight-bold text-white">10</h4>
                  </Card>
                  <Card style={{ background: "transparent" }}>
                    <h4 className="source font-weight-bold text-white">$0.000</h4>
                  </Card>
                </CardDeck>
                <Row>
                  <Col>
                    <Button className="custom-button source mt-3" outline >compound</Button>
                    <Button className="custom-button source mt-3" outline >collect</Button>
                  </Col>
                </Row>
                <small className="pt-2 source">Note: Collecting will reset all stakes to 3.5% daily. Compound will add to your stakes while doing the same.</small>
              </Card>
            </CardDeck>
            <CardDeck className="pl-3 pr-3 pb-3">
              <Card body className="text-center text-lightblue">
                <h5 className="calvino text-lightblue">Referrals Earned</h5>
                <h4 className="source font-weight-bold text-white">$24</h4>
                <Row>
                  <Col>
                    <Button className="custom-button source mt-2" outline >STAKE</Button>
                    <Button className="custom-button source mt-2" outline >COLLECT</Button>
                  </Col>
                </Row>

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
                <small className="font-weight-bold source text-lightblue">Nothing to show here.</small>
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
        {/* <img src='sub-img-bottom.png' style={{position:'absolute', width:'100%', bottom:'0px'}}/> */}
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
                    ></Input>
                  </InputGroup>
                  <Button className="custom-button mt-4 source font-weight-bold">APPROVE</Button>
                  <Button className="custom-button mt-4 source font-weight-bold">STAKE</Button>
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
          <div className="pt-5 text-center calvino text-lightblue">
            <div className="custom-footer" style={{ backgroundColor: 'white' }}>
              <SelectObject value={auditNo} onChangeAuditNo={onChangeAuditNo} />
              <a href="https://bscscan.com/address/0xbcae54cdf6a1b1c60ec3d44114b452179a96c1e3" target="_blank" rel="noreferrer"> CONTRACT </a>
              <a href="/whitepaper.pdf" target="_blank" rel="noreferrer"> DOCS </a>
              <a href="https://twitter.com/WolfOfCrypto885" target="_blank" rel="noreferrer"> TWITTER </a>
              <a href="https://t.me/WCMinerBUSD" target="_blank" rel="noreferrer"> TELEGRAM </a>
            </div>
          </div>
          <p className="custom-footer-desc">COPYRIGHT © 2022 SOLSEARCHER.FINANCE ALL RIGHTS RESERVED</p>
        </Container>
        <img src='sub-img-bottom.png' className='footer-img-bottom' />
        <img src='sub-img-bottom-right.png' className='footer-img-bottom-right' />
      </div>
    </>
  )
}
export default WealthMountain;