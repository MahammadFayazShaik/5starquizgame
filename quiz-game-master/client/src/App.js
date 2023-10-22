import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function HeaderSection() {
  return (
    <section className="header_section">
      <table className="satta-king-results-tab">
        <tbody>
        <tr>
          <td width="25%">
            <a href="https://www.sattafix.online/" title="SATTA KING">
              SATTA FIX ONLINE
            </a>
          </td>
          <td width="25%">
            <a href="https://www.sattafix.online/" title="Taj Chart">
              24 GAME RESULT
            </a>
          </td>
          <td width="25%">
            <a href="https://www.sattafix.online/" title="Taj Chart">
              30MIN RESULT
            </a>
          </td>
          <td width="25%">
            <a href="https://www.sattafix.online/" title="RESULT CHART">
              RESULT CHART
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  );
}

function SattaKingSection() {
  return (
    <section>
      <div className="satta-kingg">
        <div className="telegra_">
          <div className="row mx-0 px-lg-5">
            <div className="head-logo text-lg-left text-center col-md-6">
              <a href="https://www.sattafix.online/" title="Satta King Result" style={{ textDecoration: 'none' }}>
                <img src="./sattafix-logo.png" alt="SuperfastKIng" style={{ width: '360px', paddingBottom: '10px' }} />
              </a>
            </div>
            <div className="col-md-1 text-center">ˀ</div>
            <div className="col-md-5 text-center">
              <div className="today_leak">
                <p style={{ color: 'yellow', fontSize: '30px' }}>☣️ ससट्टा फिक्स☣️ <br/>9518802119</p>
                <a href="https://wa.me/9518802119?text=Welcome%20to%20sattafix.online" className="btn-whatsapp btn_whatschat_now" style={{ fontSize: '18px', marginTop: '5px', background: '#1ad03f' }} title="whatsapp link">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeaderMarquee() {
  return (
    <div className="header_marque">
      <marquee
        onMouseOver={() => { if (!window.__cfRLUnblockHandlers) return false; this.stop(); }}
        onMouseOut={() => { if (!window.__cfRLUnblockHandlers) return false; this.start(); }}
        data-cf-modified-ff10c75f352c50a3260eb9c2->
        हमारी वेबसाइट पर www.sattafix.online खुले हुए गेमों का रिजल्ट दिखाया जाता है हम यह सब में मनोरंजन के लिए करते हैं हमारा सट्टे से कोई संबंध नहीं है 18 वर्ष से कम आयु वाले वह जिन राज्य में सट्टा खेलना कानूनी अपराध है कृपया इस वेबसाइट को ना देखें सट्टा खेलना गलत है कृपया अपनी जिम्मेदारी से खेलें इसकी लत लग सकती है आप खुद जिम्मेदार होंगे हमारी कोई जिम्मेदारी नहीं होगी धन्यवाद
      </marquee>
    </div>
  );
}
function SattaFixOnlineResultHeader() {
  const current = new Date();
  return (
    <section>
      <div className="satta-kingg-res">
        <h1 style={{ color: '#ffffff' }}>SATTA FIX, SUPER SATTAFIX LIVE RESULT</h1>
        <h2>SATTA FIX, SUPER SATTAFIX LIVE TODAY'S RESULT</h2>
        <div id="clockbox">{ current.toString() }</div>
      </div>
    </section>
  );
}

function SattaFixDisclaimer() {
  return (
    <section>
      <div className="satta-kingg-res" style={{ background: '#660404' }}>
        <p style={{ color: '#fff', lineHeight: '23px' }}>हमारी वेबसाइट पर www.sattafix.online खुले हुए गेमों का रिजल्ट दिखाया जाता है हम यह सब में मनोरंजन के लिए करते हैं हमारा सट्टे से कोई संबंध नहीं है 18 वर्ष से कम आयु वाले वह जिन राज्य में सट्टा खेलना कानूनी अपराध है कृपया इस वेबसाइट को ना देखें सट्टा खेलना गलत है कृपया अपनी जिम्मेदारी से खेलें इसकी लत लग सकती है आप खुद जिम्मेदार होंगे हमारी कोई जिम्मेदारी नहीं होगी धन्यवाद</p>
      </div>
      <div className="satta-kingg-res" style={{ background: '#080712' }}>
        <p style={{ color: '#fff', lineHeight: '23px' }}>
          SATTA FIX ONLINE RESULT 5-STAR LIVE RESULT GALI LIVE RESULT DESHAWAR LIVE RESULT GHAZIABAD LIVE RESULT FARIDABAD GAME DESAWAR GALI SATTA CHART TOP GUSSER MATKA LINK MATKA COM LIVE RESULT SATTA BAJAR SATTA MATKA NUMBER SATTA NEWS
        </p>
      </div>
    </section>
  );
}

const ResultItem = ({ game, title, time, number1, number2 }) => (
  <div className="col-md-4 col-sm-4 col-xs-4 col-6 ptb-15 mob-ptb-0">
    <div className="sattakinghalf-cloud border-box">
      <a href={title}>{game}</a>
      <p>{time}</p>
      <font className="sattakinghalf-cloud-result">
        {' '}
        [ <span style={{ color: 'blue' }}>{number1}</span> ] (कल)
      </font>
      <img
        width={40}
        src="https://www.superfastking.com/assets/fonts/images/arrow.jpg"
        alt="satta king live result | fast live result | satta live result"
        title="satta live result | satta king live result | satta vip king"
      />
      <font className="sattakinghalf-cloud-result">
        {' '}
        [ <span style={{ color: 'blue' }}>{number2}</span> ] (आज)
      </font>
      <br />
    </div>
  </div>
);

const getToAndFromForWidget = ()=>{
  const from = new Date();
  from.setDate(from.getDate() - 1);
  from.setHours(0, 0, 0, 0);
  const to = new Date();
  return [ from.valueOf(), to.valueOf() ];
}

const DayGameLiveResult = () => {
  const [data, setData] = useState({ name: '5-Star', result: 'wait' });
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();

  useEffect(() => {
    axios(`/api/day-game-next-result/${hour}:${minute}`)
      .then((response) => {
        console.log('API Response:', response.data); // Log the entire API response
        const { data: { response: { name, result } } } = response.data;
        // Update state with the received data
        setData({
          name,
          result,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle the error if needed
      });
  }, [hour, minute]);
  

  return (
    <div align="center" className="top_1">
      <div>
        <h4 style={{ fontWeight: 'bold', color: '#fff', paddingBottom: '6px' }}>SATTAFIX ONLINE Live Result</h4>
      </div>
      <div>
        <h1 style={{ fontWeight: 'bold', color: '#ff0', paddingBottom: '6px' }}>
          {data?.name} <br />
          <br />
          {data?.result < 10 ? '0' + data?.result : data?.result}
        </h1>
      </div>
    </div>
  );
};

const ResultList = () => {
  const [data, setData] = useState({});
  const [game, setGame] = useState(null);
  const [from, to] = getToAndFromForWidget();

  useEffect(() => {
    axios(`/api/all-game-results-widget/${from}/${to}`)
      .then(({ data: { response: { results, games } } }) => {
        const finalResponse = Object.entries(results).reduce((agg, [key, values]) => {
          return {
            ...agg,
            [key]: Object.values(values).reduce((agg, val) => {
              return {
                ...agg,
                [val.date]: {
                  ...val,
                  result: val.result < 10 && val.result !== '' ? '0' + val.result : val.result,
                },
              };
            }, {}),
          };
        }, {});
        setData(finalResponse);
        setGame(games.find(game => game.name === '5-Star'));
      })
      .catch(error => {
        // Handle API request errors here
        console.error(error);
      });
  }, [from, to]); // Include 'from' and 'to' in the dependency array to re-fetch data when they change

  if (!game) {
    // Loading state while waiting for API response
    return <div>Loading...</div>;
  }

  const resultName = data?.[game.name]?.[new Date(from).getDate()]?.result || '-';
  const resultNumber = data?.[game.name]?.[new Date(to).getDate()]?.result || '-';

  return (
    <div className="container-fluid" >
      <div className="row" style={{marginLeft:'600px'}}>
        <ResultItem
          key={game.name || 'unknown'} // Add a unique key to the item
          title="https://www.sattafix.online/"
          time={game.resultTime || ''}
          game={game.name || ''}
          number1={resultName}
          number2={resultNumber}
        />
      </div>
    </div>
  );
};


const getTodayDate = ()=>{
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return yyyy + '-' + mm + '-' + dd;
}
const getFromAndTo = (date)=>{
  const from = new Date(date)
  from.setHours(0, 0, 0, 0);
  if(from.getDate() < new Date().getDate()){
    const to = new Date(from);
    to.setHours(23, 59, 59, 99);
    return [from.valueOf(), to.valueOf()];
  }
  const to = new Date();
  return [from.valueOf(), to.valueOf()]
}
const HalfHourGameResultChart = ()=>{
  const [data, setData] = useState({ slots: [] });
  const [date, setDate] = useState(getTodayDate());
  useEffect(()=>{
    const [from, to] = getFromAndTo(date.valueOf());
    axios(`/api/half-hour-result/${from}/${to}`).then(({ data: { response } })=>{
      setData(response);
    })
  }, [date])
      return (
        <>
          <div id="app" style={{ minHeight: '100px' }}>
            <div className="container-fluid bg-dark">
              <div className="col-md-12" style={{ display: 'inline-block' }}>
                <h1 className="text-white text-center" style={{ marginTop: '20px' }}>JMD Result History</h1>
                <div className="clearfix"></div>
                <div className="col-md-1 float-left">
                  <h5 className="text-white">Date</h5>
                </div>
                <div className="col-md-2 float-left">
                  <input className="form-control" type="date" id="resultDay" name="resultDay" value={date} onChange={(e)=>setDate(e.target.value)}
                  />
                </div>
                <div className="clearfix" style={{ height: '20px', margin: '50px 0' }}></div>
                <br />
                <div className="table-responsive col-md-4" style={{ margin: '0 auto' }}>
                  <table className="table table-bordered text-white text-center">
                    <tr className="text-warning">
                      <th>Time</th>
                      <th>Number</th>
                    </tr>
                    {
                      data?.slots?.map(({slot, result}) => <tr>
                        <td>{ slot }</td>
                        <td>{ result < 10 ? '0'+ result : result }</td>
                      </tr>)
                    }
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
        
      );
}

const DayGameResultMonthlyChart = ()=>{
  const [games, setGames] = useState([]);
  let month = new Date().getMonth()+1;
  month = month < 10 ? '0'+month : month
  const [dateFormat, setDateFormat] = useState(`${new Date().getFullYear()}-${month}`);
  const [data, setData] = useState([])
  const [selectedGame, setSelectedGame] = useState('');
  useEffect(()=>{
   axios(`/api/day-game-month-chart?date=${dateFormat}&game=${selectedGame}`).then(( { data : { response: { games, results } }})=>{
     setGames(games);
     setData(results);
     if(!selectedGame)
       setSelectedGame(games?.[0]._id)
   })
  }, [dateFormat, selectedGame])
  return (
    <>
      <div id="app" style={{ minHeight: '100px' }}>
        <div className="container-fluid bg-dark">
          <div className="col-md-12" style={{ display: 'inline-block' }}>
            <h1 className="text-white text-center" style={{ marginTop: '20px' }}>Result History</h1>
            <div className="clearfix"></div><br></br>
            <div className="col-md-1 float-left">
              <h5 className="text-white">Month</h5>
            </div>
            <div className="col-md-2 float-left">
              <input className="form-control" type="month" id="resultMonth" name="resultMonth" value={dateFormat} onChange={(e)=>setDateFormat(e.target.value)}/>
            </div>
            <div className="col-md-1 float-left">
              <h5 className="text-white">Game</h5>
            </div>
            <div className="col-md-2 float-left">
              <select className="form-control" name="games" id="games" value={selectedGame} onChange={(e)=>setSelectedGame(e.target.value)}>
                {
                  games?.map(game=><option value={game._id}>{game.name}</option>)
                }
              </select>
            </div>
            
            <div className="clearfix" style={{ height: '20px', margin: '50px 0' }}></div>
            <br />
            <div className="table-responsive col-md-4" style={{ margin: '0 auto' }}>
              <table className="table table-bordered text-white text-center">
                <tr className="text-warning">
                  <th>Date</th>
                  <th>Number</th>
                </tr>
                {
                  data?.map(({date, result}) => {
                    return <tr>
                      <td>{ new Date(date).toLocaleString().split(',')[0] }</td>
                      <td>{ result < 10 ? '0'+ result : result }</td>
                    </tr>
                  })
                }
              </table>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

const getToAndFromForDayGameResultChart = ()=>{
  const from = new Date()
  from.setDate(1)
  from.setHours(0, 0, 0, 0);
  const to = new Date()
  return [ from.valueOf(), to.valueOf() ];
}
const DayGameResultChart = () => {
  const [data, setData] = useState({});
  const [ from, to ] =getToAndFromForDayGameResultChart()
  useEffect(()=>{
    axios(`/api/all-game-results-current-month/${from}/${to}`).then(({ data: { response } })=>{
      const finalResponse = Object.entries(response).reduce((agg, [key, values])=>{
        return {
          ...agg,
          [key]: values.map(val => ({ ...val, result : val.result < 10 && val.result !== '' ? '0'+ val.result: val.result }))
        }
      }, {})
      setData(finalResponse);
    })
  },[])
  return (
    <div className="container-fluid">
      <div className="border row">
        <div className="col-md-12 col-sm-12 col-xs-12 sattakingfullchart-cloud">
          <a href="#">Satta Fix Online Record Chart Of Jun-2023</a>
        </div>
      </div>
      <div style={{ width: '50%', overflowX: 'auto', margin: 'auto' }}>
        <table className="sattakingtable-cloud font-size-decrease" cellPadding="0" cellSpacing="0">
          <tbody>
          <tr>
            <th className="sattakingtable-cloud-fon">Date</th>
          {/* <th>Dishawar</th>
            <th>Faridabad</th>
            <th>Ghaziabad</th>
  <th>Gali</th>*/ }
            <th>5Star</th>
          </tr>
          {
            new Array(new Date().getDate()).fill(0).map((i, idx)=>{
              return (
                <tr>
                  <td className="sattakingtable-cloud-date">{idx+1}</td>
             {  /*   <td>{ data?.['Dishawar']?.[idx]?.result ?? ''}</td>
                  <td>{ data?.['Faridabad']?.[idx]?.result ?? ''}</td>
                  <td>{ data?.['Ghaziabad']?.[idx]?.result ?? ''}</td>
                  <td>{ data?.['Gali']?.[idx]?.result ?? ''}</td>*/}
                  <td>{ data?.['5-Star']?.[idx]?.result ?? ''}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

function SattaFixInformation() {
  return (
    <section>
      <div className="satta-kingg-res" style={{ background: '#141128' }}>
        <p style={{ color: '#fff', lineHeight: '23px' }}>(आधे घंटे  वाला गेम JMD का   or FB. GB.  5  STAR. GALI DISAWER  गेम लिया जाता है ऑनलाइन खाईवाल जोड़ी रेट 10 = 900.   हरप   10 = 90 सबसे तेज पेमेंट करंट पेमेंट व्हाट्सएप नंबर 9518802119
          <h2 style={{color: "#fff"}}>Time Table Games</h2>
          <div style={{ fontSize: 20, lineHeight: 2}}>
           {/* Faridabad-----5-35PM.
            <br/>Ghaziabad-----7-50PM.*/}
            <br/>5 Star-----9-45 pm.
            {/*<br/>Gali-----10-50PM.
            <br/>Dishawar-----2-00AM.*/}
          </div>
          <br/><br/>Please  whatshap   contact. 9518802119</p>
      </div>
      <div className="satta-kingg-res" style={{ background: '#080712' }}>
        <p style={{ color: '#fff', lineHeight: '23px' }}>
          जो लोग अपना लॉस कवर करना चाहते हैं वह हम से जुड़े आपका अपना भाई ऑनलाइन सट्टा खाईवाल  whatshap  no 9518802119
        </p>
      </div>
      <div className="satta-kingg-res" style={{ background: '#660404' }}>
        <p style={{ color: '#fff', lineHeight: '23px' }}>जो लोग अपना खुद का सट्टा चलाते हैं और अपनी गेम का रिजल्ट हमारी साइट पर लगवाना चाहते हैं तो प्लीज कांटेक्ट    whatshap  no 9518802119</p>
      </div>
    </section>
  );
}

function SattaFixHalfHourResult() {
  return (
    <section>
      <div className="satta-kingg-res" style={{ background: '#660404' }}>
        <p style={{ color: '#fff', lineHeight: '23px', fontSize: 25 }}>24 घंटे चलने वाला  International  Game   JMD  Game  हर  30  मिनट में खुलता है लाइव रिजल्ट</p>
      </div>
    </section>
  );
}

function HalfHourResultHeader(){
  const [data, setData] = useState({ slots: [] });
  useEffect(()=>{
    const [from, to] = getFromAndTo(getTodayDate().valueOf());
    axios(`/api/half-hour-result/${from}/${to}`).then(({ data: { response } })=>{
      setData(response);
    })
  }, [])
  return (
    <div align="center" className="top_1">
      <div>
        <h4 style={{fontWeight: 'bold', color: '#fff', paddingBottom: '6px' }}>JMD Live Result</h4>
      </div>
      <div>
        <h1 style={{fontWeight: 'bold', color: '#ff0', paddingBottom: '6px' }}>{data?.slots[data?.slots.length-1]?.slot} <br/><br/>{data?.slots[data?.slots?.length-1]?.result}</h1>
      </div>
    </div>
  )
}
function Footer() {
  return (
    <footer className="w3l-footer-16">
      <div className="copy-section text-center py-4">
        <div className="container">
          <p className="copy-text">&copy; 2023. All rights reserved www.sattafix.online <a href="https://www.sattafix.online/">SATTA FIX ONLINE</a></p>
        </div>
      </div>
    </footer>
  );
}
function App() {
  return (
    <div className="App">
      <HeaderSection/>
      <SattaKingSection/>
      <HeaderMarquee/>
      <SattaFixOnlineResultHeader/>
      <SattaFixHalfHourResult/>
      <HalfHourResultHeader/>
      <div className="satta-kingg-res" style={{ background: '#660404' }}>
        <p style={{ color: '#fff', lineHeight: '23px' }}></p>
      </div>
      <DayGameLiveResult/>
      <ResultList/>
      <SattaFixDisclaimer/>
      <DayGameResultChart/>
      <HalfHourGameResultChart/>
      <SattaFixInformation/>
      <DayGameResultMonthlyChart/>
      <Footer/>
    </div>
  );
}


export default App;
