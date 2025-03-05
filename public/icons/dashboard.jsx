export default function DashBoard(props) {
  return (
    <svg
      viewBox="0 0 20 18"
      className={props?.className}
      onClick={props?.onClick}
      fill="black"
    >
      <path
        d="M8.88889 18H2.22222C1 18 0 17.1 0 16V2C0 0.9 1 0 2.22222 0H8.88889V18ZM11.1111 18H17.7778C19 18 20 17.1 20 16V9H11.1111V18ZM20 7V2C20 0.9 19 0 17.7778 0H11.1111V7H20Z"
        fill="black"
      />
    </svg>
  );
}
