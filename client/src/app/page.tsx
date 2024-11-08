'use client'
import { useEffect, useState } from "react";
interface Data {
  msg: string
}
export default function Home() {
  const [data, setData] = useState<null | Data>(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/home').then(
      res => res.json()
    ).then(
      data => setData(data)
    )
  }, [])

  return (
    <main>
      {data?.msg}
    </main>
  );
}
