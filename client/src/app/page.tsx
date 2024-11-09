'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080/').then(
      res => res.json()
    ).then(
      data => setData(data)
    )
  }, [])
  console.log(data)
  return (
    <main>
      {data && <div>data</div>}
    </main>
  );
}
