window.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded...");
});

let getDateDiff = (d1, d2) => {
  if (!d1 || !d2) return;
  const d = 24 * 60 * 60 * 1000,
    y = 365.25 * d,
    m = y / 12,
    diff = d2 - d1;
  return {
    yrs: Math.floor(diff / y),
    mons: Math.floor((diff % y) / m),
    days: Math.floor(((diff % y) % m) / d),
  };
};

let checkEligibility = (e) => {
  e.preventDefault();

  const serviceLimit = 12,
    ageLimitObj = {
      nda: 34,
      ima: 34,
      tes: 34,
      ues: 34,
      ncc: 34,
      tgc: 36,
      acc: 36,
      ssco: 36,
      nccssco: 36,
    },
    examMonth = 9,
    today = new Date();

  let selectEntry = document.getElementById("selectEntry"),
    entry = selectEntry.value,
    dateDOB = document.getElementById("dateDOB"),
    dob = dateDOB.valueAsDate,
    dateDOS = document.getElementById("dateDOS"),
    dos = dateDOS.valueAsDate;

  if (!entry || !dob || !dos) {
    console.log("ERROR: Form is invalid.");
    showBannerMsg("Error: Something went wrong...", "danger");
    return;
  }
  if (dob > today) {
    dateDOB.className = "form-control is-invalid";
    showBannerMsg("Invalid Date Of Birth.", "danger");
  } else if (dos > today) {
    dateDOS.className = "form-control is-invalid";
    showBannerMsg("Invalid Date Of Seniority.", "danger");
  } else {
    selectEntry.className = "form-select is-valid";
    dateDOB.className = "form-control is-valid";
    dateDOS.className = "form-control is-valid";

    let spanAge = document.getElementById("spanAge"),
      spanService = document.getElementById("spanService"),
      ulTimeline = document.getElementById("ulTimeline"),
      age = getDateDiff(dob, today),
      service = getDateDiff(dos, today),
      ageLeft = ageLimitObj[entry] - age.yrs,
      serviceLeft = serviceLimit - service.yrs,
      attemptsLeft = 0,
      flagAge = false,
      flagService = false,
      timelineHTML = "";
    noOfYrs = ageLeft > serviceLeft ? ageLeft : serviceLeft;
    spanAge.innerHTML = `${age.yrs} Yrs ${age.mons} Months.`;
    spanService.innerHTML = `${service.yrs} Yrs ${service.mons} Months.`;

    for (let i = 0; i < noOfYrs + 1; i++) {
      let yr = today.getFullYear() + i,
        dService = new Date(`${yr}-07-01`),
        dAge = new Date(`${yr}-06-01`);

      if (today.getMonth() + 1 > examMonth) {
        console.log(`Alert : Exam for ${yr} already done in Sep.`);
        timelineHTML += `
        <li>
          <div>Exam Year : ${yr} </div>
          <div>Exam already completed in Sep-${yr}.</div>
        </li>`;
      } else {
        let ageTxt = "",
          serviceTxt = "",
          ageX = getDateDiff(dob, dAge),
          serviceX = getDateDiff(dos, dService);

        if (ageX.yrs >= ageLimitObj[entry]) {
          ageTxt = `<b style='color:red'>&#10060;</b> Age Criterion : Age > ${ageLimitObj[entry]} years.`;
        } else {
          ageTxt = `<b style='color:green'>&#9989;</b> Age Criterion.`;
          flagAge = true;
        }
        if (serviceX.yrs >= serviceLimit) {
          serviceTxt = `<b style='color:red'>&#10060;</b> Service Criterion : Service > ${serviceLimit} years.`;
        } else {
          serviceTxt = `<ibstyle='color:green'>&#9989;</b> Service Criterion.`;
          flagService = true;
        }

        if (flagAge && flagService) {
          attemptsLeft++;
          timelineHTML += `
        <li class="alert alert-success">
          <div>Exam Year : Sep-${yr}</div>
          <div>${ageTxt}</div>
          <div>${serviceTxt}</div>
        </li>`;
        } else {
          timelineHTML += `
        <li class="alert alert-danger">
          <div>Exam Year : Sep-${yr}</div>
          <div>${ageTxt}</div>
          <div>${serviceTxt}</div>
        </li>`;
        }
        flagAge = false;
        flagService = false;
      }
    }
    ulTimeline.innerHTML = timelineHTML;
    document.getElementById("spanNoOfAttempts").innerHTML = "0" + attemptsLeft;
    document.getElementById("resultDiv").style.display = "block";
  }
};

let doReset = () => {
  document.getElementById("selectEntry").className = "form-select";
  document.getElementById("dateDOB").className = "form-control";
  document.getElementById("dateDOS").className = "form-control";
  document.getElementById("resultDiv").style.display = "none";
};

