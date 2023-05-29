function BankLogo(bankName) {
    let element;
    switch (bankName) {
        case "신한은행":
            element = <img src={require("../../assets/img/brand/shinhan.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "KDB산업은행":
            element = <img src={require("../../assets/img/brand/kdb.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "IBK기업은행":
            element = <img src={require("../../assets/img/brand/ibk.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "KB국민은행":
            element = <img src={require("../../assets/img/brand/kb.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "수협은행":
            element = <img src={require("../../assets/img/brand/suhyup.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "NH농협은행":
            element = <img src={require("../../assets/img/brand/nonghyup.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "우리은행":
            element = <img src={require("../../assets/img/brand/woori.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "SC제일은행":
            element = <img src={require("../../assets/img/brand/sc.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "한국씨티은행":
            element = <img src={require("../../assets/img/brand/citi.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "대구은행":
            element = <img src={require("../../assets/img/brand/dgb.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "부산은행":
            element = <img src={require("../../assets/img/brand/bnk.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "광주은행":
            element = <img src={require("../../assets/img/brand/kjb.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "제주은행":
            element = <img src={require("../../assets/img/brand/shinhan.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "전북은행":
            element = <img src={require("../../assets/img/brand/kjb.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "경남은행":
            element = <img src={require("../../assets/img/brand/bnk.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "새마을금고":
            element = <img src={require("../../assets/img/brand/mg.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "신협":
            element = <img src={require("../../assets/img/brand/shinhyup.jpg")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "상호저축은행":
            element = <img src={require("../../assets/img/brand/sangho.jpg")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "하나은행":
            element = <img src={require("../../assets/img/brand/hana.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
        case "카카오은행":
            element = <img src={require("../../assets/img/brand/kakao.png")} style={{
                textAlign: "left",
                marginBottom: "3px",
                width: "35px",
                marginRight: "10px",
            }} />
            break;
    }
    return element;
};

export default BankLogo;