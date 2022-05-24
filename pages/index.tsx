import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <input type={"text"}></input>
        <input type={"text"}></input>
        <label><input type={"checkbox"}></input></label>
        <button>Let's go</button>
      </div>
    </div>
  )
}

export default Home
