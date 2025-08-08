type ErrorProps = {
  message?: string;
};

export default function ErrorMessage({ message }: ErrorProps) {
  return <p className="error">{message}</p>;
}
