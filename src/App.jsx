
import './App.css'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
function Kotak({value, onKotakClick}) {
  
   return (

   <button className='kotak' onClick={onKotakClick}>{value}</button>

   )
}

// eslint-disable-next-line react/prop-types
function Papan({giliran, nilaiKotak, handle}) {

  // const [nilaiKotak, setNilaiKotak] = useState(Array(9).fill(''))
  // const [next, setNext] = useState(true)

  function handleClick(i) {
    if(nilaiKotak[i] || role(nilaiKotak) ) return;
    // if(nilaiKotak[i]) {
    //   return
    // }

    // eslint-disable-next-line react/prop-types
    const nilaiKotakBaru = nilaiKotak.slice()
    nilaiKotakBaru[i] = (giliran ? 'X' : 'O')
    // if(next) {
    //   nilaiKotakBaru[i] = 'X'
    // } else {
    //   nilaiKotakBaru[i] = 'O'
    // }
    
    // setNilaiKotak(nilaiKotakBaru)
    // setNext(!next)
  handle(nilaiKotakBaru)
  }
  
  const pemain = role(nilaiKotak)
  let status = ''
  if(pemain) {
    status = 'Pemenang : ' + pemain
  } else {
    status = 'Pemain : ' + (giliran ? 'X' : 'O')
  }
  
  return (
    
    <>
    <div>Status : {status}</div>
    <div className='papan'>
    <Kotak value={nilaiKotak[0]} onKotakClick={() => handleClick(0)}/>
    <Kotak value={nilaiKotak[1]} onKotakClick={() => handleClick(1)}/>
    <Kotak value={nilaiKotak[2]} onKotakClick={() => handleClick(2)}/>
    <Kotak value={nilaiKotak[3]} onKotakClick={() => handleClick(3)}/>
    <Kotak value={nilaiKotak[4]} onKotakClick={() => handleClick(4)}/>
    <Kotak value={nilaiKotak[5]} onKotakClick={() => handleClick(5)}/>
    <Kotak value={nilaiKotak[6]} onKotakClick={() => handleClick(6)}/>
    <Kotak value={nilaiKotak[7]} onKotakClick={() => handleClick(7)}/>
    <Kotak value={nilaiKotak[8]} onKotakClick={() => handleClick(8)}/>
    </div>
    </>
  )
}

export default function Permainan() {
  
  // const [next, setNext] = useState(true)
  const [isihistory, setIsihistory] = useState([Array(9).fill('')])
  const [mundur, setMundur] = useState(0)
  const next = mundur % 2 === 0
  const keadaanterakhir = isihistory[mundur]
 // const keadaanterakhir = isihistory[isihistory.length - 1]

  function jumpto(index) {
    setMundur(index)
    // setNext(mundur % 2 === 0)
  }
  
  function handleMain(nilaiKotakBaru) {
    const historybaru = [...isihistory.slice(0, mundur + 1), nilaiKotakBaru]
    //setIsihistory([...isihistory, nilaiKotakBaru])
    setIsihistory(historybaru)
    setMundur(historybaru.length - 1)
    // setNext(!next)
  }
  
  const pindah = isihistory.map((item, index) => {
    let tombol = ''
    if(index > 0) {
      tombol = 'pindah ke #' + index
    } else {
      tombol = 'reset'
    }
  
    return (
      <li key={index}>
        <button onClick={() => jumpto(index)}>{tombol}</button>
      </li>
    )
  })
  
  return (
    <>
    <div className="permainan">
    <Papan giliran={next} nilaiKotak={keadaanterakhir} handle={handleMain}/>
    <ol>
      {pindah}
    </ol>
    </div>
    </>
  )
}


//logika untuk menghentika permainan saat sudah ada pemenangnya
function role(nilaikotak) {
  const garis = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for(let i = 0; i < garis.length; i++) {
    const [a,b,c] = garis[i]

    if(nilaikotak[a] && nilaikotak[a] === nilaikotak[b] && nilaikotak[a] === nilaikotak[c]) {
      return nilaikotak[a]
    }
  }
  return false
}

