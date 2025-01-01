const baseURL="https://v6.exchangerate-api.com/v6/99c356bbf11021d232ae3f0f/pair/inr/usd/500";

const selector=document.querySelectorAll(".selector select ");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg=document.querySelector(".msg1")

for(let select of selector){
    for( currCode in countryList){
        
        let newOption=document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if (select.name==="to" && currCode==="INR"){
            newOption.selected="selected1";
        }
         select.append(newOption);
        
    }
    select.addEventListener("change",(evt)=>{
     updateFlag(evt.target)
    })
}

const updateFlag=(a)=>{
    let currCode=a.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=a.parentElement.querySelector("img");
    img.src=newsrc;

}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount= document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1)
    {
        amtVal=1;
        amount.value="1";
    }
    console.log(fromCurr,toCurr);
     const URL=`https://v6.exchangerate-api.com/v6/99c356bbf11021d232ae3f0f/pair/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}/${amtVal}`;
     let response=await fetch(URL);
     let data=await response.json();
     let rate=data.conversion_result;
   console.log(rate);
   
   msg.innerText=`${amtVal} ${fromCurr.value}= ${rate}${toCurr.value}`
})
