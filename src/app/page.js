"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

import Card from "@/components/search/Card";
import ResultFrame from "@/components/search/Result";
import EmployeeCard from "@/components/misc/EmployeeCard";
import StatusMessage from "@/components/common/StatusMessage";
import NewsletterSignup from "@/components/misc/NewsletterSignup";

import { FaHandHoldingUsd, FaMapMarkerAlt, FaGooglePlay, FaApple } from "react-icons/fa";
import { BsFillHouseFill } from "react-icons/bs";
import { LiaBuilding } from "react-icons/lia";
import { GiTakeMyMoney } from "react-icons/gi";

export default function Home() {
  const [featuredHomes, setFeaturedHomes] = useState([])
  const [agents, setAgents] = useState([])
  const [isLoadingHomes, setIsLoadingHomes] = useState(true)
  const [isLoadingAgents, setIsLoadingAgents] = useState(true)

  useEffect(() => {
    async function fetchFeaturedHomes() {
      try {
        const response = await fetch("/api/homes/all-homes?limit=4")
        if (!response.ok) {
          console.error("failed to fetch homes")
          return
        }
        const data = await response.json()
        setFeaturedHomes(data)
      } catch (error) {
        console.error("error fetching homes:", error)
      } finally {
        setIsLoadingHomes(false)
      }
    }

    async function fetchAgents() {
      try {
        const response = await fetch("/api/agents/all-agents?limit=3")
        if (!response.ok) {
          console.error("failed to fetch agents")
          return
        }
        const data = await response.json()
        setAgents(data)
      } catch (error) {
        console.error("error fetching agents:", error)
      } finally {
        setIsLoadingAgents(false)
      }
    }

    fetchFeaturedHomes()
    fetchAgents()
  }, [])

  return (
    <main>
      <article className="relative py-52 px-[30rem]">
        <div className="absolute inset-0 bg-hero-image bg-cover brightness-50"></div>
        <section className="relative flex flex-col items-center gap-14 z-10">
          <h1 className="text-white text-5xl font-bold">Søg efter din drømmebolig</h1>
          <Card />
        </section>
      </article>

      <article className="bg-white py-24 px-[22rem] flex flex-col">
        <section className="flex gap-32 justify-center">
          <div className="relative">
            <img src="/images/home/family-front.jpg" alt="Et billede af two smilende forældre og deres barn." className="w-full h-auto min-w-[22rem]" />
            <div className="absolute inset-0">
              <div className="flex items-center justify-center border-[10px] border-commonBlue h-full relative top-8 left-8">
                <div className="p-4 bg-commonBlue text-white text-center w-[50%] aspect-square relative top-24 left-[5.5rem] flex flex-col justify-center items-center">
                  <p className="font-bold text-5xl">38+</p>
                  <p className="text-2xl font-light">års mægler-efaring</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-2">
              <h4 className="text-3xl font-bold pb-5">Vi har fulgt danskerne hjem i snart 4 årtier</h4>
              <p className="text-xl font-semibold">Det synes vi siger noget om os!</p>
              <p className="text-sm">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has normal distribution.
                <br /><br />
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
            </section>
            <section className="flex justify-between">
              <div className="flex gap-4">
                <div className="p-3 bg-slate-100 min-h-12 min-w-12 flex items-center justify-center"><FaHandHoldingUsd size={35} /></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-semibold text-lg">9999</p>
                  <p className="text-[#333333] text-sm">boliger solgt</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-slate-100 min-h-12 min-w-12 flex items-center justify-center"><BsFillHouseFill size={35} /></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-semibold text-lg">999</p>
                  <p className="text-[#333333] text-sm">boliger til salg</p>
                </div>
              </div>
            </section>
          </div>
        </section>

        <hr className="mt-28 mb-14" />

        <section className="flex gap-10 justify-center items-center">
          <div className="flex flex-1 gap-4">
            <div className="p-3 bg-slate-100 max-h-10 max-w-10 flex items-center justify-center"><LiaBuilding size={35} /></div>
            <div className="flex flex-col justify-between gap-3">
              <p className="font-semibold text-lg">Bestil et salgstjek</p>
              <p className="text-[#333333] text-sm">Med et Din Mægler Salgstjek bliver du opdateret på værdien af din bolig.</p>
            </div>
          </div>
          <div className="flex flex-1 gap-4">
            <div className="p-3 bg-slate-100 max-h-10 max-w-10 flex items-center justify-center"><FaMapMarkerAlt size={35} /></div>
            <div className="flex flex-col justify-between gap-3">
              <p className="font-semibold text-lg">74 butikker</p>
              <p className="text-[#333333] text-sm">Hos Din Mægler er din bolig til salg i alle vores 74 butikker, som er fordelt rundt om i Danmark</p>
            </div>
          </div>
          <div className="flex flex-1 gap-4">
            <div className="p-3 bg-slate-100 max-h-10 max-w-10 flex items-center justify-center"><GiTakeMyMoney size={35} /></div>
            <div className="flex flex-col justify-between gap-3">
              <p className="font-semibold text-lg">Tilmeld køberkartotek</p>
              <p className="text-[#333333] text-sm">Når du er tilmeldt vores køberkartotek, bliver du kontaktet inden en ny bolig bliver annonceret.</p>
            </div>
          </div>
        </section>

      </article>

      <article className="bg-gray-100 flex flex-col justify-between items-center gap-5">
        <section className="flex flex-col items-center text-center gap-6 px-[32rem] pt-24 pb-11">
          <h2 className="text-[#263048] text-4xl font-semibold">Udvalgte Boliger</h2>
          <p className="text-gray-600">There are many variations of passages of Lorem Ipsum available but the this in majority have suffered alteration in some</p>
        </section>
        {isLoadingHomes ? (
          <StatusMessage messageText="Indlæser boliger..." messageIcon="loading" />
        ) : featuredHomes.length === 0 ? (
          <StatusMessage messageText="Kunne ikke finde boliger lige nu..." messageIcon="error" />
        ) : null}
        <section className="grid grid-cols-2 gap-6">
          {!isLoadingHomes &&
            featuredHomes.length > 0 &&
            featuredHomes.map((home) => (
              <ResultFrame key={home.id} type={"search"} includeFavourite={false} data={home} />
            ))}
        </section>
        <Link href="/search" className="py-4 px-8 mt-10 mb-24 rounded-sm text-white bg-commonBlue">
          Se alle boliger
        </Link>
      </article>

      <NewsletterSignup/>

      <article className="bg-gray-100 flex flex-col justify-between items-center gap-5">
        <section className="flex flex-col items-center text-center gap-6 px-[32rem] pt-24 pb-11">
          <h2 className="text-[#263048] text-4xl font-semibold">Mød vores engagerede medarbejdere</h2>
          <p className="text-gray-600">Din Mægler er garant for altid veluddannet assistance i dit boligsalg. Kontakt en af vores medarbejdere.</p>
        </section>
        {isLoadingAgents ? (
          <StatusMessage messageText="Indlæser mæglere..." messageIcon="loading" />
        ) : agents.length === 0 ? (
          <StatusMessage messageText="Kunne ikke finde mæglere lige nu..." messageIcon="error" />
        ) : null}
        <section className="grid grid-cols-3 gap-6 px-80">
          {!isLoadingAgents &&
            agents.length > 0 &&
            agents.map((agent) => <EmployeeCard key={agent.id} data={agent} />)}
        </section>
        <Link href="/agents" className="py-4 px-8 mt-10 mb-24 rounded-sm text-white bg-commonBlue">
          Se alle mæglere
        </Link>
      </article>

      <article className="flex justify-center items-center gap-10 relative w-full pt-20 px-72 bg-commonBlue text-white">
        <section className="flex flex-col gap-8 flex-1">
          <h5 className="text-5xl font-semibold text-white leading-[1.3]">Hold dig opdateret
            på salgsprocessen</h5>
          <p className="text-lg leading-[1.5]">Når du sælger din bolig hos Din Mægler, kommunikerer du nemt med den ansvarlige mægler eller butik med vores app. Her kan du også se statistik på interessen for din bolig i alle vores salgskanaler.</p>
          <div className="flex gap-4 font-semibold text-lg">
            <button className="bg-white px-6 py-4 flex items-center gap-2 rounded-sm"><FaGooglePlay color="#162A41" size={20} /><span className="text-commonBlue">Google Play</span></button>
            <button className="bg-commonBlue border-[1px] border-white px-6 py-4 flex items-center gap-2 rounded-sm"><FaApple color="white" size={25} /><span className="text-white">Apple Store</span></button>
          </div>
        </section>
        <section className="flex-[0.8]">
          <div className="relative w-full max-w-sm">
            <img src="/images/home/phone-1.png" alt="Et billede af en telefon" className="absolute z-20 left-40" />
            <img src="/images/home/phone-2.png" alt="Et billede af en telefon" className="relative z-30" />
          </div>
        </section>
      </article>
    </main>
  );
}
