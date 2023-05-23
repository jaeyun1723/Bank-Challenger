import { React, useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import shinhanLogo from 'assets/img/brand/shinhan.png';
import bnkLogo from 'assets/img/brand/bnk.png';
import citiLogo from 'assets/img/brand/citi.png';
import dgbLogo from 'assets/img/brand/dgb.png';
import ibkLogo from 'assets/img/brand/ibk.png';
import kbLogo from 'assets/img/brand/kb.png';
import kdbLogo from 'assets/img/brand/kdb.jpg';
import kjbLogo from 'assets/img/brand/kjb.png';
import mgLogo from 'assets/img/brand/mg.jpg';
import nfcfLogo from 'assets/img/brand/nfcf.jpg';
import nonghyupLogo from 'assets/img/brand/nonghyup.png';
import sanghoLogo from 'assets/img/brand/sangho.jpg';
import scLogo from 'assets/img/brand/sc.png';
import shinhyupLogo from 'assets/img/brand/shinhyup.jpg';
import suhyupLogo from 'assets/img/brand/suhyup.png';
import wooriLogo from 'assets/img/brand/woori.jpg';

function ManageAccount() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    document.getElementById("main").scrollTop = 0;
  }, []);

  const [login, setLogin] = useState('');
  const [user, setUser] = useState('');
  const [withdrawAccounts, setWithdrawAccounts] = useState([]);
  const [savingAccounts, setSavingAccounts] = useState([]);
  const [openbankingApi, setOpenbankingApi] = useState('');
  const [accountType, setAccountType] = useState(0);
  let { code } = useParams();
  useEffect(() => {
    axios.get("/status/login")
      .then(response1 => {
        setLogin(response1.data.login);

        if (login === false) return;

        axios.get("/status/user")
          .then(response2 => {
            setUser(response2.data);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, [login]);

  useEffect(() => {
    axios.get(`/withdraw/list/${user.userId}`)
      .then(response3 => {
        console.log(response3.data);
        setWithdrawAccounts(response3.data);
      })
      .catch(error => {
        console.error(error);
      });
    axios.get(`/savings/list/${user.userId}`)
      .then(response4 => {
        console.log(response4.data);
        setSavingAccounts(response4.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [user]);

  useEffect(() => {
    code = new URLSearchParams(window.location.search).get("code");
   // console.log("code : "+ new URLSearchParams(window.location.search).get("code"));
    // console.log("code = "+code);
    // console.log(sessionStorage.getItem("userId"));
    // console.log(code);
    // console.log(accountType);
    if(code!=null){
      axios.get(`http://127.0.0.1:8080/openapi/${sessionStorage.getItem("userId")}/${code}/${accountType}`);
    }
  }, []);

  if (login === false) {
    window.location.href = "/";
    return;
  }
  
  
  function getBankLogo(bankName) {
    switch (bankName) {
      case '신한은행':
        return shinhanLogo;
      case '산업은행':
        return kdbLogo;
      case 'IBK기업은행':
        return ibkLogo;
      case '국민은행':
        return kbLogo;
      case '수협은행':
        return suhyupLogo;
      case '농협은행':
        return nonghyupLogo;
      case '농협중앙회':
        return nonghyupLogo;
      case '우리은행':
        return wooriLogo;
      case 'SC제일은행':
        return scLogo;
      case '씨티은행':
        return citiLogo;
      case '대구은행':
        return dgbLogo;
      case '부산은행':
        return bnkLogo;
      case '광주은행':
        return kjbLogo;
      case '제주은행':
        return shinhanLogo;
      case '전북은행':
        return kjbLogo;
      case '경남은행':
        return bnkLogo;
      case '새마을금고':
        return mgLogo;
      case '신협중앙회':
        return shinhyupLogo;
      case '상호저축':
        return sanghoLogo;
      case '산림조합':
        return nfcfLogo;
      default:
        return '';
    }
  }


  function RegisterWithdrawAccount() {
    const registerWAccountClick = () => {
      setAccountType(0);
      const baseUrl =
        "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=3908213e-1560-424b-b582-620ee1368de7&redirect_uri=http://localhost:8080/manageaccount&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0";
      window.location.href = baseUrl;
    };
    return (
      <>
        <button onClick={registerWAccountClick} style={{ fontSize: '12px', padding: '5px 23px', marginRight: '15px' }} className="btn-1 ml-1 btn btn-outline-info">계좌 추가하기</button>
      </>
    );
  }

  
  function DeleteWithdrawAccount({acntId}){
    const deleteWAccountClick=()=>{
     console.log(acntId);
      try{
      axios.delete(`/withdraw/${acntId}`);
      }catch(error) {
        console.error(error);
      }
    };

    return (
      <>
      <button onClick={deleteWAccountClick} style={{ fontSize: '12px', padding: '5px 5px', marginRight: '15px' }} className="btn-1 ml-1 btn btn-danger">삭제</button>
      </>
    );
  }

  const WithdrawList = ({ withdrawAccount }) => {
    if (!withdrawAccount || !withdrawAccount.result) {
      return null;
    }
    return (
      <div className="withdrawList">
        <div>
          <div style={{ textAlign: 'left', marginBottom: '10px' }}>
            <small>
              {user.name}님의 출금 계좌 목록({withdrawAccounts.count}개)
            </small>
          </div>
          {withdrawAccounts.result.map((it) => (
            <div>
              <button
                type="button"
                style={{ marginBottom: '5px', textAlign: 'left', width: '280px', pointerEvents: 'none' }}
                className="btn-1 btn-neutral ml-1 btn btn-default"
              > <img
                  alt="..."
                  className="img-fluid"
                  src={getBankLogo(it.bankName)}
                  style={{ marginBottom: '3px', width: "15px" }}
                /> {it.bankName} {it.accountNumMasked}</button>
                <DeleteWithdrawAccount acntId={it.accountId}/>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <RegisterWithdrawAccount />
        </div>
      </div>
    )
  }

  const SavingList = ({ savingAccount }) => {
    if (!savingAccount || !savingAccount.result) {
      return null;
    }
    return (
      <div className="savingList">
        <div>
          <div style={{ textAlign: 'left', marginBottom: '10px' }}>
            <small>
              {user.name}님의 저금 계좌 목록({savingAccounts.count}개)
            </small>
          </div>
          {savingAccounts.result.map((it) => (
            <div>
              <button
                type="button"
                style={{ marginBottom: '5px', textAlign: 'left', width: '280px', pointerEvents: 'none' }}
                className="btn-1 btn-neutral ml-1 btn btn-default"
              > <img
                  alt="..."
                  className="img-fluid"
                  src={getBankLogo(it.bankName)}
                  style={{ marginBottom: '3px', width: "15px" }}
                /> {it.bankName} {it.accountNumMasked}</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <>
      <DemoNavbar />
      <main id="main">
        <section className="section section-hero section-shaped">
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-3">
                      <button
                        type="button"
                        style={{ width: '300px', pointerEvents: 'none' }}
                        className="btn-1 ml-1 btn btn-outline-warning"
                      >
                        전체 계좌 조회
                      </button>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-muted mb-4">
                      <WithdrawList withdrawAccount={withdrawAccounts} />
                    </div>
                    <div className="text-muted mb-4">
                      <SavingList savingAccount={savingAccounts} />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default ManageAccount;
