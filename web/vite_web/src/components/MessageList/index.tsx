import { useEffect, useState } from "react";
/* import { io } from "socket.io-client"; */
import { api } from "../../services/api";

import styles from "./styles.module.scss";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

/* const messagesQueue: Message[] = [];

const socket = io("https://localhost:4000");

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
});
 */
export function MessageList() {
  //ira armazenar uma lista de mensagens, ou seja, um array de mensagens
  const [messages, setMessages] = useState<Message[]>([]);

  /*   useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 3000);
  }, []);
 */
  useEffect(() => {
    api.get<Message[]>("messages/last3").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <svg
        width="280"
        height="24"
        viewBox="0 0 280 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M47.6226 12.0055C47.6245 14.3689 46.9124 16.6797 45.5763 18.6457C44.2402 20.6118 42.3401 22.1446 40.1165 23.0504C37.8929 23.9561 35.4456 24.1941 33.0842 23.7341C30.7227 23.2742 28.5533 22.1371 26.8503 20.4666C25.1473 18.7961 23.9873 16.6672 23.5169 14.3493C23.3822 13.6857 23.3058 13.0151 23.287 12.3447C23.1991 15.2538 21.9835 18.0257 19.8811 20.0897C17.697 22.2339 14.7348 23.4384 11.646 23.4384H0V0.572239H11.646C14.7348 0.572239 17.697 1.77678 19.8811 3.9209C21.9858 5.98715 23.2017 8.76285 23.2873 11.6755C23.3291 10.2295 23.6384 8.79537 24.2078 7.44503C25.1287 5.26134 26.6885 3.39482 28.6901 2.08158C30.6917 0.768345 33.0451 0.0673828 35.4525 0.0673828C38.6769 0.0724144 41.768 1.33153 44.0489 3.56899C46.3299 5.80644 47.6149 8.83996 47.6226 12.0055ZM78.1449 0.571657L74.8355 12.5287L71.5358 0.571657H65.4604L62.1122 12.5669L58.8028 0.571657H49.4277L57.6964 23.4378H65.4604L68.5078 14.1675L71.5358 23.4378H79.2998L87.52 0.571657H78.1449ZM112.074 0.571657V23.4378H103.242V15.2536H97.7395V23.4378H88.9079V0.571657H97.7395V8.75587H103.252V0.571657H112.074ZM115.383 0.571657V23.4378H124.205V0.571657H115.383ZM143.518 16.8924V23.4378H127.514V0.571657H136.346V16.9305L143.518 16.8924ZM154.543 9.2608V7.079L161.715 7.11709V0.571657H145.721V23.4378H161.715V16.8924H154.543V14.7106H160.065V9.2608H154.543Z"
          fill="url(#paint0_linear_61322:3225)"
        />
        <path
          d="M189.646 0.714581L186.502 0.247681C186.405 0.247681 186.308 0.247706 186.308 0.333454L184.968 2.01985C184.9 2.13136 184.869 2.26154 184.881 2.39139C184.881 2.48666 184.784 2.67722 184.687 2.58195L183.639 2.30567C183.445 2.30567 183.26 2.30567 183.163 2.4867L178.874 7.91742C178.776 8.0127 178.679 8.01268 178.495 8.01268L176.874 7.26002C176.804 7.21373 176.721 7.18902 176.637 7.18902C176.552 7.18902 176.469 7.21373 176.399 7.26002L175.535 7.82211C175.465 7.86965 175.382 7.89515 175.297 7.89515C175.212 7.89515 175.129 7.86965 175.059 7.82211L174.681 7.63155C174.618 7.60409 174.55 7.58976 174.482 7.58945C174.413 7.58914 174.345 7.60286 174.282 7.62975C174.219 7.65663 174.162 7.69612 174.116 7.74564C174.069 7.79517 174.034 7.85366 174.011 7.91742L173.73 9.2227C173.693 9.36137 173.701 9.50769 173.751 9.64215C173.801 9.77661 173.892 9.89281 174.011 9.97536L174.778 10.4422L176.777 11.6618L177.748 12.2238C177.882 12.299 178.037 12.3304 178.191 12.3132C178.344 12.2961 178.488 12.2314 178.602 12.1286L180.223 10.728C180.368 10.6416 180.54 10.6079 180.708 10.6328L181.183 10.909C181.368 11.0043 181.562 11.0043 181.659 10.8138L182.513 10.0706C182.572 10.008 182.65 9.96522 182.735 9.94814C182.82 9.93106 182.909 9.94058 182.989 9.97536L184.231 10.5375C184.425 10.6328 184.609 10.5375 184.803 10.4422L185.376 9.69908L189.666 4.26835C189.85 3.98252 189.763 3.61094 189.374 3.61094L188.404 3.42992C188.21 3.42992 188.122 3.14409 188.21 2.95354L189.743 1.18142C189.937 0.990871 189.831 0.714581 189.646 0.714581Z"
          fill="white"
        />
        <path
          d="M175.38 11.6617C175.283 11.5664 175.186 11.6616 175.186 11.7569L175.661 12.9669V13.2527L175.283 14.8438C175.276 14.8941 175.282 14.9451 175.299 14.993C175.316 15.0409 175.343 15.0844 175.38 15.1202L176.515 15.9681C176.571 16.0098 176.639 16.0325 176.709 16.0325C176.779 16.0325 176.848 16.0098 176.903 15.9681L178.136 14.9391C178.174 14.9031 178.22 14.8759 178.271 14.8594C178.321 14.8429 178.374 14.8376 178.427 14.8438L179.757 14.6533C179.854 14.6533 179.854 14.558 179.757 14.4628L175.38 11.6617Z"
          fill="white"
        />
        <path
          d="M174.962 15.6824C174.946 15.6607 174.925 15.6431 174.901 15.631C174.876 15.6188 174.849 15.6125 174.822 15.6125C174.794 15.6125 174.767 15.6188 174.743 15.631C174.718 15.6431 174.697 15.6607 174.681 15.6824L173.711 16.1492C173.685 16.1492 173.66 16.1593 173.642 16.1771C173.624 16.195 173.613 16.2193 173.613 16.2445L171.517 21.2941H171.614L172.09 21.1131V21.2084L170.566 23.6379C170.566 23.7332 170.566 23.7332 170.653 23.7332L175.991 18.3978C176.088 18.3978 176.088 18.3025 176.088 18.2072L176.185 16.8066C176.185 16.7114 176.185 16.6161 176.088 16.6161L174.962 15.6824Z"
          fill="white"
        />
        <path
          d="M216.597 16.8927V23.4381H195.091C195.091 23.4381 205.32 12.4052 206.669 9.81368C207.736 7.77478 206.601 6.54573 205.562 6.54573C204.524 6.54573 203.359 7.1269 203.359 9.81368L195.159 9.2706C195.159 4.16382 198.808 0.00976562 205.562 0.00976562C212.074 0.00976562 216.044 3.38254 216.044 8.18444C216.044 11.1761 213.423 14.587 210.531 16.9022L216.597 16.8927Z"
          fill="white"
        />
        <path
          d="M240.86 12.0054C240.86 18.6175 236.405 24.0006 229.825 24.0006C223.245 24.0006 218.8 18.6175 218.8 12.0054C218.8 5.39322 223.245 0.0196533 229.825 0.0196533C236.405 0.0196533 240.86 5.33605 240.86 12.0054Z"
          fill="white"
        />
        <path
          d="M264.569 16.8927V23.4381H243.063C243.063 23.4381 253.292 12.4052 254.641 9.81368C255.708 7.77478 254.573 6.54573 253.534 6.54573C252.496 6.54573 251.331 7.1269 251.331 9.81368L243.131 9.2706C243.131 4.16382 246.78 0.00976562 253.534 0.00976562C260.047 0.00976562 264.016 3.38254 264.016 8.18444C264.016 11.1761 261.396 14.587 258.503 16.9022L264.569 16.8927Z"
          fill="white"
        />
        <path
          d="M280 0V23.4378H271.178V8.19369L267.296 8.67007V2.09602L280 0Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_61322:3225"
            x1="-3.30879e-06"
            y1="0.634187"
            x2="50.8161"
            y2="88.2688"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF008E" />
            <stop offset="1" stopColor="#FFCD1E" />
          </linearGradient>
        </defs>
      </svg>

      <ul className={styles.messageList}>
        {messages.map((message) => {
          return (
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
