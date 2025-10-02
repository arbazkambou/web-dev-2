function Error({ message }) {
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{message}</p>

      <Button href="-1">&larr; Go back</Button>
    </div>
  );
}

export default Error;