let util = {};
colors = {
  bg: {
    0: "rgba(255, 99, 132, 0.7)",
    1: "rgba(75, 192, 192, 0.7)",
    2: "rgba(255, 205, 86, 0.7)",
    3: "rgba(54, 162, 235, 0.7)",
    4: "rgba(153, 102, 255, 0.7)",
    5: "rgba(255, 99, 132, 0.2)",
    6: "rgba(255, 159, 64, 0.2)",
    7: "rgba(255, 205, 86, 0.2)",
    8: "rgba(75, 192, 192, 0.2)",
    9: "rgba(54, 162, 235, 0.2)",
    10: "rgba(153, 102, 255, 0.2)",
    11: "rgba(201, 203, 207, 0.2)",
    red: "rgba(255, 99, 132, 0.7)",
    green: "rgba(75, 192, 192, 0.7)",
    amber: "rgba(255, 205, 86, 0.7)",
    blue: "rgba(54, 162, 235, 0.7)",
    purple: "rgba(153, 102, 255, 0.7)",
    lightRed: "rgba(255, 99, 132, 0.2)",
    lightAmber: "rgba(255, 159, 64, 0.2)",
    lightYellow: "rgba(255, 205, 86, 0.2)",
    lightGreen: "rgba(75, 192, 192, 0.2)",
    lightBlue: "rgba(54, 162, 235, 0.2)",
    lightPurple: "rgba(153, 102, 255, 0.2)",
    lightGrey: "rgba(201, 203, 207, 0.2)",
  },
  border: {
    0: "rgba(255, 99, 132, 1)",
    1: "rgba(75, 192, 192, 1)",
    2: "rgba(255, 205, 86, 1)",
    3: "rgba(54, 162, 235, 1)",
    4: "rgba(153, 102, 255, 1)",
    5: "rgb(255, 99, 132)",
    6: "rgb(255, 159, 64)",
    7: "rgb(255, 205, 86)",
    8: "rgb(75, 192, 192)",
    9: "rgb(54, 162, 235)",
    10: "rgb(153, 102, 255)",
    11: "rgb(201, 203, 207)",
    red: "rgba(255, 99, 132, 1)",
    green: "rgba(75, 192, 192, 1)",
    amber: "rgba(255, 205, 86, 1)",
    blue: "rgba(54, 162, 235, 1)",
    purple: "rgba(153, 102, 255, 1)",
    lightRed: "rgb(255, 99, 132)",
    lightAmber: "rgb(255, 159, 64)",
    lightYellow: "rgb(255, 205, 86)",
    lightGreen: "rgb(75, 192, 192)",
    lightBlue: "rgb(54, 162, 235)",
    lightPurple: "rgb(153, 102, 255)",
    lightGrey: "rgb(201, 203, 207)",
  },
};

let showBannerMsg = (msg, type, time) => {
  return new Promise((resolve, reject) => {
    let typeColor = {
      primary: { bg: "rgb(98, 161, 254)", txt: "#fff" },
      secondary: { bg: "rgb(163, 166, 169)", txt: "#333" },
      tertiary: { bg: "rgb(228, 122, 175)", txt: "#fff" },
      success: { bg: "rgb(106, 177, 144)", txt: "#fff" },
      info: { bg: "rgb(98, 221, 245)", txt: "#333" },
      warning: { bg: "rgb(255, 215, 94)", txt: "#333" },
      danger: { bg: "rgb(232, 124, 134)", txt: "#fff" },
      light: { bg: "rgb(250, 251, 252)", txt: "#333" },
      dark: { bg: "rgb(111, 113, 116)", txt: "#fff" },
    };

    let msgDiv = document.createElement("div");
    msgDiv.setAttribute("id", "toastMsg");
    msgDiv.style.position = "fixed";
    msgDiv.style.top = "50px";
    msgDiv.style.right = "10px";
    msgDiv.style.minWidth = "300px";
    msgDiv.style.maxWidth = "600px";
    msgDiv.style.borderRadius = "4px";
    msgDiv.style.backgroundColor = typeColor[type]
      ? typeColor[type].bg
      : "blueviolet";
    msgDiv.style.padding = "15px";
    msgDiv.style.color = typeColor[type] ? typeColor[type].txt : "#fff";
    msgDiv.style.fontFamily = "system-ui,sans-serif";
    msgDiv.style.transition = "transform .3s ease-out, opacity .3s ease";
    msgDiv.style.transform = "translateY(50px)";
    msgDiv.style.opacity = 0;
    msgDiv.style.zIndex = 2000;
    msgDiv.style.boxShadow = `0 2px 5px 0 rgba(0,0,0,.3),
                          1px 0 2px 0 rgba(0,0,0,.3),
                          -1px 0 2px 0 rgba(0,0,0,.3)`;

    let p = document.createElement("p");
    p.style.padding = "0";
    p.style.margin = "0";
    p.innerHTML = `<span>${msg ? msg : "This is a msg..."}</span>`;

    let close = document.createElement("span"),
      closeSVG = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e")`;

    close.style.cursor = "pointer";
    close.style.fontWeight = "bold";
    close.style.float = "right";
    close.style.marginTop = "4px";
    close.style.marginLeft = "10px";
    close.style.boxSizing = "content-box";
    close.style.width = "1em";
    close.style.height = "1em";
    close.style.padding = "0.25em";
    close.style.background = `transparent ${closeSVG} center/1em auto no-repeat`;
    close.style.border = 0;
    close.style.opacity = 0.3;

    let st = setTimeout(() => {
      close.click();
    }, time || 3000); //Automatically remove msg after 3s

    close.onclick = () => {
      if (st) clearTimeout(st);
      msgDiv.style.transform = "translateY(-50px)";
      msgDiv.style.opacity = 0;
      setTimeout(() => {
        document.body.removeChild(msgDiv);
        resolve();
      }, 100);
    };

    p.appendChild(close);
    msgDiv.appendChild(p);
    document.body.appendChild(msgDiv);

    setTimeout(() => {
      msgDiv.style.transform = "none";
      msgDiv.style.opacity = 1;
    }, 10);
  });
};
