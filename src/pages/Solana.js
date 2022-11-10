import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'
import { Parallax } from "react-parallax";
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../App.css';
import '../css/solana.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import SelectObject from "../components/SelectCoin";
import { FaCopy, FaWallet, FaUserShield, FaSearchDollar } from 'react-icons/fa';
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
    <div className='solana'>
      <img src='sol-img-top.png' className='sol-top-img' />
      <img src='sol-img-left.png' className='sol-left-img' />
      <div className='main-content header'>
        <Container>
          <Row>
            <Col>
              <Link to="/aptos">
                <Button className="sol-custom-button mt-6 sol-switch" outline >Switch Network</Button>
              </Link>
            </Col>
            <Col className="logo">
              <img src='solana-logo.png' width="250" />
            </Col>
            <Col>
              <Button className="sol-custom-button mt-6 sol-connect" outline >Connect</Button>
            </Col>
          </Row>
        </Container>
      </div >

      <div className='main-content'>
        <Container className="pt-3">
          <Container>
            <CardDeck className='sol-card'>
              <Card body className="text-center sol-text">
                <h5 className="calvino sol-text">TVL</h5>
                <h5 className="source font-weight-bold text-white">
                  12
                </h5>
              </Card>
              <Card body className="text-center sol-text">
                <h5 className="calvino sol-text">Users</h5>
                <h5 className="source font-weight-bold text-white">
                  387
                </h5>
              </Card>
              <Card body className="text-center sol-text">
                <h5 className="calvino sol-text">Stake Fee</h5>
                <h5 className="source font-weight-bold text-white">
                  10%
                </h5>
              </Card>
              <Card body className="text-center sol-text">
                <h5 className="calvino sol-text">Collection Fee</h5>
                <h5 className="source font-weight-bold text-white">
                  10%
                </h5>
              </Card>
            </CardDeck>
          </Container>
          <div>
            <CardDeck className="p-3 sol-card">
              <Card body className="text-center sol-text">
                <h4 className="calvino sol-text">Total Staked Value</h4>
                <h1 className="source font-weight-bold text-white">$0.00</h1>
                <Button outline className="sol-custom-button mt-3 source">Start a stake to see your info</Button>
              </Card>
              <Card body className="text-center sol-text">
                <h4 className="calvino sol-text">Total Earnings</h4>
                <CardDeck className='sol-card'>
                  <Card style={{ background: "transparent" }}>
                    <h4 className="source font-weight-bold text-white">10</h4>
                  </Card>
                  <Card style={{ background: "transparent" }}>
                    <h4 className="source font-weight-bold text-white">$0.000</h4>
                  </Card>
                </CardDeck>
                <Row>
                  <Col>
                    <Button className="sol-custom-button source mt-3" outline >compound</Button>
                    <Button className="sol-custom-button source mt-3" outline >collect</Button>
                  </Col>
                </Row>
                <small className="pt-2 source">Note: Collecting will reset all stakes to 3.5% daily. Compound will add to your stakes while doing the same.</small>
              </Card>
            </CardDeck>
            <CardDeck className="pl-3 pr-3 pb-3 sol-card">
              <Card body className="text-center sol-text">
                <h5 className="calvino sol-text">Referrals Earned</h5>
                <h4 className="source font-weight-bold text-white">$24</h4>
                <Row>
                  <Col>
                    <Button className="sol-custom-button source mt-2" outline >STAKE</Button>
                    <Button className="sol-custom-button source mt-2" outline >COLLECT</Button>
                  </Col>
                </Row>

              </Card>
              <Card body className="text-center sol-text">
                <h5 className="calvino sol-text">Referral Link</h5>
                <h3 type="button" onClick={() => navigator.clipboard.writeText("https://busd.wcminer.com?ref=" + userWalletAddress)} className="referralButton source font-weight-bold"><FaCopy size="1.6em" className="pr-3" />COPY LINK</h3>
                <small className="source sol-text">Earn 10% when someone uses your referral link.</small>
              </Card>
            </CardDeck>
            <CardDeck className="pt-2 pr-3 pl-3 pb-3 sol-card">
              <Card body className="text-center sol-text">
                <h4 className="calvino sol-text" style={{ lineHeight: "10px" }}>CURRENT STAKES</h4>
                <small className="pt-0 pb-4 source">Here's a list of all of your current stakes.</small>
                <small className="font-weight-bold source sol-text">Nothing to show here.</small>
              </Card>
              <Card hidden body className="text-center sol-text">
                <h4 className="calvino sol-text">Days Staked</h4>
                <h3 className="source font-weight-bold text-white">2 days</h3>
              </Card>
              <Card hidden body className="text-center sol-text">
                <h4 className="calvino sol-text">Time to Max</h4>
                <CardDeck className='sol-card'>
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
              <Card hidden body className="text-center sol-text">
                <h4 className="calvino sol-text">Current Unstake Fee</h4>
                <h3 className="source font-weight-bold text-white">20%</h3>
                <small className="source sol-text">days until decrease to 12%</small>
              </Card>
            </CardDeck>
          </div>
        </Container>
      </div>
      <div>
        <Container className="pt-3">
          <Card body>
            <h2 className="calvino text-center sol-text">Earnings Calculator</h2>
            <CardDeck className='sol-card'>
              <Card body className="text-center">
                <h3 className="calvino font-weight-bold sol-text">Staking</h3>
                <Form>
                  <FormGroup>
                    <Label className="source font-weight-bold sol-text">Stake Amount</Label>
                    <InputGroup>
                      <Input
                        className="custom-input text-center source"
                        placeholder="Minimum 50 BUSD"
                        onChange={updateCalc}
                      ></Input>
                    </InputGroup>
                  </FormGroup>
                </Form>
                <Label className="source font-weight-bold sol-text">Days Staked</Label>
                <Col className="text-center">
                  <Box className="sol-slider">
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
                <h3 className="calvino font-weight-bold sol-text">Earnings</h3>
                <CardDeck className='sol-card'>
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
          <CardDeck className="p-3 sol-card">
            <Card body className="text-center sol-text">
              <h4 className="calvino sol-text">Enter Stake</h4>
              <p className="source text-center">Approve and stake your BUSD here. You can view your ongoing stakes in the <span className="font-weight-bold">Current Stakes & Yield</span> tab.</p>
              <Form>
                <FormGroup>
                  <Label className="source font-weight-bold sol-text">Stake Amount</Label>
                  <InputGroup>
                    <Input
                      className="custom-input text-center source"
                      placeholder="Minimum 50 BUSD"
                    ></Input>
                  </InputGroup>
                  <Button className="sol-custom-button mt-4 source font-weight-bold">APPROVE</Button>
                  <Button className="sol-custom-button mt-4 source font-weight-bold">STAKE</Button>
                </FormGroup>
              </Form>
              <small className="source sol-text">Note: Stakes are not locked. You can unstake at any time.</small><br />
              <small className="source sol-text text-left"><FaWallet size="1.7em" className="pr-2" />Your wallet: <span className="text-white font-weight-bold">{userStablecoinBalance.toFixed(2)} BUSD</span></small>
              <small className="source sol-text text-left"><FaUserShield size="1.7em" className="pr-2" />Approved amount: <span className="text-white font-weight-bold">{stablecoinAllowanceAmount.toFixed(2)} BUSD</span></small>
              <a className="source text-left text-underline sol-text" href="https://pancakeswap.finance/swap" target="_blank" rel="noreferrer"><small className="source sol-text text-left"><FaSearchDollar size="1.7em" className="pr-2" />Swap your tokens for BUSD here. </small></a>
            </Card>
            <Card body className="source text-center">
              <h4 className="calvino sol-text">Important Information</h4>
              <p className="text-left text-white"> <span className="font-weight-bold">Stake or unstake at any time. </span>When a new stake is made, overall yield accrual is set to 3.5% until day 20.</p>
              <p className="text-left text-white"><span className="font-weight-bold">Approval is required </span>prior to staking your BUSD. The protocol will only request approval for the amount entered.</p>
              <p className="text-left text-white"><span className="font-weight-bold">Staking fee is a flat 10%. </span>Use the Earnings Calculator to determine how much a stake will earn daily. All Fee’s will be used to invest in other Dapp’s across the Defi Market, returns will be deposited in the contract automatically.</p>
              <small className="text-left text-white">Disclaimer: Dividend payouts will take place at a flat rate. Payouts continue contingent on Smart Contract health and liquidity. <Link className="sol-text text-white font-weight-bold" to="/faq">For further questions, please read our DOCS</Link></small>
            </Card>
          </CardDeck>

          <Parallax strength={500}>
            <div>
              <Container className="pb-3 pt-3 calvino text-center">
                <CardDeck className='sol-card'>
                  <Card className="p-3 mt-6">
                    <h3 className='sol-text'>Dividends</h3>

                    <table className="source" border="2" style={{width:'100%'}}>
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
                    <h3 className='sol-text'>Unstake Fees</h3>
                    <table className="source" border="2" style={{width:'100%'}}>
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
                  <Card className="p-3 mt-6">
                    <h3 className='sol-text'>Staking</h3>
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
          <div className="pt-5 text-center calvino sol-text">
            <div className="sol-custom-footer" style={{ backgroundColor: 'white' }}>
              <SelectObject value={auditNo} onChangeAuditNo={onChangeAuditNo} />
              <a href="https://bscscan.com/address/0xbcae54cdf6a1b1c60ec3d44114b452179a96c1e3" target="_blank" rel="noreferrer"> CONTRACT </a>
              <a href="/whitepaper.pdf" target="_blank" rel="noreferrer"> DOCS </a>
              <a href="https://twitter.com/WolfOfCrypto885" target="_blank" rel="noreferrer"> TWITTER </a>
              <a href="https://t.me/WCMinerBUSD" target="_blank" rel="noreferrer"> TELEGRAM </a>
            </div>
          </div>
          <p className="sol-custom-footer-desc">COPYRIGHT © 2022 SOLSEARCHER.FINANCE ALL RIGHTS RESERVED</p>
        </Container>
        <img src='sol-img-bottom.png' className='sol-img-bottom' />
        <img src='sol-img-bottom-right.png' className='sol-img-bottom-right' />
      </div>
    </div>
  )
}
export default WealthMountain;