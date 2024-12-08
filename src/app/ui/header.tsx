import Link from "next/link";

export default function NavBar() {
  return (
    <div className="text-center p-10 sticky">
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/requested"}>Requests</Link>
        </li>
        <li>
          <Link href={"/collection"}>Library</Link>
        </li>
      </ul>
    </div>
  );
}
