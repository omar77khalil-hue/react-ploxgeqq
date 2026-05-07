import { useState, useRef, useEffect } from "react";
 
const G="#c8a84b",DK="#111110",CD="#1a1918",BR="rgba(255,255,255,0.08)",MT="#7a7870",GRN="#27ae60",RD="#c0392b";
const WA="447395546820",GOAL=500;
const DS={"Newcastle":"Every Tuesday","Middlesbrough":"Every Monday","Sunderland":"Every Wednesday","Durham":"Every Thursday","Leeds":"Every Friday","Other":"To be arranged"};
const SZ=["S","M","L","XL","XXL"];
 
const PARTNERS=[
  {id:"PVD-00042",res:"Al Barakah Grill",name:"Ahmed Hassan",phone:"07700900001",city:"Newcastle"},
  {id:"PVD-00043",res:"Taste of Syria",name:"Omar Khalil",phone:"07700900002",city:"Middlesbrough"},
  {id:"PVD-00044",res:"Bab Al Hara",name:"Laith Nasser",phone:"07700900003",city:"Sunderland"},
  {id:"PVD-00045",res:"Ziad Kitchen",name:"Ziad Mousa",phone:"07700900004",city:"Durham"},
  {id:"PVD-00046",res:"Golden Flame",name:"Faisal Al-Amin",phone:"07700900005",city:"Leeds"},
];
 
const REVIEWS=[
  {id:1,res:"Al Barakah Grill",city:"Newcastle",date:"April 2025",service:5,quality:5,delivery:5,price:4,text:"Outstanding charcoal quality — burns longer and hotter. Delivery always on time."},
  {id:2,res:"Golden Flame",city:"Leeds",date:"March 2025",service:5,quality:5,delivery:4,price:4,text:"Excellent supplier. Top quality products and very responsive team."},
  {id:3,res:"Taste of Syria",city:"Middlesbrough",date:"April 2025",service:4,quality:5,delivery:5,price:5,text:"Best charcoal we have ever used. The credit line helped us a lot when starting out."},
  {id:4,res:"Ziad Kitchen",city:"Durham",date:"February 2025",service:5,quality:4,delivery:5,price:4,text:"Very professional. I can order at midnight and it is ready by delivery day."},
  {id:5,res:"Bab Al Hara",city:"Sunderland",date:"March 2025",service:5,quality:5,delivery:5,price:5,text:"Started with a free sample and never looked back. PROVIDA is a true partner."},
];
 
const PRODS=[
  {id:"CHR12",cat:"charcoal",flagship:true,e:"🪨",n:"Premium Restaurant Charcoal",s:"12kg Bag",d:"Restaurant-grade charcoal. Burns hotter, lasts longer, less ash.",p:13.50,u:"bag",ok:true,img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"},
  {id:"WOOD",cat:"charcoal",flagship:true,e:"🪵",n:"Firewood / Hatab",s:"70kg Sack",d:"Premium firewood for open-fire cooking.",p:70,u:"sack",ok:true,img:"https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=400&q=80"},
  {id:"CHR5",cat:"charcoal",e:"🪨",n:"Charcoal Starter Sample",s:"5kg Bag",d:"Free sample for new registered partners.",p:0,u:"bag",ok:true,free:true,img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"},
  {id:"GLV",cat:"safety",e:"🧤",n:"Rap Gloves",s:"Per Pack",d:"Heavy-duty kitchen gloves. Mix sizes in one order.",p:3.50,u:"pack",ok:true,isGlove:true,img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80"},
  {id:"BIN",cat:"safety",e:"🗑️",n:"Bin Bags",s:"Per Roll",d:"Heavy-duty commercial bin bags.",p:4.50,u:"roll",ok:true},
  {id:"APR",cat:"safety",e:"🥼",n:"Kitchen Apron",s:"Nylon / Lightweight",d:"Lightweight apron — easy to clean.",p:5,u:"apron",ok:true,vr:["Nylon","Lightweight Fabric"]},
  {id:"HAT",cat:"safety",e:"🪬",n:"Hair Cover",s:"Box of 100",d:"Nylon or lightweight hair covers.",p:4,u:"box",ok:true,vr:["Nylon","Lightweight Fabric"]},
  {id:"SCR",cat:"safety",e:"🧽",n:"Scrubbing Pads",s:"Pack of 10",d:"Industrial-strength scrubbing pads.",p:5,u:"pack",ok:true},
  {id:"TIS",cat:"safety",e:"🧻",n:"Kitchen Cloths 30x30",s:"Pack of 50",d:"Heavy-duty reusable kitchen cloths.",p:7,u:"pack",ok:true},
  {id:"DIS",cat:"safety",e:"🧴",n:"Dishwashing Liquid",s:"5L Container",d:"Professional dishwashing liquid.",p:12,u:"container",ok:true},
  {id:"BAG",cat:"packaging",e:"🛍️",n:"Takeaway Bags",s:"Pack of 100",d:"Branded-ready takeaway bags.",p:9,u:"pack",ok:true},
  {id:"BOX",cat:"packaging",e:"📦",n:"Food Boxes",s:"Pack of 50",d:"Sturdy food-grade boxes.",p:14,u:"pack",ok:true},
  {id:"FOIL",cat:"packaging",e:"✨",n:"Aluminium Foil",s:"150m Roll",d:"Heavy-duty catering foil.",p:11,u:"roll",ok:true},
  {id:"CTN",cat:"packaging",e:"📫",n:"Cardboard Cartons",s:"Pack of 25",d:"Flat-pack delivery cartons.",p:16,u:"pack",ok:true},
  {id:"LMN",cat:"food",e:"🍋",n:"Lemon Juice 1L x12",s:"Box of 12",d:"Pure pressed lemon juice.",p:12,u:"box",ok:false},
  {id:"POM",cat:"food",e:"🍇",n:"Pomegranate Molasses 1Lx12",s:"Box of 12",d:"Rich tangy pomegranate molasses.",p:22,u:"box",ok:false},
  {id:"JAL",cat:"food",e:"🌶️",n:"Jalapenos Pickled",s:"Per Jar",d:"Sliced pickled jalapenos.",p:5,u:"jar",ok:true},
  {id:"WAT",cat:"food",e:"💧",n:"Still Water",s:"Case 24x500ml",d:"Still water cases.",p:8,u:"case",ok:true},
];
 
const SVCS=[
  {n:"01",i:"🎨",t:"Visual Identity & Packaging",d:"Logos, menus, packaging and branded materials.",tags:["Logo Design","Menu Print","Packaging","Brand Identity"]},
  {n:"02",i:"🏪",t:"Signage Design & Installation",d:"LED signs, channel letters and storefront graphics.",tags:["LED Signs","Frontage","Installation","3D Letters"]},
  {n:"03",i:"🤖",t:"AI Financial Systems",d:"Custom AI-powered accounting for restaurants.",tags:["AI Accounting","Stock Control","Invoicing","Reports"]},
];
 
function calcD(sub,hasR){
  let d=[],t=sub;
  const x1=+(sub*.05).toFixed(2);d.push({l:"First Order (5%)",a:x1});t=+(t-x1).toFixed(2);
  if(sub>400){const x=+(sub*.015).toFixed(2);d.push({l:"Over £400 (1.5%)",a:x});t=+(t-x).toFixed(2);}
  if(hasR){d.push({l:"Referral Coupon",a:25});t=+(t-25).toFixed(2);}
  return{ds:d,total:Math.max(0,t)};
}
function genRef(name,id){return name.split(" ")[0].toUpperCase().slice(0,4)+id.split("-")[1];}
function avgR(r){return +((r.service+r.quality+r.delivery+r.price)/4).toFixed(1);}
 
let PC=46,OC=0;
 
function Stars({val,size=14}){
  return <span>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=val?G:"#3a3830",fontSize:size}}>★</span>)}</span>;
}
 
