import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
} from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import bankLogo from "components/Banks/BankLogo"
function ManageAccount() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    document.getElementById("main").scrollTop = 0;
  }, []);

  const [withdrawAccounts, setWithdrawAccounts] = useState([]);
  const [savingAccounts, setSavingAccounts] = useState([]);
  let { code } = useParams();
  let { clientInfo } = useParams();

  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("name");
  if (userId == null) window.location.href = "/";

  useEffect(() => {
    axios
      .get(`/withdraw/list/${userId}`)
      .then((response3) => {
        setWithdrawAccounts(response3.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`/savings/list/${userId}`)
      .then((response4) => {
        setSavingAccounts(response4.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    code = new URLSearchParams(window.location.search).get("code");
    clientInfo = new URLSearchParams(window.location.search).get("client_info");
    if (code != null) {
      axios
        .get(`http://127.0.0.1:8080/openapi/${userId}/${code}/${clientInfo}`)
        .then(setTimeout(() => (window.location.href = "/manageaccount"), 200))
        .catch((error) => console.log(error));
    }
  }, []);

  function RegisterWithdrawAccount() {
    const registerWAccountClick = () => {
      const baseUrl =
        "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=3908213e-1560-424b-b582-620ee1368de7&client_info=0&redirect_uri=http://localhost:8080/manageaccount&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0";
      window.location.href = baseUrl;
    };
    return (
      <div style={{ textAlign: "center" }}>
        <button
          onClick={registerWAccountClick}
          style={{
            fontSize: "12px",
            width: "600px",
            marginLeft: "10px",
            marginTop: "10px",
          }}
          className="btn-1 ml-1 btn btn-outline-info"
        >
          + 출금 계좌 추가하기
        </button>
      </div>
    );
  }

  function RegisterSavingAccount() {
    const registerSAccountClick = () => {
      const baseUrl =
        "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=3908213e-1560-424b-b582-620ee1368de7&client_info=1&redirect_uri=http://localhost:8080/manageaccount&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0";
      window.location.href = baseUrl;
    };
    return (
      <div style={{ textAlign: "center" }}>
        <button
          onClick={registerSAccountClick}
          style={{
            fontSize: "12px",
            width: "600px",
            marginLeft: "10px",
            marginTop: "10px",
          }}
          className="btn-1 ml-1 btn btn-outline-info"
        >
          + 저축 계좌 추가하기
        </button>
      </div>
    );
  }

  function DeleteWithdrawAccount({ acntId }) {
    const deleteWAccountClick = () => {
      if (window.confirm("삭제하시겠습니까?")) {
        console.log(acntId);
        try {
          axios.delete(`/withdraw/${acntId}`).then((res) => {
            setWithdrawAccounts(
              withdrawAccounts.filter((el) => el.accountId !== acntId)
            );
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    return (
      <>
        <button
          onClick={deleteWAccountClick}
          style={{
            fontSize: "12px",
            padding: "5px 5px",
            marginRight: "15px",
            marginTop: "8px",
          }}
          className="btn-1 ml-1 btn"
        >
          <img
            src={require("../assets/img/icons/common/delete_icon.png")}
            style={{ width: "20px", height: "auto" }}
          ></img>
        </button>
      </>
    );
  }

  function DeleteSavingAccount({ acntId }) {
    const deleteSAccountClick = () => {
      if (window.confirm("삭제하시겠습니까?")) {
        console.log(acntId);
        try {
          axios.delete(`/savings/${acntId}`).then((res) => {
            setSavingAccounts(
              savingAccounts.filter((el) => el.accountId !== acntId)
            );
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    return (
      <>
        <button
          onClick={deleteSAccountClick}
          style={{
            fontSize: "12px",
            padding: "5px 5px",
            marginRight: "15px",
            marginTop: "8px",
          }}
          className="btn-1 ml-1 btn"
        >
          <img
            src={require("../assets/img/icons/common/delete_icon.png")}
            style={{ width: "20px", height: "auto" }}
          ></img>
        </button>
      </>
    );
  }

  const WithdrawList = ({ withdrawAccount }) => {
    if (!withdrawAccount) {
      return null;
    }
    return (
      <div className="withdrawList">
        <div>
          <div
            style={{
              fontSize: "20px",
              textAlign: "left",
              marginBottom: "-10px",
              marginTop: "-20px",
            }}
            className="text-primary ml--4 btn btn-link"
          >
            출금 계좌({withdrawAccounts.length}개)
          </div>
          <div>
            <small>{userName}님이 등록하신 출금 계좌 목록이에요.</small>
          </div>
          <div style={{ marginBottom: "20px" }}></div>
          {withdrawAccounts.map((it) => (
            <div style={{ textAlign: "left" }}>
              <button
                type="button"
                style={{
                  marginBottom: "5px",
                  textAlign: "left",
                  width: "600px",
                  display: "flex",
                }}
                className="text-primary btn-neutral ml-1 btn btn-primary "
              >
                <table style={{ marginRight: "auto" }}>
                  <tr>
                    <th rowSpan="2">
                      <span>
                        {bankLogo(it.bankName)}
                      </span>
                    </th>
                    <th
                      style={{
                        fontSize: "12px",
                        textAlign: "left",
                        marginRight: "10px",
                      }}
                    >
                      {it.bankName}
                    </th>
                  </tr>
                  <tr>
                    <th style={{ fontSize: "16px", textAlign: "right" }}>
                      {it.accountNumMasked}
                    </th>
                  </tr>
                </table>
                <DeleteWithdrawAccount
                  acntId={it.accountId}
                  style={{
                    display: "inline-block",
                    marginLeft: "auto",
                    zIndex: "-1",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
        <div>
          <RegisterWithdrawAccount />
        </div>
      </div>
    );
  };

  const SavingList = ({ savingAccount }) => {
    if (!savingAccount) {
      return null;
    }
    return (
      <div className="savingList">
        <div>
          <div
            style={{
              fontSize: "20px",
              textAlign: "left",
              marginBottom: "-10px",
              marginTop: "-20px",
            }}
            className="text-primary ml--4 btn btn-link"
          >
            저금 계좌({savingAccounts.length}개)
          </div>
          <div>
            <small>{userName}님이 등록하신 저축 계좌 목록이에요.</small>
          </div>
          <div style={{ marginBottom: "20px" }}></div>
          {savingAccounts.map((it) => (
            <div style={{ textAlign: "left" }}>
              <button
                type="button"
                style={{
                  marginBottom: "5px",
                  textAlign: "left",
                  width: "600px",
                  display: "flex",
                }}
                className="text-primary btn-neutral ml-1 btn btn-primary "
              >
                <table style={{ marginRight: "auto" }}>
                  <tr>
                    <th rowSpan="2">
                      <span>
                      {bankLogo(it.bankName)}
                      </span>
                    </th>
                    <th
                      style={{
                        fontSize: "12px",
                        textAlign: "left",
                        marginRight: "10px",
                      }}
                    >
                      {it.bankName}
                    </th>
                  </tr>
                  <tr>
                    <th style={{ fontSize: "16px", textAlign: "right" }}>
                      {it.accountNumMasked}
                    </th>
                  </tr>
                </table>
                <DeleteSavingAccount
                  acntId={it.accountId}
                  style={{
                    display: "inline-block",
                    marginLeft: "auto",
                    zIndex: "-1",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
        <div>
          <RegisterSavingAccount />
        </div>
      </div>
    );
  };
  return (
    <>
      <DemoNavbar />
      <main id="main">
        <section className="section section-hero section-shaped">
          <div className="shape shape-style-1 shape-default">
          <img
                alt="..."
                src={require("assets/img/theme/background.png")}
                style={{
                  width: "100%",
                  height: "1200px",
                  maxWidth: "2000px",
                  margin: "0 auto",
                }}
              />
          </div>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="pt-lg-7"
          >
            <Card
              style={{ width: "700px" }}
              className="bg-secondary shadow border-0"
            >
              <CardHeader
                style={{
                  textAlign: "center",
                  width: "700px",
                  marginBottom: "-10px",
                }}
                className="bg-white pb-5"
              >
                <div className="text-muted text-center mb-3">
                  <button
                    type="button"
                    style={{
                      width: "300px",
                      pointerEvents: "none",
                      marginBottom: "15px",
                    }}
                    className="btn-1 ml-1 btn btn-outline-danger"
                  >
                    계좌 관리
                  </button>
                </div>
                <div
                  style={{ fontSize: "20px", margin: "-20px" }}
                  className="text-danger ml-1 btn btn-link"
                >
                  {userName} 님이 Bank Challneger에 등록한 계좌들이에요!
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
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}

export default ManageAccount;
