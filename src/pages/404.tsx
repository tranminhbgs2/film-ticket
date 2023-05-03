import Link from "next/link";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Ooops...</h1>
      <h2>That page cannot be found :(</h2>
      <p>
        Go back to the{" "}
        <Link href="/">
          <span>Homepage</span>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