function DisplayCard({p}){
  return(
    <div style={{background:CD,border:`1px solid ${p.ok?BR:"rgba(192,57,43,0.15)"}`,position:"relative",overflow:"hidden",borderRadius:3,opacity:p.ok?1:0.65}}>
      {p.flagship&&<div style={{position:"absolute",top:10,left:10,padding:"3px 8px",background:"rgba(200,168,75,0.15)",border:"1px solid rgba(200,168,75,0.4)",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:G,borderRadius:2,zIndex:1}}>Flagship</div>}
      {p.free&&<div style={{position:"absolute",top:10,right:10,padding:"3px 8px",background:"rgba(200,168,75,0.12)",border:"1px solid rgba(200,168,75,0.3)",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:G,borderRadius:2,zIndex:1}}>Free Sample</div>}
      {!p.ok&&<div style={{position:"absolute",top:10,right:10,padding:"3px 8px",background:"rgba(192,57,43,0.15)",border:"1px solid rgba(192,57,43,0.3)",fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#ec7063",borderRadius:2,zIndex:1}}>Unavailable</div>}
      {p.img?<img src={p.img} alt={p.n} style={{width:"100%",height:140,objectFit:"cover",marginBottom:12,borderRadius:"3px 3px 0 0"}} onError={e=>e.target.style.display="none"}/>:<div style={{width:"100%",height:140,background:"#1a1918",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,borderRadius:"3px 3px 0 0"}}>{p.e}</div>}
      <div style={{padding:"0 16px 18px"}}>
        <div style={{fontSize:9,letterSpacing:3,textTransform:"uppercase",color:G,marginBottom:5}}>{p.cat.toUpperCase()}</div>
        <div style={{fontSize:15,fontWeight:700,marginBottom:3}}>{p.n}</div>
        <div style={{fontSize:11,color:MT,marginBottom:7}}>{p.s}</div>
        <div style={{fontSize:12,color:MT,lineHeight:1.6}}>{p.d}</div>
      </div>
    </div>
  );
}
 
function OrdItem({p,qty,vr,onQ,onV}){
  if(!p.ok)return(
    <div style={{background:CD,border:"1px solid rgba(192,57,43,0.15)",padding:"10px 14px",display:"flex",alignItems:"center",gap:10,borderRadius:3,marginBottom:6,opacity:0.5}}>
      <div style={{fontSize:20,width:34,textAlign:"center"}}>{p.e}</div>
      <div><div style={{fontSize:12,fontWeight:700}}>{p.n}</div><div style={{fontSize:10,color:"#ec7063",marginTop:2}}>Currently unavailable</div></div>
    </div>
  );
  return(
    <div style={{background:CD,border:`1px solid ${BR}`,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,borderRadius:3,marginBottom:6}}>
      <div style={{fontSize:22,width:36,textAlign:"center",flexShrink:0}}>{p.e}</div>
      <div style={{flex:1}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:1}}>{p.n} <span style={{fontSize:10,color:MT}}>({p.s})</span></div>
        <div style={{fontSize:11,color:MT,marginBottom:p.vr?5:0}}>£{p.p.toFixed(2)} / {p.u}</div>
        {p.vr&&<div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {p.vr.map(v=><button key={v} onClick={()=>onV(p.id,v)} style={{padding:"2px 8px",background:vr===v?"rgba(200,168,75,0.1)":"transparent",border:`1px solid ${vr===v?G:BR}`,borderRadius:3,fontSize:11,cursor:"pointer",color:vr===v?G:MT}}>{v}</button>)}
        </div>}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
        <button onClick={()=>onQ(p.id,-1)} style={{width:26,height:26,background:"#2a2920",border:`1px solid ${BR}`,borderRadius:3,color:"#f0ece0",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
        <div style={{fontSize:17,minWidth:22,textAlign:"center",fontWeight:700}}>{qty}</div>
        <button onClick={()=>onQ(p.id,1)} style={{width:26,height:26,background:"#2a2920",border:`1px solid ${BR}`,borderRadius:3,color:"#f0ece0",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
      </div>
    </div>
  );
}
 
export default function App(){
  const[mode,setMode]=useState(null);
  const[page,setPage]=useState("home");
  const[qty,setQty]=useState({});
  const[vr,setVr]=useState({});
  const[gloveItems,setGloveItems]=useState([]);
  const[gloveSz,setGloveSz]=useState("M");
  const[gloveQty,setGloveQty]=useState(1);
  const[reg,setReg]=useState({restaurant:"",name:"",phone:"",email:"",address:"",city:"",postcode:"",ref:""});
  const[rErr,setRErr]=useState("");
  const[pid,setPid]=useState("");
  const[rCode,setRCode]=useState("");
  const[pts,setPts]=useState(0);
  const[ordStep,setOrdStep]=useState(0);
  const[searchType,setSearchType]=useState("phone");
  const[searchVal,setSearchVal]=useState("");
  const[foundP,setFoundP]=useState(null);
  const[searchErr,setSearchErr]=useState("");
  const[isUrgent,setIsUrgent]=useState(false);
  const[payMethod,setPay]=useState("");
  const[refCode,setRefCode]=useState("");
  const[ordNotes,setOrdNotes]=useState("");
  const[reviews,setReviews]=useState(REVIEWS);
  const[showRForm,setShowRForm]=useState(false);
  const[newRev,setNewRev]=useState({res:"",city:"",text:"",service:5,quality:5,delivery:5,price:5});
  const[modal,setModal]=useState(null);
  const[oid,setOid]=useState("");
  const[ordPts,setOrdPts]=useState(0);
  const[chat,setChat]=useState([{r:"ai",t:"Hi! I'm the PROVIDA assistant 👋\n\nAsk me about products, delivery, or anything!"}]);
  const[chatIn,setChatIn]=useState("");
  const[chatLoad,setChatLoad]=useState(false);
  const[chatOpen,setChatOpen]=useState(false);
  const[aiSearch,setAiSearch]=useState("");
  const[aiRes,setAiRes]=useState([]);
  const[aiLoad,setAiLoad]=useState(false);
  const[aiDone,setAiDone]=useState(false);
  const chatRef=useRef(null);
 
  useEffect(()=>{if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;},[chat,chatOpen]);
 
  const regSel=PRODS.filter(p=>(qty[p.id]||0)>0&&p.ok&&!p.free&&!p.isGlove);
  const gloveSub=gloveItems.reduce((s,g)=>s+g.qty*3.50,0);
  const prodSub=regSel.reduce((s,p)=>s+p.p*(qty[p.id]||0),0);
  const sub=+(prodSub+gloveSub).toFixed(2);
  const delivCharge=(!isUrgent&&sub>0&&sub<60)?2:0;
  const{ds,total:discTotal}=calcD(sub,!!refCode);
  const total=+(discTotal+delivCharge).toFixed(2);
  const ePts=Math.floor(total);
  const pPct=Math.min(100,Math.round(pts/GOAL*100));
  const hasItems=regSel.length>0||gloveItems.length>0;
 
  const chQ=(id,delta)=>{const p=PRODS.find(x=>x.id===id);if(!p||!p.ok||p.free||p.isGlove)return;setQty(pv=>({...pv,[id]:Math.max(0,(pv[id]||0)+delta)}));};
  const addGlove=()=>{if(gloveQty<1)return;setGloveItems(pv=>{const ex=pv.findIndex(g=>g.size===gloveSz);if(ex>=0){const n=[...pv];n[ex]={...n[ex],qty:n[ex].qty+gloveQty};return n;}return[...pv,{size:gloveSz,qty:gloveQty}];});};
  const rmGlove=sz=>setGloveItems(pv=>pv.filter(g=>g.size!==sz));
 
  const doAiSearch=async()=>{
    const q=aiSearch.trim();if(!q||aiLoad)return;
    setAiLoad(true);setAiRes([]);setAiDone(false);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,system:"Product search for PROVIDA. Return ONLY JSON array of IDs. Products: CHR12(charcoal,فحم),WOOD(firewood,حطب),GLV(gloves,كفوف),BIN(bin bags),APR(apron,مريول),HAT(hair cover),SCR(pads,ليف),TIS(cloths,محارم),DIS(dishwashing,صابون),BAG(takeaway bags),BOX(food boxes),FOIL(foil),CTN(cartons),LMN(lemon,حامض),POM(pomegranate,دبس رمان),JAL(jalapenos),WAT(water,مياه). Return like: [\"CHR12\"]",messages:[{role:"user",content:q}]})});
      const data=await res.json();
      const text=data.content?.[0]?.text||"[]";
      const match=text.match(/\[.*\]/);
      setAiRes(match?JSON.parse(match[0]).filter(id=>PRODS.find(p=>p.id===id)):[]);
    }catch{setAiRes([]);}
    setAiLoad(false);setAiDone(true);
  };
 
  const searchPartner=()=>{
    setSearchErr("");
    const v=searchVal.trim().toLowerCase().replace(/\s/g,"");
    if(!v){setSearchErr("Please enter your details.");return;}
    let found=searchType==="phone"
      ?PARTNERS.find(p=>p.phone.replace(/\D/g,"")=== v.replace(/^(\+44|0044)/,"0"))
      :PARTNERS.find(p=>p.res.toLowerCase().includes(v)||v.includes(p.res.toLowerCase().split(" ")[0]));
    if(found){setFoundP(found);setOrdStep(1);}
    else setSearchErr("No account found. Check your details or register as a new partner.");
  };
 
  const doReg=()=>{
    if(!reg.restaurant||!reg.name||!reg.email||!reg.phone||!reg.address||!reg.city){setRErr("Please fill in all required fields.");return;}
    PC++;const id="PVD-"+String(PC).padStart(5,"0");const rc=genRef(reg.name,id);
    setPid(id);setRCode(rc);setRErr("");
    const wm=encodeURIComponent(`Welcome to PROVIDA, ${reg.name.split(" ")[0]}!\n\nRestaurant: ${reg.restaurant}\nPartner ID: ${id}\nReferral Code: ${rc}\nDelivery: ${DS[reg.city]||"TBA"}\n\nWelcome!\nPROVIDA Team`);
    window.open(`https://wa.me/${reg.phone.replace(/\D/g,"").replace(/^0/,"44")}?text=${wm}`,"_blank");
    setModal("reg");
  };
 
  const doOrder=()=>{
    if(!hasItems){alert("Please add at least one product.");return;}
    for(const p of regSel){if(p.vr&&!vr[p.id]){alert(`Please select a material for: ${p.n}`);return;}}
    OC++;const id=`ORD-2025-${String(OC).padStart(3,"0")}`;
    setOid(id);
    if(isUrgent){setModal("urgent");}
    else{setOrdPts(ePts);setPts(pv=>pv+ePts);setModal("ord");}
    setQty({});setVr({});setGloveItems([]);setOrdStep(0);setSearchVal("");setFoundP(null);setPay("");setRefCode("");setOrdNotes("");setIsUrgent(false);
  };
 
  const submitReview=()=>{
    if(!newRev.res||!newRev.text){alert("Please enter restaurant name and comment.");return;}
    setReviews(pv=>[{id:Date.now(),...newRev,date:"May 2025"},...pv]);
    setShowRForm(false);setNewRev({res:"",city:"",text:"",service:5,quality:5,delivery:5,price:5});
  };
 
  const sendAi=async()=>{
    const msg=chatIn.trim();if(!msg||chatLoad)return;
    setChatIn("");setChatLoad(true);
    setChat(pv=>[...pv,{r:"user",t:msg}]);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,system:"You are PROVIDA Supply AI assistant for UK restaurant partners. Concise, friendly, emojis. Same language as user. Charcoal 12kg=£13.50, Firewood=£70, Gloves=£3.50/pack, free delivery over £60 else £2. Delivery: Newcastle=Tue, Middlesbrough=Mon, Sunderland=Wed, Durham=Thu, Leeds=Fri. Discounts: 5% first, 5% loyal(4th+), 1.5% over £400, £25 referral. Points: £1=1pt, 500=reward. WhatsApp: 07395546820",messages:[...chat.map(m=>({role:m.r==="ai"?"assistant":"user",content:m.t})),{role:"user",content:msg}]})});
      const data=await res.json();
      setChat(pv=>[...pv,{r:"ai",t:data.content?.[0]?.text||"WhatsApp: 07395546820"}]);
    }catch{setChat(pv=>[...pv,{r:"ai",t:"Connection issue. WhatsApp: 07395546820 📱"}]);}
    setChatLoad(false);
  };
 
  const nb=p=>({padding:"7px 10px",background:"transparent",border:"none",color:page===p?"#f0ece0":MT,fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,fontFamily:"inherit"});
  const inp={width:"100%",background:DK,border:`1px solid ${BR}`,borderRadius:3,padding:"11px 14px",fontSize:13,color:"#f0ece0",outline:"none",marginBottom:14,fontFamily:"inherit"};
  const lbl={fontSize:9,letterSpacing:2,textTransform:"uppercase",color:MT,display:"block",marginBottom:6};
  const btnG={padding:"13px 28px",background:G,border:"none",color:"#0c0b08",fontWeight:700,fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,fontFamily:"inherit"};
  const btnO={padding:"13px 28px",background:"transparent",border:"1px solid rgba(240,236,224,0.2)",color:"#f0ece0",fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,fontFamily:"inherit"};
  const ey=t=><div style={{fontSize:10,letterSpacing:5,textTransform:"uppercase",color:G,marginBottom:16,display:"flex",alignItems:"center",gap:12}}><div style={{width:28,height:1,background:G}}/>{t}</div>;
  const H2=(a,b)=><h2 style={{fontSize:"clamp(26px,7vw,52px)",fontWeight:700,lineHeight:1,marginBottom:32}}>{a} <span style={{color:G,fontStyle:"italic"}}>{b}</span></h2>;
 
  // ── LANDING ──
  if(!mode)return(
    <div style={{minHeight:"100vh",background:"#0c0b08",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`,backgroundSize:"50px 50px",pointerEvents:"none"}}/>
      <div style={{textAlign:"center",position:"relative",zIndex:1}}>
        <div style={{fontSize:12,letterSpacing:6,textTransform:"uppercase",color:G,marginBottom:20}}>WELCOME TO</div>
        <div style={{fontSize:"clamp(42px,12vw,96px)",fontWeight:700,letterSpacing:3,marginBottom:8,lineHeight:1,color:"#f0ece0"}}>PRO<span style={{color:G}}>VIDA</span></div>
        <div style={{fontSize:14,color:MT,marginBottom:52,letterSpacing:1}}>Premium Supply and Services · UK</div>
        <div style={{fontSize:16,fontWeight:700,marginBottom:24,color:"#f0ece0"}}>Who are you shopping for?</div>
        <div style={{display:"flex",flexDirection:"column",gap:12,maxWidth:360,margin:"0 auto"}}>
          <button onClick={()=>setMode("restaurant")} style={{padding:"20px 24px",background:CD,border:"2px solid rgba(200,168,75,0.35)",borderRadius:10,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:14,fontFamily:"inherit"}}>
            <div style={{fontSize:34}}>🏪</div>
            <div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,marginBottom:3,color:"#f0ece0"}}>I'm a Restaurant</div><div style={{fontSize:12,color:MT}}>Partner pricing, scheduled delivery, credit line</div></div>
            <div style={{color:G,fontSize:18}}>→</div>
          </button>
          <button onClick={()=>setMode("home")} style={{padding:"20px 24px",background:CD,border:"2px solid rgba(200,168,75,0.15)",borderRadius:10,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:14,fontFamily:"inherit"}}>
            <div style={{fontSize:34}}>🏠</div>
            <div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,marginBottom:3,color:"#f0ece0"}}>Personal / Home Use</div><div style={{fontSize:12,color:MT}}>BBQ supplies, kitchen essentials</div></div>
            <div style={{color:MT,fontSize:18}}>→</div>
          </button>
        </div>
      </div>
    </div>
  );
 
  // ── HOME USE ──
  if(mode==="home")return(
    <div style={{minHeight:"100vh",background:"#0c0b08",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:20}}>🏠</div>
      <h1 style={{fontSize:"clamp(26px,7vw,52px)",fontWeight:700,marginBottom:14,lineHeight:1,color:"#f0ece0"}}>Home Use <span style={{color:G,fontStyle:"italic"}}>Coming Soon</span></h1>
      <p style={{fontSize:14,color:MT,maxWidth:360,lineHeight:1.8,marginBottom:32}}>We're building a dedicated section for personal orders — BBQ charcoal and kitchen essentials delivered to your door.</p>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
        <button onClick={()=>window.open(`https://wa.me/${WA}?text=Hi%20PROVIDA%2C%20interested%20in%20home%20use`,"_blank")} style={{...btnO,padding:"10px 20px",fontSize:11}}>💬 WhatsApp Us</button>
        <button onClick={()=>setMode(null)} style={{background:"none",border:"none",color:MT,cursor:"pointer",fontSize:12,textDecoration:"underline",fontFamily:"inherit"}}>← Back</button>
      </div>
    </div>
  );
 
  // ── RESTAURANT PORTAL ──
  return(
    <div style={{minHeight:"100vh",background:"#0c0b08",color:"#f0ece0",fontFamily:"'DM Sans',sans-serif"}}>
 
      <nav style={{position:"sticky",top:0,zIndex:200,background:"rgba(12,11,8,0.97)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${BR}`,padding:"0 20px",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{fontSize:20,fontWeight:700,letterSpacing:3,cursor:"pointer"}} onClick={()=>setPage("home")}>PRO<span style={{color:G}}>VIDA</span></div>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          <button style={nb("products")} onClick={()=>setPage("products")}>Products</button>
          <button style={nb("services")} onClick={()=>setPage("services")}>Services</button>
          <button style={nb("reviews")} onClick={()=>setPage("reviews")}>Reviews</button>
          <button style={nb("order")} onClick={()=>{setPage("order");setOrdStep(0);setSearchVal("");setFoundP(null);}}>Order</button>
          <button onClick={()=>setPage("register")} style={{padding:"7px 14px",background:G,border:"none",color:"#0c0b08",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,fontFamily:"inherit"}}>Partner ↗</button>
        </div>
      </nav>
 
      {/* HOME */}
      {page==="home"&&<>
        <div style={{minHeight:"88vh",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"40px 20px 60px",background:"linear-gradient(160deg,#0c0b08 55%,#1a1810)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`,backgroundSize:"50px 50px",pointerEvents:"none"}}/>
          {ey("Premium Restaurant Supply · UK")}
          <h1 style={{fontSize:"clamp(46px,12vw,108px)",lineHeight:0.92,letterSpacing:1,marginBottom:24,fontWeight:700}}>YOUR KITCHEN<br/>DESERVES<br/><span style={{color:G,fontStyle:"italic"}}>The Best.</span></h1>
          <p style={{fontSize:14,lineHeight:1.8,color:MT,maxWidth:380,marginBottom:32}}>Premium quality supplies and professional services — exclusively for UK restaurants.</p>
          <div style={{background:CD,border:"1px solid rgba(200,168,75,0.3)",borderRadius:10,padding:"14px 16px",maxWidth:460,marginBottom:32}}>
            <div style={{fontSize:10,color:G,marginBottom:8,letterSpacing:2,textTransform:"uppercase"}}>🤖 Smart Search</div>
            <div style={{display:"flex",gap:8}}>
              <input style={{flex:1,background:DK,border:`1px solid ${BR}`,borderRadius:6,padding:"10px 14px",fontSize:13,color:"#f0ece0",outline:"none",fontFamily:"inherit"}} placeholder='e.g. "charcoal and gloves" or "فحم وكفوف"' value={aiSearch} onChange={e=>{setAiSearch(e.target.value);setAiDone(false);setAiRes([]);}} onKeyDown={e=>e.key==="Enter"&&doAiSearch()}/>
              <button onClick={doAiSearch} style={{padding:"10px 16px",background:G,border:"none",borderRadius:6,color:"#0c0b08",fontWeight:700,fontSize:12,cursor:"pointer",minWidth:72,fontFamily:"inherit"}}>{aiLoad?"⟳":"Search"}</button>
            </div>
            {aiDone&&aiRes.length>0&&<div>
              <div style={{marginTop:12,display:"flex",flexWrap:"wrap",gap:6}}>{aiRes.map(id=>{const p=PRODS.find(x=>x.id===id);return p?<div key={id} style={{padding:"4px 10px",background:"rgba(200,168,75,0.1)",border:"1px solid rgba(200,168,75,0.3)",borderRadius:20,fontSize:11,color:G}}>{p.e} {p.n}</div>:null;})}</div>
              <button onClick={()=>{aiRes.forEach(id=>{const p=PRODS.find(x=>x.id===id);if(p&&p.ok&&!p.free&&!p.isGlove)chQ(id,1);});setAiSearch("");setAiRes([]);setAiDone(false);setPage("order");setOrdStep(0);}} style={{marginTop:10,width:"100%",padding:"9px",background:G,border:"none",borderRadius:6,color:"#0c0b08",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>Add to Order →</button>
            </div>}
            {aiDone&&aiRes.length===0&&<div style={{marginTop:10,fontSize:12,color:MT}}>No matches. Try different keywords.</div>}
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button style={btnG} onClick={()=>setPage("products")}>View Products</button>
            <button style={btnO} onClick={()=>setPage("register")}>Become a Partner</button>
          </div>
        </div>
 
        <div style={{padding:"60px 20px"}}>
          {ey("Why Choose Us")}
          {H2("Why","PROVIDA?")}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:2}}>
            {[{i:"🪨",t:"Premium Quality",d:"High-grade charcoal that burns hotter, lasts longer — the difference you taste in every dish."},{i:"🚗",t:"We Come to You",d:"Weekly scheduled delivery to your door. No calls, no chasing."},{i:"⚡",t:"Urgent Delivery",d:"Ran out? Emergency delivery when you need it most."},{i:"🕐",t:"Order Anytime",d:"2am order? No problem. Invoice instant, delivery confirmed."},{i:"🤝",t:"A Real Partner",d:"£350 credit, loyalty rewards, referral bonuses."},{i:"✅",t:"Peace of Mind",d:"Know your delivery day. Driver at your door, signed."}].map(b=>(
              <div key={b.t} style={{background:CD,padding:"28px 22px",border:`1px solid ${BR}`}}>
                <div style={{fontSize:32,marginBottom:14}}>{b.i}</div>
                <div style={{fontSize:15,fontWeight:700,marginBottom:8}}>{b.t}</div>
                <div style={{fontSize:13,color:MT,lineHeight:1.7}}>{b.d}</div>
              </div>
            ))}
          </div>
        </div>
 
        <div style={{padding:"60px 20px",background:DK}}>
          {ey("Our Flagship Product")}
          {H2("Premium","Charcoal")}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:2}}>
            {PRODS.filter(p=>p.cat==="charcoal").map(p=><DisplayCard key={p.id} p={p}/>)}
          </div>
          <div style={{textAlign:"center",marginTop:28}}><button style={btnO} onClick={()=>setPage("products")}>See All Products →</button></div>
        </div>
 
        <div style={{padding:"60px 20px"}}>
          {ey("What Partners Say")}
          {H2("Real","Reviews")}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:2,marginBottom:24}}>
            {reviews.slice(0,3).map(r=>(
              <div key={r.id} style={{background:CD,border:`1px solid ${BR}`,padding:"22px 18px",borderRadius:3}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div><div style={{fontSize:14,fontWeight:700}}>{r.res}</div><div style={{fontSize:11,color:MT}}>{r.city} · {r.date}</div></div>
                  <div style={{background:"rgba(200,168,75,0.1)",border:"1px solid rgba(200,168,75,0.3)",borderRadius:20,padding:"2px 8px",fontSize:12,fontWeight:700,color:G}}>{avgR(r)}★</div>
                </div>
                <p style={{fontSize:12,color:MT,lineHeight:1.7,marginBottom:12,fontStyle:"italic"}}>"{r.text}"</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                  {[{l:"Service",v:r.service},{l:"Quality",v:r.quality},{l:"Delivery",v:r.delivery},{l:"Price",v:r.price}].map(s=>(
                    <div key={s.l} style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{fontSize:10,color:MT}}>{s.l}</span><Stars val={s.v} size={11}/>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center"}}><button style={btnO} onClick={()=>setPage("reviews")}>See All Reviews →</button></div>
        </div>
 
        <div style={{padding:"60px 20px",background:DK}}>
          {ey("Partner Benefits")}
          {H2("Rewards for","Partners")}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:2}}>
            {[{i:"🎁",t:"5% First Order"},{i:"⭐",t:"5% Loyal (4th+)"},{i:"💷",t:"1.5% on £400+"},{i:"🤝",t:"£25 Referral"},{i:"🏆",t:"Points Rewards"},{i:"💳",t:"£350 Credit"},{i:"🚗",t:"Free Delivery £60+"},{i:"⚡",t:"Urgent Delivery"}].map(b=>(
              <div key={b.t} style={{background:CD,padding:"20px 16px",border:`1px solid ${BR}`,textAlign:"center"}}>
                <div style={{fontSize:28,marginBottom:10}}>{b.i}</div>
                <div style={{fontSize:13,fontWeight:700}}>{b.t}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:32}}><button style={btnG} onClick={()=>setPage("register")}>Register Free →</button></div>
        </div>
      </>}
 
      {/* PRODUCTS */}
      {page==="products"&&<div style={{padding:"60px 20px",background:DK}}>
        {ey("What We Offer")}
        {H2("Our","Products")}
        {[{id:"charcoal",l:"🪨 Charcoal & Wood",flagship:true},{id:"safety",l:"🧤 Safety & Hygiene"},{id:"packaging",l:"📦 Packaging"},{id:"food",l:"🍋 Food & Beverages"}].map(cat=>(
          <div key={cat.id} style={{marginBottom:48}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
              <div style={{width:4,height:30,background:cat.flagship?G:"rgba(200,168,75,0.35)",borderRadius:2}}/>
              <div style={{fontSize:19,fontWeight:700}}>{cat.l}</div>
              {cat.flagship&&<div style={{padding:"3px 10px",background:"rgba(200,168,75,0.1)",border:"1px solid rgba(200,168,75,0.3)",borderRadius:20,fontSize:10,color:G,letterSpacing:1,textTransform:"uppercase"}}>Most Popular</div>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:2}}>
              {PRODS.filter(p=>p.cat===cat.id).map(p=><DisplayCard key={p.id} p={p}/>)}
            </div>
          </div>
        ))}
        <div style={{textAlign:"center",padding:"28px",background:CD,border:`1px solid ${BR}`,borderRadius:8}}>
          <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>Ready to order?</div>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:16}}>
            <button style={btnG} onClick={()=>setPage("register")}>Register Free →</button>
            <button style={btnO} onClick={()=>{setPage("order");setOrdStep(0);}}>Already a Partner? →</button>
          </div>
        </div>
      </div>}
 
      {/* REVIEWS */}
      {page==="reviews"&&<div style={{padding:"60px 20px"}}>
        {ey("Partner Reviews")}
        {H2("What They","Say")}
        <div style={{background:CD,border:`1px solid ${BR}`,borderRadius:8,padding:"20px",marginBottom:28,display:"flex",gap:20,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:40,fontWeight:700,color:G}}>{(reviews.reduce((s,r)=>s+avgR(r),0)/reviews.length).toFixed(1)}</div>
            <Stars val={5} size={18}/>
            <div style={{fontSize:11,color:MT,marginTop:4}}>{reviews.length} reviews</div>
          </div>
          <div style={{flex:1,minWidth:180}}>
            {["quality","service","delivery","price"].map(k=>{const avg=reviews.reduce((s,r)=>s+r[k],0)/reviews.length;return(
              <div key={k} style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
                <span style={{fontSize:11,color:MT,width:56,textTransform:"capitalize"}}>{k}</span>
                <div style={{flex:1,height:5,background:BR,borderRadius:3,overflow:"hidden"}}><div style={{width:(avg/5*100)+"%",height:"100%",background:G,borderRadius:3}}/></div>
                <span style={{fontSize:11,color:G,fontWeight:700,width:24}}>{avg.toFixed(1)}</span>
              </div>
            );})}
          </div>
        </div>
        {!showRForm&&<button style={{...btnO,padding:"10px 20px",fontSize:11,marginBottom:24}} onClick={()=>setShowRForm(true)}>+ Write a Review</button>}
        {showRForm&&<div style={{background:CD,border:`1px solid ${BR}`,borderRadius:8,padding:"24px 20px",marginBottom:28}}>
          <div style={{fontSize:16,fontWeight:700,marginBottom:18}}>Write a Review</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><label style={lbl}>Restaurant Name *</label><input style={inp} value={newRev.res} onChange={e=>setNewRev({...newRev,res:e.target.value})} placeholder="Your restaurant name"/></div>
            <div><label style={lbl}>City</label><input style={inp} value={newRev.city} onChange={e=>setNewRev({...newRev,city:e.target.value})} placeholder="e.g. Newcastle"/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
            {["service","quality","delivery","price"].map(k=>(
              <div key={k}><label style={lbl}>{k.charAt(0).toUpperCase()+k.slice(1)}</label>
                <div style={{display:"flex",gap:4}}>
                  {[1,2,3,4,5].map(n=><button key={n} onClick={()=>setNewRev({...newRev,[k]:n})} style={{width:30,height:30,background:newRev[k]>=n?"rgba(200,168,75,0.15)":DK,border:`1px solid ${newRev[k]>=n?G:BR}`,borderRadius:4,cursor:"pointer",color:newRev[k]>=n?G:MT,fontSize:14,fontFamily:"inherit"}}>★</button>)}
                </div>
              </div>
            ))}
          </div>
          <label style={lbl}>Your Comment *</label>
          <textarea style={{...inp,minHeight:80,resize:"vertical"}} value={newRev.text} onChange={e=>setNewRev({...newRev,text:e.target.value})} placeholder="Share your experience..."/>
          <div style={{display:"flex",gap:10}}>
            <button style={{...btnG,flex:1,padding:"11px"}} onClick={submitReview}>Submit Review</button>
            <button onClick={()=>setShowRForm(false)} style={{padding:"11px 18px",background:"transparent",border:`1px solid ${BR}`,borderRadius:3,color:MT,cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>Cancel</button>
          </div>
        </div>}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:2}}>
          {reviews.map(r=>(
            <div key={r.id} style={{background:CD,border:`1px solid ${BR}`,padding:"20px 18px",borderRadius:3}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div><div style={{fontSize:14,fontWeight:700}}>{r.res}</div><div style={{fontSize:11,color:MT}}>{r.city} · {r.date}</div></div>
                <div style={{background:"rgba(200,168,75,0.1)",border:"1px solid rgba(200,168,75,0.3)",borderRadius:20,padding:"2px 8px",fontSize:12,fontWeight:700,color:G}}>{avgR(r)}★</div>
              </div>
              <p style={{fontSize:12,color:MT,lineHeight:1.7,marginBottom:12,fontStyle:"italic"}}>"{r.text}"</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,borderTop:`1px solid ${BR}`,paddingTop:10}}>
                {[{l:"Service",v:r.service},{l:"Quality",v:r.quality},{l:"Delivery",v:r.delivery},{l:"Price",v:r.price}].map(s=>(
                  <div key={s.l} style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span style={{fontSize:10,color:MT}}>{s.l}</span><Stars val={s.v} size={11}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>}
 
      {/* SERVICES */}
      {page==="services"&&<div style={{padding:"60px 20px"}}>
        {ey("What We Do")}
        {H2("Our","Services")}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:2}}>
          {SVCS.map(sv=>(
            <div key={sv.n} style={{padding:"34px 26px",border:`1px solid ${BR}`,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:14,right:20,fontSize:60,color:"rgba(200,168,75,0.06)",fontWeight:700,lineHeight:1}}>{sv.n}</div>
              <div style={{fontSize:28,marginBottom:16}}>{sv.i}</div>
              <div style={{fontSize:19,fontWeight:700,marginBottom:9}}>{sv.t}</div>
              <div style={{fontSize:13,color:MT,lineHeight:1.7,marginBottom:18}}>{sv.d}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{sv.tags.map(t=><span key={t} style={{padding:"2px 7px",border:"1px solid rgba(200,168,75,0.2)",fontSize:9,letterSpacing:1,textTransform:"uppercase",color:G,borderRadius:2}}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>}
 
      {/* REGISTER */}
      {page==="register"&&<div style={{padding:"60px 20px"}}>
        {ey("Partner Programme")}
        {H2("Register as a","Partner")}
        <div style={{background:CD,border:`1px solid ${BR}`,borderRadius:6,padding:"32px 24px",maxWidth:520}}>
          <div style={{fontSize:22,fontWeight:700,marginBottom:6}}>Create Your Account</div>
          <div style={{fontSize:12,color:MT,marginBottom:24}}>Free registration — 2 minutes</div>
          {rErr&&<div style={{color:"#e74c3c",fontSize:12,marginBottom:14}}>{rErr}</div>}
          <label style={lbl}>Restaurant Name *</label>
          <input style={inp} placeholder="e.g. Al Barakah Grill" value={reg.restaurant} onChange={e=>setReg({...reg,restaurant:e.target.value})}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><label style={lbl}>Contact Name *</label><input style={inp} placeholder="Full name" value={reg.name} onChange={e=>setReg({...reg,name:e.target.value})}/></div>
            <div><label style={lbl}>Phone *</label><input style={inp} placeholder="+44 ..." value={reg.phone} onChange={e=>setReg({...reg,phone:e.target.value})}/></div>
          </div>
          <label style={lbl}>Email *</label>
          <input style={inp} type="email" placeholder="your@restaurant.com" value={reg.email} onChange={e=>setReg({...reg,email:e.target.value})}/>
          <label style={lbl}>Delivery Address *</label>
          <input style={inp} placeholder="Full delivery address" value={reg.address} onChange={e=>setReg({...reg,address:e.target.value})}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>
              <label style={lbl}>City *</label>
              <select style={{...inp,appearance:"none"}} value={reg.city} onChange={e=>setReg({...reg,city:e.target.value})}>
                <option value="">Select city...</option>
                {Object.keys(DS).map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><label style={lbl}>Postcode</label><input style={inp} placeholder="NE1 4ST" value={reg.postcode} onChange={e=>setReg({...reg,postcode:e.target.value})}/></div>
          </div>
          {reg.city&&<div style={{fontSize:12,color:G,marginBottom:14}}>🚗 Delivery day: <strong>{DS[reg.city]}</strong></div>}
          <label style={lbl}>Referred By — optional</label>
          <input style={inp} placeholder="Partner referral code" value={reg.ref} onChange={e=>setReg({...reg,ref:e.target.value})}/>
          <button style={{width:"100%",padding:"13px",background:G,border:"none",color:"#0c0b08",fontWeight:700,fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,marginTop:4,fontFamily:"inherit"}} onClick={doReg}>Register and Get My Partner ID</button>
        </div>
      </div>}
 
      {/* ORDER */}
      {page==="order"&&<div style={{padding:"60px 20px"}}>
        {ey("Place an Order")}
        {H2("Order","Online")}
 
        {ordStep===0&&<div style={{maxWidth:480}}>
          <div style={{background:CD,border:`1px solid ${BR}`,borderRadius:8,padding:"28px 24px"}}>
            <div style={{fontSize:16,fontWeight:700,marginBottom:6}}>Find Your Account</div>
            <div style={{fontSize:12,color:MT,marginBottom:20}}>Enter your phone or restaurant name.</div>
            <div style={{display:"flex",gap:8,marginBottom:18}}>
              {["phone","name"].map(t=>(
                <button key={t} onClick={()=>{setSearchType(t);setSearchVal("");setSearchErr("");}} style={{flex:1,padding:"10px",background:searchType===t?"rgba(200,168,75,0.1)":DK,border:`1px solid ${searchType===t?G:BR}`,borderRadius:4,color:searchType===t?G:MT,fontSize:12,cursor:"pointer",fontWeight:searchType===t?700:400,fontFamily:"inherit"}}>
                  {t==="phone"?"📱 Phone":"🏪 Restaurant Name"}
                </button>
              ))}
            </div>
            <input style={inp} placeholder={searchType==="phone"?"e.g. 07700900001":"e.g. Al Barakah Grill"} value={searchVal} onChange={e=>{setSearchVal(e.target.value);setSearchErr("");}} onKeyDown={e=>e.key==="Enter"&&searchPartner()}/>
            {searchErr&&<div style={{color:"#e74c3c",fontSize:12,marginBottom:14}}>{searchErr}</div>}
            <button style={{width:"100%",padding:"12px",background:G,border:"none",color:"#0c0b08",fontWeight:700,fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,fontFamily:"inherit"}} onClick={searchPartner}>Find My Account →</button>
            <div style={{textAlign:"center",marginTop:14,fontSize:12,color:MT}}>New? <button onClick={()=>setPage("register")} style={{background:"none",border:"none",color:G,cursor:"pointer",fontSize:12,textDecoration:"underline",fontFamily:"inherit"}}>Register free →</button></div>
          </div>
        </div>}
 
        {ordStep===1&&foundP&&<div style={{maxWidth:480}}>
          <div style={{background:CD,border:"1px solid rgba(200,168,75,0.3)",borderRadius:8,padding:"28px 24px"}}>
            <div style={{fontSize:14,color:MT,marginBottom:14}}>Is this you?</div>
            <div style={{background:DK,borderRadius:6,padding:"16px",marginBottom:18}}>
              <div style={{fontSize:18,fontWeight:700,marginBottom:3}}>{foundP.res}</div>
              <div style={{fontSize:13,color:MT,marginBottom:2}}>{foundP.name} · {foundP.city}</div>
              <div style={{fontSize:12,color:G,fontWeight:700,marginTop:6}}>Partner ID: {foundP.id}</div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button style={{flex:1,padding:"12px",background:G,border:"none",color:"#0c0b08",fontWeight:700,fontSize:12,cursor:"pointer",borderRadius:4,fontFamily:"inherit"}} onClick={()=>setOrdStep(2)}>✅ Yes, that's me</button>
              <button style={{flex:1,padding:"12px",background:"transparent",border:`1px solid ${BR}`,color:MT,fontSize:12,cursor:"pointer",borderRadius:4,fontFamily:"inherit"}} onClick={()=>{setOrdStep(0);setSearchVal("");setFoundP(null);}}>← Try again</button>
            </div>
          </div>
        </div>}
 
        {ordStep===2&&foundP&&<div style={{maxWidth:480}}>
          <div style={{background:CD,border:`1px solid ${BR}`,borderRadius:8,padding:"28px 24px"}}>
            <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>Choose Delivery Type</div>
            <div style={{background:"rgba(200,168,75,0.08)",border:"1px solid rgba(200,168,75,0.2)",borderRadius:6,padding:"14px",marginBottom:18,display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:24}}>🚗</span>
              <div><div style={{fontSize:14,fontWeight:700}}>{DS[foundP.city]||"To be arranged"}</div><div style={{fontSize:11,color:MT}}>{foundP.city} — scheduled delivery day</div></div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <button style={{padding:"16px",background:DK,border:`1px solid ${BR}`,borderRadius:6,color:"#f0ece0",fontSize:13,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12,fontFamily:"inherit"}} onClick={()=>{setIsUrgent(false);setOrdStep(3);}}>
                <span style={{fontSize:24}}>📅</span>
                <div><div style={{fontWeight:700,marginBottom:2}}>Standard Delivery</div><div style={{fontSize:11,color:MT}}>Next scheduled day · Free over £60, £2 under</div></div>
              </button>
              <button style={{padding:"16px",background:"rgba(192,57,43,0.06)",border:"1px solid rgba(192,57,43,0.2)",borderRadius:6,color:"#f0ece0",fontSize:13,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12,fontFamily:"inherit"}} onClick={()=>{setIsUrgent(true);setOrdStep(3);}}>
                <span style={{fontSize:24}}>🚨</span>
                <div><div style={{fontWeight:700,marginBottom:2,color:"#ec7063"}}>Urgent Delivery</div><div style={{fontSize:11,color:MT}}>ASAP · Cost depends on area · We'll call to confirm</div></div>
              </button>
            </div>
          </div>
        </div>}
 
        {ordStep===3&&foundP&&<>
          {isUrgent&&<div style={{background:"rgba(192,57,43,0.08)",border:"1px solid rgba(192,57,43,0.2)",borderRadius:6,padding:"12px 16px",marginBottom:18,fontSize:12,color:"#ec7063",display:"flex",gap:10,alignItems:"center"}}><span>🚨</span><span><strong>Urgent</strong> — pending approval. We'll call to confirm cost.</span></div>}
          {pts>0&&<div style={{background:"rgba(200,168,75,0.08)",border:"1px solid rgba(200,168,75,0.2)",borderRadius:6,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
            <span style={{fontSize:26}}>🏆</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:3}}>Points: <span style={{color:G}}>{pts}</span> / {GOAL}</div>
              <div style={{height:5,background:BR,borderRadius:3,overflow:"hidden"}}><div style={{width:pPct+"%",height:"100%",background:`linear-gradient(to right,${G},#e2c06a)`,borderRadius:3}}/></div>
            </div>
          </div>}
 
          <div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:G,marginBottom:10}}>🪨 Charcoal & Wood</div>
          {PRODS.filter(p=>p.cat==="charcoal"&&!p.free).map(p=><OrdItem key={p.id} p={p} qty={qty[p.id]||0} vr={vr[p.id]} onQ={chQ} onV={(id,v)=>setVr(pv=>({...pv,[id]:v}))}/>)}
 
          <div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:G,marginBottom:10,marginTop:18}}>🧤 Safety & Hygiene</div>
          <div style={{background:CD,border:`1px solid ${BR}`,padding:"14px 16px",borderRadius:3,marginBottom:6}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:2}}>Rap Gloves <span style={{fontSize:10,color:MT}}>— Mix sizes, £3.50/pack</span></div>
            <div style={{background:DK,borderRadius:6,padding:"12px",marginTop:10,marginBottom:10}}>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
                {SZ.map(sz=><button key={sz} onClick={()=>setGloveSz(sz)} style={{padding:"4px 10px",background:gloveSz===sz?"rgba(200,168,75,0.1)":"transparent",border:`1px solid ${gloveSz===sz?G:BR}`,borderRadius:4,fontSize:12,cursor:"pointer",color:gloveSz===sz?G:MT,fontFamily:"inherit"}}>{sz}</button>)}
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <button onClick={()=>setGloveQty(q=>Math.max(1,q-1))} style={{width:28,height:28,background:"#2a2920",border:`1px solid ${BR}`,borderRadius:3,color:"#f0ece0",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                <div style={{fontSize:17,minWidth:22,textAlign:"center",fontWeight:700}}>{gloveQty}</div>
                <button onClick={()=>setGloveQty(q=>q+1)} style={{width:28,height:28,background:"#2a2920",border:`1px solid ${BR}`,borderRadius:3,color:"#f0ece0",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                <button onClick={addGlove} style={{flex:1,padding:"7px",background:G,border:"none",borderRadius:4,color:"#0c0b08",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>Add {gloveQty}× {gloveSz} →</button>
              </div>
            </div>
            {gloveItems.length>0&&<div style={{display:"flex",flexDirection:"column",gap:5}}>
              {gloveItems.map(g=><div key={g.size} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(200,168,75,0.05)",border:"1px solid rgba(200,168,75,0.15)",borderRadius:4,padding:"7px 10px"}}>
                <span style={{fontSize:12,color:G,fontWeight:700}}>Size {g.size}</span>
                <span style={{fontSize:12,color:MT,flex:1}}>×{g.qty} — £{(g.qty*3.50).toFixed(2)}</span>
                <button onClick={()=>rmGlove(g.size)} style={{background:"none",border:"none",color:"#ec7063",cursor:"pointer",fontSize:15}}>✕</button>
              </div>)}
            </div>}
          </div>
          {PRODS.filter(p=>p.cat==="safety"&&!p.isGlove).map(p=><OrdItem key={p.id} p={p} qty={qty[p.id]||0} vr={vr[p.id]} onQ={chQ} onV={(id,v)=>setVr(pv=>({...pv,[id]:v}))}/>)}
 
          <div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:G,marginBottom:10,marginTop:18}}>📦 Packaging</div>
          {PRODS.filter(p=>p.cat==="packaging").map(p=><OrdItem key={p.id} p={p} qty={qty[p.id]||0} vr={vr[p.id]} onQ={chQ} onV={(id,v)=>setVr(pv=>({...pv,[id]:v}))}/>)}
 
          <div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:G,marginBottom:10,marginTop:18}}>🍋 Food & Beverages</div>
          {PRODS.filter(p=>p.cat==="food").map(p=><OrdItem key={p.id} p={p} qty={qty[p.id]||0} vr={vr[p.id]} onQ={chQ} onV={(id,v)=>setVr(pv=>({...pv,[id]:v}))}/>)}
 
          <div style={{background:CD,border:`1px solid ${BR}`,borderRadius:6,padding:"24px 20px",marginTop:24}}>
            <div style={{fontSize:18,fontWeight:700,marginBottom:18}}>Order Summary</div>
            {!hasItems?<div style={{fontSize:12,color:MT,marginBottom:18}}>No items selected yet</div>:<>
              {regSel.map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:10,color:MT}}><span>{p.e} {p.n}{vr[p.id]?` (${vr[p.id]})`:""} ×{qty[p.id]}</span><span>£{(p.p*(qty[p.id]||0)).toFixed(2)}</span></div>)}
              {gloveItems.map(g=><div key={g.size} style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:10,color:MT}}><span>🧤 Gloves Size {g.size} ×{g.qty}</span><span>£{(g.qty*3.50).toFixed(2)}</span></div>)}
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:MT,borderTop:`1px solid ${BR}`,paddingTop:10,marginBottom:8}}><span>Subtotal</span><span>£{sub.toFixed(2)}</span></div>
              {ds.map(d=><div key={d.l} style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6,color:GRN}}><span>✓ {d.l}</span><span>-£{d.a.toFixed(2)}</span></div>)}
              {!isUrgent&&delivCharge>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6,color:MT}}><span>🚗 Delivery</span><span>£{delivCharge.toFixed(2)}</span></div>}
              {!isUrgent&&delivCharge===0&&sub>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6,color:GRN}}><span>✓ Free delivery</span><span>£0.00</span></div>}
              {isUrgent&&<div style={{fontSize:12,color:"#ec7063",marginBottom:8}}>🚨 Urgent delivery cost: to be confirmed</div>}
              <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:700,paddingTop:12,marginTop:6,borderTop:`1px solid ${BR}`}}><span>Total</span><span style={{color:G}}>£{total.toFixed(2)}{isUrgent?"+":""}</span></div>
              {!isUrgent&&<div style={{fontSize:12,color:G,marginTop:8}}>🏆 This order earns {ePts} points</div>}
            </>}
            <label style={{...lbl,marginTop:16}}>Referral / Coupon Code</label>
            <input style={inp} placeholder="Enter code if you have one" value={refCode} onChange={e=>setRefCode(e.target.value)}/>
            {!isUrgent&&<>
              <label style={lbl}>Payment Method *</label>
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                <button onClick={()=>setPay("bank")} style={{flex:1,padding:"10px",background:payMethod==="bank"?"rgba(200,168,75,0.08)":DK,border:`1px solid ${payMethod==="bank"?G:BR}`,borderRadius:3,color:payMethod==="bank"?G:MT,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>🏦 Bank Transfer</button>
                <button onClick={()=>setPay("cash")} style={{flex:1,padding:"10px",background:payMethod==="cash"?"rgba(200,168,75,0.08)":DK,border:`1px solid ${payMethod==="cash"?G:BR}`,borderRadius:3,color:payMethod==="cash"?G:MT,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>💵 Cash on Delivery</button>
              </div>
            </>}
            <label style={lbl}>Delivery Notes</label>
            <input style={inp} placeholder="Any special instructions..." value={ordNotes} onChange={e=>setOrdNotes(e.target.value)}/>
            {isUrgent
              ?<button onClick={doOrder} style={{width:"100%",padding:"13px",background:RD,border:"none",color:"white",fontWeight:700,fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,fontFamily:"inherit"}}>🚨 Send Urgent Request</button>
              :<button onClick={doOrder} style={{width:"100%",padding:"13px",background:hasItems&&payMethod?G:"rgba(200,168,75,0.3)",border:"none",color:"#0c0b08",fontWeight:700,fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:hasItems&&payMethod?"pointer":"not-allowed",borderRadius:3,fontFamily:"inherit"}}>Confirm Order and Get Invoice</button>
            }
          </div>
        </>}
      </div>}
 
      {/* FOOTER */}
      <div style={{background:DK,borderTop:`1px solid ${BR}`,padding:"36px 20px 24px"}}>
        <div style={{fontSize:20,fontWeight:700,letterSpacing:3,marginBottom:8}}>PRO<span style={{color:G}}>VIDA</span></div>
        <div style={{fontSize:12,color:MT,marginBottom:16}}>Premium restaurant supply and services · UK</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
          {["home","products","services","reviews","register","order"].map(p=>(
            <button key={p} onClick={()=>{setPage(p);if(p==="order"){setOrdStep(0);setSearchVal("");setFoundP(null);}}} style={{background:"none",border:"none",color:MT,fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>{p}</button>
          ))}
        </div>
        <button onClick={()=>setMode(null)} style={{background:"none",border:"none",color:MT,fontSize:11,cursor:"pointer",textDecoration:"underline",marginBottom:14,fontFamily:"inherit"}}>← Switch to Home Use</button>
        <div style={{fontSize:10,color:MT,borderTop:`1px solid ${BR}`,paddingTop:14}}>© 2025 PROVIDA SUPPLY</div>
      </div>
 
      {/* WHATSAPP */}
      <button onClick={()=>window.open(`https://wa.me/${WA}?text=Hi%20PROVIDA`,"_blank")} style={{position:"fixed",bottom:24,left:20,zIndex:300,width:52,height:52,background:"#25D366",borderRadius:"50%",border:"none",fontSize:26,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,0.4)"}}>💬</button>
 
      {/* AI CHAT */}
      <button onClick={()=>setChatOpen(o=>!o)} style={{position:"fixed",bottom:24,right:20,zIndex:300,width:52,height:52,background:G,borderRadius:"50%",border:"none",fontSize:22,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 20px rgba(200,168,75,0.4)`}}>{chatOpen?"✕":"🤖"}</button>
      {chatOpen&&<div style={{position:"fixed",bottom:84,right:20,zIndex:300,width:300,maxHeight:440,background:CD,border:"1px solid rgba(200,168,75,0.3)",borderRadius:12,display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>
        <div style={{padding:"12px 14px",background:"rgba(200,168,75,0.1)",borderBottom:`1px solid ${BR}`,display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:GRN,boxShadow:`0 0 6px ${GRN}`}}/>
          <span style={{fontSize:12,fontWeight:700,color:GRN}}>PROVIDA Assistant</span>
        </div>
        <div ref={chatRef} style={{flex:1,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:10,maxHeight:300}}>
          {chat.map((m,i)=><div key={i} style={{padding:"9px 12px",borderRadius:12,fontSize:12,lineHeight:1.6,maxWidth:"85%",...(m.r==="ai"?{background:DK,border:`1px solid ${BR}`,borderTopLeftRadius:3}:{background:G,color:"#0c0b08",borderTopRightRadius:3,alignSelf:"flex-end"})}}>
            {m.t.split("\n").map((l,j)=><div key={j}>{l||<br/>}</div>)}
          </div>)}
          {chatLoad&&<div style={{background:DK,border:`1px solid ${BR}`,padding:"9px 12px",borderRadius:12,fontSize:12,color:MT}}>Typing...</div>}
        </div>
        <div style={{padding:"10px 12px",borderTop:`1px solid ${BR}`,display:"flex",gap:8}}>
          <input style={{flex:1,background:DK,border:`1px solid ${BR}`,borderRadius:8,padding:"8px 12px",fontSize:12,color:"#f0ece0",outline:"none",fontFamily:"inherit"}} placeholder="Ask anything..." value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendAi()}/>
          <button onClick={sendAi} style={{width:34,height:34,background:G,border:"none",borderRadius:8,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
        </div>
      </div>}
 
      {/* MODALS */}
      {modal==="reg"&&<div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(12,11,8,0.93)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div onClick={e=>e.stopPropagation()} style={{background:CD,border:"1px solid rgba(200,168,75,0.3)",padding:"40px 28px",maxWidth:400,width:"100%",textAlign:"center",borderRadius:6}}>
          <div style={{fontSize:48,marginBottom:16}}>🎉</div>
          <div style={{fontSize:26,fontWeight:700,marginBottom:10}}>Welcome Aboard!</div>
          <div style={{display:"inline-block",padding:"8px 20px",background:"rgba(200,168,75,0.1)",border:"1px solid rgba(200,168,75,0.4)",fontSize:22,letterSpacing:4,color:G,margin:"10px 0",borderRadius:3}}>{pid}</div>
          <div style={{background:"rgba(200,168,75,0.06)",border:"1px solid rgba(200,168,75,0.2)",borderRadius:6,padding:"12px 16px",margin:"12px 0",textAlign:"left"}}>
            <div style={{fontSize:12,fontWeight:700,marginBottom:5}}>🎫 Your Referral Code</div>
            <div style={{fontFamily:"monospace",fontSize:18,letterSpacing:4,color:G,background:DK,padding:"7px 12px",borderRadius:4,display:"inline-block",marginBottom:6}}>{rCode}</div>
            <div style={{fontSize:11,color:MT}}>Share it — earn <strong style={{color:G}}>£25</strong> per new restaurant!</div>
          </div>
          {reg.city&&<div style={{fontSize:12,color:G,marginBottom:10}}>🚗 Delivery: <strong>{DS[reg.city]}</strong></div>}
          <p style={{fontSize:12,color:MT,marginBottom:18}}>Welcome message sent to your WhatsApp!</p>
          <button onClick={()=>{setModal(null);setPage("order");setOrdStep(0);}} style={{width:"100%",padding:"12px",background:G,border:"none",color:"#0c0b08",fontWeight:700,fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,fontFamily:"inherit"}}>Start Ordering →</button>
        </div>
      </div>}
 
      {modal==="ord"&&<div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(12,11,8,0.93)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div onClick={e=>e.stopPropagation()} style={{background:CD,border:"1px solid rgba(200,168,75,0.3)",padding:"40px 28px",maxWidth:400,width:"100%",textAlign:"center",borderRadius:6}}>
          <div style={{fontSize:48,marginBottom:16}}>✅</div>
          <div style={{fontSize:26,fontWeight:700,marginBottom:10}}>Order Confirmed!</div>
          <div style={{display:"inline-block",padding:"8px 20px",background:"rgba(200,168,75,0.1)",border:"1px solid rgba(200,168,75,0.4)",fontSize:18,letterSpacing:4,color:G,margin:"10px 0",borderRadius:3}}>{oid}</div>
          <div style={{fontSize:13,color:G,margin:"10px 0",fontWeight:700}}>+{ordPts} points! 🏆</div>
          {pts>=GOAL&&<div style={{fontSize:12,color:GRN,marginBottom:10,fontWeight:700}}>🎁 500 points — reward coming!</div>}
          <p style={{fontSize:12,color:MT,marginBottom:20}}>Invoice sent to your email.<br/>Payment: <strong>{payMethod==="bank"?"Bank Transfer":"Cash on Delivery"}</strong></p>
          <button onClick={()=>setModal(null)} style={{width:"100%",padding:"12px",background:G,border:"none",color:"#0c0b08",fontWeight:700,fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,fontFamily:"inherit"}}>Done</button>
        </div>
      </div>}
 
      {modal==="urgent"&&<div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(12,11,8,0.93)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div onClick={e=>e.stopPropagation()} style={{background:CD,border:"1px solid rgba(192,57,43,0.4)",padding:"40px 28px",maxWidth:400,width:"100%",textAlign:"center",borderRadius:6}}>
          <div style={{fontSize:48,marginBottom:16}}>🚨</div>
          <div style={{fontSize:26,fontWeight:700,marginBottom:10}}>Urgent Request Sent!</div>
          <div style={{display:"inline-block",padding:"8px 20px",background:"rgba(192,57,43,0.1)",border:"1px solid rgba(192,57,43,0.4)",fontSize:18,letterSpacing:4,color:"#ec7063",margin:"10px 0",borderRadius:3}}>{oid}</div>
          <div style={{background:"rgba(192,57,43,0.06)",border:"1px solid rgba(192,57,43,0.15)",borderRadius:6,padding:"14px",margin:"14px 0",textAlign:"left",fontSize:12,color:MT,lineHeight:1.7}}>
            <strong style={{color:"#ec7063",display:"block",marginBottom:6}}>⏳ Pending Approval</strong>
            We'll call you shortly to confirm delivery timing, cost, and payment.
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>window.open(`https://wa.me/${WA}?text=Urgent%20order%20${oid}`,"_blank")} style={{flex:1,padding:"11px",background:"#25D366",border:"none",color:"white",fontWeight:700,fontSize:11,cursor:"pointer",borderRadius:3,fontFamily:"inherit"}}>💬 WhatsApp</button>
            <button onClick={()=>setModal(null)} style={{flex:1,padding:"11px",background:G,border:"none",color:"#0c0b08",fontWeight:700,fontSize:11,cursor:"pointer",borderRadius:3,fontFamily:"inherit"}}>Done</button>
          </div>
        </div>
      </div>}
 
    </div>
  );
}
 
import React from "react";
