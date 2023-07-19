// fetch APIを利用して、POSTリクエストでContent-Type: application/jsonを送信する
// 送信先は、http://18.183.73.76:3000/credit/verify
// 以下のJSONを送信する
// {
//   "cname": "Yoshiki Onaga",
//   "cno": "378282246310005",
//   "edate": "02/26"
// }
hostName = "localhost";
port = 3000;

document.querySelector("#send").addEventListener("click", async () => {
  const cname = document.querySelector("#cname").value;
  const cno = document.querySelector("#cno").value;
  const edate = document.querySelector("#edate").value;

  console.log(cname, cno, edate);
  try {
    console.log(hostName, port);

    const res = await fetch(`http://${hostName}:${port}/credit/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cname, cno, edate }),
    });
    const json = await res.json();
    console.log(json);
    document.querySelector("#result").textContent = JSON.stringify(json);
  } catch (e) {
    console.error(e);
  }
});
