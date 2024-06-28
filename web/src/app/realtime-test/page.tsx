export default async function RealtimeTest() {
  const res = await fetch('http://localhost:3001/');
  const json = await res.json();

  return (
    <p>{JSON.stringify(json)}</p>
  )
}
