import AllRoutes from "./Routes/AllRoutes";
import WhatsAppWidget from "react-whatsapp-chat-widget";
import "react-whatsapp-chat-widget/index.css";
import "./App.css";

function App() {
  return (
    <>
      <AllRoutes />
      <WhatsAppWidget
        phoneNo="+918369563412"
        position="right"
        widgetWidth="300px"
        widgetWidthMobile="260px"
        // autoOpen={false}
        // autoOpenTimer={5000}
        messageBox={true}
        messageBoxTxt="Hi Team, is there any related service available ?"
        iconSize="60"
        iconColor="white"
        iconBgColor="#38903c"
        headerIcon="https://www.company.com/assets/company-f58b2527.png"
        headerIconColor="#fff"
        headerTxtColor="#fff"
        headerBgColor="#38903c"
        headerTitle="Company"
        headerCaption="Online"
        bodyBgColor="#fff"
        chatPersonName="Support"
        chatMessage={
          <>
            Hi there 👋 <br />
            <br /> How can I help you?
          </>
        }
        footerBgColor="#38903c"
        placeholder="Type a message.."
        btnBgColor="#fff"
        btnTxt="Start Chat"
        btnTxtColor="#38903c"
      />
    </>
  );
}

export default App;
