export default function User(props) {
  return (
    <svg className={props?.className} onClick={props?.onClick} fill="black">
      <path
        d="M10.5 10.5C13.4006 10.5 15.75 8.15063 15.75 5.25C15.75 2.34938 13.4006 0 10.5 0C7.59937 0 5.25 2.34938 5.25 5.25C5.25 8.15063 7.59937 10.5 10.5 10.5ZM10.5 13.125C6.99563 13.125 0 14.8837 0 18.375V21H21V18.375C21 14.8837 14.0044 13.125 10.5 13.125Z"
        fill="black"
      />
    </svg>
  );
}
