import "./style.css";
import { getBase64 } from "./png/png.ts";

const testBuff = new Uint16Array(3);
testBuff[0] = 0;
testBuff[1] = 1;
testBuff[2] = 2;

const width = 1;
const height = 1;

const res = getBase64(testBuff, width, height);
res.then((res) => {
  document.getElementById("base")!.innerHTML = res;
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1 id="base"></h1>
    <div class="card">
      <button id="counter" type="button">Copy</button>
    </div>
  </div>
`;

const counter = document.getElementById("counter")!;
counter.addEventListener("click", () => {
  navigator.clipboard.writeText(
    document.getElementById("base")?.innerHTML as string,
  );
  counter.innerHTML = "Copied!";
  setTimeout(() => {
    counter.innerHTML = "Copy";
  }, 1000);
});
